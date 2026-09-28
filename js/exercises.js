// GainPath: the splits, the exercise database and the exercise pool
// A plain script (not a module) sharing one global scope with the other
// js/ files; index.html sets the load order. Map: docs/index-section-map.md
const MN=['January','February','March','April','May','June','July','August','September','October','November','December'];
const SPLITS=[
  {id:'pplul',name:'PPL / Upper-Lower',days:['push','pull','legs','upper','lower'],desc:'5-day split — Push, Pull, Legs, Upper, Lower'},
  {id:'bro',name:'5-Day Bro Split',days:['legs','chest','back','shoulders','arms'],desc:'5-day split — one muscle group per day'},
  {id:'alt',name:'Alternating Legs/Push/Pull',days:['legs-a','push','legs-b','pull'],desc:'4-day rotation — Legs A, Push, Legs B, Pull'},
  {id:'ul',name:'Upper / Lower',days:['upper','lower-a','lower-b'],desc:'Rotating Upper, Lower A (Legs), Lower B (Lower)'},
  {id:'fb',name:'Full Body',days:['fullbody'],desc:'Single full-body session repeated'}
];
const SPLIT_FREQ={2:'ul',3:'fb',4:'ul',5:'pplul',6:'bro'};
const DC={push:'#29506D',pull:'#2F6B4F',legs:'#946F17','legs-a':'#946F17','legs-b':'#6B4A87',upper:'#4A5688','lower-a':'#946F17','lower-b':'#6B4A87',lower:'#6B4A87',chest:'#8C3A5E',back:'#2F6B4F',shoulders:'#29506D',arms:'#A24A2E',fullbody:'#29506D'};
const DI={push:'ti-trending-up',pull:'ti-arrows-down-up',legs:'ti-run','legs-a':'ti-run','legs-b':'ti-run',upper:'ti-body-scan','lower-a':'ti-run','lower-b':'ti-run',lower:'ti-run',chest:'ti-heart',back:'ti-arrow-back-up',shoulders:'ti-antenna',arms:'ti-hand-grab',fullbody:'ti-player-play'};
const MACHINE_EX=['Hack squat','Plate-loaded standing calf raise'];
// Exercises on the same physical machine share one saved base weight.
function mwKey(name){return /^Smith machine /.test(name)?'Smith machine':/^Hack squat( calf raise)?$/.test(name)?'Hack squat':name;}
function migrateMW(){let ch=false;Object.keys(ST.mw).forEach(k=>{const g=mwKey(k);if(g!==k){if(ST.mw[g]===undefined)ST.mw[g]=ST.mw[k];delete ST.mw[k];ch=true;}});if(ch)saveData();}

// ═══ EXERCISE DATABASE ═══
const EX={
  // MALE PPL/UL
  push_m:[
    {name:'Incline barbell chest press',mg:'chest',yt:'incline+barbell+chest+press+form',wu:true,baseW:60},
    {name:'Bench dumbbell chest press',mg:'chest',note:'each hand',yt:'dumbbell+bench+press+form',wu:false,baseW:25},
    {name:'Dumbbell fly',mg:'chest',yt:'dumbbell+chest+fly+form',wu:false,baseW:12.5},
    {name:'Seated dumbbell shoulder press',mg:'shoulders',yt:'seated+dumbbell+shoulder+press+form',wu:true,baseW:20},
    {name:'Dumbbell lateral raise',mg:'shoulders',yt:'dumbbell+lateral+raise+form',wu:false,baseW:10},
    {name:'Triceps pushdown',mg:'triceps',yt:'cable+triceps+pushdown+form',wu:true,baseW:50},
    {name:'Cable rope tricep extension',mg:'triceps',yt:'cable+rope+tricep+extension+form',wu:false,baseW:30}
  ],
  pull_m:[
    {name:'Lat pulldown',mg:'back',yt:'lat+pulldown+proper+form',wu:true,baseW:50},
    {name:'Reverse grip pulldown',mg:'back',yt:'reverse+grip+lat+pulldown+form',wu:false,baseW:50},
    {name:'Seated cable row',mg:'back',yt:'seated+cable+row+form',wu:false,baseW:50},
    {name:'Cable face pull',mg:'rear_delts',yt:'cable+face+pull+rear+delt+form',wu:true,baseW:40},
    {name:'Incline bench dumbbell rear delt fly',mg:'rear_delts',note:'each hand',yt:'incline+dumbbell+rear+delt+fly+form',wu:false,baseW:8},
    {name:'Dumbbell bicep curl',mg:'biceps',note:'each hand',yt:'dumbbell+bicep+curl+form',wu:true,baseW:10},
    {name:'Hammer curls',mg:'biceps',note:'each hand',yt:'hammer+curl+form+tutorial',wu:false,baseW:10}
  ],
  legs_m:[
    {name:'Machine seated crunch',mg:'core',yt:'machine+ab+crunch+form',wu:true,baseW:50},
    {name:'Hanging leg raise',mg:'core',note:'bodyweight',yt:'vertical+leg+raise+abs+form',wu:false,baseW:0},
    {name:'Plate-loaded standing calf raise',mg:'calves',yt:'standing+calf+raise+form',wu:true,baseW:200,machine:true},
    {name:'Hack squat',mg:'quads',yt:'hack+squat+machine+form',wu:true,baseW:140,machine:true},
    {name:'Lying hamstring curl',mg:'hamstrings',yt:'lying+leg+curl+hamstring+form',wu:true,baseW:60},
    {name:'Dumbbell lunge',mg:'quads',note:'each hand',yt:'dumbbell+lunge+proper+form',wu:false,baseW:17.5},
    {name:'Machine adduction',mg:'adductors',yt:'hip+adduction+machine+inner+thigh',wu:true,baseW:50}
  ],
  upper_m:[
    {name:'Incline barbell chest press',mg:'chest',yt:'incline+barbell+chest+press+form',wu:true,baseW:60},
    {name:'Lat pulldown',mg:'back',yt:'lat+pulldown+proper+form',wu:true,baseW:50},
    {name:'Seated dumbbell shoulder press',mg:'shoulders',yt:'seated+dumbbell+shoulder+press+form',wu:true,baseW:20},
    {name:'Cable face pull',mg:'rear_delts',yt:'cable+face+pull+rear+delt+form',wu:true,baseW:40},
    {name:'Triceps pushdown',mg:'triceps',yt:'cable+triceps+pushdown+form',wu:true,baseW:50},
    {name:'Dumbbell bicep curl',mg:'biceps',note:'each hand',yt:'dumbbell+bicep+curl+form',wu:true,baseW:10}
  ],
  lower_m:[
    {name:'Machine seated crunch',mg:'core',yt:'machine+ab+crunch+form',wu:true,baseW:50},
    {name:'Hanging leg raise',mg:'core',note:'bodyweight',yt:'vertical+leg+raise+abs+form',wu:false,baseW:0},
    {name:'Hack squat',mg:'quads',yt:'hack+squat+machine+form',wu:true,baseW:140,machine:true},
    {name:'Lying hamstring curl',mg:'hamstrings',yt:'lying+leg+curl+hamstring+form',wu:true,baseW:60},
    {name:'Dumbbell lunge',mg:'quads',note:'each hand',yt:'dumbbell+lunge+proper+form',wu:false,baseW:17.5},
    {name:'Machine abduction',mg:'abductors',yt:'hip+abduction+machine+outer+thigh',wu:true,baseW:50}
  ],
  // FEMALE PPL/UL
  push_f:[
    {name:'Incline bench dumbbell press',mg:'chest',note:'each hand',yt:'incline+dumbbell+press+form',wu:true,baseW:10},
    {name:'Bench dumbbell chest press',mg:'chest',note:'each hand',yt:'dumbbell+bench+press+form',wu:false,baseW:10},
    {name:'Seated dumbbell shoulder press',mg:'shoulders',note:'each hand',yt:'seated+dumbbell+shoulder+press+form',wu:true,baseW:8},
    {name:'Dumbbell lateral raise',mg:'shoulders',note:'each hand',yt:'dumbbell+lateral+raise+form',wu:false,baseW:5},
    {name:'Dumbbell skull crusher',mg:'triceps',yt:'dumbbell+skull+crusher+lying+tricep+extension',wu:true,baseW:8},
    {name:'Single-arm dumbbell overhead tricep extension',mg:'triceps',note:'each hand',yt:'single+arm+dumbbell+overhead+tricep+extension',wu:false,baseW:6}
  ],
  pull_f:[
    {name:'Lat pulldown',mg:'back',yt:'lat+pulldown+proper+form',wu:true,baseW:25},
    {name:'Seated cable row',mg:'back',yt:'seated+cable+row+form',wu:false,baseW:25},
    {name:'Cable face pull',mg:'rear_delts',yt:'cable+face+pull+rear+delt+form',wu:true,baseW:15},
    {name:'Dumbbell shrug',mg:'traps',note:'each hand',yt:'dumbbell+shrug+form+tutorial',wu:false,baseW:12},
    {name:'Dumbbell bicep curl',mg:'biceps',note:'each hand',yt:'dumbbell+bicep+curl+form',wu:true,baseW:6},
    {name:'Hammer curls',mg:'biceps',note:'each hand',yt:'hammer+curl+form+tutorial',wu:false,baseW:6}
  ],
  legs_f:[
    {name:'Decline sit-ups',mg:'core',note:'bodyweight',yt:'decline+sit+up+form+tutorial',wu:false,baseW:0},
    {name:'Leg raise',mg:'core',note:'bodyweight',yt:'hanging+leg+raise+abs+form',wu:false,baseW:0},
    {name:'Leg press calf raise',mg:'calves',yt:'leg+press+calf+raise+form',wu:true,baseW:60},
    {name:'Leg press',mg:'quads',yt:'leg+press+machine+form+tutorial',wu:true,baseW:60},
    {name:'Lying hamstring curl',mg:'hamstrings',yt:'lying+leg+curl+hamstring+form',wu:true,baseW:25},
    {name:'Dumbbell lunge',mg:'quads',note:'each hand',yt:'dumbbell+lunge+proper+form',wu:false,baseW:8},
    {name:'Machine adduction',mg:'adductors',yt:'hip+adduction+machine+inner+thigh',wu:true,baseW:25}
  ],
  upper_f:[
    {name:'Bench dumbbell chest press',mg:'chest',note:'each hand',yt:'dumbbell+bench+press+form',wu:true,baseW:10},
    {name:'Lat pulldown',mg:'back',yt:'lat+pulldown+proper+form',wu:true,baseW:25},
    {name:'Seated dumbbell shoulder press',mg:'shoulders',note:'each hand',yt:'seated+dumbbell+shoulder+press+form',wu:true,baseW:8},
    {name:'Cable face pull',mg:'rear_delts',yt:'cable+face+pull+rear+delt+form',wu:false,baseW:15},
    {name:'Dumbbell skull crusher',mg:'triceps',yt:'dumbbell+skull+crusher+lying+tricep+extension',wu:true,baseW:8},
    {name:'Dumbbell bicep curl',mg:'biceps',note:'each hand',yt:'dumbbell+bicep+curl+form',wu:true,baseW:6}
  ],
  lower_f:[
    {name:'Decline sit-ups',mg:'core',note:'bodyweight',yt:'decline+sit+up+form+tutorial',wu:false,baseW:0},
    {name:'Leg raise',mg:'core',note:'bodyweight',yt:'hanging+leg+raise+abs+form',wu:false,baseW:0},
    {name:'Leg press',mg:'quads',yt:'leg+press+machine+form+tutorial',wu:true,baseW:60},
    {name:'Lying hamstring curl',mg:'hamstrings',yt:'lying+leg+curl+hamstring+form',wu:true,baseW:25},
    {name:'Dumbbell lunge',mg:'quads',note:'each hand',yt:'dumbbell+lunge+proper+form',wu:false,baseW:8},
    {name:'Machine abduction',mg:'abductors',yt:'hip+abduction+machine+outer+thigh',wu:true,baseW:25}
  ],
  // BRO SPLIT (male exercises used for both)
  bro_legs:[
    {name:'Machine seated crunch',mg:'core',yt:'machine+ab+crunch+form',wu:true,baseW:50},
    {name:'Hanging leg raise',mg:'core',note:'bodyweight',yt:'vertical+leg+raise+abs+form',wu:false,baseW:0},
    {name:'Plate-loaded standing calf raise',mg:'calves',yt:'standing+calf+raise+form',wu:true,baseW:200,machine:true},
    {name:'Hack squat',mg:'quads',yt:'hack+squat+machine+form',wu:true,baseW:140,machine:true},
    {name:'Lying hamstring curl',mg:'hamstrings',yt:'lying+leg+curl+hamstring+form',wu:true,baseW:60},
    {name:'Dumbbell lunge',mg:'quads',note:'each hand',yt:'dumbbell+lunge+proper+form',wu:false,baseW:17.5}
  ],
  bro_chest:[
    {name:'Incline barbell chest press',mg:'chest',yt:'incline+barbell+chest+press+form',wu:true,baseW:60},
    {name:'Dumbbell fly',mg:'chest',yt:'dumbbell+chest+fly+form',wu:false,baseW:12.5},
    {name:'Dumbbell pullover',mg:'chest',yt:'dumbbell+pullover+form',wu:false,baseW:20}
  ],
  bro_back:[
    {name:'Lat pulldown',mg:'back',yt:'lat+pulldown+proper+form',wu:true,baseW:50},
    {name:'Reverse grip pulldown',mg:'back',yt:'reverse+grip+lat+pulldown+form',wu:false,baseW:50},
    {name:'Seated cable row',mg:'back',yt:'seated+cable+row+form',wu:false,baseW:50},
    {name:'Straight arm cable pulldown',mg:'back',yt:'straight+arm+cable+pulldown+form',wu:false,baseW:30}
  ],
  bro_shoulders:[
    {name:'Seated dumbbell shoulder press',mg:'shoulders',yt:'seated+dumbbell+shoulder+press+form',wu:true,baseW:20},
    {name:'Dumbbell lateral raise',mg:'shoulders',yt:'dumbbell+lateral+raise+form',wu:false,baseW:10},
    {name:'Cable face pull',mg:'rear_delts',yt:'cable+face+pull+rear+delt+form',wu:true,baseW:40},
    {name:'Dumbbell front raise',mg:'shoulders',yt:'dumbbell+front+raise+form',wu:false,baseW:10},
    {name:'Machine rear delt fly',mg:'rear_delts',yt:'rear+delt+fly+machine+form',wu:false,baseW:30}
  ],
  bro_arms:[
    {name:'Triceps pushdown',mg:'triceps',yt:'cable+triceps+pushdown+form',wu:true,baseW:50},
    {name:'Dumbbell bicep curl',mg:'biceps',note:'each hand',yt:'dumbbell+bicep+curl+form',wu:true,baseW:10},
    {name:'Cable rope tricep extension',mg:'triceps',yt:'cable+rope+tricep+extension+form',wu:false,baseW:30},
    {name:'Hammer curls',mg:'biceps',note:'each hand',yt:'hammer+curl+form+tutorial',wu:false,baseW:10},
    {name:'Overhead cable tricep extension',mg:'triceps',yt:'overhead+cable+tricep+extension+form',wu:false,baseW:25},
    {name:'Cable bicep curl',mg:'biceps',yt:'cable+bicep+curl+form',wu:false,baseW:25}
  ],
  // FULL BODY
  fullbody:[
    {name:'Machine seated crunch',mg:'core',yt:'machine+ab+crunch+form',wu:true,baseW:50},
    {name:'Hack squat',mg:'quads',yt:'hack+squat+machine+form',wu:true,baseW:140,machine:true},
    {name:'Lying hamstring curl',mg:'hamstrings',yt:'lying+leg+curl+hamstring+form',wu:true,baseW:60},
    {name:'Plate-loaded standing calf raise',mg:'calves',yt:'standing+calf+raise+form',wu:true,baseW:200,machine:true},
    {name:'Incline barbell chest press',mg:'chest',yt:'incline+barbell+chest+press+form',wu:true,baseW:60},
    {name:'Lat pulldown',mg:'back',yt:'lat+pulldown+proper+form',wu:true,baseW:50},
    {name:'Seated dumbbell shoulder press',mg:'shoulders',yt:'seated+dumbbell+shoulder+press+form',wu:true,baseW:20},
    {name:'Triceps pushdown',mg:'triceps',yt:'cable+triceps+pushdown+form',wu:true,baseW:50},
    {name:'Dumbbell bicep curl',mg:'biceps',note:'each hand',yt:'dumbbell+bicep+curl+form',wu:true,baseW:10}
  ],
  // SUBSTITUTION POOL (not part of any default day — available via exercise-swap)
  sub:[
    {name:'Flat barbell bench press',mg:'chest',yt:'flat+barbell+bench+press+form',wu:true,baseW:60},
    {name:'Decline dumbbell press',mg:'chest',note:'each hand',yt:'decline+dumbbell+press+form',wu:false,baseW:25},
    {name:'Cable chest fly',mg:'chest',yt:'cable+chest+fly+form',wu:false,baseW:20},
    {name:'Machine chest press',mg:'chest',yt:'machine+chest+press+form',wu:true,baseW:40,machine:true},
    {name:'Push-ups',mg:'chest',note:'bodyweight',yt:'push+up+proper+form',wu:false,baseW:0},
    {name:'Barbell row',mg:'back',yt:'barbell+row+form',wu:true,baseW:50},
    {name:'Single-arm dumbbell row',mg:'back',note:'each hand',yt:'single+arm+dumbbell+row+form',wu:false,baseW:20},
    {name:'Chest-supported machine row',mg:'back',yt:'chest+supported+row+machine+form',wu:false,baseW:40,machine:true},
    {name:'Pull-ups',mg:'back',note:'bodyweight',yt:'pull+up+proper+form',wu:false,baseW:0},
    {name:'Barbell overhead press',mg:'shoulders',yt:'barbell+overhead+press+form',wu:true,baseW:30},
    {name:'Machine shoulder press',mg:'shoulders',yt:'machine+shoulder+press+form',wu:false,baseW:30,machine:true},
    {name:'Cable lateral raise',mg:'shoulders',yt:'cable+lateral+raise+form',wu:false,baseW:10},
    {name:'Arnold press',mg:'shoulders',note:'each hand',yt:'arnold+press+form',wu:false,baseW:10},
    {name:'Barbell curl',mg:'biceps',yt:'barbell+curl+form',wu:false,baseW:20},
    {name:'Preacher curl',mg:'biceps',yt:'preacher+curl+form',wu:false,baseW:20},
    {name:'Cable rope hammer curl',mg:'biceps',yt:'cable+rope+hammer+curl+form',wu:false,baseW:20},
    {name:'Close-grip bench press',mg:'triceps',yt:'close+grip+bench+press+form',wu:false,baseW:40},
    {name:'Single-arm tricep kickback',mg:'triceps',note:'each hand',yt:'tricep+kickback+form',wu:false,baseW:6},
    {name:'Tricep dips',mg:'triceps',note:'bodyweight',yt:'tricep+dips+form',wu:false,baseW:0},
    {name:'Barbell shrug',mg:'traps',yt:'barbell+shrug+form',wu:false,baseW:40},
    {name:'Plank',mg:'core',note:'bodyweight',yt:'plank+proper+form',wu:false,baseW:0,holdSecs:true},
    {name:'Cable crunch',mg:'core',yt:'cable+crunch+kneeling+form',wu:false,baseW:25},
    {name:'Leg extension',mg:'quads',yt:'leg+extension+machine+form',wu:true,baseW:40,machine:true},
    {name:'Barbell back squat',mg:'quads',yt:'barbell+back+squat+form',wu:true,baseW:60},
    {name:'Bulgarian split squat',mg:'quads',note:'each hand',yt:'bulgarian+split+squat+form',wu:false,baseW:10},
    {name:'Seated hamstring curl',mg:'hamstrings',yt:'seated+hamstring+curl+machine+form',wu:true,baseW:35,machine:true},
    {name:'Romanian deadlift',mg:'hamstrings',yt:'romanian+deadlift+form',wu:false,baseW:50},
    {name:'Smith machine Romanian deadlift',mg:'hamstrings',yt:'smith+machine+romanian+deadlift+form',wu:false,baseW:50,machine:true},
    {name:'Seated calf raise',mg:'calves',yt:'seated+calf+raise+machine+form',wu:false,baseW:60,machine:true},
    {name:'Smith machine standing calf raise',mg:'calves',yt:'smith+machine+standing+calf+raise+form',wu:false,baseW:60,machine:true},
    {name:'Machine hip thrust',mg:'glutes',yt:'machine+hip+thrust+form',wu:true,baseW:60,machine:true},
    {name:'Barbell hip thrust',mg:'glutes',yt:'barbell+hip+thrust+form',wu:true,baseW:60},
    {name:'Smith machine hip thrust',mg:'glutes',yt:'smith+machine+hip+thrust+form',wu:true,baseW:60,machine:true},
    {name:'Glute bridge',mg:'glutes',note:'bodyweight',yt:'glute+bridge+form+tutorial',wu:false,baseW:0},
    {name:'Dumbbell hip thrust',mg:'glutes',yt:'dumbbell+hip+thrust+form',wu:false,baseW:20},
    {name:'Machine chest fly',mg:'chest',yt:'machine+chest+fly+form',wu:false,baseW:40,machine:true},
    {name:'Smith machine bench press',mg:'chest',yt:'smith+machine+bench+press+form',wu:true,baseW:60,machine:true},
    {name:'Smith machine inverted row',mg:'back',note:'bodyweight',yt:'smith+machine+inverted+row+form',wu:false,baseW:0,machine:true},
    {name:'Smith machine squat',mg:'quads',yt:'smith+machine+squat+form',wu:true,baseW:60,machine:true},
    {name:'Smith machine shoulder press',mg:'shoulders',yt:'smith+machine+shoulder+press+form',wu:false,baseW:30,machine:true},
    {name:'Smith machine shrug',mg:'traps',yt:'smith+machine+shrug+form',wu:false,baseW:40,machine:true},
    {name:'Barbell skull crusher',mg:'triceps',yt:'barbell+skull+crusher+form',wu:false,baseW:30},
    {name:'Diamond push-ups',mg:'triceps',note:'bodyweight',yt:'diamond+push+up+form',wu:false,baseW:0},
    {name:'Dumbbell Romanian deadlift',mg:'hamstrings',note:'each hand',yt:'dumbbell+romanian+deadlift+form',wu:false,baseW:15},
    {name:'Dumbbell standing calf raise',mg:'calves',note:'each hand',yt:'dumbbell+standing+calf+raise+form',wu:false,baseW:20},
    {name:'Pike push-ups',mg:'shoulders',note:'bodyweight',yt:'pike+push+up+shoulder+form',wu:false,baseW:0},
    {name:'Russian twist',mg:'core',yt:'russian+twist+core+form',wu:false,baseW:0},
    {name:'Mountain climbers',mg:'core',note:'bodyweight',yt:'mountain+climbers+form+tutorial',wu:false,baseW:0},
    {name:'Bent-over dumbbell reverse fly',mg:'rear_delts',note:'each hand',yt:'dumbbell+reverse+fly+standing+form',wu:false,baseW:8},
    {name:'Dumbbell wrist curl',mg:'forearms',note:'each hand',yt:'dumbbell+wrist+curl+form',wu:false,baseW:8},
    {name:'Dumbbell reverse wrist curl',mg:'forearms',note:'each hand',yt:'dumbbell+reverse+wrist+curl+form',wu:false,baseW:6},
    {name:'Dead hang',mg:'forearms',note:'bodyweight',yt:'dead+hang+forearm+grip+form',wu:false,baseW:0,holdSecs:true},
    {name:'Chin-ups',mg:'back',note:'bodyweight',yt:'chin+ups+proper+form',wu:false,baseW:0},
    {name:'Wide-grip cable row',mg:'back',yt:'wide+grip+cable+row+form',wu:false,baseW:50},
    {name:'Cable tricep kickback',mg:'triceps',note:'each hand',yt:'cable+tricep+kickback+form',wu:false,baseW:8},
    {name:'Dumbbell sumo squat',mg:'quads',yt:'dumbbell+sumo+squat+goblet+form',wu:false,baseW:20},
    {name:'Single-arm cable fly',mg:'chest',note:'each hand',yt:'single+arm+cable+chest+fly+form',wu:false,baseW:10},
    {name:'EZ bar front raise',mg:'shoulders',yt:'ez+bar+front+raise+form',wu:false,baseW:10},
    {name:'Hack squat calf raise',mg:'calves',yt:'hack+squat+calf+raise+form',wu:false,baseW:80,machine:true},
    {name:'Back extension',mg:'hamstrings',note:'bodyweight',yt:'back+extension+hyperextension+form',wu:false,baseW:0},
    // v1.7.0 additions (user-picked batch of 23)
    {name:'Barbell front squat',mg:'quads',yt:'barbell+front+squat+form',wu:true,baseW:50},
    {name:'Goblet squat',mg:'quads',yt:'goblet+squat+dumbbell+form',wu:false,baseW:20},
    {name:'Walking lunge',mg:'quads',note:'each hand',yt:'walking+lunge+dumbbell+form',wu:false,baseW:12.5},
    {name:'Dumbbell step-up',mg:'quads',note:'each hand',yt:'dumbbell+step+up+form',wu:false,baseW:12.5},
    {name:'Barbell deadlift',mg:'hamstrings',yt:'barbell+deadlift+proper+form',wu:true,baseW:80},
    {name:'Cable glute kickback',mg:'glutes',yt:'cable+glute+kickback+form',wu:false,baseW:15},
    {name:'T-bar row',mg:'back',yt:'t+bar+row+proper+form',wu:true,baseW:40,machine:true},
    {name:'Machine-assisted pull-up',mg:'back',note:'assist weight',yt:'assisted+pull+up+machine+form',wu:false,baseW:30,noPR:true},
    {name:'Single-arm lat pulldown',mg:'back',note:'each hand',yt:'single+arm+lat+pulldown+form',wu:false,baseW:25},
    {name:'Chest dips',mg:'chest',note:'bodyweight',yt:'chest+dips+lean+forward+form',wu:false,baseW:0},
    {name:'Barbell upright row',mg:'shoulders',yt:'barbell+upright+row+form',wu:false,baseW:25},
    {name:'Machine lateral raise',mg:'shoulders',yt:'machine+lateral+raise+form',wu:false,baseW:30},
    {name:'Barbell push press',mg:'shoulders',yt:'barbell+push+press+form',wu:true,baseW:40},
    {name:'EZ bar curl',mg:'biceps',yt:'ez+bar+curl+form',wu:false,baseW:20},
    {name:'Incline dumbbell curl',mg:'biceps',note:'each hand',yt:'incline+dumbbell+curl+form',wu:false,baseW:8},
    {name:'Concentration curl',mg:'biceps',note:'each hand',yt:'concentration+curl+form',wu:false,baseW:8},
    {name:'Reverse EZ bar curl',mg:'forearms',yt:'reverse+ez+bar+curl+form',wu:false,baseW:15},
    {name:'Machine preacher curl',mg:'biceps',yt:'machine+preacher+curl+form',wu:false,baseW:25},
    {name:'Overhead EZ bar tricep extension',mg:'triceps',yt:'overhead+ez+bar+tricep+extension+form',wu:false,baseW:20},
    {name:'Ab wheel rollout',mg:'core',note:'bodyweight',yt:'ab+wheel+rollout+form',wu:false,baseW:0},
    {name:'Side plank',mg:'core',note:'bodyweight',yt:'side+plank+proper+form',wu:false,baseW:0,holdSecs:true},
    {name:'Bicycle crunch',mg:'core',note:'bodyweight',yt:'bicycle+crunch+proper+form',wu:false,baseW:0},
    {name:'Farmers carry',mg:'forearms',note:'each hand',yt:'farmers+carry+dumbbell+form',wu:false,baseW:24,holdSecs:true},
    // v2.2.0 — chest (13)
    {name:'Decline barbell bench press',mg:'chest',yt:'decline+barbell+bench+press+form',wu:true,baseW:60},
    {name:'Barbell floor press',mg:'chest',yt:'barbell+floor+press+form',wu:false,baseW:50},
    {name:'Barbell pullover',mg:'chest',yt:'barbell+pullover+chest+form',wu:false,baseW:25},
    {name:'Incline dumbbell fly',mg:'chest',note:'each hand',yt:'incline+dumbbell+fly+form',wu:false,baseW:10},
    {name:'Decline dumbbell fly',mg:'chest',note:'each hand',yt:'decline+dumbbell+fly+form',wu:false,baseW:10},
    {name:'Dumbbell floor press',mg:'chest',note:'each hand',yt:'dumbbell+floor+press+form',wu:false,baseW:15},
    {name:'Neutral-grip dumbbell press',mg:'chest',note:'each hand',yt:'neutral+grip+dumbbell+press+form',wu:true,baseW:20},
    {name:'Smith machine incline press',mg:'chest',yt:'smith+machine+incline+press+form',wu:true,baseW:40,machine:true},
    {name:'Machine-assisted dip',mg:'chest',note:'assist weight',yt:'assisted+dip+machine+form',wu:false,baseW:30,noPR:true},
    {name:'Cable crossover',mg:'chest',yt:'cable+crossover+high+to+low+form',wu:false,baseW:15},
    {name:'Cable low-to-high fly',mg:'chest',yt:'cable+low+to+high+fly+form',wu:false,baseW:12.5},
    {name:'Decline push-ups',mg:'chest',note:'bodyweight',yt:'decline+push+up+form',wu:false,baseW:0},
    {name:'Wide-grip push-ups',mg:'chest',note:'bodyweight',yt:'wide+grip+push+up+form',wu:false,baseW:0},
    // v2.2.0 — back (12)
    {name:'Pendlay row',mg:'back',yt:'pendlay+row+form',wu:true,baseW:50},
    {name:'Rack pull',mg:'back',yt:'rack+pull+form+tutorial',wu:true,baseW:80},
    {name:'Yates row',mg:'back',yt:'yates+row+underhand+row+form',wu:false,baseW:50},
    {name:'Chest-supported dumbbell row',mg:'back',note:'each hand',yt:'chest+supported+dumbbell+row+form',wu:false,baseW:20},
    {name:'Incline dumbbell row',mg:'back',note:'each hand',yt:'incline+bench+dumbbell+row+form',wu:false,baseW:18},
    {name:'Kroc row',mg:'back',note:'each hand',yt:'kroc+row+heavy+dumbbell+row+form',wu:false,baseW:30},
    {name:'Machine high row',mg:'back',yt:'machine+high+row+form',wu:false,baseW:40,machine:true},
    {name:'Machine pullover',mg:'back',yt:'machine+pullover+form',wu:false,baseW:35,machine:true},
    {name:'Cable pullover',mg:'back',yt:'cable+pullover+lat+form',wu:false,baseW:20},
    {name:'Inverted row',mg:'back',note:'bodyweight',yt:'inverted+row+bodyweight+form',wu:false,baseW:0},
    {name:'Superman',mg:'back',note:'bodyweight',yt:'superman+exercise+form',wu:false,baseW:0},
    {name:'Scapular pull-ups',mg:'back',note:'bodyweight',yt:'scapular+pull+up+form',wu:false,baseW:0},
    // v2.2.0 — shoulders (6)
    {name:'Landmine press',mg:'shoulders',yt:'landmine+press+form',wu:false,baseW:20},
    {name:'Barbell seated shoulder press',mg:'shoulders',yt:'seated+barbell+shoulder+press+form',wu:true,baseW:30},
    {name:'Dumbbell scaption raise',mg:'shoulders',note:'each hand',yt:'dumbbell+scaption+raise+form',wu:false,baseW:6},
    {name:'Cable Y-raise',mg:'shoulders',yt:'cable+y+raise+shoulder+form',wu:false,baseW:5},
    {name:'Cable front raise',mg:'shoulders',yt:'cable+front+raise+form',wu:false,baseW:10},
    {name:'Plate-loaded shoulder press',mg:'shoulders',yt:'plate+loaded+shoulder+press+machine+form',wu:true,baseW:30,machine:true},
    // v2.2.0 — biceps (8)
    {name:'Drag curl',mg:'biceps',yt:'drag+curl+barbell+form',wu:false,baseW:20},
    {name:'21s barbell curl',mg:'biceps',yt:'21s+barbell+curl+form',wu:false,baseW:20},
    {name:'Wide-grip barbell curl',mg:'biceps',yt:'wide+grip+barbell+curl+form',wu:false,baseW:20},
    {name:'Zottman curl',mg:'biceps',note:'each hand',yt:'zottman+curl+form',wu:false,baseW:8},
    {name:'Spider curl',mg:'biceps',note:'each hand',yt:'dumbbell+spider+curl+form',wu:false,baseW:8},
    {name:'Cross-body hammer curl',mg:'biceps',note:'each hand',yt:'cross+body+hammer+curl+form',wu:false,baseW:10},
    {name:'Plate-loaded machine bicep curl',mg:'biceps',yt:'plate+loaded+bicep+curl+machine+form',wu:false,baseW:25,machine:true},
    {name:'Cable spider curl',mg:'biceps',yt:'cable+spider+curl+form',wu:false,baseW:20},
    // v2.2.0 — triceps (4)
    {name:'Dumbbell close-grip floor press',mg:'triceps',note:'each hand',yt:'dumbbell+close+grip+floor+press+form',wu:false,baseW:15},
    {name:'Seated machine tricep extension',mg:'triceps',yt:'seated+machine+tricep+extension+form',wu:false,baseW:30,machine:true},
    {name:'Bench dips',mg:'triceps',note:'bodyweight',yt:'bench+dips+tricep+form',wu:false,baseW:0},
    {name:'Close-grip push-ups',mg:'triceps',note:'bodyweight',yt:'close+grip+push+up+tricep+form',wu:false,baseW:0},
    // v2.2.0 — forearms (4)
    {name:'Barbell reverse curl',mg:'forearms',yt:'barbell+reverse+curl+form',wu:false,baseW:15},
    {name:'Dumbbell finger curl',mg:'forearms',note:'each hand',yt:'dumbbell+finger+curl+form',wu:false,baseW:6},
    {name:'Cable wrist curl',mg:'forearms',yt:'cable+wrist+curl+form',wu:false,baseW:15},
    {name:'Cable reverse wrist curl',mg:'forearms',yt:'cable+reverse+wrist+curl+form',wu:false,baseW:10},
    // v2.2.0 — rear delts (4)
    {name:'Bench-supported seated reverse fly',mg:'rear_delts',note:'each hand',yt:'seated+bench+supported+reverse+fly+form',wu:false,baseW:6},
    {name:'Prone dumbbell Y-raise',mg:'rear_delts',note:'each hand',yt:'prone+dumbbell+y+raise+form',wu:false,baseW:4},
    {name:'Cable reverse fly',mg:'rear_delts',yt:'cable+reverse+fly+rear+delt+form',wu:false,baseW:10},
    {name:'Cross-cable reverse fly',mg:'rear_delts',yt:'cross+cable+reverse+fly+form',wu:false,baseW:10},
    // v2.2.0 — traps (4)
    {name:'Barbell high pull',mg:'traps',yt:'barbell+high+pull+form',wu:false,baseW:30},
    {name:'Dumbbell high pull',mg:'traps',note:'each hand',yt:'dumbbell+high+pull+form',wu:false,baseW:12},
    {name:'Cable shrug',mg:'traps',yt:'cable+shrug+form',wu:false,baseW:40},
    {name:'Plate-loaded shrug',mg:'traps',yt:'plate+loaded+shrug+machine+form',wu:false,baseW:60,machine:true},
    // v2.2.0 — quads (12)
    {name:'Barbell walking lunge',mg:'quads',yt:'barbell+walking+lunge+form',wu:false,baseW:30},
    {name:'Barbell step-up',mg:'quads',yt:'barbell+step+up+form',wu:false,baseW:30},
    {name:'Box squat',mg:'quads',yt:'barbell+box+squat+form',wu:true,baseW:60},
    {name:'Dumbbell front squat',mg:'quads',note:'each hand',yt:'dumbbell+front+squat+form',wu:false,baseW:15},
    {name:'Dumbbell reverse lunge',mg:'quads',note:'each hand',yt:'dumbbell+reverse+lunge+form',wu:false,baseW:12.5},
    {name:'Heel-elevated dumbbell squat',mg:'quads',note:'each hand',yt:'heel+elevated+dumbbell+squat+form',wu:false,baseW:15},
    {name:'Belt squat',mg:'quads',yt:'belt+squat+machine+form',wu:true,baseW:60,machine:true},
    {name:'Pendulum squat',mg:'quads',yt:'pendulum+squat+machine+form',wu:true,baseW:80,machine:true},
    {name:'Vertical leg press',mg:'quads',yt:'vertical+leg+press+machine+form',wu:true,baseW:60,machine:true},
    {name:'Bodyweight squat',mg:'quads',note:'bodyweight',yt:'bodyweight+squat+form',wu:false,baseW:0},
    {name:'Jump squat',mg:'quads',note:'bodyweight',yt:'jump+squat+form+tutorial',wu:false,baseW:0},
    {name:'Wall sit',mg:'quads',note:'bodyweight',yt:'wall+sit+form+tutorial',wu:false,baseW:0,holdSecs:true},
    // v2.2.0 — hamstrings (7)
    {name:'Barbell good morning',mg:'hamstrings',yt:'barbell+good+morning+form',wu:false,baseW:30},
    {name:'Sumo deadlift',mg:'hamstrings',yt:'sumo+deadlift+form',wu:true,baseW:80},
    {name:'Stiff-leg deadlift',mg:'hamstrings',yt:'stiff+leg+deadlift+form',wu:false,baseW:50},
    {name:'Single-leg dumbbell RDL',mg:'hamstrings',note:'each hand',yt:'single+leg+dumbbell+rdl+form',wu:false,baseW:12},
    {name:'Dumbbell sumo deadlift',mg:'hamstrings',yt:'dumbbell+sumo+deadlift+form',wu:false,baseW:20},
    {name:'Standing machine hamstring curl',mg:'hamstrings',yt:'standing+machine+hamstring+curl+form',wu:true,baseW:30,machine:true},
    {name:'Cable pull-through',mg:'hamstrings',yt:'cable+pull+through+form',wu:false,baseW:30},
    // v2.2.0 — glutes (10)
    {name:'B-stance barbell hip thrust',mg:'glutes',yt:'b+stance+barbell+hip+thrust+form',wu:false,baseW:40},
    {name:'Barbell glute bridge',mg:'glutes',yt:'barbell+glute+bridge+form',wu:false,baseW:40},
    {name:'Curtsy lunge',mg:'glutes',note:'each hand',yt:'dumbbell+curtsy+lunge+form',wu:false,baseW:10},
    {name:'Dumbbell single-leg hip thrust',mg:'glutes',yt:'dumbbell+single+leg+hip+thrust+form',wu:false,baseW:12},
    {name:'45-degree hip extension machine',mg:'glutes',yt:'45+degree+hip+extension+machine+form',wu:false,baseW:20,machine:true},
    {name:'Standing plate-loaded glute kickback',mg:'glutes',yt:'standing+glute+kickback+machine+form',wu:false,baseW:20,machine:true},
    {name:'Single-leg glute bridge',mg:'glutes',note:'bodyweight',yt:'single+leg+glute+bridge+form',wu:false,baseW:0},
    {name:'Frog pump',mg:'glutes',note:'bodyweight',yt:'frog+pump+glute+form',wu:false,baseW:0},
    {name:'Donkey kicks',mg:'glutes',note:'bodyweight',yt:'donkey+kicks+glute+form',wu:false,baseW:0},
    // v2.2.0 — calves (6)
    {name:'Barbell standing calf raise',mg:'calves',yt:'barbell+standing+calf+raise+form',wu:false,baseW:40},
    {name:'Single-leg dumbbell calf raise',mg:'calves',note:'each hand',yt:'single+leg+dumbbell+calf+raise+form',wu:false,baseW:12},
    {name:'Dumbbell seated calf raise',mg:'calves',note:'each hand',yt:'dumbbell+seated+calf+raise+form',wu:false,baseW:15},
    {name:'Donkey calf raise machine',mg:'calves',yt:'donkey+calf+raise+machine+form',wu:false,baseW:60,machine:true},
    {name:'Standing bodyweight calf raise',mg:'calves',note:'bodyweight',yt:'standing+bodyweight+calf+raise+form',wu:false,baseW:0},
    {name:'Single-leg bodyweight calf raise',mg:'calves',note:'bodyweight',yt:'single+leg+bodyweight+calf+raise+form',wu:false,baseW:0},
    // v2.2.0 — adductors (3)
    {name:'Side-lying dumbbell hip adduction',mg:'adductors',yt:'side+lying+hip+adduction+dumbbell+form',wu:false,baseW:4},
    {name:'Cable hip adduction',mg:'adductors',yt:'cable+hip+adduction+form',wu:false,baseW:10},
    {name:'Sumo squat hold',mg:'adductors',note:'bodyweight',yt:'sumo+squat+hold+form',wu:false,baseW:0,holdSecs:true},
    // v2.2.0 — abductors (4)
    {name:'Cable hip abduction',mg:'abductors',yt:'cable+hip+abduction+form',wu:false,baseW:10},
    {name:'Side-lying leg raise',mg:'abductors',note:'bodyweight',yt:'side+lying+leg+raise+form',wu:false,baseW:0},
    {name:'Clamshells',mg:'abductors',note:'bodyweight',yt:'clamshell+exercise+form',wu:false,baseW:0},
    {name:'Standing hip abduction',mg:'abductors',note:'bodyweight',yt:'standing+hip+abduction+form',wu:false,baseW:0},
    // v2.2.0 — core (9)
    {name:'Dumbbell side bend',mg:'core',yt:'dumbbell+side+bend+form',wu:false,baseW:10},
    {name:'Weighted sit-up',mg:'core',yt:'weighted+sit+up+form',wu:false,baseW:8},
    {name:'Cable woodchopper',mg:'core',yt:'cable+woodchopper+form',wu:false,baseW:15},
    {name:'Captains chair leg raise',mg:'core',note:'bodyweight',yt:'captains+chair+leg+raise+form',wu:false,baseW:0},
    {name:'Hollow body hold',mg:'core',note:'bodyweight',yt:'hollow+body+hold+form',wu:false,baseW:0,holdSecs:true},
    {name:'V-ups',mg:'core',note:'bodyweight',yt:'v+ups+core+form',wu:false,baseW:0}
  ]
};

function getDayExercises(dayId,sex){
  const s=sex||'male';
  const isFemale=s==='female';
  const map={
    push: isFemale?EX.push_f:EX.push_m,
    pull: isFemale?EX.pull_f:EX.pull_m,
    legs: isFemale?EX.legs_f:EX.legs_m,
    'legs-a': isFemale?EX.legs_f:EX.legs_m,
    upper: isFemale?EX.upper_f:EX.upper_m,
    lower: isFemale?EX.lower_f:EX.lower_m,
    'lower-a': isFemale?EX.legs_f:EX.legs_m,
    'lower-b': isFemale?EX.lower_f:EX.lower_m,
    'legs-b': isFemale?EX.lower_f:EX.lower_m,
    chest: EX.bro_chest,
    back: EX.bro_back,
    shoulders: EX.bro_shoulders,
    arms: EX.bro_arms,
    'bro-legs': EX.bro_legs,
    fullbody: EX.fullbody
  };
  if(dayId==='legs'&&CFG.split==='bro')return EX.bro_legs;
  return map[dayId]||EX.fullbody;
}
function isCustomDay(dayId){return typeof dayId==='string'&&dayId.indexOf('cd_')===0;}
function getEffectiveDayExercises(dayId){
  const custom=CFG.customDays[dayId];
  const links=CFG.dayLinks[dayId];
  const plan=(CFG.dayPlan||{})[dayId];
  let list;
  if(isCustomDay(dayId)){list=(custom||[]).filter(n=>EXPOOL[n]).map(poolEx);}
  else if(custom&&custom.length&&custom.every(n=>EXPOOL[n])){list=custom.map(poolEx);}
  else list=getDayExercises(dayId,CFG.sex);
  return list.map((ex,i)=>{
    let out=ex;
    if(links&&links.length&&links[i])out={...out,linkNext:true};
    const p=plan&&plan[ex.name];
    if(p)out={...out,plannedW:p.w,plannedR:p.r,plannedSets:p.sets};
    return out;
  });
}

const DAY_NAMES_JA={
  push:'プッシュデイ',pull:'プルデイ',legs:'レッグデイ','legs-a':'レッグデイ A',
  'legs-b':'レッグデイ B',upper:'アッパーデイ','lower-a':'ロワーデイ A',
  'lower-b':'ロワーデイ B',lower:'ロワーデイ',chest:'チェストデイ',
  back:'バックデイ',shoulders:'ショルダーデイ',arms:'アームデイ',fullbody:'全身'
};
const DAY_NAMES_KO={
  push:'푸시 데이',pull:'풀 데이',legs:'레그 데이','legs-a':'레그 데이 A',
  'legs-b':'레그 데이 B',upper:'어퍼 데이','lower-a':'로어 데이 A',
  'lower-b':'로어 데이 B',lower:'로어 데이',chest:'가슴 데이',
  back:'등 데이',shoulders:'어깨 데이',arms:'팔 데이',fullbody:'전신'
};
function getDayName(dayId){
  if(isCustomDay(dayId)&&CFG.customProgram){const d=CFG.customProgram.days.find(x=>x.id===dayId);if(d)return d.name;}
  const nm={
    push:'Push day',pull:'Pull day',legs:'Leg day','legs-a':'Leg day A',
    'legs-b':'Leg day B',upper:'Upper day','lower-a':'Lower day A',
    'lower-b':'Lower day B',lower:'Lower day',chest:'Chest day',
    back:'Back day',shoulders:'Shoulder day',arms:'Arms day',fullbody:'Full Body'
  };
  if(CFG.lang==='ja'&&DAY_NAMES_JA[dayId])return DAY_NAMES_JA[dayId];
  if(CFG.lang==='ko'&&DAY_NAMES_KO[dayId])return DAY_NAMES_KO[dayId];
  return nm[dayId]||dayId;
}

// ═══ EXERCISE POOL (for swap-exercise picker) ═══
let EXPOOL={},EXPOOL_BY_MG={};
// Equipment ordering for pickers: barbell → dumbbell → machine → cable → other → bodyweight.
// No explicit equipment field exists, so classify from the name (plus the
// machine flag, and note:'each hand' which implies dumbbells).
const EQUIP_LABELS=['Barbell','Dumbbell','Machine','Cable','Other','Bodyweight'];
const MG_LIST=['chest','back','shoulders','biceps','triceps','forearms','rear_delts','traps','quads','hamstrings','glutes','calves','adductors','abductors','core'];
const EQUIP_RANK_BY_KEY={barbell:0,dumbbell:1,machine:2,cable:3,other:4,bodyweight:5};
function equipRank(ex){
  if(ex.equip&&EQUIP_RANK_BY_KEY[ex.equip]!==undefined)return EQUIP_RANK_BY_KEY[ex.equip];
  const n=ex.name.toLowerCase();
  if(/dumbbell|kettlebell|goblet/.test(n))return 1;
  if(ex.machine||/machine|smith|hack squat|pulldown|leg press|pec deck|leg extension|leg curl|hamstring curl|plate-loaded/.test(n))return 2;
  if(/barbell|ez bar|deadlift|bench press/.test(n))return 0;
  if(/cable|rope|pushdown|face pull/.test(n))return 3;
  if(ex.note==='each hand')return 1;
  if(ex.note==='bodyweight'||ex.baseW===0)return 5;
  return 4;
}
function equipSort(a,b){return equipRank(a)-equipRank(b)||a.name.localeCompare(b.name);}
function buildExercisePool(){
  Object.keys(EX).forEach(k=>{EX[k].forEach(ex=>{if(!EXPOOL[ex.name])EXPOOL[ex.name]=ex;});});
  Object.values(EXPOOL).forEach(ex=>{(EXPOOL_BY_MG[ex.mg]=EXPOOL_BY_MG[ex.mg]||[]).push(ex);});
  Object.values(EXPOOL_BY_MG).forEach(list=>list.sort(equipSort));
}
buildExercisePool();
// EXPOOL keeps each exercise's first definition, which is the men's program's;
// the women's programs list lighter defaults for the same lift. Anything that
// builds a day from pool names (swap picker, custom days) goes through poolEx().
const EXPOOL_F={};Object.keys(EX).filter(k=>/_f$/.test(k)).forEach(k=>EX[k].forEach(e=>{if(EXPOOL_F[e.name]===undefined)EXPOOL_F[e.name]=e.baseW;}));
function humanizeMG(mg){return mg.replace(/_/g,' ').replace(/\b\w/g,c=>c.toUpperCase());}
