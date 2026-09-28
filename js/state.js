// GainPath: the CFG/ST state and load()
// A plain script (not a module) sharing one global scope with the other
// js/ files; index.html sets the load order. Map: docs/index-section-map.md
// ═══ STATE ═══
let CFG={name:'',firstName:'',lastName:'',lang:'en',sex:'male',bw:75,ht:175,bf:null,unit:'kg',exp:'intermediate',goal:'definition',split:'pplul',freq:5,lastWorkout:'',warmup:true,wuReps:12,prefReps:10,prefRepsChangedAt:null,prefRest:90,prefSets:3,startingWeights:'ai',keyLifts:{},setup:false,customDays:{},dayLinks:{},dayPlan:{},customProgram:null,restSound:true,darkMode:false,wuSteps:1,setStyle:'straight',
  customExercises:[],gymPlates:{},dumbbellInc:null,dumbbellMax:null,gymNudgeDismissed:false,
  restDays:[],restWeeks:[],
  wakeLock:false,
  healthSync:false,healthSyncStartShortcut:'GainPath Start Workout',healthSyncEndShortcut:'GainPath End Workout',
  leadEmail:'',leadSubmitted:false,
  lastSeenVersion:'0',tutorialSeen:false,badgesIntroSeen:false,
  exportedAtHistoryLen:0,backupNudgeDismissedAtLen:0,
  deloadDismissedAtLen:-99};
let ST={day:null,exi:0,sd:[],rt:null,rs:90,restTotal:90,et:null,es:0,t0:null,paused:false,history:[],prs:{},badges:{},mw:{},chart:null,pendingRec:null,mwQueue:[],mwCurrent:null,fswPending:false,restEnd:null,restInfo:null,rFbHtml:null,rNxHtml:null,editDay:null,editList:[],swapIdx:null,swapPart:null,swapSearch:'',prOpenMG:{},chSeg:'strength',chRange:'1m',histAll:false,bwAll:false,editMid:false,editIncludeCurrent:false,plateIdx:null,bw:[],bwChart:null,feelQueue:[],feelTarget:null,ssGroupEnd:null,editProg:false,progDraft:null,restRated:false,calMonth:null};
let HOLD_TIMER=null,HOLD_START=null,HOLD_IDX=null,HOLD_TARGET=null,HOLD_ALERTED=false,DE_EXPANDED=null;
function startHoldTimerInterval(i){
  HOLD_TIMER=setInterval(()=>{
    const secs=Math.round((Date.now()-HOLD_START)/1000);
    const el=gid('hold-t-'+i);if(el)el.textContent=fmt(secs);
    if(HOLD_TARGET){
      const remain=HOLD_TARGET-secs;
      if(remain>=1&&remain<=5){beep(880,.15);vib(100);}
      else if(remain<=0&&!HOLD_ALERTED){HOLD_ALERTED=true;beep(1320,.28);setTimeout(()=>beep(1760,.4),350);vib([200,100,300]);}
    }
  },1000);
}
let wakeLockSentinel=null;
async function requestWakeLock(){
  if(!CFG.wakeLock||!('wakeLock' in navigator))return;
  try{wakeLockSentinel=await navigator.wakeLock.request('screen');}catch(e){}
}
function releaseWakeLock(){
  if(wakeLockSentinel){wakeLockSentinel.release().catch(()=>{});wakeLockSentinel=null;}
}
document.addEventListener('visibilitychange',()=>{
  if(document.visibilityState==='visible'&&ST.day&&CFG.wakeLock&&!wakeLockSentinel)requestWakeLock();
});

// ═══ APPLE WATCH SYNC (via Shortcuts — GainPath has no direct HealthKit access) ═══
function healthSyncTrigger(phase){
  if(!CFG.healthSync)return;
  const name=phase==='start'?CFG.healthSyncStartShortcut:CFG.healthSyncEndShortcut;
  if(!name)return;
  try{location.href='shortcuts://run-shortcut?name='+encodeURIComponent(name);}catch(e){}
}
let OB={firstName:'',lang:'en',sex:'',unit:'kg',exp:'',freq:0,split:'',keyLifts:{},step:1};
const OB_STEPS=3;

function load(){try{const c=localStorage.getItem('gp_cfg');if(c)CFG=Object.assign(CFG,JSON.parse(c));ST.history=JSON.parse(localStorage.getItem('gp_h')||'[]');ST.prs=JSON.parse(localStorage.getItem('gp_p')||'{}');ST.mw=JSON.parse(localStorage.getItem('gp_mw')||'{}');ST.bw=JSON.parse(localStorage.getItem('gp_bw')||'[]');syncProgramMeta();migrateDkTz();migrateDumbbellInc();migrateName();migrateMW();mergeCustomExercises();syncBW(true);}catch(e){}}
// One-time migration: CFG.name used to be a single field; split it into
// firstName/lastName on first load so the greeting can address just the first name.
function migrateName(){
  if(!CFG.firstName&&CFG.name){const parts=CFG.name.trim().split(/\s+/);CFG.firstName=parts[0]||'';CFG.lastName=parts.slice(1).join(' ');}
}
function updateFullName(){CFG.name=(CFG.firstName+' '+CFG.lastName).trim();}
