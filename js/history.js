// GainPath: suggestion chips, session history, calendar, streaks, badges and Home
// A plain script (not a module) sharing one global scope with the other
// js/ files; index.html sets the load order. Map: docs/index-section-map.md
function dismissSync(w){CFG.syncDismiss=CFG.syncDismiss||{};CFG.syncDismiss[ST.sd[ST.exi].ex.name]=w;saveCFG();dismissSuggest();}
// FEEL_META = the session-level "how did it feel overall" rating (unchanged).
// RIR_META  = the per-exercise last-set "reps left in the tank" rating. Same
// stored keys (easy/good/hard/max) and colors, different labels — kept as two
// maps so relabeling the per-exercise rating never touches the session one.
const FEEL_META={easy:{l:'Too easy',c:'#3C8464',e:'😌'},good:{l:'Just right',c:'#4A6FA5',e:'💪'},hard:{l:'Hard',c:'#A5822B',e:'🔥'},max:{l:'Too much',c:'#C05A3E',e:'😵'}};
const RIR_META={easy:{l:'5+ reps left',c:'#3C8464',e:'😌'},good:{l:'3–4 reps left',c:'#4A6FA5',e:'💪'},hard:{l:'1–2 reps left',c:'#A5822B',e:'🔥'},max:{l:'0 — to failure',c:'#C05A3E',e:'😵'}};
function feelChip(feel){const m=RIR_META[feel];return m?'<span class="bdg" style="background:var(--bg2);color:'+m.c+'">'+m.e+' '+m.l+'</span>':'';}
function stepWeight(i,delta){
  const item=ST.sd[ST.exi];const ex=item.ex;const sets=item.sets;
  const mwBase=ex.machine&&ST.mw[mwKey(ex.name)]!==undefined?ST.mw[mwKey(ex.name)]:0;
  const dispW=ex.machine&&mwBase>0?+(sets[i].w-mwBase).toFixed(1):sets[i].w;
  // Dumbbells are a fixed rack, not a continuously-loadable bar/plate stack —
  // a flat +/- step can land between two owned weights, and pressing the
  // opposite arrow then jumps by the same flat step from that in-between
  // value instead of back to the dumbbell you started from. Step to the
  // actual next/previous owned weight instead, so up-then-down always
  // round-trips.
  const owned=equipRank(ex)===1?(CFG.gymDumbbells||[]).slice().sort((a,b)=>a-b):null;
  if(owned&&owned.length){
    const next=delta>0?owned.find(d=>d>dispW+1e-6):owned.slice().reverse().find(d=>d<dispW-1e-6);
    updSet(i,next!==undefined?next:(delta>0?owned[owned.length-1]:owned[0]));
    return;
  }
  updSet(i,Math.max(0,Math.round((dispW+delta)*2)/2));
}
function recomputePRs(){
  const prs={};
  ST.history.forEach(h=>{(h.exercises||[]).forEach(ex=>{const meta=EXPOOL[ex.name];if(meta&&meta.noPR)return;const allowZero=!!(meta&&meta.holdSecs);(ex.sets||[]).filter(s=>s.done&&s.t!=='w'&&(s.w!==0||allowZero)).forEach(s=>{const cur=prs[ex.name];if(!cur||s.w>cur.w||(s.w===cur.w&&s.r>cur.r))prs[ex.name]={w:s.w,r:s.r,date:h.date};});});});
  ST.prs=prs;
}
function applySuggest(w){
  const item=ST.sd[ST.exi];const ex=item.ex;const sets=item.sets;
  if(isPyramidEx(ex)){
    const workIdxs=sets.map((s,j)=>j).filter(j=>sets[j].t==='x');
    const inc=weightIncrement(ex);
    workIdxs.forEach((j,pos)=>{if(!sets[j].done)sets[j].w=Math.max(0,Math.round((w+inc*pos)*2)/2);});
  }else{
    sets.forEach(s=>{if(s.t!=='w'&&!s.done)s.w=w;});
  }
  item.sugDone=true;renderEx();
}
function dismissSuggest(){ST.sd[ST.exi].sugDone=true;renderEx();}
function renderExHistory(name){
  const el=gid('ch-hist');if(!el)return;
  const meta=EXPOOL[name];const isBW=!!(meta&&meta.note==='bodyweight');const isHold=!!(meta&&meta.holdSecs);
  const hist=exHistory(name);
  if(!hist.length){el.innerHTML='<div style="text-align:center;padding:1.4rem 1rem;font-size:13px;color:var(--txt2)">No sessions logged yet</div>';return;}
  const CAP=8,ordered=hist.slice().reverse(),shown=ST.histAll?ordered:ordered.slice(0,CAP);
  el.innerHTML=shown.map(s=>{
    const setStr=s.sets.map(st=>isHold?fmt(st.r)+' held':isBW?bwWeightLabel(st.w)+(st.r?' × '+st.r:''):st.w+CFG.unit+'×'+st.r).join(' · ');
    const vol=isBW||isHold?0:s.sets.reduce((a,st)=>a+(st.w>0?st.w*st.r:0),0);
    const best=isBW||isHold?0:Math.max(0,...s.sets.map(st=>e1rm(st.w,st.r)));
    return '<div class="card" onclick="openSession('+s.idx+')" style="cursor:pointer;padding:12px 16px;margin-bottom:7px">'+
      '<div style="display:flex;justify-content:space-between;align-items:center;gap:8px"><div style="font-size:13px;font-weight:600;color:var(--txt)">'+s.date+'</div>'+(s.exFeel?feelChip(s.exFeel):'')+'</div>'+
      '<div style="font-size:13px;color:var(--txt2);margin-top:4px">'+setStr+'</div>'+
      (vol>0?'<div style="font-size:11px;color:var(--txt3);margin-top:3px">Volume '+fmtVol(vol,CFG.unit)+' · Est. 1RM '+best+CFG.unit+'</div>':'')+
      (s.note?'<div style="font-size:11px;color:var(--txt3);margin-top:3px;display:flex;gap:4px;align-items:flex-start"><i class="ti ti-notes" aria-hidden="true" style="flex-shrink:0;margin-top:1px"></i>'+esc(s.note)+'</div>':'')+
    '</div>';
  }).join('')+moreBtn(ordered.length,CAP,ST.histAll,'toggleHistAll()');
}
// Long-lived accounts make these lists unbounded — an exercise trained weekly
// for a year is 50+ cards. Show the most recent 8 and let the rest be asked
// for, rather than truncating silently (the weigh-in list used to just stop
// at 8 with no way to reach anything older).
function moreBtn(total,cap,open,fn){
  if(total<=cap)return'';
  return'<button class="bs" style="width:100%;font-size:13px;margin-top:4px" onclick="'+fn+'">'+(open?t('show_less'):t('show_all').replace('{n}',total))+'</button>';
}
function openSession(idx){const rec=ST.history[idx];if(!rec)return;ST.editSession=idx;ST.editSessionData=JSON.parse(JSON.stringify(rec));gid('se-tit').textContent=rec.dayName;gid('se-sub').textContent=rec.date+' · '+rec.dur;renderSessionEdit();ss('session');}
function renderSessionEdit(){
  const rec=ST.editSessionData;
  gid('se-list').innerHTML='<div class="card"><label style="margin-bottom:4px">Session note</label><textarea class="inp" style="min-height:50px;margin-bottom:0" oninput="ST.editSessionData.note=this.value" placeholder="Optional">'+esc(rec.note||'')+'</textarea></div>'+
    rec.exercises.map((ex,ei)=>{
    const meta=EXPOOL[ex.name];const isHold=!!(meta&&meta.holdSecs);let wc=0;
    const rows=ex.sets.map((s,si)=>{
      const isW=s.t==='w';const lbl=isW?'W':String(++wc);const repUnit=isHold?'s':'reps';
      return '<div class="sr"><div class="sn'+(s.done?' d':(isW?' w':''))+'">'+lbl+'</div>'+
        '<input class="wi" type="number" min="0" step="0.5" value="'+s.w+'" onfocus="this.select()" onchange="updSessionSet('+ei+','+si+',\'w\',this.value)"><span style="font-size:11px;color:var(--txt2)">'+CFG.unit+'×</span>'+
        '<input class="ri" type="number" min="0" value="'+s.r+'" onfocus="this.select()" onchange="updSessionSet('+ei+','+si+',\'r\',this.value)"><span style="font-size:11px;color:var(--txt2)">'+repUnit+'</span></div>';
    }).join('');
    return '<div class="card"><div style="font-size:15px;font-weight:700;color:var(--txt);margin-bottom:6px">'+esc(ex.name)+'</div>'+rows+
      '<label style="margin:8px 0 4px">Note</label><textarea class="inp" style="min-height:44px;margin-bottom:0;font-size:13px" oninput="ST.editSessionData.exercises['+ei+'].note=this.value" placeholder="Optional">'+esc(ex.note||'')+'</textarea></div>';
  }).join('');
}
function updSessionSet(ei,si,field,val){const s=ST.editSessionData.exercises[ei].sets[si];if(field==='w')s.w=parseFloat(val)||0;else s.r=parseInt(val)||0;}
function saveSessionEdit(){const d=ST.editSessionData;d.sets=d.exercises.reduce((a,ex)=>a+ex.sets.filter(s=>s.done).length,0);ST.history[ST.editSession]=d;recomputePRs();recomputeBadges();saveData();ST.editSession=null;ST.editSessionData=null;refreshHome();ss('home');}
function deleteSession(){if(!confirm('Delete this session permanently? This cannot be undone.'))return;ST.history.splice(ST.editSession,1);recomputePRs();recomputeBadges();saveData();ST.editSession=null;ST.editSessionData=null;refreshHome();ss('home');}
function closeSession(){ST.editSession=null;ST.editSessionData=null;refreshHome();ss('home');}

// ═══ WORKOUT CALENDAR ═══
function calNav(dir){
  const cur=ST.calMonth||mkey(new Date());
  const[y,m]=cur.split('-').map(Number);
  ST.calMonth=mkey(new Date(y,m-1+dir,1));
  ST.calSel=null;
  renderCal();
}
function selCalDay(dk){ST.calSel=ST.calSel===dk?null:dk;renderCal();}
function renderCal(){
  const el=gid('h-cal');if(!el)return;
  const now=new Date(),curMk=mkey(now),todayK=dkey(now);
  const cur=ST.calMonth||curMk;
  const[Y,M]=cur.split('-').map(Number);
  const byDay={};
  ST.history.forEach((h,i)=>{if(h.mk===cur){if(!byDay[h.dk])byDay[h.dk]=[];byDay[h.dk].push(i);}});
  const minMk=ST.history.length?ST.history.reduce((a,h)=>h.mk&&h.mk<a?h.mk:a,curMk):curMk;
  const dim=new Date(Y,M,0).getDate();
  const lead=(new Date(Y,M-1,1).getDay()+6)%7;
  let grid=['Mo','Tu','We','Th','Fr','Sa','Su'].map(d=>'<div class="cal-dow">'+d+'</div>').join('');
  for(let i=0;i<lead;i++)grid+='<div class="cal-d"></div>';
  for(let d=1;d<=dim;d++){
    const dk=dkey(new Date(Y,M-1,d));
    const idxs=byDay[dk];const tod=dk===todayK?' cal-tod':'';const sel=dk===ST.calSel?' cal-sel':'';
    if(idxs){
      const last=idxs[idxs.length-1],h=ST.history[last];
      grid+='<button class="cal-d cal-on'+tod+sel+'" style="background:'+(DC[h.day]||'var(--accent)')+'" onclick="selCalDay('+jsArg(dk)+')" aria-label="View '+idxs.length+' session'+(idxs.length>1?'s':'')+' on '+esc(h.date)+'">'+d+(idxs.length>1?'<span class="cal-multi"></span>':'')+'</button>';
    }
    else grid+='<div class="cal-d'+tod+'">'+d+'</div>';
  }
  let dayPanel='';
  if(ST.calSel&&byDay[ST.calSel]){
    const rows=byDay[ST.calSel].map(i=>{
      const h=ST.history[i];const vol=sessionVolume(h);
      return '<button class="cal-sess" onclick="openSession('+i+')"><div style="text-align:left"><div style="font-size:13px;font-weight:600;color:var(--txt)">'+esc(h.dayName)+'</div><div style="font-size:11px;color:var(--txt2);margin-top:2px">'+esc(h.dur)+(vol>0?' · '+fmtVol(vol,CFG.unit):'')+' · '+h.sets+' sets'+(h.feel&&FEEL_META[h.feel]?' · '+FEEL_META[h.feel].e+' '+FEEL_META[h.feel].l:'')+'</div></div><i class="ti ti-chevron-right" style="color:var(--txt3)" aria-hidden="true"></i></button>';
    }).join('');
    const selDate=ST.history[byDay[ST.calSel][0]].date;
    dayPanel='<div class="cal-day-panel"><div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px"><span style="font-size:13px;font-weight:700;color:var(--txt)">'+esc(selDate)+'</span><button class="bg" style="padding:4px 8px" onclick="selCalDay('+jsArg(ST.calSel)+')" aria-label="Close day view"><i class="ti ti-x" aria-hidden="true"></i></button></div>'+rows+'<div style="font-size:11px;color:var(--txt2);margin-top:4px">Tap a session to view, fix, or delete it.</div></div>';
  }
  const monthSessions=Object.values(byDay).flat().map(i=>ST.history[i]);
  const vol=monthSessions.reduce((a,h)=>a+sessionVolume(h),0);
  const stats=monthSessions.length?'<div class="cal-stats">'+monthSessions.length+' workout'+(monthSessions.length>1?'s':'')+(vol>0?' · '+fmtVol(vol,CFG.unit)+' lifted':'')+' this month</div>':'<div class="cal-stats">No workouts this month'+(cur===curMk?' yet':'')+'</div>';
  const types=[...new Set(monthSessions.map(h=>h.day))];
  const legend=types.length?'<div class="cal-foot">'+types.map(t=>'<span class="cal-leg"><span class="cal-dot" style="background:'+(DC[t]||'var(--accent)')+'"></span>'+esc(getDayName(t))+'</span>').join('')+'</div>':'';
  el.innerHTML='<div class="cal-wrap"><div class="cal-head">'+
    '<button class="cal-nav" onclick="calNav(-1)" aria-label="Previous month"'+(cur<=minMk?' disabled':'')+'><i class="ti ti-chevron-left" aria-hidden="true"></i></button>'+
    '<div class="cal-tit">'+MN[M-1]+' '+Y+'</div>'+
    '<button class="cal-nav" onclick="calNav(1)" aria-label="Next month"'+(cur>=curMk?' disabled':'')+'><i class="ti ti-chevron-right" aria-hidden="true"></i></button>'+
    '</div><div class="cal-grid">'+grid+'</div>'+dayPanel+stats+legend+'</div>';
}

function startOfWeek(d){const dt=new Date(d);const day=(dt.getDay()+6)%7;dt.setDate(dt.getDate()-day);dt.setHours(0,0,0,0);return dt;}
function sessionsThisWeek(){
  const start=startOfWeek(new Date());
  const days=new Set(ST.history.filter(h=>new Date(h.dk+'T00:00:00')>=start).map(h=>h.dk));
  return days.size;
}
function weekStartDk(dk){return dkey(startOfWeek(new Date(dk+'T00:00:00')));}
function restDaysInWeek(wk){return(CFG.restDays||[]).filter(dk=>weekStartDk(dk)===wk).length;}
// Weeks a workout was logged in, keyed by Monday-week → Set of day keys.
function weekDayMap(history){
  const m={};(history||[]).forEach(h=>{if(!h||!h.dk)return;const w=weekStartDk(h.dk);if(!m[w])m[w]=new Set();m[w].add(h.dk);});
  return m;
}
function weekTarget(wk){return Math.max(1,CFG.freq-restDaysInWeek(wk));}
// How many consecutive qualifying weeks end at `endWk`, walking backwards.
// Extracted from streak() so badge history can ask the same question about a
// PAST week — one definition of "a qualifying week" for both callers. `open`
// means endWk is still in progress (today's week), which is never counted or
// broken, only stepped over.
function streakEndingAt(weekDays,endWk,open){
  const restWeekSet=new Set(CFG.restWeeks||[]);
  let cursor=endWk;
  if(open&&!restWeekSet.has(cursor)){
    const curSet=weekDays[cursor];
    if(!curSet||curSet.size<weekTarget(cursor)){const d=new Date(cursor+'T00:00:00');d.setDate(d.getDate()-7);cursor=dkey(d);}
  }
  let n=0;
  for(let guard=0;guard<520;guard++){
    if(restWeekSet.has(cursor)){
      // planned rest week — bridges the gap without counting or breaking the streak
    }else{
      const has=weekDays[cursor];
      if(!has)break;
      if(has.size<weekTarget(cursor))break;
      n++;
    }
    const d=new Date(cursor+'T00:00:00');d.setDate(d.getDate()-7);cursor=dkey(d);
  }
  return n;
}
function streak(){
  if(!ST.history.length)return 0;
  return streakEndingAt(weekDayMap(ST.history),dkey(startOfWeek(new Date())),true);
}
function addRestDay(dk){if(!CFG.restDays.includes(dk)){CFG.restDays.push(dk);CFG.restDays.sort();saveCFG();}}
function removeRestDay(dk){CFG.restDays=CFG.restDays.filter(d=>d!==dk);saveCFG();}
function addRestWeek(wk){if(!CFG.restWeeks.includes(wk)){CFG.restWeeks.push(wk);CFG.restWeeks.sort();saveCFG();}}
function removeRestWeek(wk){CFG.restWeeks=CFG.restWeeks.filter(w=>w!==wk);saveCFG();}
function markTodayRestDay(){addRestDay(dkey(new Date()));renderRestSettings();refreshHome();}
function markThisWeekRest(){addRestWeek(dkey(startOfWeek(new Date())));renderRestSettings();refreshHome();}
function renderRestSettings(){
  const el=gid('set-rest-list');if(!el)return;
  const days=(CFG.restDays||[]).map(dk=>({type:'day',key:dk,label:new Date(dk+'T00:00:00').toLocaleDateString('en-PH',{month:'short',day:'numeric',year:'numeric'})}));
  const weeks=(CFG.restWeeks||[]).map(wk=>({type:'week',key:wk,label:'Week of '+new Date(wk+'T00:00:00').toLocaleDateString('en-PH',{month:'short',day:'numeric',year:'numeric'})}));
  const items=days.concat(weeks).sort((a,b)=>b.key.localeCompare(a.key));
  if(!items.length){el.innerHTML='<div style="font-size:13px;color:var(--txt2);text-align:center;padding:8px 0">None marked</div>';return;}
  el.innerHTML=items.map(it=>'<div style="display:flex;align-items:center;justify-content:space-between;padding:6px 0;border-bottom:1px solid var(--bdr)"><span style="font-size:13px;color:var(--txt)">'+esc(it.label)+(it.type==='week'?' (full week)':'')+'</span><button class="bg" onclick="'+(it.type==='day'?'removeRestDay':'removeRestWeek')+'('+jsArg(it.key)+');renderRestSettings();refreshHome()" aria-label="Remove"><i class="ti ti-trash" aria-hidden="true"></i></button></div>').join('');
}
function getSplitDays(){
  if(CFG.split==='custom'&&CFG.customProgram&&CFG.customProgram.days.length)return CFG.customProgram.days.map(d=>d.id);
  return(SPLITS.find(s=>s.id===CFG.split)||SPLITS[0]).days;
}
function suggested(){
  const days=getSplitDays();
  if(!ST.history.length)return days[0];
  const last=ST.history[ST.history.length-1].day;
  const idx=days.indexOf(last);
  if(idx===-1)return days[0];
  return days[(idx+1)%days.length];
}
function stab(t){
  // The Workouts (Train) tab owns the streak card + install banner; the other
  // tabs are their own full screens (Days / Climb / PRs), so hide that
  // home chrome when they're active.
  const home=t==='wk';
  const hs=gid('hm-streak');if(hs)hs.style.display=home?'flex':'none';
  const bn=gid('prt-h');if(bn)bn.style.display=home?'':'none';
  ['wk','cal','ch','pr'].forEach(x=>{gid('p-'+x).style.display=x===t?'block':'none';gid('bn-'+x).classList.toggle('on',x===t);});
  if(t==='cal'){renderCal();initExHistory();}if(t==='ch')initChart();if(t==='pr'){renderBadges();renderPRs();}
}
function bnav(t){if(t==='wk'&&ST.day){ss(ST.restEnd?'rest':'wo');return;}ss('home');stab(t);}
function goHome(){
  clearInterval(ST.rt);clearInterval(ST.et);ST.rt=null;ST.et=null;ST.paused=false;refreshHome();ss('home');
}
function streakMsg(n){
  if(n===0)return{ic:'ti-flame',t:t('streak_msg_0')};
  if(n===1)return{ic:'ti-flame',t:t('streak_msg_1')};
  if(n<=3)return{ic:'ti-trending-up',t:t('streak_msg_2_3')};
  if(n<=7)return{ic:'ti-shield-check',t:t('streak_msg_4_7')};
  return{ic:'ti-crown',t:n+t('streak_msg_8plus_suffix')};
}

// ═══ ACHIEVEMENT BADGES ═══
// Badges are DERIVED, not authoritative — the same rule as ST.prs. ST.badges is
// a cache of {id:{dk}} rebuilt from ST.history/ST.bw/CFG by recomputeBadges(),
// so it is never persisted: anything that mutates a logged session must call
// recomputeBadges() right after recomputePRs(), or an edited-away session can
// leave a badge standing that was never earned.
//
// Art: one hexagon per badge, glyph knocked out in --ink. The locked state is
// the `lock` class on the same SVG (see .bdg in the stylesheet) — there is no
// second set of artwork, and no PNGs in images/ to keep in sync with sw.js.
const BDG_HEX='<polygon class="hex" points="32,2 58,17 58,47 32,62 6,47 6,17"/>';
function bdgTxt(s,size,y){return'<text x="32" y="'+y+'" text-anchor="middle" font-size="'+size+'">'+s+'</text>';}
function bdgBar(){return'<rect class="gf" x="15" y="21" width="4.4" height="12" rx="1.5"/><rect class="gf" x="44.6" y="21" width="4.4" height="12" rx="1.5"/><rect class="gf" x="20.5" y="24.6" width="23" height="4.8" rx="1.6"/>';}
function bdgFlag(x,y,h,pw){return'<rect class="gf" x="'+x+'" y="'+y+'" width="2.8" height="'+h+'" rx="1.3"/><polygon class="gf" points="'+(x+3)+','+(y+.5)+' '+(x+3+pw)+','+(y+5)+' '+(x+3)+','+(y+9.5)+'"/>';}
const BDG_GLYPH={
  first_rep:'<rect class="gf" x="16" y="26.5" width="5" height="13" rx="1.6"/><rect class="gf" x="43" y="26.5" width="5" height="13" rx="1.6"/><rect class="gf" x="22" y="30.5" width="20" height="5" rx="1.6"/>',
  ten_deep:bdgTxt('10',21,40),
  half_century:bdgTxt('50',21,40),
  century:bdgTxt('100',17,39),
  perfect_week:'<polyline class="gs" points="21,33 29,41 44,24" stroke-width="4.6"/>',
  chain_four:'<rect class="gf" x="19" y="37" width="5" height="8" rx="1.6"/><rect class="gf" x="26" y="32" width="5" height="13" rx="1.6"/><rect class="gf" x="33" y="27" width="5" height="18" rx="1.6"/><rect class="gf" x="40" y="22" width="5" height="23" rx="1.6"/>',
  twelve_weeks:bdgTxt('12',21,40),
  back_on_track:'<path class="gs" d="M45 32a13 13 0 1 1-4.2-9.6" stroke-width="3.4"/><polygon class="gf" points="47.5,13 48.5,25.5 36.5,22"/>',
  first_flag:'<rect class="gf" x="22.5" y="18" width="3.2" height="28" rx="1.4"/><polygon class="gf" points="26.5,19 44,24.5 26.5,30"/>',
  ten_flags:bdgFlag(15,28,17,9)+bdgFlag(29,20,25,9)+bdgFlag(43,25,20,9),
  bodyweight_club:bdgBar()+bdgTxt('1×',15,48),
  double_bodyweight:bdgBar()+bdgTxt('2×',15,48),
  ten_tonne:'<rect class="gf" x="19" y="39" width="26" height="6" rx="2"/><rect class="gf" x="22" y="30.5" width="20" height="6" rx="2"/><rect class="gf" x="25" y="22" width="14" height="6" rx="2"/>',
  million_club:bdgTxt('1M',21,40),
  all_rounder:'<polygon class="gs" points="32,19 43.3,25.5 43.3,38.5 32,45 20.7,38.5 20.7,25.5" stroke-width="2.8"/><g class="gs" stroke-width="2" opacity=".6"><line x1="32" y1="32" x2="32" y2="19"/><line x1="32" y1="32" x2="43.3" y2="25.5"/><line x1="32" y1="32" x2="43.3" y2="38.5"/><line x1="32" y1="32" x2="32" y2="45"/><line x1="32" y1="32" x2="20.7" y2="38.5"/><line x1="32" y1="32" x2="20.7" y2="25.5"/></g><circle class="gf" cx="32" cy="32" r="3"/>',
  explorer_25:'<g class="gs" stroke-width="3"><line x1="32" y1="26" x2="32" y2="15"/><line x1="38" y1="32" x2="49" y2="32"/><line x1="32" y1="38" x2="32" y2="49"/><line x1="26" y1="32" x2="15" y2="32"/></g><g class="gs" stroke-width="2.2"><line x1="36.2" y1="27.8" x2="40.8" y2="23.2"/><line x1="36.2" y1="36.2" x2="40.8" y2="40.8"/><line x1="27.8" y1="36.2" x2="23.2" y2="40.8"/><line x1="27.8" y1="27.8" x2="23.2" y2="23.2"/></g><circle class="gf" cx="32" cy="32" r="3.4"/>'
};
function badgeSvg(id,locked){return'<svg viewBox="0 0 64 64" class="bdg'+(locked?' lock':'')+'" aria-hidden="true">'+BDG_HEX+(BDG_GLYPH[id]||'')+'</svg>';}

// Volume thresholds are stated in kg; a lbs user gets the equivalent in their
// own unit, since logged weights are already in whatever unit they set.
function bdgVolT(kg){return CFG.unit==='lbs'?Math.round(kg*2.2):kg;}
const BDG_BW_LIFTS=['Barbell back squat','Flat barbell bench press','Barbell deadlift'];
const BDG_DBL_LIFTS=['Barbell back squat','Barbell deadlift'];
const BDG_ALLROUND=['chest','back','shoulders','quads','hamstrings'];
// `a` is the accumulator recomputeBadges() carries forward through history.
const BADGES=[
  {id:'first_rep',grp:'showing_up',cond:a=>a.n>=1},
  {id:'ten_deep',grp:'showing_up',cond:a=>a.n>=10},
  {id:'half_century',grp:'showing_up',cond:a=>a.n>=50},
  {id:'century',grp:'showing_up',cond:a=>a.n>=100},
  {id:'perfect_week',grp:'showing_up',cond:a=>a.weekDays[a.wk].size>=weekTarget(a.wk)},
  {id:'chain_four',grp:'staying',cond:a=>a.streak>=4},
  {id:'twelve_weeks',grp:'staying',cond:a=>a.streak>=12},
  {id:'back_on_track',grp:'staying',cond:a=>a.n>=2&&a.gapDays>=14},
  {id:'first_flag',grp:'stronger',cond:a=>a.prCount>=1},
  {id:'ten_flags',grp:'stronger',cond:a=>a.prCount>=10},
  {id:'bodyweight_club',grp:'stronger',needsBW:true,cond:a=>!!a.bw&&BDG_BW_LIFTS.some(n=>a.prs[n]&&a.prs[n].w>=a.bw)},
  {id:'double_bodyweight',grp:'stronger',needsBW:true,cond:a=>!!a.bw&&BDG_DBL_LIFTS.some(n=>a.prs[n]&&a.prs[n].w>=a.bw*2)},
  {id:'ten_tonne',grp:'work',vol:10000,cond:a=>a.sessVol>=bdgVolT(10000)},
  {id:'million_club',grp:'work',vol:1000000,cond:a=>a.vol>=bdgVolT(1000000)},
  {id:'all_rounder',grp:'ground',cond:a=>{const s=a.mgWeek[a.wk];return!!s&&BDG_ALLROUND.every(m=>s.has(m))&&(s.has('biceps')||s.has('triceps'));}},
  {id:'explorer_25',grp:'ground',cond:a=>a.exNames.size>=25}
];
// One chronological pass. Each badge is stamped with the dk of the session that
// FIRST met its condition, so backfilled badges carry their real historical
// date instead of all reading as today.
function recomputeBadges(){
  const hist=ST.history.slice().filter(h=>h&&h.dk).sort((a,b)=>a.dk.localeCompare(b.dk));
  const bw=(ST.bw||[]).slice().sort((a,b)=>a.dk.localeCompare(b.dk));
  const earned={};
  const a={n:0,exNames:new Set(),vol:0,weekDays:{},mgWeek:{},prs:{},prCount:0,bw:null,sessVol:0,wk:null,gapDays:0,streak:0};
  let prevDk=null;
  hist.forEach(h=>{
    a.n++;
    a.wk=weekStartDk(h.dk);
    a.gapDays=prevDk?dkDay(h.dk)-dkDay(prevDk):0;
    prevDk=h.dk;
    if(!a.weekDays[a.wk])a.weekDays[a.wk]=new Set();
    a.weekDays[a.wk].add(h.dk);
    if(!a.mgWeek[a.wk])a.mgWeek[a.wk]=new Set();
    a.sessVol=sessionVolume(h);
    a.vol+=a.sessVol;
    (h.exercises||[]).forEach(ex=>{
      const meta=EXPOOL[ex.name];
      const allowZero=!!(meta&&meta.holdSecs);
      const work=(ex.sets||[]).filter(s=>s.done&&s.t!=='w');
      if(work.length){a.exNames.add(ex.name);if(meta&&meta.mg)a.mgWeek[a.wk].add(meta.mg);}
      if(meta&&meta.noPR)return;
      // Same PR rule as recomputePRs(): warm-ups out, zero weight only for
      // timed holds, ties broken on reps. Each beat is one "PR event".
      work.filter(s=>s.w!==0||allowZero).forEach(s=>{
        const cur=a.prs[ex.name];
        if(!cur||s.w>cur.w||(s.w===cur.w&&s.r>cur.r)){a.prs[ex.name]={w:s.w,r:s.r};a.prCount++;}
      });
    });
    const bwe=bw.filter(e=>e.dk<=h.dk).pop();
    a.bw=bwe?bwe.w:null;
    a.streak=streakEndingAt(a.weekDays,a.wk,false);
    BADGES.forEach(b=>{if(!earned[b.id]&&b.cond(a))earned[b.id]={dk:h.dk};});
  });
  ST.badges=earned;
}
function badgeCount(){return Object.keys(ST.badges||{}).length;}
function badgeDate(dk){return new Date(dk+'T00:00:00').toLocaleDateString('en-PH',{month:'short',day:'numeric',year:'numeric'});}
function renderBadges(){
  const grid=gid('bdg-grid');if(!grid)return;
  const earned=ST.badges||{};
  // Earned first, locked after — but the roster order is otherwise fixed, so
  // the case looks the same every time you open it.
  const order=BADGES.slice().sort((x,y)=>(earned[y.id]?1:0)-(earned[x.id]?1:0));
  grid.innerHTML=order.map(b=>{
    const got=!!earned[b.id];
    return'<button class="bdg-cell'+(got?'':' locked')+'" onclick="showBadge('+jsArg(b.id)+')"><span class="bdg-wrap">'+badgeSvg(b.id,!got)+'</span><span class="bdg-nm">'+esc(t('bdg_'+b.id+'_name'))+'</span></button>';
  }).join('');
  gid('bdg-count').textContent=badgeCount()+' / '+BADGES.length;
  // Backfilled badges arrive as a batch on first open, not as workout unlocks —
  // say so once rather than letting them appear from nowhere.
  const intro=gid('bdg-intro'),show=!CFG.badgesIntroSeen&&badgeCount()>0;
  intro.style.display=show?'block':'none';
  if(show){intro.textContent=t('badges_intro').replace('{n}',badgeCount());CFG.badgesIntroSeen=true;saveCFG();}
}
function showBadge(id){
  const b=BADGES.find(x=>x.id===id);if(!b)return;
  const got=(ST.badges||{})[id],meta=gid('bdg-sheet-meta');
  gid('bdg-sheet-art').innerHTML=badgeSvg(id,!got);
  gid('bdg-sheet-name').textContent=t('bdg_'+id+'_name');
  // Volume thresholds are stated in the user's own unit, not always in kg.
  gid('bdg-sheet-cond').textContent=b.vol?t('bdg_'+id+'_cond').replace('{v}',bdgVolT(b.vol).toLocaleString()+' '+CFG.unit):t('bdg_'+id+'_cond');
  if(got){meta.style.color='var(--accent)';meta.textContent=t('badge_earned_on')+' '+badgeDate(got.dk);}
  else{meta.style.color='var(--txt3)';meta.textContent=(b.needsBW&&!(ST.bw||[]).length)?t('badge_locked_hint_bw'):t('badge_locked');}
  gid('bdg-overlay').style.display='block';gid('bdg-sheet').style.display='block';document.body.style.overflow='hidden';
}
function closeBadge(){gid('bdg-overlay').style.display='none';gid('bdg-sheet').style.display='none';document.body.style.overflow='';}
function refreshHome(){
  accentColor();renderHomeBanners();
  tickNum(gid('h-str'),streak());
  const sm=streakMsg(streak());
  gid('h-str-ic').className='ti '+sm.ic;gid('h-str-cta').textContent=sm.t;
  gid('h-week').textContent=sessionsThisWeek()+'/'+CFG.freq;
  const sug=suggested();const hr=new Date().getHours();
  const tod=hr<12?'morning':hr<17?'afternoon':'evening';
  if(ST.history.length){
    const lastDay=ST.history[ST.history.length-1].day,last=getDayName(lastDay);
    gid('h-gr').textContent=t('greet_returning_'+tod).split('{name}').join(CFG.firstName).split('{day}').join(last);gid('h-sg').innerHTML=t('suggested_next_prefix')+' <strong style="color:var(--tint-amber-text)">'+esc(getDayName(sug))+'</strong>';
    const rbtn=gid('h-repeat-btn');rbtn.style.display='flex';rbtn.innerHTML='<i class="ti ti-rotate-clockwise" aria-hidden="true"></i> '+t('repeat_last_workout_prefix')+esc(last);
  }
  else{gid('h-gr').textContent=t('greet_new_'+tod).split('{name}').join(CFG.firstName);gid('h-sg').textContent=t('pick_first_session');gid('h-repeat-btn').style.display='none';}
  gid('h-tour').style.display=!ST.history.length&&!CFG.tutorialSeen?'block':'none';
  const con=gid('dbtn-list');con.innerHTML='';
  getSplitDays().forEach(k=>{
    const isSug=k===sug;const last=ST.history.filter(h=>h.day===k).slice(-1)[0];
    const exList=getEffectiveDayExercises(k);
    const btn=document.createElement('button');btn.className='day-btn'+(isSug?' sug':'');
    btn.innerHTML='<div><div class="tt" style="font-size:15px;font-weight:800;text-transform:uppercase;letter-spacing:-.01em;color:var(--txt)"><i class="ti '+(DI[k]||'ti-player-play')+'" style="margin-right:8px;color:'+(DC[k]||'var(--accent)')+';font-size:16px" aria-hidden="true"></i>'+esc(getDayName(k))+(isSug?'<span class="bdg" style="margin-left:8px;background:var(--tint-amber-1);color:var(--tint-amber-text)">'+t('day_suggested_badge')+'</span>':'')+'</div><div style="font-size:13px;color:var(--txt2);margin-top:4px">'+exList.length+t('exercises_count_suffix')+' \u00b7 '+(last?t('last_colon_prefix')+esc(last.date):t('not_done_yet'))+'</div></div><i class="ti ti-chevron-right" style="color:var(--txt3);font-size:16px" aria-hidden="true"></i>';
    btn.onclick=()=>openDayEdit(k);con.appendChild(btn);
  });
  renderCal();
}
