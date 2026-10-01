// GainPath: boot constants, analytics and the What's New sheet
// A plain script (not a module) sharing one global scope with the other
// js/ files; index.html sets the load order. Map: docs/index-section-map.md
const EMAILJS_SERVICE_ID='gainpath_service';
const EMAILJS_TEMPLATE_ID='template_hyxqdds';
const EMAILJS_PUBLIC_KEY='jtnxpkG1PAlGnF4LL';

// Guarded: this is the first statement in the app's only script block, so an
// unreachable CDN here used to throw before a single function ran — the whole
// app died on a blank onboarding screen over an optional feedback form. The
// send path is already inside a try/catch, so it just reports failure instead.
if(window.emailjs)emailjs.init(EMAILJS_PUBLIC_KEY);

// Privacy-first, aggregate-only usage analytics — see analytics-worker/README.md.
// gp_anon_id is a random client-generated ID, never tied to a real identity.
// Replace with the deployed Worker URL; track() is a no-op until it's set.
const APP_VERSION='2.9.1';
const ANALYTICS_ENDPOINT='https://gainpath-analytics.jedmangubat.workers.dev';
function getAnonId(){
  let id=localStorage.getItem('gp_anon_id');
  if(!id){id=(crypto.randomUUID?crypto.randomUUID():'xxxxxxxxxxxxxxxx'.replace(/x/g,()=>Math.floor(Math.random()*16).toString(16)));localStorage.setItem('gp_anon_id',id);}
  return id;
}
function track(event){
  if(!ANALYTICS_ENDPOINT||ANALYTICS_ENDPOINT.includes('YOUR-SUBDOMAIN'))return;
  try{
    const payload=JSON.stringify({id:getAnonId(),event});
    if(navigator.sendBeacon)navigator.sendBeacon(ANALYTICS_ENDPOINT+'/e',payload);
    else fetch(ANALYTICS_ENDPOINT+'/e',{method:'POST',body:payload,keepalive:true}).catch(()=>{});
  }catch(e){}
}

// ═══ WHAT'S NEW — a one-time sheet shown to returning users (CFG.setup
// already true) who haven't yet seen WHATS_NEW_VERSION's news. Not shown to
// first-time users (they see it all via onboarding + the tutorial) or while a
// workout is being restored.
//
// WHATS_NEW_VERSION is the version WHATS_NEW_ITEMS actually describes — NOT
// necessarily APP_VERSION. Bump it (and rewrite WHATS_NEW_ITEMS + its i18n
// strings, mirroring the README's "What's new" section — see CLAUDE.md) only
// on a release that ships user-facing news. A bug-fix-only release leaves it
// alone, so upgraders correctly see no sheet at all instead of last version's
// announcement re-headed with the new number. ═══
const WHATS_NEW_VERSION='2.9.0';
const WHATS_NEW_ITEMS=['whatsnew_item1','whatsnew_item2','whatsnew_item3','whatsnew_item4','whatsnew_item5'];
// -1 / 0 / 1 — segment-wise numeric compare, tolerant of the legacy '0' default.
function cmpVer(a,b){
  const x=String(a||'0').split('.').map(Number),y=String(b||'0').split('.').map(Number);
  for(let i=0;i<Math.max(x.length,y.length);i++){
    const d=(x[i]||0)-(y[i]||0);if(d)return d<0?-1:1;
  }
  return 0;
}
function showWhatsNew(){
  gid('whatsnew-version').textContent=t('whatsnew_heading')+' v'+WHATS_NEW_VERSION;
  gid('whatsnew-list').innerHTML=WHATS_NEW_ITEMS.map(k=>'<li>'+t(k)+'</li>').join('');
  gid('whatsnew-overlay').style.display='block';gid('whatsnew-sheet').style.display='block';
  document.body.style.overflow='hidden';
}
function closeWhatsNew(){
  CFG.lastSeenVersion=APP_VERSION;saveCFG();
  gid('whatsnew-overlay').style.display='none';gid('whatsnew-sheet').style.display='none';
  document.body.style.overflow='';
}
