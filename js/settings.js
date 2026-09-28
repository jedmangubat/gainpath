// GainPath: Settings and the custom program builder
// A plain script (not a module) sharing one global scope with the other
// js/ files; index.html sets the load order. Map: docs/index-section-map.md
function openSettings(){
  gid('set-fname').value=CFG.firstName;gid('set-lname').value=CFG.lastName;gid('set-bw').value=curBW();gid('set-ht').value=CFG.ht;gid('set-bf').value=CFG.bf||'';
  gid('set-unit-lbl').textContent=CFG.unit;
  ['kg','lbs'].forEach(v=>gid('sunit-'+v).classList.toggle('on',CFG.unit===v));
  REPS_CUSTOM_OPEN.sreps=false;renderRepOpts('sreps');
  [60,90,120].forEach(v=>gid('srest-'+v).classList.toggle('on',CFG.prefRest===v));
  [2,3,4].forEach(v=>gid('ssets-'+v).classList.toggle('on',CFG.prefSets===v));
  ['straight','pyramid'].forEach(v=>gid('sstyle-'+v).classList.toggle('on',CFG.setStyle===v));
  gid('sstyle-desc').textContent=CFG.setStyle==='pyramid'?'Reps step down each set as weight goes up (e.g. 12, 10, 8) — change the first set\'s weight and the rest are calculated for you.':'Same weight and reps across every work set — change the first set\'s weight and the rest follow.';
  gid('stog-wu').classList.toggle('on',CFG.warmup);
  [1,2,3].forEach(v=>gid('swu-'+v).classList.toggle('on',CFG.wuSteps===v));
  gid('wu-steps-wrap').style.display=CFG.warmup?'block':'none';
  gid('stog-rs').classList.toggle('on',CFG.restSound);
  gid('stog-wl').classList.toggle('on',CFG.wakeLock);
  gid('stog-hs').classList.toggle('on',CFG.healthSync);
  gid('hs-fields').style.display=CFG.healthSync?'block':'none';
  gid('set-hs-start').value=CFG.healthSyncStartShortcut;
  gid('set-hs-end').value=CFG.healthSyncEndShortcut;
  gid('set-notify-email').value=CFG.leadEmail||'';
  gid('notify-form').style.display=CFG.leadSubmitted?'none':'block';
  gid('notify-done').style.display=CFG.leadSubmitted?'block':'none';
  gid('notify-status').textContent='';
  gid('about-version').textContent='v'+APP_VERSION;
  renderSplitOpts('set-split-opts',CFG.split,(id)=>{CFG.split=id;});
  const spbtn=gid('set-prog-btn');
  spbtn.innerHTML=CFG.customProgram?'<i class="ti ti-pencil" aria-hidden="true"></i> Edit "'+esc(CFG.customProgram.name)+'"':'<i class="ti ti-layout-grid-add" aria-hidden="true"></i> Build a custom program';
  renderMWSettings();
  renderGymSettings();
  renderRestSettings();
  ss('settings');
}
function dbId(w){return String(w).replace('.','_');}
function renderGymSettings(){
  ['set-gym-unit1','set-gym-unit2'].forEach(id=>{const el=gid(id);if(el)el.textContent=CFG.unit;});
  const denoms=PLATES[CFG.unit]||PLATES.kg;
  gid('set-plate-inv').innerHTML=denoms.map(d=>'<button type="button" class="chip-tog'+(CFG.gymPlates[d]?' on':'')+'" id="set-plate-'+d+'" onclick="toggleSettingPlate('+d+')">'+d+CFG.unit+'</button>').join('');
  const dbList=DUMBBELLS[CFG.unit]||DUMBBELLS.kg;
  const owned=new Set(CFG.gymDumbbells||[]);
  gid('set-db-inv').innerHTML=dbList.map(w=>'<button type="button" class="chip-tog'+(owned.has(w)?' on':'')+'" id="set-db-'+dbId(w)+'" onclick="toggleSettingDB('+w+')">'+w+'</button>').join('');
}
// My-gym chips write straight to CFG.gymPlates/gymDumbbells and save
// immediately, same reasoning as the setSetting* handlers above — these are
// exactly what roundToGymWeight() reads to decide what a workout can propose,
// so of everything in Settings this is the one most directly "doesn't apply
// to the workouts" if lost to backgrounding before the back-arrow is tapped.
function toggleSettingPlate(d){
  const on=gid('set-plate-'+d).classList.toggle('on');
  if(on)CFG.gymPlates[d]=1;else delete CFG.gymPlates[d];
  saveCFG();
}
function toggleSettingDB(w){
  const on=gid('set-db-'+dbId(w)).classList.toggle('on');
  const owned=new Set(CFG.gymDumbbells||[]);
  if(on)owned.add(w);else owned.delete(w);
  CFG.gymDumbbells=(DUMBBELLS[CFG.unit]||DUMBBELLS.kg).filter(x=>owned.has(x));
  saveCFG();
}
function renderMWSettings(){
  const el=gid('set-mw-list');if(!el)return;
  const keys=Object.keys(ST.mw).sort();
  if(!keys.length){el.innerHTML='<div style="font-size:13px;color:var(--txt2);text-align:center;padding:8px 0">No machines recorded yet — you\'ll be asked the first time you use one</div>';return;}
  el.innerHTML=keys.map(name=>'<div style="display:flex;align-items:center;gap:8px;margin-bottom:8px"><div style="flex:1;font-size:13px;color:var(--txt)">'+esc(name)+'</div><input class="inp" style="margin:0;width:70px" type="number" min="0" step="0.5" value="'+ST.mw[name]+'" onfocus="this.select()" onchange="updMWSetting('+jsArg(name)+',this.value)"><span style="font-size:13px;color:var(--txt2)">'+CFG.unit+'</span><button class="bg" onclick="removeMWSetting('+jsArg(name)+')" aria-label="Forget machine base weight"><i class="ti ti-trash" aria-hidden="true"></i></button></div>').join('');
}
function updMWSetting(name,val){ST.mw[name]=Math.max(0,parseFloat(val)||0);saveData();}
function removeMWSetting(name){delete ST.mw[name];saveData();renderMWSettings();}
// Every setSetting* handler below saves immediately (not just on the settings
// screen's back-arrow via collectSettingsFields) because a Settings change is
// otherwise only in-memory until that explicit tap: an iOS PWA backgrounded
// or killed before the user taps back (swipe home, phone call, app switch —
// all normal mid-edit) silently reverts the change on relaunch. Same failure
// mode as the workout-state loss fixed in v2.4.1, just never applied here.
// renderGymSettings() must re-run here: its plate/dumbbell chip ids are keyed
// by the unit's own denominations (kg vs lbs sets are different numbers, not
// just re-labeled), so switching units without it left "My gym" showing the
// old unit's chips — found by scripts/simulate.mjs toggling unit and My-gym
// in the same run, which crashed on a plate id that no longer existed.
function setSettingUnit(v){convertUnits(CFG.unit,v);gid('set-bw').value=curBW();['kg','lbs'].forEach(x=>gid('sunit-'+x).classList.toggle('on',x===v));gid('set-unit-lbl').textContent=v;renderGymSettings();saveCFG();}
function setSettingReps(v){setRepsPreset('sreps',v);CFG.prefRepsChangedAt=dkey(new Date());saveCFG();}
function setSettingRest(v){CFG.prefRest=v;[60,90,120].forEach(x=>gid('srest-'+x).classList.toggle('on',x===v));saveCFG();}
function setSettingSets(v){CFG.prefSets=v;[2,3,4].forEach(x=>gid('ssets-'+x).classList.toggle('on',x===v));saveCFG();}
function setSettingSetStyle(v){CFG.setStyle=v;['straight','pyramid'].forEach(x=>gid('sstyle-'+x).classList.toggle('on',x===v));gid('sstyle-desc').textContent=v==='pyramid'?'Reps step down each set as weight goes up (e.g. 12, 10, 8) — change the first set\'s weight and the rest are calculated for you.':'Same weight and reps across every work set — change the first set\'s weight and the rest follow.';saveCFG();}
function setSettingWU(){CFG.warmup=!CFG.warmup;gid('stog-wu').classList.toggle('on',CFG.warmup);gid('wu-steps-wrap').style.display=CFG.warmup?'block':'none';saveCFG();}
function setSettingWUSteps(v){CFG.wuSteps=v;[1,2,3].forEach(x=>gid('swu-'+x).classList.toggle('on',x===v));saveCFG();}
function setSettingRestSound(){CFG.restSound=!CFG.restSound;gid('stog-rs').classList.toggle('on',CFG.restSound);saveCFG();}
function applyTheme(){document.documentElement.dataset.theme='dark';accentColor();}
function setSettingDarkMode(){/* dark-only: toggle removed */}
function setSettingWakeLock(){CFG.wakeLock=!CFG.wakeLock;gid('stog-wl').classList.toggle('on',CFG.wakeLock);if(!CFG.wakeLock)releaseWakeLock();saveCFG();}
function setSettingHealthSync(){CFG.healthSync=!CFG.healthSync;gid('stog-hs').classList.toggle('on',CFG.healthSync);gid('hs-fields').style.display=CFG.healthSync?'block':'none';saveCFG();}
function toggleHSSteps(){const s=gid('hs-steps');if(s)s.style.display=s.style.display==='none'?'block':'none';}
function isValidLeadEmail(v){return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);}
async function submitLeadEmail(){
  const email=(gid('set-notify-email').value||'').trim();
  const status=gid('notify-status');
  if(!isValidLeadEmail(email)){status.textContent='Enter a valid email address.';status.style.color='#C05A3E';return;}
  if(!ANALYTICS_ENDPOINT||ANALYTICS_ENDPOINT.includes('YOUR-SUBDOMAIN')){status.textContent='Not available yet — try again later.';status.style.color='var(--txt2)';return;}
  const btn=gid('notify-send-btn');btn.disabled=true;status.textContent='Sending…';status.style.color='var(--txt2)';
  try{
    const res=await fetch(ANALYTICS_ENDPOINT+'/lead',{method:'POST',headers:{'Content-Type':'text/plain'},body:JSON.stringify({email})});
    if(!res.ok)throw new Error('failed');
    CFG.leadEmail=email;CFG.leadSubmitted=true;saveCFG();
    gid('notify-form').style.display='none';gid('notify-done').style.display='block';
  }catch(e){
    status.textContent='Something went wrong — check your connection and try again.';status.style.color='#C05A3E';
  }finally{
    btn.disabled=false;
  }
}
function undoLeadEmail(){CFG.leadSubmitted=false;saveCFG();gid('notify-form').style.display='block';gid('notify-done').style.display='none';gid('notify-status').textContent='';}
// Every settings field lives in the DOM regardless of which sub-screen is
// active, so one pass reading them all is enough — called whenever any
// settings sub-screen's back button is tapped (autosave-on-exit, no
// separate global "Save" button).
function collectSettingsFields(){
  CFG.firstName=gid('set-fname').value.trim()||CFG.firstName;CFG.lastName=gid('set-lname').value.trim();updateFullName();const nbw=parseFloat(gid('set-bw').value);if(nbw>0&&nbw!==curBW())setWeighIn(dkey(new Date()),nbw);CFG.ht=parseFloat(gid('set-ht').value)||CFG.ht;CFG.bf=parseFloat(gid('set-bf').value)||null;
  const denoms=PLATES[CFG.unit]||PLATES.kg;const gymPlates={};
  denoms.forEach(d=>{if(gid('set-plate-'+d).classList.contains('on'))gymPlates[d]=1;});
  CFG.gymPlates=gymPlates;
  const dbList=DUMBBELLS[CFG.unit]||DUMBBELLS.kg;
  CFG.gymDumbbells=dbList.filter(w=>gid('set-db-'+dbId(w)).classList.contains('on'));
  CFG.healthSyncStartShortcut=gid('set-hs-start').value.trim()||CFG.healthSyncStartShortcut;
  CFG.healthSyncEndShortcut=gid('set-hs-end').value.trim()||CFG.healthSyncEndShortcut;
  saveCFG();
}
// Shows the ID without creating one: nothing has been sent if there's none yet.
function openPrivacySettings(){let id=null;try{id=localStorage.getItem('gp_anon_id');}catch(e){}gid('privacy-anon-id').textContent=id||'—';ss('setprivacy');}
function closeSettingsSection(){collectSettingsFields();accentColor();refreshHome();ss('settings');}
// Erase must clear the IndexedDB mirror too, or idbRecover() would bring the data back.
function resetApp(){if(!confirm('This will erase ALL your data. Are you sure?'))return;localStorage.clear();Promise.all([idbClear(),photoClear()]).then(()=>location.reload());}

// ═══ CUSTOM PROGRAM BUILDER ═══
const PROG_COLORS=['#29506D','#2F6B4F','#946F17','#6B4A87','#8C3A5E','#A24A2E'];
const PROG_ICONS=['ti-barbell','ti-run','ti-flame','ti-bolt','ti-heart','ti-star'];
function syncProgramMeta(){if(!CFG.customProgram)return;CFG.customProgram.days.forEach((d,i)=>{DC[d.id]=d.color||PROG_COLORS[i%PROG_COLORS.length];DI[d.id]=d.icon||PROG_ICONS[i%PROG_ICONS.length];});}
function newCustomDayId(){let max=0;const scan=arr=>{if(arr)arr.forEach(d=>{const m=/^cd_(\d+)$/.exec(d.id);if(m)max=Math.max(max,+m[1]);});};scan(CFG.customProgram&&CFG.customProgram.days);scan(ST.progDraft&&ST.progDraft.days);return'cd_'+(max+1);}
function openProgramBuilder(){
  ST.progDraft=CFG.customProgram?JSON.parse(JSON.stringify(CFG.customProgram)):{name:'My program',days:[]};
  renderProgramBuilder();ss('prog');
}
function renderProgramBuilder(){
  const d=ST.progDraft;if(!d)return;
  gid('prog-name').value=d.name;
  const list=gid('prog-days');
  if(!d.days.length)list.innerHTML='<div style="font-size:13px;color:var(--txt2);text-align:center;padding:16px 0">No days yet — add your first training day below.</div>';
  else list.innerHTML=d.days.map((day,i)=>{
    const cnt=(CFG.customDays[day.id]||[]).length;
    return '<div class="de-row" style="margin-bottom:8px">'+
      '<div style="display:flex;flex-direction:column;gap:3px">'+
        '<button class="bg" style="padding:4px 4px"'+(i===0?' disabled style="opacity:.3;padding:4px 4px"':'')+' onclick="moveProgDay('+i+',-1)" aria-label="Move up"><i class="ti ti-chevron-up" aria-hidden="true"></i></button>'+
        '<button class="bg" style="padding:4px 4px"'+(i===d.days.length-1?' disabled style="opacity:.3;padding:4px 4px"':'')+' onclick="moveProgDay('+i+',1)" aria-label="Move down"><i class="ti ti-chevron-down" aria-hidden="true"></i></button>'+
      '</div>'+
      '<div style="flex:1;min-width:0"><input class="inp" style="margin:0 0 4px 0" value="'+esc(day.name)+'" onchange="renameProgDay('+i+',this.value)"><div style="font-size:11px;color:var(--txt2)">'+cnt+' exercise'+(cnt===1?'':'s')+'</div></div>'+
      '<button class="bg" onclick="openProgDayEdit('+i+')" aria-label="Edit exercises"><i class="ti ti-list-details" aria-hidden="true"></i></button>'+
      '<button class="bg" onclick="deleteProgDay('+i+')" aria-label="Delete day"><i class="ti ti-trash" aria-hidden="true"></i></button>'+
    '</div>';
  }).join('');
  gid('prog-delete-btn').style.display=CFG.customProgram?'flex':'none';
}
function addProgDay(){const d=ST.progDraft;const i=d.days.length;d.days.push({id:newCustomDayId(),name:'Day '+String.fromCharCode(65+(i%26)),color:PROG_COLORS[i%PROG_COLORS.length],icon:PROG_ICONS[i%PROG_ICONS.length]});renderProgramBuilder();}
function renameProgDay(i,v){const n=v.trim();if(n)ST.progDraft.days[i].name=n;}
function moveProgDay(i,dir){const a=ST.progDraft.days,j=i+dir;if(j<0||j>=a.length)return;const t=a[i];a[i]=a[j];a[j]=t;renderProgramBuilder();}
function deleteProgDay(i){const day=ST.progDraft.days[i];if((CFG.customDays[day.id]||[]).length&&!confirm('Delete "'+day.name+'" and its exercises?'))return;delete CFG.customDays[day.id];delete CFG.dayLinks[day.id];ST.progDraft.days.splice(i,1);saveCFG();renderProgramBuilder();}
function openProgDayEdit(i){
  ST.progDraft.name=gid('prog-name').value.trim()||ST.progDraft.name;
  const day=ST.progDraft.days[i];
  ST.editDay=day.id;ST.editMid=false;ST.editProg=true;
  ST.editList=getEffectiveDayExercises(day.id).slice();
  DE_EXPANDED=null;gid('de-tit').textContent=day.name;
  gid('de-reset-btn').style.display='none';
  gid('de-commit-btn').innerHTML='Save day <i class="ti ti-check" aria-hidden="true"></i>';
  applyDeEditModeUI();
  ss('dayedit');renderDayEdit();
}
function saveProgram(){
  const d=ST.progDraft;d.name=gid('prog-name').value.trim()||'My program';
  d.days=d.days.filter(day=>(CFG.customDays[day.id]||[]).length);
  if(!d.days.length){alert('Add at least one day with at least one exercise before saving.');return;}
  CFG.customProgram=d;CFG.split='custom';syncProgramMeta();saveCFG();ST.progDraft=null;refreshHome();ss('home');
  track('program_saved');
}
function cancelProgram(){ST.progDraft=null;ss('home');}
function deleteProgram(){
  if(!confirm('Delete your custom program? Its days are removed (your logged history is kept).'))return;
  if(CFG.customProgram)CFG.customProgram.days.forEach(day=>{delete CFG.customDays[day.id];delete CFG.dayLinks[day.id];});
  CFG.customProgram=null;if(CFG.split==='custom')CFG.split=SPLIT_FREQ[CFG.freq]||'pplul';
  saveCFG();ST.progDraft=null;refreshHome();ss('home');
}
