// GainPath: the Climb charts, PRs and PDF report
// A plain script (not a module) sharing one global scope with the other
// js/ files; index.html sets the load order. Map: docs/index-section-map.md
function allExNames(){const s=new Set();Object.values(EX).forEach(arr=>{if(Array.isArray(arr))arr.forEach(e=>s.add(e.name));});return[...s].sort();}
const PR_KEY_LIFTS={chest:'Flat barbell bench press',back:'Barbell row',quads:'Barbell back squat',shoulders:'Barbell overhead press'};
// Lifts with at least one logged working set at a real weight — exactly what
// drawChart() can plot — most-logged first. Offering only fixed bellwether
// lifts left anyone who trains other movements staring at an empty chart.
function chLifts(){
  const n={};
  ST.history.forEach(h=>(h.exercises||[]).forEach(ex=>{if((ex.sets||[]).some(s=>s.done&&s.t!=='w'&&s.w>0))n[ex.name]=(n[ex.name]||0)+1;}));
  return Object.keys(n).sort((a,b)=>n[b]-n[a]||a.localeCompare(b));
}
function initChart(){
  // Rebuilt on every visit: history changes between visits. Keeps the current
  // pick if it's still there, otherwise defaults to the most-logged lift.
  const sel=gid('ch-sel'),prev=sel.value,lifts=chLifts(),grp={};
  lifts.forEach(n=>{const mg=(EXPOOL[n]&&EXPOOL[n].mg)||'other';(grp[mg]=grp[mg]||[]).push(n);});
  const order=MG_LIST.filter(mg=>grp[mg]).concat(Object.keys(grp).filter(mg=>MG_LIST.indexOf(mg)<0).sort());
  sel.innerHTML=order.map(mg=>'<optgroup label="'+esc(humanizeMG(mg))+'">'+grp[mg].map(n=>'<option value="'+esc(n)+'">'+esc(n)+'</option>').join('')+'</optgroup>').join('');
  if(lifts.length)sel.value=lifts.indexOf(prev)>=0?prev:lifts[0];
  if(!ST.mgWeek)ST.mgWeek=dkey(startOfWeek(new Date()));
  renderChSeg();
}
// The Progress tab is one segment at a time — three stacked panels ran about
// four phone screens deep. Only the visible segment renders: a Chart.js canvas
// sized inside a display:none parent comes out 0px wide, so each segment draws
// on the way in rather than all three up front.
function chSeg(n){ST.chSeg=n;renderChSeg();}
// Both charts open on the last month. The range chips only appear once the
// data reaches back further than that — before then there's nothing to pick.
const CH_RANGES=[['1m',30],['3m',91],['6m',182],['all',0]];
function chWindow(days){
  const to=dkDay(dkey(new Date())),long=days.length>0&&to-days[0]>30;
  const r=long?(CH_RANGES.find(x=>x[0]===ST.chRange)||CH_RANGES[0]):CH_RANGES[3];
  return{long,from:r[1]?to-r[1]:null,to};
}
function rngChips(id,long){
  const el=gid(id);el.style.display=long?'flex':'none';
  if(long)el.innerHTML=CH_RANGES.map(([k])=>'<button class="rng-b'+(k===ST.chRange?' on':'')+'" aria-pressed="'+(k===ST.chRange)+'" onclick="setChRange('+jsArg(k)+')">'+t('rng_'+k)+'</button>').join('');
}
function setChRange(k){ST.chRange=k;renderChSeg();}
function renderChSeg(){
  const n=ST.chSeg||'strength';
  ['strength','balance','body'].forEach(x=>{gid('ch-seg-'+x).style.display=x===n?'block':'none';gid('chseg-'+x).classList.toggle('on',x===n);});
  if(n==='strength')drawChart();else if(n==='balance')renderMGBalance();else{renderBWSection();renderPhotos();}
}
// Session history lives on the Days tab now — it browses logged sessions, which
// is what that tab is for, and it left the Progress tab carrying four screens.
function initExHistory(){
  const histSel=gid('ch-hist-sel');if(!histSel)return;
  if(!histSel.options.length)allExNames().forEach(n=>{const o=document.createElement('option');o.value=n;o.textContent=n;histSel.appendChild(o);});
  renderExHistory(histSel.value);
}
function pickExHistory(name){ST.histAll=false;renderExHistory(name);}
function toggleHistAll(){ST.histAll=!ST.histAll;renderExHistory(gid('ch-hist-sel').value);}
function toggleBwAll(){ST.bwAll=!ST.bwAll;renderBWSection();}
const MIRROR_PAIRS=[['chest','back'],['quads','hamstrings'],['biceps','triceps']];
function weeklyMGVolume(weekStartDk){
  const start=new Date(weekStartDk+'T00:00:00');const end=new Date(start);end.setDate(end.getDate()+7);
  const counts={};
  ST.history.forEach(h=>{
    const hd=new Date(h.dk+'T00:00:00');if(hd<start||hd>=end)return;
    (h.exercises||[]).forEach(ex=>{
      const meta=EXPOOL[ex.name];if(!meta)return;
      const hard=(ex.sets||[]).filter(s=>s.done&&s.t!=='w').length;
      if(hard)counts[meta.mg]=(counts[meta.mg]||0)+hard;
    });
  });
  return counts;
}
function mgWeekNav(dir){
  const d=new Date(ST.mgWeek+'T00:00:00');d.setDate(d.getDate()+dir*7);
  const next=dkey(startOfWeek(d));
  if(next>dkey(startOfWeek(new Date())))return;
  ST.mgWeek=next;renderMGBalance();
}
function renderMGBalance(){
  const el=gid('mg-balance');if(!el)return;
  const curWk=dkey(startOfWeek(new Date()));
  gid('mg-week-next').disabled=ST.mgWeek>=curWk;
  const startD=new Date(ST.mgWeek+'T00:00:00');const endD=new Date(startD);endD.setDate(endD.getDate()+6);
  gid('mg-week-lbl').textContent=ST.mgWeek===curWk?'This week':startD.toLocaleDateString('en-PH',{month:'short',day:'numeric'})+' – '+endD.toLocaleDateString('en-PH',{month:'short',day:'numeric'});
  const counts=weeklyMGVolume(ST.mgWeek);
  const mgs=Object.keys(counts);
  if(!mgs.length){el.innerHTML='<div style="text-align:center;padding:1rem;font-size:13px;color:var(--txt2)">No hard sets logged this week</div>';return;}
  const max=Math.max(...mgs.map(mg=>counts[mg]));
  const sorted=mgs.sort((a,b)=>counts[b]-counts[a]);
  let html=sorted.map(mg=>{
    const pct=Math.round(counts[mg]/max*100);
    return '<div style="margin-bottom:9px"><div style="display:flex;justify-content:space-between;font-size:13px;color:var(--txt);margin-bottom:3px"><span>'+humanizeMG(mg)+'</span><span style="color:var(--txt2)">'+counts[mg]+' sets</span></div><div style="height:7px;background:var(--bg2);border-radius:8px;overflow:hidden"><div style="height:100%;width:'+pct+'%;background:var(--accent);border-radius:8px"></div></div></div>';
  }).join('');
  const flags=MIRROR_PAIRS.filter(([a,b])=>(counts[a]||0)>0||(counts[b]||0)>0).filter(([a,b])=>{
    const ca=counts[a]||0,cb=counts[b]||0;const lo=Math.min(ca,cb),hi=Math.max(ca,cb);
    return hi>=4&&(lo===0||hi/lo>=2);
  });
  if(flags.length)html+='<div style="font-size:11px;color:var(--tint-amber-text);margin-top:8px;display:flex;gap:5px;align-items:flex-start"><i class="ti ti-alert-triangle" aria-hidden="true" style="flex-shrink:0;margin-top:1px"></i><span>Possible imbalance: '+flags.map(([a,b])=>humanizeMG(a)+' vs '+humanizeMG(b)).join(', ')+'</span></div>';
  el.innerHTML=html;
}
function openLogBW(){
  gid('bw-date').value=dkey(new Date());
  gid('bw-w-inp').value=curBW()||'';
  gid('bw-waist-inp').value='';gid('bw-arms-inp').value='';
  gid('bw-unit').textContent=CFG.unit;
  gid('bw-log-form').style.display='block';
}
// Body weight has one source of truth: the latest weigh-in by date, with the
// onboarding/profile value only standing in until the first weigh-in exists.
// Every write to ST.bw ends in syncBW(), so CFG.bw (what Settings shows) and
// the weigh-in log can never disagree.
function syncBW(quiet){
  ST.bw.sort((a,b)=>String(a.dk).localeCompare(String(b.dk)));
  if(ST.bw.length)CFG.bw=ST.bw[ST.bw.length-1].w;
  recomputeBadges();if(!quiet)saveCFG();
}
function setWeighIn(dk,w){
  const i=ST.bw.findIndex(e=>e.dk===dk);const prev=i>=0?ST.bw[i]:{};
  const entry={dk,date:new Date(dk+'T00:00:00').toLocaleDateString('en-PH',{month:'short',day:'numeric',year:'numeric'}),w,waist:prev.waist||null,arms:prev.arms||null};
  if(i>=0)ST.bw[i]=entry;else ST.bw.push(entry);
  saveData();syncBW();
}
function closeLogBW(){gid('bw-log-form').style.display='none';}
function saveBWLog(){
  const dk=gid('bw-date').value||dkey(new Date());
  const w=parseFloat(gid('bw-w-inp').value);
  if(!w||w<=0){alert('Please enter a valid weight');return;}
  const waist=parseFloat(gid('bw-waist-inp').value)||null;
  const arms=parseFloat(gid('bw-arms-inp').value)||null;
  const date=new Date(dk+'T00:00:00').toLocaleDateString('en-PH',{month:'short',day:'numeric',year:'numeric'});
  const idx=ST.bw.findIndex(e=>e.dk===dk);
  const entry={dk,date,w,waist,arms};
  if(idx>=0)ST.bw[idx]=entry;else ST.bw.push(entry);
  ST.bw.sort((a,b)=>a.dk.localeCompare(b.dk));
  saveData();syncBW();closeLogBW();renderBWSection();
}
function renderBWSection(){
  const latestEl=gid('bw-latest');if(!latestEl)return;
  const sorted=ST.bw;
  latestEl.textContent=sorted.length?sorted[sorted.length-1].w+CFG.unit:'—';
  const canvas=gid('bw-cv'),empty=gid('bw-empty'),one=gid('bw-one');
  if(ST.bwChart){ST.bwChart.destroy();ST.bwChart=null;}
  const win=chWindow(sorted.map(e=>dkDay(e.dk)));rngChips('bw-rng',win.long);
  const inWin=sorted.filter(e=>win.from===null||dkDay(e.dk)>=win.from);
  empty.style.display=sorted.length?'none':'block';
  // One weigh-in (or one in the chosen range) isn't a trend — say what's
  // needed instead of drawing a single dot.
  one.style.display=sorted.length&&inWin.length<2?'block':'none';
  one.textContent=sorted.length>1?t('rng_sparse'):t('bw_one_hint');
  canvas.style.display=inWin.length<2?'none':'block';
  if(inWin.length>=2){
  const theme=chartTheme(canvas,140);
  const bwDays=inWin.map(e=>dkDay(e.dk));
  ST.bwChart=new Chart(canvas,{type:'line',data:{datasets:[{label:'Body weight ('+CFG.unit+')',data:inWin.map((e,i)=>({x:bwDays[i],y:e.w})),borderColor:theme.accent,backgroundColor:theme.fill,tension:.35,pointBackgroundColor:theme.accent,pointBorderColor:theme.bg,pointBorderWidth:2,pointRadius:5,pointHoverRadius:7,borderWidth:2.5,fill:true}]},options:{responsive:true,plugins:{legend:{display:false},tooltip:{callbacks:{title:c=>dayLabel(c[0].parsed.x,true),label:c=>c.parsed.y+' '+CFG.unit}}},scales:{y:{beginAtZero:false,grid:{color:theme.grid},ticks:{color:theme.tick,callback:v=>(Math.round(v*10)/10)+CFG.unit,font:{size:11}}},x:timeAxis(win.from===null?bwDays:[win.from,win.to],theme.tick)}}});
  }
  const BWCAP=8,bwOrdered=sorted.slice().reverse(),bwShown=ST.bwAll?bwOrdered:bwOrdered.slice(0,BWCAP);
  gid('bw-list').innerHTML=bwShown.map(e=>{
    const extras=[e.waist?'Waist '+e.waist+'cm':null,e.arms?'Arms '+e.arms+'cm':null].filter(Boolean).join(' · ');
    return '<div style="display:flex;justify-content:space-between;align-items:center;padding:8px 0;border-bottom:1px solid var(--bdr)"><div><div style="font-size:13px;font-weight:600;color:var(--txt)">'+e.w+CFG.unit+'</div><div style="font-size:11px;color:var(--txt2);margin-top:2px">'+e.date+(extras?' · '+extras:'')+'</div></div><button class="bg" onclick="deleteBWLog('+jsArg(e.dk)+')" aria-label="Delete entry"><i class="ti ti-trash" aria-hidden="true"></i></button></div>';
  }).join('')+moreBtn(bwOrdered.length,BWCAP,ST.bwAll,'toggleBwAll()');
}
function deleteBWLog(dk){
  if(!confirm('Delete this weigh-in entry?'))return;
  ST.bw=ST.bw.filter(e=>e.dk!==dk);saveData();syncBW();renderBWSection();
}
function chartTheme(canvas,h){
  const cs=window.getComputedStyle(document.documentElement);
  const accent=cs.getPropertyValue('--accent').trim()||'#153F29';
  const accent2=cs.getPropertyValue('--accent-2').trim()||accent;
  const grid=cs.getPropertyValue('--bdr').trim()||'#e0e0e0';
  const tick=cs.getPropertyValue('--txt2').trim()||'#666';
  const forge=cs.getPropertyValue('--brand-forge').trim()||'#946F17';
  const bg=cs.getPropertyValue('--bg').trim()||'#fff';
  const fill=canvas.getContext('2d').createLinearGradient(0,0,0,h);
  fill.addColorStop(0,accent+'55');fill.addColorStop(1,accent+'00');
  return{accent,accent2,grid,tick,forge,bg,fill};
}
function drawChart(){
  const name=gid('ch-sel').value,metric=(gid('ch-metric')&&gid('ch-metric').value)||'w',one=gid('ch-one'),canvas=gid('ch-cv');
  if(ST.chart){ST.chart.destroy();ST.chart=null;}
  // Nothing logged yet: no pickers, no empty axes — one card pointing at Train.
  const has=!!name;
  gid('ch-start').style.display=has?'none':'block';gid('ch-has').style.display=has?'block':'none';
  if(!has)return;
  // Keyed by day, not pushed per session: ST.history is only ever appended, so
  // a back-dated/edited session would otherwise plot out of order, and two
  // sessions of this lift on one day would land on the same x. Volume sums
  // within a day; max weight / est. 1RM take the day's best.
  const byDay={};ST.history.forEach(h=>{
    const ex=(h.exercises||[]).find(e=>e.name===name);if(!ex)return;
    const ws=(ex.sets||[]).filter(s=>s.done&&s.t!=='w'&&s.w>0);if(!ws.length)return;
    const dk=h.dk||dkey(new Date(h.date));if(!dk)return;
    let y;
    if(metric==='v')y=ws.reduce((a,s)=>a+s.w*s.r,0);
    else if(metric==='e')y=Math.max(...ws.map(s=>e1rm(s.w,s.r)));
    else y=Math.max(...ws.map(s=>s.w));
    byDay[dk]=byDay[dk]===undefined?y:(metric==='v'?byDay[dk]+y:Math.max(byDay[dk],y));
  });
  const all=Object.keys(byDay).sort().map(dk=>({day:dkDay(dk),w:byDay[dk]}));
  // Waypoints come from the full history, so a range that starts mid-climb
  // doesn't flag its first point as a new best.
  let runningMax=-Infinity;
  const wpAll=all.map(p=>{const wp=p.w>runningMax;if(wp)runningMax=p.w;return wp;});
  const win=chWindow(all.map(p=>p.day));rngChips('ch-rng',win.long);
  const pts=all.filter(p=>win.from===null||p.day>=win.from),isWaypoint=wpAll.slice(all.length-pts.length);
  if(pts.length<2){
    canvas.style.display='none';one.style.display='block';
    // A single logged day is a starting point, not a line — a lone dot on
    // invented axes says nothing, so show the number and when it was set.
    const p=all[0],mEl=gid('ch-metric'),mLbl=mEl.options[mEl.selectedIndex].text;
    one.innerHTML=all.length>1?'<div style="font-size:13px;color:var(--txt2)">'+t('rng_sparse')+'</div>':'<div style="font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--txt2)">'+t('ch_one_label')+'</div><div style="font-family:var(--font-display);font-size:34px;font-weight:900;letter-spacing:-.02em;color:var(--accent);margin-top:4px">'+(metric==='v'?fmtVol(p.w,CFG.unit):(Math.round(p.w*10)/10)+CFG.unit)+'</div><div style="font-size:12px;color:var(--txt2);margin-top:2px">'+esc(mLbl)+' · '+dayLabel(p.day,true)+'</div><div style="font-size:13px;color:var(--txt2);margin-top:12px">'+t('ch_one_hint')+'</div>';
    return;
  }
  canvas.style.display='block';one.style.display='none';
  const theme=chartTheme(canvas,180);
  const label=(metric==='v'?'Volume':metric==='e'?'Est. 1RM':'Max weight')+' ('+CFG.unit+')';
  // "Elevation profile" signature: waypoint-flag styling on every point that
  // set a new best at the time, like flags along a trail's ascent — a
  // running max over pts, not just today's PR list, so old peaks stay marked.
  const first=all.length-pts.length===0;
  const pointRadius=isWaypoint.map((wp,i)=>i===0&&first?5:wp?8:4);
  const pointColor=isWaypoint.map((wp,i)=>(i>0||!first)&&wp?theme.forge:theme.accent);
  ST.chart=new Chart(canvas,{type:'line',data:{datasets:[{label,data:pts.map(p=>({x:p.day,y:p.w})),borderColor:theme.accent,backgroundColor:theme.fill,tension:.35,pointBackgroundColor:pointColor,pointBorderColor:theme.bg,pointBorderWidth:2,pointRadius,pointHoverRadius:pointRadius.map(r=>r+2),borderWidth:2.5,fill:true}]},options:{responsive:true,plugins:{legend:{display:false},tooltip:{callbacks:{title:c=>dayLabel(c[0].parsed.x,true),label:c=>c.parsed.y+' '+CFG.unit+(isWaypoint[c.dataIndex]&&(c.dataIndex>0||!first)?' — waypoint':'')}}},scales:{y:{beginAtZero:false,grid:{color:theme.grid},ticks:{color:theme.tick,callback:v=>(Math.round(v*10)/10)+CFG.unit,font:{size:11}}},x:timeAxis(win.from===null?pts.map(p=>p.day):[win.from,win.to],theme.tick)}}});
}
function prCard(k){const pr=ST.prs[k];const ex=EXPOOL[k];const isBW=ex&&ex.note==='bodyweight';const sub='×'+(ex&&ex.holdSecs?fmt(pr.r)+' held':pr.r+' reps')+(pr.w>0&&!(ex&&ex.holdSecs)?' · ~'+e1rm(pr.w,pr.r)+CFG.unit+' 1RM':'');return'<div class="card" onclick="showPRHistory('+jsArg(k)+')" style="cursor:pointer;display:flex;justify-content:space-between;align-items:center;gap:10px;padding:14px 16px;margin-bottom:8px;border-radius:16px"><div style="min-width:0"><div style="font-family:var(--font-display);font-size:15px;font-weight:800;text-transform:uppercase;letter-spacing:-.01em;color:var(--txt)">'+esc(k)+'</div><div style="font-size:11px;color:var(--txt2);margin-top:4px">'+esc(pr.date)+'</div></div><div style="display:flex;align-items:center;gap:11px;flex-shrink:0"><div style="text-align:right"><div style="font-family:var(--font-display);font-size:20px;font-weight:900;letter-spacing:-.02em;color:var(--accent)">'+(isBW?bwWeightLabel(pr.w):pr.w+CFG.unit)+'</div><div style="font-size:11px;color:var(--txt2);font-family:var(--font-mono)">'+sub+'</div></div><i class="ti ti-flag" style="color:var(--accent);font-size:19px" aria-hidden="true"></i></div></div>';}
function togglePRGroup(mg){ST.prOpenMG[mg]=!ST.prOpenMG[mg];renderPRs();}
function renderPRs(){const el=gid('pr-list'),keys=Object.keys(ST.prs);if(!keys.length){el.innerHTML='<div style="text-align:center;padding:2.5rem 1rem;font-size:13px;color:var(--txt2)">No PRs yet!</div>';return;}const grp={};keys.sort().forEach(k=>{const ex=EXPOOL[k];const mg=(ex&&ex.mg)||'other';(grp[mg]=grp[mg]||[]).push(k);});const order=MG_LIST.filter(mg=>grp[mg]).concat(Object.keys(grp).filter(mg=>MG_LIST.indexOf(mg)<0).sort());el.innerHTML=order.map(mg=>{const list=grp[mg],open=!!ST.prOpenMG[mg];const top=list.reduce((a,b)=>{const x=ST.prs[a],y=ST.prs[b];return(y.w>x.w||(y.w===x.w&&y.r>x.r))?b:a;});const tex=EXPOOL[top],tw=(tex&&tex.note==='bodyweight')?bwWeightLabel(ST.prs[top].w):ST.prs[top].w+CFG.unit;return'<div class="pr-grp'+(open?' on':'')+'" onclick="togglePRGroup('+jsArg(mg)+')" role="button" tabindex="0" aria-expanded="'+open+'">'+'<div style="min-width:0;flex:1"><div class="pr-grp-t">'+esc(humanizeMG(mg))+'</div>'+'<div class="pr-grp-s">'+t('pr_group_top')+' '+esc(top)+' · '+tw+'</div></div>'+'<span class="pr-grp-n">'+list.length+'</span>'+'<i class="ti ti-chevron-'+(open?'up':'down')+'" aria-hidden="true" style="color:var(--txt2);font-size:17px;flex-shrink:0"></i></div>'+(open?'<div class="pr-grp-body">'+list.map(prCard).join('')+'</div>':'');}).join('');}
function prHistoryFor(name){
  const meta=EXPOOL[name];const events=[];let best=null;
  ST.history.forEach(h=>{
    const ex=(h.exercises||[]).find(e=>e.name===name);if(!ex)return;
    if(meta&&meta.noPR)return;
    const allowZero=!!(meta&&meta.holdSecs);
    (ex.sets||[]).filter(s=>s.done&&s.t!=='w'&&(s.w!==0||allowZero)).forEach(s=>{
      if(!best||s.w>best.w||(s.w===best.w&&s.r>best.r)){best={w:s.w,r:s.r};events.push({date:h.date,w:s.w,r:s.r});}
    });
  });
  return events;
}
function showPRHistory(name){
  const meta=EXPOOL[name];const isBW=!!(meta&&meta.note==='bodyweight');const isHold=!!(meta&&meta.holdSecs);
  const events=prHistoryFor(name);
  gid('exinfo-name').textContent=name+' \u2014 PR history';
  gid('exinfo-list').innerHTML=events.length?events.slice().reverse().map(e=>'<li style="font-size:15px;color:var(--txt);line-height:1.6;margin-bottom:2px">'+esc(e.date)+' \u2014 '+(isBW?bwWeightLabel(e.w):isHold?fmt(e.r)+' held':e.w+CFG.unit+' \u00d7 '+e.r)+'</li>').join(''):'<li style="font-size:13px;color:var(--txt2)">No PR history yet.</li>';
  gid('exinfo-overlay').style.display='block';gid('exinfo-sheet').style.display='block';document.body.style.overflow='hidden';
}
function openDataSettings(){initExport();renderBackupStatus();ss('setdata');}
function initExport(){const ms=gid('ex-mo'),ys=gid('ex-yr');if(ms.options.length)return;MN.forEach((m,i)=>{const o=document.createElement('option');o.value=String(i+1).padStart(2,'0');o.textContent=m;ms.appendChild(o);});const now=new Date();ms.value=String(now.getMonth()+1).padStart(2,'0');for(let y=now.getFullYear();y>=now.getFullYear()-3;y--){const o=document.createElement('option');o.value=y;o.textContent=y;ys.appendChild(o);}}
function hRGB(h){return[parseInt(h.slice(1,3),16),parseInt(h.slice(3,5),16),parseInt(h.slice(5,7),16)];}
async function genPDF(){
  const month=gid('ex-mo').value,year=gid('ex-yr').value,mk=year+'-'+month;
  const sessions=ST.history.filter(h=>h.mk===mk),st=gid('ex-st');
  if(!sessions.length){st.textContent='No sessions for '+MN[parseInt(month)-1]+' '+year+'.';return;}
  st.textContent='Generating...';
  const{jsPDF}=window.jspdf;const doc=new jsPDF({orientation:'portrait',unit:'mm',format:'a4'});
  const W=210,pd=16,cW=W-pd*2;let y=pd;const mName=MN[parseInt(month)-1];
  const acRGB=[47,107,79];
  doc.setFillColor(acRGB[0],acRGB[1],acRGB[2]);doc.rect(0,0,W,30,'F');
  doc.setTextColor(255,255,255);doc.setFontSize(20);doc.setFont('helvetica','bold');doc.text('GainPath - Workout Report',pd,14);
  doc.setFontSize(11);doc.setFont('helvetica','normal');doc.text(mName+' '+year+'  '+CFG.name,pd,23);
  doc.setTextColor(205,225,215);doc.setFontSize(9);doc.text('Generated '+new Date().toLocaleDateString(),W-pd,23,{align:'right'});y=40;
  const totalSets=sessions.reduce((a,h)=>a+h.sets,0);
  const prTM=Object.entries(ST.prs).filter(([,v])=>{if(!v.date)return false;try{const d=new Date(v.date);return d.getFullYear()==year&&String(d.getMonth()+1).padStart(2,'0')===month;}catch(e){return false;}});
  const stats=[{l:'Sessions',v:sessions.length,c:acRGB},{l:'Total sets',v:totalSets,c:[47,107,79]},{l:'New PRs',v:prTM.length,c:[148,111,23]},{l:'Wk streak',v:streak(),c:[148,111,23]}];
  const bW=(cW-9)/4;stats.forEach((s,i)=>{const bx=pd+i*(bW+3);doc.setFillColor(s.c[0],s.c[1],s.c[2]);doc.roundedRect(bx,y,bW,22,3,3,'F');doc.setTextColor(255,255,255);doc.setFontSize(20);doc.setFont('helvetica','bold');doc.text(String(s.v),bx+bW/2,y+13,{align:'center'});doc.setFontSize(8);doc.setFont('helvetica','normal');doc.text(s.l,bx+bW/2,y+19,{align:'center'});});y+=30;
  doc.setTextColor(30,30,50);doc.setFontSize(11);doc.setFont('helvetica','bold');doc.text('Training calendar',pd,y);y+=5;
  const dow=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'],cW7=cW/7,cH=10;
  dow.forEach((d,i)=>{doc.setFillColor(220,228,245);doc.rect(pd+i*cW7,y,cW7,5,'F');doc.setTextColor(60,80,140);doc.setFontSize(7);doc.setFont('helvetica','bold');doc.text(d,pd+i*cW7+cW7/2,y+3.8,{align:'center'});});y+=5;
  const fd=new Date(parseInt(year),parseInt(month)-1,1),dim=new Date(parseInt(year),parseInt(month),0).getDate();
  const sbd={};sessions.forEach(h=>{sbd[h.dk]=(sbd[h.dk]||[]).concat(h);});
  let col=fd.getDay(),row=0;
  for(let d=1;d<=dim;d++){const dk=year+'-'+month+'-'+String(d).padStart(2,'0'),cx=pd+col*cW7,cy=y+row*cH,ds=sbd[dk]||[];
    if(ds.length){const rgb=hRGB(DC[ds[0].day]||'#4A6FA5');doc.setFillColor(rgb[0],rgb[1],rgb[2]);doc.roundedRect(cx+.5,cy+.5,cW7-1,cH-1,2,2,'F');doc.setTextColor(255,255,255);doc.setFontSize(8);doc.setFont('helvetica','bold');doc.text(String(d),cx+cW7/2,cy+4.5,{align:'center'});doc.setFontSize(6);doc.setFont('helvetica','normal');doc.text(getDayName(ds[0].day).slice(0,4),cx+cW7/2,cy+7.8,{align:'center'});}
    else{doc.setFillColor(245,246,250);doc.roundedRect(cx+.5,cy+.5,cW7-1,cH-1,2,2,'F');doc.setTextColor(160,160,175);doc.setFontSize(8);doc.setFont('helvetica','normal');doc.text(String(d),cx+cW7/2,cy+6.5,{align:'center'});}
    col++;if(col===7){col=0;row++;}
  }y+=(row+1)*cH+10;
  const dt={};sessions.forEach(h=>{dt[h.day]=(dt[h.day]||0)+1;});const dte=Object.entries(dt);
  if(dte.length){doc.setTextColor(30,30,50);doc.setFontSize(11);doc.setFont('helvetica','bold');doc.text('Sessions by type',pd,y);y+=6;const maxV=Math.max(...dte.map(([,v])=>v)),bmH=36,bW2=20,bG=8,totalW=dte.length*(bW2+bG)-bG;let bx=pd+(cW-totalW)/2;dte.forEach(([k,cnt])=>{const bh=Math.max(4,(cnt/maxV)*bmH),rgb=hRGB(DC[k]||'#4A6FA5');doc.setFillColor(rgb[0],rgb[1],rgb[2]);doc.roundedRect(bx,y+bmH-bh,bW2,bh,2,2,'F');doc.setTextColor(rgb[0],rgb[1],rgb[2]);doc.setFontSize(9);doc.setFont('helvetica','bold');doc.text(String(cnt),bx+bW2/2,y+bmH-bh-2,{align:'center'});doc.setTextColor(80,90,110);doc.setFontSize(7);doc.setFont('helvetica','normal');doc.text(getDayName(k).slice(0,5),bx+bW2/2,y+bmH+5,{align:'center'});bx+=bW2+bG;});y+=bmH+14;}
  const gains=[];allExNames().forEach(name=>{const ms2=sessions.filter(h=>(h.exercises||[]).find(e=>e.name===name&&(e.sets||[]).some(s=>s.done&&s.w>0)));if(ms2.length>=2){const f=(ms2[0].exercises||[]).find(e=>e.name===name),l=(ms2[ms2.length-1].exercises||[]).find(e=>e.name===name);if(f&&l){const fw=Math.max(...f.sets.filter(s=>s.done&&s.w>0).map(s=>s.w)),lw=Math.max(...l.sets.filter(s=>s.done&&s.w>0).map(s=>s.w));if(lw>fw)gains.push({name,from:fw,to:lw,diff:+(lw-fw).toFixed(1)});}}});
  if(gains.length){if(y>220){doc.addPage();y=pd;}doc.setTextColor(30,30,50);doc.setFontSize(11);doc.setFont('helvetica','bold');doc.text('Strength gains this month',pd,y);y+=6;gains.sort((a,b)=>b.diff-a.diff).slice(0,8).forEach(g=>{doc.setFillColor(234,243,222);doc.roundedRect(pd,y,cW,8,2,2,'F');doc.setTextColor(39,80,10);doc.setFontSize(8.5);doc.setFont('helvetica','bold');const lbl=g.name.length>32?g.name.slice(0,30)+'...':g.name;doc.text(lbl,pd+3,y+5.5);doc.setTextColor(15,110,86);doc.text('+'+g.diff+' '+CFG.unit+'  ('+g.from+'->'+g.to+' '+CFG.unit+')',W-pd-3,y+5.5,{align:'right'});y+=10;});y+=4;}
  if(prTM.length){if(y>235){doc.addPage();y=pd;}doc.setTextColor(30,30,50);doc.setFontSize(11);doc.setFont('helvetica','bold');doc.text('New personal records',pd,y);y+=6;prTM.forEach(([name,pr])=>{doc.setFillColor(250,238,218);doc.roundedRect(pd,y,cW,8,2,2,'F');doc.setTextColor(99,56,6);doc.setFontSize(8.5);doc.setFont('helvetica','bold');const lbl=name.length>34?name.slice(0,32)+'...':name;doc.text('* '+lbl,pd+3,y+5.5);doc.setFont('helvetica','normal');const prEx=EXPOOL[name];const prIsBW=prEx&&prEx.note==='bodyweight';doc.text((prIsBW?bwWeightLabel(pr.w):pr.w+CFG.unit)+' x '+(prEx&&prEx.holdSecs?fmt(pr.r)+' held':pr.r+' reps'),W-pd-3,y+5.5,{align:'right'});y+=10;});}
  doc.setDrawColor(220,225,235);doc.setLineWidth(0.3);doc.line(pd,285,W-pd,285);doc.setFontSize(8);doc.setTextColor(160,165,180);doc.setFont('helvetica','normal');doc.text('GainPath Workout Tracker - '+mName+' '+year,W/2,289,{align:'center'});
  doc.save('gainpath-'+mName.toLowerCase()+'-'+year+'.pdf');st.textContent='Report saved!';setTimeout(()=>{st.textContent='';},5000);
  track('pdf_generated');
}
