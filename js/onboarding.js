// GainPath: onboarding and the tutorial
// A plain script (not a module) sharing one global scope with the other
// js/ files; index.html sets the load order. Map: docs/index-section-map.md
function setSex(v){OB.sex=v;['male','female'].forEach(x=>gid('sex-'+x[0]).classList.toggle('on',x===v));}
function setUnit(v){
  OB.unit=v;
  gid('unit-kg').classList.toggle('on',v==='kg');gid('unit-lbs').classList.toggle('on',v==='lbs');
  ['unit-lbl1','unit-lbl2','unit-lbl3','unit-lbl4','unit-lbl5'].forEach(id=>{const el=gid(id);if(el)el.textContent=v;});
}
function setExp(v){OB.exp=v;['beginner','intermediate','advanced'].forEach(x=>gid('exp-'+x).classList.toggle('on',x===v));}
function setFreq(v){
  OB.freq=v;
  [2,3,4,5,6,7].forEach(x=>gid('freq-'+x).classList.toggle('on',x===v));
  const sugId=OB.exp==='beginner'?'bro':(SPLIT_FREQ[v]||'pplul');
  OB.split=sugId;
  const sugName=(SPLITS.find(s=>s.id===sugId)||{name:sugId}).name;
  gid('ob-split-suggest').textContent=OB.exp==='beginner'
    ?'Since you’re just starting out, we suggest: '+sugName+' — one muscle group per day is the simplest way to learn.'
    :'Based on '+v+' days/week, we suggest: '+sugName;
  gid('ob-split-wrap').style.display='block';
  renderSplitOpts('split-opts',OB.split,null);
}
function obToggleLifts(){gid('ob-lifts').style.display='block';gid('ob-lifts-btn').style.display='none';}
// ── Preferred reps: five presets plus a free-typed custom number, in Settings
// (prefix 'sreps', backed by CFG.prefReps). Onboarding offered the same chips
// until v2.9.0's shorter first run; the prefix stays so the ids don't change. Only the number is ever stored: "Custom" is the selected
// chip whenever that number isn't one of the presets, so the highlighting is
// derived and a custom value comes back correctly after a reload with no extra
// flag to keep in sync. REPS_CUSTOM_OPEN is transient UI only: it holds the
// field open from the tap on Custom until the value is committed, at which
// point the stored number decides the highlighting again.
const REP_PRESETS=[6,8,10,12,15];
const REPS_CUSTOM_OPEN={};
function repsVal(){return CFG.prefReps;}
function setRepsVal(p,v){CFG.prefReps=v;}
function renderRepOpts(p){
  const v=repsVal(p),custom=REPS_CUSTOM_OPEN[p]||REP_PRESETS.indexOf(v)<0;
  REP_PRESETS.forEach(x=>gid(p+'-'+x).classList.toggle('on',!custom&&x===v));
  gid(p+'-custom').classList.toggle('on',custom);
  gid(p+'-custom-wrap').style.display=custom?'block':'none';
  const inp=gid(p+'-custom-inp');if(document.activeElement!==inp)inp.value=custom?v:'';
}
function setRepsPreset(p,v){REPS_CUSTOM_OPEN[p]=false;setRepsVal(p,v);renderRepOpts(p);}
function openRepsCustom(p){REPS_CUSTOM_OPEN[p]=true;renderRepOpts(p);gid(p+'-custom-inp').focus();}
function updRepsCustom(p,v){const n=parseInt(v);if(n>0)setRepsVal(p,Math.min(50,n));}
function commitRepsCustom(p){
  setRepsVal(p,Math.max(1,Math.min(50,parseInt(gid(p+'-custom-inp').value)||repsVal(p))));
  REPS_CUSTOM_OPEN[p]=false;renderRepOpts(p);
  if(p==='sreps'){CFG.prefRepsChangedAt=dkey(new Date());saveCFG();}
}

function renderSplitOpts(containerId,selectedId,onSelect){
  const el=gid(containerId);el.innerHTML='';
  SPLITS.forEach(sp=>{
    const btn=document.createElement('button');
    btn.className='opt-btn'+(selectedId===sp.id?' on':'');
    btn.style.textAlign='left';btn.style.padding='12px 14px';btn.style.marginBottom='8px';
    btn.innerHTML='<div style="font-size:15px;font-weight:600">'+sp.name+'</div><div style="font-size:11px;font-weight:400;color:'+(selectedId===sp.id?'var(--accent-ink)':'var(--txt2)')+';margin-top:3px">'+sp.desc+'</div>';
    btn.onclick=()=>{OB.split=sp.id;renderSplitOpts(containerId,sp.id,onSelect);if(onSelect)onSelect(sp.id);};
    el.appendChild(btn);
  });
  if(containerId==='set-split-opts'&&CFG.customProgram){
    const sel=selectedId==='custom';
    const btn=document.createElement('button');
    btn.className='opt-btn'+(sel?' on':'');
    btn.style.textAlign='left';btn.style.padding='12px 14px';btn.style.marginBottom='8px';
    btn.innerHTML='<div style="font-size:15px;font-weight:600">'+esc(CFG.customProgram.name)+' <span class="bdg" style="background:'+(sel?'rgba(255,255,255,0.25)':'var(--accent)')+';color:#fff">Custom</span></div><div style="font-size:11px;font-weight:400;color:'+(sel?'rgba(255,255,255,0.8)':'var(--txt2)')+';margin-top:3px">Your custom program — '+CFG.customProgram.days.length+' day'+(CFG.customProgram.days.length===1?'':'s')+'</div>';
    btn.onclick=()=>{renderSplitOpts(containerId,'custom',onSelect);if(onSelect)onSelect('custom');};
    el.appendChild(btn);
  }
}

function obDots(){
  const el=gid('ob-dots');el.innerHTML='';
  for(let i=1;i<=OB_STEPS;i++){
    const d=document.createElement('div');
    d.className='ob-dot'+(i<=OB.step?' on':'');
    el.appendChild(d);
  }
}

function obNext(step){
  if(step===1){const fname=gid('ob-fname').value.trim();if(!fname){alert('Please enter your first name');return;}if(!OB.sex){alert('Please select your sex');return;}OB.firstName=fname;}
  if(step===2){const bw=parseFloat(gid('ob-bw').value);if(!bw||bw<30){alert('Please enter a valid body weight');return;}if(!OB.exp){alert('Please select your experience level');return;}OB.bw=bw;OB.keyLifts={squat:{w:parseFloat(gid('ob-sq-w').value)||0,r:parseInt(gid('ob-sq-r').value)||0},chest:{w:parseFloat(gid('ob-cp-w').value)||0,r:parseInt(gid('ob-cp-r').value)||0},lat:{w:parseFloat(gid('ob-lp-w').value)||0,r:parseInt(gid('ob-lp-r').value)||0},ohp:{w:parseFloat(gid('ob-op-w').value)||0,r:parseInt(gid('ob-op-r').value)||0}};}
  gid('ob-'+step).classList.remove('active');
  OB.step=step+1;
  gid('ob-'+OB.step).classList.add('active');
  obDots();
  // Back then forward: refresh the suggestion text (experience may have
  // changed) but keep the split the user already picked.
  if(OB.step===3&&OB.freq){const sp=OB.split;setFreq(OB.freq);OB.split=sp;renderSplitOpts('split-opts',sp,null);}
}
function obBack(step){gid('ob-'+step).classList.remove('active');OB.step=step-1;gid('ob-'+OB.step).classList.add('active');obDots();}
// First run asks only what changes the plan or a proposed weight: name, sex,
// unit, body weight, experience, optional known lifts, days per week, split.
// Everything else keeps its CFG default and lives in Settings. Height and body
// fat are left empty rather than defaulted, so Profile doesn't show a made-up
// number as if the user had typed it. The tutorial isn't auto-played; Home
// links to it until the first workout is logged.
function obFinish(){
  if(!OB.freq){alert('Please select how many days per week you plan to train');return;}
  if(!OB.split){alert('Please select a training split');return;}
  CFG=Object.assign({},CFG,{firstName:OB.firstName,lastName:'',name:OB.firstName,sex:OB.sex,bw:OB.bw,ht:null,bf:null,unit:OB.unit,exp:OB.exp,split:OB.split,freq:OB.freq,keyLifts:OB.keyLifts,gymPlates:{},gymDumbbells:[],setup:true,lastSeenVersion:APP_VERSION});
  saveCFG();if(OB.bw>0)setWeighIn(dkey(new Date()),OB.bw);accentColor();refreshHome();
  ss('home');
}

// ═══ TUTORIAL — a persistent, revisitable "how it works" walkthrough shown
// once after onboarding (skippable) and reachable anytime from Settings.
// Whenever a future feature needs a "how to use it" explanation, add a step
// here (bump TUT_TOTAL, add a #tut-N .ob-step) rather than leaving it stale. ═══
const TUT_TOTAL=12;
let TUT={step:1,fromOnboarding:false};
function tutDots(){
  const el=gid('tut-dots');el.innerHTML='';
  for(let i=1;i<=TUT_TOTAL;i++){const d=document.createElement('div');d.className='ob-dot'+(i<=TUT.step?' on':'');el.appendChild(d);}
}
function renderTutStep(){
  document.querySelectorAll('#s-tutorial .ob-step').forEach(el=>el.classList.remove('active'));
  gid('tut-'+TUT.step).classList.add('active');
  tutDots();
  gid('tut-back-btn').style.visibility=TUT.step===1?'hidden':'visible';
  const isLast=TUT.step===TUT_TOTAL;
  gid('tut-next-btn').innerHTML=isLast?(TUT.fromOnboarding?t('btn_get_started'):t('btn_done')):(t('btn_next')+' →');
}
function showTutorial(fromOnboarding){TUT.step=1;TUT.fromOnboarding=!!fromOnboarding;renderTutStep();ss('tutorial');}
function tutNext(){if(TUT.step>=TUT_TOTAL){tutFinish();return;}TUT.step++;renderTutStep();}
function tutBack(){if(TUT.step<=1)return;TUT.step--;renderTutStep();}
function tutSkip(){tutFinish();}
function tutFinish(){
  CFG.tutorialSeen=true;saveCFG();
  if(TUT.fromOnboarding){refreshHome();ss('home');}else{ss('settings');}
}
let TUT_TOUCH_X=null;
function tutTouchStart(e){TUT_TOUCH_X=e.changedTouches[0].clientX;}
function tutTouchEnd(e){
  if(TUT_TOUCH_X===null)return;
  const dx=e.changedTouches[0].clientX-TUT_TOUCH_X;TUT_TOUCH_X=null;
  if(Math.abs(dx)<40)return;
  if(dx<0)tutNext();else tutBack();
}

function addWarmupFlags(exercises){
  const seenMG={};
  return exercises.map(ex=>{
    const shouldWU=ex.baseW>0&&!seenMG[ex.mg];
    if(ex.baseW>0)seenMG[ex.mg]=true;
    return {...ex,doWU:shouldWU};
  });
}
