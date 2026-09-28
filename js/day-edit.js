// GainPath: day edit, swap and custom exercises
// A plain script (not a module) sharing one global scope with the other
// js/ files; index.html sets the load order. Map: docs/index-section-map.md
// ═══ DAY EDIT (reorder / delete / swap / tap-to-edit sets-reps-weight) ═══
// Mid-workout mode (ST.editMid) is a restricted variant of this same screen:
// no drag-reorder, no inline sets/reps/weight editor — a tap opens the
// do-now/go-back popup instead (see openExNowSheet), since jumping an
// exercise to the front of the queue makes manual reordering unnecessary.
// The top-left button swaps from back-arrow to a destructive cancel-workout
// X. applyDeEditModeUI() drives that swap; call it whenever ST.editMid changes.
function applyDeEditModeUI(){
  const btn=gid('de-back-btn'),icon=gid('de-back-icon'),hint=gid('de-hint');
  if(ST.editMid){
    icon.className='ti ti-x';btn.style.color='#E24B4A';btn.setAttribute('aria-label','Cancel workout');
    hint.textContent=t('de_hint_mid');
  }else{
    icon.className='ti ti-arrow-left';btn.style.color='';btn.setAttribute('aria-label','Back');
    hint.textContent=t('de_hint');
  }
}
function deBack(){if(ST.editMid){openCancelWorkoutSheet();return;}closeDayEdit();}
function openDayEdit(k){
  ST.editDay=k;ST.editMid=false;ST.editProg=false;ST.editList=getEffectiveDayExercises(k).slice();
  DE_EXPANDED=null;gid('de-tit').textContent=getDayName(k);
  gid('de-reset-btn').style.display=isCustomDay(k)?'none':'';
  gid('de-commit-btn').innerHTML='Start workout <i class="ti ti-arrow-right" aria-hidden="true"></i>';
  applyDeEditModeUI();
  ss('dayedit');renderDayEdit();
}
function openMidWorkoutEdit(){
  ST.editDay=ST.day;ST.editMid=true;ST.editProg=false;DE_EXPANDED=null;
  gid('de-reset-btn').style.display='';
  ST.editIncludeCurrent=!!(ST.sd[ST.exi]&&!ST.sd[ST.exi].sets[0].done);
  ST.editList=(ST.editIncludeCurrent?ST.sd.slice(ST.exi):ST.sd.slice(ST.exi+1)).map(item=>item.ex);
  gid('de-tit').textContent=getDayName(ST.day)+' — remaining exercises';
  gid('de-commit-btn').innerHTML='Save & continue <i class="ti ti-check" aria-hidden="true"></i>';
  applyDeEditModeUI();
  ss('dayedit');renderDayEdit();
}
function openCancelWorkoutSheet(){
  gid('cancelwo-overlay').style.display='block';gid('cancelwo-sheet').style.display='block';
  document.body.style.overflow='hidden';
}
function closeCancelWorkoutSheet(){
  gid('cancelwo-overlay').style.display='none';gid('cancelwo-sheet').style.display='none';
  document.body.style.overflow='';
}
function doCancelWorkout(){
  closeCancelWorkoutSheet();
  ST.day=null;clearEditState();clearInProgress();releaseWakeLock();healthSyncTrigger('end');
  clearInterval(ST.rt);clearInterval(ST.et);ST.rt=null;ST.et=null;ST.paused=false;
  refreshHome();ss('home');
}
function openExNowSheet(i){
  ST.exNowIdx=i;
  gid('exnow-name').textContent=ST.editList[i].name;
  gid('exnow-overlay').style.display='block';gid('exnow-sheet').style.display='block';
  document.body.style.overflow='hidden';
}
function closeExNowSheet(){
  ST.exNowIdx=null;
  gid('exnow-overlay').style.display='none';gid('exnow-sheet').style.display='none';
  document.body.style.overflow='';
}
function doExNow(){
  const i=ST.exNowIdx;closeExNowSheet();
  if(i==null||!ST.editList[i])return;
  const item=ST.editList.splice(i,1)[0];ST.editList.unshift(item);
  commitDayEdit();
}
function clearEditState(){ST.editDay=null;ST.editList=[];ST.editMid=false;ST.editIncludeCurrent=false;ST.swapIdx=null;ST.swapPart=null;ST.swapSearch='';ST.exNowIdx=null;DE_EXPANDED=null;}
function closeDayEdit(){
  if(ST.editProg){ST.editProg=false;ST.editDay=null;ST.editList=[];DE_EXPANDED=null;gid('de-reset-btn').style.display='';renderProgramBuilder();ss('prog');return;}
  const wasMid=ST.editMid;
  if(wasMid&&ST.editDay&&ST.editList.length){
    const kept=ST.sd.slice(0,ST.editIncludeCurrent?ST.exi:ST.exi+1);
    const fullRaw=kept.map(item=>item.ex).concat(ST.editList);
    const fullWithWU=addWarmupFlags(fullRaw);
    const newRemaining=fullWithWU.slice(kept.length).map(ex=>{
      const saved=getSavedWeight(ex.name,ex.note==='bodyweight');
      const w=ex.plannedW!==undefined?ex.plannedW:(saved!==undefined?carriedWeight(ex):(ex.note==='bodyweight'?0:(CFG.startingWeights==='ai'?getAIEstimatedWeight(ex):defaultW(ex))));
      return{sets:buildSets(ex,w),ex:ex,firstTime:saved===undefined,wSet:false};
    });
    ST.sd=kept.concat(newRemaining);
    // Session-only: a mid-workout reorder/swap/delete must not touch the day the
    // user organized before Start (customDays/dayLinks/dayPlan stay as they were).
  }else if(!wasMid&&ST.editDay&&ST.editList.length){
    const def=getDayExercises(ST.editDay,CFG.sex).map(e=>e.name);
    const cur=ST.editList.map(e=>e.name);
    const changed=def.length!==cur.length||def.some((n,i)=>n!==cur[i]);
    if(changed)CFG.customDays[ST.editDay]=cur;else delete CFG.customDays[ST.editDay];
    saveDayLinks(ST.editDay,ST.editList);saveDayPlan(ST.editDay,ST.editList);saveCFG();
  }
  clearEditState();
  if(wasMid){ss('wo');saveInProgress();}else{ss('home');if(!ST.day)clearInProgress();}
}
function plannedFor(ex){
  const isBW=ex.note==='bodyweight';
  const saved=getSavedWeight(ex.name,isBW);
  const fallback=isBW?0:(CFG.startingWeights==='ai'?getAIEstimatedWeight(ex):defaultW(ex));
  const w=ex.plannedW!==undefined?ex.plannedW:(saved!==undefined?carriedWeight(ex):fallback);
  // Same precedence as buildSets(), or the day-edit screen shows a rep target
  // the workout is not going to use.
  const r=ex.plannedR||getSavedReps(ex.name)||CFG.prefReps;
  const sets=ex.plannedSets||CFG.prefSets;
  return{w,r,sets,isBW};
}
function toggleDEExpand(i){DE_EXPANDED=DE_EXPANDED===i?null:i;renderDayEdit();}
function editGroupInfo(i){
  const list=ST.editList;
  const linkedWithPrev=i>0&&!!list[i-1].linkNext;
  const linksNext=!!list[i].linkNext;
  if(!linkedWithPrev&&!linksNext)return null;
  let start=i;while(start>0&&list[start-1].linkNext)start--;
  let end=i;while(end<list.length-1&&list[end].linkNext)end++;
  return{pos:i-start+1,size:end-start+1,isFirst:i===start,isLast:i===end};
}
function groupLetter(i){
  // 1-based ordinal of the group this index belongs to (counts group-starts up to i)
  const list=ST.editList;let n=0;
  for(let k=0;k<=i;k++){const isStart=(!!list[k].linkNext)&&(k===0||!list[k-1].linkNext);if(isStart)n++;}
  return n;
}
function toggleLinkNext(i){
  ST.editList[i]={...ST.editList[i],linkNext:!ST.editList[i].linkNext};
  renderDayEdit();
}
function renderDayEdit(){
  gid('de-list').innerHTML=ST.editList.map((ex,i)=>{
    const p=plannedFor(ex);const expanded=DE_EXPANDED===i;
    const grp=editGroupInfo(i);
    const grpLabel=grp&&grp.isFirst?'<div style="font-size:11px;font-weight:600;color:var(--accent);margin:6px 0 -2px 4px">'+(grp.size>2?'Circuit':'Superset')+' — '+grp.size+' exercises, no rest between them</div>':'';
    const linksNext=!!ex.linkNext;
    const linkBtn=i<ST.editList.length-1?'<button class="bg" style="'+(linksNext?'background:var(--accent);color:var(--accent-ink)':'')+'" onclick="toggleLinkNext('+i+')" aria-label="Link with next exercise (superset/circuit)" title="Link with next exercise"><i class="ti ti-link" aria-hidden="true"></i></button>':'';
    const bwMode=p.w>0?'add':p.w<0?'asst':'bw';const bwLabel=bwMode==='add'?'+':bwMode==='asst'?'−':'BW';
    const weightField=p.isBW?
      '<div class="de-detail-field"><label>Weight</label><div style="display:flex;gap:4px"><button type="button" class="bw-mode" onclick="cycleDEBWMode('+i+')">'+bwLabel+'</button>'+(bwMode!=='bw'?'<input type="number" min="0" step="0.5" value="'+Math.abs(p.w)+'" onfocus="this.select()" onchange="updDEBWMag('+i+',this.value)">':'')+'</div></div>'
      :'<div class="de-detail-field"><label>Weight ('+CFG.unit+')</label><input type="number" min="0" step="0.5" value="'+p.w+'" onfocus="this.select()" onchange="updPlannedEx('+i+',\'w\',this.value)"></div>';
    const detail=expanded?
      '<div class="de-detail">'+
        '<div class="de-detail-field"><label>Sets</label><input type="number" min="1" max="8" value="'+p.sets+'" onfocus="this.select()" onchange="updPlannedEx('+i+',\'sets\',this.value)"></div>'+
        (ex.holdSecs?'':isPyramidEx(ex)?'<div class="de-detail-field"><label>Reps (pyramid)</label><div id="de-pyr-'+i+'" style="padding:8px 0;font-size:13px;color:var(--txt2)">'+pyramidReps(p.sets).join(' → ')+'</div></div>':'<div class="de-detail-field"><label>Reps</label><input type="number" min="1" value="'+p.r+'" onfocus="this.select()" onchange="updPlannedEx('+i+',\'r\',this.value)"></div>')+
        weightField+
      '</div>':'';
    const grpTag=grp?'<span class="bdg" style="background:var(--accent);color:#fff;margin-right:6px">'+String.fromCharCode(64+groupLetter(i))+(grp.pos)+'</span>':'';
    return grpLabel+'<div class="de-row-wrap'+(grp?' de-grp'+(grp.isFirst?' de-grp-first':'')+(grp.isLast?' de-grp-last':''):'')+'">'+
      '<div class="de-row-actions"><span class="de-act-swap"><i class="ti ti-replace" aria-hidden="true"></i> Swap</span><span class="de-act-del"><i class="ti ti-trash" aria-hidden="true"></i> Delete</span></div>'+
      '<div class="de-row" onpointerdown="rowSwipeStart(event,'+i+')">'+
        (ST.editMid?'':'<i class="ti ti-grip-vertical de-handle" aria-hidden="true" onpointerdown="rowDragStart(event,'+i+')"></i>')+
        '<div style="flex:1;min-width:0"><div style="font-size:15px;font-weight:600;color:var(--txt)">'+grpTag+ex.name+'</div><div id="de-sub-'+i+'" style="font-size:11px;color:var(--txt2)">'+humanizeMG(ex.mg)+' · '+p.sets+' sets'+'</div></div>'+
        linkBtn+
        '<button class="bg" onclick="openSwap('+i+')" aria-label="Swap exercise"><i class="ti ti-replace" aria-hidden="true"></i></button>'+
        '<button class="bg" onclick="deleteExFromEdit('+i+')" aria-label="Delete exercise"'+(ST.editList.length===1?' disabled style="opacity:.3"':'')+'><i class="ti ti-trash" aria-hidden="true"></i></button>'+
      '</div>'+detail+
    '</div>';
  }).join('');
  saveInProgress();
}
// These fields commit on change — i.e. on blur, which is the very tap that
// moves the user into the NEXT field. Re-rendering the whole list here tore
// that input out of the DOM mid-tap, so the second value typed in a row was
// silently dropped (and the keyboard lost its field). Patch only the derived
// text and leave the inputs standing.
function refreshDERow(i){
  const ex=ST.editList[i];const p=plannedFor(ex);
  const sub=gid('de-sub-'+i);if(sub)sub.textContent=humanizeMG(ex.mg)+' · '+p.sets+' sets';
  const pyr=gid('de-pyr-'+i);if(pyr)pyr.textContent=pyramidReps(p.sets).join(' → ');
}
function updPlannedEx(i,field,value){
  const cur={...ST.editList[i]};
  if(field==='w')cur.plannedW=parseFloat(value)||0;
  if(field==='r')cur.plannedR=Math.max(1,parseInt(value)||CFG.prefReps);
  if(field==='sets')cur.plannedSets=Math.max(1,parseInt(value)||CFG.prefSets);
  ST.editList[i]=cur;refreshDERow(i);saveInProgress();
}
function cycleDEBWMode(i){
  const ex=ST.editList[i];const curW=ex.plannedW!==undefined?ex.plannedW:plannedFor(ex).w;
  const cur=curW>0?'add':curW<0?'asst':'bw';const mag=Math.abs(curW)||2.5;
  const next=cur==='bw'?'add':cur==='add'?'asst':'bw';
  ST.editList[i]={...ex,plannedW:next==='add'?mag:next==='asst'?-mag:0};
  renderDayEdit();
}
function updDEBWMag(i,v){
  const ex=ST.editList[i];const curW=ex.plannedW!==undefined?ex.plannedW:plannedFor(ex).w;
  const mag=Math.abs(parseFloat(v)||0);const sign=curW<0?-1:1;
  ST.editList[i]={...ex,plannedW:sign*mag};
  // Same blur race as updPlannedEx — only a drop to 0 changes the row's shape
  // (mode flips to BW and the input goes away), so only that redraws.
  if(mag===0)renderDayEdit();else saveInProgress();
}
function deleteExFromEdit(i){
  if(ST.editList.length<=1){alert('A workout needs at least one exercise.');return;}
  ST.editList.splice(i,1);DE_EXPANDED=null;renderDayEdit();
}
function resetDayEdit(){
  if(ST.editMid){
    const def=getDayExercises(ST.editDay,CFG.sex);
    const lockedCount=ST.editIncludeCurrent?ST.exi:ST.exi+1;
    const doneNames=new Set(ST.sd.slice(0,lockedCount).map(item=>item.ex.name));
    ST.editList=def.filter(ex=>!doneNames.has(ex.name));
  }else{
    ST.editList=getDayExercises(ST.editDay,CFG.sex).slice();
  }
  DE_EXPANDED=null;renderDayEdit();
}
function saveDayLinks(dayId,exObjs){
  const links=exObjs.map((ex,i)=>i<exObjs.length-1&&!!ex.linkNext);
  if(links.some(Boolean))CFG.dayLinks[dayId]=links;else delete CFG.dayLinks[dayId];
}
// Weight/rep/set numbers typed on the day-edit screen become that day's
// remembered plan going forward — same "stick until explicitly changed"
// contract as customDays/dayLinks above, not a one-time value that only
// applies if the user hits Start in the same sitting.
function saveDayPlan(dayId,exObjs){
  const plan={};
  exObjs.forEach(ex=>{
    if(ex.plannedW===undefined&&ex.plannedR===undefined&&ex.plannedSets===undefined)return;
    plan[ex.name]={w:ex.plannedW,r:ex.plannedR,sets:ex.plannedSets};
  });
  if(Object.keys(plan).length)CFG.dayPlan[dayId]=plan;else delete CFG.dayPlan[dayId];
}
function commitDayEdit(){
  if(ST.editProg){
    const id=ST.editDay,names=ST.editList.map(e=>e.name);
    if(names.length)CFG.customDays[id]=names;else delete CFG.customDays[id];
    saveDayLinks(id,ST.editList);saveDayPlan(id,ST.editList);saveCFG();
    ST.editProg=false;ST.editDay=null;ST.editList=[];DE_EXPANDED=null;
    gid('de-reset-btn').style.display='';
    renderProgramBuilder();ss('prog');return;
  }
  if(ST.editMid){
    const kept=ST.sd.slice(0,ST.editIncludeCurrent?ST.exi:ST.exi+1);
    const fullRaw=kept.map(item=>item.ex).concat(ST.editList);
    const fullWithWU=addWarmupFlags(fullRaw);
    const newRemaining=fullWithWU.slice(kept.length).map(ex=>{
      const saved=getSavedWeight(ex.name,ex.note==='bodyweight');
      const w=ex.plannedW!==undefined?ex.plannedW:(saved!==undefined?carriedWeight(ex):(ex.note==='bodyweight'?0:(CFG.startingWeights==='ai'?getAIEstimatedWeight(ex):defaultW(ex))));
      return{sets:buildSets(ex,w),ex:ex,firstTime:saved===undefined,wSet:false};
    });
    ST.sd=kept.concat(newRemaining);
    // Session-only — see closeDayEdit(); renderEx() persists the session via saveInProgress().
    clearEditState();ss('wo');renderEx();return;
  }
  const def=getDayExercises(ST.editDay,CFG.sex).map(e=>e.name);
  const cur=ST.editList.map(e=>e.name);
  const changed=def.length!==cur.length||def.some((n,i)=>n!==cur[i]);
  if(changed)CFG.customDays[ST.editDay]=cur;else delete CFG.customDays[ST.editDay];
  saveDayLinks(ST.editDay,ST.editList);saveDayPlan(ST.editDay,ST.editList);
  const day=ST.editDay,list=ST.editList;saveCFG();clearEditState();startDay(day,list);
}
function rowDragStart(e,i){
  e.preventDefault();e.stopPropagation();
  const list=gid('de-list');const wrap=e.target.closest('.de-row-wrap');
  const rect=wrap.getBoundingClientRect();
  const ghost=wrap.cloneNode(true);
  ghost.style.position='fixed';ghost.style.left=rect.left+'px';ghost.style.top=rect.top+'px';ghost.style.width=rect.width+'px';ghost.style.zIndex='1000';ghost.style.opacity='.95';ghost.style.pointerEvents='none';ghost.style.boxShadow='0 4px 14px rgba(0,0,0,.2)';
  document.body.appendChild(ghost);wrap.style.opacity='.25';
  let curIdx=i;const offsetY=e.clientY-rect.top;DE_EXPANDED=null;
  const move=ev=>{
    ghost.style.top=(ev.clientY-offsetY)+'px';
    const rows=[...list.children];
    for(let j=0;j<rows.length;j++){
      if(j===curIdx)continue;
      const r=rows[j].getBoundingClientRect();const mid=r.top+r.height/2;
      if((j<curIdx&&ev.clientY<mid)||(j>curIdx&&ev.clientY>mid)){
        const tmp=ST.editList[curIdx];ST.editList.splice(curIdx,1);ST.editList.splice(j,0,tmp);
        curIdx=j;renderDayEdit();
        const newWrap=gid('de-list').children[curIdx];if(newWrap)newWrap.style.opacity='.25';
        break;
      }
    }
  };
  const up=()=>{
    document.removeEventListener('pointermove',move);document.removeEventListener('pointerup',up);
    ghost.remove();renderDayEdit();
  };
  document.addEventListener('pointermove',move);document.addEventListener('pointerup',up);
}
function rowSwipeStart(e,i){
  if(e.target.closest('.de-handle')||e.target.closest('button'))return;
  const wrap=e.currentTarget.closest('.de-row-wrap');const row=e.currentTarget;
  const startX=e.clientX,startY=e.clientY;let dx=0,moved=false;
  const move=ev=>{
    const ndx=ev.clientX-startX,ndy=ev.clientY-startY;
    if(!moved&&Math.abs(ndx)<8&&Math.abs(ndy)<8)return;
    if(Math.abs(ndy)>Math.abs(ndx)*1.5)return;
    moved=true;dx=Math.max(-120,Math.min(120,ndx));
    row.style.transform='translateX('+dx+'px)';
    wrap.querySelector('.de-act-swap').style.opacity=dx>20?Math.min(1,dx/80):0;
    wrap.querySelector('.de-act-del').style.opacity=dx<-20?Math.min(1,-dx/80):0;
  };
  const up=()=>{
    document.removeEventListener('pointermove',move);document.removeEventListener('pointerup',up);
    if(!moved){if(ST.editMid)openExNowSheet(i);else toggleDEExpand(i);return;}
    row.style.transition='transform .2s';row.style.transform='translateX(0)';
    if(dx>80)openSwap(i);else if(dx<-80)deleteExFromEdit(i);
    setTimeout(()=>{row.style.transition='';},220);
  };
  document.addEventListener('pointermove',move);document.addEventListener('pointerup',up);
}
function openSwap(i){
  ST.swapIdx=i;ST.swapPart=null;ST.swapSearch='';
  gid('sw-tit').textContent='Swap: '+ST.editList[i].name;
  ss('swap');renderSwapParts();
  saveInProgress();
}
function openAddEx(){
  ST.swapIdx=null;ST.swapPart=null;ST.swapSearch='';
  gid('sw-tit').textContent='Add exercise';
  ss('swap');renderSwapParts();
  saveInProgress();
}
function closeSwap(){ss('dayedit');saveInProgress();}
function swapExBtn(ex){
  return '<button class="day-btn" onclick="pickSwapEx('+jsArg(ex.name)+')"><span>'+esc(ex.name)+'</span><span style="font-size:11px;color:var(--txt3);flex-shrink:0;margin-left:8px">'+EQUIP_LABELS[equipRank(ex)]+'</span></button>';
}
function renderSwapParts(){
  const sEl=gid('sw-search');if(sEl&&sEl.value!==(ST.swapSearch||''))sEl.value=ST.swapSearch||'';
  const q=(ST.swapSearch||'').trim().toLowerCase();
  const addCexBtn='<button class="bg" style="width:100%;justify-content:center;border:1px dashed var(--bdr);border-radius:var(--radius);padding:11px" onclick="openCustomEx()"><i class="ti ti-plus" aria-hidden="true"></i> Can\'t find it? Add a custom exercise</button>';
  if(q){
    const matches=Object.values(EXPOOL).filter(ex=>ex.name.toLowerCase().includes(q)).sort(equipSort);
    gid('sw-parts').innerHTML=(matches.length?matches.map(swapExBtn).join(''):'<div style="font-size:13px;color:var(--txt2);text-align:center;padding:14px 0">No matching exercises</div>')+addCexBtn;
    return;
  }
  gid('sw-parts').innerHTML='<div style="font-size:13px;color:var(--txt2);margin-bottom:8px">Choose a body part</div>'+
    Object.keys(EXPOOL_BY_MG).sort().map(mg=>{
      const open=ST.swapPart===mg;
      const exList=open?'<div style="margin:8px 0 14px">'+
        EXPOOL_BY_MG[mg].map(swapExBtn).join('')+
      '</div>':'';
      return '<button class="opt-btn'+(open?' on':'')+'" style="margin-bottom:8px" onclick="pickSwapPart(\''+mg+'\')">'+humanizeMG(mg)+'</button>'+exList;
    }).join('')+addCexBtn;
}
function pickSwapPart(mg){
  ST.swapPart=mg;
  renderSwapParts();
  saveInProgress();
}
function pickSwapEx(name){
  if(ST.swapIdx===null)ST.editList.push(poolEx(name));else ST.editList[ST.swapIdx]=poolEx(name);
  DE_EXPANDED=null;
  ss('dayedit');renderDayEdit();
}

// ═══ CUSTOM EXERCISES ═══
const EQUIP_OPTS=[['barbell','Barbell'],['dumbbell','Dumbbell'],['machine','Machine'],['cable','Cable'],['bodyweight','Bodyweight'],['other','Other']];
function openCustomEx(){
  ST.cexEquip='barbell';ST.cexHold=false;
  gid('cex-name').value='';gid('cex-basew').value='';gid('cex-unit').textContent=CFG.unit;
  const mgSel=gid('cex-mg');mgSel.innerHTML=MG_LIST.map(mg=>'<option value="'+mg+'">'+humanizeMG(mg)+'</option>').join('');
  renderCexEquip();
  gid('cex-tog-hold').classList.remove('on');
  renderCustomExList();
  ss('customex');
}
function closeCustomEx(){ss('swap');renderSwapParts();}
function renderCexEquip(){
  gid('cex-equip').innerHTML=EQUIP_OPTS.map(([k,label])=>'<button type="button" class="opt-btn'+(ST.cexEquip===k?' on':'')+'" onclick="setCexEquip(\''+k+'\')">'+label+'</button>').join('');
  gid('cex-weight-wrap').style.display=ST.cexEquip==='bodyweight'?'none':'block';
}
function setCexEquip(k){ST.cexEquip=k;renderCexEquip();}
function saveCustomEx(){
  const name=gid('cex-name').value.trim();
  if(!name){alert('Enter an exercise name.');return;}
  if(EXPOOL[name]){alert('An exercise named "'+name+'" already exists.');return;}
  const mg=gid('cex-mg').value;
  const isBW=ST.cexEquip==='bodyweight';
  const baseW=isBW?0:(parseFloat(gid('cex-basew').value)||0);
  const ex={name,mg,yt:name.toLowerCase().replace(/[^a-z0-9]+/g,'+')+'+form',wu:false,baseW,custom:true,equip:ST.cexEquip};
  if(isBW)ex.note='bodyweight';else if(ST.cexEquip==='dumbbell')ex.note='each hand';
  if(ST.cexEquip==='machine')ex.machine=true;
  if(ST.cexHold)ex.holdSecs=true;
  CFG.customExercises.push(ex);
  EXPOOL[ex.name]=ex;(EXPOOL_BY_MG[ex.mg]=EXPOOL_BY_MG[ex.mg]||[]).push(ex);EXPOOL_BY_MG[ex.mg].sort(equipSort);
  saveCFG();
  gid('cex-name').value='';gid('cex-basew').value='';
  renderCustomExList();
}
function deleteCustomExercise(name){
  if(!confirm('Delete custom exercise "'+name+'"? Any day currently using it will fall back to its default exercise list.'))return;
  CFG.customExercises=CFG.customExercises.filter(e=>e.name!==name);
  delete EXPOOL[name];
  Object.keys(EXPOOL_BY_MG).forEach(mg=>{EXPOOL_BY_MG[mg]=EXPOOL_BY_MG[mg].filter(e=>e.name!==name);});
  saveCFG();
  renderCustomExList();
}
function renderCustomExList(){
  const el=gid('cex-list');if(!el)return;
  const list=CFG.customExercises||[];
  if(!list.length){el.innerHTML='<div style="font-size:13px;color:var(--txt2);text-align:center;padding:10px 0">None yet</div>';return;}
  el.innerHTML=list.map(ex=>'<div class="card" style="display:flex;justify-content:space-between;align-items:center;padding:12px 16px;margin-bottom:7px"><div><div style="font-size:13px;font-weight:600;color:var(--txt)">'+esc(ex.name)+'</div><div style="font-size:11px;color:var(--txt2);margin-top:2px">'+humanizeMG(ex.mg)+' · '+EQUIP_LABELS[equipRank(ex)]+(ex.holdSecs?' · timed hold':'')+'</div></div><button class="bg" onclick="deleteCustomExercise('+jsArg(ex.name)+')" aria-label="Delete custom exercise"><i class="ti ti-trash" aria-hidden="true"></i></button></div>').join('');
}
