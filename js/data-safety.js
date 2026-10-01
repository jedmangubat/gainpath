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
    try{const file=new File([json],name,{type:'application/json'});if(navigator.canShare({files:[file]})){await navigator.share({files:[file],title:'GainPath backup'});shared=true;}}
    catch(e){if(e&&e.name==='AbortError')return;}
  }
  if(!shared){const url=URL.createObjectURL(new Blob([json],{type:'application/json'}));const a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
  try{localStorage.setItem('gp_last_export',data.exported);}catch(e){}
  CFG.exportedAtHistoryLen=ST.history.length;saveCFG();
  const st=gid('ex-st');if(st){st.textContent=shared?'Backup saved!':'Backup downloaded!';setTimeout(()=>{st.textContent='';},4000);}
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
  gid('ex-st').textContent='CSV downloaded!';setTimeout(()=>{gid('ex-st').textContent='';},4000);
  track('data_exported');
}
// Strip HTML metacharacters from every string in an imported backup — legit
// GainPath data never contains <>, and several render paths use innerHTML.
function sanitizeImport(v){
  if(typeof v==='string')return v.replace(/[<>]/g,'');
  if(Array.isArray(v))return v.map(sanitizeImport);
  if(v&&typeof v==='object'){const o={};Object.keys(v).forEach(k=>{o[sanitizeImport(k)]=sanitizeImport(v[k]);});return o;}
  return v;
}
function validateBackup(data){
  if(!data||typeof data!=='object'||Array.isArray(data))throw new Error('not a backup object');
  if(!data.cfg&&!data.history)throw new Error('no GainPath data in file');
  if(data.history&&!Array.isArray(data.history))throw new Error('bad history');
  if(data.bw&&!Array.isArray(data.bw))throw new Error('bad bw');
  if(data.prs&&(typeof data.prs!=='object'||Array.isArray(data.prs)))throw new Error('bad prs');
  if(data.mw&&(typeof data.mw!=='object'||Array.isArray(data.mw)))throw new Error('bad mw');
  if(data.cfg&&(typeof data.cfg!=='object'||Array.isArray(data.cfg)))throw new Error('bad cfg');
  return data;
}
// PRs and badges are derived, so they are rebuilt from the restored history
// rather than trusted from the file.
function applyBackup(data){
  if(data.cfg)CFG=Object.assign(CFG,data.cfg);
  if(data.history)ST.history=data.history.filter(h=>h&&typeof h==='object'&&!Array.isArray(h));
  if(data.prs)ST.prs=data.prs;if(data.mw){ST.mw=data.mw;migrateMW();}
  if(data.bw)ST.bw=data.bw.filter(e=>e&&typeof e==='object'&&!Array.isArray(e));
  syncProgramMeta();migrateDkTz();mergeCustomExercises();syncBW(true);recomputePRs();recomputeBadges();saveCFG();saveData();accentColor();
}
function restoreDone(msg){refreshHome();ss('home');renderBackupStatus();const st=gid('ex-st');if(st){st.textContent=msg;setTimeout(()=>{st.textContent='';},4000);}}
// Restoring replaces everything, so: confirm when there is data to lose, and
// keep a copy of it (gp_pre_restore) for "Undo last restore". If that copy
// can't be stored, stop and ask for an export first rather than risk it.
function importData(input){const file=input.files[0];if(!file)return;const reader=new FileReader();reader.onload=e=>{
  let data;
  try{data=validateBackup(sanitizeImport(JSON.parse(e.target.result)));}catch(err){const st=gid('ex-st');if(st)st.textContent='Error: invalid backup file.';return;}
  const had=ST.history.length;
  if(had&&!confirm('Replace your current data ('+had+' session'+(had===1?'':'s')+') with this backup? You can undo this from Reports & backup.'))return;
  if(had){try{localStorage.setItem('gp_pre_restore',JSON.stringify(backupPayload()));}catch(err){const st=gid('ex-st');if(st)st.textContent='Not enough space to keep a copy of your current data. Tap Export first, then restore.';return;}}
  applyBackup(data);restoreDone(SAVE_FAILED?'Restored for now, but it couldn’t be saved — back up again.':'Data restored!');
};reader.readAsText(file);input.value='';}
function undoRestore(){
  let prev=null;try{prev=JSON.parse(localStorage.getItem('gp_pre_restore')||'null');}catch(e){prev=null;}
  if(!prev||!confirm('Undo the last restore and go back to the data you had before it?'))return;
  applyBackup(validateBackup(prev));if(!SAVE_FAILED){try{localStorage.removeItem('gp_pre_restore');}catch(e){}}
  restoreDone('Restore undone.');
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
    el.innerHTML='<div class="prt prt-alert"><div style="display:flex;align-items:flex-start;gap:8px"><i class="ti ti-alert-triangle" aria-hidden="true" style="font-size:16px;flex-shrink:0;margin-top:1px"></i><div style="flex:1"><div style="font-weight:600">Your workouts could be deleted</div><div style="font-size:13px;margin-top:2px;line-height:1.5">iPhone erases a website’s saved data if you don’t open it for 7 days. Installing GainPath to your Home Screen stops this.</div><div id="a2hs-steps" style="display:none;font-size:13px;margin-top:8px;line-height:1.6">'+(has?'1. Tap “Back up” below and save the file<br>2. ':'1. ')+'Tap <i class="ti ti-upload" aria-hidden="true"></i> Share in Safari’s toolbar<br>'+(has?'3. ':'2. ')+'Tap “Add to Home Screen”, then “Add”<br>'+(has?'4. Open GainPath from the new icon. If your workouts aren’t there, tap “Already used GainPath before?” and pick the backup file':'3. Open GainPath from the new icon')+'</div><div style="display:flex;gap:8px;margin-top:10px;flex-wrap:wrap"><button class="bp" style="font-size:13px;padding:8px 12px" onclick="toggleA2HSSteps()">How to install</button>'+(has?'<button class="bs" style="font-size:13px;padding:8px 12px" onclick="exportData()">Back up</button>':'')+'<button class="bg" style="font-size:13px;color:var(--alert-txt)" onclick="dismissIOSWarn()">Later</button></div></div></div></div>';
    return;
  }
  if(!isStandalone()&&!isIOS()&&localStorage.getItem('gp_a2hs_dismissed')!=='true'){
    el.innerHTML='<div class="prt" style="background:var(--tint-green-1);border:1px solid var(--tint-green-2);color:var(--brand-green);display:block"><div style="display:flex;align-items:flex-start;gap:8px"><i class="ti ti-home-2" aria-hidden="true" style="font-size:16px;flex-shrink:0;margin-top:1px"></i><div style="flex:1"><div style="font-weight:600">Keep GainPath handy</div><div style="font-size:13px;margin-top:2px;line-height:1.5">Install it on your Home Screen for one-tap access — and to make sure Safari never quietly clears your saved workouts.</div><div id="a2hs-steps" style="display:none;font-size:13px;margin-top:8px;line-height:1.6">1. Tap <i class="ti ti-upload" aria-hidden="true"></i> Share in Safari’s toolbar<br>2. Scroll down and tap “Add to Home Screen”<br>3. Tap “Add”</div><div style="display:flex;gap:8px;margin-top:10px"><button class="bp" style="font-size:13px;padding:8px 12px" onclick="toggleA2HSSteps()">How to add</button><button class="bg" style="font-size:13px;color:var(--brand-green)" onclick="dismissA2HS()">Maybe later</button></div></div></div></div>';
    return;
  }
  if(checkBackupNudge()){
    const sinceN=sessionsSinceBackup();
    el.innerHTML='<div class="prt" style="background:var(--tint-amber-1);border:1px solid var(--tint-amber-2);color:var(--tint-amber-text);display:flex;align-items:center;justify-content:space-between;gap:10px"><div style="display:flex;align-items:center;gap:8px;font-size:13px"><i class="ti ti-shield-check" aria-hidden="true" style="font-size:16px;flex-shrink:0"></i>'+(sinceN>0?sinceN+' session'+(sinceN===1?'':'s')+' since your last backup — back up now?':'Back up your data to keep it safe.')+'</div><div style="display:flex;gap:6px;flex-shrink:0"><button class="bp" style="padding:8px 12px;font-size:13px" onclick="backupNudgeExport()">Back up now</button><button class="bg" style="padding:8px 4px;font-size:13px;color:var(--tint-amber-text)" onclick="dismissBackupNudge()"><i class="ti ti-x" aria-hidden="true"></i></button></div></div>';
    localStorage.setItem('gp_backup_nudge_seen',new Date().toISOString());
    return;
  }
  if(checkDeload()){
    el.innerHTML='<div class="prt" style="background:var(--tint-amber-1);border:1px solid var(--tint-amber-2);color:var(--tint-amber-text);display:flex;align-items:center;justify-content:space-between;gap:10px"><div style="display:flex;align-items:center;gap:8px;font-size:13px"><i class="ti ti-battery-1" aria-hidden="true" style="font-size:16px;flex-shrink:0"></i>Feeling beat up lately? A deload week (-30% weights) can help you recover.</div><div style="display:flex;gap:6px;flex-shrink:0"><button class="bp" style="padding:8px 12px;font-size:13px" onclick="applyDeload()">Deload next session</button><button class="bg" style="padding:8px 4px;font-size:13px;color:var(--tint-amber-text)" onclick="dismissDeload()"><i class="ti ti-x" aria-hidden="true"></i></button></div></div>';
    return;
  }
  if(checkGymNudge()){
    el.innerHTML='<div class="prt" style="background:var(--tint-green-1);border:1px solid var(--tint-green-2);color:var(--brand-green);display:flex;align-items:center;justify-content:space-between;gap:10px"><div style="display:flex;align-items:center;gap:8px;font-size:13px"><i class="ti ti-barbell" aria-hidden="true" style="font-size:16px;flex-shrink:0"></i>Tell GainPath which plates and dumbbells you have, and it will only suggest weights you can actually load.</div><div style="display:flex;gap:6px;flex-shrink:0"><button class="bp" style="padding:8px 12px;font-size:13px" onclick="openGymSettings()">Set up</button><button class="bg" style="padding:8px 4px;font-size:13px;color:var(--brand-green)" onclick="dismissGymNudge()"><i class="ti ti-x" aria-hidden="true"></i></button></div></div>';
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
  return !gymHasPlateInventory()&&!(CFG.gymDumbbells||[]).length;
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
function setFBType(t){
  fbType=t;
  const map={'Bug report':'bug','Feature request':'feat','General feedback':'gen'};
  ['bug','feat','gen'].forEach(x=>{const el=gid('fb-'+x);if(el)el.classList.toggle('on',map[t]===x);});
}
async function sendFeedback(){
  if(!fbType){alert('Please select a feedback type');return;}
  const subj=gid('fb-subject').value.trim();
  const msg=gid('fb-message').value.trim();
  if(!subj||!msg){alert('Please fill in subject and message');return;}
  const btn=gid('fb-send-btn');
  btn.disabled=true;btn.textContent='Sending...';
  const splitName=(SPLITS.find(s=>s.id===CFG.split)||{name:CFG.split}).name;
  try{
    await emailjs.send(EMAILJS_SERVICE_ID,EMAILJS_TEMPLATE_ID,{
      feedback_type:fbType,subject:subj,message:msg,
      from_name:CFG.name||'GainPath User',
      reply_to:gid('fb-email').value.trim()||'no-reply@gainpath.app',
      user_name:CFG.name,user_sex:CFG.sex,user_split:splitName,user_exp:CFG.exp
    });
    gid('fb-status').style.color='#3C8464';
    gid('fb-status').textContent='\u2713 Feedback sent! Thank you.';
    gid('fb-subject').value='';gid('fb-message').value='';gid('fb-email').value='';
    fbType='';['bug','feat','gen'].forEach(x=>{const el=gid('fb-'+x);if(el)el.classList.remove('on');});
  }catch(e){
    gid('fb-status').style.color='#E24B4A';
    gid('fb-status').textContent='Failed to send. Please try again.';
  }
  btn.disabled=false;btn.innerHTML='<i class="ti ti-send" aria-hidden="true"></i> Send feedback';
}
