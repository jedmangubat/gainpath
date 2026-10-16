// GainPath: date/DOM helpers, screen navigation, audio and rest timers
// A plain script (not a module) sharing one global scope with the other
// js/ files; index.html sets the load order. Map: docs/index-section-map.md
function dkey(d){return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');}
function mkey(d){return dkey(d).slice(0,7);}
// ═══ Chart time axis — charts plot time PROPORTIONALLY, not one slot per
// entry: a 6-week gap between sessions renders six times wider than a 1-week
// gap. x is a whole-day index since the epoch (day numbers, not ms, so
// Chart.js's linear ticks land on whole-day boundaries), and Date.UTC keeps
// the arithmetic free of DST drift — the dk is already a local-date key, so
// it's only ever used as a calendar date here, never as an instant.
// Any new chart over dated data should use these rather than passing date
// strings as Chart.js `labels` (that's the category scale, which spaces
// points evenly by index and is what this replaced). ═══
function dkDay(dk){const p=String(dk||'').split('-');return Date.UTC(+p[0],+p[1]-1,+p[2])/864e5;}
// Display dates follow the app language; STORED dates (dk, mk, record.date, PR and
// weigh-in dates, CSV) stay as they are, because migrateDkTz() and old backups
// read the English text. fmtDk()/showDate() are for what the person sees.
function locTag(){return CFG.lang==='ja'?'ja-JP':CFG.lang==='ko'?'ko-KR':'en-PH';}
function fmtDk(dk,opts){return new Date(dk+'T00:00:00').toLocaleDateString(locTag(),opts||{month:'short',day:'numeric',year:'numeric'});}
function showDate(dk,date){
  const k=dk||(date&&!isNaN(new Date(date))?dkey(new Date(date)):null);
  return k?fmtDk(k):(date||'');
}
function weekdayNames(){return [0,1,2,3,4,5,6].map(i=>new Date(Date.UTC(2024,0,1+i)).toLocaleDateString(locTag(),{weekday:'short',timeZone:'UTC'}).slice(0,2));}
function dayLabel(n,full){return new Date(n*864e5).toLocaleDateString(locTag(),full?{month:'short',day:'numeric',year:'numeric',timeZone:'UTC'}:{month:'short',day:'numeric',timeZone:'UTC'});}
// Shared x-scale config — ~6 evenly spaced date ticks across the data's span.
function timeAxis(days,tick){
  let min=days[0],max=days[days.length-1];
  if(max===min){min-=1;max+=1;}
  const step=Math.max(1,Math.ceil((max-min)/5));
  return{type:'linear',offset:true,min,max,grid:{display:false},ticks:{color:tick,maxRotation:35,font:{size:10},stepSize:step,autoSkip:false,callback:v=>dayLabel(v)}};
}
function fmt(s){return Math.floor(s/60)+':'+String(s%60).padStart(2,'0');}
// Odometer-style tick for the streak number (Trail motion spec)
function tickNum(el,to){if(!el)return;const from=parseInt(el.textContent,10);if(isNaN(from)||from===to||window.matchMedia('(prefers-reduced-motion: reduce)').matches){el.textContent=to;return;}const t0=performance.now(),dur=600;function step(t){const p=Math.min((t-t0)/dur,1);el.textContent=Math.round(from+(to-from)*p);if(p<1)requestAnimationFrame(step);}requestAnimationFrame(step);}
function esc(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
// For string args inside inline handlers, e.g. onclick="fn('+jsArg(v)+')":
// JS-escape backslash/quote, then HTML-escape so quotes can't end the attribute.
function jsArg(s){return esc("'"+String(s).replace(/\\/g,'\\\\').replace(/'/g,"\\'")+"'");}
function gid(id){return document.getElementById(id);}
// ═══ On-demand libraries ═══
// Chart.js, jsPDF and EmailJS are not needed to start, so they are not loaded at
// startup: loadLib(name) injects the script from vendor/ the first time a chart,
// the PDF report or the feedback form needs it, and returns a promise. Call sites
// guard with typeof Chart / window.jspdf, so a slow or failed load never blocks the app.
const LIBS={chart:'vendor/chart-4.4.1.min.js',jspdf:'vendor/jspdf-2.5.1.min.js',emailjs:'vendor/emailjs-browser-4.4.1.min.js'};
const LIB_LOADED={};
function loadLib(name){
  if(LIB_LOADED[name])return LIB_LOADED[name];
  return LIB_LOADED[name]=new Promise((res,rej)=>{
    const s=document.createElement('script');s.src=LIBS[name];
    s.onload=()=>{if(name==='emailjs'&&window.emailjs)window.emailjs.init(EMAILJS_PUBLIC_KEY);res();};
    s.onerror=()=>{delete LIB_LOADED[name];s.remove();rej(new Error('could not load '+name));};
    document.head.appendChild(s);
  });
}
// ═══ MODALS: focus, Escape and the background for sheets ═══
// A sheet's own open function shows it, then calls modalOpen(id,closeFn,opts):
// the page behind it becomes inert, focus moves in (data-autofocus wins), Tab
// stays inside, Escape calls closeFn (escape:false for the recovery sheet,
// which must be answered). Its close function calls modalClose(id), which
// releases the page and returns focus to the control that opened it.
const MODAL_STACK=[];
const FOCUSABLE='a[href],button,input,select,textarea,[tabindex]:not([tabindex="-1"])';
function modalFocusables(el){return Array.prototype.filter.call(el.querySelectorAll(FOCUSABLE),n=>!n.disabled&&n.getClientRects().length>0);}
function modalInert(m){
  let n=m.el;
  while(n&&n.parentElement&&n!==document.body){
    Array.prototype.forEach.call(n.parentElement.children,c=>{
      if(c===n||c.id==='save-alert'||m.keep.indexOf(c.id)>=0||/^(SCRIPT|STYLE|LINK)$/.test(c.tagName)||c.hasAttribute('inert'))return;
      c.setAttribute('inert','');m.inerted.push(c);
    });
    n=n.parentElement;
  }
}
function modalOpen(id,onClose,opts){
  opts=opts||{};const el=gid(id);if(!el)return;
  modalClose(id,true);
  const m={id,el,onClose,escape:opts.escape!==false,keep:opts.keep||[],trigger:opts.trigger||document.activeElement,inerted:[]};
  if(!el.getAttribute('role'))el.setAttribute('role','dialog');
  el.setAttribute('aria-modal','true');
  modalInert(m);MODAL_STACK.push(m);
  const first=el.querySelector('[data-autofocus]')||modalFocusables(el)[0];
  if(!first)el.setAttribute('tabindex','-1');
  (first||el).focus({preventScroll:true});
}
function modalClose(id,quiet){
  const i=MODAL_STACK.findIndex(m=>m.id===id);if(i<0)return;
  const m=MODAL_STACK.splice(i,1)[0];
  m.inerted.forEach(c=>c.removeAttribute('inert'));
  if(!quiet&&m.trigger&&m.trigger.isConnected&&m.trigger.focus)m.trigger.focus({preventScroll:true});
}
document.addEventListener('keydown',e=>{
  const m=MODAL_STACK[MODAL_STACK.length-1];
  if(m){
    if(e.key==='Escape'&&m.escape&&m.onClose){e.preventDefault();m.onClose();return;}
    if(e.key==='Tab'){
      const f=modalFocusables(m.el);if(!f.length){e.preventDefault();return;}
      // Moved by hand so every engine behaves alike (WebKit's own Tab order skips
      // buttons unless Full Keyboard Access is on); DOM order is the tab order here.
      const i=f.indexOf(document.activeElement);
      e.preventDefault();
      (i<0?(e.shiftKey?f[f.length-1]:f[0]):f[(i+(e.shiftKey?f.length-1:1))%f.length]).focus();
    }
  }
  // Clickable cards and group headers marked role="button" answer Enter/Space.
  const t0=e.target;
  if((e.key==='Enter'||e.key===' ')&&t0&&t0.getAttribute&&t0.getAttribute('role')==='button'&&t0.tagName!=='BUTTON'){e.preventDefault();t0.click();}
});
const NO_NAV_SCREENS=new Set(['ob','mw','plate','fsw','exfeel','feel','sum']);
function ss(id){
  document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));gid('s-'+id).classList.add('active');
  const showNav=!NO_NAV_SCREENS.has(id);
  gid('bnav').style.display=showNav?'flex':'none';
  document.querySelector('.app').classList.toggle('has-nav',showNav);
  // wo/rest are the Train tab's own screens (reachable while navigating away
  // mid-workout via bnav('wk'), or pulled back into automatically when a rest
  // timer ends), so the nav highlight must track them the same way stab('wk')
  // would — every other tab is its own home panel and goes through stab().
  if(id==='wo'||id==='rest')['wk','cal','ch','pr'].forEach(x=>gid('bn-'+x).classList.toggle('on',x==='wk'));
  // Showing home IS rendering it — the invariant lives here rather than in each
  // caller. Boot only calls refreshHome() when restoreInProgress() returns
  // false, so a user who relaunched into a restored workout or day-edit had a
  // home screen nothing had ever filled in; bnav()/closeDayEdit()/
  // cancelProgram() then switched to it without rendering, showing an empty
  // Train tab that survived relaunches because gp_wip kept sending boot back
  // down the restore path. refreshHome() never calls ss(), so this can't recurse.
  if(id==='home')refreshHome();
}
let _actx=null;
function ensureAudio(){try{if(!_actx)_actx=new (window.AudioContext||window.webkitAudioContext)();if(_actx.state==='suspended')_actx.resume();}catch(e){}}
// Some browsers only honor AudioContext.resume() inside a direct user
// gesture, not a visibilitychange event — armed while a rest is active so
// the very next tap also resumes audio, in case the visibilitychange
// catch-up beep in the handler below was itself blocked.
function _restAudioKick(){ensureAudio();disarmRestAudioKick();}
function armRestAudioKick(){document.addEventListener('pointerdown',_restAudioKick);document.addEventListener('touchstart',_restAudioKick);}
function disarmRestAudioKick(){document.removeEventListener('pointerdown',_restAudioKick);document.removeEventListener('touchstart',_restAudioKick);}
function beep(freq,dur){if(!CFG.restSound||!_actx)return;try{const osc=_actx.createOscillator();const gain=_actx.createGain();osc.type='sine';osc.frequency.value=freq;gain.gain.setValueAtTime(0.0001,_actx.currentTime);gain.gain.exponentialRampToValueAtTime(0.85,_actx.currentTime+0.01);gain.gain.exponentialRampToValueAtTime(0.0001,_actx.currentTime+dur);osc.connect(gain);gain.connect(_actx.destination);osc.start();osc.stop(_actx.currentTime+dur);}catch(e){}}
function vib(pattern){if(CFG.restSound&&navigator.vibrate){try{navigator.vibrate(pattern);}catch(e){}}}
function startEtInterval(){clearInterval(ST.et);ST.et=setInterval(()=>{ST.es=Math.floor((Date.now()-ST.t0)/1000);const el=gid('wo-el');if(el)el.textContent=fmt(ST.es);},1000);}
function updWoPauseBtn(){const ic=gid('wo-pause-icon');if(ic)ic.className='ti '+(ST.paused?'ti-player-play':'ti-player-pause');const btn=gid('wo-pause-btn');if(btn)btn.setAttribute('aria-label',t(ST.paused?'aria_resume_timer':'aria_pause_timer'));}
function toggleWoPause(){if(ST.paused){ST.t0=Date.now()-ST.es*1000;ST.paused=false;startEtInterval();}else{ST.es=Math.floor((Date.now()-ST.t0)/1000);clearInterval(ST.et);ST.paused=true;}updWoPauseBtn();saveInProgress();}
// Last 5 seconds: a beep + vibration every second; at zero a triple-beep
// alarm with a long vibration pattern, plus a notification if backgrounded.
function startRestCountdown(){clearInterval(ST.rt);ST.rt=setInterval(()=>{ST.rs=Math.max(0,Math.round((ST.restEnd-Date.now())/1000));updT();if(ST.rs>=1&&ST.rs<=5){beep(880,.15);vib(100);}if(ST.rs<=0){clearInterval(ST.rt);finalRestAlert();endRest();}},1000);}
function finalRestAlert(missed){beep(1320,.28);setTimeout(()=>beep(1320,.28),350);setTimeout(()=>beep(1760,.4),700);vib([300,120,300,120,600]);notifyRestDone(missed);}
// Background rest notification (best effort): fires via the service worker
// when the timer ends while the tab/app is hidden. Android PWAs get a real
// notification while still backgrounded; iOS suspends PWA timers entirely, so
// there the alert lands the moment the app is reopened — the visibilitychange
// reconcile below passes missed=true so the notification still fires even
// though document.hidden has already flipped back to false by then.
function notifyRestDone(missed){
  if(!missed&&!document.hidden)return;
  if(!('Notification' in window)||Notification.permission!=='granted')return;
  if(!navigator.serviceWorker)return;
  navigator.serviceWorker.ready.then(reg=>reg.showNotification('Rest over — back to work! 💪',{body:'Your rest timer is done.',tag:'gp-rest',icon:'images/branding/apple-touch-icon.png',badge:'images/branding/favicon-32.png',vibrate:[300,120,300,120,600]})).catch(()=>{});
}
document.addEventListener('visibilitychange',()=>{
  if(!document.hidden&&ST.restEnd&&ST.rt){
    ST.rs=Math.max(0,Math.round((ST.restEnd-Date.now())/1000));updT();
    if(ST.rs<=0){clearInterval(ST.rt);ensureAudio();finalRestAlert(true);endRest();}
  }
});
function endRest(){disarmRestAudioKick();const isLastSet=ST.restInfo&&ST.restInfo.isLastSet;const ssReturn=ST.restInfo?ST.restInfo.ssReturn:null;ST.restEnd=null;ST.restInfo=null;saveInProgress();if(ssReturn!=null){goToExercise(ssReturn);return;}if(isLastSet){if(ST.restRated){ST.restRated=false;nextEx();}else askExFeel();}else{ss('wo');renderEx();}}
function accentColor(){document.documentElement.style.setProperty('--accent','#C6F24E');document.documentElement.style.setProperty('--accent-ink','#0C1512');const tc=document.querySelector('meta[name="theme-color"]');if(tc)tc.content='#0C1512';}

// ═══ Accessible names that static markup can't carry on its own ═══
// A <label> sitting directly before its field is tied to it, and each on/off
// toggle becomes a switch named by its row's title and kept in step with its
// "on" class (the settings code only flips the class).
function linkA11y(){
  document.querySelectorAll('label:not([for])').forEach(l=>{const c=l.nextElementSibling;if(c&&/^(INPUT|SELECT|TEXTAREA)$/.test(c.tagName)&&c.id)l.setAttribute('for',c.id);});
  document.querySelectorAll('.toggle').forEach(b=>{
    const row=b.closest('.toggle-row'),lab=row&&row.querySelector('[data-i18n]');
    if(lab&&b.id){lab.id=lab.id||'tl-'+b.id;b.setAttribute('aria-labelledby',lab.id);}
    b.setAttribute('role','switch');b.setAttribute('aria-checked',String(b.classList.contains('on')));
  });
}
linkA11y();
new MutationObserver(ms=>ms.forEach(m=>{const n=m.target;if(n.classList&&n.classList.contains('toggle'))n.setAttribute('aria-checked',String(n.classList.contains('on')));})).observe(document.body,{subtree:true,attributes:true,attributeFilter:['class']});
