// GainPath: backups, restore, Home banners, nudges and feedback
// A plain script (not a module) sharing one global scope with the other
// js/ files; index.html sets the load order. Map: docs/index-section-map.md
// ═══ DATA SAFETY: backups, restore, storage protection, iOS eviction warning ═══
function backupPayload(){return{cfg:CFG,history:ST.history,prs:ST.prs,mw:ST.mw,bw:ST.bw,exported:new Date().toISOString(),version:'2.0'};}
function isMobileUA(){return /iPhone|iPad|iPod|Android/.test(navigator.userAgent)||(navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1);}
function isIOS(){return /iPhone|iPad|iPod/.test(navigator.userAgent)||(navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1);}
// The backup is built from memory, so it still works when saving is failing.
// On phones it goes through the share sheet (iOS: "Save to Files" / iCloud
// Drive, a location the user controls); elsewhere, or if sharing isn't
// available, it downloads. A cancelled share doesn't count as a backup.
async function exportData(){
  const data=backupPayload(),name='gainpath-backup-'+dkey(new Date())+'.json',json=JSON.stringify(data,null,2);
  let shared=false;
  if(isMobileUA()&&navigator.share&&navigator.canShare){
    try{const file=new File([json],name,{type:'application/json'});if(navigator.canShare({files:[file]})){await navigator.share({files:[file],title:t('ds_share_title')});shared=true;}}
    catch(e){if(e&&e.name==='AbortError')return;}
  }
  if(!shared){const url=URL.createObjectURL(new Blob([json],{type:'application/json'}));const a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
  try{localStorage.setItem('gp_last_export',data.exported);}catch(e){}
  CFG.exportedAtHistoryLen=ST.history.length;saveCFG();
  const st=gid('ex-st');if(st){st.textContent=t(shared?'ds_backup_saved':'ds_backup_downloaded');setTimeout(()=>{st.textContent='';},4000);}
  renderHomeBanners();renderBackupStatus();track('data_exported');
}
function csvEscape(v){const s=String(v==null?'':v);return /[",\n]/.test(s)?'"'+s.replace(/"/g,'""')+'"':s;}
function exportCSV(){
  const rows=[['Date','Day','Exercise','Set','Weight ('+CFG.unit+')','Reps','Feel']];
  ST.history.forEach(h=>{
    (h.exercises||[]).forEach(ex=>{
      let wc=0;
      (ex.sets||[]).forEach(s=>{
        const isW=s.t==='w';const lbl=isW?'Warm-up':String(++wc);
        rows.push([h.date,h.dayName,ex.name,lbl,s.w,s.r,ex.exFeel||'']);
      });
    });
  });
  const csv=rows.map(r=>r.map(csvEscape).join(',')).join('\n');
  const blob=new Blob([csv],{type:'text/csv'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='gainpath-history.csv';a.click();URL.revokeObjectURL(url);
  gid('ex-st').textContent=t('ds_csv_downloaded');setTimeout(()=>{gid('ex-st').textContent='';},4000);
  track('data_exported');
}
// Strip HTML metacharacters from every string in an imported backup (defence in
// depth: rendering escapes names itself, this just keeps stored data tidy) and
// drop keys that could rewrite an object's prototype.
const UNSAFE_KEYS={__proto__:1,constructor:1,prototype:1};
function sanitizeImport(v){
  if(typeof v==='string')return v.replace(/[<>]/g,'');
  if(Array.isArray(v))return v.map(sanitizeImport);
  if(v&&typeof v==='object'){const o={};Object.keys(v).forEach(k=>{const c=sanitizeImport(k);if(Object.prototype.hasOwnProperty.call(UNSAFE_KEYS,c))return;o[c]=sanitizeImport(v[k]);});return o;}
  return v;
}
// Every nested shape the app later iterates is checked here, before anything
// live changes. Optional fields stay optional so older backups still restore.
function validateBackup(data){
  const bad=m=>{throw new Error(m);},isO=isPlainObj;
  if(!isO(data))bad('not a backup object');
  if(!data.cfg&&!data.history)bad('no GainPath data in file');
  if(data.history&&!Array.isArray(data.history))bad('bad history');
  if(data.bw&&!Array.isArray(data.bw))bad('bad bw');
  if(data.prs&&!isO(data.prs))bad('bad prs');
  if(data.mw&&!isO(data.mw))bad('bad mw');
  if(data.cfg&&!isO(data.cfg))bad('bad cfg');
  (data.history||[]).forEach((h,i)=>{
    if(!isO(h))return; // applyBackup drops non-object entries
    if(!Array.isArray(h.exercises))bad('history['+i+'].exercises');
    h.exercises.forEach((e,j)=>{if(!isO(e)||typeof e.name!=='string'||(e.sets!==undefined&&!Array.isArray(e.sets)))bad('history['+i+'].exercises['+j+']');
      (e.sets||[]).forEach(x=>{if(!isO(x))bad('history['+i+'] set');});});
  });
  (data.bw||[]).forEach((e,i)=>{if(isO(e)&&e.w!==undefined&&e.w!==null&&typeof e.w!=='number')bad('bw['+i+']');});
  const c=data.cfg;
  if(c){
    if(c.customProgram!==undefined&&c.customProgram!==null){
      if(!isO(c.customProgram)||!Array.isArray(c.customProgram.days)||c.customProgram.days.some(d=>!isO(d)||typeof d.id!=='string'))bad('cfg.customProgram');
    }
    if(c.customExercises!==undefined&&(!Array.isArray(c.customExercises)||c.customExercises.some(e=>!isO(e)||typeof e.name!=='string')))bad('cfg.customExercises');
    ['customDays','dayLinks','dayPlan','keyLifts','gymPlates','unitMemo'].forEach(k=>{if(c[k]!==undefined&&c[k]!==null&&!isO(c[k]))bad('cfg.'+k);});
    if(c.gymDumbbells!==undefined&&!Array.isArray(c.gymDumbbells))bad('cfg.gymDumbbells');
  }
  return data;
}
// PRs and badges are derived, so they are rebuilt from the restored history
// rather than trusted from the file. The live state is snapshotted first: if
// anything throws part-way, it is put back and the error is re-raised.
function applyBackup(data){
  const snap=JSON.parse(JSON.stringify({CFG,h:ST.history,p:ST.prs,mw:ST.mw,bw:ST.bw,b:ST.badges||{}}));
  try{
    if(data.cfg)CFG=Object.assign(CFG,data.cfg);
    if(data.history)ST.history=data.history.filter(h=>isPlainObj(h));
    if(data.prs)ST.prs=data.prs;if(data.mw){ST.mw=data.mw;migrateMW();}
    if(data.bw)ST.bw=data.bw.filter(e=>isPlainObj(e));
    syncProgramMeta();migrateDkTz();migrateExNames();mergeCustomExercises();syncBW(true);recomputePRs();recomputeBadges();saveCFG();saveData();accentColor();
  }catch(e){CFG=snap.CFG;ST.history=snap.h;ST.prs=snap.p;ST.mw=snap.mw;ST.bw=snap.bw;ST.badges=snap.b;throw e;}
}
function restoreDone(msg){hideLoadRecovery();refreshHome();ss('home');renderBackupStatus();const st=gid('ex-st');if(st){st.textContent=msg;setTimeout(()=>{st.textContent='';},4000);}}
// Anything a restore would replace: sessions, a finished set-up, weigh-ins or
// machine bases. A configured user with no sessions yet is protected too.
function hasMeaningfulData(){return ST.history.length>0||!!CFG.setup||ST.bw.length>0||Object.keys(ST.mw||{}).length>0;}
// Restoring replaces everything, so: confirm when there is data to lose, and
// keep a copy of it (gp_pre_restore) for "Undo last restore". If that copy
// can't be stored, stop and ask for an export first rather than risk it.
function importData(input){const file=input.files[0];if(!file)return;const reader=new FileReader();reader.onload=e=>{
  const say=m=>{const st=gid('ex-st');if(st)st.textContent=m;};
  let data;
  try{data=validateBackup(sanitizeImport(JSON.parse(e.target.result)));}catch(err){say(t('ds_invalid_file'));return;}
  const had=ST.history.length,badKeys=Object.keys(LOAD_BAD);
  if(hasMeaningfulData()&&!confirm(had?(had===1?t('ds_replace_one'):t('ds_replace_many').replace('{n}',had)):t('ds_replace_cfg')))return;
  if(hasMeaningfulData()&&!badKeys.length){try{localStorage.setItem('gp_pre_restore',JSON.stringify(backupPayload()));}catch(err){say(t('ds_no_space'));return;}}
  // Unreadable keys are replaced by this restore: keep their raw text first.
  const locked={...LOAD_BAD};
  if(badKeys.length&&!keepBadCopies()){say(t('lr_copy_fail'));return;}
  badKeys.forEach(k=>delete LOAD_BAD[k]);saveOK('lock');
  try{applyBackup(data);}catch(err){Object.assign(LOAD_BAD,locked);if(badKeys.length)saveFailed('lock');say(t('ds_apply_failed'));return;}
  restoreDone(t(SAVE_FAILED?'ds_restored_unsaved':'ds_restored'));
};reader.readAsText(file);input.value='';}
// ═══ Recovery sheet for unreadable stored data (see load()/LOAD_BAD) ═══
function keepBadCopies(){
  try{Object.keys(LOAD_BAD).forEach(k=>localStorage.setItem('gp_corrupt_'+k,LOAD_BAD[k]));return true;}catch(e){return false;}
}
function showLoadRecovery(){
  const el=gid('load-recovery');if(!el)return;
  gid('lr-keys').innerHTML=Object.keys(LOAD_BAD).map(k=>'<li>'+esc(STRINGS.en['lr_k_'+k]?t('lr_k_'+k):k)+'</li>').join('');
  el.style.display='block';document.body.style.overflow='hidden';
  modalOpen('load-recovery',null,{escape:false});
  const mb=gid('lr-mirror');if(mb)mb.style.display='none';
  idbMirrorCopies().then(c=>{if(c&&mb&&Object.keys(LOAD_BAD).length)mb.style.display='flex';});
}
// Restores just the unreadable keys from the IndexedDB mirror. The raw damaged
// text is kept first; if any write fails or doesn't read back, the originals
// are put back and nothing is lost.
async function recoverFromMirror(){
  const c=await idbMirrorCopies();
  if(!c){alert(t('lr_mirror_fail'));return;}
  if(!confirm(t('lr_mirror_confirm')))return;
  if(!keepBadCopies()){alert(t('lr_copy_fail'));return;}
  const orig={...LOAD_BAD};
  try{Object.keys(c).forEach(k=>{localStorage.setItem(k,c[k]);if(localStorage.getItem(k)!==c[k])throw new Error('read-back mismatch: '+k);});}
  catch(e){Object.keys(orig).forEach(k=>{try{localStorage.setItem(k,orig[k]);}catch(x){}});alert(t('lr_mirror_fail'));return;}
  location.reload();
}
function hideLoadRecovery(){const el=gid('load-recovery');if(el)el.style.display='none';modalClose('load-recovery',true);if(!Object.keys(LOAD_BAD).length)document.body.style.overflow='';}
function downloadBadData(){
  const json=JSON.stringify({gainpathUnreadableData:LOAD_BAD,saved:new Date().toISOString()},null,2);
  const url=URL.createObjectURL(new Blob([json],{type:'application/json'}));const a=document.createElement('a');a.href=url;a.download='gainpath-damaged-data-'+dkey(new Date())+'.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
}
function startFreshBad(){
  if(!confirm(t('lr_fresh_confirm')))return;
  if(!keepBadCopies()){alert(t('lr_copy_fail'));return;}
  Object.keys(LOAD_BAD).forEach(k=>delete LOAD_BAD[k]);
  saveOK('lock');saveCFG();saveData();
  hideLoadRecovery();
  if(CFG.setup){refreshHome();ss('home');}else ss('ob');
}
function undoRestore(){
  let prev=null;try{prev=JSON.parse(localStorage.getItem('gp_pre_restore')||'null');}catch(e){prev=null;}
  if(!prev||!confirm(t('ds_undo_confirm')))return;
  try{applyBackup(validateBackup(prev));}catch(err){const st=gid('ex-st');if(st)st.textContent=t('ds_undo_failed');return;}
  if(!SAVE_FAILED){try{localStorage.removeItem('gp_pre_restore');}catch(e){}}
  restoreDone(t('ds_undone'));
}
// No renderHomeBanners() here: rendering the reminder off-screen would stamp
// it as seen, so returning to Train would never show it.
function setBackupEvery(n){CFG.backupEveryDays=n;saveCFG();renderBackupStatus();}
function daysSinceBackup(){let ex=null;try{ex=localStorage.getItem('gp_last_export');}catch(e){}return ex?Math.floor((Date.now()-new Date(ex).getTime())/864e5):null;}
// navigator.storage.persist() asks the browser not to evict this site's
// storage (localStorage included) under storage pressure. It does not lift
// iOS Safari's 7-day limit for sites that aren't installed; only installing does.
function requestPersist(){
  try{if(!navigator.storage||!navigator.storage.persist)return;
    navigator.storage.persisted().then(p=>p||navigator.storage.persist()).then(r=>{STORAGE_PERSISTED=!!r;renderBackupStatus();}).catch(()=>{});}catch(e){}
}
function renderBackupStatus(){
  const el=gid('bk-status');if(!el)return;
  const d=daysSinceBackup(),lines=[];
  if(SAVE_FAILED)lines.push('<span style="color:var(--alert-txt)"><i class="ti ti-alert-triangle" aria-hidden="true"></i> '+t('bk_failed')+'</span>');
  if(MIRROR_DEGRADED)lines.push('<span style="color:var(--alert-txt)"><i class="ti ti-alert-triangle" aria-hidden="true"></i> '+t('bk_mirror')+'</span>');
  lines.push('<i class="ti ti-clock" aria-hidden="true"></i> '+(d===null?t('bk_never'):d===0?t('bk_today'):t('bk_ago').replace('{n}',d)));
  if(isIOS()&&!isStandalone())lines.push('<span style="color:var(--alert-txt)"><i class="ti ti-alert-triangle" aria-hidden="true"></i> '+t('bk_ios_risk')+'</span>');
  else lines.push('<i class="ti ti-shield-check" aria-hidden="true"></i> '+(STORAGE_PERSISTED?t('bk_persisted'):t('bk_not_persisted')));
  el.innerHTML=lines.join('<br>');
  const every=CFG.backupEveryDays||7;[3,7,14,30].forEach(n=>{const b=gid('bkd-'+n);if(b)b.classList.toggle('on',n===every);});
  let pre=null;try{pre=localStorage.getItem('gp_pre_restore');}catch(e){}
  const u=gid('undo-restore-btn');if(u)u.style.display=pre?'':'none';
}
function isStandalone(){return navigator.standalone===true||window.matchMedia('(display-mode: standalone)').matches;}
function renderHomeBanners(){
  const el=gid('prt-h');if(!el)return;
  // iPhone/iPad, not installed: WebKit deletes a site's script-written storage
  // after 7 days without a visit, so this is a data-loss warning, not a tip.
  // It returns 30 days after being dismissed, because the risk doesn't go away.
  if(!isStandalone()&&isIOS()&&iosWarnDue()){
    const has=ST.history.length>0;
    el.innerHTML='<div class="prt prt-alert"><div style="display:flex;align-items:flex-start;gap:8px"><i class="ti ti-alert-triangle" aria-hidden="true" style="font-size:16px;flex-shrink:0;margin-top:1px"></i><div style="flex:1"><div style="font-weight:600">'+t('ios_warn_title')+'</div><div style="font-size:13px;margin-top:2px;line-height:1.5">'+t('ios_warn_body')+'</div><div id="a2hs-steps" style="display:none;font-size:13px;margin-top:8px;line-height:1.6">'+t(has?'ios_steps_backup':'ios_steps_plain')+'</div><div style="display:flex;gap:8px;margin-top:10px;flex-wrap:wrap"><button class="bp" style="font-size:13px;padding:8px 12px" onclick="toggleA2HSSteps()">'+t('ios_how_install')+'</button>'+(has?'<button class="bs" style="font-size:13px;padding:8px 12px" onclick="exportData()">'+t('btn_back_up')+'</button>':'')+'<button class="bg" style="font-size:13px;color:var(--alert-txt)" onclick="dismissIOSWarn()">'+t('ios_later')+'</button></div></div></div></div>';
    return;
  }
  if(!isStandalone()&&!isIOS()&&localStorage.getItem('gp_a2hs_dismissed')!=='true'){
    el.innerHTML='<div class="prt" style="background:var(--tint-green-1);border:1px solid var(--tint-green-2);color:var(--brand-green);display:block"><div style="display:flex;align-items:flex-start;gap:8px"><i class="ti ti-home-2" aria-hidden="true" style="font-size:16px;flex-shrink:0;margin-top:1px"></i><div style="flex:1"><div style="font-weight:600">'+t('a2hs_title')+'</div><div style="font-size:13px;margin-top:2px;line-height:1.5">'+t('a2hs_body')+'</div><div id="a2hs-steps" style="display:none;font-size:13px;margin-top:8px;line-height:1.6">'+t('a2hs_steps')+'</div><div style="display:flex;gap:8px;margin-top:10px"><button class="bp" style="font-size:13px;padding:8px 12px" onclick="toggleA2HSSteps()">'+t('a2hs_how')+'</button><button class="bg" style="font-size:13px;color:var(--brand-green)" onclick="dismissA2HS()">'+t('a2hs_later')+'</button></div></div></div></div>';
    return;
  }
  if(checkBackupNudge()){
    const sinceN=sessionsSinceBackup();
    el.innerHTML='<div class="prt" style="background:var(--tint-amber-1);border:1px solid var(--tint-amber-2);color:var(--tint-amber-text);display:flex;align-items:center;justify-content:space-between;gap:10px"><div style="display:flex;align-items:center;gap:8px;font-size:13px"><i class="ti ti-shield-check" aria-hidden="true" style="font-size:16px;flex-shrink:0"></i>'+(sinceN>0?(sinceN===1?t('bn_since_one'):t('bn_since_many').replace('{n}',sinceN)):t('bn_generic'))+'</div><div style="display:flex;gap:6px;flex-shrink:0"><button class="bp" style="padding:8px 12px;font-size:13px" onclick="backupNudgeExport()">'+t('bn_btn')+'</button><button class="bg" style="padding:8px 4px;font-size:13px;color:var(--tint-amber-text)" onclick="dismissBackupNudge()" aria-label="'+esc(t('btn_dismiss'))+'"><i class="ti ti-x" aria-hidden="true"></i></button></div></div>';
    localStorage.setItem('gp_backup_nudge_seen',new Date().toISOString());
    return;
  }
  if(checkDeload()){
    el.innerHTML='<div class="prt" style="background:var(--tint-amber-1);border:1px solid var(--tint-amber-2);color:var(--tint-amber-text);display:flex;align-items:center;justify-content:space-between;gap:10px"><div style="display:flex;align-items:center;gap:8px;font-size:13px"><i class="ti ti-battery-1" aria-hidden="true" style="font-size:16px;flex-shrink:0"></i>'+t('dl_text')+'</div><div style="display:flex;gap:6px;flex-shrink:0"><button class="bp" style="padding:8px 12px;font-size:13px" onclick="applyDeload()">'+t('dl_btn')+'</button><button class="bg" style="padding:8px 4px;font-size:13px;color:var(--tint-amber-text)" onclick="dismissDeload()" aria-label="'+esc(t('btn_dismiss'))+'"><i class="ti ti-x" aria-hidden="true"></i></button></div></div>';
    return;
  }
  if(checkGymNudge()){
    el.innerHTML='<div class="prt" style="background:var(--tint-green-1);border:1px solid var(--tint-green-2);color:var(--brand-green);display:flex;align-items:center;justify-content:space-between;gap:10px"><div style="display:flex;align-items:center;gap:8px;font-size:13px"><i class="ti ti-barbell" aria-hidden="true" style="font-size:16px;flex-shrink:0"></i>'+t('gn_text')+'</div><div style="display:flex;gap:6px;flex-shrink:0"><button class="bp" style="padding:8px 12px;font-size:13px" onclick="openGymSettings()">'+t('gn_btn')+'</button><button class="bg" style="padding:8px 4px;font-size:13px;color:var(--brand-green)" onclick="dismissGymNudge()" aria-label="'+esc(t('btn_dismiss'))+'"><i class="ti ti-x" aria-hidden="true"></i></button></div></div>';
    return;
  }
  el.innerHTML='';
}
// Existing users never saw the onboarding gym step, so nudge the ones with no
// inventory at all. Opens the full settings screen first: the gym sub-screen's
// back button runs collectSettingsFields(), which reads every settings input,
// so jumping straight to it would blank the fields openSettings() populates.
// Waits for the first logged workout so a new user's first screen is just "pick a day".
function checkGymNudge(){
  if(!CFG.setup||CFG.gymNudgeDismissed||!ST.history.length)return false;
  return !gymHasPlateInventory()&&!(CFG.gymDumbbells||[]).length&&!(CFG.gymKettlebells||[]).length;
}
function openGymSettings(){openSettings();ss('setequip');}
function dismissGymNudge(){CFG.gymNudgeDismissed=true;saveCFG();renderHomeBanners();}
function checkDeload(){
  if(CFG.deloadActive)return false;
  if(ST.history.length-CFG.deloadDismissedAtLen<3)return false;
  const recent=ST.history.slice(-3);
  if(recent.length<3)return false;
  if(recent.every(h=>h.feel==='hard'||h.feel==='max'))return true;
  for(const name of Object.values(PR_KEY_LIFTS)){
    // Deload sessions are planned light days, not a stall. Holding the same
    // weight is what the 1–2 RIR rule asks for, so a stall needs a real drop.
    const hist=exHistory(name).filter(x=>!x.deload);
    if(hist.length<3)continue;
    const bests=hist.slice(-3).map(s=>Math.max(0,...s.sets.map(st=>e1rm(st.w,st.r))));
    if(bests.every(b=>b>0)&&bests[2]<bests[0]&&bests[1]<=bests[0])return true;
  }
  return false;
}
function applyDeload(){CFG.deloadActive=true;saveCFG();renderHomeBanners();}
function dismissDeload(){CFG.deloadDismissedAtLen=ST.history.length;saveCFG();renderHomeBanners();}
function toggleA2HSSteps(){const s=gid('a2hs-steps');if(s)s.style.display=s.style.display==='none'?'block':'none';}
function dismissA2HS(){localStorage.setItem('gp_a2hs_dismissed','true');renderHomeBanners();}
function iosWarnDue(){let d=null;try{d=localStorage.getItem('gp_ios_warn_dismissed');}catch(e){}return !d||(Date.now()-new Date(d).getTime())/864e5>=30;}
function dismissIOSWarn(){try{localStorage.setItem('gp_ios_warn_dismissed',new Date().toISOString());}catch(e){}renderHomeBanners();}
function sessionsSinceBackup(){return Math.max(0,ST.history.length-Math.max(CFG.exportedAtHistoryLen||0,CFG.backupNudgeDismissedAtLen||0));}
function checkBackupNudge(){
  if(!ST.history.length)return false;
  const exp=localStorage.getItem('gp_last_export'),seen=localStorage.getItem('gp_backup_nudge_seen');
  const ref=Math.max(exp?new Date(exp).getTime():0,seen?new Date(seen).getTime():0);
  const timeDue=!ref||(Date.now()-ref)/86400000>=(CFG.backupEveryDays||7);
  return timeDue||sessionsSinceBackup()>=15;
}
function dismissBackupNudge(){localStorage.setItem('gp_backup_nudge_seen',new Date().toISOString());CFG.backupNudgeDismissedAtLen=ST.history.length;saveCFG();gid('prt-h').innerHTML='';}
function backupNudgeExport(){exportData();gid('prt-h').innerHTML='';}

let fbType='';
function setFBType(type){
  fbType=type;
  const map={'Bug report':'bug','Feature request':'feat','General feedback':'gen'};
  ['bug','feat','gen'].forEach(x=>{const el=gid('fb-'+x);if(el)el.classList.toggle('on',map[type]===x);});
}
async function sendFeedback(){
  if(!fbType){alert(t('fb_pick_type'));return;}
  const subj=gid('fb-subject').value.trim();
  const msg=gid('fb-message').value.trim();
  if(!subj||!msg){alert(t('fb_fill'));return;}
  const btn=gid('fb-send-btn');
  btn.disabled=true;btn.textContent=t('fb_sending');
  const splitName=(SPLITS.find(s=>s.id===CFG.split)||{name:CFG.split}).name;
  try{
    await loadLib('emailjs');
    await emailjs.send(EMAILJS_SERVICE_ID,EMAILJS_TEMPLATE_ID,{
      feedback_type:fbType,subject:subj,message:msg,
      from_name:CFG.name||'GainPath User',
      reply_to:gid('fb-email').value.trim()||'no-reply@gainpath.app',
      user_name:CFG.name,user_sex:CFG.sex,user_split:splitName,user_exp:CFG.exp
    });
    gid('fb-status').style.color='#3C8464';
    gid('fb-status').textContent=t('fb_sent');
    gid('fb-subject').value='';gid('fb-message').value='';gid('fb-email').value='';
    fbType='';['bug','feat','gen'].forEach(x=>{const el=gid('fb-'+x);if(el)el.classList.remove('on');});
  }catch(e){
    gid('fb-status').style.color='#E24B4A';
    gid('fb-status').textContent=t('fb_failed');
  }
  btn.disabled=false;btn.innerHTML='<i class="ti ti-send" aria-hidden="true"></i> '+t('btn_send_feedback');
}
