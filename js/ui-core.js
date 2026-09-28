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
function dayLabel(n,full){return new Date(n*864e5).toLocaleDateString('en-PH',full?{month:'short',day:'numeric',year:'numeric',timeZone:'UTC'}:{month:'short',day:'numeric',timeZone:'UTC'});}
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
function updWoPauseBtn(){const ic=gid('wo-pause-icon');if(ic)ic.className='ti '+(ST.paused?'ti-player-play':'ti-player-pause');const btn=gid('wo-pause-btn');if(btn)btn.setAttribute('aria-label',ST.paused?'Resume workout timer':'Pause workout timer');}
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
