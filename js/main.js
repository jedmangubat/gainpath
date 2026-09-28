// GainPath: the startup sequence
// A plain script (not a module) sharing one global scope with the other
// js/ files; index.html sets the load order. Map: docs/index-section-map.md
load();requestPersist();idbInit();applyTheme();applyLang();OB.step=1;obDots();
if(CFG.setup){
  accentColor();
  if(!restoreInProgress()){
    refreshHome();ss('home');
    if(cmpVer(CFG.lastSeenVersion,WHATS_NEW_VERSION)<0)showWhatsNew();
  }
}else{ss('ob');}

if('serviceWorker' in navigator){window.addEventListener('load',()=>{navigator.serviceWorker.register('sw.js').catch(()=>{});});}
