// GainPath: migrations, saving, the IndexedDB mirror and in-progress workouts
// A plain script (not a module) sharing one global scope with the other
// js/ files; index.html sets the load order. Map: docs/index-section-map.md
// One-time migration: old uniform dumbbellInc/dumbbellMax settings become an
// explicit list of owned weights, since real racks aren't a uniform step
// (e.g. 1kg jumps below 10kg, 2.5kg jumps above) and a single increment can't
// represent that.
function migrateDumbbellInc(){
  if(CFG.gymDumbbells!==undefined)return;
  CFG.gymDumbbells=[];
  if(CFG.dumbbellInc>0){
    const max=CFG.dumbbellMax>0?CFG.dumbbellMax:(CFG.unit==='kg'?50:120);
    for(let w=CFG.dumbbellInc;w<=max+1e-6;w+=CFG.dumbbellInc)CFG.gymDumbbells.push(Math.round(w*100)/100);
  }
}
function mergeCustomExercises(){
  (CFG.customExercises||[]).forEach(ex=>{
    if(!EXPOOL[ex.name]){EXPOOL[ex.name]=ex;(EXPOOL_BY_MG[ex.mg]=EXPOOL_BY_MG[ex.mg]||[]).push(ex);EXPOOL_BY_MG[ex.mg].sort(equipSort);}
  });
}
// One-time repair: dk/mk used to be derived via toISOString() (UTC), so sessions
// logged before 08:00 in UTC+ timezones were stamped with the previous day's key.
// The human-readable `date` field was always local — recompute dk/mk from it.
function migrateDkTz(){
  let chg=false;
  ST.history.forEach(h=>{
    if(!h||!h.date)return;
    const d=new Date(h.date);
    if(isNaN(d))return;
    const k=dkey(d);
    if(h.dk!==k||h.mk!==mkey(d)){h.dk=k;h.mk=mkey(d);chg=true;}
  });
  if(chg)saveData();
}
// A failed save used to be swallowed silently (catch(e){}), so a full or
// blocked storage lost workouts without a word. Now any failure raises a
// fixed alert on every screen until a later save succeeds; Back up works from
// memory, so the data can still be rescued.
let SAVE_FAILED=false,STORAGE_PERSISTED=null;
function saveFailed(){
  if(SAVE_FAILED)return;SAVE_FAILED=true;const el=gid('save-alert');if(!el)return;
  el.innerHTML='<i class="ti ti-alert-triangle" aria-hidden="true" style="font-size:18px;flex-shrink:0"></i><div style="flex:1"><strong>Couldn’t save.</strong> Your latest changes aren’t stored on this device (storage is full or blocked). Back up now so nothing is lost.</div><button class="bp" style="padding:8px 12px;font-size:13px;flex-shrink:0" onclick="exportData()">Back up</button>';
  el.style.display='flex';
}
function saveOK(){if(!SAVE_FAILED)return;SAVE_FAILED=false;const el=gid('save-alert');if(el)el.style.display='none';}
function lsSave(k,v){localStorage.setItem(k,v);idbMirror(k,v);}
function saveCFG(){try{lsSave('gp_cfg',JSON.stringify(CFG));saveOK();}catch(e){saveFailed();}}
function saveData(){try{lsSave('gp_h',JSON.stringify(ST.history));lsSave('gp_p',JSON.stringify(ST.prs));lsSave('gp_mw',JSON.stringify(ST.mw));lsSave('gp_bw',JSON.stringify(ST.bw));saveOK();}catch(e){saveFailed();}}
// ═══ INDEXEDDB MIRROR — every save also lands in IndexedDB ('gainpath' db) ═══
// localStorage stays the copy the app reads (synchronously, at boot). IndexedDB
// is a verified second copy with far more room:
//  1. First run: a full snapshot of every gp_* key goes to the `backups` store
//     (key IDB_BACKUP_KEY; kept at least two releases, nothing deletes it yet).
//  2. All gp_* keys are copied into `kv` in ONE transaction (all or nothing),
//     read back and compared value by value, and gp_h session by session.
//     Only a full match writes meta.migration={state:'verified'}; until then
//     nothing is mirrored and it simply re-runs next launch (safe to repeat,
//     safe if interrupted). A mismatch records state:'failed' + the reason,
//     logs it, and leaves localStorage exactly as it was.
//  3. After that, every localStorage save is mirrored (lsSave → idbMirror).
//  4. IndexedDB is only ever *read* if localStorage has lost the profile
//     (no gp_cfg) while a verified mirror still has a set-up one: the mirror
//     is written back and the app reloads once. resetApp() clears both, so a
//     deliberate erase stays erased.
const IDB_NAME='gainpath',IDB_BACKUP_KEY='pre-idb-2.9.0';
let IDB=null,IDB_READY=false;const IDB_PENDING={};
function idbReq(r){return new Promise((res,rej)=>{r.onsuccess=()=>res(r.result);r.onerror=()=>rej(r.error);});}
function idbTx(stores,mode,fn){return new Promise((res,rej)=>{const tx=IDB.transaction(stores,mode);let out;Promise.resolve(fn(tx)).then(v=>{out=v;});tx.oncomplete=()=>res(out);tx.onerror=()=>rej(tx.error);tx.onabort=()=>rej(tx.error||new Error('aborted'));});}
function idbOpen(){return new Promise((res,rej)=>{const r=window.indexedDB.open(IDB_NAME,1);r.onupgradeneeded=()=>{const d=r.result;['kv','meta','backups'].forEach(n=>{if(!d.objectStoreNames.contains(n))d.createObjectStore(n);});};r.onsuccess=()=>res(r.result);r.onerror=()=>rej(r.error);r.onblocked=()=>rej(new Error('blocked'));});}
function lsSnapshot(){const o={};for(let i=0;i<localStorage.length;i++){const k=localStorage.key(i);if(k&&k.indexOf('gp_')===0)o[k]=localStorage.getItem(k);}return o;}
function idbMirror(k,v){if(!IDB_READY){IDB_PENDING[k]=v;return;}try{IDB.transaction('kv','readwrite').objectStore('kv').put(v,k);}catch(e){}}
function idbMirrorDelete(k){if(!IDB_READY){IDB_PENDING[k]=null;return;}try{IDB.transaction('kv','readwrite').objectStore('kv').delete(k);}catch(e){}}
// Pure comparison, so the rules are testable: every snapshot key must be in
// the mirror with the identical string, and gp_h must match session by session.
function idbVerify(snap,kv){
  for(const k of Object.keys(snap)){
    if(kv[k]!==snap[k]){
      if(k==='gp_h'){let a,b;try{a=JSON.parse(snap[k]);b=JSON.parse(kv[k]);}catch(e){return 'gp_h unreadable in mirror';}
        if(!Array.isArray(b)||a.length!==b.length)return 'gp_h has '+(Array.isArray(b)?b.length:'no')+' sessions, expected '+a.length;
        for(let i=0;i<a.length;i++)if(JSON.stringify(a[i])!==JSON.stringify(b[i]))return 'gp_h session '+i+' differs';}
      return k+' differs';
    }
  }
  return null;
}
async function idbInit(){
  if(!window.indexedDB)return;
  try{
    IDB=await idbOpen();
    let mig=await idbTx('meta','readonly',tx=>idbReq(tx.objectStore('meta').get('migration')));
    if(!mig||mig.state!=='verified'){
      const snap=lsSnapshot();
      const hasBackup=await idbTx('backups','readonly',tx=>idbReq(tx.objectStore('backups').getKey(IDB_BACKUP_KEY)));
      if(hasBackup===undefined)await idbTx('backups','readwrite',tx=>{tx.objectStore('backups').put({at:new Date().toISOString(),version:APP_VERSION,data:snap},IDB_BACKUP_KEY);});
      await idbTx('kv','readwrite',tx=>{const st=tx.objectStore('kv');Object.keys(snap).forEach(k=>st.put(snap[k],k));});
      const kv={};await idbTx('kv','readonly',tx=>Promise.all(Object.keys(snap).map(k=>idbReq(tx.objectStore('kv').get(k)).then(v=>{kv[k]=v;}))));
      const why=idbVerify(snap,kv);
      mig=why?{state:'failed',reason:why,at:new Date().toISOString(),version:APP_VERSION}:{state:'verified',at:new Date().toISOString(),version:APP_VERSION,keys:Object.keys(snap).length};
      await idbTx('meta','readwrite',tx=>{tx.objectStore('meta').put(mig,'migration');});
      if(why){console.warn('[GainPath] IndexedDB mirror not enabled, verification failed: '+why+'. Still using localStorage only.');IDB_ACTIVE_STATE=mig;return;}
    }
    IDB_ACTIVE_STATE=mig;
    if(await idbRecover())return;
    IDB_READY=true;
    Object.keys(IDB_PENDING).forEach(k=>{const v=IDB_PENDING[k];delete IDB_PENDING[k];if(v===null)idbMirrorDelete(k);else idbMirror(k,v);});
  }catch(e){console.warn('[GainPath] IndexedDB unavailable, using localStorage only:',e&&e.message);}
}
let IDB_ACTIVE_STATE=null;
async function idbRecover(){
  if(localStorage.getItem('gp_cfg'))return false;
  let flag=null;try{flag=window.sessionStorage.getItem('gp_idb_recovered');}catch(e){}
  if(flag)return false;
  const all={};await idbTx('kv','readonly',tx=>new Promise(res=>{const r=tx.objectStore('kv').openCursor();r.onsuccess=()=>{const c=r.result;if(!c)return res();all[c.key]=c.value;c.continue();};}));
  let cfg=null;try{cfg=JSON.parse(all.gp_cfg||'null');}catch(e){}
  if(!cfg||!cfg.setup)return false;
  Object.keys(all).forEach(k=>{try{localStorage.setItem(k,all[k]);}catch(e){}});
  try{window.sessionStorage.setItem('gp_idb_recovered','1');}catch(e){}
  console.warn('[GainPath] localStorage had lost your data; restored it from the IndexedDB mirror.');
  location.reload();return true;
}
async function idbClear(){try{if(!IDB)IDB=await idbOpen();await idbTx(['kv','meta'],'readwrite',tx=>{tx.objectStore('kv').clear();tx.objectStore('meta').clear();});}catch(e){}}
function saveInProgress(){
  if(!ST.day&&!ST.editDay)return;
  const activeEl=document.querySelector('.screen.active');
  const screen=activeEl?activeEl.id.replace('s-',''):(ST.day?'wo':'dayedit');
  const wip={day:ST.day,exi:ST.exi,sd:ST.sd,t0:ST.t0,paused:ST.paused||false,es:ST.es,pendingRec:ST.pendingRec,mwQueue:ST.mwQueue,mwCurrent:ST.mwCurrent,restEnd:ST.restEnd||null,restTotal:ST.restTotal||null,restInfo:ST.restInfo||null,rFbHtml:ST.rFbHtml||null,rNxHtml:ST.rNxHtml||null,plateIdx:ST.plateIdx,feelQueue:ST.feelQueue,feelTarget:ST.feelTarget,ssGroupEnd:ST.ssGroupEnd,restRated:ST.restRated||false,screen,ts:Date.now()};
  if(ST.editDay){wip.editDay=ST.editDay;wip.editList=ST.editList;wip.editMid=ST.editMid;wip.editIncludeCurrent=ST.editIncludeCurrent;wip.swapIdx=ST.swapIdx;wip.swapPart=ST.swapPart;wip.swapSearch=ST.swapSearch;wip.deExpanded=DE_EXPANDED;}
  if(HOLD_IDX!==null){wip.holdIdx=HOLD_IDX;wip.holdStart=HOLD_START;wip.holdTarget=HOLD_TARGET;wip.holdAlerted=HOLD_ALERTED;}
  try{lsSave('gp_wip',JSON.stringify(wip));saveOK();}catch(e){saveFailed();}
}
function clearInProgress(){try{localStorage.removeItem('gp_wip');}catch(e){}idbMirrorDelete('gp_wip');}
function restoreInProgress(){
  let wip;
  try{wip=JSON.parse(localStorage.getItem('gp_wip')||'null');}catch(e){wip=null;}
  if(!wip||(!wip.day&&!wip.editDay))return false;
  if(wip.day){
    requestWakeLock();
    ST.day=wip.day;ST.exi=wip.exi;ST.sd=wip.sd;ST.t0=wip.t0;ST.pendingRec=wip.pendingRec;
    ST.mwQueue=wip.mwQueue||[];ST.mwCurrent=wip.mwCurrent||null;
    ST.restEnd=wip.restEnd||null;ST.restTotal=wip.restTotal||ST.rs||90;ST.restInfo=wip.restInfo||null;ST.rFbHtml=wip.rFbHtml||null;ST.rNxHtml=wip.rNxHtml||null;
    ST.plateIdx=wip.plateIdx!==undefined?wip.plateIdx:null;
    ST.feelQueue=wip.feelQueue||[];ST.feelTarget=wip.feelTarget!==undefined?wip.feelTarget:null;ST.ssGroupEnd=wip.ssGroupEnd!==undefined?wip.ssGroupEnd:null;ST.restRated=wip.restRated||false;
    ST.paused=wip.paused||false;
    if(ST.paused){ST.es=wip.es||0;clearInterval(ST.et);ST.et=null;const el=gid('wo-el');if(el)el.textContent=fmt(ST.es);}
    else{ST.es=Math.floor((Date.now()-ST.t0)/1000);startEtInterval();}
    updWoPauseBtn();
    gid('wo-tit').textContent=getDayName(ST.day);gid('prt-w').innerHTML='';
  }
  if(wip.editDay){
    ST.editDay=wip.editDay;ST.editList=wip.editList||[];ST.editMid=wip.editMid||false;ST.editIncludeCurrent=wip.editIncludeCurrent||false;
    ST.swapIdx=wip.swapIdx!==undefined?wip.swapIdx:null;ST.swapPart=wip.swapPart||null;ST.swapSearch=wip.swapSearch||'';
    DE_EXPANDED=wip.deExpanded!==undefined?wip.deExpanded:null;
    gid('de-tit').textContent=ST.editMid?(getDayName(ST.editDay)+' — remaining exercises'):getDayName(ST.editDay);
    gid('de-commit-btn').innerHTML=ST.editMid?'Save & continue <i class="ti ti-check" aria-hidden="true"></i>':'Start workout <i class="ti ti-arrow-right" aria-hidden="true"></i>';
    applyDeEditModeUI();
  }
  if(wip.holdIdx!==undefined&&wip.holdIdx!==null&&wip.holdStart){
    HOLD_IDX=wip.holdIdx;HOLD_START=wip.holdStart;HOLD_TARGET=wip.holdTarget!==undefined?wip.holdTarget:null;HOLD_ALERTED=wip.holdAlerted||false;
    startHoldTimerInterval(HOLD_IDX);
  }
  const scr=wip.screen;
  if(scr==='mw'&&ST.mwCurrent){renderMWScreen();}
  else if(scr==='plate'&&ST.plateIdx!==null&&ST.sd[ST.exi]){gid('plate-bar-inp').value='';renderPlateCalc();ss('plate');}
  else if(scr==='fsw'&&ST.sd[ST.exi]){showFSW(ST.sd[ST.exi].ex);}
  else if(scr==='exfeel'&&ST.sd[ST.exi]){askExFeel(ST.feelTarget!=null?ST.feelTarget:undefined);}
  else if(scr==='rest'&&ST.restInfo&&ST.sd[ST.exi]){
    const ex=ST.sd[ST.exi].ex;const{si,done,next,isLastSet}=ST.restInfo;
    gid('r-en').textContent=ex.name;
    gid('r-sl').textContent=isLastSet?'Set '+(done.t==='w'?'W':si+1)+' done — rest before next exercise':'Set '+(done.t==='w'?'W':si+1)+' done — rest before set '+(next.t==='w'?'W':si+2);
    gid('r-nx-h').textContent=isLastSet?(ST.exi<ST.sd.length-1?'Up next':'Almost there'):'Next set';
    ST.rs=Math.max(0,Math.round((ST.restEnd-Date.now())/1000));updT();
    gid('r-nx').innerHTML=ST.rNxHtml||'';
    gid('r-fb').innerHTML=ST.rFbHtml||'';
    if(isLastSet&&ST.restInfo.ssReturn==null){gid('r-feel').style.display='block';renderRestFeel(ST.exi);}else gid('r-feel').style.display='none';
    ss('rest');startRestCountdown();
  }
  else if(scr==='feel'){ss('feel');}
  else if(scr==='dayedit'&&ST.editDay){ss('dayedit');renderDayEdit();}
  else if(scr==='swap'&&ST.editDay&&(ST.swapIdx===null||ST.editList[ST.swapIdx])){
    gid('sw-tit').textContent=ST.swapIdx===null?'Add exercise':'Swap: '+ST.editList[ST.swapIdx].name;
    renderSwapParts();
    ss('swap');
  }
  else if(ST.day){renderEx();ss('wo');}
  else{ss('home');refreshHome();}
  return true;
}
