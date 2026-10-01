// GainPath: the GAINPATH MATH section
// A plain script (not a module) sharing one global scope with the other
// js/ files; index.html sets the load order. Map: docs/index-section-map.md
// ═══ GAINPATH MATH — estimation, progression and unit conversion ═══
// Every formula that turns logged data into a proposed weight lives here:
// starting-weight estimates (getAIEstimatedWeight, LIFT_REL/liftEstimate),
// RIR progression (suggestWeight), body-weight scaling (bwScale, bwAt/curBW),
// rep re-targeting (carriedWeight), ease-back after a break (breakSuggest),
// gear snapping (roundToGymWeight) and kg↔lbs conversion (convertUnitData).
// Rules for this section: no DOM access, no storage writes, no UI strings.
// It reads ST/CFG and these helpers defined elsewhere: EXPOOL, EXPOOL_F, EX,
// equipRank, mwKey, dkey, dkDay. Covered by npm run test:units, which also
// fails if this section ever calls gid/document/innerHTML/save*/localStorage.
const WU_RAMPS={1:[0.5],2:[0.4,0.65],3:[0.4,0.6,0.8]};
function buildSets(ex,savedW){
  const sets=[];const baseW=savedW!==undefined?savedW:defaultW(ex);
  // plannedR first: it is an explicit choice the user just made on the day-edit
  // screen, so it must outrank the reps carried over from last session. With it
  // second, every exercise with any history ignored the reps you had just typed.
  const nSets=ex.plannedSets||CFG.prefSets;const reps=ex.plannedR||getSavedReps(ex.name)||CFG.prefReps;
  if(CFG.warmup&&ex.doWU&&baseW>0){
    const ramp=WU_RAMPS[CFG.wuSteps]||WU_RAMPS[1];
    ramp.forEach(pct=>{let wuW=Math.round(baseW*pct*2)/2;const snapped=roundToGymWeight(ex,wuW,'up');if(snapped<baseW)wuW=snapped;sets.push({t:'w',w:wuW,r:CFG.wuReps,done:false});});
  }
  if(isPyramidEx(ex)){
    const pReps=pyramidReps(nSets);const inc=weightIncrement(ex);
    for(let i=0;i<nSets;i++)sets.push({t:'x',w:Math.max(0,Math.round((baseW+inc*i)*2)/2),r:pReps[i],done:false});
  }else{
    for(let i=0;i<nSets;i++){sets.push({t:'x',w:baseW,r:ex.holdSecs?0:reps,done:false});}
  }
  return sets;
}
// Reps set during a workout carry over: the first completed work set of the
// last session becomes the default rep target next time (timed holds excluded —
// their r is seconds held, and pyramid style keeps its computed scheme).
// A Settings rep-target change (CFG.prefRepsChangedAt, stamped by
// setSettingReps/commitRepsCustom) immediately overrides that carry-over
// again — otherwise changing the preference had no visible effect on any
// exercise you'd already logged, only ones you'd never done. Once you log a
// session after that change, its actual reps resume carrying over as normal.
// Day-granularity only (dk, not a precise timestamp): changing the
// preference and logging a different rep count for the same exercise later
// the same calendar day is the one edge case this can't distinguish.
// Sessions that logged this exercise, minus deload ones (Deload next session,
// −30%, tagged deload:true per exercise): a planned light day is never carried
// forward, so the session after it resumes from the last normal one. If a
// deload is all there is, it is used.
function carrySessions(exName){
  const all=ST.history.filter(h=>h.exercises&&h.exercises.find(e=>e.name===exName));
  const live=all.filter(h=>!h.exercises.find(e=>e.name===exName).deload);
  return live.length?live:all;
}
function getSavedReps(exName){
  const meta=EXPOOL[exName];if(meta&&meta.holdSecs)return undefined;
  const hist=carrySessions(exName);
  if(!hist.length)return undefined;
  const session=hist[hist.length-1];
  if(CFG.prefRepsChangedAt&&session.dk&&session.dk<=CFG.prefRepsChangedAt)return undefined;
  const last=session.exercises.find(e=>e.name===exName);
  const ws=(last.sets||[]).filter(s=>s.done&&s.t!=='w'&&s.r>0);
  return ws.length?ws[0].r:undefined;
}
function getSavedWeight(exName,isBW){
  const hist=carrySessions(exName);
  if(!hist.length)return undefined;
  const last=hist[hist.length-1].exercises.find(e=>e.name===exName);
  if(!last)return undefined;
  const ws=last.sets.filter(s=>s.done&&s.t!=='w'&&(isBW?s.w!==0:s.w>0));
  return ws.length?Math.max(...ws.map(s=>s.w)):undefined;
}
// Last session's weight, re-targeted when the rep target has since changed
// (Settings preference or a day-plan rep count): 60kg×10 → ~68.5kg×5, using the
// same Epley rep↔1RM relation as e1rm() (reps capped at 15, beyond which the
// formula overestimates). Bodyweight and timed holds are left as-is. Pyramid
// carries its base (lightest work set): carrying the top set raised the whole
// pyramid two increments every session with no Apply tap.
function carriedWeight(ex){
  const isBW=ex.note==='bodyweight',saved=getSavedWeight(ex.name,isBW);
  if(saved===undefined||isBW||ex.holdSecs)return saved;
  const last=lastSessionEx(ex.name);
  if(isPyramidEx(ex)){const xs=last?(last.sets||[]).filter(s=>s.done&&s.t==='x'&&s.w>0):[];return xs.length?Math.min(...xs.map(s=>s.w)):saved;}
  const top=last&&(last.sets||[]).find(s=>s.done&&s.t!=='w'&&s.w===saved);
  const r=ex.plannedR||getSavedReps(ex.name)||CFG.prefReps;
  if(!top||!(top.r>0)||top.r===r)return saved;
  const w=saved*(1+Math.min(top.r,15)/30)/(1+Math.min(r,15)/30);
  return roundToGymWeight(ex,Math.round(w*2)/2,'nearest');
}
// Back after 4+ weeks off: Bosquet et al. 2013 (meta-analysis, 103 studies)
// found maximal strength essentially unchanged up to ~4 weeks of cessation,
// with losses growing after that. No primary source pins the size precisely,
// so this is a conservative easing (−10% for 4–8 weeks, −15% beyond) offered as
// an Apply/Dismiss chip — the old weight stays unless the user taps Apply.
// The break is the body part's, not the lift's: rows skipped for 6 weeks
// while pulldowns were trained weekly is no break, so the weeks count from the
// last session with a logged work set for any exercise of the same mg.
function breakSuggest(ex,curW){
  if(ex.note==='bodyweight'||ex.holdSecs||!(curW>0))return null;
  if(!exHistory(ex.name).length)return null;
  const mg=ex.mg||(EXPOOL[ex.name]||{}).mg;let dk=null;
  ST.history.forEach(h=>{if(h.dk&&!(dk&&h.dk<=dk)&&(h.exercises||[]).some(e=>(e.name===ex.name||(mg&&(EXPOOL[e.name]||{}).mg===mg))&&(e.sets||[]).some(s=>s.done&&s.t!=='w')))dk=h.dk;});
  if(!dk)return null;
  const weeks=Math.floor((dkDay(dkey(new Date()))-dkDay(dk))/7);
  if(weeks<4)return null;
  const newW=roundToGymWeight(ex,Math.round(curW*(weeks>=8?.85:.9)*2)/2,'down');
  return newW<curW?{newW,weeks}:null;
}
// ═══ RELATED-LIFT SYNC — see docs/superpowers/plans/2026-09-25-lift-sync.md ═══
// Free-weight lifts grouped by movement pattern: [family, ratio of this lift's
// e1RM to the family reference lift (ratio 1), 'b' bar | 'd' dumbbell (ratio
// is per hand) | 'c' cable stack, 1 = isolation]. Ratios are from comparison
// studies where they exist (DB bench ≈72–83% of barbell for both hands,
// incline ≈0.78–0.82 of flat, front ≈0.8 of back squat) and coaching norms
// otherwise. Cable stacks read differently per station (pulley ratio, stack
// increments), so cables are a lower-confidence ballpark: they can be
// estimated from free weights or other cables, but a cable number never feeds
// a free-weight estimate, and they never get a sync chip. Machines and
// bodyweight moves are absent: plate-loaded leverage and sled tare vary too
// much to convert at all.
const LIFT_REL={
  'Flat barbell bench press':['press_h',1,'b'],'Decline barbell bench press':['press_h',1,'b'],'Incline barbell chest press':['press_h',.8,'b'],
  'Barbell floor press':['press_h',.9,'b'],'Close-grip bench press':['press_h',.88,'b'],
  'Bench dumbbell chest press':['press_h',.39,'d'],'Decline dumbbell press':['press_h',.39,'d'],'Incline bench dumbbell press':['press_h',.31,'d'],
  'Neutral-grip dumbbell press':['press_h',.37,'d'],'Dumbbell floor press':['press_h',.36,'d'],'Dumbbell close-grip floor press':['press_h',.32,'d'],
  'Dumbbell fly':['press_h',.17,'d',1],'Incline dumbbell fly':['press_h',.15,'d',1],'Decline dumbbell fly':['press_h',.17,'d',1],
  'Barbell overhead press':['press_v',1,'b'],'Barbell seated shoulder press':['press_v',.95,'b'],'Barbell push press':['press_v',1.2,'b'],
  'Seated dumbbell shoulder press':['press_v',.4,'d'],'Arnold press':['press_v',.35,'d'],
  'Barbell back squat':['squat',1,'b'],'Box squat':['squat',.95,'b'],'Barbell front squat':['squat',.8,'b'],
  'Barbell walking lunge':['squat',.45,'b'],'Barbell step-up':['squat',.4,'b'],'Goblet squat':['squat',.3,'d'],'Dumbbell sumo squat':['squat',.3,'d'],
  'Dumbbell front squat':['squat',.25,'d'],'Heel-elevated dumbbell squat':['squat',.25,'d'],'Bulgarian split squat':['squat',.2,'d'],
  'Dumbbell lunge':['squat',.2,'d'],'Walking lunge':['squat',.2,'d'],'Dumbbell reverse lunge':['squat',.2,'d'],'Dumbbell step-up':['squat',.18,'d'],
  'Barbell deadlift':['hinge',1,'b'],'Sumo deadlift':['hinge',1,'b'],'Rack pull':['hinge',1.1,'b'],'Romanian deadlift':['hinge',.7,'b'],
  'Stiff-leg deadlift':['hinge',.65,'b'],'Barbell good morning':['hinge',.35,'b'],'Dumbbell Romanian deadlift':['hinge',.3,'d'],
  'Dumbbell sumo deadlift':['hinge',.35,'d'],'Single-leg dumbbell RDL':['hinge',.15,'d'],
  'Barbell row':['row',1,'b'],'Pendlay row':['row',.9,'b'],'Yates row':['row',1.05,'b'],'Single-arm dumbbell row':['row',.5,'d'],
  'Kroc row':['row',.55,'d'],'Chest-supported dumbbell row':['row',.4,'d'],'Incline dumbbell row':['row',.4,'d'],
  'Barbell curl':['curl',1,'b',1],'EZ bar curl':['curl',1,'b',1],'Wide-grip barbell curl':['curl',.95,'b',1],'Drag curl':['curl',.8,'b',1],
  'Preacher curl':['curl',.85,'b',1],'Barbell reverse curl':['curl',.7,'b',1],'Reverse EZ bar curl':['curl',.7,'b',1],
  'Dumbbell bicep curl':['curl',.45,'d',1],'Hammer curls':['curl',.5,'d',1],'Cross-body hammer curl':['curl',.48,'d',1],
  'Incline dumbbell curl':['curl',.38,'d',1],'Concentration curl':['curl',.42,'d',1],'Spider curl':['curl',.38,'d',1],'Zottman curl':['curl',.4,'d',1],
  'Barbell skull crusher':['tri_ext',1,'b',1],'Overhead EZ bar tricep extension':['tri_ext',.9,'b',1],'Dumbbell skull crusher':['tri_ext',.4,'d',1],
  'Single-arm dumbbell overhead tricep extension':['tri_ext',.3,'d',1],
  'Barbell shrug':['shrug',1,'b'],'Dumbbell shrug':['shrug',.45,'d'],
  'Barbell upright row':['upright',1,'b'],'Barbell high pull':['upright',1.1,'b'],'Dumbbell high pull':['upright',.45,'d'],
  'Barbell hip thrust':['thrust',1,'b'],'Barbell glute bridge':['thrust',.9,'b'],'B-stance barbell hip thrust':['thrust',.6,'b'],
  'Dumbbell hip thrust':['thrust',.35,'d'],'Dumbbell single-leg hip thrust':['thrust',.2,'d'],
  'Dumbbell lateral raise':['raise',1,'d',1],'Dumbbell front raise':['raise',1.1,'d',1],'Dumbbell scaption raise':['raise',1,'d',1],
  'Bent-over dumbbell reverse fly':['raise',.9,'d',1],'Incline bench dumbbell rear delt fly':['raise',.9,'d',1],
  'Bench-supported seated reverse fly':['raise',.9,'d',1],'Prone dumbbell Y-raise':['raise',.5,'d',1],
  'Barbell standing calf raise':['calf',1,'b'],'Dumbbell standing calf raise':['calf',.35,'d'],'Single-leg dumbbell calf raise':['calf',.2,'d'],
  'Cable chest fly':['press_h',.15,'c',1],'Cable crossover':['press_h',.15,'c',1],'Cable low-to-high fly':['press_h',.12,'c',1],'Single-arm cable fly':['press_h',.12,'c',1],
  'Lat pulldown':['row',.9,'c'],'Reverse grip pulldown':['row',.9,'c'],'Seated cable row':['row',.9,'c'],'Wide-grip cable row':['row',.85,'c'],
  'Single-arm lat pulldown':['row',.45,'c'],'Straight arm cable pulldown':['row',.4,'c',1],'Cable pullover':['row',.35,'c',1],'Cable face pull':['row',.35,'c',1],
  'Cable lateral raise':['raise',.8,'c',1],'Cable front raise':['raise',.9,'c',1],'Cable Y-raise':['raise',.5,'c',1],'Cable reverse fly':['raise',.9,'c',1],'Cross-cable reverse fly':['raise',.9,'c',1],
  'Cable bicep curl':['curl',.9,'c',1],'Cable rope hammer curl':['curl',.85,'c',1],'Cable spider curl':['curl',.7,'c',1],
  'Triceps pushdown':['tri_ext',1.1,'c',1],'Cable rope tricep extension':['tri_ext',.9,'c',1],'Overhead cable tricep extension':['tri_ext',.9,'c',1],'Cable tricep kickback':['tri_ext',.25,'c',1],
  'Cable shrug':['shrug',.8,'c'],'Cable pull-through':['hinge',.25,'c'],
  // 'w' = upper-body bodyweight move, a source only. 5th field = share of body
  // weight moved: push-up ≈64%, feet-elevated ≈70% (Ebben 2011, force plate);
  // pull-ups/dips ≈90% (body minus the arms, ExRx segment data); inverted row
  // 69–73% with the body parallel to the floor (TRX force-plate study, PMC10516423),
  // .65 here since most setups are less horizontal. The set's w adds (+) or
  // assists (−), and 'assist weight' exercises log the assistance as positive.
  // Lower-body bodyweight moves are absent: the body is moved in the barbell
  // version too, so bodyweight squat reps say nothing about external load.
  'Push-ups':['press_h',1,'w',0,.64],'Wide-grip push-ups':['press_h',1,'w',0,.64],'Decline push-ups':['press_h',1,'w',0,.7],
  'Diamond push-ups':['press_h',.88,'w',0,.64],'Close-grip push-ups':['press_h',.88,'w',0,.64],
  'Chest dips':['press_h',1.15,'w',0,.9],'Tricep dips':['press_h',1.1,'w',0,.9],'Machine-assisted dip':['press_h',1.15,'w',0,.9],
  'Pike push-ups':['press_v',1,'w',0,.7],
  'Pull-ups':['row',1.05,'w',0,.9],'Chin-ups':['row',1.1,'w',0,.9],'Machine-assisted pull-up':['row',1.05,'w',0,.9],
  'Inverted row':['row',.9,'w',0,.65],'Smith machine inverted row':['row',.9,'w',0,.65],
  // 's' = Smith machine: one shared guided bar (same mwKey tare), so Smith↔Smith
  // converts with high confidence. Cotterman 2005: Smith bench 1RM ≈ 0.95×free
  // −6.8kg (≈.87–.89 at typical loads) → .88; Smith squat ≈ free for men
  // (higher for women) → 1. Other Smith ratios assume the free-weight ratio.
  'Smith machine bench press':['press_h',.88,'s'],'Smith machine incline press':['press_h',.7,'s'],'Smith machine squat':['squat',1,'s'],
  'Smith machine shoulder press':['press_v',.9,'s'],'Smith machine Romanian deadlift':['hinge',.7,'s'],'Smith machine hip thrust':['thrust',1,'s'],
  'Smith machine shrug':['shrug',1,'s'],'Smith machine standing calf raise':['calf',1,'s']
};
// Pattern-to-pattern norms (reference a ≈ k × reference b), used only when the
// target's own pattern has no evidence at all: OHP ≈ 0.55–0.75 of bench, row ≈
// 0.8–1.05 of bench, deadlift ≈ 1.1–1.4 of squat.
const LIFT_CROSS=[['press_v','press_h',.65],['row','press_h',.85],['hinge','squat',1.2]];
// Onboarding baseline → family reference. The "Chest press" and "Hack squat /
// Squat" fields may have been a machine, hence the extra discount; lat
// pulldown is a cable stack (ratio .9 of the row reference), so it seeds cable
// pulls only, like any other cable number.
const LIFT_SEED={chest:['press_h',.85],squat:['squat',.85],ohp:['press_v',.95],lat:['row',1,'c']};
const RIR_OF={easy:5,good:3.5,hard:1.5};
const LB_PER_KG=2.20462;
// Current strength on one lift: best Epley e1RM over its last 3 sessions, reps
// capped at 12 (the formulas overestimate beyond ~10), the last-set RIR rating
// added to the final work set's reps, decayed 1%/week past 4 weeks (floor .85).
// Body weight on a given day: the latest weigh-in on or before it.
function bwAt(dk){let w=null;(ST.bw||[]).forEach(e=>{if(!dk||e.dk<=dk)w=e.w;});return w!==null?w:curBW();}
function liftStrength(name){
  const hist=exHistory(name).slice(-3);let best=null;
  const rel=LIFT_REL[name],meta=EXPOOL[name];
  const bwFrac=rel&&rel[2]==='w'?rel[4]:0,assist=!!(meta&&meta.note==='assist weight');
  hist.forEach(s=>{
    const dk=ST.history[s.idx].dk;const days=dk?Math.max(0,dkDay(dkey(new Date()))-dkDay(dk)):0;
    const decay=Math.max(.85,1-Math.max(0,days/7-4)*.01);
    s.sets.forEach((st,i)=>{
      const load=bwFrac?bwFrac*(bwAt(dk)||0)+(assist?-st.w:st.w):st.w;
      if(!(load>0&&st.r>0))return;
      const rir=i===s.sets.length-1?(RIR_OF[s.exFeel]||0):0;
      const e=load*(1+(Math.min(st.r,12)+rir)/30)*decay;
      if(!best||e>best.e)best={e,src:name};
    });
  });
  return best;
}
// Barbell ↔ dumbbell: the dumbbell share shrinks as the lifter gets stronger
// (stabilising two heavy implements), so scale by (reference e1RM / 60kg)^∓0.1.
function stabCurve(refE,from,to){
  if(from===to||refE<=0||!/^[bd]$/.test(from)||!/^[bd]$/.test(to))return 1;
  const f=Math.pow(refE/(CFG.unit==='lbs'?132:60),.1);
  return to==='d'?1/f:f;
}
// Best estimate of ex's working weight at `reps` (3 reps in reserve) from every
// related lift except ex itself. The strongest candidate wins: a logged weight
// only proves a lower bound on strength, so an under-loaded lift never drags
// another down. Returns {w,e,src,cross} (w unsnapped) or null.
function liftEstimate(ex,reps){
  const me=LIFT_REL[ex.name];if(!me||me[2]==='w'||ex.note==='bodyweight'||ex.holdSecs)return null;
  const [fam,ratio,eq,iso]=me;
  const fromFam=(f,k,cross)=>{
    let best=null;
    Object.keys(LIFT_REL).forEach(n=>{
      const r=LIFT_REL[n];if(n===ex.name||r[0]!==f||(r[2]==='c'&&eq!=='c'))return;
      const s=liftStrength(n);if(!s)return;
      const refE=s.e/r[1]*k;
      const conf=(eq==='c'?(r[2]==='c'?.85:.75):r[2]==='w'?.85:r[2]===eq?.95:(r[2]==='s'||eq==='s')?.85:.9)*((r[3]?1:0)!==(iso?1:0)?.85:1)*(cross?.85:1);
      const e=refE*ratio*stabCurve(refE,r[2],eq)*conf;
      if(!best||e>best.e)best={e,src:n,cross};
    });
    if(!best&&!cross){
      const logged=Object.keys(LIFT_REL).some(n=>LIFT_REL[n][0]===f&&LIFT_REL[n][2]!=='w'&&exHistory(n).length);
      Object.keys(LIFT_SEED).forEach(key=>{
        const kl=(CFG.keyLifts||{})[key],sd=LIFT_SEED[key];
        const seq=sd[2]||'b';
        if(logged||sd[0]!==f||!kl||!(kl.w>0)||(seq==='c'&&eq!=='c'))return;
        const refE=kl.w*(1+Math.min(kl.r||1,12)/30)*sd[1];
        const e=refE*ratio*stabCurve(refE,seq,eq)*(eq==='c'?(seq==='c'?.85:.75):eq==='b'?.95:.9);
        if(!best||e>best.e)best={e,src:null,cross:false};
      });
    }
    return best;
  };
  let best=fromFam(fam,1,false);
  if(!best)LIFT_CROSS.forEach(([a,b,k])=>{
    const c=a===fam?fromFam(b,k,true):b===fam?fromFam(a,1/k,true):null;
    if(c&&(!best||c.e>best.e))best=c;
  });
  if(!best)return null;
  best.w=best.e/(1+(Math.min(reps||CFG.prefReps,12)+3)/30);
  return best;
}
// Snap an estimate to real gear; with no inventory configured, at least land
// on a plausible increment (2.5kg/5lb) rather than e.g. a 26.5kg dumbbell.
function snapEstimate(ex,w){
  const step=CFG.unit==='lbs'?5:2.5;
  return roundToGymWeight(ex,Math.max(step,Math.round(w/step)*step),'nearest');
}
function estReps(ex){return isPyramidEx(ex)?12:(ex.plannedR||CFG.prefReps);}
// Sync chip for a lift that already has history: shown only when its own
// e1RM is under 75% of what related lifts imply, the user didn't rate its last
// set 1–2 reps left or failure (then it's a genuine weak point), the proposal
// is a raise, and it wasn't dismissed (it returns once the estimate rises 10%+).
function syncSuggest(ex,curW,reps){
  if(!LIFT_REL[ex.name]||/[cw]/.test(LIFT_REL[ex.name][2])||ex.note==='bodyweight'||ex.holdSecs)return null;
  const hist=exHistory(ex.name);if(!hist.length)return null;
  const f=hist[hist.length-1].exFeel;if(f==='hard'||f==='max')return null;
  const own=liftStrength(ex.name),est=liftEstimate(ex,reps);
  if(!own||!est||own.e>=est.e*.75)return null;
  const newW=snapEstimate(ex,est.w);if(!(newW>curW))return null;
  const dis=(CFG.syncDismiss||{})[ex.name];if(dis&&newW<dis*1.1)return null;
  return{newW,src:est.src};
}
// Program defaults assume a ~75kg man / ~60kg woman. Strength scales with body
// mass^b: b=0.67 in theory (geometric similarity), but measured across the
// general lifting population b≈0.55 for men and ≈0.50 for women (Frontiers in
// Physiology 2026, large-scale allometric powerlifting analysis). Clamped to
// 0.75–1.25× so an outlier profile can't swing a default too far.
function bwScale(){
  const f=CFG.sex==='female',ref=(f?60:75)*(CFG.unit==='lbs'?LB_PER_KG:1),b=curBW();
  return b>0?Math.min(1.25,Math.max(.75,Math.pow(b/ref,f?.5:.55))):1;
}
// Built-in defaults (EX baseW, EXPOOL_F) are written in kg; custom exercises
// store baseW in the user's own unit. For lbs users a built-in default is
// converted and rounded to a 5 lb step, so a 60kg bench default reads 130 lb,
// not "60 lb".
function defaultW(ex){const b=ex.baseW||0;if(CFG.unit!=='lbs'||ex.custom||!b)return b;return Math.max(5,Math.round(b*LB_PER_KG/5)*5);}
// Fallback estimates land on something that exists: the nearest standard
// dumbbell for dumbbell lifts, else a 2.5kg / 5lb step (then snapped to owned gear).
function fallbackSnap(ex,w){
  const step=CFG.unit==='lbs'?5:2.5;
  if(equipRank(ex)===1)return nearestIn(DUMBBELLS[CFG.unit]||DUMBBELLS.kg,w);
  return Math.max(step,Math.round(w/step)*step);
}
function getAIEstimatedWeight(ex){
  const rel=liftEstimate(ex,estReps(ex));
  if(rel)return snapEstimate(ex,rel.w);
  // Lifts in LIFT_REL were already seeded from the baseline above; the per-
  // muscle-group mapping below is only for machines/cables (it used to turn a
  // 60kg lat pulldown into "48kg per hand" for dumbbell rows).
  const lifts=LIFT_REL[ex.name]?{}:(CFG.keyLifts||{});
  const expMult={beginner:0.4,intermediate:0.6,advanced:0.8}[CFG.exp]||0.6;
  const mg=ex.mg;let est=defaultW(ex);
  if(mg==='chest'&&lifts.chest&&lifts.chest.w>0){est=Math.round(lifts.chest.w*0.7*2)/2;}
  else if((mg==='back'||mg==='rear_delts')&&lifts.lat&&lifts.lat.w>0){est=Math.round(lifts.lat.w*0.8*2)/2;}
  else if(mg==='shoulders'&&lifts.ohp&&lifts.ohp.w>0){est=Math.round(lifts.ohp.w*0.6*2)/2;}
  else if((mg==='quads'||mg==='hamstrings')&&lifts.squat&&lifts.squat.w>0){est=Math.round(lifts.squat.w*0.7*2)/2;}
  else{est=Math.round(defaultW(ex)*expMult*bwScale()*2)/2||defaultW(ex);}
  // Snap the estimate up to a weight the user can actually load (no-op if no
  // gym inventory is configured); never propose e.g. a 2.5 kg dumbbell he
  // doesn't own.
  return roundToGymWeight(ex,fallbackSnap(ex,est),'up');
}

// ═══ ANALYTICS: volume, estimated 1RM, per-exercise history, RPE-based suggestions ═══
function e1rm(w,r){if(w<=0||r<=0)return 0;return Math.round(w*(1+r/30)*2)/2;}
function sessionVolume(rec){return(rec.exercises||[]).reduce((a,ex)=>a+(ex.sets||[]).filter(s=>s.done&&s.t!=='w'&&s.w>0).reduce((b,s)=>b+s.w*s.r,0),0);}
function fmtVol(v,unit){const u=unit||'';return v>=1000?(Math.round(v/100)/10)+'k'+(u?' '+u:''):String(Math.round(v))+u;}
function exHistory(name){const out=[];ST.history.forEach((h,idx)=>{const ex=(h.exercises||[]).find(e=>e.name===name);if(!ex)return;const ws=(ex.sets||[]).filter(s=>s.done&&s.t!=='w');if(ws.length)out.push({idx,date:h.date,exFeel:ex.exFeel,note:ex.note||null,deload:!!ex.deload,sets:ws});});return out;}
function lastSessionEx(name){const hist=carrySessions(name);return hist.length?hist[hist.length-1].exercises.find(e=>e.name===name):null;}
function lastNoteForExercise(name){for(let i=ST.history.length-1;i>=0;i--){const ex=(ST.history[i].exercises||[]).find(e=>e.name===name);if(ex&&ex.note)return ex.note;}return null;}
// The 5kg step is for barbell/machine lower-body and back lifts; a dumbbell is
// per hand, so +5kg a hand (a 25% jump on a 20kg lunge) is too much.
function weightIncrement(ex){const big=['quads','hamstrings','back'].includes(ex.mg)&&equipRank(ex)!==1;return CFG.unit==='kg'?(big?5:2.5):(big?10:5);}
function stepIncrement(ex,curW){
  if(equipRank(ex)===1&&curW<20)return CFG.unit==='kg'?1:2;
  return CFG.unit==='kg'?2.5:5;
}
// Propose next-session weight from the last-set reps-left rating (RIR):
//   5+ left (easy) → +full increment · 3–4 left (good) → +small step ·
//   1–2 left (hard) → hold (ideal, no suggestion) ·
//   0/failure (max) → hold, unless failed two sessions running → deload.
// Always snapped to loadable equipment and surfaced as a one-tap Apply chip.
function suggestWeight(ex,curW){
  if(ex.note==='bodyweight'||ex.holdSecs)return null;
  const hist=exHistory(ex.name).filter(x=>!x.deload);if(!hist.length)return null;
  const f=hist[hist.length-1].exFeel;if(!f)return null;
  let delta=0,dir='up';
  if(f==='easy')delta=weightIncrement(ex);
  else if(f==='good')delta=stepIncrement(ex,curW);
  else if(f==='max'){
    const prev=hist.length>=2?hist[hist.length-2].exFeel:null;
    if(prev==='max'){delta=-weightIncrement(ex);dir='down';}
  }
  if(delta===0)return null;
  const newW=roundToGymWeight(ex,Math.max(0,Math.round((curW+delta)*2)/2),dir);
  // A loaded lift never gets a 0 deload: at the lightest weight, just hold.
  if(!(newW>0)||newW===curW)return null;
  return{feel:f,delta:Math.round((newW-curW)*2)/2,newW};
}
function pyramidReps(nSets){const reps=[];for(let i=0;i<nSets;i++)reps.push(Math.max(12-2*i,2));return reps;}
function isPyramidEx(ex){return CFG.setStyle==='pyramid'&&ex.note!=='bodyweight'&&!ex.holdSecs;}
function poolEx(n){const e=EXPOOL[n];return e&&CFG.sex==='female'&&EXPOOL_F[n]!==undefined&&EXPOOL_F[n]!==e.baseW?Object.assign({},e,{baseW:EXPOOL_F[n]}):e;}
function curBW(){return ST.bw&&ST.bw.length?ST.bw[ST.bw.length-1].w:CFG.bw;}
const PLATES={kg:[25,20,15,10,5,2.5,1.25],lbs:[45,35,25,10,5,2.5]};
// Every stored weight is a plain number in CFG.unit, so switching units must
// convert all of them — it used to only relabel, turning an 80kg bench into
// "80 lbs". Logged weights keep 0.1 precision (an honest record); owned plates
// and dumbbells map to the nearest real size in the new unit; PRs and badges
// are re-derived rather than converted.
function nearestIn(list,v){return list.reduce((b,d)=>Math.abs(d-v)<Math.abs(b-v)?d:b,list[0]);}
function convertUnitData(from,to){
  if(!from||from===to||!PLATES[to])return false;
  const f=to==='lbs'?LB_PER_KG:1/LB_PER_KG;
  // Rounding rule: a converted weight is rounded to 0.1 in the new unit, and
  // CFG.unitMemo remembers what each converted value (and each gear size) was
  // before the switch. Switching straight back restores those exact originals
  // (225 lb → 102.1 kg → 225 lb, 1.25 kg → 2.8 lb → 1.25 kg, a full rack stays
  // full), so repeated switching never drifts. Values logged or edited in
  // between convert fresh. A converted value that two different originals
  // share (e.g. 225 and 225.1 lb → 102.1 kg) isn't memoised, it just converts.
  const memo=CFG.unitMemo&&CFG.unitMemo.from===to&&CFG.unitMemo.to===from?CFG.unitMemo:null;
  const next={from,to,w:{},db:{},pl:{}};
  const cv=w=>{
    if(typeof w!=='number'||!w)return w;
    const back=memo&&memo.w[w],out=typeof back==='number'?back:Math.round(w*f*10)/10,k=String(out);
    next.w[k]=next.w[k]===undefined||next.w[k]===w?w:null;
    return out;
  };
  const cvGear=(list,std,key)=>{
    const out=new Set();
    list.forEach(d=>{
      const back=memo&&memo[key][d];
      (Array.isArray(back)?back:[nearestIn(std,d*f)]).forEach(c=>{out.add(c);const m=next[key][c]=next[key][c]||[];if(!m.includes(d))m.push(d);});
    });
    return[...out].sort((a,b)=>a-b);
  };
  const cvSets=sets=>(sets||[]).forEach(st=>{st.w=cv(st.w);});
  const cvExs=exs=>(exs||[]).forEach(e=>{cvSets(e.sets);if(e.plannedW!==undefined)e.plannedW=cv(e.plannedW);});
  ST.history.forEach(h=>cvExs(h.exercises));
  (ST.bw||[]).forEach(e=>{e.w=cv(e.w);});
  Object.keys(ST.mw||{}).forEach(k=>{ST.mw[k]=cv(ST.mw[k]);});
  CFG.bw=cv(CFG.bw);
  Object.values(CFG.keyLifts||{}).forEach(l=>{if(l)l.w=cv(l.w);});
  Object.values(CFG.dayPlan||{}).forEach(p=>Object.values(p||{}).forEach(x=>{if(x&&x.w!==undefined)x.w=cv(x.w);}));
  (CFG.customExercises||[]).forEach(ex=>{ex.baseW=cv(ex.baseW);});
  Object.keys(CFG.syncDismiss||{}).forEach(k=>{CFG.syncDismiss[k]=cv(CFG.syncDismiss[k]);});
  if(CFG.dumbbellMax)CFG.dumbbellMax=cv(CFG.dumbbellMax);
  const pl={};cvGear(Object.keys(CFG.gymPlates||{}).filter(d=>CFG.gymPlates[d]>0).map(Number),PLATES[to],'pl').forEach(d=>{pl[d]=1;});CFG.gymPlates=pl;
  CFG.gymDumbbells=cvGear(CFG.gymDumbbells||[],DUMBBELLS[to],'db');
  if(ST.day){(ST.sd||[]).forEach(it=>{cvSets(it.sets);if(it.ex&&it.ex.plannedW!==undefined)it.ex.plannedW=cv(it.ex.plannedW);});if(ST.pendingRec)cvExs(ST.pendingRec.exercises);}
  if(ST.editDay)(ST.editList||[]).forEach(e=>{if(e.plannedW!==undefined)e.plannedW=cv(e.plannedW);});
  CFG.unitMemo=next;CFG.unit=to;return true;
}
// Standard commercial-gym dumbbell rack denominations. Real racks aren't a
// uniform step (1kg jumps below 10kg, 2.5kg jumps above is a common shape),
// so this is presented as a flat tap-what-you-have list, same as plates,
// rather than an increment/max the user would have to fit their rack into.
const DUMBBELLS={
  kg:[1,2,3,4,5,6,7,8,9,10,12.5,15,17.5,20,22.5,25,27.5,30,32.5,35,37.5,40,45,50,55,60],
  lbs:[5,10,15,20,25,30,35,40,45,50,55,60,65,70,75,80,85,90,95,100,105,110,115,120,125,130,140,150]
};
function gymHasPlateInventory(){return Object.values(CFG.gymPlates||{}).some(n=>n>0);}
function calcPlates(perSide){
  const denoms=PLATES[CFG.unit]||PLATES.kg;
  const limited=gymHasPlateInventory();
  let remaining=Math.max(0,Math.round(perSide*4)/4);
  const counts=[];
  denoms.forEach(d=>{
    const owned=limited?(CFG.gymPlates[d]?Infinity:0):Infinity;
    const n=Math.min(Math.floor(remaining/d+1e-6),owned);
    if(n>0){counts.push({d,n});remaining=Math.round((remaining-n*d)*100)/100;}
  });
  return{counts,remaining};
}
// Snap a weight to what the user can actually load from their logged plates/
// dumbbells ("My gym"). dir='up' picks the next-higher available weight
// (progressive-overload / warm-up bias), 'down' the next-lower (for deloads),
// 'nearest' the closest (legacy default — keeps any older caller unchanged).
// With no inventory configured it's a no-op.
function roundToGymWeight(ex,w,dir){
  if(w<=0||ex.note==='bodyweight'||ex.holdSecs)return w;
  dir=dir||'nearest';
  const isDB=equipRank(ex)===1;
  if(isDB){
    const owned=(CFG.gymDumbbells||[]).slice().sort((a,b)=>a-b);
    if(!owned.length)return w;
    if(dir==='up'){const hit=owned.find(d=>d>=w-1e-6);return hit!==undefined?hit:owned[owned.length-1];}
    if(dir==='down'){for(let i=owned.length-1;i>=0;i--)if(owned[i]<=w+1e-6)return owned[i];return owned[0];}
    return owned.reduce((best,d)=>Math.abs(d-w)<Math.abs(best-w)?d:best,owned[0]);
  }
  if(!gymHasPlateInventory())return w;
  const base=ex.machine&&ST.mw[mwKey(ex.name)]!==undefined?ST.mw[mwKey(ex.name)]:(CFG.unit==='kg'?20:45);
  const targetPerSide=(w-base)/2;
  if(targetPerSide<=0)return w;
  const loadable=t=>calcPlates(t).remaining<=0.01; // calcPlates clamps neg→0
  const total=t=>Math.round((base+t*2)*2)/2;
  // Scan the real loadable per-side grid (0.25 = calcPlates' rounding step) so
  // the next-higher/lower loadable combo is found for any target, not just ones
  // that happen to land on a weight-increment boundary.
  if(dir==='up'){
    for(let t=targetPerSide;t<=targetPerSide+50.001;t=Math.round((t+0.25)*100)/100)if(loadable(t))return total(t);
    return w;
  }
  if(dir==='down'){
    for(let t=targetPerSide;t>=-0.001;t=Math.round((t-0.25)*100)/100)if(loadable(Math.max(0,t)))return total(Math.max(0,t));
    return w;
  }
  const inc=weightIncrement(ex)/2;
  for(let d=0;d<=4;d++){
    for(const sign of(d===0?[0]:[-1,1])){
      const trial=targetPerSide+sign*d*inc;
      if(trial<0)continue;
      if(loadable(trial))return total(trial);
    }
  }
  return w;
}
// ═══ END GAINPATH MATH ═══
