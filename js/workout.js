// GainPath: the workout screen, plate calculator and rest/RIR flow
// A plain script (not a module) sharing one global scope with the other
// js/ files; index.html sets the load order. Map: docs/index-section-map.md
function repeatLastWorkout(){
  if(!ST.history.length)return;
  startDay(ST.history[ST.history.length-1].day);
}
function startDay(k,exList){
  const rawEx=exList||getEffectiveDayExercises(k);const exWithWU=addWarmupFlags(rawEx);
  ST.day=k;ST.exi=0;
  const deload=!!CFG.deloadActive;
  ST.sd=exWithWU.map(ex=>{
    const saved=getSavedWeight(ex.name,ex.note==='bodyweight');
    let w=ex.plannedW!==undefined?ex.plannedW:(saved!==undefined?carriedWeight(ex):(ex.note==='bodyweight'?0:(CFG.startingWeights==='ai'?getAIEstimatedWeight(ex):defaultW(ex))));
    if(deload&&ex.note!=='bodyweight'&&w>0)w=Math.max(0,Math.round(w*0.7*2)/2);
    return{sets:buildSets(ex,w),ex:ex,firstTime:saved===undefined,wSet:false};
  });
  if(deload){CFG.deloadActive=false;saveCFG();}
  ST.mwQueue=[...new Set(exWithWU.filter(ex=>ex.machine&&ST.mw[mwKey(ex.name)]===undefined).map(ex=>mwKey(ex.name)))];
  ST.feelQueue=[];ST.feelTarget=null;ST.ssGroupEnd=null;ST.restRated=false;ST.noteEditIdx=null;
  ST.es=0;ST.t0=Date.now();ST.paused=false;startEtInterval();updWoPauseBtn();
  if(CFG.restSound&&'Notification' in window&&Notification.permission==='default'){try{Notification.requestPermission();}catch(e){}}
  gid('wo-tit').textContent=getDayName(k);
  gid('prt-w').innerHTML=deload?'<div class="prt" style="background:var(--tint-amber-1);border:1px solid var(--tint-amber-2);color:var(--tint-amber-text)"><i class="ti ti-battery-1" aria-hidden="true"></i> Deload session — weights loaded at -30%</div>':'';
  requestWakeLock();
  healthSyncTrigger('start');
  track('session_start');
  if(ST.mwQueue.length){processMWQueue();}else{renderEx();ss('wo');saveInProgress();}
}
// Data-only conversion lives in the math section (convertUnitData); this
// wrapper re-derives PRs/badges and persists, exactly as before the split.
function convertUnits(from,to){
  if(!convertUnitData(from,to))return;
  recomputePRs();recomputeBadges();saveData();saveCFG();if(ST.day||ST.editDay)saveInProgress();
}
function openPlateCalc(i){
  ST.plateIdx=i;
  gid('plate-bar-inp').value='';
  ss('plate');renderPlateCalc();
  saveInProgress();
}
function closePlateCalc(){ST.plateIdx=null;ss('wo');saveInProgress();}
// Olympic plate colour-coding: [background, label colour]. kg and lbs racks
// use different standard colours, so key by unit.
const PLATE_PAL={
  kg:{25:['#c9403f','#fff'],20:['#3b6fb0','#fff'],15:['#e0b23a','#1a1a1a'],10:['#3e8e5a','#fff'],5:['#ececec','#1a1a1a'],2.5:['#3a3a3a','#fff'],1.25:['#b8bdc4','#1a1a1a']},
  lbs:{45:['#3b6fb0','#fff'],35:['#e0b23a','#1a1a1a'],25:['#3e8e5a','#fff'],10:['#ececec','#1a1a1a'],5:['#c9403f','#fff'],2.5:['#3a3a3a','#fff']}
};
function plateStyle(d){const p=PLATE_PAL[CFG.unit]||PLATE_PAL.kg;return p[d]||['#6b7160','#fff'];}
function plateHeight(d){const denoms=PLATES[CFG.unit]||PLATES.kg;const maxD=denoms[0]||25;return Math.round(46+(d/maxD)*74);}
function plateDiscHTML(d){const st=plateStyle(d);const big=d>=(CFG.unit==='kg'?20:35);const lab=''+d;return '<div class="pc-disc" style="height:'+plateHeight(d)+'px;width:'+(big?21:17)+'px;background:'+st[0]+';color:'+st[1]+';font-size:'+(lab.length>=4?8:10)+'px">'+lab+'</div>';}
function renderPlateCalc(){
  const item=ST.sd[ST.exi];const ex=item.ex;const s=item.sets[ST.plateIdx];if(!s)return;
  gid('plate-target').textContent=s.w+CFG.unit;
  gid('plate-unit').textContent=CFG.unit;
  const barInp=gid('plate-bar-inp');
  if(barInp.value===''){
    const mwBase=ex.machine&&ST.mw[mwKey(ex.name)]!==undefined?ST.mw[mwKey(ex.name)]:null;
    barInp.value=mwBase!==null?mwBase:(CFG.unit==='kg'?20:45);
  }
  const barW=parseFloat(barInp.value)||0;
  const perSide=(s.w-barW)/2;
  const el=gid('plate-result');
  if(perSide<0){el.innerHTML='<div class="pc-msg">Target is less than the bar / frame weight.</div>';return;}
  const{counts,remaining}=calcPlates(perSide);
  if(!counts.length){el.innerHTML='<div class="pc-msg">Just the bar — no plates needed.</div>';return;}
  // counts come biggest→smallest; discs biggest first (loaded nearest the collar)
  const discs=[];counts.forEach(c=>{for(let k=0;k<c.n;k++)discs.push(c.d);});
  const right=discs.map(plateDiscHTML).join('');
  const left=discs.slice().reverse().map(plateDiscHTML).join('');
  const bar='<div class="pc-stage"><div class="pc-bar"><div class="pc-sleeve"></div>'+left+'<div class="pc-collar"></div><div class="pc-grip"></div><div class="pc-collar"></div>'+right+'<div class="pc-sleeve"></div></div></div>';
  const summary=counts.map(c=>c.d+(c.n>1?' ×'+c.n:'')).join(' + ');
  el.innerHTML=bar+
    '<div class="pc-sum"><div class="pc-sum-lbl">Per side</div><div class="pc-sum-val">'+summary+'</div><div class="pc-sum-sub">Bar '+barW+CFG.unit+' · load inside-out</div></div>'+
    (remaining>0.01?'<div class="pc-msg">'+(Math.round(remaining*100)/100)+CFG.unit+' per side can’t be made with your plates.</div>':'');
}
function processMWQueue(){
  if(!ST.mwQueue.length){ST.mwCurrent=null;renderEx();ss('wo');saveInProgress();return;}
  ST.mwCurrent=ST.mwQueue.shift();renderMWScreen();
}
function renderMWScreen(){
  gid('mw-title').textContent=ST.mwCurrent;
  gid('mw-desc').innerHTML='Enter the base weight of this machine (without any plates).<br>The app will add this to the plates you load to get the <strong>total weight</strong>.';
  gid('mw-unit').textContent=CFG.unit;gid('mw-inp').value='';ss('mw');saveInProgress();
}
function saveMW(skip){
  const val=skip?0:(parseFloat(gid('mw-inp').value)||0);
  if(ST.mwCurrent){ST.mwCurrent=mwKey(ST.mwCurrent);ST.mw[ST.mwCurrent]=val;saveData();
    // Rebuilding the sets must not throw away a weight the user planned on the
    // day-edit screen — same precedence startDay() uses.
    ST.sd.forEach((it,idx)=>{if(mwKey(it.ex.name)!==ST.mwCurrent)return;const ex=it.ex;const baseW=ex.plannedW!==undefined?ex.plannedW:(carriedWeight(ex)||getAIEstimatedWeight(ex));ST.sd[idx].sets=buildSets(ex,baseW);});
  }
  processMWQueue();
}
function exSlug(name){return name.toLowerCase().replace(/\s+/g,'-');}
function exImgFallback(img,yt,custom){
  // Custom exercises have no bundled image by design — link out to a YouTube
  // search. Built-in exercises DO have an image; if it failed to load (e.g.
  // offline before it was ever cached) show a neutral placeholder instead of
  // the YouTube link, which otherwise wrongly appears on built-in exercises.
  if(custom){
    const a=document.createElement('a');
    a.className='byt';a.href='https://www.youtube.com/results?search_query='+yt;a.target='_blank';
    a.innerHTML='<svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="4" fill="#fff" fill-opacity=".3"/><path d="M10 9l6 3-6 3V9z" fill="#fff"/></svg>Tutorial';
    img.replaceWith(a);
    return;
  }
  const d=document.createElement('div');
  d.className='ex-img';
  d.style.cssText='display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;min-height:140px;color:var(--txt3);text-align:center;padding:16px';
  d.innerHTML='<i class="ti ti-photo-off" style="font-size:30px" aria-hidden="true"></i><span style="font-size:12px;max-width:220px">'+t('img_unavailable_offline')+'</span>';
  img.replaceWith(d);
}
function renderEx(){
  const item=ST.sd[ST.exi];const ex=item.ex;const sets=item.sets;
  gid('wo-pb').style.width=Math.round((ST.exi/ST.sd.length)*100)+'%';
  gid('wo-pl').textContent=t('exercise_progress_prefix')+(ST.exi+1)+t('exercise_progress_of')+ST.sd.length;
  const ssGrp=woGroup(ST.exi);
  const ssBanner=ssGrp?'<div style="background:var(--accent);color:var(--accent-ink);border-radius:12px;padding:9px 13px;margin-bottom:10px;font-size:12px;font-weight:800;text-transform:uppercase;letter-spacing:.02em;display:flex;align-items:center;gap:6px"><i class="ti ti-link" aria-hidden="true"></i>'+(ssGrp.size>2?'Circuit':'Superset')+' '+String.fromCharCode(64+woGroupLetter(ST.exi))+' — exercise '+ssGrp.pos+' of '+ssGrp.size+' · minimal rest, alternate each set</div>':'';
  const isBW=ex.note==='bodyweight';const mwBase=ex.machine&&ST.mw[mwKey(ex.name)]!==undefined?ST.mw[mwKey(ex.name)]:0;
  // Plate calculator only makes sense when you load plates on a bar/frame:
  // barbell lifts and plate-loaded machines (base weight set). Dumbbells,
  // cables, selectorized (pin-stack) machines and bodyweight don't get it.
  const showPlate=equipRank(ex)===0||(ex.machine&&mwBase>0);
  const wuCount=sets.filter(s=>s.t==='w').length;let wuSeen=0,workSeen=0;
  const workCount=sets.length-wuCount;
  const firstUndone=sets.findIndex(x=>!x.done);
  const sh=sets.map((s,i)=>{
    const isW=s.t==='w';const isD=s.t==='d';const wuLabel=isW?(wuCount>1?'W'+(++wuSeen):'W'):null;if(!isW&&!isD)workSeen++;const dispW=ex.machine&&mwBase>0?+(s.w-mwBase).toFixed(1):s.w;
    const bwMode=s.w>0?'add':s.w<0?'asst':'bw';const bwLabel=bwMode==='add'?'+':bwMode==='asst'?'−':'BW';
    const stepInc=stepIncrement(ex,Math.max(0,dispW));
    const active=!s.done&&i===firstUndone;
    const wctrl=isBW?
      '<button type="button" class="bw-mode" onclick="cycleBWMode('+i+')" aria-label="Bodyweight weight mode">'+bwLabel+'</button>'+
      (bwMode!=='bw'?'<input class="wi" style="text-align:center;width:40px" type="number" value="'+Math.abs(s.w)+'" step="0.5" min="0" onfocus="this.select()" onchange="updBWMag('+i+',this.value)">':'')
      :'<button type="button" class="sst" onclick="stepWeight('+i+','+(-stepInc)+')" aria-label="Decrease weight">−</button>'+
        '<input class="wi" type="number" value="'+Math.max(0,dispW)+'" step="0.5" min="0" onfocus="this.select()" onchange="updSet('+i+',this.value)"><span class="sr-u">'+CFG.unit+'</span>'+
        '<button type="button" class="sst" onclick="stepWeight('+i+','+stepInc+')" aria-label="Increase weight">+</button>';
    const rctrl=ex.holdSecs?
      ('<button type="button" class="log" style="background:var(--bg3);color:var(--accent);margin-left:6px" onclick="toggleHold('+i+')"'+(HOLD_IDX!==null&&HOLD_IDX!==i?' disabled':'')+'>'+(HOLD_IDX===i?'Stop':'Hold')+'</button>'+
       '<span id="hold-t-'+i+'" class="sr-x" style="min-width:36px;text-align:center;color:var(--txt);font-family:var(--font-mono);font-weight:700">'+(HOLD_IDX===i?fmt(Math.round((Date.now()-HOLD_START)/1000)):fmt(s.r))+'</span>')
      :('<span class="sr-x">×</span><input class="ri" type="number" value="'+s.r+'" min="1" onfocus="this.select()" onchange="updRep('+i+',this.value)">');
    const plateBtn=(showPlate&&!isBW)?'<button type="button" class="sst plate" onclick="openPlateCalc('+i+')" aria-label="Plate calculator"><i class="ti ti-stack-2" aria-hidden="true"></i></button>':'';
    const doneDisabled=ex.holdSecs&&(HOLD_IDX===i||!s.r);
    const snCls=s.done?' d':(active?' on':(isW?' w':''));
    const logBtn='<button class="log'+(s.done?' done':'')+'"'+(doneDisabled?' disabled':'')+' onclick="dset('+i+')" aria-label="'+(s.done?'Done':'Log set')+'">'+(s.done?'<i class="ti ti-check" aria-hidden="true"></i>':t('btn_mark_done'))+'</button>';
    // Removable while un-logged; a lift must keep at least one work set, so the
    // last one loses its button. Rows that can't be removed still render the
    // button as a hidden placeholder, or the Log column would go ragged.
    const canDel=!s.done&&(isW||workCount>1)&&HOLD_IDX===null;
    const delBtn='<button type="button" class="sdel'+(canDel?'':' hide')+'"'+(canDel?'':' tabindex="-1" aria-hidden="true"')+' onclick="delSet('+i+')" aria-label="Remove set"><i class="ti ti-trash" aria-hidden="true"></i></button>';
    return '<div class="sr'+(s.done?' done':(active?' active':''))+'"><div class="sn'+snCls+'">'+(isW?wuLabel:(isD?'D':workSeen))+'</div>'+wctrl+rctrl+plateBtn+logBtn+delBtn+'</div>';
  }).join('');
  const addSetHtml='<button type="button" class="addset" onclick="addWorkSet()"><i class="ti ti-plus" aria-hidden="true"></i> '+t('btn_add_set')+'</button>';
  const dropTarget=(!isBW&&!ex.holdSecs)?sets.findIndex(x=>!x.done&&x.t==='x'):-1;
  const dropBtnBottom=dropTarget>=0?'<button class="bs" style="flex-shrink:0" onclick="addDropSet('+dropTarget+')" aria-label="Add drop set"><i class="ti ti-arrow-bar-down" aria-hidden="true"></i> '+t('btn_drop_set')+'</button>':'' ;
  const mwNote=ex.machine&&mwBase>0?'<span class="mw-inp"><i class="ti ti-settings-2" aria-hidden="true"></i> Machine base: '+mwBase+CFG.unit+' (plates only shown)</span>':'';
  if(!item.tipText)item.tipText=tipFor(ex.name);
  const tipHtml='<div style="font-size:13px;color:var(--txt2);margin-bottom:12px;display:flex;gap:6px;align-items:flex-start"><i class="ti ti-bulb" aria-hidden="true" style="flex-shrink:0;margin-top:1px;color:var(--accent)"></i><span>'+item.tipText+'</span></div>';
  const noteHtml=exNoteHtml(item,ex);
  const isLast=ST.exi>=ST.sd.length-1;
  const exImg='<img src="images/exercises/'+exSlug(ex.name)+'.png" alt="'+ex.name+'" class="ex-img" onerror="exImgFallback(this,\''+ex.yt+'\','+(ex.custom?1:0)+')">';
  let sugHtml='';
  if(!item.sugDone&&!sets.some(s=>s.done)&&!isBW&&!ex.holdSecs&&ex.plannedW===undefined){
    const fw=sets.find(s=>s.t!=='w');const brk=fw?breakSuggest(ex,fw.w):null;const sync=fw&&!brk?syncSuggest(ex,fw.w,fw.r):null;const sug=fw&&!brk&&!sync?suggestWeight(ex,fw.w):null;
    if(brk){const bd=ex.machine&&mwBase>0?(+(brk.newW-mwBase).toFixed(1)):brk.newW;sugHtml='<div class="sug-chip"><span>⏸️ '+t('break_chip').replace('{n}',brk.weeks).replace('{w}','<strong>'+bd+CFG.unit+'</strong>')+'</span><button class="db ok" onclick="applySuggest('+brk.newW+')">'+t('btn_apply')+'</button><button class="bg" style="padding:4px 8px" onclick="dismissSuggest()">'+t('btn_dismiss')+'</button></div>';}
    if(sync)sugHtml='<div class="sug-chip"><span>🔗 '+t('sync_chip').replace('{src}',esc(exDisplayName(sync.src))).replace('{w}','<strong>'+sync.newW+CFG.unit+'</strong>')+'</span><button class="db ok" onclick="applySuggest('+sync.newW+')">'+t('btn_apply')+'</button><button class="bg" style="padding:4px 8px" onclick="dismissSync('+sync.newW+')">'+t('btn_dismiss')+'</button></div>';
    if(sug){const disp=ex.machine&&mwBase>0?(+(sug.newW-mwBase).toFixed(1)):sug.newW;const verb={easy:'you had 5+ reps left',good:'you had 3–4 reps left',max:'you hit failure'}[sug.feel]||'time to adjust';
      sugHtml='<div class="sug-chip"><span>💡 Last time '+verb+' — try <strong>'+disp+CFG.unit+'</strong> ('+(sug.delta>0?'+':'')+sug.delta+')</span><button class="db ok" onclick="applySuggest('+sug.newW+')">Apply</button><button class="bg" style="padding:4px 8px" onclick="dismissSuggest()">Dismiss</button></div>';}
  }
  gid('ex-area').innerHTML=ssBanner+'<div class="card">'+exImg+'<div style="display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:12px"><div style="flex:1;min-width:0"><div style="display:flex;align-items:center;gap:8px;margin-bottom:6px"><div class="tt" style="font-size:17px;font-weight:800;letter-spacing:-.01em;text-transform:uppercase;color:var(--txt)">'+exDisplayName(ex.name)+'</div><button type="button" onclick="showExInstructions(\''+ex.name+'\')" aria-label="Exercise instructions" style="flex-shrink:0;width:34px;height:34px;border-radius:50%;border:2px solid var(--accent);background:var(--bg);color:var(--accent);font-size:17px;font-weight:800;display:flex;align-items:center;justify-content:center;cursor:pointer;padding:0;line-height:1">?</button></div><div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">'+(ex.note&&ex.note!=='bodyweight'?'<span class="bdg bi">'+ex.note+'</span>':'')+(isBW?'<span class="bdg" style="background:var(--bg2);color:var(--txt2)">'+t('bodyweight_badge')+'</span>':'')+mwNote+'</div></div><span style="font-size:11px;color:var(--txt2);margin-left:8px;white-space:nowrap">'+sets.length+t('unit_sets_suffix')+'</span></div>'+tipHtml+noteHtml+sugHtml+sh+addSetHtml+'</div><div style="display:flex;gap:8px;margin-top:6px">'+(ST.exi>0?'<button class="bs" onclick="prevEx()" aria-label="Previous exercise"><i class="ti ti-arrow-left" aria-hidden="true"></i></button>':'')+dropBtnBottom+'<button class="bp" style="flex:1;justify-content:center" onclick="askExFeel()">'+(isLast?t('btn_finish_workout')+' <i class="ti ti-trophy" aria-hidden="true"></i>':t('btn_next_exercise')+' <i class="ti ti-arrow-right" aria-hidden="true"></i>')+'</button></div>';
  if(item.firstTime&&CFG.startingWeights==='manual'&&!item.wSet&&ex.plannedW===undefined)showFSW(ex);
  saveInProgress();
}
function exNoteHtml(item,ex){
  const noteVal=item.userNote||'';
  const noteOpen=ST.noteEditIdx===ST.exi;
  const lastNote=noteVal?null:lastNoteForExercise(ex.name);
  let html='';
  if(lastNote)html+='<div style="font-size:11px;color:var(--txt3);margin-bottom:6px;display:flex;gap:5px;align-items:flex-start"><i class="ti ti-notes" aria-hidden="true" style="flex-shrink:0;margin-top:1px"></i><span>Last time: '+esc(lastNote)+'</span></div>';
  if(noteOpen){
    html+='<textarea class="inp" id="ex-note-inp" style="min-height:56px;margin-bottom:6px;font-size:13px" placeholder="e.g. seat position 4, left shoulder pinch" oninput="ST.sd['+ST.exi+'].userNote=this.value">'+esc(noteVal)+'</textarea>'+
      '<button class="bg" style="padding:4px 8px;font-size:13px;margin-bottom:12px" onclick="closeExNote()">Done</button>';
  }else{
    html+='<button type="button" class="bg" style="padding:4px 8px;font-size:13px;margin-bottom:'+(noteVal?'2px':'12px')+'" onclick="openExNote()"><i class="ti ti-notes" aria-hidden="true"></i> '+(noteVal?t('btn_edit_note'):t('btn_add_note'))+'</button>';
    if(noteVal)html+='<div style="font-size:13px;color:var(--txt2);margin:2px 0 12px">'+esc(noteVal)+'</div>';
  }
  return html;
}
function openExNote(){ST.noteEditIdx=ST.exi;renderEx();gid('ex-note-inp').focus();}
function closeExNote(){ST.noteEditIdx=null;renderEx();}
function showFSW(ex){
  if(ex.note==='bodyweight'){ST.sd[ST.exi].wSet=true;return;}
  gid('fsw-exname').textContent=ex.name;gid('fsw-unit').textContent=CFG.unit;gid('fsw-inp').value=defaultW(ex)||'';
  const aiEl=gid('fsw-ai');
  if(CFG.keyLifts&&Object.values(CFG.keyLifts).some(v=>v.w>0)){const est=getAIEstimatedWeight(ex);aiEl.style.display='block';aiEl.innerHTML='<div class="ail"><i class="ti ti-sparkles" aria-hidden="true"></i> Suggested: <strong>'+est+CFG.unit+'</strong> based on your strength baseline</div>';}
  else aiEl.style.display='none';
  ss('fsw');saveInProgress();
}
function saveFSW(){const w=parseFloat(gid('fsw-inp').value)||0;if(w>0){ST.sd[ST.exi].sets=buildSets(ST.sd[ST.exi].ex,w);ST.sd[ST.exi].wSet=true;}ss('wo');renderEx();}
function updSet(i,v){
  const item=ST.sd[ST.exi];const ex=item.ex;const sets=item.sets;
  const mwBase=ex.machine&&ST.mw[mwKey(ex.name)]!==undefined?ST.mw[mwKey(ex.name)]:0;
  const w=mwBase>0?(parseFloat(v)||0)+mwBase:(parseFloat(v)||0);
  const t=sets[i].t;sets[i].w=w;
  if(isPyramidEx(ex)&&t==='x'){
    const workIdxs=sets.map((s,j)=>j).filter(j=>sets[j].t==='x');
    if(i===workIdxs[0]){
      const inc=weightIncrement(ex);
      workIdxs.forEach((j,pos)=>{if(j!==i&&!sets[j].done)sets[j].w=Math.max(0,Math.round((w+inc*pos)*2)/2);});
    }
  }else{
    sets.forEach((s,j)=>{if(j!==i&&s.t===t&&!s.done)s.w=w;});
  }
  renderEx();
}
function updRep(i,v){
  const item=ST.sd[ST.exi];const ex=item.ex;const sets=item.sets;const r=parseInt(v)||1;const t=sets[i].t;
  sets[i].r=r;
  if(!(isPyramidEx(ex)&&t==='x')){
    sets.forEach((s,j)=>{if(j!==i&&s.t===t&&!s.done)s.r=r;});
  }
  renderEx();
}
function cycleBWMode(i){
  const sets=ST.sd[ST.exi].sets;const s=sets[i];const t=s.t;
  const cur=s.w>0?'add':s.w<0?'asst':'bw';const mag=Math.abs(s.w)||2.5;
  const next=cur==='bw'?'add':cur==='add'?'asst':'bw';
  const w=next==='add'?mag:next==='asst'?-mag:0;
  s.w=w;sets.forEach((s2,j)=>{if(j!==i&&s2.t===t&&!s2.done)s2.w=w;});
  renderEx();
}
function updBWMag(i,v){
  const sets=ST.sd[ST.exi].sets;const s=sets[i];const t=s.t;
  const mag=Math.abs(parseFloat(v)||0);const sign=s.w<0?-1:1;const w=sign*mag;
  s.w=w;sets.forEach((s2,j)=>{if(j!==i&&s2.t===t&&!s2.done)s2.w=w;});
  renderEx();
}
function toggleHold(i){
  if(HOLD_IDX===i){
    const secs=Math.round((Date.now()-HOLD_START)/1000);
    clearInterval(HOLD_TIMER);HOLD_TIMER=null;HOLD_IDX=null;HOLD_START=null;HOLD_TARGET=null;HOLD_ALERTED=false;
    ST.sd[ST.exi].sets[i].r=secs;renderEx();
  }else{
    if(HOLD_IDX!==null)return;
    const ex=ST.sd[ST.exi].ex;const pr=ST.prs[ex.name];
    HOLD_TARGET=pr&&pr.r>0?pr.r:null;HOLD_ALERTED=false;
    HOLD_IDX=i;HOLD_START=Date.now();renderEx();
    startHoldTimerInterval(i);
  }
}
function chkPR(name,w,r,allowZeroW){const meta=EXPOOL[name];if(meta&&meta.noPR)return false;if(w===0&&!allowZeroW)return false;const cur=ST.prs[name]||{w:0,r:0};if(w>cur.w||(w===cur.w&&r>cur.r)){ST.prs[name]={w,r,date:new Date().toLocaleDateString('en-PH',{month:'short',day:'numeric',year:'numeric'})};saveData();return true;}return false;}
function bwWeightLabel(w){return w>0?'+'+w+CFG.unit+' added':w<0?Math.abs(w)+CFG.unit+' assisted':'Bodyweight';}
function showPR(name,w,r,isBW,holdSecs){track('pr_hit');const el=gid('prt-w');if(!el)return;el.innerHTML='<div class="pr-stamp"><i class="ti ti-star" aria-hidden="true" style="font-size:16px;color:var(--brand-gold)"></i> New PR! '+name+' \u2014 '+(isBW?bwWeightLabel(w):w+CFG.unit)+' \u00d7 '+(holdSecs?fmt(r)+' held':r+' reps')+'</div>';setTimeout(()=>{el.innerHTML='';},5000);}
function woGroup(P){
  const sd=ST.sd;if(P<0||P>=sd.length)return null;
  const linkedPrev=P>0&&!!sd[P-1].ex.linkNext;
  const linksNext=!!sd[P].ex.linkNext;
  if(!linkedPrev&&!linksNext)return null;
  let start=P;while(start>0&&sd[start-1].ex.linkNext)start--;
  let end=P;while(end<sd.length-1&&sd[end].ex.linkNext)end++;
  return{start,end,pos:P-start+1,size:end-start+1};
}
function woGroupLetter(P){
  const sd=ST.sd;let n=0;
  for(let k=0;k<=P;k++){const isStart=!!sd[k].ex.linkNext&&(k===0||!sd[k-1].ex.linkNext);if(isStart)n++;}
  return n;
}
function hasWorkLeft(item){return item.sets.some(s=>!s.done&&s.t!=='w');}
function goToExercise(P){if(P>=ST.sd.length){finishWo();return;}ST.exi=P;ST.noteEditIdx=null;clearInterval(ST.rt);ss('wo');renderEx();saveInProgress();}
function dset(i){
  const item=ST.sd[ST.exi];const sets=item.sets;
  if(sets[i].done){sets[i].done=false;renderEx();saveInProgress();return;}
  sets[i].done=true;const ex=item.ex;const s=sets[i];const isBW=ex.note==='bodyweight';
  if(s.t!=='w'&&chkPR(ex.name,s.w,s.r,ex.holdSecs))showPR(ex.name,s.w,s.r,isBW,ex.holdSecs);
  const grp=woGroup(ST.exi);
  if(grp&&grp.size>1&&s.t!=='w'){supersetAdvance(grp,i);return;}
  renderEx();startRest(ex,i,s,i<sets.length-1?sets[i+1]:null);
}
function supersetAdvance(grp,i){
  const P=ST.exi;
  if(!hasWorkLeft(ST.sd[P])&&ST.sd[P].exFeel==null&&!ST.feelQueue.includes(P))ST.feelQueue.push(P);
  let fwd=null;for(let k=P+1;k<=grp.end;k++){if(hasWorkLeft(ST.sd[k])){fwd=k;break;}}
  if(fwd!=null){ST.exi=fwd;ss('wo');renderEx();saveInProgress();return;}
  let restTarget=null;for(let k=grp.start;k<=grp.end;k++){if(hasWorkLeft(ST.sd[k])){restTarget=k;break;}}
  if(restTarget!=null){
    const nextSet=ST.sd[restTarget].sets.find(x=>!x.done&&x.t!=='w');
    startRest(ST.sd[P].ex,i,ST.sd[P].sets[i],nextSet,restTarget);return;
  }
  ST.ssGroupEnd=grp.end;
  for(let k=grp.start;k<=grp.end;k++){if(ST.sd[k].exFeel==null&&!ST.feelQueue.includes(k))ST.feelQueue.push(k);}
  ST.feelQueue.sort((a,b)=>a-b);
  drainFeelQueue();
}
function drainFeelQueue(){
  if(ST.feelQueue.length){askExFeel(ST.feelQueue.shift());}
  else{const after=ST.ssGroupEnd!=null?ST.ssGroupEnd+1:ST.exi+1;ST.ssGroupEnd=null;goToExercise(after);}
}
function addDropSet(i){
  const item=ST.sd[ST.exi];const sets=item.sets;const s=sets[i];const ex=item.ex;
  sets[i].done=true;
  const isBW=ex.note==='bodyweight';
  if(s.t!=='w'&&chkPR(ex.name,s.w,s.r,ex.holdSecs))showPR(ex.name,s.w,s.r,isBW,ex.holdSecs);
  const dropW=Math.max(0,Math.round(s.w*0.7*2)/2);
  sets.splice(i+1,0,{t:'d',w:dropW,r:s.r,done:false});
  renderEx();saveInProgress();
}
// Mid-workout set count changes. A new set clones the last work set (pyramid
// exercises continue their ramp, snapped to loadable gym weight); removal is
// only offered on un-logged sets, so logged work — and the PRs derived from
// it — is never silently rewritten. At least one work set always remains.
function addWorkSet(){
  const item=ST.sd[ST.exi];const sets=item.sets;const ex=item.ex;
  const work=sets.filter(x=>x.t!=='w');const last=work[work.length-1];
  let w=last?last.w:(defaultW(ex)||0);
  const r=last?last.r:(ex.holdSecs?0:(CFG.prefReps||10));
  if(isPyramidEx(ex)&&last)w=roundToGymWeight(ex,Math.max(0,Math.round((last.w+weightIncrement(ex))*2)/2),'up');
  sets.push({t:'x',w,r,done:false});
  renderEx();saveInProgress();
}
function delSet(i){
  const sets=ST.sd[ST.exi].sets;const s=sets[i];
  if(!s||s.done)return;
  if(s.t!=='w'&&sets.filter(x=>x.t!=='w').length<=1)return;
  if(HOLD_IDX!==null)return;
  sets.splice(i,1);
  renderEx();saveInProgress();
}
const FEEL_OPTS=[
  {k:'easy',icon:'😌',label:'5+ reps left',color:'#3C8464',sub:'Way too light'},
  {k:'good',icon:'💪',label:'3–4 reps left',color:'#4A6FA5',sub:'Room to grow'},
  {k:'hard',icon:'🔥',label:'1–2 reps left',color:'#A5822B',sub:'Dialed in'},
  {k:'max',icon:'😵',label:'0 — to failure',color:'#C05A3E',sub:'Nothing left'}
];
function setPrepLabel(ex,s){
  const isBW=ex.note==='bodyweight';const mwBase=ex.machine&&ST.mw[mwKey(ex.name)]!==undefined?ST.mw[mwKey(ex.name)]:0;
  const dispW=isBW?bwWeightLabel(s.w):mwBase>0?(+(s.w-mwBase).toFixed(1))+CFG.unit+' plates (+'+mwBase+CFG.unit+' machine)':s.w+CFG.unit;
  return (ex.holdSecs?'Hold':s.r+' reps')+' @ '+dispW;
}
function renderRestFeel(P){
  const item=ST.sd[P];if(!item)return;const sel=item.exFeel;
  gid('r-feel-q').textContent=sel!=null?'Rated — tap to change':'On your last set of '+item.ex.name+', how many reps left?';
  gid('r-feel-btns').innerHTML=FEEL_OPTS.map(o=>'<button class="feel-btn" style="margin-bottom:0'+(sel===o.k?';border-color:var(--accent);background:var(--tint-green-1)':'')+'" onclick="restRate(\''+o.k+'\')"><span class="feel-icon">'+o.icon+'</span><div><div style="font-size:13px;font-weight:700;color:'+o.color+'">'+o.label+'</div><div style="font-size:11px;color:var(--txt2);margin-top:2px">'+o.sub+'</div></div></button>').join('');
}
function restRate(feel){const P=ST.exi;if(!ST.sd[P])return;ST.sd[P].exFeel=feel;ST.restRated=true;renderRestFeel(P);saveInProgress();}
function startRest(ex,si,done,next,ssReturn){
  const isLastSet=!next;const ssRound=ssReturn!=null;
  ST.restRated=false;gid('r-feel').style.display='none';
  gid('r-en').textContent=ex.name;
  gid('r-sl').textContent=ssRound?'Superset round done \u2014 rest before the next round':isLastSet?'Set '+(done.t==='w'?'W':si+1)+' done \u2014 rest before next exercise':'Set '+(done.t==='w'?'W':si+1)+' done \u2014 rest before set '+(next.t==='w'?'W':si+2);
  ST.rs=done.t==='w'?Math.round(CFG.prefRest*0.67):CFG.prefRest;ST.restTotal=ST.rs;updT();
  ST.restEnd=Date.now()+ST.rs*1000;ST.restInfo={si,done,next,isLastSet,ssReturn:ssReturn!=null?ssReturn:null};
  const isBW=ex.note==='bodyweight';const mwBase=ex.machine&&ST.mw[mwKey(ex.name)]!==undefined?ST.mw[mwKey(ex.name)]:0;
  const nextItem=ssRound?ST.sd[ssReturn]:(ST.exi<ST.sd.length-1?ST.sd[ST.exi+1]:null);
  if(ssRound){
    gid('r-nx-h').textContent='Next round';
    const nx=ST.sd[ssReturn].ex;const nxBW=nx.note==='bodyweight';const nxMw=nx.machine&&ST.mw[mwKey(nx.name)]!==undefined?ST.mw[mwKey(nx.name)]:0;
    const dispW=nxBW?bwWeightLabel(next.w):nxMw>0?(+(next.w-nxMw).toFixed(1))+CFG.unit+' plates (+'+nxMw+CFG.unit+' machine)':next.w+CFG.unit;
    const repLbl=nx.holdSecs?'Hold':next.r+' reps';
    gid('r-nx').innerHTML='<span style="color:var(--txt2)">Back to:</span> <strong>'+nx.name+'</strong> \u2014 '+repLbl+' @ '+dispW;
    gid('r-fb').innerHTML=tipFor(nx.name);
  }else if(isLastSet){
    gid('r-nx-h').textContent=nextItem?'Up next':'Almost there';
    if(nextItem){
      const nx=nextItem.ex;const fs=nextItem.sets[0];
      const fsLine=fs?'<div style="margin-top:6px;font-size:13px;color:var(--txt2)">'+(fs.t==='w'?'Warm-up set':'First set')+': <strong style="color:var(--txt)">'+setPrepLabel(nx,fs)+'</strong></div>':'';
      gid('r-nx').innerHTML='<span style="color:var(--txt2)">Next:</span> <strong>'+nx.name+'</strong>'+fsLine;
    }else gid('r-nx').innerHTML='<span style="color:var(--txt2)">Next:</span> Finish workout';
    gid('r-feel').style.display='block';renderRestFeel(ST.exi);
    const tipEx=nextItem?nextItem.ex:ex;
    gid('r-fb').innerHTML=(nextItem?'<span style="font-size:11px;color:var(--txt2);display:block;margin-bottom:4px">For next: <strong>'+nextItem.ex.name+'</strong></span>':'')+tipFor(tipEx.name);
  }else{
    gid('r-nx-h').textContent='Next set';
    const dispW=isBW?bwWeightLabel(next.w):mwBase>0?(+(next.w-mwBase).toFixed(1))+CFG.unit+' plates (+'+mwBase+CFG.unit+' machine)':next.w+CFG.unit;
    const repLbl=ex.holdSecs?'Hold':next.r+' reps';
    gid('r-nx').innerHTML='<span style="color:var(--txt2)">Next:</span> '+repLbl+' @ <strong>'+dispW+'</strong>'+(ex.note&&!isBW?' ('+ex.note+')':'');
    gid('r-fb').innerHTML=tipFor(ex.name);
  }
  ST.rNxHtml=gid('r-nx').innerHTML;
  ST.rFbHtml=gid('r-fb').innerHTML;
  ss('rest');ensureAudio();armRestAudioKick();startRestCountdown();
  saveInProgress();
}
function updT(){const el=gid('t-dsp');if(el)el.textContent=ST.rs;const c=gid('t-cir');if(!c)return;const pct=ST.restTotal>0?Math.max(0,Math.min(100,Math.round(ST.rs/ST.restTotal*100))):0;c.style.setProperty('--ring-pct',pct+'%');c.style.setProperty('--ring-color',ST.rs<=10?'var(--accent)':'var(--brand-amber)');}
function adj(d){ST.restEnd=(ST.restEnd||Date.now())+d*1000;ST.rs=Math.max(0,Math.round((ST.restEnd-Date.now())/1000));ST.restTotal=Math.max(ST.rs,(ST.restTotal||ST.rs)+d);updT();saveInProgress();}
function skip(){clearInterval(ST.rt);endRest();}
function prevEx(){if(ST.exi>0){ST.exi--;ST.noteEditIdx=null;clearInterval(ST.rt);ss('wo');renderEx();}}
function nextEx(){if(ST.exi<ST.sd.length-1){ST.exi++;ST.noteEditIdx=null;clearInterval(ST.rt);ss('wo');renderEx();}else finishWo();}
function askExFeel(target){
  const manual=(target===undefined||target===null);
  const P=manual?ST.exi:target;ST.feelTarget=P;
  const item=ST.sd[P];const ex=item.ex;
  if(manual&&item.sets.some(s=>!s.done)&&!confirm('You still have sets left on '+ex.name+'. Continue anyway?')){ST.feelTarget=null;return;}
  const sets=item.sets.filter(s=>s.done&&s.t!=='w');
  const isBW=ex.note==='bodyweight';const mwBase=ex.machine&&ST.mw[mwKey(ex.name)]!==undefined?ST.mw[mwKey(ex.name)]:0;
  const setsStr=sets.map((s,i)=>{const dispW=isBW?'BW':mwBase>0?(+(s.w-mwBase).toFixed(1))+'+'+mwBase+'='+s.w+CFG.unit:s.w+CFG.unit;return 'Set '+(i+1)+': '+dispW+' \u00d7 '+s.r;}).join(' \u00b7 ')||'No work sets logged';
  gid('ef-name').textContent=ex.name;gid('ef-sets').textContent=setsStr;ss('exfeel');saveInProgress();
}
function submitExFeel(feel){
  const P=ST.feelTarget!=null?ST.feelTarget:ST.exi;
  ST.sd[P].exFeel=feel;ST.feelTarget=null;
  if(ST.ssGroupEnd!=null){drainFeelQueue();return;}
  nextEx();
}
function finishWo(){clearInterval(ST.et);clearInterval(ST.rt);ST.pendingRec=buildRec();releaseWakeLock();healthSyncTrigger('end');ss('feel');saveInProgress();}
function buildRec(){
  const dayName=getDayName(ST.day);const done=ST.sd.reduce((a,item)=>a+item.sets.filter(s=>s.done).length,0);const now=new Date();
  return{day:ST.day,dayName,date:now.toLocaleDateString('en-PH',{month:'short',day:'numeric',year:'numeric'}),dk:dkey(now),mk:mkey(now),dur:fmt(ST.es),sets:done,feel:null,note:null,exercises:ST.sd.map(item=>({name:item.ex.name,exFeel:item.exFeel||null,note:item.userNote||null,sets:item.sets.map(s=>({w:s.w,r:s.r,done:s.done,t:s.t}))}))};
}
function submitFeel(feel){
  const rec=ST.pendingRec;rec.feel=feel;rec.note=(gid('feel-note-inp').value||'').trim()||null;gid('feel-note-inp').value='';
  const hadBadges=Object.keys(ST.badges||{});
  ST.history.push(rec);saveData();ST.day=null;clearInProgress();
  // Diff the derived badge set around the push — whatever appeared is what this
  // session earned. Backfill can't leak in here: that happens once, in load().
  recomputeBadges();
  const newBadges=BADGES.filter(b=>ST.badges[b.id]&&hadBadges.indexOf(b.id)===-1);
  const newPRs=[];ST.sd.forEach(item=>{item.sets.filter(s=>s.done&&s.t!=='w'&&s.w>0).forEach(s=>{if(chkPR(item.ex.name,s.w,s.r))newPRs.push({name:item.ex.name,w:s.w,r:s.r});});});
  gid('su-lb').textContent=rec.dayName+' \u00b7 '+rec.date;gid('su-du').textContent=rec.dur;gid('su-vol').textContent=fmtVol(sessionVolume(rec),CFG.unit);gid('su-ex').textContent=ST.sd.length;gid('su-se').textContent=rec.sets;
  gid('su-pr').innerHTML=newPRs.length?newPRs.map(p=>'<div class="pr-stamp"><i class="ti ti-star" aria-hidden="true" style="color:var(--brand-gold)"></i> New PR: '+p.name+' \u2014 '+(p.w>0?p.w+CFG.unit:'BW')+' \u00d7 '+p.r+' reps</div>').join(''):'';
  gid('su-badges').innerHTML=newBadges.map(b=>'<div class="bdg-unlock"><span class="bdg-wrap">'+badgeSvg(b.id,false)+'</span><span><span class="u-l" data-i18n="badge_unlocked">'+esc(t('badge_unlocked'))+'</span><span class="u-n" style="display:block">'+esc(t('bdg_'+b.id+'_name'))+'</span></span></div>').join('');
  const feelColors={easy:'#3C8464',good:'#4A6FA5',hard:'#A5822B',max:'#C05A3E'};const feelLabel={easy:'Too easy \uD83D\uDE0C',good:'Just right \uD83D\uDCAA',hard:'Hard \uD83D\uDD25',max:'Too much \uD83D\uDE35'}[feel];
  gid('su-feel-tag').innerHTML='<div style="background:var(--bg2);border-radius:10px;padding:12px 16px;display:flex;align-items:center;gap:8px;font-size:13px;font-weight:500;color:'+feelColors[feel]+'"><i class="ti ti-mood-smile" aria-hidden="true"></i> Session feel: '+feelLabel+'</div>';
  ST.lastSummary={rec,newPRs,newBadges:newBadges.map(b=>t('bdg_'+b.id+'_name'))};
  track('workout_complete');
  ss('sum');
}
function shareSessionCard(){
  const summary=ST.lastSummary;if(!summary)return;
  const{rec,newPRs}=summary;
  const W=800,H=1000;
  const canvas=document.createElement('canvas');canvas.width=W;canvas.height=H;
  const ctx=canvas.getContext('2d');
  ctx.fillStyle='#F7F4EC';ctx.fillRect(0,0,W,H);
  ctx.strokeStyle='#E4DFD0';ctx.lineWidth=1;
  for(let y=40;y<H;y+=32){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(W,y);ctx.stroke();}
  ctx.fillStyle='#1A1A1A';ctx.font='700 28px -apple-system,sans-serif';ctx.fillText('GAINPATH',48,80);
  ctx.fillStyle='#4F7D16';ctx.fillRect(48,96,64,4);
  ctx.fillStyle='#1A1A1A';ctx.font='800 44px -apple-system,sans-serif';ctx.fillText(rec.dayName,48,180);
  ctx.font='500 20px -apple-system,sans-serif';ctx.fillStyle='#5A5A50';ctx.fillText(rec.date,48,214);
  const stats=[['Duration',rec.dur],['Volume',fmtVol(sessionVolume(rec),CFG.unit)],['Exercises',String(rec.exercises.length)],['Sets',String(rec.sets)]];
  const colW=(W-96)/2;
  stats.forEach((s,i)=>{
    const x=48+(i%2)*colW,y=280+Math.floor(i/2)*130;
    ctx.fillStyle='#8A8578';ctx.font='600 15px -apple-system,sans-serif';ctx.fillText(s[0].toUpperCase(),x,y);
    ctx.fillStyle='#1A1A1A';ctx.font='800 40px "SF Mono",monospace';ctx.fillText(s[1],x,y+44);
  });
  let py=580;
  if(newPRs.length){
    ctx.fillStyle='#4F7D16';ctx.font='700 18px -apple-system,sans-serif';ctx.fillText('NEW PRs',48,py);
    newPRs.slice(0,4).forEach(p=>{
      py+=38;
      ctx.fillStyle='#1A1A1A';ctx.font='600 20px -apple-system,sans-serif';
      ctx.fillText(p.name+' — '+(p.w>0?p.w+CFG.unit:'BW')+' × '+p.r,48,py);
    });
    py+=14;
  }
  // Badges earned in this session, as text — rasterising the SVG onto the
  // canvas isn't worth it for a line of names.
  const shareBadges=summary.newBadges||[];
  if(shareBadges.length){
    py+=38;
    ctx.fillStyle='#4F7D16';ctx.font='700 18px -apple-system,sans-serif';ctx.fillText('BADGES UNLOCKED',48,py);
    shareBadges.slice(0,3).forEach(name=>{
      py+=38;
      ctx.fillStyle='#1A1A1A';ctx.font='600 20px -apple-system,sans-serif';
      ctx.fillText(name,48,py);
    });
  }
  ctx.fillStyle='#8A8578';ctx.font='500 15px -apple-system,sans-serif';ctx.fillText('gainpath — jedmangubat.github.io/gainpath',48,H-32);
  canvas.toBlob(async blob=>{
    if(!blob)return;
    const file=new File([blob],'gainpath-session.png',{type:'image/png'});
    if(navigator.canShare&&navigator.canShare({files:[file]})){
      try{await navigator.share({files:[file],title:'GainPath session'});return;}catch(e){}
    }
    const url=URL.createObjectURL(blob);
    gid('share-preview-img').src=url;
    gid('share-preview-wrap').style.display='block';
  },'image/png');
}
