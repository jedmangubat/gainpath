// GainPath: the exercise tips, names and instructions in all three languages
// A plain script (not a module) sharing one global scope with the other
// js/ files; index.html sets the load order. Map: docs/index-section-map.md
// ═══ PER-EXERCISE REST-SCREEN TIPS ═══
const EX_TIPS={
  "Barbell front squat": [
    "Keep your elbows high and pointing forward the entire set — if they drop, the bar rolls forward.",
    "Rest the bar on your front delts, not your wrists; fingertips just keep it in place.",
    "Stay more upright than a back squat — think chest tall, torso vertical.",
    "Drive your knees forward and out over your toes as you descend.",
    "Brace your core hard before each rep; the front rack punishes a soft torso.",
    "If wrist mobility is limited, try a cross-arm grip while keeping elbows high."
  ],
  "Goblet squat": [
    "Hug the dumbbell tight against your sternum with elbows pointing down.",
    "At the bottom, let your elbows brush the insides of your knees — that's your depth cue.",
    "Keep your heels planted; push the floor away to stand.",
    "Sit down between your hips, not back like a hinge.",
    "Keep your chest proud so the weight doesn't pull you forward.",
    "Perfect first squat — own this before loading a barbell."
  ],
  "Walking lunge": [
    "Take a long enough step that your front knee stays over your ankle.",
    "Lower the back knee toward the floor — don't just lean forward.",
    "Push through the front heel to step through into the next lunge.",
    "Keep your torso tall; the dumbbells hang quiet at your sides.",
    "Alternate legs every step — count total steps, not per leg.",
    "Shorter steps hit quads more; longer steps shift work to the glutes."
  ],
  "Dumbbell step-up": [
    "Put your whole foot on the box, not just the toes.",
    "Drive through the heel of the top leg — the floor leg only balances.",
    "Stand all the way up at the top before stepping down.",
    "Control the descent; don't drop off the box.",
    "Keep your torso tall — no diving forward over the box.",
    "Finish all reps on one leg before switching, or alternate consistently."
  ],
  "Barbell deadlift": [
    "The bar starts on the floor every rep — reset, don't bounce.",
    "Keep the bar dragging up your shins and thighs; distance from the body is wasted force.",
    "Hips and shoulders rise together — if hips shoot up first, the weight is too heavy.",
    "Lock out by squeezing your glutes, not leaning back.",
    "Brace your core like you're about to be punched before you pull.",
    "Arms are hooks: never bend your elbows to help the bar up."
  ],
  "Cable glute kickback": [
    "Hinge slightly forward and hold the tower so only the leg moves.",
    "Kick back and up in one line — squeeze the glute hard at the top.",
    "Keep your hips square; don't open them toward the working side.",
    "Don't arch the lower back to fake extra height.",
    "The knee stays nearly straight — bending it turns this into a leg curl.",
    "Slow negatives make a light stack feel heavy — control the return."
  ],
  "T-bar row": [
    "Set your hinge at 45 degrees and freeze it there for the whole set.",
    "Pull the handle to your lower chest, elbows driving up and back.",
    "Squeeze your shoulder blades together for a beat at the top.",
    "Don't stand up to move the weight — that's momentum, not back.",
    "Keep a flat back; rounding under fatigue is the #1 injury risk here.",
    "Brace your legs — they're your platform, not your engine."
  ],
  "Machine-assisted pull-up": [
    "The stack number is your assistance — progress means it goes DOWN over time.",
    "Start from a full dead hang; half reps build half a pull-up.",
    "Pull your elbows down and back rather than thinking about your chin.",
    "Keep your body vertical — no swinging or kipping on the pad.",
    "When you're down to a small assist, start testing bodyweight pull-ups.",
    "Control the way up AND the way down; the negative builds the most strength."
  ],
  "Single-arm lat pulldown": [
    "Let the working shoulder reach up for a full stretch at the top.",
    "Pull the elbow down toward your hip, not the handle to your chin.",
    "Keep your torso square — no twisting toward the cable.",
    "Match reps exactly on both sides; the weaker side sets the number.",
    "Pause a beat at the bottom with the shoulder blade pulled down.",
    "Lighter than your two-arm pulldown is correct — no cheating with lean."
  ],
  "Chest dips": [
    "Lean your torso forward about 30 degrees — upright dips hit triceps instead.",
    "Bend your knees and cross your ankles to keep the lean natural.",
    "Go down until your shoulders are near elbow level — deep, but pain-free.",
    "Let your elbows flare slightly out, unlike the tucked triceps version.",
    "Squeeze your chest to press back up; don't lock out harshly.",
    "If shoulders complain, reduce depth before reducing lean."
  ],
  "Barbell upright row": [
    "Take a grip at shoulder width — very narrow grips grind the wrists.",
    "Lead with your elbows; they stay above your wrists the whole way.",
    "Stop at upper-chest height — pulling to the chin strains the shoulders.",
    "Keep the bar close enough to almost brush your shirt.",
    "No lean-back or hip bump; strict and smooth wins here.",
    "If it pinches your shoulders, widen the grip or lower the top point."
  ],
  "Machine lateral raise": [
    "Push through your elbows into the pads, not your hands.",
    "Raise until your upper arms are parallel to the floor — no higher.",
    "Keep your shoulders pressed down; don't let your traps shrug in.",
    "Pause a moment at the top; the machine can't be cheated with swing.",
    "Lower slowly — the negative is half the exercise.",
    "Set the seat so the pivot lines up with your shoulder joint."
  ],
  "Barbell push press": [
    "Dip shallow — a quarter squat, torso perfectly vertical.",
    "Drive up hard with the legs and let the bar fly off your shoulders.",
    "Punch your head 'through the window' once the bar passes your face.",
    "Finish with the bar stacked over your mid-foot, ribs down.",
    "The dip goes straight down, never forward — a forward dip throws the bar out front.",
    "It's a leg-powered press: heavier than your strict press is the point."
  ],
  "EZ bar curl": [
    "Grip the angled sections — that slight wrist tilt is the whole reason for the bar.",
    "Pin your elbows to your ribs; only the forearms move.",
    "Curl to upper-chest height — higher just rolls your elbows forward.",
    "Lower in control for a slow count; don't let the bar drop.",
    "Stand tall — leaning back turns curls into a front raise.",
    "Keep your wrists straight; don't curl them at the top."
  ],
  "Incline dumbbell curl": [
    "Let your arms hang straight down and slightly behind you — that stretch is the point.",
    "Keep your elbows pointing at the floor as you curl; don't swing them forward.",
    "Keep your head and shoulders on the pad the whole set.",
    "Start lighter than your standing curl — the stretch position is unforgiving.",
    "Curl both arms together, smooth and controlled.",
    "Full stretch at the bottom of every rep; no half reps."
  ],
  "Concentration curl": [
    "Brace the back of your elbow into your inner thigh and keep it welded there.",
    "Curl toward your shoulder, rotating your pinky slightly up at the top.",
    "Only the forearm moves — zero torso rock, zero shoulder lift.",
    "Squeeze hard for a full second at the top.",
    "Lower until your arm is completely straight every rep.",
    "This is a strict isolation lift — light weight, perfect reps."
  ],
  "Reverse EZ bar curl": [
    "Palms down the whole set — the awkward grip is the exercise.",
    "Keep your wrists dead straight; don't let them buckle downward.",
    "Elbows pinned to your sides; curl only with the forearms.",
    "Expect to use much less weight than a normal curl — that's correct.",
    "Lower slowly; forearms grow on the negative.",
    "Grip the bar hard — crushing the bar recruits more forearm."
  ],
  "Machine preacher curl": [
    "Set the seat so your armpits hook snugly over the top of the pad.",
    "Keep your upper arms glued to the pad from full stretch to full squeeze.",
    "Extend almost fully at the bottom without slamming the stack.",
    "Don't lift your chest off the pad to grind out reps.",
    "Squeeze at the top, then take two full seconds down.",
    "The machine locks your form — use that to chase a deep burn safely."
  ],
  "Overhead EZ bar tricep extension": [
    "Keep your upper arms vertical beside your ears; only elbows bend.",
    "Lower the bar well behind your head for the full long-head stretch.",
    "Keep your elbows narrow — flaring turns it into a press.",
    "Brace your core so your lower back doesn't arch off the pad.",
    "Press back up to a full lockout directly overhead.",
    "Go lighter than pushdowns; the stretch position is brutal."
  ],
  "Ab wheel rollout": [
    "Tuck your hips slightly and squeeze your glutes before you roll.",
    "Roll out only as far as you can keep your lower back from arching.",
    "Your abs pull you back — the arms just steer the wheel.",
    "Keep your arms straight; bending them turns it into a triceps exercise.",
    "Exhale as you pull back in; brace before you roll out.",
    "Add distance gradually — a full flat rollout is an advanced feat."
  ],
  "Side plank": [
    "Stack your elbow directly under your shoulder before lifting.",
    "Lift your hips until you're one ruler-straight line from ankles to head.",
    "Squeeze the bottom-side waist the entire hold — don't just hang on the joint.",
    "Keep your neck long and gaze forward, not down.",
    "Sagging hips end the set: down means done, not 'hold it lower'.",
    "Match your time on both sides — the weaker side sets the clock."
  ],
  "Bicycle crunch": [
    "Touch fingertips to your temples — never yank your neck.",
    "Rotate your ribcage, not just your elbow — shoulder comes off the floor toward the knee.",
    "The extended leg hovers low without touching the floor.",
    "Slow pedaling beats fast flailing; two seconds per side.",
    "Keep your lower back pressed into the mat throughout.",
    "Exhale as each elbow drives toward the opposite knee."
  ],
  "Farmers carry": [
    "Walk tall: ribs stacked over hips, shoulders back and down.",
    "Crush the handles — grip is the first thing that fails, and that's the point.",
    "Take short, quick, controlled steps; no waddling side to side.",
    "Keep the dumbbells dead level; don't let one side sag.",
    "Look ahead, not at the floor.",
    "Time or distance both work — just make the weight honestly heavy."
  ],
  "Incline barbell chest press": [
    "Set the bench between 30 and 45 degrees so you target upper chest, not shoulders.",
    "Plant your feet flat on the floor and drive them down for a stable base.",
    "Pull your shoulder blades back and down into the bench before unracking.",
    "Lower the bar to your upper chest, just below the collarbone.",
    "Keep a slight arch in your lower back without flaring your ribs up.",
    "Inhale on the way down and exhale forcefully as you press up.",
    "Avoid bouncing the bar off your chest to generate momentum.",
    "Keep your wrists stacked directly over your elbows throughout the press.",
    "Use a spotter or safety pins since incline presses are harder to bail out of.",
    "Think about pressing up and slightly back toward your face, not straight up.",
    "Use the warmup set to groove your bar path before adding heavier plates.",
    "Don't let your elbows flare past a 45 to 75 degree angle from your torso."
  ],
  "Bench dumbbell chest press": [
    "Plant your feet firmly on the floor for a stable base of leverage.",
    "Retract your shoulder blades and keep them pinned to the bench throughout.",
    "Lower the dumbbells until your upper arms are level with the bench, not lower.",
    "Press the dumbbells up and slightly inward without letting them touch.",
    "Keep your wrists straight and stacked over your elbows on every rep.",
    "Exhale as you press up and inhale as you lower the dumbbells.",
    "Avoid letting your elbows flare straight out to the sides.",
    "Squeeze your chest at the top instead of locking out and resting.",
    "Control the descent instead of letting the dumbbells drop quickly.",
    "Keep a slight, natural arch in your lower back, not an exaggerated one.",
    "Get the dumbbells into position with control, not by swinging them up.",
    "Use a spotter or lighter weight near failure since dumbbells can roll inward."
  ],
  "Dumbbell fly": [
    "Use lighter dumbbells than you'd press since flys load the shoulder joint differently.",
    "Keep a slight, fixed bend in your elbows throughout the entire movement.",
    "Lower the dumbbells out to the sides until your chest feels a deep stretch.",
    "Stop the descent once your upper arms are roughly level with the bench.",
    "Bring the dumbbells back up in an arc, not a straight press path.",
    "Squeeze your chest together at the top as if hugging a barrel.",
    "Avoid straightening your elbows, which shifts strain onto the joint.",
    "Inhale as you open into the stretch and exhale as you bring it together.",
    "Keep your shoulder blades retracted so the stretch loads your chest, not your shoulders.",
    "Avoid going so heavy that you lose control at the bottom stretch position.",
    "Move slowly and deliberately rather than using momentum to fly the weights up.",
    "Stop immediately if you feel pinching or sharp pain in the front of your shoulder."
  ],
  "Incline bench dumbbell press": [
    "Set the bench to a moderate 30 to 45 degree incline to bias the upper chest.",
    "Drive your feet into the floor and keep your shoulder blades pinned back.",
    "Lower the dumbbells to the sides of your upper chest, not your neck.",
    "Press the dumbbells up and slightly together at the top of each rep.",
    "Keep your wrists neutral and stacked over your elbows throughout the lift.",
    "Exhale as you press the dumbbells up and inhale as you lower them.",
    "Avoid arching excessively, which turns the lift into a flat-bench press.",
    "Control the dumbbells into starting position rather than kicking them up with your knees.",
    "Don't let your elbows drop below shoulder level at the bottom of the rep.",
    "Use the warmup set to find your groove before loading heavier dumbbells.",
    "Keep your head and upper back in contact with the bench the whole set.",
    "Avoid letting the dumbbells drift forward over your face on the press."
  ],
  "Flat barbell bench press": [
    "Set your grip slightly wider than shoulder width for a balanced bar path.",
    "Pull your shoulder blades back and down before you unrack the bar.",
    "Plant your feet flat on the floor and drive them down throughout the lift.",
    "Lower the bar to your mid-chest, not your neck or stomach.",
    "Keep your wrists stacked over your elbows rather than bent back.",
    "Inhale and brace your core before lowering the bar each rep.",
    "Exhale as you drive the bar up off your chest.",
    "Avoid bouncing the bar off your chest to add momentum.",
    "Keep your elbows tucked around 45 to 75 degrees, not flared to 90.",
    "Use the warmup set to lock in bar path before loading more weight.",
    "Always use a spotter or safety bars when attempting heavy or max sets.",
    "Keep your hips on the bench rather than driving them up to assist the press."
  ],
  "Decline dumbbell press": [
    "Secure your legs under the footpads before lowering into the decline position.",
    "Keep your head and shoulders firmly against the bench throughout the set.",
    "Lower the dumbbells to the sides of your lower chest, not your collarbone.",
    "Press up and slightly inward, stopping just short of the dumbbells touching.",
    "Keep your wrists neutral and stacked directly over your elbows.",
    "Exhale as you press up and inhale as you lower with control.",
    "Avoid letting the dumbbells drift toward your face at the top.",
    "Use lighter loads than flat pressing since blood rushes to your head on a decline.",
    "Have a spotter hand you the dumbbells since sitting up to start is awkward.",
    "Don't let your elbows flare past 45 to 75 degrees from your torso.",
    "Keep your core braced so your torso doesn't slide on the angled bench.",
    "Sit up slowly afterward to avoid dizziness from the inverted position."
  ],
  "Cable chest fly": [
    "Set both pulleys to roughly chest height for a straight-on fly path.",
    "Stand with a staggered stance and a slight forward lean for stability.",
    "Keep a soft, fixed bend in your elbows throughout the entire movement.",
    "Bring the handles together in front of your chest, not up near your face.",
    "Squeeze your chest at the center point and pause briefly before releasing.",
    "Exhale as you bring the handles together and inhale as you open back out.",
    "Avoid letting the weight yank your arms back into an overstretched position.",
    "Keep your shoulder blades retracted so your shoulders don't round forward.",
    "Step forward slightly to keep tension on your chest at the start of the rep.",
    "Avoid using your back or torso momentum to swing the handles together.",
    "Control the eccentric instead of letting the cables snap your arms back fast.",
    "Keep your elbows slightly below shoulder height rather than pressing them up high."
  ],
  "Machine chest press": [
    "Adjust the seat so the handles line up with the middle of your chest.",
    "Keep your back and head flat against the pad throughout the press.",
    "Plant your feet flat on the floor for a stable, grounded base.",
    "Press the handles forward without locking your elbows out hard at the top.",
    "Exhale as you press out and inhale as you return with control.",
    "Avoid letting the weight stack slam down between reps.",
    "Use the warmup set to find the right seat height and grip position.",
    "Keep your wrists straight rather than bending them around the handles.",
    "Don't let your shoulders roll forward off the back pad as you press.",
    "Squeeze your chest together at full extension instead of just pushing through.",
    "Avoid arching your back off the pad to grind out extra reps.",
    "Move through a full, controlled range rather than short, partial pulses."
  ],
  "Push-ups": [
    "Keep your hands roughly shoulder-width apart with fingers spread for stability.",
    "Keep your body in a straight line from head to heels throughout.",
    "Avoid letting your hips sag or pike up out of plank position.",
    "Lower your chest until it nearly touches the floor for full range.",
    "Keep your elbows at roughly 45 degrees from your torso, not flared wide.",
    "Inhale as you lower down and exhale as you push back up.",
    "Tuck your chin slightly and keep your neck neutral, not craned forward.",
    "Brace your core and squeeze your glutes to keep your spine stable.",
    "Avoid flaring your elbows out to 90 degrees, which can strain your shoulders.",
    "Spread the load through your whole palm, not just your fingertips.",
    "Slow down the descent instead of dropping quickly toward the floor.",
    "Scale to an incline or your knees if you can't maintain full-body alignment."
  ],
  "Dumbbell pullover": [
    "Lie with only your upper back and head on the bench, hips lower.",
    "Hold one dumbbell with both hands, palms pressing against the inside plates.",
    "Keep a slight, fixed bend in your elbows throughout the whole movement.",
    "Lower the dumbbell behind your head until you feel a deep lat and chest stretch.",
    "Avoid lowering past the point where your shoulders start to pinch or strain.",
    "Inhale as you lower behind your head and exhale as you pull it back over.",
    "Keep your core braced so your lower back doesn't arch off the bench.",
    "Use a lighter weight than you'd expect since this is a stretch-focused movement.",
    "Pull the dumbbell back over in an arc, not a straight vertical lift.",
    "Keep your ribcage from flaring up as you reach back into the stretch.",
    "Move slowly and avoid using momentum to whip the dumbbell back to start.",
    "Stop the set if you feel any shoulder joint pain rather than pushing through."
  ],
  "Lat pulldown": [
    "Set the thigh pad snug so your hips stay locked during the warmup set and beyond.",
    "Grip the bar slightly wider than shoulder width with palms facing away from you.",
    "Lean back about 10 to 15 degrees and keep that angle fixed through the rep.",
    "Pull your elbows down and back, driving them toward your hips, not just down.",
    "Drive your chest up and out as the bar approaches your collarbone.",
    "Pause briefly at the bottom and squeeze your lats before letting the bar rise.",
    "Control the eccentric for two to three seconds instead of letting the weight yank you up.",
    "Avoid yanking the bar down with your arms before your shoulder blades engage.",
    "Don't let your shoulders shrug up toward your ears at the top of the stretch.",
    "Exhale as you pull the bar down and inhale as you let it rise.",
    "Think about pulling with your elbows, not gripping harder with your hands.",
    "Avoid swinging your torso backward to muscle the weight down."
  ],
  "Reverse grip pulldown": [
    "Grip the bar shoulder-width with palms facing you to bias the lower lats and biceps.",
    "Keep your chest tall and shoulders back before initiating the pull.",
    "Pull your elbows straight down toward your waist, brushing close to your torso.",
    "Squeeze your shoulder blades together as the bar reaches your upper chest.",
    "Lower the bar with control, resisting the stretch instead of letting it snap up.",
    "Avoid leaning back excessively to compensate for a weight that's too heavy.",
    "Keep your wrists neutral and avoid curling them to help pull the bar.",
    "Exhale on the pull down and inhale as you return to full stretch.",
    "Let your shoulder blades fully spread apart at the top for a complete stretch.",
    "Don't let your elbows flare out to the sides during the pull.",
    "Focus on driving your elbows past your ribcage rather than just bending your arms.",
    "Keep your feet flat and hips still under the pads throughout the set."
  ],
  "Seated cable row": [
    "Sit with knees slightly bent and feet braced firmly on the footplate.",
    "Start each rep with arms fully extended and a slight forward lean at the torso.",
    "Drive your elbows straight back past your ribs while keeping your spine neutral.",
    "Squeeze your shoulder blades together at the end of the pull and hold briefly.",
    "Avoid using momentum by rocking your torso backward to move the weight.",
    "Keep your chest up and avoid rounding your lower back during the stretch.",
    "Control the return phase so the weight doesn't pull your arms forward abruptly.",
    "Exhale as you row in and inhale as you extend back out.",
    "Keep your wrists straight and let your lats and mid-back do the pulling.",
    "Avoid shrugging your traps up; keep your shoulders pulled down and back.",
    "Pull the handle toward your lower ribs, not up toward your chest.",
    "Keep your elbows tucked close rather than flaring them wide on the pull."
  ],
  "Straight arm cable pulldown": [
    "Stand tall with a slight forward hip hinge and a soft bend in your elbows.",
    "Keep your arms straight throughout the movement, only moving from the shoulder joint.",
    "Pull the bar down in an arc toward your thighs, not straight down to the floor.",
    "Squeeze your lats hard at the bottom before letting the bar rise back up.",
    "Avoid bending your elbows more as the weight gets heavier; that shifts work to triceps.",
    "Keep your core braced so your lower back doesn't arch as you pull.",
    "Exhale as the bar travels down and inhale as it returns to the top.",
    "Control the ascent slowly to keep tension on your lats instead of resetting at the top.",
    "Avoid leaning your whole body back to assist the pull; let your lats do the work.",
    "Keep your shoulders down away from your ears throughout the set.",
    "Focus on the mind-muscle connection by visualizing your lats pulling your arms down.",
    "Don't let the cable yank your arms back up too quickly between reps."
  ],
  "Barbell row": [
    "Set up with a firm warmup set to groove your hip hinge before adding weight.",
    "Hinge at the hips with a flat back and your torso roughly 45 degrees to the floor.",
    "Grip the bar just outside shoulder width and keep your arms relaxed at the bottom.",
    "Brace your core hard before each pull to protect your lower spine.",
    "Pull the bar toward your lower ribs or upper abdomen, not your chest.",
    "Drive your elbows back and squeeze your shoulder blades at the top of the row.",
    "Avoid jerking the bar up using lower back momentum; pull with your back muscles.",
    "Keep your neck in a neutral position, looking slightly down rather than craning up.",
    "Lower the bar under control instead of letting it drop freely.",
    "Avoid rounding your upper back, especially as fatigue sets in on later sets.",
    "Exhale forcefully as you row the bar up to your torso.",
    "Keep your knees softly bent and weight in your midfoot for a stable base."
  ],
  "Single-arm dumbbell row": [
    "Brace your free hand on the bench and keep your spine flat, not twisted.",
    "Let the dumbbell hang straight down for a full stretch at the bottom of each rep.",
    "Pull your elbow up and back along your side, brushing close to your ribs.",
    "Avoid rotating your torso to help heave the weight up on tough reps.",
    "Squeeze your shoulder blade toward your spine at the top of the pull.",
    "Keep your working-side hip square to the bench rather than rotating it upward.",
    "Lower the dumbbell slowly to maintain tension instead of dropping it.",
    "Exhale as you row the dumbbell up and inhale as you lower it.",
    "Avoid shrugging your shoulder up toward your ear as you pull.",
    "Keep your neck neutral and avoid turning your head to watch the weight.",
    "Focus on leading with your elbow rather than your hand or wrist.",
    "Switch sides only after matching reps to keep both lats developing evenly."
  ],
  "Chest-supported machine row": [
    "Adjust the chest pad height so it sits firmly against your sternum, not your throat.",
    "Press your chest into the pad throughout the set to stop your torso from moving.",
    "Pull the handles back by driving your elbows behind your torso, not just bending arms.",
    "Squeeze your shoulder blades together fully at the back of each rep.",
    "Let your arms extend completely at the front for a full stretch through your lats.",
    "Avoid yanking the handles with a jerky motion; keep the movement smooth and controlled.",
    "Exhale as you pull the handles back and inhale as you let them return.",
    "Keep your wrists neutral and avoid curling them to assist the pull.",
    "Don't let your shoulders round forward as you reach for the stretched position.",
    "Focus on squeezing your mid-back rather than just moving the handles.",
    "Avoid using your legs or feet to push yourself away from the pad.",
    "Keep your neck relaxed and your gaze forward, not straining upward."
  ],
  "Pull-ups": [
    "Grip the bar just outside shoulder width with your thumbs wrapped around it.",
    "Start from a full dead hang to use the complete range of motion.",
    "Pull your elbows down and back, leading with your chest toward the bar.",
    "Avoid kipping or swinging your legs to generate momentum on strict sets.",
    "Squeeze your shoulder blades together and drive your chest up at the top.",
    "Lower yourself under control instead of dropping quickly to the dead hang.",
    "Engage your core and glutes to stop your legs from swinging during reps.",
    "Exhale as you pull yourself up and inhale as you lower back down.",
    "Avoid shrugging your shoulders up toward your ears at the bottom of the hang.",
    "Think about pulling your body up to the bar rather than pulling the bar down.",
    "Keep your chin clearing the bar without craning your neck forward.",
    "If full reps are too hard, use a band or assisted machine to maintain full range."
  ],
  "Cable face pull": [
    "Set the cable at upper-chest to head height and start with a light warmup set.",
    "Grip the rope with thumbs pointing back and pull toward your face, not your chest.",
    "Flare your elbows high and wide, finishing level with or above your shoulders.",
    "Externally rotate your hands at the end of the pull so knuckles point behind you.",
    "Squeeze your rear delts and upper back hard at the peak of each rep.",
    "Keep your torso upright and avoid leaning back to heave the weight in.",
    "Avoid using heavy weight that forces your elbows to drop low and forward.",
    "Control the return to the start instead of letting the cable snap your arms forward.",
    "Exhale as you pull the rope apart and inhale as you extend back out.",
    "Keep your chest lifted and shoulder blades pulled down throughout the movement.",
    "Avoid shrugging your traps; let your rear delts and rotators drive the motion.",
    "Pause briefly at full contraction to maximize rear-delt engagement."
  ],
  "Bent-over dumbbell reverse fly": [
    "Hinge forward at the hips until your torso is near parallel to the floor.",
    "Keep a soft bend in your elbows and maintain it throughout each rep.",
    "Raise the dumbbells out to the sides in an arc, leading with your elbows.",
    "Stop the raise around shoulder height rather than pulling the weights up high.",
    "Squeeze your shoulder blades together at the top before lowering with control.",
    "Avoid jerking the dumbbells up using momentum from your lower back.",
    "Keep your neck neutral and avoid craning it forward to see the weights.",
    "Use lighter dumbbells than you think you need to isolate the rear delts properly.",
    "Exhale as you raise the dumbbells and inhale as you lower them.",
    "Avoid letting your torso rise up as the weights get heavy or you fatigue.",
    "Keep your wrists relatively straight rather than bending them to swing the weight.",
    "Focus on squeezing your rear delts together rather than just lifting your arms."
  ],
  "Machine rear delt fly": [
    "Adjust the seat so the handles align with your shoulders at the start position.",
    "Press your chest against the pad to keep your torso from rocking.",
    "Lead with your elbows as you pull the handles out and back.",
    "Squeeze your shoulder blades together at the end range of each rep.",
    "Avoid using your chest or arms to muscle the handles instead of your rear delts.",
    "Control the return phase so the weight stack doesn't slam down between reps.",
    "Keep a slight bend in your elbows and hold it constant through the set.",
    "Exhale as you pull the handles apart and inhale as you let them return.",
    "Avoid shrugging your shoulders up toward your ears during the movement.",
    "Stop the range of motion roughly level with your shoulders, not behind your back.",
    "Focus on the mind-muscle connection by picturing your rear delts pulling your elbows back.",
    "Keep your feet flat and core braced so your lower back stays still."
  ],
  "Seated dumbbell shoulder press": [
    "Sit tall against the backrest and keep your lower back pressed flat, not arched.",
    "Start with the dumbbells at ear height before pressing overhead.",
    "Press the dumbbells up and slightly inward without clanking them together at the top.",
    "Exhale as you press up and inhale as you lower the dumbbells back down.",
    "Lower until your elbows are just below shoulder height, not lower.",
    "Don't lock your elbows out hard at the top to spare your joints.",
    "Use a lighter warmup set first to prime your rotator cuffs and shoulder joints.",
    "Keep your wrists stacked directly over your elbows through the whole rep.",
    "Avoid flaring your elbows too far forward, which shifts load off the delts.",
    "Brace your core to stop your ribcage from flaring up as you press.",
    "Focus on pushing through your palms, feeling the front and side delts drive the weight.",
    "Don't let the dumbbells drift behind your head, which strains the shoulder joint."
  ],
  "Dumbbell lateral raise": [
    "Stand tall with a soft bend in your knees and a slight forward lean.",
    "Raise the dumbbells out to the sides until your arms are roughly parallel to the floor.",
    "Lead with your elbows, not your hands, to keep tension on the side delts.",
    "Use a slight bend in your elbows throughout, never locking them straight.",
    "Avoid swinging the weights up using momentum from your hips or torso.",
    "Lower the dumbbells slowly under control instead of dropping them.",
    "Keep your shoulders down away from your ears, not shrugging as you lift.",
    "Stop the raise at shoulder height; going higher shifts work to your traps.",
    "Exhale as you raise the dumbbells and inhale as you lower them.",
    "Pick a weight light enough that your form stays clean for every rep.",
    "Picture pouring water from a jug to keep your pinkies slightly higher than your thumbs.",
    "Avoid using your traps to shrug the weight up; isolate the shoulder movement."
  ],
  "Dumbbell front raise": [
    "Stand with a neutral spine and your core braced before lifting.",
    "Raise the dumbbells straight out in front of you to about shoulder height.",
    "Keep a slight bend in your elbows throughout the entire range of motion.",
    "Lift one arm at a time or both together, but stay controlled either way.",
    "Avoid using momentum or leaning back to swing the weights upward.",
    "Lower the dumbbells slowly rather than letting gravity drop them.",
    "Keep your wrists neutral and avoid bending them as you raise the weight.",
    "Don't raise past shoulder height, which adds strain without extra delt benefit.",
    "Exhale on the way up and inhale as you lower back down.",
    "Focus on feeling the front of your shoulders do the lifting, not your traps.",
    "Use a palms-down or neutral grip depending on what feels comfortable in your shoulders.",
    "Choose a lighter weight here since front raises have less mechanical leverage."
  ],
  "Barbell overhead press": [
    "Grip the bar just outside shoulder width with your wrists stacked over your elbows.",
    "Start with the bar resting on your front shoulders, elbows slightly in front of the bar.",
    "Brace your core and squeeze your glutes to keep your lower back from arching.",
    "Press the bar straight up while moving your head back slightly to clear it.",
    "Finish with the bar over your head and your biceps near your ears.",
    "Exhale forcefully as you drive the bar overhead.",
    "Don't lean back excessively to press the weight up; keep your torso upright.",
    "Lower the bar back to your shoulders under control, not in free fall.",
    "Use a lighter warmup set to groove the bar path before loading up.",
    "Keep your feet planted shoulder-width apart for a stable base throughout the lift.",
    "Avoid flaring your elbows too wide at the bottom, which stresses the shoulder joint.",
    "Don't push the bar forward in an arc; keep the path as vertical as possible."
  ],
  "Machine shoulder press": [
    "Adjust the seat so the handles line up at shoulder height before starting.",
    "Keep your back flat against the pad throughout the entire set.",
    "Press the handles up without locking your elbows out aggressively at the top.",
    "Exhale as you press and inhale as you return the handles to the start.",
    "Lower the handles until your upper arms are roughly parallel to the floor.",
    "Avoid shrugging your shoulders up toward your ears during the press.",
    "Keep your wrists straight and avoid bending them against the handles.",
    "Use a controlled tempo rather than letting the machine's weight stack slam down.",
    "Focus on squeezing your shoulders at the top rather than just moving the handles.",
    "Don't flare your elbows out wider than the handle path allows.",
    "Keep your feet flat on the floor for a stable, balanced base.",
    "Check the handle grip width setting matches a comfortable shoulder position before loading weight."
  ],
  "Cable lateral raise": [
    "Stand sideways to the cable stack so the pulley pulls your arm across your body.",
    "Set the pulley near the floor so the cable line of pull starts low.",
    "Raise your arm out to the side until it's roughly parallel to the floor.",
    "Keep a slight bend in your elbow throughout, not a locked-out arm.",
    "Lead with your elbow rather than pulling with your hand or wrist.",
    "Control the cable back down instead of letting the weight yank your arm down.",
    "Avoid twisting your torso to help lift the handle; isolate the shoulder.",
    "Keep tension on the cable through the bottom of the rep instead of resting.",
    "Exhale as you raise your arm and inhale as you lower it back.",
    "Switch sides evenly so each shoulder gets the same constant-tension benefit.",
    "Don't shrug your shoulder up toward your ear as you raise the handle.",
    "Stand far enough from the machine that the cable stays at an angle, not straight down."
  ],
  "Arnold press": [
    "Start seated with the dumbbells in front of your shoulders, palms facing you.",
    "Rotate your palms outward as you press the dumbbells overhead.",
    "Keep your back flat against the bench to avoid excess lumbar arching.",
    "Reverse the rotation smoothly as you lower the dumbbells back to the start.",
    "Exhale as you press and rotate, inhale as you lower and rotate back.",
    "Avoid rushing the rotation; let it happen gradually through the full range.",
    "Keep your core braced so your torso doesn't twist along with your wrists.",
    "Don't let the dumbbells drift behind your head at the top of the press.",
    "Use a lighter weight than a standard press since the rotation adds difficulty.",
    "Keep your elbows tracking slightly in front of your body, not flared out wide.",
    "Focus on feeling all three deltoid heads work through the rotating path.",
    "Lower under control rather than letting the dumbbells drop back to the start position."
  ],
  "Dumbbell shrug": [
    "Stand tall with a dumbbell in each hand at your sides, arms straight.",
    "Lift your shoulders straight up toward your ears without bending your elbows.",
    "Avoid rolling your shoulders forward or backward; keep the motion vertical.",
    "Pause briefly at the top and squeeze your traps before lowering.",
    "Lower the dumbbells slowly instead of letting them drop on the way down.",
    "Keep your neck relaxed and avoid craning it forward to help the lift.",
    "Use a firm grip or straps if your hands give out before your traps do.",
    "Avoid using your legs or hips to bounce the weight upward.",
    "Exhale as you shrug up and inhale as you lower back down.",
    "Keep your arms straight and let your traps do all the work, not your biceps.",
    "Stand with a stable, shoulder-width stance to avoid swaying during heavier sets.",
    "Don't overload the weight to the point your form breaks down into jerky reps."
  ],
  "Barbell shrug": [
    "Grip the bar just outside your hips with a stable, even grip.",
    "Stand tall with your chest up and shoulders back before you start the lift.",
    "Shrug your shoulders straight up toward your ears, keeping your elbows straight.",
    "Avoid rolling your shoulders in circles; stick to a strict up-and-down path.",
    "Pause and squeeze at the top of the shrug for a full trap contraction.",
    "Lower the bar under control rather than dropping it quickly.",
    "Use chalk or straps if your grip fails before your traps fatigue.",
    "Keep the bar close to your body throughout the entire movement.",
    "Avoid using your knees or hips to heave the bar upward.",
    "Exhale as you shrug up and inhale as you return to the start.",
    "Keep your neck neutral and avoid tilting your head to assist the lift.",
    "Don't overarch your lower back trying to shrug heavier loads than you can control."
  ],
  "Triceps pushdown": [
    "Pin your elbows to your sides and keep them locked there the entire set.",
    "Use a light warmup set to groove the elbow position before loading the bar.",
    "Lean slightly forward from the hips, not the shoulders, to keep tension on triceps.",
    "Push the bar down until your arms are fully straight without locking out violently.",
    "Let the bar rise only until your forearms reach about parallel to the floor.",
    "Exhale as you press down, inhale as you control the bar back up.",
    "Avoid using your body weight or a torso lean to muscle the weight down.",
    "Squeeze and pause briefly at full elbow extension to maximize triceps contraction.",
    "Keep your wrists firm and straight instead of letting them flex on the bar.",
    "Resist the urge to let the bar snap back up; control the eccentric phase.",
    "Set the cable pulley at the top so the starting angle stresses your elbows minimally.",
    "Stand close to the cable stack so the cable path stays vertical, not angled."
  ],
  "Cable rope tricep extension": [
    "Split the rope ends apart at the bottom to fully contract each triceps head.",
    "Keep your upper arms glued to your ribcage throughout the movement.",
    "Extend until your elbows are straight, then squeeze before reversing the motion.",
    "Avoid flaring your elbows outward as you push the rope down.",
    "Control the rope back up slowly instead of letting the weight pull your arms.",
    "Breathe out on the push, in as you let your forearms rise back up.",
    "Keep a slight forward torso lean instead of standing bolt upright.",
    "Don't shrug your shoulders up toward your ears as you push down.",
    "Rotate your wrists slightly outward at the bottom to emphasize the lateral head.",
    "Stand with a staggered stance for stability rather than locking your knees.",
    "Keep your core braced so your lower back doesn't arch during the push.",
    "Stop the rope just above thigh height instead of slamming into your legs."
  ],
  "Dumbbell bicep curl": [
    "Start with a light warmup set to prep your elbows before adding weight.",
    "Keep your elbows tucked at your sides instead of drifting them forward.",
    "Curl the dumbbell up without swinging your torso or hips for momentum.",
    "Lower the weight all the way down until your arms are fully straight.",
    "Exhale as you curl up, inhale as you lower the dumbbell back down.",
    "Squeeze your biceps hard at the top instead of just lifting and dropping.",
    "Avoid letting your shoulders roll forward as the weight gets heavier.",
    "Control the descent for two to three seconds instead of dropping the weight fast.",
    "Keep your wrists straight rather than curling them inward at the top.",
    "Alternate arms or curl together, but keep elbows stationary either way.",
    "Stand with a slight knee bend instead of locking your legs straight.",
    "Avoid hyperextending your elbows at the bottom of each rep."
  ],
  "Hammer curls": [
    "Keep your palms facing each other throughout the entire curl.",
    "Pin your elbows to your sides instead of letting them swing outward.",
    "Curl with a controlled tempo rather than jerking the dumbbells upward.",
    "Lower the dumbbells fully to feel a stretch in your forearms and biceps.",
    "Avoid rotating your wrists toward a regular curl grip during the lift.",
    "Squeeze your forearm and brachialis muscles at the top of each rep.",
    "Exhale on the lift, inhale as you lower the dumbbells with control.",
    "Keep your torso upright instead of leaning back to assist the curl.",
    "Move each arm independently or together, but avoid uneven shoulder shrugging.",
    "Avoid letting momentum carry the weight past your natural range of motion.",
    "Keep your shoulders pulled back and down, not rounded forward.",
    "Stop the descent just short of locking out hard on your elbows."
  ],
  "Dumbbell skull crusher": [
    "Use a light warmup set to find a safe, comfortable elbow path first.",
    "Keep your upper arms pointed straight up and perfectly still throughout the set.",
    "Lower the dumbbells toward your forehead or just behind your head, not your chest.",
    "Bend only at the elbow; don't let your shoulders move during the rep.",
    "Inhale as you lower the weight, exhale forcefully as you extend your arms.",
    "Avoid flaring your elbows outward as the dumbbells descend.",
    "Use a slow, controlled lowering phase to protect your elbow joints.",
    "Keep a firm grip and tight wrists so the dumbbells don't tilt unexpectedly.",
    "Stop the descent if you feel any elbow joint pinching or strain.",
    "Squeeze your triceps fully at the top without slamming your elbows straight.",
    "Keep your feet flat and core braced to stabilize your body on the bench.",
    "Choose a lighter load than you'd guess, since this exercise stresses the elbows."
  ],
  "Single-arm dumbbell overhead tricep extension": [
    "Keep your upper arm close to your head and pointed straight up.",
    "Lower the dumbbell behind your head until you feel a deep triceps stretch.",
    "Use your free hand to support your working elbow for added stability.",
    "Extend your arm fully overhead without locking out aggressively at the top.",
    "Avoid letting your elbow drift outward away from your head during the rep.",
    "Exhale as you press up, inhale as you lower the dumbbell behind your head.",
    "Keep your core tight and ribs down to avoid arching your lower back.",
    "Move slowly on the way down to keep constant tension on the triceps.",
    "Avoid twisting your torso to help lift the weight on heavier reps.",
    "Keep your wrist straight and firm instead of letting it bend backward.",
    "Sit or stand tall instead of leaning to one side during the extension.",
    "Switch arms only after completing full controlled reps on the working side."
  ],
  "Cable bicep curl": [
    "Stand far enough from the machine to keep constant cable tension throughout.",
    "Keep your elbows fixed at your sides instead of drifting forward as you curl.",
    "Curl the bar up using only your forearms, not your shoulders or back.",
    "Lower the bar under control until your arms are nearly fully extended.",
    "Squeeze your biceps at the top instead of just reaching the top position.",
    "Avoid leaning back to use momentum when the weight feels heavy.",
    "Exhale as you curl up, inhale as you let the cable pull your arms down.",
    "Keep your wrists neutral rather than bending them to assist the curl.",
    "Stand with a slight forward lean rather than locking your knees out straight.",
    "Avoid letting the cable yank your arms down too quickly between reps.",
    "Keep your shoulders pulled back and chest up throughout the set.",
    "Use a full range of motion instead of doing short, partial curls."
  ],
  "Barbell curl": [
    "Keep your elbows pinned to your sides throughout the entire curl.",
    "Avoid swinging your hips or leaning back to heave the bar up.",
    "Lower the bar fully until your arms are straight before the next rep.",
    "Squeeze your biceps hard at the top instead of bouncing into the next rep.",
    "Exhale as you curl the bar up, inhale as you lower it back down.",
    "Keep your wrists straight rather than curling them up toward your forearms.",
    "Use a grip width that keeps your wrists and elbows comfortable, not strained.",
    "Avoid letting your elbows drift forward as the weight gets challenging.",
    "Keep your shoulders back and chest up instead of rounding forward.",
    "Stand with knees slightly soft instead of locking them out completely.",
    "Control the eccentric phase instead of letting the bar drop quickly.",
    "Keep your head neutral instead of jutting your chin forward to curl."
  ],
  "Preacher curl": [
    "Rest the back of your upper arms fully on the pad before starting.",
    "Avoid lifting your elbows off the pad as you curl the weight up.",
    "Lower the bar until your arms are nearly straight for a full stretch.",
    "Avoid locking your elbows out hard at the bottom of each rep.",
    "Squeeze your biceps at the top instead of rushing into the next rep.",
    "Exhale as you curl up, inhale as you lower the bar back down.",
    "Keep your wrists firm and straight rather than letting them bend backward.",
    "Use a slower tempo since the preacher position removes momentum assistance.",
    "Keep your chest against the pad instead of leaning back during heavy reps.",
    "Avoid using your shoulders to heave the weight when your biceps fatigue.",
    "Choose a lighter load than standing curls since leverage is less forgiving here.",
    "Keep your feet flat on the floor for a stable base throughout the set."
  ],
  "Cable rope hammer curl": [
    "Keep your palms facing each other on the rope throughout the curl.",
    "Pin your elbows to your sides instead of letting them swing forward.",
    "Curl the rope up using only your forearms, not your shoulders.",
    "Lower the rope under control until your arms are nearly fully extended.",
    "Squeeze your forearms and biceps at the top of every rep.",
    "Avoid leaning back to use momentum when the weight feels heavy.",
    "Exhale as you curl up, inhale as you let the cable lower your arms.",
    "Keep your wrists neutral instead of rotating them during the curl.",
    "Stand with a stable, slightly staggered stance rather than locking your knees.",
    "Avoid letting the cable yank your arms down too fast between reps.",
    "Keep your shoulders back and chest up throughout the movement.",
    "Use a full range of motion instead of short, partial pulls."
  ],
  "Close-grip bench press": [
    "Grip the bar slightly narrower than shoulder width to target your triceps.",
    "Keep your elbows tucked close to your torso as you lower the bar.",
    "Lower the bar to your lower chest instead of flaring it to your upper chest.",
    "Avoid gripping too narrow, which can strain your wrists and elbows.",
    "Inhale as you lower the bar, exhale forcefully as you press it up.",
    "Keep your shoulder blades pulled back and pinned to the bench.",
    "Avoid bouncing the bar off your chest to generate momentum.",
    "Keep your feet flat on the floor to drive stability through your press.",
    "Press the bar in a straight line back toward the rack position.",
    "Use a spotter or safety bars when pushing close to your max weight.",
    "Keep your wrists stacked directly above your elbows, not bent backward.",
    "Squeeze the bar hard and engage your triceps at full lockout."
  ],
  "Single-arm tricep kickback": [
    "Hinge at your hips and keep your back flat, not rounded, throughout.",
    "Keep your upper arm parallel to the floor and pinned to your side.",
    "Extend only at the elbow; avoid swinging your upper arm to lift the weight.",
    "Squeeze your triceps hard at full extension before lowering back down.",
    "Avoid using momentum or a hip thrust to swing the dumbbell upward.",
    "Exhale as you extend your arm back, inhale as you bend it back in.",
    "Keep your neck neutral instead of craning it to look at the weight.",
    "Support yourself with your free hand on a bench for added stability.",
    "Use a lighter weight than you'd expect, since leverage here is unforgiving.",
    "Keep your elbow bent at roughly a right angle at the start of each rep.",
    "Avoid letting your shoulder rise or rotate as you kick the weight back.",
    "Control the lowering phase instead of letting your forearm drop quickly."
  ],
  "Tricep dips": [
    "Keep your elbows tracking straight back instead of flaring out to the sides.",
    "Lower your body until your upper arms are about parallel to the floor.",
    "Keep your torso upright to emphasize triceps over chest involvement.",
    "Avoid shrugging your shoulders up toward your ears as you descend.",
    "Inhale as you lower yourself, exhale as you press back up.",
    "Stop your descent if you feel any pinching in your shoulder joints.",
    "Keep your core tight so your hips don't sag away from the bench.",
    "Press through your palms evenly instead of leaning to one side.",
    "Add weight or bend your knees more once bodyweight reps feel too easy.",
    "Avoid locking your elbows out aggressively at the top of each rep.",
    "Keep your wrists positioned directly under your shoulders, not flared outward.",
    "Move with control instead of bouncing quickly at the bottom of the dip."
  ],
  "Overhead cable tricep extension": [
    "Face away from the cable machine with the pulley set near the floor.",
    "Keep your upper arms close to your head and steady throughout the set.",
    "Extend your forearms forward and up until your arms are fully straight.",
    "Avoid letting your elbows flare outward as you extend against the cable.",
    "Lean your torso forward slightly to keep tension off your lower back.",
    "Exhale as you extend your arms, inhale as you let them bend back.",
    "Keep your core braced so your back doesn't arch under the cable pull.",
    "Squeeze your triceps fully at extension instead of stopping short.",
    "Use a rope attachment and split the ends for added triceps contraction.",
    "Avoid jerking the cable to start the rep; initiate the move smoothly.",
    "Keep your wrists firm and straight rather than letting them bend back.",
    "Control the stretch position instead of letting the cable yank your arms back."
  ],
  "Hack squat": [
    "Set your shoulders snug under the pads and your back flat against the support.",
    "Place feet shoulder-width on the platform, mid-foot under the load path.",
    "Lower until your thighs are just past parallel without your heels lifting.",
    "Drive through your whole foot, favoring your heels over your toes.",
    "Inhale on the way down, brace your core, exhale as you push up.",
    "Keep your knees tracking in line with your toes, not caving inward.",
    "Avoid locking your knees out hard at the top of each rep.",
    "Use a lighter warmup set to groove depth before adding plates.",
    "Don't let your lower back round away from the pad at the bottom.",
    "Focus on feeling your quads stretch and contract through the full range.",
    "Control the descent for two to three seconds instead of dropping fast.",
    "Keep the safety catches engaged until you're set and ready to lift."
  ],
  "Lying hamstring curl": [
    "Adjust the ankle pad to sit just above your heels, not your calves.",
    "Keep your hips pressed flat into the bench throughout the movement.",
    "Curl your heels toward your glutes through a full, slow range of motion.",
    "Avoid yanking the weight up using momentum from your lower back.",
    "Squeeze and pause briefly at peak contraction before lowering.",
    "Exhale as you curl up, inhale as you lower the pad back down.",
    "Don't let your hips pop up off the pad as the weight gets heavy.",
    "Use a light warmup set to wake up the hamstrings before loading up.",
    "Point your toes slightly to bias the hamstrings over the calves.",
    "Lower the pad under control instead of letting it snap back.",
    "Keep your grip on the handles light, not yanking your upper body around.",
    "Focus on feeling the stretch in your hamstrings at full extension."
  ],
  "Dumbbell lunge": [
    "Keep your torso upright and your core braced through each step.",
    "Step far enough forward that your front shin stays roughly vertical.",
    "Lower until your back knee lightly grazes the floor, not slams it.",
    "Keep your front knee tracking over your foot, not drifting inward.",
    "Inhale as you lower, exhale as you drive back up.",
    "Avoid letting your front heel lift off the ground during the descent.",
    "Push through your front heel to stand back up, not your toes.",
    "Keep the dumbbells close to your sides instead of swinging them.",
    "Don't let your back round forward as you lean into the lunge.",
    "Focus on feeling your front-leg quad and glute do the work.",
    "Take shorter, controlled steps if walking to avoid losing balance.",
    "Keep your head and chest up rather than staring down at your feet."
  ],
  "Machine adduction": [
    "Sit fully back in the seat with your spine against the pad.",
    "Set the pads against your inner thighs just above the knee.",
    "Squeeze your legs together slowly rather than slamming the pads shut.",
    "Avoid using your hands on your knees to assist the movement.",
    "Exhale as you bring your legs together, inhale as you release.",
    "Pause briefly at full inner-thigh contraction before opening back up.",
    "Don't let the weight yank your legs open too fast on the return.",
    "Use a light warmup set to test the range before loading heavier.",
    "Keep your back flat against the pad, not arching forward.",
    "Focus on feeling the squeeze in your inner thighs, not your hips.",
    "Set the starting width so you feel a stretch without straining.",
    "Keep movements smooth and controlled in both directions."
  ],
  "Machine abduction": [
    "Sit back fully with your hips square and spine against the pad.",
    "Position the pads on the outside of your knees, not your shins.",
    "Push your legs apart slowly, leading with your outer hips.",
    "Avoid jerking the weight open using your lower back for momentum.",
    "Exhale as you push outward, inhale as you bring legs back in.",
    "Pause at the widest point to feel your glute medius engage.",
    "Don't let the pads slam back together under uncontrolled weight.",
    "Use a light warmup set to find a comfortable starting range.",
    "Keep your shoulders relaxed and avoid gripping the handles too hard.",
    "Focus on feeling the outer hip and glute work, not your quads.",
    "Avoid rounding your lower back away from the pad mid-rep.",
    "Keep the tempo even rather than bouncing in and out."
  ],
  "Leg press": [
    "Place your feet shoulder-width on the platform, flat from heel to toe.",
    "Keep your lower back pressed into the seat throughout every rep.",
    "Lower the platform until your knees reach about ninety degrees.",
    "Avoid letting your knees cave inward as you press the weight up.",
    "Inhale as the platform lowers, exhale as you press it away.",
    "Don't lock your knees out completely or bounce them at the top.",
    "Use the warmup set to confirm seat position before going heavy.",
    "Keep your hips glued to the seat, not rounding off it at depth.",
    "Avoid letting your heels lift off the platform during the press.",
    "Focus on driving through your whole foot, not just your toes.",
    "Control the negative instead of letting the platform drop quickly.",
    "Keep your head and shoulders relaxed against the backrest."
  ],
  "Leg press calf raise": [
    "Place only the balls of your feet on the lower edge of the platform.",
    "Keep your knees softly locked and stationary throughout the set.",
    "Lower your heels as far as the platform allows for a full stretch.",
    "Press through your forefoot to extend your ankles fully at the top.",
    "Pause briefly at full plantarflexion before lowering back down.",
    "Exhale as you press up, inhale as you lower your heels.",
    "Avoid bending your knees to help drive the weight up.",
    "Use the warmup set to find a safe foot position on the plate.",
    "Don't bounce out of the bottom stretch; control it instead.",
    "Keep the range of motion full rather than using short pulses.",
    "Focus on feeling the stretch and squeeze in your calves, not your quads.",
    "Keep your feet from sliding by checking your footing each rep."
  ],
  "Leg extension": [
    "Align the machine's pivot point with your knee joint before starting.",
    "Set the ankle pad just above your feet, resting on your shins.",
    "Extend your legs until they're straight without snapping your knees locked.",
    "Avoid using momentum or swinging your torso to help lift the weight.",
    "Exhale as you extend, inhale as you lower back down.",
    "Pause briefly at full extension to maximize quad contraction.",
    "Lower the weight slowly instead of letting it drop fast.",
    "Use a light warmup set to gauge knee comfort before adding load.",
    "Keep your back flat against the pad, not arching off it.",
    "Focus on squeezing your quads hard at the top of each rep.",
    "Grip the side handles lightly instead of yanking on them.",
    "Stop short of full lockout if you feel any knee discomfort."
  ],
  "Barbell back squat": [
    "Set the bar across your traps, not resting on your neck bones.",
    "Brace your core and take a deep breath before unracking the bar.",
    "Keep your chest up and spine neutral throughout the descent.",
    "Sit your hips back and down until thighs are at least parallel.",
    "Keep your knees tracking over your toes, not collapsing inward.",
    "Drive through your whole foot, not just your toes, to stand up.",
    "Avoid letting your lower back round at the bottom of the squat.",
    "Use a light warmup set to dial in bar position and depth.",
    "Exhale forcefully past the hardest part of the rep, not at the bottom.",
    "Keep the bar path vertical over your mid-foot the entire rep.",
    "Don't let your heels rise off the floor as you descend.",
    "Use safety pins or a spotter when attempting heavier loads."
  ],
  "Bulgarian split squat": [
    "Rest the top of your rear foot on the bench, laces down.",
    "Keep most of your weight on your front heel, not the back leg.",
    "Lower straight down until your front thigh is roughly parallel to the floor.",
    "Keep your torso upright with a slight forward lean from the hips.",
    "Avoid letting your front knee drift past your toes excessively.",
    "Inhale as you lower, exhale as you drive back up.",
    "Don't push off your rear foot to assist the lift.",
    "Keep the dumbbells at your sides rather than swinging for momentum.",
    "Focus on feeling your front glute and quad doing the work.",
    "Set your front foot far enough forward to keep your shin vertical.",
    "Avoid letting your hips rotate or tilt sideways mid-rep.",
    "Use a wall or bench for balance until your stability improves."
  ],
  "Seated hamstring curl": [
    "Align the machine's pivot with your knee joint before adjusting pads.",
    "Set the thigh pad snug to keep your hips from rising during curls.",
    "Curl your heels down and back through a full range of motion.",
    "Avoid jerking the weight using your hips or upper body.",
    "Exhale as you curl down, inhale as you return to the start.",
    "Pause briefly at peak contraction to maximize hamstring engagement.",
    "Lower the weight slowly instead of letting it snap back up.",
    "Use a light warmup set to find a comfortable pad position.",
    "Keep your back flat against the seat, not arching forward.",
    "Point your toes slightly to emphasize the hamstrings over the calves.",
    "Focus on feeling the stretch at the top of each rep.",
    "Keep your grip on the handles relaxed, not white-knuckled."
  ],
  "Romanian deadlift": [
    "Keep the bar close to your shins and thighs throughout the lift.",
    "Hinge at your hips, pushing them back as your torso tilts forward.",
    "Keep a soft bend in your knees rather than locking them straight.",
    "Maintain a flat, neutral spine from setup through lockout.",
    "Lower the bar only until you feel a deep hamstring stretch.",
    "Avoid rounding your lower back to chase a lower bar position.",
    "Inhale and brace before the descent, exhale as you stand tall.",
    "Drive your hips forward to finish, not your lower back.",
    "Keep your shoulders back and chest proud throughout the movement.",
    "Avoid yanking the bar off the floor; start the pull smoothly.",
    "Focus on feeling tension build in your hamstrings, not your low back.",
    "Use a double-overhand or mixed grip and chalk if grip starts slipping."
  ],
  "Seated calf raise": [
    "Set the knee pad snugly against your thighs before starting.",
    "Place the balls of your feet on the platform, heels hanging free.",
    "Lower your heels as far as possible for a deep calf stretch.",
    "Press through your forefeet to rise onto your toes fully.",
    "Pause briefly at the top to squeeze your calves hard.",
    "Exhale as you raise, inhale as you lower back down.",
    "Avoid bouncing out of the bottom stretch position.",
    "Control the descent slowly instead of letting the pad drop.",
    "Keep your knees still and bent at the same angle throughout.",
    "Focus on feeling the stretch and contraction in your calves only.",
    "Don't let your feet roll inward or outward during the rep.",
    "Use a full range of motion rather than short, partial pulses."
  ],
  "Plate-loaded standing calf raise": [
    "Set your shoulders under the pads with a slight knee bend, not locked.",
    "Place the balls of your feet on the platform, heels hanging off the edge.",
    "Lower your heels as deep as possible to feel a full calf stretch.",
    "Press up through your forefoot until you're fully on your toes.",
    "Pause at the top and squeeze your calves before lowering.",
    "Exhale as you rise, inhale as you lower your heels down.",
    "Avoid bouncing at the bottom; control the stretch instead.",
    "Use the warmup set to check footing and balance before loading heavy.",
    "Keep your torso upright rather than leaning into the shoulder pads.",
    "Don't let your knees bend and unbend to help drive the weight.",
    "Focus on feeling the burn in your calves, not your shins.",
    "Keep your feet from sliding outward by checking placement each set."
  ],
  "Machine seated crunch": [
    "Set the seat height so the chest pad lines up with your upper chest, not your neck.",
    "Start with a light warmup set to find your range before loading the stack.",
    "Curl your spine forward by contracting your abs, not by yanking with your arms.",
    "Exhale fully as you crunch down to deepen the abdominal contraction.",
    "Keep your feet flat and anchored so your hips stay still through the movement.",
    "Pause briefly at full contraction and squeeze your abs instead of bouncing.",
    "Control the return to the start position instead of letting the weight snap back.",
    "Avoid yanking the handles with your shoulders to fake extra range of motion.",
    "Keep your neck relaxed and let your abs do the pulling, not your chin.",
    "Use a moderate weight that lets you feel your abs working through the full set.",
    "Don't lock your elbows rigidly; let your arms transmit force, not generate it.",
    "Focus on rounding your lower back into the pad to fully engage your core."
  ],
  "Hanging leg raise": [
    "Press your forearms firmly into the pads and keep your back flat against the support.",
    "Brace your core before lifting so your lower back doesn't arch off the pad.",
    "Raise your knees or legs by curling your pelvis up, not just swinging your hips.",
    "Exhale as you lift your legs and inhale as you lower them with control.",
    "Lower your legs slowly instead of letting gravity drop them at the bottom.",
    "Avoid using momentum or swinging to throw your legs upward.",
    "Stop the descent before your lower back arches away from the pad.",
    "Keep your shoulders pressed down and avoid shrugging into your ears.",
    "Raise your knees toward your chest to target your lower abs more directly.",
    "Squeeze your abs hard at the top instead of just reaching a height goal.",
    "Keep your grip relaxed on the handles so your abs do the work, not your arms.",
    "Straighten your legs for a harder variation only once form stays controlled."
  ],
  "Decline sit-ups": [
    "Hook your feet securely under the pads before lowering into the decline bench.",
    "Cross your arms over your chest or behind your head, not pulling on your neck.",
    "Curl your chin slightly toward your chest to avoid straining your neck.",
    "Exhale as you rise up and inhale as you lower back down.",
    "Lower yourself with control instead of dropping fast to the bottom of the bench.",
    "Avoid yanking your head and neck to generate momentum upward.",
    "Engage your abs first before your hip flexors take over the movement.",
    "Don't fully relax your spine at the bottom; keep light tension in your core.",
    "Start at a shallow decline angle until your core strength supports a steeper one.",
    "Keep your lower back from rounding excessively past your natural curve at the top.",
    "Squeeze your abs at the top rather than rushing straight back down.",
    "Avoid arching your lower back hard against the bench at the bottom of the rep."
  ],
  "Leg raise": [
    "Use a firm overhand or hanging grip and let your shoulders fully engage before lifting.",
    "Brace your abs before raising your legs to avoid swinging on the bar.",
    "Lift your legs by tilting your pelvis up, not just by flexing your hips.",
    "Exhale as you raise your legs and inhale as you lower them slowly.",
    "Lower your legs under control instead of letting them drop and swing.",
    "Avoid using momentum from your shoulders to swing your legs upward.",
    "Stop your legs before your lower back arches forward excessively.",
    "Keep a slight bend in your knees if straight-leg raises strain your lower back.",
    "Squeeze your lower abs at the top instead of just touching the bar height.",
    "Keep your shoulder blades engaged and avoid hanging passively from the joints.",
    "Avoid rocking your torso to build swinging momentum for the next rep.",
    "Build up from bent-knee raises before progressing to straight-leg hanging raises."
  ],
  "Plank": [
    "Stack your shoulders directly over your elbows for stable forearm positioning.",
    "Brace your core like you're about to be punched in the stomach.",
    "Squeeze your glutes to keep your hips from sagging toward the floor.",
    "Keep your body in one straight line from head to heels.",
    "Breathe steadily and evenly instead of holding your breath during the hold.",
    "Avoid letting your hips pike up into an inverted-V position.",
    "Avoid letting your lower back sag, which strains your spine over time.",
    "Keep your neck neutral by looking at the floor, not straight ahead.",
    "Press your forearms into the floor to keep your upper back engaged.",
    "Quit the hold once your form breaks rather than fighting through a sagging plank.",
    "Keep your feet hip-width apart for a stable, balanced base.",
    "Focus on quality time under tension rather than chasing a longer hold time."
  ],
  "Cable crunch": [
    "Kneel far enough from the pulley that the cable stays taut throughout the rep.",
    "Hold the rope by your temples or ears, not gripping it with your hands.",
    "Hinge from your hips so your hips stay still and your spine does the curling.",
    "Round your spine downward by contracting your abs, not by pulling with your arms.",
    "Exhale forcefully as you crunch down toward your knees.",
    "Keep your hips locked in place instead of sitting back onto your heels.",
    "Avoid yanking the rope with your shoulders to muscle the weight down.",
    "Return to the start slowly instead of letting the cable snap you back up.",
    "Keep slight tension on your abs at the top instead of fully relaxing.",
    "Focus on curling your ribcage toward your pelvis for a deeper contraction.",
    "Choose a weight that lets you feel the crunch in your abs, not your arms.",
    "Keep your neck relaxed and avoid pulling your head down with your hands."
  ],
  "Barbell hip thrust": [
    "Set the bench so your shoulder blades rest at mid-bench height when you slide under.",
    "Plant your feet hip-width apart with toes slightly out and knees tracking over your toes.",
    "Drive through your heels and squeeze your glutes to raise your hips to parallel.",
    "Pause and hold the contraction at the top for one count before lowering.",
    "Keep your chin tucked to avoid overextending your lower back at the top.",
    "Brace your core throughout so your ribs don't flare as you extend your hips."
  ],
  "Barbell skull crusher": [
    "Grip the bar just inside shoulder width and point your elbows straight up at the ceiling.",
    "Keep your upper arms vertical and completely stationary — only your forearms move.",
    "Lower the bar toward your forehead or just behind your head for a full stretch.",
    "Press back up by extending at the elbow only, without flaring or swinging your arms.",
    "Control the descent slowly — the bar is close to your face and momentum is dangerous.",
    "Use a spotter or slightly lighter weight when going close to failure for safety."
  ],
  "Dead hang": [
    "Grip the bar slightly wider than shoulder width with palms facing away from you.",
    "Let your body hang fully and allow your spine to decompress and lengthen naturally.",
    "Breathe steadily and let your shoulders rise above your ears — don't fight it.",
    "Keep your feet off the ground and avoid swinging or using momentum to hold on.",
    "Build hang duration gradually — try adding 10 seconds at a time across sessions.",
    "Use this to improve grip strength and shoulder mobility; it pairs well between heavy sets."
  ],
  "Diamond push-ups": [
    "Place your index fingers and thumbs together in a diamond shape directly under your sternum.",
    "Keep your elbows tracking backward and close to your sides — not flaring outward.",
    "Maintain a rigid plank line from head to heels by bracing your core and glutes.",
    "Lower your chest toward the diamond without letting your hips sag toward the floor.",
    "Press through the diamond and fully extend your arms at the top of each rep.",
    "If too hard, elevate your hands on a bench; if too easy, elevate your feet instead."
  ],
  "Dumbbell Romanian deadlift": [
    "Hold the dumbbells in front of your thighs with a neutral grip, palms facing your body.",
    "Hinge at the hips by pushing them backward — don't simply bend your knees.",
    "Lower the dumbbells along your legs as close to your shins as possible throughout.",
    "Stop when your hamstrings reach their limit and before your lower back begins to round.",
    "Squeeze your glutes and drive your hips forward to return to standing.",
    "Keep a slight, soft bend in your knees throughout — this is a hip hinge, not a squat."
  ],
  "Dumbbell hip thrust": [
    "Rest your upper back across a bench with knees bent and feet flat on the floor.",
    "Place the dumbbells across your hips and hold them firmly in place with both hands.",
    "Drive through your heels and squeeze your glutes to raise your hips to parallel.",
    "Pause and hold the contraction at the top for one count before lowering with control.",
    "Keep your chin tucked so your gaze stays forward, not at the ceiling above you.",
    "Avoid arching your lower back — stop at the point your torso forms a straight line."
  ],
  "Dumbbell reverse wrist curl": [
    "Rest your forearms on your thighs or a bench with your palms facing downward.",
    "Let the dumbbells roll slightly toward your fingertips for a full starting stretch.",
    "Curl your wrists upward slowly, contracting the extensors along the top of your forearm.",
    "Lower back to the start with control on every rep — don't just let the weight drop.",
    "Use light weight; the forearm extensors fatigue quickly and are prone to strain.",
    "Keep your forearms flat on the support and avoid lifting your elbows during the movement."
  ],
  "Dumbbell wrist curl": [
    "Rest your forearms on your thighs or a bench with palms facing upward.",
    "Let the dumbbells roll down toward your fingertips for a full range of motion on each rep.",
    "Curl your wrists upward by contracting your forearm flexors.",
    "Squeeze hard at the top then lower slowly back to the fully stretched position.",
    "Use a light weight and higher reps — this is an isolation movement for small muscles.",
    "Keep your elbows and forearms still against the surface — only your wrists should move."
  ],
  "Glute bridge": [
    "Lie flat with your knees bent, feet flat on the floor hip-width apart.",
    "Press your arms into the floor at your sides to help stabilize the movement.",
    "Drive through your heels and squeeze your glutes to lift your hips off the floor.",
    "Hold the top position for one to two counts and contract your glutes as hard as you can.",
    "Lower your hips until they are just above the floor before the next rep — don't fully rest.",
    "Push your knees slightly outward to keep them tracking directly over your feet."
  ],
  "Incline bench dumbbell rear delt fly": [
    "Set the bench to a 30-45 degree incline and lie face-down with your chest against the pad.",
    "Let the dumbbells hang straight down below your shoulders with a neutral grip.",
    "Raise your arms out to the sides in a wide arc until they are level with your shoulders.",
    "Focus on squeezing your rear deltoids — avoid shrugging your traps to help lift the weight.",
    "Lower the dumbbells back down slowly under control to maintain tension throughout.",
    "Keep a slight bend in your elbows throughout to reduce stress on the elbow joint."
  ],
  "Machine chest fly": [
    "Adjust the seat height so the handles align with the middle of your chest when seated.",
    "Set the arms to a position that provides a full chest stretch without pain in your shoulder.",
    "Keep your back pressed firmly against the pad throughout every rep.",
    "Bring the pads together in a wide arc and squeeze your chest at the center.",
    "Resist the weight on the way back — don't let the pads swing open uncontrolled.",
    "Stop just before the pads touch at the center to maintain constant tension on your chest."
  ],
  "Machine hip thrust": [
    "Adjust the seat and shoulder pad so your hips can fully extend at the top of the movement.",
    "Position both feet flat on the footplate, hip-width apart with toes slightly out.",
    "Drive through your heels and squeeze your glutes hard to push your hips forward.",
    "Pause for a full count at the top of each rep before controlling the weight back down.",
    "Avoid rolling your lower back — the movement should come from your hips only.",
    "Keep your core braced throughout to prevent your lower back from hyperextending at the top."
  ],
  "Mountain climbers": [
    "Start in a push-up plank with hands under your shoulders and your body in a straight line.",
    "Brace your core hard before you begin and maintain that brace throughout the movement.",
    "Drive one knee toward your chest while keeping your hips level — don't let them rise.",
    "Alternate legs in a controlled running motion rather than just rushing through reps.",
    "Keep your hips from bouncing up and down — stay low and maintain the plank position.",
    "Breathe rhythmically and avoid holding your breath as the pace and intensity increase."
  ],
  "Pike push-ups": [
    "Start in a downward-dog position with your hips raised high and body forming an inverted V.",
    "Walk your hands closer to your feet to increase the shoulder angle and challenge.",
    "Lower your head toward the floor between your hands by bending your elbows.",
    "Keep your elbows angling slightly inward — don't flare them wide to the sides.",
    "Press back up until your arms are fully extended to return to the inverted-V start position.",
    "Keep your legs as straight as possible throughout to preserve the pike angle."
  ],
  "Russian twist": [
    "Sit with your knees bent and lean your torso back to roughly 45 degrees.",
    "Lift your feet slightly off the floor to increase core engagement and difficulty.",
    "Rotate your torso fully side to side — the movement comes from your core, not your arms.",
    "Touch the weight or your hands down to the floor on each side to get the full range.",
    "Breathe steadily throughout and avoid holding your breath during the twisting motion.",
    "Keep your lower back from rounding by maintaining the 45-degree lean on both sides."
  ],
  "Smith machine bench press": [
    "Position the bench so the bar traces a natural path over your mid-chest when pressing.",
    "The fixed bar path differs from free-weight bench — adjust your grip width if needed.",
    "Plant your feet flat on the floor and keep your shoulder blades retracted and depressed.",
    "Lower the bar to your mid-chest under control and press back up in a straight line.",
    "Unrack by rotating the bar out of the safety hooks, not by pressing straight upward.",
    "Rack safely by twisting the bar back into the hooks at the end of each set."
  ],
  "Smith machine hip thrust": [
    "Set the Smith bar at a height that rests comfortably across your hips when seated on the floor.",
    "Use a barbell pad or foam roll to cushion the bar across your hips.",
    "Drive through your heels to push your hips up until your body is in a straight line.",
    "Squeeze your glutes hard at the top and hold for one full count before lowering.",
    "Lower your hips under control — don't let the bar drop or crash down onto you.",
    "Keep your feet flat and your knees tracking directly over your toes throughout."
  ],
  "Smith machine inverted row": [
    "Set the bar at hip height or lower — the closer to the floor, the harder the movement.",
    "Hang under the bar with your body in a straight line, gripping shoulder-width apart.",
    "Pull your chest up to the bar by squeezing your shoulder blades together.",
    "Keep your body rigid from head to heels — your hips must not sag toward the floor.",
    "Lower yourself back down slowly with control until your arms are fully extended.",
    "Elevate your feet on a bench to significantly increase the difficulty once bodyweight rows feel easy."
  ],
  "Smith machine Romanian deadlift": [
    "Set the bar at mid-thigh height to match a standard Romanian deadlift starting position.",
    "Position your feet slightly forward of the bar to compensate for the fixed vertical path.",
    "Push your hips back as you lower the bar along your legs — not straight down.",
    "Stop when your hamstrings reach their limit and before your lower back begins to round.",
    "Drive your hips forward and squeeze your glutes to stand, pressing through your heels.",
    "Keep the bar tracking close to your body throughout — it should skim your legs on the way down."
  ],
  "Smith machine shoulder press": [
    "Set the bench upright at 90 degrees and position it so the bar starts at chin height.",
    "Grip the bar slightly wider than shoulder width to reduce shoulder joint stress.",
    "Press the bar straight up along the fixed vertical path — no need to arc around your face.",
    "Lower the bar to your upper chest level — not behind your neck.",
    "Keep your lower back in contact with the bench pad and avoid excessive arching.",
    "Brace your core to prevent your lower back from overextending under heavy loads."
  ],
  "Smith machine shrug": [
    "Stand upright with the bar resting in front of your thighs, arms fully extended down.",
    "Shrug your shoulders straight up toward your ears in a controlled, vertical motion.",
    "Hold the contraction at the top for one count to fully engage your traps.",
    "Lower your shoulders slowly back to the start — don't just drop the weight.",
    "Keep your arms straight throughout — shrugs are a trap exercise, not a bicep curl.",
    "Avoid rolling your shoulders in circles, which can stress the shoulder joint over time."
  ],
  "Smith machine squat": [
    "Position your feet slightly forward of the bar to account for its fixed vertical path.",
    "Keep feet shoulder-width apart with toes pointed slightly outward.",
    "Squat until your thighs are at least parallel to the floor before driving back up.",
    "Drive through your heels and keep your chest tall and upright throughout the lift.",
    "Set the safety hooks at the correct height in case you need to bail out of the set.",
    "The Smith machine removes the need to balance, so focus entirely on depth and control."
  ],
  "Smith machine standing calf raise": [
    "Place the bar across your upper traps and position the balls of your feet on a raised platform.",
    "Let your heels hang off the edge to get a full stretch at the bottom of each rep.",
    "Lower your heels as far as possible before each rep to maximize the stretch.",
    "Drive up onto the balls of your feet and squeeze your calves hard at the top.",
    "Pause briefly at the top and bottom of each rep to eliminate bounce momentum.",
    "Keep your legs fully straight throughout — bending your knees shifts work to your soleus."
  ],
  "Chin-ups": [
    "Don't kip or swing your hips to get over the bar — use strict pulling strength the whole way up.",
    "Initiate each rep by depressing your shoulder blades first; starting from a passive shrug puts unnecessary strain on the shoulder capsule.",
    "Drive your elbows down and toward your hips, not just straight back — this keeps your lats engaged rather than just your biceps.",
    "Lower all the way to a full arm extension on every rep; partial reps cut your range and limit lat development.",
    "Avoid jutting your head forward to fake clearing the bar — your chin must genuinely pass above it.",
    "If your forearms fatigue before your back, focus on initiating the pull from your shoulder blades, not your hands."
  ],
  "Wide-grip cable row": [
    "Don't round your lower back to reach farther forward at the start — additional stretch should come from protracting your shoulder blades, not bending your spine.",
    "Flare your elbows outward as you pull; elbows tucking to your sides narrows the grip effect and turns it into a regular row.",
    "Keep your torso upright throughout — rocking backward to move the weight removes the back's job and risks lower-back strain.",
    "Focus the squeeze at the end of the pull on your upper back and rear delts, not just your lats — that's the purpose of the wide grip.",
    "Control the return slowly; the eccentric phase is where upper-back development happens."
  ],
  "Cable tricep kickback": [
    "Your upper arm must stay parallel to the floor for the entire set — if it drops, you lose mechanical advantage and the tricep barely works.",
    "Don't swing your torso upright to assist the weight; the movement is a pure elbow hinge.",
    "Extend your arm all the way at the top — a partial lockout shortchanges the peak contraction.",
    "Use a light enough weight to maintain a stationary upper arm; this is one of the exercises most often ruined by going too heavy.",
    "Brace your core in the hinged position to protect your lower back throughout the set."
  ],
  "Dumbbell sumo squat": [
    "Keep your knees tracking over your toes throughout — with toes pointed wide, that means actively pushing your knees outward, not letting them cave in.",
    "Keep your chest tall and torso as upright as possible — forward lean shifts load away from your quads and inner thighs.",
    "Don't bounce at the bottom; control the descent and use your muscles to reverse direction.",
    "The dumbbell hangs freely between your legs — don't press it against your body, which changes the movement pattern.",
    "Drive through your full foot, not just the balls of your feet, to maintain balance and power."
  ],
  "Single-arm cable fly": [
    "Maintain a fixed slight bend in your elbow throughout — that angle should never change between the start and finish of the arc.",
    "All movement comes from your shoulder joint; your elbow angle is locked. If your elbow bends more as you pull, you're turning it into a row.",
    "Don't let the cable yank your arm back at the end of the return — control the full stretch.",
    "Keep your torso still; rotating your body toward the cable to get more range shifts load off your chest.",
    "Stagger your feet for a stable base — without it, you'll compensate with your torso rather than your chest doing the work."
  ],
  "EZ bar front raise": [
    "Keep your arms almost fully straight — bending your elbows to help lift the bar turns it into a partial curl, not a front raise.",
    "Don't use momentum; if you need to rock your torso to swing the bar up, reduce the weight.",
    "Stop at shoulder height — raising higher than parallel shifts load onto your traps rather than your front deltoids.",
    "Lower the bar slowly under control; the eccentric phase builds the front deltoid just as much as the lift.",
    "Keep your wrists neutral throughout — the angled EZ bar grip reduces wrist strain compared to a straight bar."
  ],
  "Hack squat calf raise": [
    "Keep your legs fully extended throughout — bending your knees shifts load from the gastrocnemius to the soleus and reduces the training effect.",
    "Use the full range of motion: heels as far below the platform edge as possible at the bottom, as high as possible at the top.",
    "Pause briefly at both ends to eliminate the stretch reflex bounce and force your calves to produce genuine force.",
    "Engage the safety handles before stepping off the machine — never leave a loaded sled unsecured.",
    "Position only the balls of your feet on the platform edge; if your heels are resting on the surface, you cannot achieve a full calf stretch."
  ],
  "Back extension": [
    "Stop when your body reaches horizontal — hyperextending past a straight line compresses your lumbar discs without adding benefit.",
    "Control the descent; letting your torso drop quickly is wasted range and can strain your lower back.",
    "Squeeze your glutes at the top to stabilize your pelvis — this also shifts some load from your lumbar to your glutes, reducing spinal stress.",
    "Maintain a neutral spine throughout — don't round your upper back as you lower down.",
    "Secure your feet firmly under the ankle rollers before beginning; a foot that slips mid-rep is a fall risk."
  ]
,
  "Dumbbell standing calf raise": [
    "Hold onto something stable with your free hand — this is a balance exercise as much as a calf exercise.",
    "Let your heel drop as low as the step allows before each rep for a full stretch.",
    "Press through the ball of your foot and rise as high onto your toes as possible at the top.",
    "Pause briefly at the top and squeeze your calf hard before lowering.",
    "Keep your knee soft and still — the movement should come from your ankle, not a knee bend.",
    "Finish all reps on one side before switching, or alternate evenly so neither calf gets shorted."
  ],
  "Decline barbell bench press": [
    "Hook your ankles securely under the rollers before you unrack — that's your anchor for the whole set.",
    "Lower the bar to your lower chest, not your upper chest like a flat press.",
    "Keep your shoulder blades pinned back and down against the bench throughout.",
    "The decline angle shortens the range of motion — don't rush it, still control the descent.",
    "Have a spotter or use a rack with safeties; decline setups are the hardest to bail out of.",
    "Elbows track at roughly 45 degrees from your torso, not flared to 90."
  ],
  "Barbell floor press": [
    "Let your upper arms rest fully on the floor at the bottom — that's your depth cue, not your chest.",
    "The pause on the floor kills momentum, so drive back up deliberately rather than bouncing.",
    "Keep your feet flat and glutes relaxed; this isn't a leg-drive lift like a full bench press.",
    "Great for locking out triceps strength since the floor removes the bottom third of a normal press.",
    "Set your grip just outside shoulder width — too wide strains the shoulders with no leg drive to help.",
    "Take a breath and brace before each rep; there's no bounce to help you out of the bottom."
  ],
  "Barbell pullover": [
    "Keep only your upper back and shoulders on the bench — hips low, like a bridge.",
    "Elbows stay soft and fixed throughout; this is a shoulder-hinge, not an elbow-bend movement.",
    "Lower the bar behind your head until you feel a real stretch through your lats and chest, not your shoulders straining.",
    "Go lighter than you think — this is a stretch-and-contract exercise, not a strength builder.",
    "Exhale as the bar arcs back up over your chest.",
    "Keep your ribs down; flaring them to chase range of motion strains the lower back."
  ],
  "Incline dumbbell fly": [
    "Keep a slight, fixed bend in your elbows the whole set — don't let them straighten or collapse.",
    "Lower until you feel a stretch across the upper chest, not until the dumbbells drop below your shoulders.",
    "Think about hugging a barrel, not pressing — the arc comes from your shoulders.",
    "Squeeze your chest at the top like you're closing a book, don't just tap the dumbbells together.",
    "Keep your shoulder blades pinned to the bench; letting them roll forward turns this into a shoulder exercise.",
    "Go lighter than your flat fly weight — the incline angle adds strain at the bottom."
  ],
  "Decline dumbbell fly": [
    "Set the bench to a shallow decline — too steep makes the setup awkward and unstable.",
    "Keep elbows softly bent and fixed throughout, same as any fly.",
    "Lower to chest level, not below — the decline angle already shortens the safe range.",
    "Squeeze at the top rather than banging the dumbbells together.",
    "This targets the lower chest fibers — pair it with an incline movement for full coverage.",
    "Have a spotter hand you the dumbbells at the start; getting into position solo on a decline is awkward."
  ],
  "Dumbbell floor press": [
    "Let your triceps touch the floor at the bottom — that's your stopping point, not a target to avoid.",
    "Keep your feet flat and core braced; there's no leg drive here to bail you out.",
    "This is a great shoulder-friendly alternative to a full bench press since the floor limits the range.",
    "Press the dumbbells slightly up and in toward each other at the top for a full chest squeeze.",
    "Get the dumbbells into position by curling them up to your chest first, then rolling back — don't muscle them up from the floor.",
    "Control the lowering; dropping your elbows onto the floor defeats the purpose."
  ],
  "Neutral-grip dumbbell press": [
    "Keep your palms facing each other for the entire rep — no rotation like a standard dumbbell press.",
    "This grip is easier on the shoulders, so it's a good option if a regular press bothers your joints.",
    "Bring the dumbbells down until your upper arms are roughly level with the bench, elbows tucked closer than a standard press.",
    "Press up and slightly in so the dumbbells nearly touch at the top.",
    "Keep your feet planted and glutes engaged for a stable base.",
    "The neutral grip also hits the triceps a bit harder than a pronated press."
  ],
  "Smith machine incline press": [
    "Set the bench under the bar before loading weight so the bar path lines up with your upper chest.",
    "Since the bar path is fixed, focus your effort on controlling the descent rather than stabilizing.",
    "Lower to your upper chest/collarbone area — that's what the incline angle targets.",
    "Keep your feet flat and shoulder blades pinned throughout.",
    "Twist to unlock the bar only once you're set and braced, not before.",
    "Don't flare your elbows past 45-60 degrees even though the machine feels more stable."
  ],
  "Machine-assisted dip": [
    "More weight on the stack means more assistance — start heavier on the assist and work down over time.",
    "Kneel centered on the platform so the machine doesn't tip or rock mid-set.",
    "Lean forward slightly for chest emphasis, stay upright for more triceps.",
    "Lower until your upper arms are roughly parallel to the floor — don't sink deeper if your shoulders complain.",
    "Press back up without locking out aggressively at the top.",
    "As you get stronger, reduce the assist weight so your bodyweight does more of the work."
  ],
  "Cable crossover": [
    "Start with a slight forward lean and a soft bend in your elbows, fixed for the whole set.",
    "Sweep your hands down and together in an arc — think hugging a tree, not pressing straight down.",
    "Cross your hands slightly at the bottom for a full chest squeeze, then reset.",
    "Keep your feet staggered for a stable base as you lean into the cables.",
    "Control the return; don't let the weight stacks slam you back to the start position.",
    "Both pulleys must match in height — check the pin on each side before you start."
  ],
  "Cable low-to-high fly": [
    "Start with the pulleys low and your hands beginning down by your hips.",
    "Sweep your arms up and in, finishing with your hands meeting above chest height.",
    "This angle targets the upper chest fibers, opposite of the high-to-low crossover.",
    "Keep a slight, fixed elbow bend throughout — don't turn it into a press.",
    "Lean your torso forward slightly as you sweep up to keep tension on the chest, not the shoulders.",
    "Squeeze and pause briefly at the top before controlling the return."
  ],
  "Decline push-ups": [
    "Elevate your feet on a sturdy box or bench — the higher the feet, the more upper-chest and shoulder emphasis.",
    "Keep your body in a straight line from head to heels; don't let your hips sag or pike up.",
    "Lower until your chest nearly touches the floor, elbows at roughly 45 degrees.",
    "This is harder than a standard push-up since more of your bodyweight loads the upper body — regress to flat push-ups if your form breaks down.",
    "Keep your core braced throughout to protect your lower back.",
    "Press through your whole palm, not just your fingers, to protect your wrists."
  ],
  "Wide-grip push-ups": [
    "Place your hands noticeably wider than shoulder width, fingers pointing slightly out.",
    "Expect a shorter range of motion than a standard push-up — that's normal with a wide grip.",
    "Let your elbows flare out more than usual; this variation intentionally emphasizes the chest over the triceps.",
    "Keep your body rigid in a straight line — a wide grip makes it easier to let your hips sag, so brace your core.",
    "Lower under control rather than dropping quickly; the wider grip adds shoulder strain if you go too fast.",
    "If your shoulders complain, narrow the grip slightly rather than pushing through pain."
  ],
  "Pendlay row": [
    "The bar rests on the floor at the bottom of every single rep — no hovering, no bouncing.",
    "Set your back flat and roughly parallel to the floor before you pull, and keep it there the whole set.",
    "Pull explosively from the floor, driving your elbows up and back.",
    "This is meant to be done for lower reps with a dead stop each rep — don't turn it into a touch-and-go row.",
    "Keep your head in a neutral position; craning your neck up strains it for no benefit.",
    "Brace your core hard before every pull since there's no momentum carrying you into the next rep."
  ],
  "Rack pull": [
    "Set the pins at knee height (or wherever you want the partial range to start) before loading the bar.",
    "This lets you overload the top half of a deadlift with more weight than you could pull from the floor.",
    "Keep the bar close to your shins and thighs the entire pull.",
    "Drive your hips through to full lockout, squeezing your glutes rather than leaning back.",
    "Don't turn this into a shrug at the top — stop once your hips and knees are fully extended.",
    "Because the range is shorter, it's easy to overload the bar too much — build up gradually."
  ],
  "Yates row": [
    "Grip the bar underhand (palms facing you) — this is what separates it from a standard barbell row.",
    "Stay more upright than a Pendlay row, around a 45-degree torso angle.",
    "Pull the bar toward your lower ribs/waist, elbows driving down and back.",
    "The underhand grip naturally recruits more biceps, so expect to feel it there too.",
    "Keep your core braced to protect your lower back at this more upright angle.",
    "Control the lowering rather than letting the bar drop and yank your shoulders."
  ],
  "Chest-supported dumbbell row": [
    "Set the bench low enough that your chest rests flat against the pad with your arms hanging free.",
    "Because your torso is locked in place, all the work comes from your back — no cheating with body English.",
    "Row the dumbbells up toward your hips, elbows driving back and slightly out.",
    "Squeeze your shoulder blades together at the top before lowering with control.",
    "Keep your neck relaxed and head in line with your spine rather than craning up.",
    "Go heavier here than a standing row since your lower back has zero involvement."
  ],
  "Incline dumbbell row": [
    "Set the bench to a steep incline and lie face-down with your chest supported.",
    "Let the dumbbells hang straight down at the start for a full stretch.",
    "Row up toward your hips, keeping your elbows close to your body rather than flared wide.",
    "This angle takes momentum completely out of the equation — feel the difference from a standing row.",
    "Keep your forehead resting on the pad or looking down to keep your neck neutral.",
    "Lower under control instead of letting the weights drop between reps."
  ],
  "Kroc row": [
    "Brace one knee and hand on a bench for support, and let the other arm hang free holding a heavy dumbbell.",
    "This is meant to be heavier and less strict than a standard single-arm row — a little hip and torso rotation is normal.",
    "Drive the dumbbell up powerfully toward your hip, using your legs and hips to help initiate the pull.",
    "Keep your lower back braced throughout since this variation puts more load through the spine.",
    "Don't let your shoulder shrug up toward your ear at the top — keep it pulled down and back.",
    "Build up in weight gradually; the momentum involved makes this easy to overdo too soon."
  ],
  "Machine high row": [
    "Set the seat height so the handles line up with your upper chest, not your stomach.",
    "Pull the handles back and down toward your upper chest, driving your elbows up and out.",
    "Squeeze your shoulder blades together hard at the back of the movement.",
    "This angle emphasizes the upper back and rear delts more than a standard mid-back row.",
    "Keep your chest pressed against the pad throughout — don't let it lift off to cheat extra range.",
    "Control the return rather than letting the weight stack yank your arms forward."
  ],
  "Machine pullover": [
    "Set the seat so the pivot point of the machine's arm lines up with your shoulders.",
    "Keep a slight, fixed bend in your elbows — this is a lat stretch-and-pull, not a triceps press.",
    "Let the arm rise until you feel a full stretch through your lats before pulling back down.",
    "Pull down and back using your lats, not your arms — imagine driving your elbows toward your hips.",
    "Keep your chest against the back pad and avoid arching to add extra range.",
    "This machine is a good option if barbell or cable pullovers bother your shoulders."
  ],
  "Cable pullover": [
    "Set the pulley high and step or kneel a comfortable distance from the tower.",
    "Keep your elbows slightly bent and fixed throughout, arcing down like the barbell version.",
    "Pull the bar down to about thigh height, focusing on driving with your lats, not your arms.",
    "Keep your ribs down and core braced instead of arching your lower back to reach further.",
    "The constant cable tension makes this a good lat finisher after heavier rows or pulldowns.",
    "Control the return back up to the stretched position rather than letting the weight yank you forward."
  ],
  "Inverted row": [
    "Set the bar at a height where you can keep your body in a straight line with a challenging lean-back angle.",
    "The lower the bar, the harder the row — raise it to make this easier, lower it to make it harder.",
    "Keep your body rigid from head to heels; don't let your hips sag toward the floor.",
    "Pull your chest to the bar, driving your elbows back rather than just bending your arms.",
    "Squeeze your shoulder blades together at the top before lowering under control.",
    "This is a great bodyweight alternative to a cable row when no machine is free."
  ],
  "Superman": [
    "Lift your arms, chest, and legs off the floor at the same time — not just your upper or lower body alone.",
    "Reach long through your fingertips and toes rather than just arching hard.",
    "Hold briefly at the top, squeezing your glutes and lower back, then lower with control.",
    "Keep your neck neutral — look at the floor a few feet in front of you, not straight ahead.",
    "This is a light, low-load exercise — don't expect to add weight, just add reps or hold time.",
    "Breathe normally through the hold rather than holding your breath."
  ],
  "Scapular pull-ups": [
    "Hang with your arms fully straight — this is not a bent-elbow pulling movement.",
    "All the motion comes from your shoulder blades pulling down and together, not your arms bending.",
    "You'll only move a few inches — that's correct, don't try to turn it into a full pull-up.",
    "Great as a warm-up before pull-ups or as a beginner regression to build shoulder control first.",
    "Keep your core braced so you're not swinging as you shrug down.",
    "Pause for a moment at the bottom of the shrug before returning to a relaxed hang."
  ],
  "Landmine press": [
    "Anchor the empty end of the bar in a landmine attachment or a sturdy corner before loading plates.",
    "The bar naturally arcs up and forward as you press — don't fight the path, follow it.",
    "A staggered stance gives you a more stable base than standing square.",
    "This angle is easier on the shoulders than a straight overhead press, making it a good option if overhead pressing bothers you.",
    "Press through the whole hand and keep your wrist stacked over your elbow.",
    "You can press with one or both hands on the bar — start with two hands to learn the path."
  ],
  "Barbell seated shoulder press": [
    "Sit on a bench with back support if your gym has one — it removes leg drive and isolates the shoulders more.",
    "Start with the bar at your upper chest/collarbone, not lower.",
    "Press straight up rather than forward, finishing with the bar over the crown of your head.",
    "Keep your core braced; without leg drive, your torso does the stabilizing.",
    "Lower under control to the same starting position each rep.",
    "If you feel pinching at the top, stop just short of full lockout rather than forcing it."
  ],
  "Dumbbell scaption raise": [
    "Raise the dumbbells along a diagonal line, roughly 30 degrees in front of your body — not straight out to the side.",
    "Lead with your thumbs slightly up throughout the raise.",
    "This angle is often more shoulder-friendly than a standard lateral raise since it avoids the impingement zone.",
    "Raise only to shoulder height; going higher adds no benefit and adds strain.",
    "Use lighter weight than a lateral raise — the diagonal path is less mechanically efficient.",
    "Keep a slight bend in your elbows and avoid using momentum to swing the weights up."
  ],
  "Cable Y-raise": [
    "Cross the cables behind you at the low pulleys before you start, so they pull diagonally.",
    "Raise your arms up and out to form a wide \"Y\" shape overhead, thumbs leading.",
    "Keep a slight bend in your elbows throughout rather than locking them straight.",
    "This trains the lower traps and rear delts together — a great posture-focused finisher.",
    "Use light weight; this is a control-and-positioning exercise, not a heavy lift.",
    "Avoid shrugging your shoulders up toward your ears as you raise your arms."
  ],
  "Cable front raise": [
    "Set the pulley low and stand facing away from the tower.",
    "Raise your arm(s) straight out in front to shoulder height, palm(s) down.",
    "The constant cable tension makes this harder at the top than a dumbbell front raise, where gravity helps at the top.",
    "Keep your torso still; don't lean back to help the weight up.",
    "Lower under control rather than letting the cable snap your arm back down.",
    "Alternate arms or do them together, whichever keeps your form cleaner."
  ],
  "Plate-loaded shoulder press": [
    "Set the seat height so the handles start level with your shoulders.",
    "Press the handles up along the machine's fixed path — no need to balance the weight yourself.",
    "Keep your back flat against the pad throughout the press.",
    "Because the path is fixed, this is a good option for building pressing strength safely as a beginner.",
    "Don't lock your elbows out aggressively at the top; stop just short.",
    "Lower under control back to the start rather than letting the weight drop."
  ],
  "Drag curl": [
    "Keep the bar in contact with your body as it travels up — dragging up your torso, not arcing away from it.",
    "Let your elbows travel backward behind your torso as the bar rises, unlike a standard curl.",
    "This shifts more emphasis onto the rear of the biceps and less onto the front delts.",
    "Use a lighter weight than your standard curl — the strength curve is different and harder at the top.",
    "Keep your wrists straight throughout rather than curling them to compensate.",
    "Lower with control, letting the bar drag back down along the same path."
  ],
  "21s barbell curl": [
    "Break the rep range into thirds: 7 bottom-half partials, 7 top-half partials, then 7 full reps.",
    "Bottom-half reps go from full extension to elbow at 90 degrees.",
    "Top-half reps go from elbow at 90 degrees to full contraction.",
    "Keep your elbows pinned at your sides through all three phases — don't let them drift forward.",
    "Use lighter weight than your usual curl; the constant tension adds up fast.",
    "Save this for the end of an arm day — it's a finisher, not a strength-building exercise."
  ],
  "Wide-grip barbell curl": [
    "Grip the bar noticeably wider than shoulder width.",
    "This grip shifts emphasis toward the inner (short) head of the biceps.",
    "Keep your elbows tucked at your sides even though the grip is wide.",
    "Expect a slightly shorter, more restricted range of motion than a standard curl.",
    "Don't let your elbows drift forward as the weight gets heavy — that's momentum taking over.",
    "Control the lowering just as carefully as the lift."
  ],
  "Zottman curl": [
    "Curl up with a normal underhand grip, palms facing up.",
    "At the very top, rotate your wrists so your palms face down before lowering.",
    "Lower slowly with the palms-down grip — this is what makes the exercise unique, hitting the forearms hard on the way down.",
    "Rotate back to palms-up only once you reach the bottom, ready for the next rep.",
    "Use less weight than a standard curl since the reversed lowering grip is noticeably harder.",
    "Keep your elbows pinned at your sides through both the curl and the reverse lowering."
  ],
  "Spider curl": [
    "Drape your torso face-down over a steep incline bench so your arms hang freely in front.",
    "Keep your upper arms glued to the bench pad throughout — no swinging.",
    "This position removes all momentum, making it a strict biceps isolation move.",
    "Curl all the way up until your biceps are fully contracted.",
    "Lower slowly and fully — the dead-hang bottom position adds a strong stretch.",
    "Use lighter weight than a standing curl; strict form here is unforgiving of ego lifting."
  ],
  "Cross-body hammer curl": [
    "Use a neutral grip (palms facing in) throughout, same as a standard hammer curl.",
    "Curl the dumbbell diagonally across your body toward the opposite shoulder, not straight up.",
    "This angle emphasizes the brachialis and forearm slightly differently than a straight hammer curl.",
    "Keep your elbow relatively fixed at your side rather than letting it drift across your body.",
    "Alternate arms with control rather than rushing through both sides.",
    "Lower back along the same diagonal path you curled up."
  ],
  "Plate-loaded machine bicep curl": [
    "Rest your upper arms fully on the angled pad before you start each set.",
    "Curl using only your forearms — the pad locks your upper arms in place so you can't cheat with body swing.",
    "Squeeze hard at the top of each rep since the machine removes any momentum.",
    "Lower under control rather than letting the plates drop and yank your arms straight.",
    "This is a good finisher exercise since strict form is easy to maintain even when fatigued.",
    "Adjust the seat so your elbows line up with the machine's pivot point."
  ],
  "Cable spider curl": [
    "Set the pulley low and drape yourself face-down over a steep incline bench facing the tower.",
    "Keep your upper arms pinned to the bench pad, same as the dumbbell spider curl.",
    "The cable keeps constant tension throughout, unlike dumbbells which go slack at the bottom.",
    "Curl all the way up to a full contraction, then lower with control.",
    "Use lighter weight than you'd expect — the constant tension makes this harder than it looks.",
    "Keep your neck relaxed, resting your head to the side or looking down."
  ],
  "Dumbbell close-grip floor press": [
    "Hold the dumbbells close together, closer than a standard floor press.",
    "Keep your elbows tucked tight to your ribs as you lower, not flared out.",
    "Let your triceps touch the floor at the bottom — that's your depth cue.",
    "This variation shifts more of the work onto the triceps compared to a regular floor press.",
    "Press the dumbbells up and slightly together at the top for a full triceps squeeze.",
    "Keep your wrists stacked directly over your elbows throughout to avoid strain."
  ],
  "Seated machine tricep extension": [
    "Adjust the seat so your upper arms are braced vertically by the pads before you start.",
    "Extend your arms fully, focusing on squeezing the triceps at the top.",
    "Keep your upper arms pinned in place throughout — only your forearms should move.",
    "Lower under control back to a full stretch rather than letting the weight drop.",
    "This machine is a safe option for isolating triceps if overhead extensions bother your elbows.",
    "Don't shrug your shoulders up as the weight gets heavier — keep them relaxed and down."
  ],
  "Bench dips": [
    "Keep your hands gripping the bench edge directly behind your hips, fingers pointing forward.",
    "Lower straight down, keeping your elbows pointing behind you rather than flaring out.",
    "Stop once your upper arms are roughly parallel to the floor — going deeper stresses the shoulders.",
    "Keep your hips close to the bench throughout; walking your feet too far out increases shoulder strain.",
    "Add a plate on your lap once bodyweight reps feel easy.",
    "If you feel shoulder pinching, reduce your range of motion rather than pushing through it."
  ],
  "Close-grip push-ups": [
    "Place your hands close together under your chest, thumbs and index fingers nearly touching.",
    "Keep your elbows tucked tight to your ribs as you lower — this is what shifts emphasis onto the triceps.",
    "Keep your body in a straight line from head to heels throughout.",
    "This is harder on the wrists than a standard push-up — keep them straight, not bent back.",
    "Lower until your chest is just above your hands, then press back up fully.",
    "Regress to a wider grip if your elbows or wrists start to complain."
  ],
  "Barbell reverse curl": [
    "Grip the bar with your palms facing down (overhand), the opposite of a standard curl.",
    "This grip shifts the work onto your forearms and brachialis more than a regular curl.",
    "Expect to use noticeably less weight than your standard curl — this grip is much weaker.",
    "Keep your wrists firm and straight throughout; don't let them bend back under the load.",
    "Keep your elbows pinned at your sides as you curl.",
    "Lower with control since the overhand grip makes the descent harder to control than it looks."
  ],
  "Dumbbell finger curl": [
    "Rest your forearms on your thighs while seated, wrists hanging just past your knees.",
    "Let the dumbbell roll down into your fingertips until it's barely held on.",
    "Curl your fingers closed around the handle, then open them again — the wrist stays still throughout.",
    "This targets grip strength specifically, distinct from a wrist curl which moves the wrist.",
    "Use light weight; grip and finger flexors fatigue quickly.",
    "Great to pair with farmers carries or dead hangs for well-rounded grip training."
  ],
  "Cable wrist curl": [
    "Rest your forearms on your thighs while seated, wrists hanging just past your knees.",
    "Curl your wrists up as far as comfortable, then lower with control.",
    "Keep your forearms pinned to your thighs throughout — only your wrists should move.",
    "The cable's constant tension makes this different from a dumbbell wrist curl, which goes slack at the top.",
    "Use light weight and higher reps; forearms respond well to volume.",
    "Don't let the weight yank your wrists down quickly between reps."
  ],
  "Cable reverse wrist curl": [
    "Grip the bar with your palms facing down throughout.",
    "Rest your forearms on your thighs, wrists hanging just past your knees.",
    "Extend your wrists upward (back of the hand lifting), then lower with control.",
    "This targets the top of the forearm, the opposite side from a regular wrist curl.",
    "Use lighter weight than the regular wrist curl — this direction is noticeably weaker.",
    "Keep your forearms still throughout; only your wrists move."
  ],
  "Bench-supported seated reverse fly": [
    "Sit facing the raised incline pad with your chest pressed against it.",
    "Raise your arms out to the sides with a slight bend in your elbows, squeezing your shoulder blades together at the top.",
    "The chest support removes all momentum, making this a strict rear-delt isolation move.",
    "Keep your head resting against the pad or looking down to avoid straining your neck.",
    "Use lighter weight than you'd expect — rear delts are a small muscle group.",
    "Lower with control rather than letting the dumbbells drop."
  ],
  "Prone dumbbell Y-raise": [
    "Lie face-down on an incline bench with your arms hanging straight down.",
    "Raise your arms up and out to form a \"Y\" shape, thumbs leading.",
    "Keep the weight light — this is a control and positioning exercise, not a strength builder.",
    "Squeeze your shoulder blades down and together at the top of the raise.",
    "Keep your neck relaxed and in line with your spine.",
    "Lower with control rather than letting your arms drop back down."
  ],
  "Cable reverse fly": [
    "Cross the cables in front of you, gripping the opposite tower's handle with each hand.",
    "Sweep your arms outward and back, squeezing your shoulder blades together.",
    "Keep a slight bend in your elbows throughout rather than locking them straight.",
    "The crossed cable path gives constant tension across a wide range, different from dumbbells.",
    "Use light weight; rear delts fatigue quickly and don't need heavy loads.",
    "Control the return to the crossed starting position rather than letting the stack yank you forward."
  ],
  "Cross-cable reverse fly": [
    "Hinge forward at the hips to roughly 45 degrees before you start, and hold that angle throughout.",
    "Reach across your body to grip the opposite tower's handle with each hand.",
    "Sweep your arms out and back, squeezing your shoulder blades together at the top.",
    "The forward lean shifts more emphasis onto the rear delts compared to standing upright.",
    "Keep your core braced to protect your lower back at this hinged angle.",
    "Use light weight and control the tempo rather than swinging through the movement."
  ],
  "Barbell high pull": [
    "Start with the bar at your thighs, knees soft, hips slightly hinged — an athletic ready position.",
    "Pull the bar up close to your body, letting your elbows lead and rise above your hands.",
    "This is a shrug-and-pull combination, not a curl — don't bend your elbows to help the bar up.",
    "Extend up onto your toes as the bar reaches its highest point for a full-body pull.",
    "Use moderate weight; the explosive nature of this pull rewards speed over heavy loads.",
    "Keep the bar close to your torso throughout — letting it drift away strains your lower back."
  ],
  "Dumbbell high pull": [
    "Start with the dumbbells at your thighs in an athletic, knees-soft stance.",
    "Pull the dumbbells up close to your body, elbows leading and rising above your hands.",
    "Same shrug-and-pull mechanics as the barbell version, just with dumbbells for a more natural hand path.",
    "Extend through your hips and up onto your toes as you pull.",
    "Keep the dumbbells close to your torso rather than swinging them out and away.",
    "Use moderate weight and focus on speed rather than maxing out the load."
  ],
  "Cable shrug": [
    "Stand facing the tower, holding the low-pulley handle or bar with straight arms.",
    "Shrug your shoulders straight up toward your ears, keeping your arms locked straight throughout.",
    "The cable's constant tension makes this feel different from a dumbbell or barbell shrug.",
    "Hold briefly at the top before lowering with control.",
    "Don't roll your shoulders — shrug straight up and straight down.",
    "Keep your knees soft and core braced rather than using your legs to help."
  ],
  "Plate-loaded shrug": [
    "Stand within the machine frame and grip the side handles with straight arms.",
    "Shrug straight up, letting the machine's loaded arms rise with your shoulders.",
    "The fixed path means you can focus entirely on the shrug without worrying about balancing free weight.",
    "Hold briefly at the top, then lower with control.",
    "This lets you load heavier than most people can safely hold with dumbbells.",
    "Keep your head neutral rather than tilting it forward or back during the shrug."
  ],
  "Barbell walking lunge": [
    "Rack the bar across your upper back like a back squat, not your neck.",
    "Take a controlled step forward, letting your back knee drop toward the floor without touching.",
    "Push off your front heel to stand and step directly into the next lunge — don't reset your feet between steps.",
    "Keep your torso upright throughout; leaning forward with a bar on your back is a balance risk.",
    "Use a wide enough training space since this is a traveling exercise.",
    "Start lighter than your stationary lunge weight until your balance and control are dialed in."
  ],
  "Barbell step-up": [
    "Rack the bar across your upper back before stepping up.",
    "Choose a box height where your knee doesn't pass much beyond 90 degrees at the bottom of the step.",
    "Drive through the heel of your stepping foot, not your back leg pushing off the floor.",
    "Stand all the way up on the box before stepping back down.",
    "Keep your torso tall throughout — don't lean forward to generate momentum.",
    "Step down under control rather than dropping off the box."
  ],
  "Box squat": [
    "Set the box at a height that puts your thighs at or slightly below parallel when you sit on it.",
    "Squat down and actually sit on the box, briefly relaxing your hips at the bottom before driving back up.",
    "Keep your shins relatively vertical as you sit back toward the box.",
    "Don't bounce off the box — pause, then drive up under control.",
    "This teaches you to sit your hips back and builds strength out of a dead stop.",
    "Keep your core braced through the pause since there's no stretch reflex to help you."
  ],
  "Dumbbell front squat": [
    "Hold the dumbbells upright at your shoulders, ends resting on your front delts.",
    "Keep your elbows up and pointing forward throughout, like a barbell front squat.",
    "Squat down keeping your torso more upright than a back squat.",
    "Drive your knees forward and out as you descend, tracking over your toes.",
    "This is a good way to train the front squat pattern if a barbell rack isn't free.",
    "Brace your core hard; the front-loaded weight punishes a soft torso."
  ],
  "Dumbbell reverse lunge": [
    "Step backward into the lunge rather than forward — this is easier on the knees than a forward lunge.",
    "Lower your back knee toward the floor without letting it slam down.",
    "Keep most of your weight on your front leg throughout the step back.",
    "Push off your front foot to return to standing rather than pushing off the back foot.",
    "Keep your torso upright; leaning forward shifts stress away from where you want it.",
    "This is often a good starting variation if forward lunges bother your knees."
  ],
  "Heel-elevated dumbbell squat": [
    "Place a small wedge or a couple of weight plates under your heels before you start.",
    "The elevation lets you sit more upright and get your knees further forward, emphasizing the quads.",
    "Keep your stance narrower than a standard squat since the heel lift changes your mechanics.",
    "This is a good option if ankle mobility limits your depth in a regular squat.",
    "Descend until your thighs are at or below parallel, torso staying tall throughout.",
    "Drive up through your whole foot even though your heels are elevated."
  ],
  "Belt squat": [
    "Clip the hip belt on and stand tall on the platform before unracking any load.",
    "Since the load hangs from your hips, your spine is completely unloaded — a great option if back squats bother your lower back.",
    "Keep your hands free or lightly resting on the side rails, not gripping and pulling on them.",
    "Squat down keeping your torso upright, letting the belt's load travel between your legs.",
    "Drive through your whole foot to stand back up.",
    "This is a good way to keep training legs hard while managing a cranky lower back."
  ],
  "Pendulum squat": [
    "Position your shoulders under the pads before you start, feet on the angled platform.",
    "The pivoting arm means the resistance changes through the range — it gets harder as you descend.",
    "Keep your back flat against the pad throughout the squat.",
    "This machine allows a very controlled, joint-friendly squat pattern since the path is fixed.",
    "Descend under control; the machine's resistance curve rewards a slow, deliberate lowering phase.",
    "Drive back up through your whole foot to complete the arc."
  ],
  "Vertical leg press": [
    "Lie on your back with your knees pulled toward your chest and feet on the platform overhead.",
    "Press the platform straight up until your legs are extended, stopping just short of locking your knees.",
    "This angle puts more of your bodyweight into the resistance than a 45-degree leg press.",
    "Keep your lower back pressed into the pad throughout — don't let it round up off the pad.",
    "Control the platform back down to a full range rather than letting it crash toward your chest.",
    "Start with lighter weight than a standard leg press since the vertical angle feels heavier."
  ],
  "Bodyweight squat": [
    "Reach your arms forward as you descend to counterbalance your weight.",
    "Sit your hips back and down, keeping your chest up and heels flat.",
    "Go as deep as your mobility comfortably allows — full depth if you can keep good form.",
    "This is the foundation movement for every other squat variation — own it before adding weight.",
    "Push the floor away through your whole foot to stand back up.",
    "Use this as a warm-up or high-rep finisher, not just a beginner-only movement."
  ],
  "Jump squat": [
    "Load into a quarter squat, swinging your arms back before you jump.",
    "Explode upward as hard as you can, swinging your arms forward and up.",
    "Land softly with bent knees, absorbing the impact rather than landing stiff-legged.",
    "Reset fully between reps rather than bouncing straight into the next jump if you're building power.",
    "This is a power and conditioning exercise — keep the reps moderate and quality high.",
    "Land on a surface with some give if possible; concrete floors are hard on the joints."
  ],
  "Wall sit": [
    "Slide your back down a wall until your thighs are roughly parallel to the floor.",
    "Keep your knees stacked directly over your ankles, not pushed forward past your toes.",
    "Press your entire back flat against the wall throughout the hold.",
    "Breathe normally through the hold instead of holding your breath.",
    "This is a static isometric hold — track time held rather than reps.",
    "Add a light dumbbell on your lap once bodyweight holds feel easy."
  ],
  "Barbell good morning": [
    "Rack the bar across your upper back like a squat, not your neck.",
    "Hinge at your hips, pushing them back as your torso lowers toward parallel with the floor.",
    "Keep a soft, fixed bend in your knees throughout — this is a hip hinge, not a squat.",
    "Keep your back flat the entire time; a rounding back with a bar on it is a real injury risk.",
    "Start very light — this exercise is unforgiving of ego lifting and heavily loads the lower back and hamstrings.",
    "Stop your descent once your torso reaches parallel to the floor, or sooner if your hamstrings are tight."
  ],
  "Sumo deadlift": [
    "Take a wide stance with your toes turned out, and grip the bar with your hands inside your knees.",
    "Push your knees out over your toes as you set your position before pulling.",
    "This stance is more upright than a conventional deadlift, so it tends to load the quads and inner thighs more.",
    "Drive your hips and shoulders up together as the bar leaves the floor.",
    "Keep the bar close to your body throughout the pull.",
    "Squeeze your glutes to finish at the top rather than leaning back."
  ],
  "Stiff-leg deadlift": [
    "Keep your legs almost completely straight throughout — only a very slight knee bend.",
    "Hinge forward from your hips, letting the bar slide down close to your legs.",
    "Stop once you feel a strong stretch in your hamstrings, usually around shin height.",
    "Keep your back flat; this variation puts more strain on the lower back if it rounds.",
    "This targets the hamstrings harder than a Romanian deadlift since the knees barely bend.",
    "Use lighter weight than a regular deadlift — the straight-leg position is a mechanical disadvantage."
  ],
  "Single-leg dumbbell RDL": [
    "Stand tall on one leg with a dumbbell in each hand before you start.",
    "Hinge forward at your hips while your free leg extends straight back, forming a \"T\" shape with your torso.",
    "Keep a slight bend in your standing knee throughout, not locked straight.",
    "Keep your hips square to the floor — don't let them rotate open as you hinge.",
    "This is as much a balance exercise as a strength one — expect some wobble while you learn it.",
    "Lower the dumbbells only as far as your hamstring flexibility and balance allow."
  ],
  "Dumbbell sumo deadlift": [
    "Grip a single dumbbell vertically with both hands between your legs.",
    "Take a wide stance with toes turned out, same as a sumo deadlift.",
    "Keep the dumbbell close to your body as you stand up.",
    "Drive through your whole foot and squeeze your glutes to finish at the top.",
    "Keep your back flat throughout; don't round over to reach the dumbbell.",
    "This is a good sumo-pattern option when a barbell setup isn't available."
  ],
  "Standing machine hamstring curl": [
    "Lean into the chest pad for support before you start curling.",
    "Curl your heel up toward your glute, keeping your hips still throughout.",
    "This standing position lets you train one leg at a time with strict form.",
    "Squeeze at the top of the curl before lowering with control.",
    "Keep your standing leg soft, not locked out, for stability.",
    "Don't let your hips shift back to help the curl — that's momentum taking over."
  ],
  "Cable pull-through": [
    "Set the pulley low and face away from the tower, straddling the cable with the rope between your legs.",
    "Hinge forward at your hips, letting the rope pull your hands back between your legs.",
    "Keep your back flat and knees softly bent throughout — this is a hip hinge, not a squat.",
    "Drive your hips forward powerfully to stand up, squeezing your glutes at the top.",
    "Keep the rope close to your body as it swings through.",
    "This is a great way to learn the hip hinge pattern before loading a deadlift."
  ],
  "B-stance barbell hip thrust": [
    "Rest your upper back against a bench with the bar across your hips, and stagger your feet.",
    "Keep most of your weight on the flat-planted foot; the other foot is just there for light balance.",
    "Drive through the working leg to full hip extension, squeezing that glute hard at the top.",
    "This lets you address side-to-side strength differences without going fully single-leg.",
    "Keep your chin tucked slightly and avoid hyperextending your neck at the top.",
    "Lower under control back to the start rather than dropping your hips."
  ],
  "Barbell glute bridge": [
    "Lie on your back on the floor with the bar across your hips and knees bent.",
    "Drive your hips straight up, squeezing your glutes hard at the top.",
    "Keep your upper back and head resting on the floor throughout — this is what separates it from a hip thrust.",
    "Because the range is shorter than a hip thrust, this is a good option if you don't have a bench available.",
    "Keep your chin tucked and avoid overextending your lower back at the top.",
    "Lower with control rather than dropping your hips back to the floor."
  ],
  "Curtsy lunge": [
    "Step one leg diagonally back and across behind your other leg, like a curtsy.",
    "Keep most of your weight on your front leg as you lower.",
    "This angle hits the glutes, particularly the glute medius, differently than a standard lunge.",
    "Keep your torso upright and hips facing forward throughout the movement.",
    "Push through your front heel to return to standing.",
    "Expect some balance challenge at first — this is a less natural movement pattern than a straight lunge."
  ],
  "Dumbbell single-leg hip thrust": [
    "Rest your upper back against a bench with a single dumbbell resting on your hips.",
    "Plant one foot flat on the floor and extend the other leg straight out, unweighted.",
    "Drive through the planted foot to full hip extension, keeping the free leg straight throughout.",
    "This isolates one glute at a time and exposes any left-right strength imbalance.",
    "Keep your hips level — don't let the free-leg side dip or rotate.",
    "Use lighter weight than the two-leg version since you're working one side at a time."
  ],
  "45-degree hip extension machine": [
    "Position your hips at the top edge of the pad with your ankles secured under the rollers.",
    "Hinge down until you feel a stretch in your hamstrings, keeping your back flat, not rounded.",
    "Rise back up until your body forms a straight line from shoulders to ankles — don't hyperextend past that.",
    "Cross your arms over your chest for a bodyweight-only version, or hold a plate to add load.",
    "Squeeze your glutes at the top of each rep rather than just using your lower back.",
    "This is a great glute and hamstring builder that's easy on the knees."
  ],
  "Standing plate-loaded glute kickback": [
    "Brace yourself on the machine's frame with one foot planted on the loaded platform.",
    "Drive the working leg back and up in a straight line, squeezing the glute hard at the top.",
    "Keep your torso stable and only slightly hinged — don't let it swing to help the kick.",
    "Keep your hips square rather than opening them toward the working side.",
    "Lower with control back to the start rather than letting the weight stack drop you.",
    "This lets you load heavier than the cable version of the same movement."
  ],
  "Single-leg glute bridge": [
    "Lie on your back, one knee bent with the foot flat, the other leg extended straight.",
    "Drive your hips up through the planted foot, keeping the extended leg straight and steady.",
    "Squeeze the glute of your working leg hard at the top.",
    "Keep your hips level throughout — don't let the free-leg side dip.",
    "This is a great way to build single-leg glute strength with no equipment at all.",
    "Lower with control rather than dropping your hips back down."
  ],
  "Frog pump": [
    "Lie on your back with the soles of your feet pressed together and knees splayed wide.",
    "Drive your hips up while keeping your knees wide and feet together the whole time.",
    "This position emphasizes the glutes intensely due to the externally rotated hip angle.",
    "Squeeze hard at the top for a full glute contraction rather than rushing through reps.",
    "This exercise responds well to higher rep ranges since the range of motion is short.",
    "Keep your lower back from overarching at the top of each rep."
  ],
  "Donkey kicks": [
    "Start on your hands and knees with your back flat, not sagging or arched.",
    "Keep your knee bent at a fixed 90-degree angle as you kick your foot up toward the ceiling.",
    "Drive through your heel rather than pointing your toes.",
    "Squeeze your glute at the top of each kick, avoiding lower-back arching to gain extra height.",
    "Keep your hips square to the floor throughout — don't let them rotate open.",
    "This is a low-load exercise; focus on the mind-muscle connection rather than speed."
  ],
  "Barbell standing calf raise": [
    "Rack the bar across your upper back like a squat before stepping onto the block.",
    "Stand with the balls of your feet on a small block, heels hanging off the back.",
    "Lower your heels below the block for a full stretch before rising.",
    "Rise up onto your toes as high as you can, squeezing your calves hard at the top.",
    "Keep your legs relatively straight throughout — this isn't a squat.",
    "Pause briefly at the top of each rep rather than bouncing straight back down."
  ],
  "Single-leg dumbbell calf raise": [
    "Hold a dumbbell in one hand and lightly touch a wall or rack with the other for balance.",
    "Stand on one foot on a small block with your heel hanging off the back edge.",
    "Lower your heel below the block for a full stretch before rising.",
    "Rise up onto your toes as high as possible, squeezing your calf at the top.",
    "Single-leg work exposes and corrects any left-right calf strength imbalance.",
    "Keep the non-working leg lifted clear of the floor throughout the set."
  ],
  "Dumbbell seated calf raise": [
    "Sit on a bench with your feet on a small block and a dumbbell balanced upright on each knee.",
    "Lower your heels below the block for a full stretch before rising.",
    "Rise up onto your toes, keeping the dumbbells balanced and steady on your knees.",
    "The seated angle shifts emphasis onto the soleus rather than the larger calf muscle worked when standing.",
    "Use your hands to keep the dumbbells from tipping rather than to help lift them.",
    "Pause briefly at the top of each rep for a full contraction."
  ],
  "Donkey calf raise machine": [
    "Bend forward at the hips and brace your waist under the machine's loaded pad.",
    "Place the balls of your feet on the platform with your heels hanging off the edge.",
    "Lower your heels for a full stretch before rising onto your toes.",
    "This bent-over position is considered one of the most effective calf-building angles due to the stretch it creates.",
    "Keep your legs relatively straight and let your ankles do the work.",
    "Hold the support bar for balance, not to help lift the weight."
  ],
  "Standing bodyweight calf raise": [
    "Stand on the edge of a small step with the balls of your feet planted and heels hanging off.",
    "Lower your heels below the step for a deep stretch before rising.",
    "Rise up onto your toes as high as you can, pausing briefly at the top.",
    "Lightly touch a wall for balance if needed, without using your hands to help lift.",
    "This is a great warm-up or high-rep finisher requiring no equipment at all.",
    "Slow the tempo down if bodyweight reps start feeling too easy, rather than adding load right away."
  ],
  "Single-leg bodyweight calf raise": [
    "Stand on one foot on the edge of a small step, heel hanging off the back.",
    "Lower your heel for a full stretch, then rise up onto your toes as high as possible.",
    "Keep your non-working foot lifted clear of the floor the whole set.",
    "This is noticeably harder than the two-leg version since you're lifting your full bodyweight on one calf.",
    "Lightly touch a wall for balance rather than gripping it to assist the lift.",
    "Add a dumbbell in one hand once bodyweight reps feel too easy."
  ],
  "Side-lying dumbbell hip adduction": [
    "Lie on your side with your top leg bent, foot planted in front of your bottom leg.",
    "Rest a light dumbbell on the ankle of your straight, bottom leg.",
    "Lift the bottom leg straight up toward the bent top leg — that's the working motion.",
    "Keep the lifting leg straight throughout rather than letting the knee bend.",
    "This targets your inner thigh (adductors), a muscle group most training plans neglect.",
    "Use light weight; the adductors are a smaller muscle group than the quads or hamstrings."
  ],
  "Cable hip adduction": [
    "Attach the ankle cuff to the leg farther from the tower and stand sideways to it.",
    "Start with that leg raised out to the side, crossing your body's midline.",
    "Sweep the leg inward, across your body, past your standing leg.",
    "Hold the machine frame for balance rather than using momentum to swing the leg.",
    "Keep your torso upright throughout rather than leaning to help the leg move.",
    "Switch sides and match the reps to keep both legs balanced."
  ],
  "Sumo squat hold": [
    "Take a wide stance with your toes turned out before lowering into the squat.",
    "Sink down until your thighs are parallel to the floor, then hold that position.",
    "Keep your knees tracking out over your toes throughout the hold.",
    "Keep your torso upright and chest tall rather than leaning forward.",
    "Hold a single dumbbell at your chest to add difficulty once the bodyweight hold feels easy.",
    "Breathe normally through the hold rather than holding your breath."
  ],
  "Cable hip abduction": [
    "Attach the ankle cuff to the leg closer to the tower and stand sideways to it.",
    "Start with that leg crossed slightly in front of your standing leg.",
    "Sweep the leg outward, away from your body, as far as comfortable.",
    "Hold the machine frame for balance rather than leaning your torso to help.",
    "This targets your outer hip (abductors), important for hip stability during walking and running.",
    "Switch sides and match the reps to keep both hips balanced."
  ],
  "Side-lying leg raise": [
    "Lie on your side with your legs stacked and straight.",
    "Lift your top leg straight up, keeping it in line with your body rather than swinging it forward.",
    "Keep your hips stacked vertically — don't let them roll backward as you lift.",
    "Lower with control rather than dropping the leg back down.",
    "This is a great equipment-free way to target the outer hip.",
    "Add an ankle weight once bodyweight reps feel too easy."
  ],
  "Clamshells": [
    "Lie on your side with your knees bent and stacked, feet together.",
    "Keep your feet touching throughout as you open your top knee upward like a hinge.",
    "Keep your hips stacked and still — rolling your hips back to fake extra range is the most common mistake.",
    "This targets the glute medius specifically, a muscle that's easy to neglect.",
    "Add a light resistance band around your thighs once bodyweight reps feel too easy.",
    "Move slowly and with control rather than snapping the knee open."
  ],
  "Standing hip abduction": [
    "Stand tall, lightly holding a wall or chair for balance.",
    "Lift one leg straight out to the side, keeping it fully extended.",
    "Keep your torso upright throughout — don't lean away from the raised leg to cheat extra height.",
    "Lower with control rather than dropping the leg back down.",
    "Add a light ankle band once bodyweight reps feel too easy.",
    "This is a convenient option for hip stability work anywhere, no equipment required."
  ],
  "Dumbbell side bend": [
    "Hold a single dumbbell in one hand, letting it hang at your side.",
    "Bend directly sideways toward the dumbbell, keeping the motion in one plane — no twisting or leaning forward.",
    "Feel the stretch on the opposite side of your torso at the bottom of the bend.",
    "This targets your obliques on the working side.",
    "Keep your core braced throughout rather than letting your lower back do the work.",
    "Switch hands and match the reps to train both sides evenly."
  ],
  "Weighted sit-up": [
    "Hold a single dumbbell or plate against your chest with both hands throughout the movement.",
    "Keep the weight clamped tight to your chest — letting it drift forward adds strain to your lower back.",
    "Curl your torso all the way up to a seated position, driven by your abs, not momentum.",
    "Keep your feet flat on the floor or anchored under something stable.",
    "Lower with control rather than dropping back down quickly.",
    "Only add weight once bodyweight sit-ups feel too easy to challenge you."
  ],
  "Cable woodchopper": [
    "Set the pulley high and stand sideways to the tower, gripping the handle with both hands near one shoulder.",
    "Rotate your torso and pull the handle diagonally down and across your body toward the opposite hip.",
    "Let your hips rotate along with your torso — this is a full rotational movement, not just an arm pull.",
    "Keep your arms relatively straight throughout; the power comes from your core rotating, not your arms pulling.",
    "Control the return to the starting position rather than letting the cable snap you back.",
    "Switch sides and match the reps to train rotation evenly in both directions."
  ],
  "Captains chair leg raise": [
    "Rest your forearms on the padded armrests and press your back into the pad.",
    "Raise your legs up in front of you, bending your knees toward your chest or keeping them straight for a harder version.",
    "Keep your torso still and braced against the pad throughout — don't swing to generate momentum.",
    "Lower with control rather than letting your legs drop.",
    "This is a great option if hanging leg raises are too hard on your grip.",
    "Curl your pelvis slightly at the top of each rep for a fuller ab contraction."
  ],
  "Hollow body hold": [
    "Lie on your back, then lift your shoulders and legs off the floor at the same time.",
    "Extend your arms overhead and your legs straight, forming a shallow curved shape.",
    "Keep your lower back pressed into the floor throughout the hold — that's your main checkpoint.",
    "Lower your legs closer to the floor to make it harder, or bend your knees to make it easier.",
    "Breathe normally through the hold instead of holding your breath.",
    "This is a foundational gymnastics core position — track hold time rather than reps."
  ],
  "V-ups": [
    "Lie flat with your arms extended overhead and legs straight.",
    "Simultaneously fold your torso and legs upward, reaching your hands toward your toes.",
    "Keep both your arms and legs relatively straight throughout the fold.",
    "Only your hips should touch the floor at the top of the movement.",
    "Lower back down with control rather than dropping quickly.",
    "Bend your knees slightly to regress this if a full straight-leg V-up is too difficult at first."
  ]
};
const EX_NAMES_JA={
"Ab wheel rollout": "アブローラー",
"Arnold press": "アーノルドプレス",
"Back extension": "バックエクステンション",
"Barbell back squat": "バーベルバックスクワット",
"Barbell curl": "バーベルカール",
"Barbell deadlift": "バーベルデッドリフト",
"Barbell front squat": "バーベルフロントスクワット",
"Barbell hip thrust": "バーベルヒップスラスト",
"Barbell overhead press": "バーベルオーバーヘッドプレス",
"Barbell push press": "バーベルプッシュプレス",
"Barbell row": "バーベルロウ",
"Barbell shrug": "バーベルシュラッグ",
"Barbell skull crusher": "バーベルスカルクラッシャー",
"Barbell upright row": "バーベルアップライトロウ",
"Bench dumbbell chest press": "ダンベルベンチプレス",
"Bent-over dumbbell reverse fly": "ベントオーバーダンベルリアレイズ",
"Bicycle crunch": "バイシクルクランチ",
"Bulgarian split squat": "ブルガリアンスクワット",
"Cable bicep curl": "ケーブルカール",
"Cable chest fly": "ケーブルフライ",
"Cable crunch": "ケーブルクランチ",
"Cable face pull": "ケーブルフェイスプル",
"Cable glute kickback": "ケーブルグルートキックバック",
"Cable lateral raise": "ケーブルラテラルレイズ",
"Cable rope hammer curl": "ケーブルロープハンマーカール",
"Cable rope tricep extension": "ケーブルロープトライセプスエクステンション",
"Cable tricep kickback": "ケーブルトライセプスキックバック",
"Chest dips": "チェストディップス",
"Chest-supported machine row": "チェストサポートマシンロウ",
"Chin-ups": "チンアップ",
"Close-grip bench press": "クローズグリップベンチプレス",
"Concentration curl": "コンセントレーションカール",
"Dead hang": "デッドハング",
"Decline dumbbell press": "デクラインダンベルプレス",
"Decline sit-ups": "デクラインシットアップ",
"Diamond push-ups": "ダイヤモンドプッシュアップ",
"Dumbbell Romanian deadlift": "ダンベルルーマニアンデッドリフト",
"Dumbbell bicep curl": "ダンベルカール",
"Dumbbell fly": "ダンベルフライ",
"Dumbbell front raise": "ダンベルフロントレイズ",
"Dumbbell hip thrust": "ダンベルヒップスラスト",
"Dumbbell lateral raise": "ダンベルサイドレイズ",
"Dumbbell lunge": "ダンベルランジ",
"Dumbbell pullover": "ダンベルプルオーバー",
"Dumbbell reverse wrist curl": "ダンベルリバースリストカール",
"Dumbbell shrug": "ダンベルシュラッグ",
"Dumbbell skull crusher": "ダンベルスカルクラッシャー",
"Dumbbell standing calf raise": "ダンベルスタンディングカーフレイズ",
"Dumbbell step-up": "ダンベルステップアップ",
"Dumbbell sumo squat": "ダンベルスモウスクワット",
"Dumbbell wrist curl": "ダンベルリストカール",
"EZ bar curl": "EZバーカール",
"EZ bar front raise": "EZバーフロントレイズ",
"Farmers carry": "ファーマーズウォーク",
"Flat barbell bench press": "バーベルベンチプレス(フラット)",
"Glute bridge": "グルートブリッジ",
"Goblet squat": "ゴブレットスクワット",
"Hack squat": "ハックスクワット",
"Hack squat calf raise": "ハックスクワットカーフレイズ",
"Hammer curls": "ハンマーカール",
"Hanging leg raise": "ハンギングレッグレイズ",
"Incline barbell chest press": "インクラインバーベルベンチプレス",
"Incline bench dumbbell press": "インクラインダンベルプレス",
"Incline bench dumbbell rear delt fly": "インクラインダンベルリアデルトフライ",
"Incline dumbbell curl": "インクラインダンベルカール",
"Lat pulldown": "ラットプルダウン",
"Leg extension": "レッグエクステンション",
"Leg press": "レッグプレス",
"Leg press calf raise": "レッグプレスカーフレイズ",
"Leg raise": "レッグレイズ",
"Lying hamstring curl": "ライイングレッグカール",
"Machine abduction": "マシンアブダクション",
"Machine adduction": "マシンアダクション",
"Machine chest fly": "マシンチェストフライ",
"Machine chest press": "マシンチェストプレス",
"Machine hip thrust": "マシンヒップスラスト",
"Machine lateral raise": "マシンラテラルレイズ",
"Machine preacher curl": "マシンプリーチャーカール",
"Machine rear delt fly": "マシンリアデルトフライ",
"Machine seated crunch": "マシンクランチ",
"Machine shoulder press": "マシンショルダープレス",
"Machine-assisted pull-up": "アシスト付き懸垂（マシン）",
"Mountain climbers": "マウンテンクライマー",
"Overhead EZ bar tricep extension": "EZバー・オーバーヘッドトライセプスエクステンション",
"Overhead cable tricep extension": "ケーブル・オーバーヘッドトライセプスエクステンション",
"Pike push-ups": "パイクプッシュアップ",
"Plank": "プランク",
"Plate-loaded standing calf raise": "プレートロード式スタンディングカーフレイズ",
"Preacher curl": "プリーチャーカール",
"Pull-ups": "懸垂（プルアップ）",
"Push-ups": "プッシュアップ（腕立て伏せ）",
"Reverse EZ bar curl": "EZバー・リバースカール",
"Reverse grip pulldown": "リバースグリップ・ラットプルダウン",
"Romanian deadlift": "ルーマニアンデッドリフト",
"Russian twist": "ロシアンツイスト",
"Seated cable row": "シーテッドケーブルロー",
"Seated calf raise": "シーテッドカーフレイズ",
"Seated dumbbell shoulder press": "シーテッドダンベルショルダープレス",
"Seated hamstring curl": "シーテッドレッグカール",
"Side plank": "サイドプランク",
"Single-arm cable fly": "シングルアーム・ケーブルフライ",
"Single-arm dumbbell overhead tricep extension": "シングルアーム・ダンベル・オーバーヘッドトライセプスエクステンション",
"Single-arm dumbbell row": "ワンハンドダンベルロウ",
"Single-arm lat pulldown": "シングルアーム・ラットプルダウン",
"Single-arm tricep kickback": "ワンハンドトライセプスキックバック",
"Smith machine Romanian deadlift": "スミスマシン・ルーマニアンデッドリフト",
"Smith machine bench press": "スミスマシン・ベンチプレス",
"Smith machine hip thrust": "スミスマシン・ヒップスラスト",
"Smith machine inverted row": "スミスマシン・インバーテッドロウ",
"Smith machine shoulder press": "スミスマシン・ショルダープレス",
"Smith machine shrug": "スミスマシン・シュラッグ",
"Smith machine squat": "スミスマシン・スクワット",
"Smith machine standing calf raise": "スミスマシン・スタンディングカーフレイズ",
"Straight arm cable pulldown": "ストレートアーム・ケーブルプルダウン",
"T-bar row": "Tバーロウ",
"Tricep dips": "トライセプスディップス",
"Triceps pushdown": "トライセプスプッシュダウン",
"Walking lunge": "ウォーキングランジ",
"Wide-grip cable row": "ワイドグリップ・ケーブルロウ"
};
const EX_NAMES_KO={
"Ab wheel rollout": "AB 롤아웃",
"Arnold press": "아놀드 프레스",
"Back extension": "백 익스텐션",
"Barbell back squat": "바벨 백 스쿼트",
"Barbell curl": "바벨 컬",
"Barbell deadlift": "바벨 데드리프트",
"Barbell front squat": "바벨 프론트 스쿼트",
"Barbell hip thrust": "바벨 힙 쓰러스트",
"Barbell overhead press": "바벨 오버헤드 프레스",
"Barbell push press": "바벨 푸시 프레스",
"Barbell row": "바벨 로우",
"Barbell shrug": "바벨 슈러그",
"Barbell skull crusher": "바벨 스컬크러셔",
"Barbell upright row": "바벨 업라이트 로우",
"Bench dumbbell chest press": "벤치 덤벨 체스트 프레스",
"Bent-over dumbbell reverse fly": "벤트오버 덤벨 리버스 플라이",
"Bicycle crunch": "바이시클 크런치",
"Bulgarian split squat": "불가리안 스플릿 스쿼트",
"Cable bicep curl": "케이블 바이셉 컬",
"Cable chest fly": "케이블 체스트 플라이",
"Cable crunch": "케이블 크런치",
"Cable face pull": "케이블 페이스 풀",
"Cable glute kickback": "케이블 글루트 킥백",
"Cable lateral raise": "케이블 레터럴 레이즈",
"Cable rope hammer curl": "케이블 로프 해머 컬",
"Cable rope tricep extension": "케이블 로프 트라이셉스 익스텐션",
"Cable tricep kickback": "케이블 트라이셉스 킥백",
"Chest dips": "체스트 딥스",
"Chest-supported machine row": "체스트 서포티드 머신 로우",
"Chin-ups": "친업",
"Close-grip bench press": "클로즈그립 벤치프레스",
"Concentration curl": "컨센트레이션 컬",
"Dead hang": "데드행",
"Decline dumbbell press": "디클라인 덤벨 프레스",
"Decline sit-ups": "디클라인 싯업",
"Diamond push-ups": "다이아몬드 푸시업",
"Dumbbell Romanian deadlift": "덤벨 루마니안 데드리프트",
"Dumbbell bicep curl": "덤벨 바이셉 컬",
"Dumbbell fly": "덤벨 플라이",
"Dumbbell front raise": "덤벨 프론트 레이즈",
"Dumbbell hip thrust": "덤벨 힙 스러스트",
"Dumbbell lateral raise": "덤벨 레터럴 레이즈",
"Dumbbell lunge": "덤벨 런지",
"Dumbbell pullover": "덤벨 풀오버",
"Dumbbell reverse wrist curl": "덤벨 리버스 리스트 컬",
"Dumbbell shrug": "덤벨 슈러그",
"Dumbbell skull crusher": "덤벨 스컬크러셔",
"Dumbbell standing calf raise": "덤벨 스탠딩 카프 레이즈",
"Dumbbell step-up": "덤벨 스텝업",
"Dumbbell sumo squat": "덤벨 스모 스쿼트",
"Dumbbell wrist curl": "덤벨 리스트 컬",
"EZ bar curl": "EZ바 컬",
"EZ bar front raise": "EZ바 프론트 레이즈",
"Farmers carry": "파머스 캐리",
"Flat barbell bench press": "플랫 바벨 벤치프레스",
"Glute bridge": "글루트 브릿지",
"Goblet squat": "고블릿 스쿼트",
"Hack squat": "핵 스쿼트",
"Hack squat calf raise": "핵 스쿼트 카프 레이즈",
"Hammer curls": "해머 컬",
"Hanging leg raise": "행잉 레그레이즈",
"Incline barbell chest press": "인클라인 바벨 벤치프레스",
"Incline bench dumbbell press": "인클라인 덤벨 벤치프레스",
"Incline bench dumbbell rear delt fly": "인클라인 벤치 덤벨 리어 델트 플라이",
"Incline dumbbell curl": "인클라인 덤벨 컬",
"Lat pulldown": "랫 풀다운",
"Leg extension": "레그 익스텐션",
"Leg press": "레그 프레스",
"Leg press calf raise": "레그프레스 카프 레이즈",
"Leg raise": "레그레이즈",
"Lying hamstring curl": "라잉 레그컬",
"Machine abduction": "힙 어브덕션 머신",
"Machine adduction": "힙 어덕션 머신",
"Machine chest fly": "머신 체스트 플라이",
"Machine chest press": "머신 체스트 프레스",
"Machine hip thrust": "머신 힙 쓰러스트",
"Machine lateral raise": "머신 레터럴 레이즈",
"Machine preacher curl": "머신 프리처 컬",
"Machine rear delt fly": "머신 리어 델트 플라이",
"Machine seated crunch": "시티드 크런치 머신",
"Machine shoulder press": "머신 숄더프레스",
"Machine-assisted pull-up": "어시스트 풀업",
"Mountain climbers": "마운틴 클라이머",
"Overhead EZ bar tricep extension": "EZ바 오버헤드 트라이셉스 익스텐션",
"Overhead cable tricep extension": "케이블 오버헤드 트라이셉스 익스텐션",
"Pike push-ups": "파이크 푸시업",
"Plank": "플랭크",
"Plate-loaded standing calf raise": "플레이트 로디드 스탠딩 카프레이즈",
"Preacher curl": "프리처 컬",
"Pull-ups": "풀업",
"Push-ups": "푸시업",
"Reverse EZ bar curl": "리버스 EZ바 컬",
"Reverse grip pulldown": "리버스 그립 랫풀다운",
"Romanian deadlift": "루마니안 데드리프트",
"Russian twist": "러시안 트위스트",
"Seated cable row": "시티드 케이블 로우",
"Seated calf raise": "시티드 카프레이즈",
"Seated dumbbell shoulder press": "시티드 덤벨 숄더프레스",
"Seated hamstring curl": "시티드 레그컬",
"Side plank": "사이드 플랭크",
"Single-arm cable fly": "원암 케이블 플라이",
"Single-arm dumbbell overhead tricep extension": "원암 덤벨 오버헤드 트라이셉스 익스텐션",
"Single-arm dumbbell row": "원암 덤벨 로우",
"Single-arm lat pulldown": "원암 랫풀다운",
"Single-arm tricep kickback": "원암 트라이셉스 킥백",
"Smith machine Romanian deadlift": "스미스 머신 루마니안 데드리프트",
"Smith machine bench press": "스미스 머신 벤치프레스",
"Smith machine hip thrust": "스미스 머신 힙 쓰러스트",
"Smith machine inverted row": "스미스 머신 인버티드 로우",
"Smith machine shoulder press": "스미스 머신 숄더프레스",
"Smith machine shrug": "스미스 머신 슈러그",
"Smith machine squat": "스미스 머신 스쿼트",
"Smith machine standing calf raise": "스미스 머신 스탠딩 카프레이즈",
"Straight arm cable pulldown": "스트레이트 암 케이블 풀다운",
"T-bar row": "T바 로우",
"Tricep dips": "트라이셉스 딥스",
"Triceps pushdown": "트라이셉스 푸시다운",
"Walking lunge": "워킹 런지",
"Wide-grip cable row": "와이드 그립 케이블 로우"
};
function exDisplayName(name){if(CFG.lang==='ja'&&EX_NAMES_JA[name])return EX_NAMES_JA[name];if(CFG.lang==='ko'&&EX_NAMES_KO[name])return EX_NAMES_KO[name];return name;}
const EX_TIPS_JA={
"Ab wheel rollout": [
"転がし始める前に骨盤を軽く後傾させ、お尻をキュッと締めましょう。",
"腰が反らない範囲までしか転がさないようにしましょう。",
"戻す力は腹筋から。腕はホイールを支えるだけです。",
"腕は伸ばしたまま。曲げると三頭筋の種目になってしまいます。",
"戻すときに息を吐き、転がし出す前に体幹をしっかり固めましょう。",
"距離は少しずつ伸ばしましょう。完全に伸びきるフルロールアウトは上級者向けです。"
],
"Arnold press": [
"最初は座った姿勢で、ダンベルを肩の前、手のひらを自分に向けた状態から始めましょう。",
"ダンベルを頭上に押し上げながら、手のひらを外側に回転させましょう。",
"腰が反りすぎないよう、背中はベンチにしっかり付けておきましょう。",
"下ろすときは回転の動きをスムーズに逆再生するイメージで戻しましょう。",
"押し上げて回転させるときに息を吐き、下ろして戻すときに息を吸いましょう。",
"回転を急がず、可動域全体を通してゆっくり行いましょう。",
"手首の動きに合わせて体幹まで一緒にひねらないよう、コアをしっかり固めましょう。",
"プレスの最上部でダンベルが頭より後ろに流れないようにしましょう。",
"回転が加わる分、通常のプレスより軽い重量を使いましょう。",
"肘は体の外側に大きく開かず、やや前方をキープしましょう。",
"回転する軌道の中で三角筋の3つのパートすべてに効いている感覚を意識しましょう。",
"最後はダンベルを落とし込まず、コントロールして下ろしましょう。"
],
"Back extension": [
"体が水平になったところで止めましょう。まっすぐより上に反らすと、効果がないまま腰椎に負担がかかります。",
"下ろす動作はコントロールしましょう。勢いよく体を落とすのは可動域の無駄遣いで、腰を痛める原因にもなります。",
"トップでお尻をキュッと締めて骨盤を安定させましょう。腰への負担を減らし、お尻に負荷を移せます。",
"動作全体を通して背骨のニュートラルを保ちましょう。下ろすときに背中の上部を丸めないように。",
"足首ローラーの下に足をしっかり固定してから始めましょう。途中で足が滑ると転倒のリスクがあります。"
],
"Barbell back squat": [
"バーは首の骨ではなく僧帽筋の上に乗せましょう。",
"バーをラックから外す前に、体幹を固めて深く息を吸いましょう。",
"下ろす動作全体を通して胸を張り、背骨をニュートラルに保ちましょう。",
"最低でも太ももが床と平行になるまで、お尻を後ろ下方向に下ろしましょう。",
"膝はつま先の方向に向け、内側に入らないようにしましょう。",
"立ち上がるときはつま先だけでなく足裏全体で床を押しましょう。",
"スクワットの最下点で腰が丸まらないようにしましょう。",
"軽い重量でウォームアップし、バーの位置と深さを整えましょう。",
"最下点ではなく、一番きついポイントを過ぎたところで力強く息を吐きましょう。",
"バーの軌道はセットを通して足の中央の真上を通る垂直ラインを保ちましょう。",
"下ろすときにかかとが床から浮かないようにしましょう。",
"重い重量に挑戦するときはセーフティピンかスポッターを使いましょう。"
],
"Barbell curl": [
"カールの動作中は肘を体の横に固定したままにしましょう。",
"腰を振ったり体を反らしたりしてバーを持ち上げないようにしましょう。",
"次のレップに入る前に、腕が伸びきるまでバーをしっかり下ろしましょう。",
"反動をつけて次のレップに入らず、トップで力強く力こぶを締めましょう。",
"バーを上げるときに息を吐き、下ろすときに息を吸いましょう。",
"手首は反らさず、まっすぐに保ちましょう。",
"手首や肘に無理のかからないグリップ幅を選びましょう。",
"重量がきつくなっても肘が前に流れないようにしましょう。",
"体を丸めず、肩を後ろに引いて胸を張りましょう。",
"膝は完全にロックせず、軽く緩めて立ちましょう。",
"バーを素早く落とさず、下ろす動作もコントロールしましょう。",
"カールする際にあごを前に突き出さず、頭はニュートラルに保ちましょう。"
],
"Barbell deadlift": [
"バーは毎レップ床からスタートします。バウンドさせず、その都度リセットしましょう。",
"バーはすねと太ももに沿わせて引き上げましょう。体から離れると力が無駄になります。",
"お尻と肩は同時に上がるのが理想です。お尻だけ先に上がるなら重量が重すぎるサインです。",
"ロックアウトはお尻を締めて行い、上体を後ろに反らして仕上げないようにしましょう。",
"引く前に、殴られる直前のように体幹をぐっと固めましょう。",
"腕はただのフックです。バーを上げるために肘を曲げてはいけません。"
],
"Barbell front squat": [
"セット中は肘を高く保ち、前方に向けましょう。肘が下がるとバーが前に転がり落ちます。",
"バーは手首ではなく前肩(フロントデルト)に乗せ、指先は添えるだけにしましょう。",
"バックスクワットより上体を起こし気味に。胸を高く、体幹は垂直をイメージしましょう。",
"下ろすときは膝を前方かつつま先の方向に出していきましょう。",
"レップごとに体幹をしっかり固めましょう。フロントラックは体幹の緩みを許しません。",
"手首の柔軟性が足りない場合は、肘を高く保ったままクロスアームグリップを試してみましょう。"
],
"Barbell hip thrust": [
"ベンチの下に潜ったとき、肩甲骨がベンチの中央あたりに来る高さにセットしましょう。",
"足は腰幅に開き、つま先はやや外向き、膝はつま先の方向を向くようにしましょう。",
"かかとで床を押し、お尻を締めながら腰を平行の高さまで持ち上げましょう。",
"トップで一拍止めて収縮をキープしてから下ろしましょう。",
"あごを軽く引き、トップで腰を反りすぎないようにしましょう。",
"股関節を伸ばす間も肋骨が開かないよう、体幹をしっかり固めましょう。"
],
"Barbell overhead press": [
"肩幅よりやや広めにバーを握り、手首は肘の真上に来るようにしましょう。",
"バーは前肩に乗せた状態からスタートし、肘はバーよりやや前に出しましょう。",
"腰が反らないよう、体幹を固めてお尻を締めましょう。",
"バーをまっすぐ押し上げながら、頭をわずかに後ろに引いてバーを通しましょう。",
"仕上げはバーが頭の真上、二の腕が耳の近くに来る位置です。",
"バーを頭上に押し上げる瞬間、力強く息を吐きましょう。",
"重量を上げるために上体を過度に反らさず、体幹は起こしたままにしましょう。",
"バーを肩まで下ろすときはフリーフォールさせず、コントロールしましょう。",
"重量を乗せる前に軽いウォームアップセットでバーの軌道を確認しましょう。",
"リフト全体を通して足は肩幅に固定し、安定した土台を作りましょう。",
"最下点で肘を大きく外側に開きすぎないように。肩関節に負担がかかります。",
"バーを弧を描くように前に押し出さず、できるだけ垂直の軌道を保ちましょう。"
],
"Barbell push press": [
"沈み込みは浅く。クォータースクワット程度で、上体は完全に垂直を保ちましょう。",
"脚で力強く床を蹴り、バーを肩から勢いよく打ち出しましょう。",
"バーが顔の前を通過したら「窓を突き抜ける」ように頭を前に出しましょう。",
"仕上げはバーが足の中央の真上で安定し、肋骨が締まった状態です。",
"沈み込みは真下方向のみ。前方向に沈むとバーが前に飛び出してしまいます。",
"これは脚の力で押すプレスです。ストリクトプレスより重い重量が扱えるのがポイントです。"
],
"Barbell row": [
"重量を乗せる前に、軽いウォームアップセットで股関節ヒンジの感覚をつかみましょう。",
"股関節から体を折り曲げ、背中はフラット、上体は床に対して約45度を保ちましょう。",
"バーは肩幅よりやや外側で握り、最下点では腕をリラックスさせましょう。",
"腰を守るため、引く前に体幹をしっかり固めましょう。",
"バーは胸ではなく、下部の肋骨か上腹部あたりに引き寄せましょう。",
"肘を後ろに引き、ロウの最上点で肩甲骨をぎゅっと寄せましょう。",
"腰の反動を使ってバーを跳ね上げず、背中の筋肉で引きましょう。",
"首はニュートラルに保ち、上を見上げるのではなくやや下を見ましょう。",
"バーを自由落下させず、コントロールしながら下ろしましょう。",
"セットが進んで疲れてくるほど、上背部が丸まらないよう注意しましょう。",
"バーを体に引き寄せるときに力強く息を吐きましょう。",
"膝を軽く緩め、体重は足の中央にかけて安定した土台を作りましょう。"
],
"Barbell shrug": [
"バーは腰の少し外側で、安定した均等なグリップで握りましょう。",
"動作を始める前に、胸を張り肩を後ろに引いてまっすぐ立ちましょう。",
"肘をまっすぐ保ったまま、肩を耳に向けて真上にすくめましょう。",
"肩を回さず、厳密な上下だけの軌道を守りましょう。",
"シュラッグの最上点で一拍止めて、僧帽筋をしっかり収縮させましょう。",
"バーを素早く落とさず、コントロールしながら下ろしましょう。",
"僧帽筋が疲れる前に握力が先に切れそうなら、チョークやストラップを使いましょう。",
"動作中はずっとバーを体の近くに保ちましょう。",
"膝や腰の反動を使ってバーを持ち上げないようにしましょう。",
"すくめるときに息を吐き、戻すときに息を吸いましょう。",
"首はニュートラルに保ち、頭を傾けて動作を助けないようにしましょう。",
"コントロールできる以上の重量ですくめようとして、腰を反りすぎないようにしましょう。"
],
"Barbell skull crusher": [
"肩幅よりやや内側でバーを握り、肘は天井に向けてまっすぐ保ちましょう。",
"上腕は垂直かつ完全に静止させ、動かすのは前腕だけにしましょう。",
"バーは額か、頭のすぐ後ろまで下ろしてしっかりストレッチしましょう。",
"肘を開いたり腕を振ったりせず、肘関節の伸展だけで押し戻しましょう。",
"下ろす動作はゆっくりコントロールしましょう。顔の近くを通るため、勢いは危険です。",
"限界近くまで追い込むときは、安全のためスポッターを付けるか少し軽めの重量にしましょう。"
],
"Barbell upright row": [
"グリップは肩幅程度に。極端に狭いグリップは手首に負担がかかります。",
"肘から動かすイメージで、肘は常に手首より上に保ちましょう。",
"胸上部の高さで止めましょう。あごの高さまで引くと肩を痛めます。",
"バーはシャツにほぼ触れるくらい体の近くを通しましょう。",
"体を反らしたり腰でバウンドさせたりせず、厳密かつスムーズに行いましょう。",
"肩に痛みや違和感が出る場合は、グリップを広げるか引き上げる高さを下げましょう。"
],
"Bench dumbbell chest press": [
"安定した支点を作るため、足を床にしっかり付けましょう。",
"肩甲骨を寄せて、動作中ずっとベンチに固定しておきましょう。",
"上腕がベンチと同じ高さになるところまで下ろし、それより下げすぎないようにしましょう。",
"ダンベルを押し上げる際は、真上よりやや内側に向け、ぶつけないようにしましょう。",
"手首はまっすぐ、常に肘の真上に保ちましょう。",
"押し上げるときに息を吐き、下ろすときに息を吸いましょう。",
"肘が真横に開きすぎないようにしましょう。",
"ロックアウトして休むのではなく、トップで胸をぎゅっと締めましょう。",
"ダンベルを素早く落とさず、下ろす動作もコントロールしましょう。",
"腰は自然なアーチにとどめ、反りすぎないようにしましょう。",
"ダンベルを振り上げず、コントロールしながらポジションに構えましょう。",
"限界に近いときはダンベルが内側に転がりやすいので、スポッターか軽めの重量を使いましょう。"
],
"Bent-over dumbbell reverse fly": [
"上体が床とほぼ平行になるまで、股関節から前傾しましょう。",
"肘は軽く曲げた状態を保ち、レップ全体を通してその角度を維持しましょう。",
"肘を先導させ、弧を描くようにダンベルを体の横に持ち上げましょう。",
"肩の高さあたりで持ち上げるのを止め、高く引き上げすぎないようにしましょう。",
"トップで肩甲骨を寄せてから、コントロールしながら下ろしましょう。",
"腰の反動を使ってダンベルを跳ね上げないようにしましょう。",
"首はニュートラルに保ち、ウェイトを見ようと前に突き出さないようにしましょう。",
"リアデルトを正しく孤立させるため、思っているより軽いダンベルを使いましょう。",
"ダンベルを持ち上げるときに息を吐き、下ろすときに息を吸いましょう。",
"重量がきつくなったり疲れてきたりしても、上体が起き上がらないようにしましょう。",
"手首は比較的まっすぐに保ち、反動をつけて振らないようにしましょう。",
"腕を持ち上げることより、リアデルトを寄せる感覚を意識しましょう。"
],
"Bicycle crunch": [
"指先はこめかみに添えるだけ。首を引っ張らないようにしましょう。",
"肘だけでなく肋骨から回転させ、肩を膝に向けて床から浮かせましょう。",
"伸ばしている脚は床すれすれの低い位置でキープし、床には付けないようにしましょう。",
"速く漕ぐより、ゆっくり漕ぐ方が効果的です。片側2秒を目安にしましょう。",
"動作中ずっと腰をマットに押し付けておきましょう。",
"肘が反対の膝に向かうたびに息を吐きましょう。"
],
"Bulgarian split squat": [
"後ろ足の甲(靴ひも側)をベンチに乗せましょう。",
"体重の大部分は前足のかかとに乗せ、後ろ足には乗せすぎないようにしましょう。",
"前ももが床とほぼ平行になるまで、まっすぐ下ろしましょう。",
"上体は起こしたまま、股関節からわずかに前傾させましょう。",
"前膝がつま先を大きく越えないようにしましょう。",
"下ろすときに息を吸い、押し上げるときに息を吐きましょう。",
"後ろ足で床を蹴って動作を助けないようにしましょう。",
"ダンベルは体の横に保ち、勢いをつけて振らないようにしましょう。",
"前のお尻と前もも(大腿四頭筋)が働いている感覚を意識しましょう。",
"下ろしたときにすねが垂直に保てるくらい、前足を十分前に置きましょう。",
"レップの途中で腰が回転したり横に傾いたりしないようにしましょう。",
"バランスが安定するまでは、壁やベンチを使って支えましょう。"
],
"Cable bicep curl": [
"動作全体を通してケーブルのテンションが途切れないよう、マシンから十分離れて立ちましょう。",
"カール中に肘が前に流れないよう、体の横に固定しておきましょう。",
"肩や背中を使わず、前腕だけでバーをカールしましょう。",
"腕がほぼ伸びきるまで、コントロールしながらバーを下ろしましょう。",
"トップに到達するだけでなく、そこで力こぶをぎゅっと締めましょう。",
"重量がきつく感じても、反り返って反動を使わないようにしましょう。",
"カールするときに息を吐き、ケーブルに腕を引かれながら下ろすときに息を吸いましょう。",
"手首はニュートラルに保ち、カールを助けるために曲げないようにしましょう。",
"膝を完全にロックせず、わずかに前傾して立ちましょう。",
"レップの間にケーブルで腕を素早く引っ張られないようにしましょう。",
"セットを通して肩を後ろに引き、胸を張っておきましょう。",
"短く部分的なカールではなく、フルレンジで動かしましょう。"
],
"Cable chest fly": [
"まっすぐ正面からのフライ軌道になるよう、両方のプーリーを胸の高さ程度にセットしましょう。",
"安定性のため、片足を前に出した構えでわずかに前傾しましょう。",
"動作全体を通して肘は軽く曲げたまま固定しましょう。",
"ハンドルは顔の近くではなく、胸の前で合わせましょう。",
"胸の中央で締めてから、少し止めてゆっくり開きましょう。",
"ハンドルを合わせるときに息を吐き、開くときに息を吸いましょう。",
"ウェイトに腕を引っ張られて、伸ばしすぎのポジションに持っていかれないようにしましょう。",
"肩が前に丸まらないよう、肩甲骨を寄せておきましょう。",
"レップの最初に胸のテンションを保つため、少し前に踏み込みましょう。",
"背中や体幹の反動を使ってハンドルを寄せないようにしましょう。",
"ケーブルに腕を素早く引き戻されないよう、下ろす動作もコントロールしましょう。",
"肘は肩より少し低い位置に保ち、高く押し上げすぎないようにしましょう。"
],
"Cable crunch": [
"プーリーから十分離れた位置に膝をつき、動作中ずっとケーブルにテンションがかかった状態を保ちましょう。",
"ロープは手でしっかり握り込まず、こめかみや耳のあたりに添えるように持ちましょう。",
"股関節を固定したまま、背骨を丸めることでクランチ動作を行いましょう。",
"腕で引っ張るのではなく、腹筋を収縮させて背中を丸めるように意識しましょう。",
"膝に向かって体を丸める際は、力強く息を吐き出しましょう。",
"お尻をかかとの上に落とさず、股関節の位置を固定したままにしましょう。",
"肩を使ってロープを引っ張り下ろすような反動動作は避けましょう。",
"ケーブルに引き戻されるままにせず、ゆっくりとスタートポジションに戻しましょう。",
"トップポジションでも腹筋を完全に緩めず、軽い緊張を保ちましょう。",
"肋骨を骨盤に近づけるイメージで丸めると、より深い収縮が得られます。",
"腕ではなく腹筋にしっかり効かせられる重量を選びましょう。",
"首はリラックスさせ、手で頭を引き下げないようにしましょう。"
],
"Cable face pull": [
"ケーブルを胸の上部から頭の高さにセットし、軽い重量でウォームアップセットから始めましょう。",
"親指が後ろを向くようにロープを握り、胸ではなく顔に向かって引きましょう。",
"肘は高く大きく開き、最終的に肩と同じ高さかそれ以上になるようにしましょう。",
"引き切った位置で手を外旋させ、拳が後ろを向くようにしましょう。",
"各レップの最終局面でリアデルトと背中上部をしっかり収縮させましょう。",
"上体は直立を保ち、反動で引き込むために後ろに反らないようにしましょう。",
"肘が下がって前に出てしまうほどの重い重量は避けましょう。",
"ケーブルに腕を前に引っ張られるままにせず、コントロールしながら戻しましょう。",
"ロープを引き裂くように引く時に息を吐き、腕を伸ばす時に吸いましょう。",
"動作中は胸を張り、肩甲骨を下げた状態を保ちましょう。",
"僧帽筋をすくめず、リアデルトと回旋筋群で動作を主導しましょう。",
"完全に収縮した位置で一瞬止め、リアデルトへの効きを最大化しましょう。"
],
"Cable glute kickback": [
"上体を少し前傾させてタワーを持ち、動くのは脚だけになるようにしましょう。",
"脚を一直線上に後方かつ上方に蹴り上げ、トップでお尻をしっかり締めましょう。",
"骨盤は正面を向けたまま保ち、動作側に開かないようにしましょう。",
"高さを稼ぐために腰を反らせるのはやめましょう。",
"膝はほぼ伸ばしたまま保ちます。曲げるとレッグカールの動きになってしまいます。",
"ネガティブ動作をゆっくり行うことで、軽い重量でもしっかり効かせられます。戻す動きをコントロールしましょう。"
],
"Cable lateral raise": [
"ケーブルマシンに対して横向きに立ち、プーリーが体を横切るように腕を引く形になるようにしましょう。",
"プーリーを床に近い位置にセットし、ケーブルの引く方向が下から始まるようにしましょう。",
"腕を横に、床とほぼ平行になるまで上げましょう。",
"肘を完全に伸ばし切らず、動作中は軽く曲げた状態を保ちましょう。",
"手や手首で引くのではなく、肘から動かすように意識しましょう。",
"ウェイトに腕を引っ張られるままにせず、ケーブルをコントロールしながら下ろしましょう。",
"ハンドルを持ち上げるために上体をひねらず、肩だけを使うように意識しましょう。",
"レップの下端でも休まず、ケーブルにテンションをかけ続けましょう。",
"腕を上げる時に息を吐き、下ろす時に吸いましょう。",
"左右均等に入れ替えて、両肩に同じように持続的な負荷をかけましょう。",
"ハンドルを上げる際に肩をすくめて耳に近づけないようにしましょう。",
"ケーブルが真下ではなく斜めの角度を保てるよう、マシンから十分離れて立ちましょう。"
],
"Cable rope hammer curl": [
"カール動作中、ロープを握る手のひらは常に向かい合わせにしておきましょう。",
"肘は体の横に固定し、前に振り出さないようにしましょう。",
"肩を使わず、前腕の力だけでロープを巻き上げましょう。",
"腕がほぼ完全に伸びるまで、コントロールしながらロープを下ろしましょう。",
"各レップのトップで前腕と上腕二頭筋をしっかり収縮させましょう。",
"重量がきつく感じても、反動をつけるために体を後ろに反らさないようにしましょう。",
"巻き上げる時に息を吐き、ケーブルに腕を下ろされる時に吸いましょう。",
"カール中は手首を回転させず、ニュートラルな状態を保ちましょう。",
"膝を伸ばし切らず、片足を少し前後にずらした安定したスタンスで立ちましょう。",
"レップの間にケーブルに腕を急に引っ張り下げられないようにしましょう。",
"動作中は肩を後ろに引き、胸を張った姿勢を保ちましょう。",
"短く部分的な動作ではなく、フルレンジで行いましょう。"
],
"Cable rope tricep extension": [
"動作の下端でロープの両端を左右に開き、上腕三頭筋の各頭をしっかり収縮させましょう。",
"動作中、上腕は常に体側に固定しておきましょう。",
"肘が伸びきるまで押し切り、しっかり収縮させてから戻しましょう。",
"ロープを押し下げる際に肘が外側に開かないようにしましょう。",
"ウェイトに腕を引っ張られるままにせず、ゆっくりとロープを戻しましょう。",
"押し下げる時に息を吐き、前腕が戻る時に吸いましょう。",
"直立するのではなく、上体を少し前傾させた姿勢を保ちましょう。",
"押し下げる際に肩をすくめて耳に近づけないようにしましょう。",
"下端で手首を軽く外側に回すと、外側頭により効かせられます。",
"膝を伸ばし切らず、片足を前後にずらして安定したスタンスを取りましょう。",
"押す動作中に腰が反らないよう、体幹をしっかり固めておきましょう。",
"ロープを太ももに叩きつけず、その少し手前で止めましょう。"
],
"Cable tricep kickback": [
"セット中、上腕は常に床と平行に保ちましょう。下がってしまうと力学的な優位性が失われ、上腕三頭筋にほとんど効かなくなります。",
"重量を持ち上げるために上体を起こして反動を使わないようにしましょう。この種目は肘だけを動かす純粋な動作です。",
"トップでは腕を完全に伸ばし切りましょう。中途半端な伸展では最大収縮が得られません。",
"上腕を動かさずに保てる軽めの重量を使いましょう。この種目は重すぎる重量で台無しになりやすい代表例です。",
"前傾姿勢の間は体幹をしっかり固め、セット中ずっと腰を守りましょう。"
],
"Chest dips": [
"上体を約30度前傾させましょう。直立したまま行うと上腕三頭筋への刺激になってしまいます。",
"膝を曲げて足首を交差させると、自然な前傾姿勢を保ちやすくなります。",
"肩が肘の高さに近づくまで深く下ろしましょう。ただし痛みが出ない範囲で行います。",
"三頭筋メインのディップスとは違い、肘は少し外側に開かせましょう。",
"胸をしっかり収縮させて押し上げ、勢いよく肘を伸ばし切らないようにしましょう。",
"肩に違和感があれば、前傾を減らす前にまず深さを浅くしましょう。"
],
"Chest-supported machine row": [
"チェストパッドの高さは、喉ではなく胸骨にしっかり当たるように調整しましょう。",
"セット中は胸をパッドにしっかり押し付け、上体が動かないようにしましょう。",
"腕を曲げるだけでなく、肘を体の後ろに引くようにハンドルを引きましょう。",
"各レップの最後で肩甲骨をしっかり寄せ合いましょう。",
"前方では腕を完全に伸ばし切り、広背筋にしっかりストレッチをかけましょう。",
"ハンドルを勢いよく引かず、動作は滑らかにコントロールしましょう。",
"ハンドルを引く時に息を吐き、戻す時に吸いましょう。",
"手首はニュートラルに保ち、引く動作を補助するために曲げないようにしましょう。",
"ストレッチ位置に伸びる際、肩が前に丸まらないようにしましょう。",
"ハンドルを動かすことよりも、背中の中央を収縮させることを意識しましょう。",
"脚や足でパッドから体を押し離すような使い方は避けましょう。",
"首はリラックスさせ、視線は前方に保ち、上を向いて力まないようにしましょう。"
],
"Chin-ups": [
"バーを越えるために腰を振って反動をつけず、最初から最後まで純粋な引く力だけで行いましょう。",
"各レップはまず肩甲骨を下げることから始めましょう。肩をすくめた状態から始めると肩関節に余計な負担がかかります。",
"肘はまっすぐ後ろではなく、下方向かつ腰に向かって引きましょう。そうすることで上腕二頭筋だけでなく広背筋がしっかり働きます。",
"毎レップ、腕が完全に伸びるまで下ろしましょう。可動域を狭めると広背筋の発達が制限されます。",
"バーを越えたように見せかけるために頭を前に突き出さず、実際に顎がバーの上を通過するようにしましょう。",
"背中より先に前腕が疲れてしまう場合は、手ではなく肩甲骨から引き始めることを意識しましょう。"
],
"Close-grip bench press": [
"上腕三頭筋を狙うため、バーは肩幅よりやや狭く握りましょう。",
"バーを下ろす際は、肘を体の近くに締めて保ちましょう。",
"バーは胸の上部ではなく、下部に向かって下ろしましょう。",
"握り幅を狭くしすぎると手首や肘に負担がかかるので避けましょう。",
"バーを下ろす時に息を吸い、押し上げる時に力強く吐き出しましょう。",
"肩甲骨は後ろに引き寄せ、ベンチにしっかり固定しておきましょう。",
"反動をつけるためにバーを胸でバウンドさせないようにしましょう。",
"足を床にしっかりつけ、プレス動作の安定性を高めましょう。",
"バーはラックの位置に向かって一直線に押し上げましょう。",
"限界に近い重量を扱う時は、補助者かセーフティバーを使いましょう。",
"手首は肘の真上に保ち、後ろに反らないようにしましょう。",
"バーを強く握り込み、完全に伸ばし切ったところで上腕三頭筋をしっかり効かせましょう。"
],
"Concentration curl": [
"肘の裏側を太ももの内側に押し当て、そこから動かさないようにしましょう。",
"肩に向かって巻き上げ、トップで小指を少し上に回転させましょう。",
"動くのは前腕だけです。上体を揺らしたり肩を上げたりしないようにしましょう。",
"トップで1秒間しっかり収縮させましょう。",
"毎レップ、腕が完全にまっすぐになるまで下ろしましょう。",
"これは厳密なアイソレーション種目です。軽めの重量で正確なレップを行いましょう。"
],
"Dead hang": [
"バーは肩幅よりやや広く、手のひらを自分の反対側に向けて握りましょう。",
"体を完全にぶら下げ、背骨が自然に伸びて解放されるのを感じましょう。",
"呼吸を落ち着かせ、肩が耳より上に上がるのを無理に抑えないようにしましょう。",
"足は床から離し、体を揺らしたり反動を使ったりせずに保持しましょう。",
"ぶら下がる時間は徐々に伸ばしていきましょう。セッションごとに10秒ずつ追加するのがおすすめです。",
"握力と肩の可動性を高めるのに役立ちます。高重量セットの合間に取り入れるのも効果的です。"
],
"Decline dumbbell press": [
"デクライン姿勢になる前に、脚をフットパッドの下にしっかり固定しましょう。",
"セット中は頭と肩をベンチにしっかりつけたままにしましょう。",
"ダンベルは鎖骨ではなく、胸の下部の両脇に向かって下ろしましょう。",
"やや内側に向けて押し上げ、ダンベル同士が触れる直前で止めましょう。",
"手首はニュートラルに保ち、肘の真上にくるようにしましょう。",
"押し上げる時に息を吐き、コントロールしながら下ろす時に吸いましょう。",
"トップでダンベルが顔の方に寄っていかないようにしましょう。",
"デクラインでは頭に血が集まりやすいため、フラットプレスより軽めの重量を使いましょう。",
"開始時に体を起こしてダンベルを構えるのは難しいため、補助者に手渡してもらいましょう。",
"肘は体幹から45〜75度の範囲を超えて開かないようにしましょう。",
"傾斜したベンチの上で体がずれないよう、体幹をしっかり固めておきましょう。",
"終わったらゆっくり体を起こし、逆さ姿勢によるめまいを防ぎましょう。"
],
"Decline sit-ups": [
"デクラインベンチに体を倒す前に、足をパッドの下にしっかり引っ掛けましょう。",
"腕は胸の前で組むか頭の後ろに軽く添え、首を引っ張らないようにしましょう。",
"首への負担を避けるため、顎を胸に軽く引き寄せましょう。",
"起き上がる時に息を吐き、下ろす時に吸いましょう。",
"ベンチの下端まで一気に落とさず、コントロールしながら下ろしましょう。",
"起き上がる反動をつけるために頭や首を引っ張らないようにしましょう。",
"股関節屈筋群が主導する前に、まず腹筋を働かせましょう。",
"下端で背骨を完全に緩めず、体幹に軽いテンションを保ちましょう。",
"体幹の強さがついてくるまでは、緩やかな角度から始めましょう。",
"トップでも腰が自然なカーブ以上に丸まりすぎないようにしましょう。",
"トップですぐに戻らず、腹筋をしっかり収縮させましょう。",
"レップの下端で腰をベンチに強く反らせないようにしましょう。"
],
"Diamond push-ups": [
"人差し指と親指を合わせてダイヤモンドの形を作り、胸骨の真下に置きましょう。",
"肘は外側に開かず、後方かつ体の近くを通るようにしましょう。",
"体幹とお尻を固めて、頭からかかとまで一直線のプランク姿勢を保ちましょう。",
"お尻が床に沈まないようにしながら、胸をダイヤモンドに近づけて下ろしましょう。",
"ダイヤモンドを押して、各レップのトップで腕を完全に伸ばし切りましょう。",
"きつい場合は手をベンチの上に置き、簡単すぎる場合は足を高い位置に置きましょう。"
],
"Dumbbell Romanian deadlift": [
"ダンベルを太ももの前で、手のひらを体に向けたニュートラルグリップで持ちましょう。",
"膝を単純に曲げるのではなく、お尻を後ろに引くように股関節から動作しましょう。",
"ダンベルは動作中ずっと、できるだけすねに近い軌道で脚に沿わせて下ろしましょう。",
"ハムストリングスが限界に達し、腰が丸まり始める前で止めましょう。",
"お尻を締めて骨盤を前に押し出しながら立ち上がりましょう。",
"膝は動作中ずっと軽く緩めておきましょう。これはスクワットではなく股関節のヒンジ動作です。"
],
"Dumbbell bicep curl": [
"重量を上げる前に、軽い重量でウォームアップセットを行い、肘の準備をしましょう。",
"肘は体の横に固定し、前に流れないようにしましょう。",
"反動をつけるために上体や腰を振らず、ダンベルを巻き上げましょう。",
"腕が完全にまっすぐになるまで、しっかり下ろしましょう。",
"巻き上げる時に息を吐き、下ろす時に吸いましょう。",
"ただ上げ下げするだけでなく、トップで上腕二頭筋をしっかり収縮させましょう。",
"重量がきつくなっても、肩が前に丸まらないようにしましょう。",
"重量を素早く落とさず、2〜3秒かけてコントロールしながら下ろしましょう。",
"トップで手首を内側に曲げず、まっすぐに保ちましょう。",
"片腕ずつでも両腕同時でも構いませんが、いずれの場合も肘は固定しましょう。",
"膝を伸ばし切らず、軽く緩めた状態で立ちましょう。",
"各レップの下端で肘を反らせすぎないようにしましょう。"
],
"Dumbbell fly": [
"フライはプレスとは違う形で肩関節に負荷がかかるため、プレスより軽めのダンベルを使いましょう。",
"動作中はずっと、肘を軽く曲げた角度で固定しておきましょう。",
"胸に深いストレッチを感じるまで、ダンベルを両サイドに下ろしましょう。",
"上腕がベンチとほぼ同じ高さになったところで下ろすのを止めましょう。",
"直線的なプレス軌道ではなく、弧を描くようにダンベルを戻しましょう。",
"トップでは樽を抱えるようなイメージで胸をしっかり寄せましょう。",
"肘を伸ばし切ると関節に負担が移ってしまうので避けましょう。",
"ストレッチに向かって開く時に息を吸い、寄せる時に吐きましょう。",
"肩甲骨を寄せておくことで、ストレッチの負荷が肩ではなく胸にかかります。",
"下端のストレッチ位置でコントロールを失うほどの重量は避けましょう。",
"反動を使ってダンベルを振り上げるのではなく、ゆっくり丁寧に動かしましょう。",
"肩の前側に挟まる感覚や鋭い痛みを感じたら、すぐに中止しましょう。"
],
"Dumbbell front raise": [
"持ち上げる前に、背骨をニュートラルに保ち、体幹をしっかり固めましょう。",
"ダンベルを体の前でまっすぐ、肩の高さ程度まで上げましょう。",
"可動域全体を通して、肘を軽く曲げた状態を保ちましょう。",
"片腕ずつでも両腕同時でも構いませんが、いずれもコントロールを保ちましょう。",
"反動を使ったり体を後ろに反らせたりして重量を振り上げないようにしましょう。",
"重力に任せて落とさず、ゆっくりとダンベルを下ろしましょう。",
"手首はニュートラルに保ち、重量を上げる際に曲げないようにしましょう。",
"肩の高さを超えて上げると、三角筋への効果は増えず負担だけが増えるので避けましょう。",
"上げる時に息を吐き、下ろす時に吸いましょう。",
"僧帽筋ではなく、肩の前部で持ち上げている感覚を意識しましょう。",
"肩にとって楽な方を選び、手のひらを下か内側に向けるかニュートラルグリップで行いましょう。",
"フロントレイズは力学的に不利な種目なので、軽めの重量を選びましょう。"
],
"Dumbbell hip thrust": [
"上背部をベンチに乗せ、膝を曲げて足の裏を床にしっかりつけましょう。",
"ダンベルを骨盤の上に乗せ、両手でしっかり固定しましょう。",
"かかとで床を押し、お尻をギュッと締めて腰が水平になるまで持ち上げましょう。",
"一番上で1秒キープしてお尻の収縮を感じてから、コントロールしながら下ろしましょう。",
"あごを軽く引いて、視線は天井ではなく前方に向けましょう。",
"腰を反りすぎないよう注意し、体が一直線になったところで止めましょう。"
],
"Dumbbell lateral raise": [
"背筋を伸ばして立ち、膝を軽く曲げて上体をわずかに前傾させましょう。",
"腕が床と平行になるくらいまで、ダンベルを体の横に持ち上げましょう。",
"手ではなく肘から動かすことで、三角筋側部に効かせ続けましょう。",
"肘は常に軽く曲げたままにし、まっすぐロックしないようにしましょう。",
"腰や上体の反動を使ってダンベルを振り上げないようにしましょう。",
"ダンベルは落とさず、ゆっくりコントロールしながら下ろしましょう。",
"持ち上げる際に肩をすくめず、耳から離すように下げておきましょう。",
"肩の高さで止めましょう。それ以上上げると僧帽筋に効いてしまいます。",
"持ち上げるときに息を吐き、下ろすときに吸いましょう。",
"フォームが崩れない重さを選びましょう。",
"水差しから水を注ぐイメージで、小指を親指より少し高くしましょう。",
"僧帽筋で持ち上げず、肩の動きだけを使いましょう。"
],
"Dumbbell lunge": [
"一歩ごとに上体をまっすぐ保ち、体幹を締めておきましょう。",
"前脚のすねがほぼ垂直になるくらい、大きく前に踏み出しましょう。",
"後ろ膝は床に軽く触れる程度まで下ろし、勢いよく打ち付けないようにしましょう。",
"前膝はつま先の方向に向け、内側に入らないようにしましょう。",
"下ろすときに息を吸い、立ち上がるときに吐きましょう。",
"下ろす際に前足のかかとが浮かないようにしましょう。",
"立ち上がるときはつま先ではなく、前足のかかとで床を押しましょう。",
"ダンベルは振らずに体の横に沿わせておきましょう。",
"前傾する際に背中を丸めないようにしましょう。",
"前脚の大腿四頭筋とお尻に効いている感覚に集中しましょう。",
"歩きながら行う場合は、バランスを崩さないよう歩幅を短めにコントロールしましょう。",
"足元を見るのではなく、頭と胸を上げておきましょう。"
],
"Dumbbell pullover": [
"上背部と頭だけをベンチに乗せ、腰は低い位置に落としましょう。",
"ダンベルを1つ両手で持ち、手のひらを内側のプレートに押し当てましょう。",
"動作中は肘の角度をわずかに曲げたまま固定しましょう。",
"広背筋と胸に深いストレッチを感じるまで、ダンベルを頭の後ろへ下ろしましょう。",
"肩に詰まりや張りを感じ始めたら、それ以上下ろさないようにしましょう。",
"頭の後ろに下ろすときに息を吸い、戻すときに吐きましょう。",
"腰がベンチから浮いて反らないよう、体幹を締めておきましょう。",
"ストレッチを重視する種目なので、想定より軽めの重量を使いましょう。",
"真上に引き上げるのではなく、弧を描くようにダンベルを戻しましょう。",
"ストレッチで腕を後ろに伸ばす際、肋骨が開かないようにしましょう。",
"ゆっくり動かし、反動でダンベルを戻さないようにしましょう。",
"肩関節に痛みを感じたら、無理せずセットを中止しましょう。"
],
"Dumbbell reverse wrist curl": [
"前腕を太ももかベンチに乗せ、手のひらを下向きにしましょう。",
"ダンベルを指先の方向へ少し転がし、開始姿勢でしっかりストレッチをかけましょう。",
"手首をゆっくり上に巻き上げ、前腕の上側にある伸筋群を収縮させましょう。",
"毎レップ、重さを落とさずコントロールしながら開始位置に戻しましょう。",
"前腕の伸筋群はすぐ疲労し痛めやすいので、軽めの重量を使いましょう。",
"前腕は支えの上に平らに乗せたままにし、動作中に肘を浮かせないようにしましょう。"
],
"Dumbbell shrug": [
"背筋を伸ばして立ち、両手にダンベルを持ち、腕はまっすぐ伸ばしましょう。",
"肘を曲げずに、肩をまっすぐ耳に向けて持ち上げましょう。",
"肩を前後に回さず、動きは垂直に保ちましょう。",
"一番上で少し止め、僧帽筋を締めてから下ろしましょう。",
"下ろすときはダンベルを落とさず、ゆっくり下ろしましょう。",
"首はリラックスさせ、持ち上げを助けようと前に突き出さないようにしましょう。",
"僧帽筋より先に握力が限界を迎える場合は、しっかり握るかリストストラップを使いましょう。",
"脚や腰を使って反動で持ち上げないようにしましょう。",
"肩を上げるときに息を吐き、下ろすときに吸いましょう。",
"腕はまっすぐのまま、上腕二頭筋ではなく僧帽筋だけを働かせましょう。",
"高重量のセットでもぐらつかないよう、肩幅程度の安定したスタンスで立ちましょう。",
"フォームが崩れて反動任せになるほど重量を上げすぎないようにしましょう。"
],
"Dumbbell skull crusher": [
"まずは軽いウォームアップセットで、安全で無理のない肘の軌道を確認しましょう。",
"セット中は上腕をまっすぐ天井に向けたまま、完全に静止させましょう。",
"ダンベルは胸ではなく、額かその少し後ろに向かって下ろしましょう。",
"肘だけを曲げ、レップ中に肩を動かさないようにしましょう。",
"下ろすときに息を吸い、腕を伸ばすときに力強く吐きましょう。",
"ダンベルを下ろす際に肘が外側に開かないようにしましょう。",
"肘関節を守るため、下ろす動作はゆっくりコントロールしましょう。",
"ダンベルが不意に傾かないよう、しっかり握って手首を固定しましょう。",
"肘関節に詰まりや張りを感じたら、下ろす動作を止めましょう。",
"肘を勢いよく伸ばし切らず、一番上で上腕三頭筋をしっかり収縮させましょう。",
"足を床にしっかりつけ、体幹を締めてベンチ上で体を安定させましょう。",
"この種目は肘に負担がかかるため、想定より軽めの重量を選びましょう。"
],
"Dumbbell step-up": [
"つま先だけでなく、足全体をボックスに乗せましょう。",
"台に乗せた脚のかかとで押し上げましょう。床に残る脚はバランスを取るだけです。",
"台の上でしっかり立ち切ってから下りましょう。",
"下りる動作はコントロールし、飛び降りないようにしましょう。",
"上体はまっすぐ保ち、ボックスの上に突っ込むように前傾しないようにしましょう。",
"片脚ずつ全レップを終えてから切り替えるか、一定のリズムで左右交互に行いましょう。"
],
"Dumbbell sumo squat": [
"膝はつま先の方向に向けたままにしましょう。つま先を大きく開いているので、膝を内側に入れず外側へ積極的に押し出す意識が必要です。",
"胸を張り、できるだけ上体をまっすぐ保ちましょう。前傾すると大腿四頭筋や内ももへの負荷が逃げてしまいます。",
"ボトムで弾まず、下ろす動作をコントロールし、筋肉の力で切り返しましょう。",
"ダンベルは脚の間で自由にぶら下げましょう。体に押し付けると動作パターンが変わってしまいます。",
"母趾球だけでなく足裏全体で押し、バランスとパワーを維持しましょう。"
],
"Dumbbell wrist curl": [
"前腕を太ももかベンチに乗せ、手のひらを上向きにしましょう。",
"毎レップ、ダンベルを指先の方向へ転がし、フルレンジで動かしましょう。",
"前腕の屈筋群を収縮させて、手首を上に巻き上げましょう。",
"一番上でしっかり締めてから、完全にストレッチした位置までゆっくり戻しましょう。",
"軽い重量で回数を多めに行いましょう。これは小さな筋肉を狙うアイソレーション種目です。",
"肘と前腕は台に固定したまま動かさず、手首だけを動かしましょう。"
],
"EZ bar curl": [
"角度のついた部分を握りましょう。この手首の傾きこそがEZバーを使う理由です。",
"肘を脇腹に固定し、前腕だけを動かしましょう。",
"胸の上あたりの高さまで巻き上げましょう。それ以上上げると肘が前に出るだけです。",
"バーを落とさず、ゆっくりカウントしながらコントロールして下ろしましょう。",
"姿勢はまっすぐに。後ろに反るとフロントレイズのような動きになってしまいます。",
"手首はまっすぐ保ち、一番上で手首を巻き込まないようにしましょう。"
],
"EZ bar front raise": [
"腕はほぼ伸ばしたままにしましょう。肘を曲げて持ち上げを助けると、フロントレイズではなく中途半端なカールになってしまいます。",
"反動を使わないようにしましょう。上体を揺らさないとバーが上がらない場合は、重量を軽くしましょう。",
"肩の高さで止めましょう。それ以上上げると三角筋前部ではなく僧帽筋に負荷が逃げてしまいます。",
"バーはゆっくりコントロールしながら下ろしましょう。下ろす動作も持ち上げる動作と同じくらい三角筋前部を鍛えます。",
"手首はニュートラルな位置を保ちましょう。EZバーの角度がストレートバーより手首への負担を減らしてくれます。"
],
"Farmers carry": [
"姿勢を高く保ちましょう。肋骨を骨盤の真上に乗せ、肩は後ろ下に引きます。",
"ハンドルを握りつぶすように持ちましょう。握力が最初に限界を迎えるのがこの種目の狙いです。",
"短く速く、コントロールされた歩幅で歩きましょう。左右に揺れて歩かないようにします。",
"ダンベルは常に水平に保ち、片側が下がらないようにしましょう。",
"床ではなく前方を見ましょう。",
"時間でも距離でも構いません。とにかく正直に重い重量を選びましょう。"
],
"Flat barbell bench press": [
"バランスの良い軌道のため、グリップは肩幅よりやや広めに設定しましょう。",
"バーをラックから外す前に、肩甲骨を後ろ下に寄せておきましょう。",
"足は床にしっかりつけ、動作中ずっと踏み込んでおきましょう。",
"バーは首やお腹ではなく、胸の中央あたりに下ろしましょう。",
"手首は反らさず、肘の真上に位置させましょう。",
"毎レップ、下ろす前に息を吸って体幹を締めましょう。",
"胸からバーを押し上げるときに息を吐きましょう。",
"胸でバーを弾ませて反動をつけないようにしましょう。",
"肘は90度まで開かず、45〜75度程度に締めておきましょう。",
"重量を追加する前に、ウォームアップセットでバーの軌道を固めておきましょう。",
"高重量や限界に挑むセットでは、必ず補助者かセーフティバーを使いましょう。",
"腰はベンチにつけたままにし、押し上げを助けるために浮かせないようにしましょう。"
],
"Glute bridge": [
"仰向けになり、膝を曲げて足を腰幅に開き、床にしっかりつけましょう。",
"腕を体の横で床に押し付け、動作を安定させましょう。",
"かかとで床を押し、お尻を締めて腰を床から持ち上げましょう。",
"一番上で1〜2秒キープし、お尻を思い切り収縮させましょう。",
"次のレップに移る前に、腰を床の少し上まで下ろし、完全に休めないようにしましょう。",
"膝を足の真上に保つよう、わずかに外側に押し出しましょう。"
],
"Goblet squat": [
"ダンベルを胸骨にしっかり抱え込み、肘は下に向けましょう。",
"ボトムで肘が膝の内側に軽く触れるようにしましょう。それが深さの目安です。",
"かかとは床につけたままにし、床を押し離すようにして立ち上がりましょう。",
"ヒンジのように後ろに座るのではなく、股関節の間に座り込むイメージで下ろしましょう。",
"胸を張り、重さに引っ張られて前に倒れないようにしましょう。",
"最初に習得すべきスクワットです。バーベルを担ぐ前に、まずこの動きをものにしましょう。"
],
"Hack squat": [
"肩をパッドにぴったり合わせ、背中を背もたれに平らに密着させましょう。",
"足は肩幅でフットプレートに乗せ、負荷がかかる軌道の真下に土踏まずが来るようにしましょう。",
"かかとを浮かせずに、太ももが床と平行を少し超えるくらいまで下ろしましょう。",
"足裏全体、特につま先よりかかとを意識して押しましょう。",
"下ろすときに息を吸って体幹を締め、押し上げるときに吐きましょう。",
"膝はつま先の方向に向け、内側に入らないようにしましょう。",
"毎レップ、一番上で膝を強くロックしないようにしましょう。",
"プレートを追加する前に、軽いウォームアップセットで深さの感覚をつかみましょう。",
"ボトムで腰がパッドから離れて丸まらないようにしましょう。",
"フルレンジで大腿四頭筋が伸び縮みする感覚に集中しましょう。",
"素早く落とさず、2〜3秒かけてコントロールしながら下ろしましょう。",
"準備が整うまで、セーフティキャッチはかけたままにしておきましょう。"
],
"Hack squat calf raise": [
"動作中は脚を完全に伸ばしたままにしましょう。膝を曲げると腓腹筋からヒラメ筋へ負荷が移り、トレーニング効果が下がります。",
"フルレンジで動かしましょう。ボトムではかかとをプレートの端からできるだけ下げ、トップではできるだけ高く上げます。",
"上下どちらでも少し止め、伸張反射による反動をなくして、ふくらはぎに本当の力を出させましょう。",
"マシンから降りる前にセーフティハンドルをかけましょう。荷重のかかったソリを固定せずに放置しないでください。",
"プレートの端には母趾球だけを乗せましょう。かかとが面についていると、ふくらはぎを十分にストレッチできません。"
],
"Hammer curls": [
"カール中はずっと手のひらを向かい合わせにしておきましょう。",
"肘を外側に振らず、体の横に固定しましょう。",
"ダンベルを勢いよく持ち上げず、コントロールされたテンポで巻き上げましょう。",
"前腕と上腕二頭筋にストレッチを感じるまで、ダンベルをしっかり下ろしましょう。",
"持ち上げる際に、手首を通常のカールのグリップに回転させないようにしましょう。",
"毎レップの一番上で、前腕と上腕筋をしっかり収縮させましょう。",
"持ち上げるときに息を吐き、コントロールしながら下ろすときに吸いましょう。",
"カールを助けるために後ろに反らず、上体はまっすぐ保ちましょう。",
"片腕ずつでも両腕同時でも構いませんが、肩が左右不均等にすくまないようにしましょう。",
"反動で自然な可動域を超えて動かさないようにしましょう。",
"肩は前に丸めず、後ろ下に引いておきましょう。",
"肘を強くロックする手前で、下ろす動作を止めましょう。"
],
"Hanging leg raise": [
"前腕をパッドにしっかり押し付け、背中を支柱に固定したまま行いましょう。",
"脚を上げる前に体幹を固め、腰がパッドから浮かないようにしましょう。",
"骨盤を巻き上げるようにして膝や脚を上げ、股関節だけを振らないようにしましょう。",
"脚を上げるときに息を吐き、コントロールしながら下ろすときに息を吸いましょう。",
"重力に任せて脚を落とさず、ゆっくりと下ろしましょう。",
"反動や振り子運動を使って脚を跳ね上げないようにしましょう。",
"腰がパッドから離れて反る前に、下ろす動作を止めましょう。",
"肩を下げた状態を保ち、耳に近づくようにすくめないようにしましょう。",
"膝を胸に引き寄せるように上げると、下腹部により効かせられます。",
"高さだけを目標にせず、トップでしっかり腹筋を締めましょう。",
"グリップの力は抜き、腕ではなく腹筋で動作を行いましょう。",
"フォームが安定してから、脚を伸ばして負荷を上げるバリエーションに挑戦しましょう。"
],
"Incline barbell chest press": [
"ベンチの角度は30〜45度に設定し、肩ではなく胸の上部に効かせましょう。",
"足の裏全体を床につけ、踏み込んで安定した土台を作りましょう。",
"バーをラックから外す前に、肩甲骨を寄せて下げ、ベンチに押し付けましょう。",
"バーは鎖骨のすぐ下、胸の上部まで下ろしましょう。",
"肋骨を突き上げすぎない程度に、腰に軽いアーチをキープしましょう。",
"下ろすときに息を吸い、押し上げるときに力強く息を吐きましょう。",
"胸でバーを弾ませて反動を使わないようにしましょう。",
"プレス中は常に手首が肘の真上にくるようにキープしましょう。",
"インクラインプレスは失敗時に逃げにくいので、補助者かセーフティピンを使いましょう。",
"真上ではなく、やや顔の方向に押し上げるイメージを持ちましょう。",
"ウォームアップセットでバーの軌道を体に覚え込ませてから、重量を上げましょう。",
"肘が体幹から45〜75度の角度を超えて開きすぎないようにしましょう。"
],
"Incline bench dumbbell press": [
"ベンチを30〜45度の適度な角度に設定し、胸の上部に効かせましょう。",
"足を床にしっかり踏み込み、肩甲骨を寄せた状態を保ちましょう。",
"ダンベルは首ではなく、胸の上部の横まで下ろしましょう。",
"各レップのトップでダンベルを押し上げ、軽く寄せ合わせましょう。",
"動作を通して手首はニュートラルに保ち、常に肘の真上に位置させましょう。",
"ダンベルを押し上げるときに息を吐き、下ろすときに息を吸いましょう。",
"反りすぎるとフラットベンチプレスのような動作になってしまうので注意しましょう。",
"膝の反動で蹴り上げるのではなく、コントロールしてスタートポジションに構えましょう。",
"レップの底で肘が肩の高さより下がらないようにしましょう。",
"重いダンベルを使う前に、ウォームアップセットで動作の感覚をつかみましょう。",
"セット中は頭と背中上部を常にベンチに密着させましょう。",
"プレス時にダンベルが顔の上まで前方に流れないようにしましょう。"
],
"Incline bench dumbbell rear delt fly": [
"ベンチを30〜45度に設定し、胸をパッドに当ててうつ伏せになります。",
"ニュートラルグリップでダンベルを肩の真下にまっすぐ垂らします。",
"大きな弧を描くように両腕を横に上げ、肩の高さになるまで動かしましょう。",
"僧帽筋をすくめて挙げようとせず、リアデルト（肩の後部）を締める意識を持ちましょう。",
"ダンベルはゆっくりコントロールしながら下ろし、常に負荷をかけ続けましょう。",
"肘関節への負担を減らすため、動作中は肘を軽く曲げた状態を保ちましょう。"
],
"Incline dumbbell curl": [
"腕をまっすぐ、やや体より後ろに垂らしましょう。このストレッチがポイントです。",
"カール中は肘を床の方向に向けたまま、前に振らないようにしましょう。",
"セット中は頭と肩を常にパッドにつけたままにしましょう。",
"スタンディングカールより軽い重量から始めましょう。ストレッチポジションはごまかしが効きません。",
"両腕を同時に、滑らかにコントロールしながらカールしましょう。",
"毎レップ底でしっかり伸ばし切りましょう。中途半端な可動域はNGです。"
],
"Lat pulldown": [
"ウォームアップセットから、太もものパッドをしっかり固定して腰が浮かないようにしましょう。",
"手のひらを前に向け、肩幅よりやや広めにバーを握りましょう。",
"体を10〜15度ほど後ろに傾け、レップ中はその角度を保ちましょう。",
"肘を下だけでなく、股関節に向けるように下方・後方へ引きましょう。",
"バーが鎖骨に近づくにつれ、胸を張り上げるように動かしましょう。",
"底で一瞬止め、広背筋を締めてからバーを戻しましょう。",
"重りに引っ張られるままにせず、2〜3秒かけて戻す動作をコントロールしましょう。",
"肩甲骨が動く前に腕だけでバーを引き下ろさないようにしましょう。",
"ストレッチのトップで肩が耳の方にすくみ上がらないようにしましょう。",
"バーを引き下げるときに息を吐き、戻すときに息を吸いましょう。",
"手でより強く握るのではなく、肘で引く意識を持ちましょう。",
"上体を後ろに振って力任せに重りを下ろさないようにしましょう。"
],
"Leg extension": [
"動作前に、マシンの回転軸を膝関節の位置に合わせましょう。",
"足首パッドは足のすぐ上、すねに乗るように設定しましょう。",
"膝を完全にロックせず、まっすぐになるまで脚を伸ばしましょう。",
"反動や上体の揺れを使って重りを持ち上げないようにしましょう。",
"伸ばすときに息を吐き、下ろすときに息を吸いましょう。",
"完全に伸ばしきった位置で一瞬止め、大腿四頭筋の収縮を最大化しましょう。",
"重りを素早く落とさず、ゆっくりと下ろしましょう。",
"負荷を上げる前に、軽いウォームアップセットで膝の状態を確認しましょう。",
"背中をパッドに平らにつけたまま、反らさないようにしましょう。",
"各レップのトップで大腿四頭筋をしっかり締める意識を持ちましょう。",
"サイドのハンドルは強く引っ張らず、軽く握りましょう。",
"膝に違和感を感じたら、完全に伸ばしきる手前で止めましょう。"
],
"Leg press": [
"足は肩幅に開き、かかとからつま先まで全体をプレートに密着させましょう。",
"全てのレップを通して、腰をシートに押し付けたままにしましょう。",
"膝がおよそ90度になるまでプレートを下ろしましょう。",
"重りを押し上げるときに膝が内側に入らないようにしましょう。",
"プレートを下ろすときに息を吸い、押し出すときに息を吐きましょう。",
"トップで膝を完全にロックしたり、弾ませたりしないようにしましょう。",
"重量を上げる前に、ウォームアップセットでシートの位置を確認しましょう。",
"深く下ろしたときに腰が丸まらないよう、常にシートに密着させましょう。",
"プレス中にかかとがプレートから浮かないようにしましょう。",
"つま先だけでなく、足全体で踏み込む意識を持ちましょう。",
"プレートを素早く落とさず、下ろす動作をコントロールしましょう。",
"頭と肩の力を抜き、背もたれに預けましょう。"
],
"Leg press calf raise": [
"足の付け根（母指球のあたり）だけをプレートの下端に乗せましょう。",
"セット中は膝を軽く伸ばしたまま、動かさないようにしましょう。",
"プレートが許す範囲まで、かかとをしっかり下げてストレッチしましょう。",
"足の前部で踏み込み、トップで足首を完全に伸ばしましょう。",
"足首を完全に伸ばしきったところで一瞬止めてから下ろしましょう。",
"押し上げるときに息を吐き、かかとを下げるときに息を吸いましょう。",
"膝を曲げて重りを押し上げる助けにしないようにしましょう。",
"ウォームアップセットで、プレート上の安全な足の位置を見つけましょう。",
"底のストレッチ位置で弾まず、コントロールして切り返しましょう。",
"小刻みな動作ではなく、フルレンジで動かしましょう。",
"大腿四頭筋ではなく、ふくらはぎのストレッチと収縮を感じる意識を持ちましょう。",
"毎レップ足の位置を確認し、足が滑らないようにしましょう。"
],
"Leg raise": [
"しっかりとしたオーバーハンドグリップ（またはぶら下がりグリップ）を使い、脚を上げる前に肩をしっかり働かせましょう。",
"バーで体が振れないよう、脚を上げる前に腹筋を固めましょう。",
"股関節を曲げるだけでなく、骨盤を巻き上げる意識で脚を上げましょう。",
"脚を上げるときに息を吐き、ゆっくり下ろすときに息を吸いましょう。",
"脚を落として振らせず、コントロールしながら下ろしましょう。",
"肩の反動を使って脚を振り上げないようにしましょう。",
"腰が過度に反る前に、脚を止めましょう。",
"ストレートレッグで腰に負担を感じる場合は、膝を軽く曲げましょう。",
"バーの高さに触れることを目標にせず、トップで下腹部をしっかり締めましょう。",
"肩甲骨を働かせ、関節にだらんとぶら下がらないようにしましょう。",
"次のレップのために上体を揺らして反動をつけないようにしましょう。",
"まずは膝を曲げたレイズから始め、慣れてからストレートレッグのハンギングレイズに進みましょう。"
],
"Lying hamstring curl": [
"足首パッドはふくらはぎではなく、かかとのすぐ上に当たるよう調整しましょう。",
"動作中は腰を常にベンチに押し付けたままにしましょう。",
"かかとをお尻に近づけるように、フルレンジでゆっくりとカールしましょう。",
"腰の反動を使って重りを引き上げないようにしましょう。",
"収縮のピークで一瞬止めて締めてから下ろしましょう。",
"カールするときに息を吐き、パッドを下ろすときに息を吸いましょう。",
"重量が重くなっても、腰がパッドから浮き上がらないようにしましょう。",
"負荷を上げる前に、軽いウォームアップセットでハムストリングスを目覚めさせましょう。",
"つま先を軽く伸ばすと、ふくらはぎよりハムストリングスに効かせやすくなります。",
"パッドを勢いよく戻さず、コントロールしながら下ろしましょう。",
"ハンドルは軽く握り、上半身を振って引っ張らないようにしましょう。",
"完全に伸ばしきったところで、ハムストリングスのストレッチを感じる意識を持ちましょう。"
],
"Machine abduction": [
"骨盤をまっすぐにして深く腰掛け、背骨をパッドに密着させましょう。",
"パッドはすねではなく、膝の外側に当たるよう位置を合わせましょう。",
"お尻の外側を意識しながら、ゆっくりと脚を開いていきましょう。",
"腰の反動を使って重りを勢いよく開かないようにしましょう。",
"脚を開くときに息を吐き、閉じるときに息を吸いましょう。",
"最も開いた位置で一瞬止め、中臀筋が働くのを感じましょう。",
"重りに任せてパッドを勢いよく閉じないようにしましょう。",
"軽いウォームアップセットで、無理のない可動域を確認しましょう。",
"肩の力を抜き、ハンドルを強く握りすぎないようにしましょう。",
"大腿四頭筋ではなく、お尻の外側と中臀筋が働く感覚を意識しましょう。",
"動作の途中で腰がパッドから離れて丸まらないようにしましょう。",
"弾むように動かさず、一定のテンポを保ちましょう。"
],
"Machine adduction": [
"背骨をパッドに密着させ、シートに深く座りましょう。",
"パッドは膝のすぐ上、太ももの内側に当たるよう設定しましょう。",
"パッドを勢いよく閉じず、ゆっくりと脚を締めていきましょう。",
"手で膝を押して動作を補助しないようにしましょう。",
"脚を閉じるときに息を吐き、開くときに息を吸いましょう。",
"内ももが完全に収縮したところで一瞬止めてから、再び開きましょう。",
"戻すときに重りに引っ張られて脚が勢いよく開かないようにしましょう。",
"重量を上げる前に、軽いウォームアップセットで可動域を確認しましょう。",
"背中をパッドに平らにつけ、前に反らさないようにしましょう。",
"股関節ではなく、内ももが締まる感覚を意識しましょう。",
"無理なくストレッチを感じられる開始幅に設定しましょう。",
"開閉どちらの動作も、滑らかにコントロールして行いましょう。"
],
"Machine chest fly": [
"座ったときにハンドルが胸の中央の高さにくるよう、シートを調整しましょう。",
"肩に痛みが出ない範囲で、胸を十分にストレッチできる位置にアームを設定しましょう。",
"全てのレップを通して、背中をしっかりパッドに押し付けましょう。",
"大きな弧を描くようにパッドを合わせ、中央で胸をしっかり締めましょう。",
"戻すときは重りに逆らい、パッドが勢いよく開かないようにしましょう。",
"パッドが中央で触れる直前で止め、胸に常に負荷をかけ続けましょう。"
],
"Machine chest press": [
"ハンドルが胸の中央の高さにくるようシートを調整しましょう。",
"プレス中は背中と頭を常にパッドに平らにつけましょう。",
"足の裏全体を床につけ、安定した土台を作りましょう。",
"トップで肘を強くロックしすぎないように、ハンドルを前方に押しましょう。",
"押し出すときに息を吐き、コントロールしながら戻すときに息を吸いましょう。",
"レップとレップの間で、ウェイトスタックを勢いよく落とさないようにしましょう。",
"ウォームアップセットで、適切なシートの高さとグリップ位置を確認しましょう。",
"手首はハンドルの周りで曲げず、まっすぐに保ちましょう。",
"プレス中に肩が前に丸まって背もたれから離れないようにしましょう。",
"押し切るだけでなく、完全に伸ばしたところで胸をしっかり締めましょう。",
"無理にレップ数を稼ぐために、背中をパッドから浮かせて反らさないようにしましょう。",
"小刻みな部分的動作ではなく、フルレンジでコントロールして動かしましょう。"
],
"Machine hip thrust": [
"動作のトップで股関節を完全に伸ばせるよう、シートと肩のパッドを調整しましょう。",
"両足を腰幅に開き、つま先をやや外側に向けてフットプレートに平らに置きましょう。",
"かかとで踏み込み、お尻をしっかり締めて股関節を前に押し出しましょう。",
"各レップのトップでしっかり止めてから、重りをコントロールしながら戻しましょう。",
"腰を丸めないようにしましょう。動作は股関節のみから生み出しましょう。",
"トップで腰が反りすぎないよう、動作中は常に体幹を固めておきましょう。"
],
"Machine lateral raise": [
"手ではなく、肘でパッドを押す意識を持ちましょう。",
"上腕が床と平行になるところまで上げ、それ以上は上げないようにしましょう。",
"肩を下げたままにし、僧帽筋をすくめないようにしましょう。",
"トップで一瞬止めましょう。マシンでは反動でごまかせません。",
"ゆっくりと下ろしましょう。下ろす動作もエクササイズの半分です。",
"回転軸が肩関節と一致するよう、シートを設定しましょう。"
],
"Machine preacher curl": [
"脇がパッドの上端にぴったりと引っかかるよう、シートを設定しましょう。",
"完全に伸ばした状態から締めきるまで、上腕を常にパッドに密着させましょう。",
"底ではウェイトスタックを叩きつけずに、ほぼ完全に伸ばしましょう。",
"無理にレップをこなすために、胸をパッドから浮かせないようにしましょう。",
"トップでしっかり締め、下ろすのに2秒かけましょう。",
"マシンがフォームを固定してくれるので、それを利用して安全に深い追い込みを狙いましょう。"
],
"Machine rear delt fly": [
"開始位置でハンドルが肩の高さに合うよう、シートを調整しましょう。",
"上体が揺れないよう、胸をパッドにしっかり押し付けましょう。",
"ハンドルを外側・後方に引くとき、肘から動かす意識を持ちましょう。",
"各レップの終端で、肩甲骨をしっかり寄せましょう。",
"リアデルトの代わりに胸や腕の力でハンドルを引かないようにしましょう。",
"レップ間でウェイトスタックが叩きつけられないよう、戻す動作をコントロールしましょう。",
"肘を軽く曲げた状態を保ち、セット中一定に保ちましょう。",
"ハンドルを開くときに息を吐き、戻すときに息を吸いましょう。",
"動作中に肩が耳の方にすくみ上がらないようにしましょう。",
"可動域は背中の後ろまでではなく、おおよそ肩の高さで止めましょう。",
"リアデルトが肘を後ろに引いているイメージを持ち、意識と筋肉のつながりを意識しましょう。",
"足を床につけ、体幹を固めて腰が動かないようにしましょう。"
],
"Machine seated crunch": [
"胸パッドが首ではなく胸の上部に合うよう、シートの高さを調整しましょう。",
"重量を上げる前に、軽いウォームアップセットで可動域を確認しましょう。",
"腕で引っ張るのではなく、腹筋を収縮させて背骨を丸めましょう。",
"クランチで丸めるときにしっかり息を吐き切り、腹筋の収縮を深めましょう。",
"動作中に腰が動かないよう、足を床につけて固定しましょう。",
"弾ませずに、完全に収縮したところで一瞬止めて腹筋を締めましょう。",
"重りを勢いよく戻さず、開始位置へ戻す動作をコントロールしましょう。",
"肩でハンドルを引っ張って可動域を偽らないようにしましょう。",
"首の力を抜き、あごではなく腹筋で引く動作を行いましょう。",
"セット全体で腹筋の働きを感じられる、適度な重量を使いましょう。",
"肘を硬直させてロックせず、腕は力を生み出すのではなく伝える役割にとどめましょう。",
"腰をパッドに向けて丸め込む意識を持ち、体幹をしっかり働かせましょう。"
],
"Machine shoulder press": [
"始める前にシートを調整して、ハンドルが肩の高さにくるようにしましょう。",
"セット中はずっと背中をパッドにしっかり密着させましょう。",
"トップで肘を強く伸ばし切らないように、ハンドルを押し上げましょう。",
"押し上げるときに息を吐き、戻すときに息を吸いましょう。",
"上腕が床とほぼ平行になるまでハンドルを下ろしましょう。",
"プレス中に肩がすくんで耳に近づかないように注意しましょう。",
"手首はまっすぐに保ち、ハンドルに押されて曲がらないようにしましょう。",
"ウェイトスタックを勢いよく落とさず、コントロールされたテンポで行いましょう。",
"ただハンドルを動かすだけでなく、トップで肩をしっかり締めることを意識しましょう。",
"ハンドルの軌道以上に肘を外側に開かないようにしましょう。",
"足裏全体を床につけて、安定した土台を保ちましょう。",
"重量を乗せる前に、ハンドルのグリップ幅が肩に無理のない位置になっているか確認しましょう。"
],
"Machine-assisted pull-up": [
"ウェイトスタックの数値はアシスト量です。上達するにつれてこの数値を下げていくのが目標です。",
"完全にぶら下がった状態からスタートしましょう。中途半端な可動域では中途半端な懸垂しか身につきません。",
"顎を上げることを意識するより、肘を下と後ろに引くイメージで行いましょう。",
"体は垂直に保ち、パッドの上で反動をつけたり体を振ったりしないようにしましょう。",
"アシスト量が少なくなってきたら、自重だけでの懸垂にも挑戦してみましょう。",
"上げるときも下ろすときもコントロールしましょう。特にネガティブ動作が最も筋力を伸ばします。"
],
"Mountain climbers": [
"手を肩の真下につき、体を一直線に保ったプッシュアップの姿勢からスタートしましょう。",
"始める前に体幹をしっかり固め、動作中もその力を保ちましょう。",
"腰の高さを保ったまま、片膝を胸に引きつけましょう。腰が浮かないように注意しましょう。",
"ただ急いで回数をこなすのではなく、ランニングのようなコントロールされた動きで左右の脚を交互に動かしましょう。",
"腰が上下にバウンドしないよう、低い姿勢でプランクのポジションを保ちましょう。",
"スピードと強度が上がっても呼吸を止めず、リズムよく呼吸し続けましょう。"
],
"Overhead EZ bar tricep extension": [
"上腕は耳の横で垂直に保ち、動かすのは肘だけにしましょう。",
"上腕三頭筋の長頭をしっかり伸ばすため、バーを頭のかなり後ろまで下ろしましょう。",
"肘は狭く保ちましょう。開いてしまうとプレス動作になってしまいます。",
"体幹を固めて、腰がパッドから浮いて反らないようにしましょう。",
"頭の真上でしっかり肘が伸びきるまで押し上げましょう。",
"プッシュダウンより軽い重量で行いましょう。ストレッチ姿勢はかなりきついです。"
],
"Overhead cable tricep extension": [
"プーリーを床の近くに設定し、ケーブルマシンに背を向けて立ちましょう。",
"セット中は上腕を頭の近くで固定し、動かさないようにしましょう。",
"前腕を前上方に伸ばし、腕が完全に伸びきるまで動かしましょう。",
"ケーブルに逆らって伸ばすときに、肘が外側に開かないようにしましょう。",
"腰への負担を減らすため、上体を少し前傾させましょう。",
"腕を伸ばすときに息を吐き、戻すときに息を吸いましょう。",
"ケーブルに引かれて腰が反らないよう、体幹を固めておきましょう。",
"途中で止めず、伸びきったところで上腕三頭筋をしっかり収縮させましょう。",
"ロープアタッチメントを使い、両端を開くようにすると上腕三頭筋の収縮がさらに高まります。",
"反動をつけてケーブルを引かず、スムーズに動作を開始しましょう。",
"手首は反らさず、まっすぐしっかり保ちましょう。",
"ケーブルに腕を引っ張られるままにせず、ストレッチ姿勢もコントロールしましょう。"
],
"Pike push-ups": [
"腰を高く上げ、体で逆V字を作るダウンドッグのような姿勢からスタートしましょう。",
"手を足に近づけるほど肩への角度が増し、負荷が上がります。",
"肘を曲げて、頭を両手の間の床に向かって下ろしましょう。",
"肘はやや内側に向け、大きく外側に開かないようにしましょう。",
"腕が完全に伸びきるまで押し上げ、逆V字のスタート姿勢に戻りましょう。",
"パイクの角度を保つため、脚はできるだけまっすぐに伸ばしておきましょう。"
],
"Plank": [
"肩を肘の真上にくるように重ね、前腕を安定した位置に保ちましょう。",
"お腹にパンチを受ける直前のように、体幹をぐっと固めましょう。",
"お尻を締めて、腰が床に向かって落ちないようにしましょう。",
"頭からかかとまで、体を一直線に保ちましょう。",
"キープ中は呼吸を止めず、一定のリズムで呼吸し続けましょう。",
"腰が高く上がって逆V字の姿勢にならないようにしましょう。",
"腰が反って落ちないようにしましょう。続けると背骨に負担がかかります。",
"正面ではなく床を見るようにして、首はニュートラルな位置を保ちましょう。",
"前腕を床に押しつけるようにして、上背部をしっかり働かせましょう。",
"フォームが崩れたらそこで終了しましょう。腰が落ちた状態で無理に続ける必要はありません。",
"足は腰幅に開き、安定した土台を保ちましょう。",
"キープ時間の長さを追うよりも、質の高い緊張状態を保つことを意識しましょう。"
],
"Plate-loaded standing calf raise": [
"肩をパッドの下にセットし、膝は伸ばしきらず軽く曲げておきましょう。",
"足の付け根（母趾球）をプラットフォームに乗せ、かかとは端から出しておきましょう。",
"ふくらはぎがしっかり伸びるのを感じるまで、かかとを深く下ろしましょう。",
"つま先立ちになるまで、前足部でしっかり押し上げましょう。",
"トップで一瞬止め、ふくらはぎをしっかり収縮させてから下ろしましょう。",
"上げるときに息を吐き、かかとを下ろすときに息を吸いましょう。",
"下でバウンドさせず、ストレッチ姿勢もコントロールしましょう。",
"重い重量を乗せる前に、ウォームアップセットで足の位置とバランスを確認しましょう。",
"肩パッドに寄りかかるのではなく、上体をまっすぐ保ちましょう。",
"重量を上げるために膝を曲げ伸ばして反動を使わないようにしましょう。",
"すねではなく、ふくらはぎに効いているのを感じることを意識しましょう。",
"セットごとに足の位置を確認し、外側に滑らないようにしましょう。"
],
"Preacher curl": [
"始める前に、上腕の裏側をしっかりパッドに乗せましょう。",
"ウェイトを巻き上げるときに、肘がパッドから浮かないようにしましょう。",
"腕がほぼまっすぐになるまでバーを下ろし、しっかり伸ばしましょう。",
"各レップの下で肘を強く伸ばし切らないようにしましょう。",
"すぐ次のレップに移らず、トップで力こぶをしっかり収縮させましょう。",
"巻き上げるときに息を吐き、下ろすときに息を吸いましょう。",
"手首は反らさず、まっすぐしっかり保ちましょう。",
"プリーチャーの姿勢では反動が使えないので、ゆっくりしたテンポで行いましょう。",
"重い重量のレップでも、上体を後ろに反らさず胸をパッドにつけたままにしましょう。",
"力こぶが疲れてきても、肩を使ってウェイトを持ち上げないようにしましょう。",
"この種目はてこの原理が厳しいので、スタンディングカールより軽い重量を選びましょう。",
"セット中は足裏全体を床につけ、安定した土台を保ちましょう。"
],
"Pull-ups": [
"肩幅よりやや広い位置でバーを握り、親指も巻きつけましょう。",
"可動域を最大限に使うため、完全にぶら下がった状態からスタートしましょう。",
"肘を下と後ろに引き、胸をバーに近づけるイメージで引き上げましょう。",
"厳密なセットでは、反動をつけたり脚を振ったりして勢いを使わないようにしましょう。",
"トップで肩甲骨を寄せ、胸を張るように引き上げましょう。",
"素早くぶら下がり姿勢に落ちるのではなく、コントロールしながら下ろしましょう。",
"体幹とお尻に力を入れ、動作中に脚が振れないようにしましょう。",
"引き上げるときに息を吐き、下ろすときに息を吸いましょう。",
"ぶら下がった状態で肩がすくんで耳に近づかないようにしましょう。",
"バーを引き下げるのではなく、自分の体をバーに引き上げるイメージを持ちましょう。",
"首を前に突き出さず、顎がバーを越えるところまで引き上げましょう。",
"フルレップがきつい場合は、バンドやアシストマシンを使って可動域を保ちましょう。"
],
"Push-ups": [
"手は肩幅程度に開き、指を広げて安定性を高めましょう。",
"動作中はずっと、頭からかかとまで体を一直線に保ちましょう。",
"腰がプランクの位置から落ちたり、高く上がったりしないようにしましょう。",
"可動域を最大限に使うため、胸が床にほぼつくまで下ろしましょう。",
"肘は大きく開かず、体幹から約45度の角度を保ちましょう。",
"下げるときに息を吸い、押し上げるときに息を吐きましょう。",
"顎を軽く引き、首を前に突き出さずニュートラルな位置に保ちましょう。",
"体幹を固め、お尻を締めて背骨を安定させましょう。",
"肘を90度まで大きく開くと肩に負担がかかるので避けましょう。",
"指先だけでなく、手のひら全体に体重を分散させましょう。",
"素早く落ちるのではなく、下ろす動作をゆっくり行いましょう。",
"全身の姿勢を保てない場合は、手を高い位置に置くか膝をついて負荷を調整しましょう。"
],
"Reverse EZ bar curl": [
"セット中はずっと手のひらを下に向けます。この不慣れなグリップこそがこの種目の狙いです。",
"手首は完全にまっすぐ保ち、下向きに折れないようにしましょう。",
"肘は体側に固定し、前腕だけで巻き上げましょう。",
"通常のカールよりかなり軽い重量になりますが、それが正解です。",
"ゆっくり下ろしましょう。前腕はネガティブ動作で発達します。",
"バーを強く握りましょう。握力を使うことで前腕により効かせられます。"
],
"Reverse grip pulldown": [
"手のひらを自分に向けて肩幅でバーを握り、広背筋下部と力こぶに効かせましょう。",
"引く前に胸を張り、肩を後ろに引いておきましょう。",
"肘を体幹にできるだけ近づけながら、まっすぐ腰に向かって引きましょう。",
"バーが胸の上部に近づいたら、肩甲骨を寄せましょう。",
"バーが跳ね上がらないよう、コントロールしながらストレッチに耐えて戻しましょう。",
"重すぎる重量を補うために、上体を大きく後ろに反らさないようにしましょう。",
"手首はニュートラルに保ち、バーを引くために巻き込まないようにしましょう。",
"引き下げるときに息を吐き、伸びきった位置に戻すときに息を吸いましょう。",
"トップでは肩甲骨を完全に開き、しっかりストレッチしましょう。",
"引く動作中に肘が横に開かないようにしましょう。",
"ただ腕を曲げるのではなく、肘を肋骨の横を通り過ぎるように引くことを意識しましょう。",
"セット中はずっと足裏を床につけ、パッドの下で腰を動かさないようにしましょう。"
],
"Romanian deadlift": [
"リフト中はずっとバーをすねと太ももに近づけたまま動かしましょう。",
"股関節を折りたたむように腰を後ろに引き、上体を前傾させましょう。",
"膝は伸ばし切らず、軽く曲げておきましょう。",
"セットアップからロックアウトまで、背中はまっすぐニュートラルに保ちましょう。",
"ハムストリングスがしっかり伸びるのを感じるところまでバーを下ろしましょう。",
"バーをより低く下ろそうとして腰が丸まらないようにしましょう。",
"下ろす前に息を吸って体幹を固め、立ち上がるときに息を吐きましょう。",
"腰ではなく、股関節を前に押し出して動作を終えましょう。",
"動作中はずっと肩を後ろに引き、胸を張っておきましょう。",
"バーを床から急に引き上げず、スムーズに引き始めましょう。",
"腰ではなく、ハムストリングスに張りが生まれるのを感じることを意識しましょう。",
"握力が滑ってきたら、ダブルオーバーグリップやオルタネイトグリップ、チョークを使いましょう。"
],
"Russian twist": [
"膝を曲げて座り、上体を約45度後ろに傾けましょう。",
"足を床から少し浮かせると、体幹への負荷と難易度が上がります。",
"上体を左右にしっかり回旋させましょう。動きは腕ではなく体幹から生み出しましょう。",
"可動域を最大限に使うため、左右それぞれでウェイトや手を床にタッチさせましょう。",
"ひねる動作中も呼吸を止めず、一定のリズムで呼吸し続けましょう。",
"左右どちらでも上体の45度の傾きを保ち、腰が丸まらないようにしましょう。"
],
"Seated cable row": [
"膝を軽く曲げて座り、足をフットプレートにしっかり固定しましょう。",
"腕を完全に伸ばし、上体をわずかに前傾させた姿勢から各レップをスタートしましょう。",
"背骨をニュートラルに保ちながら、肘をまっすぐ後ろ、肋骨の横を通るように引きましょう。",
"引き終わりで肩甲骨を寄せ、一瞬キープしましょう。",
"上体を後ろに揺らして反動でウェイトを動かさないようにしましょう。",
"胸を張り、ストレッチ時に腰が丸まらないようにしましょう。",
"ウェイトに腕を急に引っ張られないよう、戻す動作もコントロールしましょう。",
"引くときに息を吐き、伸ばすときに息を吸いましょう。",
"手首はまっすぐに保ち、広背筋と背中中央部で引く意識を持ちましょう。",
"僧帽筋がすくまないよう、肩は下と後ろに引いておきましょう。",
"ハンドルは胸に向かってではなく、肋骨の下部に向かって引きましょう。",
"引くときに肘を大きく開かず、体に近づけたままにしましょう。"
],
"Seated calf raise": [
"始める前に、ニーパッドを太ももにぴったり合わせておきましょう。",
"足の付け根をプラットフォームに乗せ、かかとは自由に垂らしておきましょう。",
"ふくらはぎが深くストレッチされるよう、かかとをできるだけ下げましょう。",
"前足部で押し、完全につま先立ちになるまで上げましょう。",
"トップで一瞬止め、ふくらはぎをしっかり収縮させましょう。",
"上げるときに息を吐き、下げるときに息を吸いましょう。",
"下のストレッチ姿勢でバウンドしないようにしましょう。",
"パッドを落とすのではなく、ゆっくりコントロールして下ろしましょう。",
"動作中は膝を動かさず、同じ角度を保ちましょう。",
"ふくらはぎだけでストレッチと収縮を感じることを意識しましょう。",
"レップ中に足が内側や外側に傾かないようにしましょう。",
"小刻みな部分的な動きではなく、フルレンジで行いましょう。"
],
"Seated dumbbell shoulder press": [
"背もたれに沿って背筋を伸ばして座り、腰を反らさずフラットに保ちましょう。",
"頭上に押し上げる前に、ダンベルを耳の高さにセットしましょう。",
"ダンベルをぶつけないように注意しながら、上方かつやや内側に押し上げましょう。",
"押し上げるときに息を吐き、下げるときに息を吸いましょう。",
"肘が肩の高さよりわずかに下にくるまで下げ、それ以上は下げないようにしましょう。",
"関節への負担を避けるため、トップで肘を強く伸ばし切らないようにしましょう。",
"ローテーターカフと肩関節をならすため、まず軽めのウォームアップセットを行いましょう。",
"レップ中はずっと、手首を肘の真上に重ねておきましょう。",
"肘を前に開きすぎると三角筋への負荷が逃げてしまうので注意しましょう。",
"押し上げるときに肋骨が突き出ないよう、体幹を固めておきましょう。",
"手のひらで押すことを意識し、前部と側部の三角筋でウェイトを押し上げる感覚を持ちましょう。",
"ダンベルが頭の後ろに流れないようにしましょう。肩関節に負担がかかります。"
],
"Seated hamstring curl": [
"パッドを調整する前に、マシンの回転軸を膝関節に合わせましょう。",
"カール動作中に腰が浮かないよう、太もものパッドをぴったり合わせましょう。",
"かかとを下と後ろにフルレンジで動かして巻き込みましょう。",
"腰や上半身を使ってウェイトを勢いよく動かさないようにしましょう。",
"巻き込むときに息を吐き、戻すときに息を吸いましょう。",
"収縮のピークで一瞬止め、ハムストリングスへの効きを最大化しましょう。",
"ウェイトが跳ね返らないよう、ゆっくり戻しましょう。",
"軽めのウォームアップセットで、無理のないパッド位置を確認しましょう。",
"背中はシートに沿ってフラットに保ち、前に反らないようにしましょう。",
"つま先を軽く伸ばすと、ふくらはぎよりハムストリングスに効かせやすくなります。",
"各レップのトップでストレッチを感じることを意識しましょう。",
"ハンドルは力任せに握らず、リラックスして持ちましょう。"
],
"Side plank": [
"持ち上げる前に、肘を肩の真下にセットしましょう。",
"くるぶしから頭まで定規のように一直線になるまで腰を持ち上げましょう。",
"キープ中はずっと下側の脇腹を締め続けましょう。関節に頼ってぶら下がらないように。",
"首は長く保ち、下ではなく前を見ましょう。",
"腰が落ちたらそこでセット終了です。低い位置で無理にキープし続けないようにしましょう。",
"左右で同じ時間キープしましょう。弱い方の側に合わせるのが基準です。"
],
"Single-arm cable fly": [
"肘の角度を軽く曲げたまま最初から最後まで固定しましょう——アークの始まりから終わりまで角度を変えないことがポイントです。",
"動きはすべて肩関節から。肘の角度は固定したまま——引く際に肘が曲がっていくとロウ動作になってしまいます。",
"戻す際にケーブルに腕を引っ張られないように——ストレッチ位置までしっかりコントロールしましょう。",
"体幹はしっかり固定。可動域を稼ごうとケーブル側へ体をひねると、負荷が胸から逃げてしまいます。",
"足を前後に開いて安定した土台を作りましょう——これがないと体幹で代償してしまい、胸の仕事にならなくなります。"
],
"Single-arm dumbbell overhead tricep extension": [
"上腕を頭のすぐ横に沿わせ、まっすぐ上に向けたまま行いましょう。",
"上腕三頭筋に深いストレッチを感じるまで、ダンベルを頭の後ろに下ろします。",
"反対の手で作業側の肘を支えると、より安定して動作できます。",
"トップでは腕をしっかり伸ばしますが、無理にロックアウトしすぎないようにしましょう。",
"肘が頭から外側へ逃げていかないよう、レップ中は位置をキープしましょう。",
"上げるときに息を吐き、頭の後ろに下ろすときに息を吸いましょう。",
"体幹を締めて肋骨を締め、腰が反りすぎないようにしましょう。",
"下ろす動作はゆっくりと——三頭筋に常にテンションをかけ続けます。",
"重量が増えても体幹をひねって挙げようとしないこと。",
"手首はまっすぐ固定し、後ろに反らないようにしましょう。",
"体を横に傾けず、座るか立つ姿勢を真っすぐ保ちましょう。",
"腕を替えるのは、作業側でコントロールされたフルレップを終えてからにしましょう。"
],
"Single-arm dumbbell row": [
"反対の手をベンチに置いて支え、背骨はひねらずフラットに保ちましょう。",
"各レップの下部でダンベルをまっすぐ下に垂らし、フルストレッチを作りましょう。",
"肘を体の側面に沿わせながら上後方へ引き上げ、肋骨をかすめるように動かしましょう。",
"きついレップでも体幹をひねって重量を持ち上げようとしないこと。",
"引き上げたトップで肩甲骨を背骨に寄せるように締めましょう。",
"作業側の腰はベンチに対して正面を保ち、上に回転させないようにしましょう。",
"ダンベルを落とさず、ゆっくり下ろしてテンションを維持しましょう。",
"ダンベルを引き上げるときに息を吐き、下ろすときに吸いましょう。",
"引く際に肩をすくめて耳に近づけないようにしましょう。",
"首はニュートラルに保ち、重量を見ようと頭を回さないようにしましょう。",
"手や手首ではなく、肘から動かす意識を持ちましょう。",
"左右の広背筋を均等に鍛えるため、レップ数を揃えてから逆側に替えましょう。"
],
"Single-arm lat pulldown": [
"トップで作業側の肩を上へ伸ばし、フルストレッチを作りましょう。",
"肘をハンドルではなく腰に向かって引き下げるイメージで行いましょう。",
"体幹は正面を向けたまま——ケーブル側にひねらないようにしましょう。",
"左右のレップ数をぴったり揃えましょう——弱い方の側に合わせるのが基本です。",
"ボトムで肩甲骨を下げたまま一瞬止めましょう。",
"両手で行うプルダウンより軽い重量になるのは正常です——体を傾けてズルをしないこと。"
],
"Single-arm tricep kickback": [
"股関節から前傾し、背中は丸めずフラットに保ちましょう。",
"上腕は床と平行にし、体の側面に固定したままにしましょう。",
"肘だけを伸ばす動作にし、上腕を振って挙げないようにしましょう。",
"完全に伸ばしきったところで三頭筋を強く収縮させてから戻しましょう。",
"反動やヒップスラストでダンベルを振り上げないようにしましょう。",
"腕を後ろに伸ばすときに息を吐き、曲げて戻すときに吸いましょう。",
"重量を見ようと首を伸ばさず、ニュートラルに保ちましょう。",
"反対の手をベンチについて支えると、より安定します。",
"テコの原理が厳しい種目なので、想定より軽い重量を選びましょう。",
"各レップの開始時、肘はおよそ直角に曲げておきましょう。",
"ダンベルを後方へ蹴り上げる際、肩が上がったり回転したりしないようにしましょう。",
"前腕を素早く落とさず、下ろす動作をコントロールしましょう。"
],
"Smith machine Romanian deadlift": [
"通常のルーマニアンデッドリフトの開始姿勢に合わせ、バーを太もも中央の高さにセットしましょう。",
"固定された垂直軌道に合わせるため、足をバーよりやや前に置きましょう。",
"バーを脚に沿わせながら下ろす際は、まっすぐ下ではなく腰を後ろに引くように動かしましょう。",
"ハムストリングスの可動域いっぱいまで、そして腰が丸まる直前で止めましょう。",
"腰を前に押し出し、お尻を締めながらかかとで踏み込んで立ち上がりましょう。",
"バーは体に沿わせたまま——下ろす際に脚をかすめるくらい近くを保ちましょう。"
],
"Smith machine bench press": [
"プレス時にバーが胸の中央を自然な軌道でなぞるよう、ベンチの位置を調整しましょう。",
"固定されたバー軌道はフリーウェイトのベンチプレスと異なります——必要ならグリップ幅を調整しましょう。",
"足を床にしっかりつけ、肩甲骨を寄せて下げた状態を保ちましょう。",
"バーを胸の中央までコントロールしながら下ろし、まっすぐ押し戻しましょう。",
"ラックアウトはバーを回してセーフティフックから外す動作で行い、まっすぐ上に押し上げないこと。",
"セットの終わりには、バーをひねってフックに戻し安全にラックしましょう。"
],
"Smith machine hip thrust": [
"床に座った状態で腰に心地よく乗る高さに、スミスマシンのバーをセットしましょう。",
"バーパッドやフォームローラーを使って、腰にかかるバーをクッションしましょう。",
"かかとで踏み込み、体が一直線になるまで腰を突き上げましょう。",
"トップでお尻を強く締め、1カウント止めてから下ろしましょう。",
"腰はコントロールしながら下ろしましょう——バーを落としたり体にぶつけたりしないこと。",
"足は床にフラットに、膝はつま先の真上を通るように保ちましょう。"
],
"Smith machine inverted row": [
"バーは腰の高さかそれより低くセットしましょう——床に近いほど負荷が高まります。",
"肩幅で握り、体を一直線にしてバーの下にぶら下がりましょう。",
"肩甲骨を寄せることで胸をバーに引き上げましょう。",
"頭からかかとまで体を固く保ちましょう——腰が床側に落ちないように。",
"腕が完全に伸びるまで、ゆっくりコントロールしながら体を下ろしましょう。",
"自重ロウが楽になったら、足をベンチに乗せて負荷を大きく上げましょう。"
],
"Smith machine shoulder press": [
"ベンチを90度の直立にセットし、バーがあご付近の高さから始まるよう位置を調整しましょう。",
"肩関節への負担を減らすため、肩幅よりやや広くバーを握りましょう。",
"固定された垂直軌道に沿ってバーをまっすぐ上に押し上げましょう——顔の周りを弧を描く必要はありません。",
"バーは首の後ろではなく、胸の上部の高さまで下ろしましょう。",
"腰をベンチのパッドに密着させ、過度な反りを避けましょう。",
"高重量を扱う際は体幹を締めて、腰が反り過ぎないようにしましょう。"
],
"Smith machine shrug": [
"太もも前でバーを構え、腕を完全に伸ばして直立しましょう。",
"肩をまっすぐ耳に向けてすくめる、コントロールされた垂直の動きで行いましょう。",
"トップで1カウント収縮を保ち、僧帽筋をしっかり働かせましょう。",
"肩はゆっくりと開始位置まで下ろしましょう——重量を落とさないこと。",
"腕はずっとまっすぐに——シュラッグは僧帽筋の種目であり、二頭筋カールではありません。",
"肩を回すように動かすのは避けましょう——長期的に肩関節に負担がかかります。"
],
"Smith machine squat": [
"固定された垂直軌道に合わせるため、足をバーよりやや前に置きましょう。",
"足は肩幅に開き、つま先はやや外側に向けましょう。",
"太ももが床と平行になるまでしゃがんでから、押し返して立ち上がりましょう。",
"かかとで踏み込み、動作中ずっと胸を高く直立させましょう。",
"万が一に備えて、セーフティフックを正しい高さにセットしましょう。",
"スミスマシンはバランスを取る必要がないため、深さとコントロールに集中しましょう。"
],
"Smith machine standing calf raise": [
"バーを僧帽筋上部に乗せ、足の母指球を台の上に置きましょう。",
"各レップの底でかかとを台からはみ出させ、フルストレッチを作りましょう。",
"レップごとにかかとをできるだけ深く下ろし、ストレッチを最大化しましょう。",
"母指球で踏み込んで上がり、トップでふくらはぎを強く収縮させましょう。",
"反動を使わないよう、各レップの上下で一瞬止めましょう。",
"膝は完全に伸ばしたまま行いましょう——曲げるとヒラメ筋に負荷が移ってしまいます。"
],
"Straight arm cable pulldown": [
"股関節をわずかに前傾させ、肘を軽く曲げた状態で直立しましょう。",
"動作中ずっと腕をまっすぐに保ち、肩関節だけを動かしましょう。",
"バーは床に向かってまっすぐではなく、太ももに向かって弧を描くように引き下げましょう。",
"ボトムで広背筋を強く収縮させてから、バーを戻しましょう。",
"重量が増えても肘を曲げないようにしましょう——三頭筋に負荷が移ってしまいます。",
"引く際に腰が反らないよう、体幹を固めましょう。",
"バーが下がるときに息を吐き、戻るときに吸いましょう。",
"トップでリセットせず、上げる動作をゆっくりコントロールして広背筋のテンションを保ちましょう。",
"体全体を後ろに傾けて引くのを補助しないこと——広背筋に仕事をさせましょう。",
"セット中ずっと肩を耳から離して下げておきましょう。",
"広背筋が腕を引き下げているイメージを持ち、マインドマッスルコネクションを意識しましょう。",
"レップ間でケーブルに腕を素早く引き戻されないようにしましょう。"
],
"T-bar row": [
"股関節の角度を45度に固定し、セット中ずっとその角度を保ちましょう。",
"肘を上後方へ引きながら、ハンドルを胸の下部まで引きましょう。",
"トップで肩甲骨を寄せて一瞬締めましょう。",
"重量を動かすために立ち上がらないこと——それは反動であり、背中の仕事ではありません。",
"背中はフラットに保ちましょう——疲労で丸まるのがこの種目最大のケガのリスクです。",
"脚は固めましょう——脚はエンジンではなく土台です。"
],
"Tricep dips": [
"肘は横に開かず、まっすぐ後ろに動かすようにしましょう。",
"上腕がほぼ床と平行になるまで体を下ろしましょう。",
"胸より三頭筋を強調するため、体幹は直立を保ちましょう。",
"下ろす際に肩をすくめて耳に近づけないようにしましょう。",
"下ろすときに息を吸い、押し上げるときに吐きましょう。",
"肩関節に挟まれるような感覚があれば、そこで下げるのをやめましょう。",
"腰がベンチから離れて垂れ下がらないよう、体幹を締めましょう。",
"片側に傾かず、両手のひらで均等に押しましょう。",
"自重レップが楽に感じたら、加重するか膝をより深く曲げましょう。",
"各レップのトップで肘を強くロックアウトしすぎないようにしましょう。",
"手首は肩の真下に置き、外側に開かないようにしましょう。",
"ディップの底で素早く弾まず、コントロールして動きましょう。"
],
"Triceps pushdown": [
"肘を体の側面に固定し、セット中ずっとその位置をキープしましょう。",
"バーに重量を乗せる前に、軽いウォームアップセットで肘の位置を体に覚え込ませましょう。",
"三頭筋にテンションを保つため、肩ではなく股関節からわずかに前傾しましょう。",
"腕が完全にまっすぐになるまでバーを押し下げますが、激しくロックアウトしないようにしましょう。",
"前腕が床と平行になる程度まで、バーを上げましょう。",
"押し下げるときに息を吐き、バーをコントロールして戻すときに吸いましょう。",
"体重や体幹の前傾を使って無理に重量を押し下げないようにしましょう。",
"肘の完全伸展位置で一瞬止めて収縮させ、三頭筋の締めを最大化しましょう。",
"手首はしなやかに曲げず、まっすぐ固く保ちましょう。",
"バーが勢いよく戻ってくるのを許さず、下ろす動作(エキセントリック)をコントロールしましょう。",
"ケーブルプーリーを上部にセットし、開始角度で肘への負担を最小限にしましょう。",
"ケーブルの軌道が斜めにならず垂直を保つよう、ケーブルスタックの近くに立ちましょう。"
],
"Walking lunge": [
"前膝が足首の真上にくるくらい、十分な歩幅を取りましょう。",
"前傾するのではなく、後ろ膝を床に向かって下ろしましょう。",
"前足のかかとで踏み込んで、次のランジへ進みましょう。",
"体幹は高く保ち、ダンベルは体の横で静かに保ちましょう。",
"一歩ごとに脚を交互に——片脚ずつではなく合計歩数でカウントしましょう。",
"歩幅を短くすると大腿四頭筋に、長くするとお尻に負荷が移ります。"
],
"Wide-grip cable row": [
"開始位置でさらに前に伸ばそうと腰を丸めないこと——追加のストレッチは肩甲骨を前に突き出すことで作り、背骨を曲げないようにしましょう。",
"引く際に肘を外側へ張り出しましょう——肘が体側に収まるとグリップ幅の効果が薄れ、通常のロウになってしまいます。",
"体幹はずっと直立を保ちましょう——後ろに体を揺らして重量を動かすと、背中の仕事が失われ腰を痛めるリスクがあります。",
"引き終わりの締めは、広背筋だけでなく上背部とリアデルトに意識を集中しましょう——それがワイドグリップの目的です。",
"戻す動作はゆっくりコントロールしましょう——エキセントリック局面こそ上背部が発達するタイミングです。"
]
,
  "Dumbbell standing calf raise": [
    "自由な方の手で安定した場所につかまりましょう。この種目はふくらはぎだけでなくバランス感覚も必要です。",
    "各レップの前に、台が許す範囲までかかとをしっかり下げてストレッチしましょう。",
    "母指球で踏み込み、トップでできるだけ高くつま先立ちになりましょう。",
    "トップで一瞬止めて、ふくらはぎをしっかり収縮させてから下ろしましょう。",
    "膝は軽く保ち、動かさないようにしましょう。動作は膝ではなく足首から生み出しましょう。",
    "片側を終えてから反対側に切り替えるか、ダンベル2本を使う場合は左右均等に行い、弱い方のふくらはぎが手薄にならないようにしましょう。"
  ],
"Decline barbell bench press": [
"ラックアウトする前に、足首をしっかりローラーに引っ掛けて固定しましょう。",
"フラットベンチプレスと違い、バーは下部胸筋まで下ろしましょう。",
"肩甲骨はベンチに寄せて固定したまま、セット中ずっとキープしましょう。",
"デクライン角度で可動域は短くなりますが、下ろす動作は焦らずコントロールしましょう。",
"デクラインは失敗したときに逃げにくいので、補助者かセーフティ付きのラックを使いましょう。",
"肘は体幹に対して90度ではなく、約45度の角度を保ちましょう。"
],
"Barbell floor press": [
"ボトムでは上腕を完全に床につけましょう。それが深さの目安で、胸ではありません。",
"床での静止でモメンタムが消えるので、跳ね返さず力強く押し上げましょう。",
"脚は伸ばして力を抜いたまま。ベンチプレスのような脚の踏み込みは使いません。",
"床がボトム3分の1をカットするので、三頭筋のロックアウト力を鍛えるのに向いています。",
"グリップは肩幅よりやや広め。脚の助けがない分、広すぎると肩に負担がかかります。",
"各レップの前に呼吸を整えて体幹を固めましょう。ボトムでの反動は使えません。"
],
"Barbell pullover": [
"ベンチに乗せるのは肩と上背部だけ。お尻は低く、ブリッジのような姿勢にしましょう。",
"肘は柔らかく固定したまま。これは肘を曲げる種目ではなく、肩を軸にした動きです。",
"肩や胸に本物のストレッチを感じるまで頭の後ろへ下ろしましょう。肩が痛むほどではなく。",
"思ったより軽い重量から始めましょう。これは筋力を鍛えるより伸張と収縮を狙う種目です。",
"バーを胸の上に戻す動作で息を吐きましょう。",
"肋骨は下げたまま。可動域を稼ごうと開くと腰に負担がかかります。"
],
"Incline dumbbell fly": [
"セット中ずっと肘の角度を一定に軽く曲げたまま保ちましょう。伸ばしたり潰したりしないように。",
"ダンベルが肩より下がるまでではなく、上部胸筋にストレッチを感じるまで下ろしましょう。",
"押すのではなく樽を抱えるイメージで。弧を描く動きは肩から生まれます。",
"頂点でダンベルをただ触れ合わせるのではなく、本を閉じるように胸をぎゅっと収縮させましょう。",
"肩甲骨はベンチに固定したまま。前に丸まると肩の種目になってしまいます。",
"フラットフライより軽い重量を使いましょう。インクライン角度はボトムでの負担を増やします。"
],
"Decline dumbbell fly": [
"ベンチは浅めのデクラインに設定しましょう。角度がきつすぎるとセットアップが不安定になります。",
"他のフライ種目と同様、肘は軽く曲げたまま固定しましょう。",
"胸の高さまで下ろし、それより下げないように。デクライン角度で可動域はすでに短くなっています。",
"ダンベルを打ち合わせるのではなく、頂点でぎゅっと収縮させましょう。",
"下部胸筋を狙う種目です。上部を狙うインクライン種目と組み合わせて全体をカバーしましょう。",
"スタート時はスポッターにダンベルを渡してもらいましょう。デクラインで一人でセットアップするのは不安定です。"
],
"Dumbbell floor press": [
"ボトムでは上腕三頭筋を床につけましょう。それが停止位置で、避けるべきものではありません。",
"足は床にしっかりつけ、体幹を固めましょう。脚の踏み込みで助けてくれるものはありません。",
"床が可動域を制限してくれるので、フルレンジのベンチプレスが肩に負担な人にはよい代替になります。",
"頂点でダンベルをやや内側に寄せながら押し、胸をしっかり収縮させましょう。",
"ダンベルは胸までカールしてからロールバックしてセットしましょう。床から一気に持ち上げないように。",
"下ろす動作をコントロールしましょう。肘を床に落とすように下ろすのは本来の目的から外れます。"
],
"Neutral-grip dumbbell press": [
"レップ中ずっと手のひらを向かい合わせたままにしましょう。通常のダンベルプレスのような回転はありません。",
"このグリップは肩に優しいので、通常のプレスが関節に負担なら良い選択肢です。",
"上腕がベンチとほぼ平行になるまでダンベルを下ろし、通常のプレスより肘を体に近づけましょう。",
"頂点でダンベルがほぼ触れ合うように、やや内側に寄せながら押しましょう。",
"足はしっかり床につけ、お尻を締めて安定した土台を作りましょう。",
"このニュートラルグリップはプロネイテッドグリップのプレスより三頭筋にもやや強く効きます。"
],
"Smith machine incline press": [
"重量をつける前にベンチをバーの下にセットし、バーの軌道が上部胸筋に合うようにしましょう。",
"バーの軌道は固定されているので、バランスを取るより下ろす動作のコントロールに集中しましょう。",
"上部胸筋・鎖骨のあたりまで下ろしましょう。それがインクライン角度が狙う部位です。",
"足は床にしっかりつけ、肩甲骨は固定したままにしましょう。",
"バーのロックを外すのは、体勢を整えて体幹を固めてからにしましょう。",
"マシンで安定感があっても、肘は45〜60度以上外側に開かないようにしましょう。"
],
"Machine-assisted dip": [
"スタックの重量が多いほど補助が強くなります。最初は補助を多めにして徐々に減らしていきましょう。",
"プラットフォームの中央に膝をつき、セット中にマシンが傾いたり揺れたりしないようにしましょう。",
"胸を狙うなら少し前傾、三頭筋を狙うなら直立姿勢を保ちましょう。",
"上腕がほぼ床と平行になるまで下ろしましょう。肩に違和感があればそれ以上深く沈まないように。",
"頂点で強くロックアウトしすぎずに押し上げましょう。",
"強くなるにつれて補助重量を減らし、自体重の負荷を増やしていきましょう。"
],
"Cable crossover": [
"少し前傾した姿勢と、セット中固定した軽い肘の曲げから始めましょう。",
"手をまっすぐ下ろすのではなく、木を抱きしめるように弧を描いて下へ内側へ動かしましょう。",
"ボトムで手を軽く交差させて胸をしっかり収縮させ、リセットしましょう。",
"ケーブルに体を預けるので、足は前後にずらして安定した土台を作りましょう。",
"戻すときはコントロールしましょう。ウェイトスタックに引っ張られて勢いよく戻らないように。",
"両方のプーリーの高さが揃っているか、始める前に左右のピンを確認しましょう。"
],
"Cable low-to-high fly": [
"プーリーは低い位置に設定し、手は腰の横あたりから始めましょう。",
"腕を上へ内側へ振り上げ、胸の高さより上で手を合わせて終わりましょう。",
"ハイ・トゥ・ローのクロスオーバーとは逆で、この角度は上部胸筋の繊維を狙います。",
"肘は軽く曲げたまま固定しましょう。プレスのような動きにならないように。",
"振り上げる際に少し前傾すると、緊張を肩ではなく胸に保てます。",
"頂点で少し止めて収縮させてから、コントロールして戻しましょう。"
],
"Decline push-ups": [
"足を頑丈な台やベンチに乗せましょう。足の位置が高いほど上部胸筋と肩への負荷が増えます。",
"頭からかかとまで一直線を保ちましょう。お尻が下がったり上がったりしないように。",
"胸がほぼ床につくまで下ろし、肘は約45度の角度に保ちましょう。",
"通常のプッシュアップより上半身に体重がかかるので難しくなります。フォームが崩れるならフラットプッシュアップに戻しましょう。",
"腰を守るため、セット中ずっと体幹を固めておきましょう。",
"手首を守るため、指先だけでなく手のひら全体で床を押しましょう。"
],
"Wide-grip push-ups": [
"手は肩幅よりはっきり広く、指先はやや外側に向けて置きましょう。",
"通常のプッシュアップより可動域が短くなりますが、それがワイドグリップでは普通です。",
"肘はいつもより大きく外側に開いて構いません。この種目は意図的に胸を三頭筋より優先させます。",
"体はまっすぐな一直線を保ちましょう。ワイドグリップはお尻が下がりやすいので体幹を固めましょう。",
"素早く落とすのではなくコントロールして下ろしましょう。ワイドグリップは急ぐと肩への負担が増えます。",
"肩に違和感があれば、無理せずグリップをやや狭めましょう。"
],
"Pendlay row": [
"すべてのレップのボトムでバーは床につけましょう。浮かせたりバウンドさせたりしないように。",
"引く前に背中をフラットにしてほぼ床と平行にセットし、その姿勢をセット中キープしましょう。",
"床から爆発的に引き、肘を上へ後ろへ動かしましょう。",
"この種目は低レップで各レップごとに完全停止させるためのもの。タッチアンドゴーのロウにしないように。",
"頭は中立位置に保ちましょう。首を上に伸ばしても得るものはありません。",
"次のレップへの勢いがない分、引く前に毎回しっかり体幹を固めましょう。"
],
"Rack pull": [
"バーをロードする前に、ピンを膝の高さ(または狙う部分ロードの開始位置)に設定しましょう。",
"これによりデッドリフトの上半分だけを、床から引くより重い重量で鍛えられます。",
"引く動作の間ずっとバーをすねと太ももに近づけたままにしましょう。",
"腰を反らせるのではなく、お尻を締めて股関節をフルロックアウトまで伸ばしましょう。",
"頂点でシュラッグにしないように。股関節と膝が完全に伸びたら止めましょう。",
"可動域が短い分、つい重量を乗せすぎがちです。段階的に増やしていきましょう。"
],
"Yates row": [
"バーは順手(手のひらを自分に向ける)で握りましょう。それが通常のバーベルロウとの違いです。",
"ペンドレーロウより直立気味に、約45度の体幹角度を保ちましょう。",
"バーを下部肋骨・腰のあたりに引き、肘は下へ後ろへ動かしましょう。",
"順手グリップは通常より上腕二頭筋も強く使うので、そこにも効くのを感じるはずです。",
"この直立気味の角度で腰を守るため、体幹を固めておきましょう。",
"バーを落として肩を引っ張らせるのではなく、下ろす動作をコントロールしましょう。"
],
"Chest-supported dumbbell row": [
"腕が自由に垂れる高さで、胸がパッドにぴったり付くようにベンチを設定しましょう。",
"体幹が固定されているので、すべての力は背中から。体を揺らしてズルはできません。",
"ダンベルを腰の方向へ引き、肘は後ろへやや外側に動かしましょう。",
"頂点で肩甲骨を寄せてから、コントロールして下ろしましょう。",
"首はリラックスさせ、上を向くのではなく背骨と一直線に保ちましょう。",
"腰が全く関与しないので、立って行うロウより重い重量を扱いましょう。"
],
"Incline dumbbell row": [
"ベンチを急なインクラインに設定し、胸を支えてうつ伏せに寝ましょう。",
"スタートではダンベルを完全に垂らし、フルストレッチを感じましょう。",
"肘を大きく外側に開かず、体に近づけたまま腰の方向へ引きましょう。",
"この角度は勢いを完全に排除します。立って行うロウとの違いを感じましょう。",
"首を中立に保つため、額をパッドに乗せるか下を見ましょう。",
"レップの間にウェイトを落とさず、コントロールして下ろしましょう。"
],
"Kroc row": [
"片膝と片手をベンチにつけて支え、もう片方の腕は重いダンベルを持って自由に垂らしましょう。",
"通常のシングルアームロウより重く、厳密さは少なめでよい種目です。多少の腰・体幹の回転は正常です。",
"脚と股関節を使って引き始め、力強くダンベルを腰へ引き上げましょう。",
"この種目は脊椎への負荷が増えるので、腰は常に固めておきましょう。",
"頂点で肩が耳に向かってすくまないよう、下げて後ろに保ちましょう。",
"この種目は勢いが伴うため重量は段階的に増やしましょう。"
],
"Machine high row": [
"シート高は、ハンドルが胃ではなく上部胸筋の高さに合うように調整しましょう。",
"ハンドルを上部胸筋の方へ後ろ・下へ引き、肘を上へ外へ動かしましょう。",
"動作の後方で肩甲骨を強く寄せましょう。",
"この角度は通常の背中中部ロウより上背部と後部三角筋を強く狙います。",
"胸はパッドに押し付けたまま。浮かせて可動域を稼ぐのはやめましょう。",
"ウェイトスタックに腕を前へ引っ張らせず、戻す動作をコントロールしましょう。"
],
"Machine pullover": [
"マシンのアームの支点が肩の位置に合うようシートを調整しましょう。",
"肘は軽く曲げたまま固定。これはラットのストレッチと収縮であり、三頭筋のプレスではありません。",
"ラットにフルストレッチを感じるまでアームを上げてから引き下ろしましょう。",
"肘を腰の方向へ動かすイメージで、腕ではなく広背筋で引き下ろしましょう。",
"胸を背もたれパッドにつけたまま、余分な可動域を稼ぐために反らないようにしましょう。",
"バーベルやケーブルのプルオーバーが肩に負担なら、このマシンは良い代替です。"
],
"Cable pullover": [
"プーリーを高く設定し、タワーから心地よい距離をとって立つか膝立ちになりましょう。",
"バーベル版と同様、肘は軽く曲げたまま固定して弧を描くように下ろしましょう。",
"太もも程度の高さまでバーを引き下ろし、腕ではなく広背筋で引くことに集中しましょう。",
"腰を反らせて可動域を稼ぐのではなく、肋骨を下げて体幹を固めましょう。",
"ケーブルの一定した張力は、重いロウやプルダウンの後の広背筋の仕上げに向いています。",
"ストレッチした位置に戻すときはコントロールし、ウェイトに引っ張られて前に飛び出さないようにしましょう。"
],
"Inverted row": [
"体を頭からかかとまで一直線に保ち、挑戦的な傾き角度を作れる高さにバーを設定しましょう。",
"バーが低いほどきつく、高いほど楽になります。",
"体を頭からかかとまで固く保ちましょう。お尻が床へ沈まないように。",
"腕を曲げるだけでなく、肘を後ろへ引くようにして胸をバーに引き寄せましょう。",
"頂点で肩甲骨を寄せてから、コントロールして下ろしましょう。",
"マシンが空いていないときに、ケーブルロウの良い自重代替になります。"
],
"Superman": [
"腕・胸・脚を同時に床から持ち上げましょう。上半身か下半身だけを上げるのではなく。",
"強く反らすことより、指先とつま先を遠くへ伸ばすイメージを持ちましょう。",
"頂点で少し止めて、お尻と腰を締めてから、コントロールして下ろしましょう。",
"首は中立に保ち、まっすぐ前ではなく数メートル先の床を見ましょう。",
"これは軽負荷の種目です。重量を追加するより、レップ数や保持時間を増やしましょう。",
"ホールド中は息を止めず、通常通り呼吸しましょう。"
],
"Scapular pull-ups": [
"腕を完全に伸ばしてぶら下がりましょう。これは肘を曲げて引く種目ではありません。",
"動きはすべて肩甲骨が下へ内側へ寄ることから生まれます。腕を曲げるのではなく。",
"動く距離は数センチだけ。それが正解で、無理にフルプルアップにしないように。",
"プルアップの前のウォームアップや、肩のコントロールを先に身につける初心者の段階練習に最適です。",
"肩をすくめて下げるときに体が揺れないよう、体幹を固めましょう。",
"肩をすくめたボトムで少し止めてから、リラックスした状態に戻りましょう。"
],
"Landmine press": [
"プレートを乗せる前に、バーの空いた端をランドマインアタッチメントか頑丈な角に固定しましょう。",
"押すにつれてバーは自然に上へ前へ弧を描きます。軌道に逆らわず、ついていきましょう。",
"スタンスを前後にずらすと、まっすぐ立つより安定した土台になります。",
"この角度はストレートなオーバーヘッドプレスより肩に優しいので、通常のプレスが肩に負担なら良い選択肢です。",
"手のひら全体で押し、手首は肘の真上に保ちましょう。",
"片手でも両手でもプレスできます。まずは両手で軌道を覚えましょう。"
],
"Barbell seated shoulder press": [
"ジムに背もたれ付きベンチがあれば座って行いましょう。脚の踏み込みがなくなり、肩をより単独で鍛えられます。",
"バーは低い位置ではなく上部胸筋・鎖骨のあたりからスタートしましょう。",
"前ではなくまっすぐ上に押し、頭のてっぺんの上でバーを終わらせましょう。",
"脚の踏み込みがない分、体幹を固めましょう。上体の安定はコアが担います。",
"毎レップ同じスタート位置までコントロールして下ろしましょう。",
"頂点で挟まる感じがしたら、無理にロックアウトせず少し手前で止めましょう。"
],
"Dumbbell scaption raise": [
"ダンベルを対角線上、体の真横ではなく約30度前方の斜め上に上げましょう。",
"動作中ずっと親指をやや上に向けてリードしましょう。",
"この角度はインピンジメントゾーンを避けるため、通常のラテラルレイズより肩に優しいことが多いです。",
"肩の高さまでのみ上げましょう。それ以上上げても効果はなく負担が増えるだけです。",
"ラテラルレイズより軽い重量を使いましょう。斜めの軌道は力学的に効率が落ちます。",
"肘は軽く曲げたまま、勢いを使って振り上げないようにしましょう。"
],
"Cable Y-raise": [
"始める前に低いプーリーで背後にケーブルを交差させ、対角線に引かれるようにしましょう。",
"腕を上へ外へ上げ、親指をリードにして頭上に大きな「Y」の形を作りましょう。",
"肘をロックせず、動作中ずっと軽く曲げたままにしましょう。",
"この種目は僧帽筋下部と後部三角筋を同時に鍛え、姿勢改善に効果的な仕上げ種目です。",
"軽い重量を使いましょう。これはコントロールと位置取りの種目で、重い挙上種目ではありません。",
"腕を上げるときに肩が耳の方へすくまないようにしましょう。"
],
"Cable front raise": [
"プーリーを低く設定し、タワーに背を向けて立ちましょう。",
"腕をまっすぐ前へ肩の高さまで上げ、手のひらは下を向けましょう。",
"頂点で重力の助けがないため、ダンベルフロントレイズより頂点での負荷が大きくなります。",
"体幹を静止させ、ウェイトを上げるために後ろに反らないようにしましょう。",
"ケーブルに腕を引っ張らせず、コントロールして下ろしましょう。",
"片腕ずつでも両腕同時でも、フォームがきれいに保てる方を選びましょう。"
],
"Plate-loaded shoulder press": [
"ハンドルが肩の高さから始まるようシートを調整しましょう。",
"マシンの固定された軌道に沿ってハンドルを押し上げましょう。バランスを自分で取る必要はありません。",
"プレス中ずっと背中をパッドにつけたままにしましょう。",
"軌道が固定されているので、初心者が安全にプレス力を鍛えるのに向いています。",
"頂点で肘を強くロックアウトせず、少し手前で止めましょう。",
"ウェイトを落とさず、コントロールしてスタート位置に戻しましょう。"
],
"Drag curl": [
"バーが上がる間、体に接触させたまま。体から離れて弧を描くのではなく、体に沿って引きずり上げます。",
"バーが上がるにつれて肘を体幹の後ろへ動かしましょう。通常のカールとは異なります。",
"これは二頭筋の後部への刺激を増やし、前部三角筋への関与を減らします。",
"通常のカールより軽い重量を使いましょう。ストレングスカーブが異なり、頂点で難しくなります。",
"動作中ずっと手首はまっすぐに保ち、補うために曲げないようにしましょう。",
"同じ軌道でバーを引きずり下ろすようにコントロールしましょう。"
],
"21s barbell curl": [
"レップ範囲を3分割:ボトムハーフ7回、トップハーフ7回、フルレンジ7回で行いましょう。",
"ボトムハーフは完全伸展から肘90度までです。",
"トップハーフは肘90度から完全収縮までです。",
"3つのフェーズすべてで肘を体側に固定したまま。前に流れないようにしましょう。",
"通常のカールより軽い重量を使いましょう。常時緊張がすぐに蓄積します。",
"腕トレの最後に取り入れましょう。筋力向上種目というより仕上げ種目です。"
],
"Wide-grip barbell curl": [
"バーを肩幅よりはっきり広く握りましょう。",
"このグリップは二頭筋の内側(短頭)への刺激を強めます。",
"グリップが広くても肘は体側に引き寄せたままにしましょう。",
"通常のカールよりやや短く制限された可動域になることを想定しましょう。",
"重量が重くなっても肘を前に流さないように。それは勢いに頼っている証拠です。",
"挙げる動作と同じくらい丁寧に下ろす動作もコントロールしましょう。"
],
"Zottman curl": [
"手のひらを上に向けた通常の順手グリップでカールしましょう。",
"頂点で手首を回転させ、下ろす前に手のひらを下に向けましょう。",
"手のひらを下に向けたまま、ゆっくり下ろしましょう。これがこの種目の特徴で、下ろす動作で前腕を強く刺激します。",
"ボトムに着いたら手のひらを上に回転させ直し、次のレップに備えましょう。",
"反転させたグリップでの下ろす動作は明らかに難しいので、通常のカールより軽い重量を使いましょう。",
"カールと逆方向への下ろす動作の両方で、肘は体側に固定したままにしましょう。"
],
"Spider curl": [
"急な角度のインクラインベンチにうつ伏せで体を預け、腕は自由に垂らしましょう。",
"セット中ずっと上腕をベンチパッドに固定したまま。揺らさないように。",
"この姿勢は勢いを完全に排除し、厳密な二頭筋の単関節種目になります。",
"二頭筋が完全に収縮するまでカールしましょう。",
"ゆっくり最後までしっかり下ろしましょう。デッドハングのボトムポジションが強いストレッチを生みます。",
"スタンディングカールより軽い重量を使いましょう。この厳密なフォームはエゴリフトを許しません。"
],
"Cross-body hammer curl": [
"通常のハンマーカールと同じく、ニュートラルグリップ(手のひらを内向き)を保ちましょう。",
"まっすぐ上ではなく、ダンベルを対角線上に反対側の肩へ向けてカールしましょう。",
"この角度は上腕筋と前腕を、まっすぐなハンマーカールとはやや異なる形で刺激します。",
"肘は体側で比較的固定したまま、体の前を横切らせないようにしましょう。",
"片側ずつ丁寧に切り替え、急がないようにしましょう。",
"カールしたのと同じ対角線の軌道で下ろしましょう。"
],
"Plate-loaded machine bicep curl": [
"セットを始める前に、上腕を角度のついたパッドに完全に乗せましょう。",
"前腕だけでカールしましょう。パッドが上腕を固定しているので体を揺らしてズルはできません。",
"マシンが勢いを排除するので、各レップの頂点で強く収縮させましょう。",
"プレートを落として腕をまっすぐ引っ張らせず、コントロールして下ろしましょう。",
"疲れていても厳密なフォームを保ちやすいので、仕上げ種目として良い選択です。",
"肘がマシンの支点に合うようシートを調整しましょう。"
],
"Cable spider curl": [
"プーリーを低く設定し、急な角度のインクラインベンチにタワーに向かってうつ伏せで体を預けましょう。",
"ダンベルスパイダーカールと同様、上腕をベンチパッドに固定したままにしましょう。",
"ケーブルはダンベルと違いボトムでたるまず、動作中ずっと一定の張力を保ちます。",
"完全収縮までカールしてから、コントロールして下ろしましょう。",
"見た目より難しく感じるので、思ったより軽い重量を使いましょう。一定の張力がそうさせます。",
"首はリラックスさせ、横に頭を乗せるか下を向きましょう。"
],
"Dumbbell close-grip floor press": [
"ダンベルを通常のフロアプレスより近づけて、胸の上に一緒に構えましょう。",
"下ろすときは肘を外側ではなく肋骨に引き寄せたままにしましょう。",
"ボトムでは三頭筋を床につけましょう。それが深さの目安です。",
"このバリエーションは通常のフロアプレスより三頭筋への負荷を高めます。",
"頂点でダンベルをやや内側に寄せながら押し、三頭筋をしっかり収縮させましょう。",
"負担を避けるため、手首は動作中ずっと肘の真上に保ちましょう。"
],
"Seated machine tricep extension": [
"始める前にシートを調整し、上腕がパッドで縦に固定されるようにしましょう。",
"頂点で三頭筋を収縮させることを意識しながら腕を完全に伸ばしましょう。",
"上腕は動作中ずっと固定したまま。動くのは前腕だけです。",
"ウェイトを落とさず、コントロールしてフルストレッチまで戻しましょう。",
"オーバーヘッドエクステンションが肘に負担なら、このマシンは三頭筋を安全に鍛える選択肢です。",
"重量が増えても肩をすくめないように、リラックスして下げたままにしましょう。"
],
"Bench dips": [
"手は腰の真後ろでベンチの端をつかみ、指先は前を向けましょう。",
"肘を後ろに向けたまま、まっすぐ下ろしましょう。外側に開かないように。",
"上腕がほぼ床と平行になったら止めましょう。それ以上深くすると肩に負担がかかります。",
"お尻をベンチに近づけたまま行いましょう。足を遠くに出しすぎると肩への負担が増えます。",
"自重のレップが楽になったら、膝の上にプレートを乗せましょう。",
"肩に挟まる感じがしたら、無理をせず可動域を狭めましょう。"
],
"Close-grip push-ups": [
"胸の下で手を近づけて置き、親指と人差し指がほぼ触れるようにしましょう。",
"下ろすときに肘を肋骨に引き寄せたままにしましょう。これが三頭筋への刺激を高める要因です。",
"頭からかかとまで体を一直線に保ちましょう。",
"通常のプッシュアップより手首に負担がかかるので、まっすぐ保ち、反らないようにしましょう。",
"胸が手のすぐ上にくるまで下ろし、しっかり押し上げましょう。",
"肘や手首に違和感があれば、グリップを少し広げて調整しましょう。"
],
"Barbell reverse curl": [
"手のひらを下に向けた順手グリップ(通常のカールとは逆)で握りましょう。",
"このグリップは通常のカールより前腕と上腕筋への負荷を高めます。",
"通常のカールより明らかに軽い重量になることを想定しましょう。このグリップははるかに弱いです。",
"手首は動作中ずっと固く、まっすぐに保ちましょう。負荷で反らせないように。",
"カールする間、肘は体側に固定したままにしましょう。",
"見た目より下ろす動作のコントロールが難しいので、丁寧に下ろしましょう。"
],
"Dumbbell finger curl": [
"座って前腕を太ももに乗せ、手首は膝より少し先に垂らしましょう。",
"ダンベルを緩く指に持たせ、指先ぎりぎりまで転がり落ちるようにしましょう。",
"指を閉じてハンドルを握り込み、また開きましょう。手首は動作中ずっと動かしません。",
"これは手首を動かすリストカールとは違い、握力そのものを狙います。",
"軽い重量を使いましょう。握力と指の屈筋はすぐに疲労します。",
"ファーマーズキャリーやデッドハングと組み合わせて、握力を総合的に鍛えましょう。"
],
"Cable wrist curl": [
"座って前腕を太ももに乗せ、手首は膝より少し先に垂らしましょう。",
"手首を心地よい範囲までカールし、コントロールして下ろしましょう。",
"前腕は太ももに固定したまま。動くのは手首だけです。",
"ケーブルの一定した張力は、頂点でたるむダンベルリストカールとは異なる感覚です。",
"軽い重量で高レップを使いましょう。前腕はボリュームによく反応します。",
"レップ間でウェイトに手首を急に引っ張らせないようにしましょう。"
],
"Cable reverse wrist curl": [
"手のひらを下に向けたまま、バーを握りましょう。",
"前腕を太ももに乗せ、手首は膝より少し先に垂らしましょう。",
"手首を上に伸展させ(手の甲を持ち上げ)、コントロールして下ろしましょう。",
"これは通常のリストカールとは反対側、前腕の上側を狙います。",
"通常のリストカールより軽い重量を使いましょう。この方向は明らかに弱いです。",
"前腕は動作中ずっと静止させ、動くのは手首だけにしましょう。"
],
"Bench-supported seated reverse fly": [
"起こしたインクラインパッドに向かって座り、胸を押し付けましょう。",
"ダンベルを両手で持ち、腕を伸ばして垂らしましょう。",
"肘を軽く曲げたまま腕を横に上げ、頂点で肩甲骨を寄せましょう。",
"胸の支えが勢いを完全に排除し、厳密な後部三角筋の単関節種目になります。",
"首を痛めないよう、頭をパッドに乗せるか下を向きましょう。",
"後部三角筋は小さな筋群なので、想定より軽い重量を使いましょう。"
],
"Prone dumbbell Y-raise": [
"インクラインベンチにうつ伏せになり、軽いダンベルを両手に持ちましょう。",
"腕をまっすぐ下へ垂らしましょう。",
"腕を上へ外へ上げ、親指をリードにして「Y」の形を作りましょう。",
"軽い重量を保ちましょう。これは筋力向上ではなくコントロールと位置取りの種目です。",
"上げた頂点で肩甲骨を下へ内へ寄せましょう。",
"首はリラックスさせ、背骨と一直線に保ちましょう。"
],
"Cable reverse fly": [
"体の前でケーブルを交差させ、反対側のタワーのハンドルをそれぞれの手で握りましょう。",
"腕を外側へ後ろへ振り、肩甲骨を寄せましょう。",
"肘はロックせず、動作中ずっと軽く曲げたままにしましょう。",
"交差したケーブルの軌道は広い範囲で一定の張力を生み、ダンベルとは異なる感覚です。",
"後部三角筋はすぐ疲労し重い重量を必要としないので、軽い重量を使いましょう。",
"ウェイトスタックに前へ引っ張られず、交差したスタート位置へコントロールして戻しましょう。"
],
"Cross-cable reverse fly": [
"始める前に股関節から約45度前傾し、その角度を動作中キープしましょう。",
"体の前で交差させ、反対側のタワーのハンドルを両手で握りましょう。",
"腕を外側へ後ろへ振り、頂点で肩甲骨を寄せましょう。",
"前傾姿勢は、直立して行うより後部三角筋への刺激を強めます。",
"この前傾角度で腰を守るため、体幹を固めましょう。",
"軽い重量でテンポをコントロールし、勢いで振り回さないようにしましょう。"
],
"Barbell high pull": [
"バーを太ももに構え、膝を軽く緩め、股関節をやや前傾させたアスレチックな姿勢から始めましょう。",
"バーを体に近づけて引き上げ、肘をリードにして手より高く上げましょう。",
"これはシュラッグとプルを組み合わせた動きで、カールのように肘を曲げて助けないようにしましょう。",
"バーが最高点に達するときつま先立ちになり、全身を使って引きましょう。",
"中程度の重量を使いましょう。この爆発的なプルは重い重量より速さが重要です。",
"動作中ずっとバーを体幹に近づけたまま。離れると腰に負担がかかります。"
],
"Dumbbell high pull": [
"膝を軽く緩めたアスレチックな姿勢で、ダンベルを太ももに構えましょう。",
"ダンベルを体に近づけて引き上げ、肘をリードにして手より高く上げましょう。",
"バーベル版と同じシュラッグ&プルの動きを、より自然な手の軌道のダンベルで行います。",
"股関節を伸ばし、つま先立ちになりながら引きましょう。",
"ダンベルは体幹に近づけたまま、外へ振り出さないようにしましょう。",
"中程度の重量で、最大挙上より速さに集中しましょう。"
],
"Cable shrug": [
"タワーに向かって立ち、ローププーリーのハンドルかバーを腕を伸ばして持ちましょう。",
"腕はまっすぐロックしたまま、肩を耳に向けてまっすぐすくめましょう。",
"ケーブルの一定した張力は、ダンベルやバーベルシュラッグとは違う感覚を生みます。",
"頂点で少し止めてから、コントロールして下ろしましょう。",
"肩を回さず、まっすぐ上へまっすぐ下へすくめましょう。",
"脚で手伝わず、膝を軽く緩めて体幹を固めましょう。"
],
"Plate-loaded shrug": [
"マシンのフレーム内に立ち、腕をまっすぐにしてサイドハンドルを握りましょう。",
"肩と一緒にマシンのロードされたアームが上がるよう、まっすぐすくめましょう。",
"軌道が固定されているので、フリーウェイトのバランスを気にせずシュラッグに集中できます。",
"頂点で少し止めてから、コントロールして下ろしましょう。",
"ダンベルより多くの人が安全に扱える重い重量をロードできます。",
"シュラッグ中、頭を前後に傾けず中立に保ちましょう。"
],
"Barbell walking lunge": [
"バックスクワットのようにバーを上背部に担ぎましょう。首ではなく。",
"コントロールしながら前に踏み出し、後ろ膝を床に触れない程度まで下げましょう。",
"前足のかかとで押して立ち上がり、そのまま次のランジへ踏み出しましょう。足をリセットしないように。",
"体幹は直立を保ちましょう。バーを担いだまま前傾するとバランスを崩す危険があります。",
"移動する種目なので、十分なスペースを確保しましょう。",
"バランスとコントロールに慣れるまでは、通常のランジより軽い重量から始めましょう。"
],
"Barbell step-up": [
"台の前に立つ前に、バーを上背部に担ぎましょう。",
"膝が90度をあまり超えない高さの台を選びましょう。",
"後ろ足で床を蹴るのではなく、踏み出す足のかかとで踏み込みましょう。",
"台の上で完全に立ち上がってから降りましょう。",
"体幹は高く保ちましょう。前傾して勢いをつけないように。",
"台から飛び降りず、コントロールして降りましょう。"
],
"Box squat": [
"ボックスに座ったとき太ももが平行かやや下になる高さに設定しましょう。",
"座り込んで実際にボックスに座り、ボトムで一瞬股関節をリラックスさせてから押し上げましょう。",
"ボックスに向かって座り込む間、すねはできるだけ垂直に保ちましょう。",
"ボックスでバウンドせず、一度止めてからコントロールして押し上げましょう。",
"股関節を後ろに引く動きを学び、完全停止からの筋力を鍛えられます。",
"静止中は伸張反射に頼れないので、体幹をしっかり固めましょう。"
],
"Dumbbell front squat": [
"ダンベルを肩に縦向きに構え、端を前部三角筋に乗せましょう。",
"バーベルフロントスクワットと同様、肘は上げて前を向けたままにしましょう。",
"バックスクワットより体幹を直立させたまましゃがみましょう。",
"しゃがみながら膝を前へ外へ、つま先の方向へ動かしましょう。",
"バーベルラックが空いていないときに、フロントスクワットのパターンを練習する良い方法です。",
"体幹をしっかり固めましょう。前方に集中した重量は緩んだ体幹を許しません。"
],
"Dumbbell reverse lunge": [
"前ではなく後ろに踏み出しましょう。フォワードランジより膝への負担が少なくなります。",
"後ろ膝を叩きつけずに床に近づけて下ろしましょう。",
"踏み出す間、体重の大部分を前足に残しましょう。",
"後ろ足ではなく前足で押して立ち上がりましょう。",
"体幹は直立を保ちましょう。前傾すると狙いたい部位から負荷が逃げます。",
"フォワードランジが膝に負担なら、これは良い代替になることが多いです。"
],
"Heel-elevated dumbbell squat": [
"始める前に、小さなウェッジかプレートを2枚ほどかかとの下に置きましょう。",
"この挙上により直立して膝を前に出しやすくなり、大腿四頭筋への刺激が強まります。",
"かかとの挙上でメカニクスが変わるため、スタンスは通常のスクワットより狭くしましょう。",
"足首の可動域が通常のスクワットでの深さを制限する人に良い選択肢です。",
"太ももが平行かそれ以下になるまでしゃがみ、体幹は直立を保ちましょう。",
"かかとが上がっていても、足全体で床を押して立ち上がりましょう。"
],
"Belt squat": [
"重量をアンラックする前に、ヒップベルトを装着してプラットフォームに直立しましょう。",
"重量が腰から吊るされるので背骨には負荷がかからず、バックスクワットが腰に負担な人に良い選択肢です。",
"手は自由にするか、サイドレールに軽く添えるだけにし、握って引っ張らないようにしましょう。",
"体幹を直立させたまましゃがみ、ベルトの重量が脚の間を通るようにしましょう。",
"足全体で押して立ち上がりましょう。",
"腰に不安があるときでも脚を鍛え続ける良い方法です。"
],
"Pendulum squat": [
"始める前に肩をパッドの下に置き、足は角度のついたプラットフォームに乗せましょう。",
"旋回するアームによって可動域を通じて負荷が変化し、しゃがむほど重くなります。",
"スクワット中、背中はパッドにつけたままにしましょう。",
"軌道が固定されているので、関節に優しい非常にコントロールされたスクワットが可能です。",
"マシンの抵抗カーブはゆっくり丁寧な下降フェーズに向いているので、コントロールして下ろしましょう。",
"アークを完成させるため、足全体で押して立ち上がりましょう。"
],
"Vertical leg press": [
"膝を胸に引き寄せ、頭上のプラットフォームに足を乗せて仰向けに寝ましょう。",
"膝が完全にロックする直前まで、プラットフォームをまっすぐ押し上げて脚を伸ばしましょう。",
"この角度は45度のレッグプレスより体重をより多く負荷にかけます。",
"腰をパッドに押し付けたままにしましょう。パッドから浮いて丸まらないように。",
"プラットフォームを胸に向かって落とさず、フルレンジでコントロールして戻しましょう。",
"垂直角度は重く感じるので、通常のレッグプレスより軽い重量から始めましょう。"
],
"Bodyweight squat": [
"しゃがみながら腕を前に伸ばして体重のバランスを取りましょう。",
"お尻を後ろへ下へ沈め、胸を上げてかかとを床につけたままにしましょう。",
"フォームを保てる範囲で、可動域の許す限り深くしゃがみましょう。",
"これはすべてのスクワットバリエーションの基礎動作です。重量を加える前にマスターしましょう。",
"足全体で床を押し返して立ち上がりましょう。",
"初心者専用ではなく、ウォームアップや高レップの仕上げとしても活用しましょう。"
],
"Jump squat": [
"腕を後ろに振りながらクォータースクワットに沈み込みましょう。",
"腕を前へ上へ振りながら、できるだけ強く上に跳びましょう。",
"膝を曲げて衝撃を吸収しながら柔らかく着地しましょう。",
"パワーを鍛えるなら、次のジャンプへ跳ね返さずレップごとにしっかりリセットしましょう。",
"これはパワーとコンディショニングの種目です。レップは適度に、質を高く保ちましょう。",
"可能であればある程度衝撃を吸収する床で行いましょう。コンクリートは関節に厳しいです。"
],
"Wall sit": [
"壁に背をつけたまま滑り降り、太ももが床とほぼ平行になるまで下げましょう。",
"膝はつま先より前に出さず、足首の真上に保ちましょう。",
"ホールド中、背中全体を壁に押し付けたままにしましょう。",
"息を止めず、ホールド中は普段通り呼吸しましょう。",
"これは静的なアイソメトリックホールドです。レップ数ではなく保持時間で管理しましょう。",
"自重でのホールドが楽になったら、膝の上に軽いダンベルを乗せましょう。"
],
"Barbell good morning": [
"スクワットのようにバーを上背部に担ぎ、直立しましょう。首ではなく。",
"膝は柔らかく固定したまま、股関節を折りたたむようにヒンジしましょう。",
"背中をフラットに保ちながら、体幹がほぼ床と平行になるまで下げましょう。",
"動作中ずっと背中をフラットに保ちましょう。バーを担いだ状態で背中が丸まるのは本当に怪我のリスクです。",
"とても軽い重量から始めましょう。この種目はエゴリフトに厳しく、腰とハムストリングに大きな負荷がかかります。",
"体幹が床と平行になったら、あるいはハムストリングが張っていればそれより早く下げるのを止めましょう。"
],
"Sumo deadlift": [
"つま先を外に向けた広いスタンスを取り、膝の内側でバーを握りましょう。",
"引く前に位置を決める際、膝をつま先の方向へ外に押し出しましょう。",
"このスタンスはコンベンショナルデッドリフトより直立気味になるため、大腿四頭筋と内転筋への負荷が増えます。",
"バーが床から離れる瞬間、股関節と肩を一緒に伸ばしましょう。",
"引く動作中ずっとバーを体に近づけたままにしましょう。",
"頂点では後ろに反らず、お尻を締めて仕上げましょう。"
],
"Stiff-leg deadlift": [
"動作中ずっと脚はほぼ完全に伸ばしたまま。ごくわずかな膝の曲げのみです。",
"股関節から前傾し、バーを脚に沿って近く下ろしましょう。",
"ハムストリングに強いストレッチを感じたら止めましょう。通常すね付近です。",
"背中はフラットに保ちましょう。このバリエーションは丸まると腰への負担が大きくなります。",
"膝がほとんど曲がらないため、ルーマニアンデッドリフトよりハムストリングを強く狙います。",
"通常のデッドリフトより軽い重量を使いましょう。まっすぐな脚は力学的に不利です。"
],
"Single-leg dumbbell RDL": [
"始める前に片足で直立し、ダンベルを両手に持ちましょう。",
"股関節から前傾しながら、支えていない脚をまっすぐ後ろに伸ばし、体幹と「T」の字を作りましょう。",
"動作中ずっと軸足の膝を軽く曲げたまま、ロックしないようにしましょう。",
"腰は床に対して正方形に保ちましょう。前傾するときに開かないように。",
"これは筋力種目であると同時にバランス種目でもあります。習得するまで多少ふらつくのは普通です。",
"ハムストリングの柔軟性とバランスが許す範囲までダンベルを下ろしましょう。"
],
"Dumbbell sumo deadlift": [
"単一のダンベルを両手で縦に脚の間で握りましょう。",
"スモウデッドリフトと同様、つま先を外に向けた広いスタンスを取りましょう。",
"立ち上がるときダンベルを体に近づけたままにしましょう。",
"足全体で押して立ち上がり、頂点でお尻を締めましょう。",
"背中はフラットに保ちましょう。ダンベルに届かせようと丸めないように。",
"バーベルのセットアップがないときに、スモウのパターンを練習する良い選択肢です。"
],
"Standing machine hamstring curl": [
"始める前にチェストパッドに寄りかかって支えましょう。",
"かかとをお尻に向かってカールし、股関節は動作中ずっと静止させましょう。",
"この立位は片脚ずつ厳密なフォームで鍛えられます。",
"頂点でしっかり収縮させてから、コントロールして下ろしましょう。",
"安定性のため軸足はロックせず柔らかく保ちましょう。",
"カールを助けるために腰を後ろへ動かさないように。それは勢いに頼っている証拠です。"
],
"Cable pull-through": [
"プーリーを低く設定し、タワーに背を向けて立ち、ロープを脚の間にまたぎましょう。",
"股関節から前傾し、ロープに引かれて手が脚の間を後ろへ動くようにしましょう。",
"動作中ずっと背中をフラットに、膝は柔らかく曲げたままにしましょう。これはスクワットではなくヒンジです。",
"力強く股関節を前へ突き出して立ち上がり、頂点でお尻を締めましょう。",
"ロープが振れる間、体に近づけたままにしましょう。",
"デッドリフトに重量を乗せる前に、ヒップヒンジのパターンを学ぶのに最適な種目です。"
],
"B-stance barbell hip thrust": [
"上背部をベンチにつけ、バーを腰に乗せて足を前後にずらしましょう。",
"体重の大部分は地面に平らについた足に乗せ、もう片方の足は軽いバランス役にとどめましょう。",
"働いている脚で股関節をフルエクステンションまで伸ばし、そのお尻を強く締めましょう。",
"これにより完全なシングルレッグにせずとも左右の筋力差に対処できます。",
"頂点で顎を軽く引き、首を反らしすぎないようにしましょう。",
"腰を落とさず、コントロールしてスタート位置に戻りましょう。"
],
"Barbell glute bridge": [
"床に仰向けに寝て、バーを腰に乗せ、膝を曲げましょう。",
"腰をまっすぐ上に突き上げ、頂点でお尻を強く締めましょう。",
"上背部と頭は動作中ずっと床につけたまま。これがヒップスラストとの違いです。",
"ヒップスラストより可動域が短いので、ベンチがないときに良い選択肢です。",
"顎を軽く引き、頂点で腰を反らしすぎないようにしましょう。",
"腰を床に落とさず、コントロールして下ろしましょう。"
],
"Curtsy lunge": [
"片足をカーテシーのように斜め後ろへ、もう片方の脚の後ろへ交差させて踏み出しましょう。",
"下ろす間、体重の大部分を前足に残しましょう。",
"この角度は通常のランジと違う形でお尻、特に中臀筋を刺激します。",
"動作中ずっと体幹を直立させ、腰は前を向けたままにしましょう。",
"前足のかかとで押して立ち上がりましょう。",
"まっすぐなランジより不自然な動きなので、最初はバランスに苦労するのが普通です。"
],
"Dumbbell single-leg hip thrust": [
"上背部をベンチにつけ、単一のダンベルを腰に乗せましょう。",
"片足を床に平らに置き、もう片方の脚はまっすぐ、無負荷で前に伸ばしましょう。",
"支えている足で股関節をフルエクステンションまで伸ばし、伸ばした脚はまっすぐ保ちましょう。",
"これは片方ずつお尻を鍛え、左右の筋力差を明らかにします。",
"腰は水平に保ちましょう。無負荷の脚側が下がったり回転したりしないように。",
"両脚版より軽い重量を使いましょう。片側ずつの作業になるためです。"
],
"45-degree hip extension machine": [
"腰をパッドの上端に置き、足首をローラーの下に固定しましょう。",
"ハムストリングにストレッチを感じるまで、背中をフラットに保ちながらヒンジしましょう。",
"肩から足首まで体が一直線になるまで起き上がりましょう。それ以上反らないように。",
"自重のみで行うなら腕を胸の前で組み、負荷を加えるならプレートを持ちましょう。",
"腰だけでなく、頂点でお尻を締めましょう。",
"膝に優しく、お尻とハムストリングを鍛えるのに優れた種目です。"
],
"Standing plate-loaded glute kickback": [
"マシンのフレームで体を支え、片足をロードされたプラットフォームに乗せましょう。",
"働いている脚をまっすぐ後ろ上へ動かし、頂点でお尻を強く締めましょう。",
"体幹は安定させ、わずかにしか前傾させず、蹴りを助けるために揺らさないようにしましょう。",
"腰は正方形に保ち、働いている側に開かないようにしましょう。",
"ウェイトスタックに落とされず、コントロールしてスタートに戻りましょう。",
"同じ動きのケーブルバージョンより重い重量をロードできます。"
],
"Single-leg glute bridge": [
"仰向けに寝て、片膝を曲げて足を平らにつけ、もう片方の脚をまっすぐ伸ばしましょう。",
"支えている足で腰を上げ、伸ばした脚はまっすぐ安定させたままにしましょう。",
"働いている脚のお尻を頂点で強く締めましょう。",
"腰は水平に保ちましょう。無負荷の脚側が下がらないように。",
"器具なしで片脚ずつお尻の筋力を鍛える優れた方法です。",
"腰を落とさず、コントロールして下ろしましょう。"
],
"Frog pump": [
"仰向けに寝て足の裏を合わせ、膝を大きく開きましょう。",
"膝を大きく開き、足の裏を合わせたまま腰を突き上げましょう。",
"この姿勢は外旋した股関節角度によりお尻を強烈に刺激します。",
"レップを急がず、頂点でしっかり締めてお尻を完全に収縮させましょう。",
"可動域が短いので、この種目は高めのレップ数でよく反応します。",
"頂点で腰が反りすぎないようにしましょう。"
],
"Donkey kicks": [
"背中をフラットに保ち、四つん這いのポジションから始めましょう。",
"膝を90度の固定角度で曲げたまま保ちましょう。",
"かかとで押し出すように、足を天井へ向かって蹴り上げましょう。",
"頂点でお尻を締め、腰を反らせて余分な高さを稼がないようにしましょう。",
"動作中ずっと腰は床に対して正方形に保ちましょう。開かないように。",
"これは低負荷の種目です。スピードよりマインドマッスルコネクションを意識しましょう。"
],
"Barbell standing calf raise": [
"台に乗る前にスクワットのようにバーを上背部に担ぎましょう。",
"台の端に足のつま先側を乗せ、かかとを後ろに垂らして立ちましょう。",
"上がる前にかかとを台より下げてフルストレッチを作りましょう。",
"できるだけ高くつま先立ちになり、頂点でふくらはぎを強く締めましょう。",
"動作中ずっと脚は比較的まっすぐに保ちましょう。これはスクワットではありません。",
"すぐに下がらず、各レップの頂点で少し止めましょう。"
],
"Single-leg dumbbell calf raise": [
"片手にダンベルを持ち、もう片方の手は壁やラックに軽く添えてバランスを取りましょう。",
"小さな台の上に片足で立ち、かかとを後ろの端から垂らしましょう。",
"上がる前にかかとを台より下げてフルストレッチを作りましょう。",
"できるだけ高くつま先立ちになり、頂点でふくらはぎを締めましょう。",
"片脚ずつ行うことで左右のふくらはぎの筋力差を明らかにし、改善できます。",
"セット中、使っていない脚を床から離したままにしましょう。"
],
"Dumbbell seated calf raise": [
"ベンチに座り、足を小さな台に乗せ、各膝の上にダンベルを縦に置いてバランスを取りましょう。",
"上がる前にかかとを台より下げてフルストレッチを作りましょう。",
"ダンベルを膝の上でバランスよく安定させたまま、つま先立ちになりましょう。",
"座った角度は、立位で鍛える大きなふくらはぎの筋肉よりヒラメ筋に負荷を移します。",
"手はダンベルが傾かないよう支えるために使い、持ち上げるために使わないようにしましょう。",
"各レップの頂点で少し止めて完全に収縮させましょう。"
],
"Donkey calf raise machine": [
"股関節から前傾し、マシンのロードされたパッドの下に腰を固定しましょう。",
"足のつま先側をプラットフォームに乗せ、かかとを端から垂らしましょう。",
"上がる前にかかとを下げてフルストレッチを作りましょう。",
"この前傾姿勢はストレッチを生み出すため、最も効果的なふくらはぎの角度の一つとされています。",
"脚は比較的まっすぐに保ち、足首に仕事をさせましょう。",
"サポートバーはバランスのために持ち、重量を持ち上げる助けにしないようにしましょう。"
],
"Standing bodyweight calf raise": [
"小さな段差の端に足のつま先側を乗せ、かかとを垂らして立ちましょう。",
"上がる前にかかとを段差より下げて深いストレッチを作りましょう。",
"できるだけ高くつま先立ちになり、頂点で少し止めましょう。",
"必要なら壁に軽く触れてバランスを取り、手で持ち上げを助けないようにしましょう。",
"器具が全く不要な、優れたウォームアップや高レップの仕上げ種目です。",
"自重のレップが簡単すぎると感じたら、すぐに重量を加えるのではなくテンポを落としましょう。"
],
"Single-leg bodyweight calf raise": [
"小さな段差の端に片足で立ち、かかとを後ろに垂らしましょう。",
"かかとを下げてフルストレッチを作り、それからできるだけ高くつま先立ちになりましょう。",
"使っていない足はセット中ずっと床から離したままにしましょう。",
"両脚版より片方のふくらはぎで全体重を支えるため、明らかに難しくなります。",
"壁を握って助けにするのではなく、バランスのために軽く触れましょう。",
"自重のレップが楽になったら、片手にダンベルを持ちましょう。"
],
"Side-lying dumbbell hip adduction": [
"横向きに寝て、上側の脚を曲げ、足を下側の脚の前に置きましょう。",
"軽いダンベルを下側の、まっすぐな脚の足首に乗せましょう。",
"下側の脚をまっすぐ上げ、曲げた上側の脚に向けて動かしましょう。それが働く動作です。",
"持ち上げる脚は膝を曲げず、まっすぐ保ちましょう。",
"これはほとんどのトレーニングプランで見落とされがちな内転筋を狙います。",
"内転筋は大腿四頭筋やハムストリングより小さな筋群なので、軽い重量を使いましょう。"
],
"Cable hip adduction": [
"タワーから遠い方の脚に足首カフを装着し、タワーに対して横向きに立ちましょう。",
"その脚を体の正中線を越えて外側に上げた位置からスタートしましょう。",
"脚を体の内側へ、軸足を越えて動かしましょう。",
"勢いで脚を振らず、マシンのフレームを持ってバランスを取りましょう。",
"脚を動かす手助けに体幹を傾けず、直立を保ちましょう。",
"左右の反復回数を揃えて切り替え、両脚をバランスよく鍛えましょう。"
],
"Sumo squat hold": [
"つま先を外に向けた広いスタンスを取ってからスクワットに沈み込みましょう。",
"太もも平行になるまで沈み込み、その位置をホールドしましょう。",
"ホールド中、膝はつま先の方向へ外側に向けたままにしましょう。",
"体幹は直立させ、前傾しないようにしましょう。",
"自重でのホールドが楽になったら、胸の前で単一のダンベルを持って負荷を加えましょう。",
"息を止めず、ホールド中は普段通り呼吸しましょう。"
],
"Cable hip abduction": [
"タワーに近い方の脚に足首カフを装着し、タワーに対して横向きに立ちましょう。",
"その脚を軸足の少し前で交差させた位置からスタートしましょう。",
"脚を体から離す方向へ、心地よい範囲まで外側に振りましょう。",
"体を傾けて助けるのではなく、マシンのフレームでバランスを取りましょう。",
"これは歩行やランニング時の股関節安定に重要な外側の股関節(外転筋)を狙います。",
"左右の反復回数を揃えて切り替え、両方の股関節をバランスよく鍛えましょう。"
],
"Side-lying leg raise": [
"脚をまっすぐ重ねて横向きに寝ましょう。",
"上側の脚をまっすぐ上げましょう。前に振り出すのではなく体と一直線に保ちながら。",
"腰を後ろに転がさないようにして、腰は重ねたまま保ちましょう。",
"脚を落とさず、コントロールして下ろしましょう。",
"器具なしで外側の股関節を鍛える優れた方法です。",
"自重のレップが楽になったら、足首にウェイトを追加しましょう。"
],
"Clamshells": [
"膝を曲げて重ね、足をくっつけた状態で横向きに寝ましょう。",
"上側の膝をヒンジのように開く間、足はくっつけたまま保ちましょう。",
"腰は重ねたまま静止させましょう。腰を後ろに転がして余分な可動域を偽るのが最もよくある間違いです。",
"これは見落とされがちな中臀筋を特に狙います。",
"自重のレップが楽になったら、太ももに軽い抵抗バンドを巻きましょう。",
"膝を勢いよく開かず、ゆっくりコントロールして動かしましょう。"
],
"Standing hip abduction": [
"壁か椅子に軽く手を添えて、直立して立ちましょう。",
"片脚をまっすぐ横に上げ、完全に伸ばしたままにしましょう。",
"体幹は動作中ずっと直立させましょう。上げた脚から離れるように傾いてズルしないように。",
"脚を落とさず、コントロールして下ろしましょう。",
"自重のレップが楽になったら、軽い足首バンドを追加しましょう。",
"器具なしでどこでも手軽に股関節の安定性を鍛えられます。"
],
"Dumbbell side bend": [
"単一のダンベルを片手に持ち、体の横に垂らしましょう。",
"ダンベル側へまっすぐ横に曲げましょう。ひねったり前傾したりせず、一つの平面内で動かします。",
"曲げたボトムで、反対側の体幹にストレッチを感じましょう。",
"これは働いている側の腹斜筋を狙います。",
"動作中ずっと体幹を固め、腰だけに仕事をさせないようにしましょう。",
"手を持ち替えて反復回数を揃え、両側を均等に鍛えましょう。"
],
"Weighted sit-up": [
"単一のダンベルかプレートを両手で胸に押し当てて持ちましょう。",
"ウェイトを胸にしっかり固定したまま。前に流れると腰への負担が増えます。",
"勢いではなく腹筋を使って、座った姿勢まで体幹を完全に起こしましょう。",
"足は床に平らにつけるか、安定したものの下に固定しましょう。",
"素早く戻らず、コントロールして下ろしましょう。",
"自重のシットアップが物足りなく感じたら重量を加えましょう。"
],
"Cable woodchopper": [
"プーリーを高く設定し、タワーに対して横向きに立ち、両手でハンドルを片方の肩の近くで握りましょう。",
"体幹を回転させ、ハンドルを対角線上に下へ体の反対側の腰へ引きましょう。",
"腰も体幹と一緒に回転させましょう。これは腕を引くだけでなく全身の回転運動です。",
"腕は比較的まっすぐに保ちましょう。力は腕の引きではなくコアの回転から生まれます。",
"ケーブルに引き戻されず、コントロールしてスタート位置に戻りましょう。",
"左右の反復回数を揃えて切り替え、両方向の回転をバランスよく鍛えましょう。"
],
"Captains chair leg raise": [
"前腕をパッド付きのアームレストに乗せ、背中をパッドに押し付けましょう。",
"脚を前方へ上げ、膝を胸に向けて曲げるか、まっすぐ保ってより難しくしましょう。",
"動作中ずっと体幹を静止させパッドに固定したまま。勢いで揺らさないように。",
"脚を落とさず、コントロールして下ろしましょう。",
"ハンギングレッグレイズが握力的にきつい場合に良い選択肢です。",
"各レップの頂点で骨盤を軽く丸め、より深い腹筋の収縮を得ましょう。"
],
"Hollow body hold": [
"仰向けに寝てから、肩と脚を同時に床から持ち上げましょう。",
"腕を頭上に、脚をまっすぐ伸ばし、緩やかなカーブの形を作りましょう。",
"ホールド中ずっと腰を床に押し付けたままにしましょう。それが主なチェックポイントです。",
"脚を床に近づけると難しくなり、膝を曲げると易しくなります。",
"息を止めず、ホールド中は普段通り呼吸しましょう。",
"これは体操の基本的な体幹ポジションです。レップ数ではなくホールド時間を記録しましょう。"
],
"V-ups": [
"腕を頭上に伸ばし、脚をまっすぐにして仰向けに寝ましょう。",
"体幹と脚を同時に折りたたむように起こし、手をつま先に向けて伸ばしましょう。",
"折りたたむ間ずっと腕と脚を比較的まっすぐに保ちましょう。",
"動作の頂点で床につくのはお尻だけにしましょう。",
"素早く落とさず、コントロールして下ろしましょう。",
"最初にまっすぐな脚でのVアップが難しければ、膝を少し曲げて易しくしましょう。"
]
};
const EX_TIPS_KO={
"Ab wheel rollout": [
"롤아웃을 시작하기 전에 골반을 살짝 말아 넣고 엉덩이에 힘을 줘 주세요.",
"허리가 꺾이지 않는 범위까지만 몸을 밀어 나가세요.",
"몸을 당겨오는 건 복근이고, 팔은 그저 휠을 조종하는 역할만 합니다.",
"팔은 곧게 편 상태를 유지하세요. 팔꿈치가 굽으면 삼두 운동이 되어버립니다.",
"몸을 당겨올 때 숨을 내쉬고, 밀어나가기 전에는 코어에 힘을 줘 주세요.",
"이동 거리는 점진적으로 늘려가세요. 완전히 펴지는 풀 롤아웃은 상급자 동작입니다."
],
"Arnold press": [
"덤벨을 어깨 앞쪽에 위치시키고 손바닥이 자신을 향하게 한 채 앉은 자세로 시작하세요.",
"덤벨을 머리 위로 밀어 올리면서 손바닥을 바깥쪽으로 회전시키세요.",
"허리가 과도하게 꺾이지 않도록 등을 벤치에 밀착시키세요.",
"덤벨을 시작 위치로 내리면서 회전 동작을 부드럽게 반대로 되돌리세요.",
"밀어 올리며 회전할 때 숨을 내쉬고, 내리며 되돌릴 때 숨을 들이마시세요.",
"회전 동작을 서두르지 말고 전체 범위에 걸쳐 천천히 이루어지게 하세요.",
"손목이 회전할 때 상체까지 함께 틀어지지 않도록 코어에 힘을 유지하세요.",
"동작 최상단에서 덤벨이 머리 뒤쪽으로 넘어가지 않게 하세요.",
"회전 동작이 난이도를 높이는 만큼 일반 프레스보다 가벼운 중량을 사용하세요.",
"팔꿈치가 옆으로 크게 벌어지지 않고 몸 앞쪽을 향하도록 유지하세요.",
"회전 궤적을 따라가며 삼각근 세 갈래 모두가 함께 작용하는 느낌에 집중하세요.",
"덤벨이 그냥 떨어지듯 내려오게 하지 말고 통제된 속도로 내리세요."
],
"Back extension": [
"몸이 수평이 되는 지점에서 멈추세요. 일직선을 넘어 과도하게 젖히면 이득 없이 허리 디스크에 압박만 가해집니다.",
"내려가는 동작을 조절하세요. 상체를 빠르게 떨어뜨리면 가동범위를 낭비할 뿐 아니라 허리에 무리를 줄 수 있습니다.",
"최고점에서 엉덩이에 힘을 줘 골반을 안정시키세요. 이렇게 하면 부하가 허리에서 엉덩이로 일부 옮겨가 척추 부담이 줄어듭니다.",
"동작 내내 척추 중립을 유지하세요. 내려갈 때 등 윗부분이 말리지 않도록 합니다.",
"시작하기 전 발을 발목 패드 아래에 단단히 고정하세요. 동작 도중 발이 미끄러지면 낙상 위험이 있습니다."
],
"Barbell back squat": [
"바벨은 목뼈가 아니라 승모근 위에 걸치세요.",
"바벨을 랙에서 빼기 전에 코어에 힘을 주고 숨을 깊게 들이마시세요.",
"내려가는 내내 가슴을 펴고 척추 중립을 유지하세요.",
"허벅지가 최소 바닥과 평행이 될 때까지 엉덩이를 뒤로 그리고 아래로 앉으세요.",
"무릎이 안쪽으로 모이지 않고 발끝 방향을 향하도록 유지하세요.",
"일어날 때는 발끝이 아니라 발 전체로 바닥을 밀어내세요.",
"스쿼트 최하단에서 허리가 말리지 않도록 주의하세요.",
"가벼운 웜업 세트로 바벨 위치와 앉는 깊이를 먼저 점검하세요.",
"최하단이 아니라 동작에서 가장 힘든 구간을 지날 때 강하게 숨을 내쉬세요.",
"동작 내내 바벨 궤적이 발 중앙 위로 수직이 되도록 유지하세요.",
"내려갈 때 뒤꿈치가 바닥에서 뜨지 않게 하세요.",
"고중량에 도전할 때는 세이프티 바나 보조자를 활용하세요."
],
"Barbell curl": [
"컬 동작 내내 팔꿈치를 몸통 옆에 고정하세요.",
"바벨을 들어 올리려고 골반을 흔들거나 몸을 뒤로 젖히지 마세요.",
"다음 반복 전에 팔이 완전히 펴질 때까지 바벨을 끝까지 내리세요.",
"바로 다음 반복으로 튕기듯 넘어가지 말고 최고점에서 이두근을 강하게 수축시키세요.",
"바벨을 들어 올릴 때 숨을 내쉬고, 내릴 때 들이마시세요.",
"손목을 팔뚝 쪽으로 말아 올리지 말고 곧게 편 상태를 유지하세요.",
"손목과 팔꿈치에 무리가 가지 않는 편안한 그립 너비를 사용하세요.",
"중량이 힘들어져도 팔꿈치가 앞으로 빠지지 않게 하세요.",
"어깨가 앞으로 말리지 않도록 뒤로 펴고 가슴을 들어 올리세요.",
"무릎을 완전히 펴서 잠그지 말고 살짝 여유를 두고 서세요.",
"바벨이 빠르게 떨어지게 두지 말고 내리는 구간을 통제하세요.",
"턱을 앞으로 내밀며 컬하지 말고 고개는 중립을 유지하세요."
],
"Barbell deadlift": [
"매 반복마다 바벨은 바닥에서 시작합니다. 튕기지 말고 다시 세팅하세요.",
"바벨이 정강이와 허벅지를 스치듯 올라오게 하세요. 몸에서 멀어지면 힘이 낭비됩니다.",
"엉덩이와 어깨가 함께 올라와야 합니다. 엉덩이가 먼저 튀어 오른다면 중량이 너무 무거운 것입니다.",
"몸을 뒤로 젖히지 말고 엉덩이에 힘을 줘서 마무리하세요.",
"당기기 전, 마치 배를 맞을 것처럼 코어에 힘을 단단히 주세요.",
"팔은 단지 고리 역할입니다. 바벨을 들어 올리려고 팔꿈치를 굽히지 마세요."
],
"Barbell front squat": [
"세트 내내 팔꿈치를 높이 들고 앞을 향하게 하세요. 팔꿈치가 처지면 바벨이 앞으로 굴러 떨어집니다.",
"바벨은 손목이 아니라 어깨 앞쪽(전면삼각근)에 걸치세요. 손가락은 그저 위치만 잡아주는 역할입니다.",
"백 스쿼트보다 더 곧은 자세를 유지하세요. 가슴을 높이 들고 상체를 수직으로 유지한다고 생각하세요.",
"내려갈 때 무릎을 앞으로, 그리고 발끝 방향으로 밀어내세요.",
"매 반복 전에 코어에 강하게 힘을 주세요. 프론트 랙 자세는 힘이 풀린 상체를 가만두지 않습니다.",
"손목 가동성이 부족하다면 팔을 교차해서 잡는 그립을 시도하되, 팔꿈치는 계속 높이 유지하세요."
],
"Barbell hip thrust": [
"벤치 아래로 들어갔을 때 어깨뼈가 벤치 중간 높이에 오도록 위치를 맞추세요.",
"발을 골반 너비로 놓고 발끝을 살짝 바깥으로 향하게 하며, 무릎이 발끝 방향을 향하도록 하세요.",
"뒤꿈치로 바닥을 밀어내고 엉덩이에 힘을 줘서 골반이 평행이 될 때까지 들어 올리세요.",
"최고점에서 한 박자 멈춰 수축을 유지한 뒤 내리세요.",
"최고점에서 허리가 과도하게 꺾이지 않도록 턱을 당기세요.",
"골반을 신전할 때 갈비뼈가 들뜨지 않도록 동작 내내 코어에 힘을 유지하세요."
],
"Barbell overhead press": [
"어깨너비보다 살짝 넓게 바벨을 잡고, 손목이 팔꿈치 바로 위에 오도록 하세요.",
"바벨을 어깨 앞쪽에 걸친 상태로 시작하고, 팔꿈치는 바벨보다 살짝 앞에 위치시키세요.",
"허리가 꺾이지 않도록 코어에 힘을 주고 엉덩이를 조이세요.",
"바벨을 똑바로 밀어 올리면서 고개를 살짝 뒤로 빼 바벨이 지나갈 공간을 만드세요.",
"동작을 마무리할 때는 바벨이 머리 위에 있고 이두근이 귀 옆에 오도록 하세요.",
"바벨을 머리 위로 밀어 올릴 때 강하게 숨을 내쉬세요.",
"중량을 밀어 올리려고 몸을 과도하게 뒤로 젖히지 말고 상체를 곧게 유지하세요.",
"바벨이 자유낙하하듯 떨어지게 두지 말고 통제된 속도로 어깨까지 내리세요.",
"중량을 올리기 전에 가벼운 웜업 세트로 바벨 궤적을 먼저 익히세요.",
"동작 내내 안정적인 지지를 위해 발을 어깨너비로 벌려 단단히 고정하세요.",
"동작 하단에서 팔꿈치가 너무 넓게 벌어지지 않게 하세요. 어깨 관절에 부담을 줍니다.",
"바벨을 곡선으로 앞으로 밀지 말고 최대한 수직에 가까운 궤적을 유지하세요."
],
"Barbell push press": [
"얕게 딥하세요. 쿼터 스쿼트 정도로, 상체는 완벽히 수직을 유지합니다.",
"다리로 강하게 밀어 올려 바벨이 어깨에서 튕겨 나가듯 하세요.",
"바벨이 얼굴을 지나가면 고개를 '창문 통과하듯' 앞으로 밀어 넣으세요.",
"마무리 자세에서는 바벨이 발 중앙 위에 오도록 하고 갈비뼈는 내려 고정하세요.",
"딥은 똑바로 아래로만 내려가야 하며 절대 앞으로 기울지 않아야 합니다. 앞으로 딥하면 바벨이 앞으로 튀어나갑니다.",
"이것은 다리 힘으로 하는 프레스입니다. 스트릭트 프레스보다 무거운 중량을 다루는 것이 핵심입니다."
],
"Barbell row": [
"중량을 올리기 전에 탄탄한 웜업 세트로 힙 힌지 동작을 먼저 익히세요.",
"등을 평평하게 유지한 채 힙 힌지로 상체를 바닥과 약 45도 각도가 되도록 숙이세요.",
"어깨너비보다 살짝 넓게 바벨을 잡고, 하단에서는 팔에 힘을 빼세요.",
"허리를 보호하기 위해 매번 당기기 전 코어에 강하게 힘을 주세요.",
"바벨을 가슴이 아니라 갈비뼈 아랫부분이나 윗배 쪽으로 당기세요.",
"로우 동작 최고점에서 팔꿈치를 뒤로 밀고 어깨뼈를 조이세요.",
"허리의 반동으로 바벨을 홱 당기지 말고 등 근육의 힘으로 당기세요.",
"목은 중립을 유지하고, 위를 쳐다보기보다 살짝 아래를 보세요.",
"바벨이 자유롭게 떨어지게 두지 말고 통제된 속도로 내리세요.",
"특히 세트 후반 피로가 쌓일 때 등 윗부분이 말리지 않도록 주의하세요.",
"바벨을 몸통 쪽으로 당길 때 강하게 숨을 내쉬세요.",
"안정적인 지지를 위해 무릎을 살짝 굽히고 무게중심을 발 중앙에 두세요."
],
"Barbell shrug": [
"골반 바로 바깥쪽에서 안정적이고 균등한 그립으로 바벨을 잡으세요.",
"동작을 시작하기 전 가슴을 펴고 어깨를 뒤로 당긴 채 곧게 서세요.",
"팔꿈치는 곧게 편 채 어깨를 귀 쪽으로 똑바로 으쓱 올리세요.",
"어깨를 원을 그리듯 돌리지 말고 엄격하게 위아래 궤적만 유지하세요.",
"슈러그 최고점에서 잠시 멈추고 승모근을 완전히 수축시키세요.",
"바벨을 빠르게 떨어뜨리지 말고 통제된 속도로 내리세요.",
"승모근이 지치기 전에 그립이 먼저 풀린다면 초크나 스트랩을 사용하세요.",
"동작 내내 바벨을 몸에 가깝게 유지하세요.",
"무릎이나 골반을 튕겨 바벨을 들어 올리지 마세요.",
"으쓱 올릴 때 숨을 내쉬고, 시작 자세로 돌아올 때 들이마시세요.",
"목은 중립을 유지하고 동작을 돕기 위해 고개를 기울이지 마세요.",
"감당할 수 없는 무거운 중량으로 슈러그하려고 허리를 과도하게 젖히지 마세요."
],
"Barbell skull crusher": [
"어깨너비보다 살짝 좁게 바벨을 잡고 팔꿈치가 천장을 향해 똑바로 서게 하세요.",
"팔 윗부분은 수직으로 완전히 고정하고, 팔뚝만 움직이세요.",
"바벨을 이마 쪽이나 머리 살짝 뒤쪽까지 내려 완전한 스트레칭을 느끼세요.",
"팔을 벌리거나 흔들지 말고 오직 팔꿈치 신전으로만 밀어 올리세요.",
"천천히 통제하며 내리세요. 바벨이 얼굴 가까이 있어 반동은 위험합니다.",
"실패 지점 가까이 갈 때는 안전을 위해 보조자를 두거나 살짝 가벼운 중량을 사용하세요."
],
"Barbell upright row": [
"어깨너비로 그립을 잡으세요. 너무 좁은 그립은 손목에 무리를 줍니다.",
"팔꿈치가 동작을 주도하게 하세요. 팔꿈치는 동작 내내 손목보다 위에 있어야 합니다.",
"가슴 윗부분 높이에서 멈추세요. 턱까지 당기면 어깨에 무리가 갑니다.",
"바벨이 옷을 스칠 정도로 몸에 가깝게 유지하세요.",
"몸을 뒤로 젖히거나 골반을 튕기지 마세요. 이 동작은 엄격하고 부드럽게 하는 것이 관건입니다.",
"어깨에 통증이 느껴진다면 그립을 넓히거나 최고점 높이를 낮추세요."
],
"Bench dumbbell chest press": [
"안정적인 지지력을 위해 발을 바닥에 단단히 붙이세요.",
"어깨뼈를 뒤로 모아 동작 내내 벤치에 고정하세요.",
"팔 윗부분이 벤치와 같은 높이가 될 때까지만 덤벨을 내리세요. 그 이하로는 내리지 마세요.",
"덤벨을 위로, 살짝 안쪽으로 밀어 올리되 서로 닿지 않게 하세요.",
"매 반복마다 손목을 곧게 펴고 팔꿈치 바로 위에 오도록 유지하세요.",
"밀어 올릴 때 숨을 내쉬고, 덤벨을 내릴 때 들이마시세요.",
"팔꿈치가 옆으로 완전히 벌어지지 않게 하세요.",
"최고점에서 팔을 그냥 펴고 쉬지 말고 가슴에 힘을 줘 조이세요.",
"덤벨이 빠르게 떨어지게 두지 말고 내리는 동작을 통제하세요.",
"허리에 과장되지 않은, 자연스러운 정도의 아치를 유지하세요.",
"덤벨을 흔들어 올리지 말고 통제된 동작으로 위치시키세요.",
"덤벨은 안쪽으로 굴러갈 수 있으므로 실패 지점 근처에서는 보조자를 두거나 가벼운 중량을 사용하세요."
],
"Bent-over dumbbell reverse fly": [
"상체가 바닥과 거의 평행이 될 때까지 힙 힌지로 앞으로 숙이세요.",
"팔꿈치에 가벼운 굽힘을 유지하고 매 반복 동안 그 각도를 유지하세요.",
"팔꿈치가 동작을 이끌게 하며 덤벨을 곡선을 그리듯 옆으로 들어 올리세요.",
"덤벨을 너무 높이 당기지 말고 어깨 높이 정도에서 멈추세요.",
"최고점에서 어깨뼈를 모아 조인 뒤 통제된 속도로 내리세요.",
"허리의 반동을 이용해 덤벨을 홱 들어 올리지 마세요.",
"덤벨을 보려고 목을 앞으로 빼지 말고 중립을 유지하세요.",
"후면삼각근을 제대로 고립시키려면 생각보다 가벼운 덤벨을 사용하세요.",
"덤벨을 들어 올릴 때 숨을 내쉬고, 내릴 때 들이마시세요.",
"중량이 무거워지거나 피로해져도 상체가 일어서지 않게 하세요.",
"중량을 흔들기 위해 손목을 굽히지 말고 비교적 곧게 유지하세요.",
"단순히 팔을 드는 것이 아니라 후면삼각근을 모아 조이는 데 집중하세요."
],
"Bicycle crunch": [
"손가락 끝을 관자놀이에 살짝 대세요. 목을 잡아당기지 마세요.",
"팔꿈치만이 아니라 갈비뼈를 회전시키세요. 어깨가 바닥에서 떨어져 무릎 쪽으로 향해야 합니다.",
"펴진 다리는 바닥에 닿지 않고 낮게 떠 있어야 합니다.",
"빠르게 허우적대는 것보다 천천히 페달링하는 것이 낫습니다. 한쪽당 2초씩.",
"동작 내내 허리를 매트에 밀착시키세요.",
"각 팔꿈치가 반대쪽 무릎을 향해 갈 때 숨을 내쉬세요."
],
"Bulgarian split squat": [
"뒷발의 발등을 벤치 위에 올려놓으세요.",
"체중의 대부분을 뒷다리가 아니라 앞발 뒤꿈치에 실으세요.",
"앞다리 허벅지가 바닥과 거의 평행이 될 때까지 곧장 아래로 내려가세요.",
"상체는 곧게 세우되 골반에서부터 살짝 앞으로 기울이세요.",
"앞무릎이 발끝을 지나치게 넘어가지 않게 하세요.",
"내려갈 때 숨을 들이마시고, 다시 밀어 올라올 때 내쉬세요.",
"동작을 돕기 위해 뒷발로 밀지 마세요.",
"반동을 위해 흔들지 말고 덤벨을 몸 옆에 고정하세요.",
"앞다리 엉덩이와 대퇴사두근이 일하는 느낌에 집중하세요.",
"정강이가 수직을 유지할 수 있을 만큼 앞발을 충분히 앞쪽에 놓으세요.",
"동작 도중 골반이 회전하거나 옆으로 기울지 않게 하세요.",
"안정성이 향상될 때까지는 벽이나 벤치를 잡고 균형을 잡으세요."
],
"Cable bicep curl": [
"동작 내내 케이블 장력이 유지되도록 머신에서 충분히 떨어져 서세요.",
"컬 동작 중 팔꿈치가 앞으로 빠지지 않고 몸 옆에 고정되게 하세요.",
"어깨나 등이 아니라 팔뚝만 사용해 바를 들어 올리세요.",
"팔이 거의 완전히 펴질 때까지 통제된 속도로 바를 내리세요.",
"그저 최고점에 도달하는 것이 아니라 이두근에 힘을 줘 조이세요.",
"중량이 무겁게 느껴져도 반동을 쓰려고 몸을 뒤로 젖히지 마세요.",
"들어 올릴 때 숨을 내쉬고, 케이블이 팔을 당겨 내릴 때 들이마시세요.",
"컬을 돕기 위해 손목을 굽히지 말고 중립을 유지하세요.",
"무릎을 완전히 펴서 잠그기보다 살짝 앞으로 기운 자세로 서세요.",
"반복 사이에 케이블이 팔을 너무 빠르게 잡아당기지 않게 하세요.",
"세트 내내 어깨를 뒤로 당기고 가슴을 편 상태를 유지하세요.",
"짧고 부분적인 컬 대신 전체 가동범위를 사용하세요."
],
"Cable chest fly": [
"정면으로 곧게 향하는 플라이 궤적을 위해 양쪽 도르래를 대략 가슴 높이로 설정하세요.",
"안정성을 위해 한쪽 발을 앞으로 내민 스탠스로 서고 살짝 앞으로 기울이세요.",
"동작 내내 팔꿈치에 부드럽고 고정된 굽힘을 유지하세요.",
"손잡이를 얼굴 근처가 아니라 가슴 앞에서 모으세요.",
"중앙 지점에서 가슴에 힘을 줘 조인 뒤 잠시 멈췄다가 풀어주세요.",
"손잡이를 모을 때 숨을 내쉬고, 다시 벌릴 때 들이마시세요.",
"중량이 팔을 과도하게 늘어난 위치로 홱 잡아당기지 않게 하세요.",
"어깨가 앞으로 말리지 않도록 어깨뼈를 뒤로 모은 상태를 유지하세요.",
"반복 시작 시 가슴에 장력을 유지하기 위해 살짝 앞으로 내딛으세요.",
"등이나 상체의 반동을 이용해 손잡이를 홱 모으지 마세요.",
"케이블이 팔을 빠르게 뒤로 튕기게 두지 말고 내리는 동작을 통제하세요.",
"팔꿈치를 높이 들지 말고 어깨보다 살짝 낮게 유지하세요."
],
"Cable crunch": [
"무릎을 꿇었을 때 케이블이 반복 동작 내내 팽팽하게 유지되도록 풀리에서 충분히 떨어지세요.",
"로프는 손으로 꽉 쥐지 말고 관자놀이나 귀 옆에 걸치듯 잡으세요.",
"엉덩이는 고정한 채 고관절을 힌지처럼 접어서 척추로 크런치 동작을 만드세요.",
"팔로 잡아당기지 말고 복근을 수축시켜 척추를 아래로 둥글게 마세요.",
"무릎 쪽으로 크런치할 때 강하게 숨을 내쉬세요.",
"엉덩이를 뒤꿈치 쪽으로 앉히지 말고 제자리에 고정하세요.",
"어깨로 로프를 홱 잡아당겨 무게를 억지로 내리지 마세요.",
"케이블이 튕기듯 몸을 다시 끌어올리게 두지 말고 천천히 시작 자세로 돌아오세요.",
"정점에서 완전히 힘을 빼지 말고 복근에 약간의 긴장을 유지하세요.",
"갈비뼈를 골반 쪽으로 말아 넣는다는 느낌으로 더 깊은 수축을 만드세요.",
"팔이 아니라 복근에서 크런치가 느껴지는 무게를 선택하세요.",
"목은 편안하게 유지하고 손으로 머리를 잡아당기지 마세요."
],
"Cable face pull": [
"케이블을 상체 가슴~머리 높이에 맞추고 가벼운 무게로 워밍업 세트부터 시작하세요.",
"엄지손가락이 뒤를 향하도록 로프를 잡고 가슴이 아닌 얼굴 쪽으로 당기세요.",
"팔꿈치를 높고 넓게 벌려 어깨 높이와 같거나 그보다 높게 마무리하세요.",
"당기는 동작 끝에서 손을 외회전시켜 손가락 마디가 뒤를 향하게 하세요.",
"매 반복의 정점에서 후면 삼각근과 등 상부를 강하게 조이세요.",
"상체를 곧게 세우고 무게를 억지로 당기려고 뒤로 젖히지 마세요.",
"팔꿈치가 낮고 앞으로 처지게 만드는 무거운 무게는 피하세요.",
"케이블이 팔을 앞으로 튕겨내게 두지 말고 시작 자세로 돌아올 때 제어하세요.",
"로프를 벌리며 당길 때 숨을 내쉬고, 다시 뻗을 때 숨을 들이쉬세요.",
"동작 내내 가슴을 들어 올리고 견갑골은 아래로 당긴 상태를 유지하세요.",
"승모근을 으쓱이지 말고 후면 삼각근과 회전근이 동작을 주도하게 하세요.",
"완전히 수축된 지점에서 잠깐 멈춰 후면 삼각근 자극을 극대화하세요."
],
"Cable glute kickback": [
"상체를 살짝 앞으로 숙이고 타워를 잡아 오직 다리만 움직이게 하세요.",
"일직선으로 뒤로 위로 차올리며 정점에서 둔근을 강하게 조이세요.",
"엉덩이는 정면을 향하게 고정하고 작업하는 쪽으로 열리지 않게 하세요.",
"허리를 젖혀서 억지로 높이를 더 만들려고 하지 마세요.",
"무릎은 거의 편 상태를 유지하세요. 구부리면 레그컬 동작이 되어버립니다.",
"천천히 되돌리면 가벼운 중량도 무겁게 느껴지니 복귀 동작을 제어하세요."
],
"Cable lateral raise": [
"케이블 머신 옆으로 서서 풀리가 몸을 가로질러 팔을 당기도록 하세요.",
"풀리를 바닥 가까이에 맞춰 케이블의 당기는 각도가 낮은 지점에서 시작되게 하세요.",
"팔이 바닥과 거의 평행이 될 때까지 옆으로 들어 올리세요.",
"팔꿈치는 완전히 편 상태가 아니라 살짝 굽힌 상태를 동작 내내 유지하세요.",
"손이나 손목으로 당기지 말고 팔꿈치가 동작을 주도하게 하세요.",
"무게가 팔을 확 끌어내리게 두지 말고 케이블을 제어하며 내리세요.",
"핸들을 들어 올리려고 상체를 비틀지 말고 어깨만 고립시키세요.",
"반복 동작 하단에서도 케이블 긴장을 유지하고 쉬지 마세요.",
"팔을 들어 올릴 때 숨을 내쉬고 내릴 때 들이쉬세요.",
"양쪽 어깨가 동일하게 지속적인 긴장의 이점을 얻도록 좌우를 균등하게 바꿔가며 하세요.",
"핸들을 들어 올릴 때 어깨를 귀 쪽으로 으쓱이지 마세요.",
"케이블이 일직선이 아니라 각도를 유지하도록 머신에서 충분히 떨어져 서세요."
],
"Cable rope hammer curl": [
"컬 동작 내내 로프를 잡은 손바닥이 서로 마주 보도록 유지하세요.",
"팔꿈치가 앞으로 흔들리지 않도록 옆구리에 고정하세요.",
"어깨가 아니라 전완으로만 로프를 위로 컬링하세요.",
"팔이 거의 완전히 펴질 때까지 로프를 제어하며 내리세요.",
"매 반복의 정점에서 전완과 이두근을 조이세요.",
"무게가 무겁게 느껴져도 몸을 뒤로 젖혀 반동을 쓰지 마세요.",
"컬 올릴 때 숨을 내쉬고, 케이블이 팔을 내리게 할 때 들이쉬세요.",
"컬 도중 손목을 회전시키지 말고 중립 상태를 유지하세요.",
"무릎을 완전히 잠그지 말고 안정적으로 살짝 벌린 스탠스로 서세요.",
"케이블이 반복 사이에 팔을 너무 빠르게 끌어내리지 않게 하세요.",
"동작 내내 어깨는 뒤로, 가슴은 들어 올린 상태를 유지하세요.",
"짧고 부분적으로 당기지 말고 전체 가동 범위를 사용하세요."
],
"Cable rope tricep extension": [
"하단에서 로프 양 끝을 벌려 각 삼두근 헤드를 완전히 수축시키세요.",
"동작 내내 위팔을 갈비뼈에 붙인 상태로 유지하세요.",
"팔꿈치가 펴질 때까지 뻗은 뒤 조여주고 나서 동작을 되돌리세요.",
"로프를 아래로 밀 때 팔꿈치가 바깥으로 벌어지지 않게 하세요.",
"무게가 팔을 끌어당기게 두지 말고 로프를 천천히 제어하며 위로 올리세요.",
"밀 때 숨을 내쉬고, 전완이 다시 올라올 때 들이쉬세요.",
"완전히 꼿꼿하게 서지 말고 상체를 살짝 앞으로 기울이세요.",
"아래로 밀 때 어깨를 귀 쪽으로 으쓱이지 마세요.",
"하단에서 손목을 살짝 바깥으로 회전시켜 외측두를 더 강조하세요.",
"무릎을 잠그지 말고 안정을 위해 발을 앞뒤로 벌려 서세요.",
"밀 때 허리가 젖혀지지 않도록 코어를 단단히 조이세요.",
"로프가 허벅지를 세게 치지 않도록 허벅지 바로 위에서 멈추세요."
],
"Cable tricep kickback": [
"위팔은 세트 내내 바닥과 평행을 유지해야 합니다. 처지면 기계적 이점을 잃고 삼두근이 거의 일하지 않습니다.",
"상체를 세워 무게를 도와주려 하지 마세요. 이 동작은 순수한 팔꿈치 힌지 운동입니다.",
"정점에서 팔을 완전히 뻗으세요. 부분적으로만 뻗으면 최고 수축 효과가 줄어듭니다.",
"위팔이 고정된 상태를 유지할 수 있을 만큼 가벼운 무게를 사용하세요. 이 운동은 무리한 중량 때문에 자세가 가장 쉽게 망가지는 종목 중 하나입니다.",
"세트 내내 힌지 자세에서 코어를 조여 허리를 보호하세요."
],
"Chest dips": [
"상체를 약 30도 앞으로 기울이세요. 몸을 세운 채로 하면 삼두근 위주로 자극됩니다.",
"무릎을 굽히고 발목을 교차해 자연스러운 기울기를 유지하세요.",
"어깨가 팔꿈치 높이 근처까지 내려가되, 통증 없는 범위에서 깊게 내려가세요.",
"삼두근 버전과 달리 팔꿈치를 살짝 바깥으로 벌리세요.",
"가슴을 조이며 밀어 올리고, 거칠게 완전히 잠그지 마세요.",
"어깨에 무리가 느껴지면 기울기를 줄이기 전에 깊이부터 줄이세요."
],
"Chest-supported machine row": [
"가슴 패드 높이를 조정해 목이 아닌 흉골 부위에 단단히 닿도록 하세요.",
"세트 내내 가슴을 패드에 밀착시켜 상체가 움직이지 않게 하세요.",
"단순히 팔만 굽히지 말고 팔꿈치를 몸통 뒤로 밀어 핸들을 당기세요.",
"매 반복의 뒤쪽 정점에서 견갑골을 완전히 모아 조이세요.",
"앞쪽에서 팔을 완전히 펴서 광배근이 충분히 늘어나게 하세요.",
"핸들을 홱 잡아채지 말고 부드럽고 제어된 동작을 유지하세요.",
"핸들을 당길 때 숨을 내쉬고 되돌릴 때 들이쉬세요.",
"손목은 중립을 유지하고 당기는 걸 돕기 위해 구부리지 마세요.",
"스트레치 자세로 팔을 뻗을 때 어깨가 앞으로 말리지 않게 하세요.",
"단순히 핸들을 움직이는 것보다 등 중앙을 조이는 데 집중하세요.",
"다리나 발로 패드에서 몸을 밀어내지 마세요.",
"목은 편안하게 유지하고 시선은 위로 무리하게 향하지 말고 정면을 보세요."
],
"Chin-ups": [
"킵핑하거나 엉덩이를 흔들어 바를 넘으려 하지 말고, 끝까지 엄격한 당기는 힘만 사용하세요.",
"매 반복을 견갑골을 아래로 내리는 동작으로 시작하세요. 수동적으로 으쓱인 어깨에서 시작하면 어깨 관절에 불필요한 부담이 갑니다.",
"팔꿈치를 곧게 뒤로 빼지 말고 아래와 골반 쪽으로 내리세요. 그래야 이두근뿐 아니라 광배근이 계속 관여합니다.",
"매 반복마다 팔을 완전히 펴는 지점까지 내려오세요. 부분 반복은 가동 범위를 줄이고 광배근 발달을 제한합니다.",
"턱을 앞으로 내밀어 바를 넘은 것처럼 속이지 마세요. 턱이 실제로 바 위로 완전히 올라와야 합니다.",
"등보다 전완이 먼저 지치면, 손이 아니라 견갑골에서부터 당기는 동작을 시작하는 데 집중하세요."
],
"Close-grip bench press": [
"바를 어깨너비보다 살짝 좁게 잡아 삼두근을 타깃하세요.",
"바를 내릴 때 팔꿈치를 몸통에 바짝 붙이세요.",
"바를 가슴 상부로 벌리지 말고 가슴 하부로 내리세요.",
"너무 좁게 잡으면 손목과 팔꿈치에 무리가 갈 수 있으니 피하세요.",
"바를 내릴 때 숨을 들이쉬고, 밀어 올릴 때 강하게 내쉬세요.",
"견갑골을 뒤로 모아 벤치에 고정하세요.",
"반동을 얻으려고 바를 가슴에 튕기지 마세요.",
"발을 바닥에 평평하게 붙여 프레스에 안정성을 더하세요.",
"바를 랙 위치로 일직선으로 밀어 올리세요.",
"최대 중량에 가깝게 밀 때는 보조자나 안전 바를 사용하세요.",
"손목을 뒤로 꺾지 말고 팔꿈치 바로 위에 일직선으로 두세요.",
"완전히 뻗은 지점에서 바를 세게 쥐고 삼두근에 힘을 주세요."
],
"Concentration curl": [
"팔꿈치 뒤쪽을 허벅지 안쪽에 고정하고 계속 붙어 있게 하세요.",
"어깨 쪽으로 컬링하며 정점에서 새끼손가락을 살짝 위로 회전시키세요.",
"오직 전완만 움직여야 하며, 상체 반동이나 어깨 들림은 절대 없어야 합니다.",
"정점에서 1초간 강하게 조이세요.",
"매 반복마다 팔이 완전히 펴질 때까지 내리세요.",
"이건 엄격한 고립 운동입니다. 가벼운 무게로 완벽한 반복을 하세요."
],
"Dead hang": [
"바를 어깨너비보다 살짝 넓게, 손바닥이 몸 반대쪽을 향하게 잡으세요.",
"몸을 완전히 늘어뜨려 척추가 자연스럽게 이완되고 길어지도록 두세요.",
"안정적으로 호흡하고 어깨가 귀 위로 올라가는 걸 억지로 막지 마세요.",
"발은 바닥에서 떼고, 흔들거나 반동을 이용해 매달리지 마세요.",
"매달리는 시간을 점진적으로 늘리세요. 세션마다 10초씩 추가하는 식으로요.",
"이 동작으로 악력과 어깨 가동성을 향상시킬 수 있습니다. 고중량 세트 사이에 넣기 좋습니다."
],
"Decline dumbbell press": [
"디클라인 자세로 눕기 전에 다리를 풋패드 아래에 단단히 고정하세요.",
"세트 내내 머리와 어깨를 벤치에 단단히 붙이세요.",
"덤벨을 쇄골이 아니라 가슴 하부 양옆으로 내리세요.",
"덤벨끼리 닿기 직전까지 위와 살짝 안쪽으로 밀어 올리세요.",
"손목은 중립을 유지하고 팔꿈치 바로 위에 일직선으로 두세요.",
"밀어 올릴 때 숨을 내쉬고, 제어하며 내릴 때 들이쉬세요.",
"정점에서 덤벨이 얼굴 쪽으로 흘러가지 않게 하세요.",
"디클라인 자세에서는 머리로 피가 쏠리니 플랫 프레스보다 가벼운 무게를 사용하세요.",
"앉아서 시작하기 번거로우니 보조자에게 덤벨을 건네받으세요.",
"팔꿈치가 몸통에서 45~75도를 넘어 벌어지지 않게 하세요.",
"경사진 벤치에서 상체가 미끄러지지 않도록 코어를 단단히 조이세요.",
"거꾸로 된 자세로 인한 어지러움을 피하려면 끝난 후 천천히 일어나세요."
],
"Decline sit-ups": [
"디클라인 벤치에 눕기 전에 패드 아래에 발을 단단히 걸어 고정하세요.",
"팔은 가슴 위에 교차하거나 머리 뒤에 두되, 목을 잡아당기지 마세요.",
"목에 무리가 가지 않도록 턱을 가슴 쪽으로 살짝 말아 넣으세요.",
"일어날 때 숨을 내쉬고 내려갈 때 들이쉬세요.",
"벤치 하단으로 빠르게 떨어지지 말고 제어하며 내려가세요.",
"위로 올라가는 반동을 얻으려고 머리와 목을 홱 당기지 마세요.",
"고관절 굴곡근이 동작을 넘겨받기 전에 먼저 복근을 사용하세요.",
"하단에서 척추를 완전히 이완시키지 말고 코어에 약간의 긴장을 유지하세요.",
"코어 근력이 뒷받침될 때까지는 완만한 디클라인 각도로 시작하세요.",
"정점에서 허리가 자연스러운 곡선을 넘어 과도하게 말리지 않게 하세요.",
"바로 다시 내려가지 말고 정점에서 복근을 조이세요.",
"반복 하단에서 허리를 벤치에 세게 젖히지 마세요."
],
"Diamond push-ups": [
"검지와 엄지를 맞대어 흉골 바로 아래에 다이아몬드 모양을 만드세요.",
"팔꿈치가 바깥으로 벌어지지 않고 몸 옆에 붙어 뒤로 향하게 하세요.",
"코어와 둔근을 조여 머리부터 발뒤꿈치까지 단단한 플랭크 라인을 유지하세요.",
"엉덩이가 바닥 쪽으로 처지지 않게 하면서 가슴을 다이아몬드 쪽으로 내리세요.",
"다이아몬드를 밀어내며 매 반복의 정점에서 팔을 완전히 펴세요.",
"너무 힘들면 손을 벤치 위에 올리고, 너무 쉬우면 발을 높이세요."
],
"Dumbbell Romanian deadlift": [
"덤벨을 허벅지 앞에서 중립 그립(손바닥이 몸을 향하게)으로 잡으세요.",
"무릎을 단순히 굽히지 말고 엉덩이를 뒤로 밀어 고관절을 힌지처럼 접으세요.",
"덤벨을 다리를 따라 정강이에 최대한 가깝게 내리세요.",
"허리가 말리기 전, 햄스트링이 한계에 도달했을 때 멈추세요.",
"둔근을 조이고 엉덩이를 앞으로 밀어 일어서세요.",
"동작 내내 무릎을 살짝 부드럽게 구부린 상태를 유지하세요. 이건 스쿼트가 아니라 힙 힌지입니다."
],
"Dumbbell bicep curl": [
"무게를 추가하기 전에 가벼운 워밍업 세트로 팔꿈치를 준비시키세요.",
"팔꿈치를 앞으로 흘리지 말고 옆구리에 고정하세요.",
"상체나 골반을 흔들어 반동을 만들지 말고 덤벨을 컬링하세요.",
"팔이 완전히 펴질 때까지 무게를 끝까지 내리세요.",
"컬 올릴 때 숨을 내쉬고, 덤벨을 내릴 때 들이쉬세요.",
"그냥 들었다 내리지 말고 정점에서 이두근을 강하게 조이세요.",
"무게가 무거워질수록 어깨가 앞으로 말리지 않게 하세요.",
"무게를 빠르게 떨어뜨리지 말고 2~3초에 걸쳐 하강을 제어하세요.",
"정점에서 손목을 안쪽으로 말지 말고 곧게 유지하세요.",
"팔을 번갈아 하든 동시에 하든 팔꿈치는 항상 고정하세요.",
"다리를 완전히 잠그지 말고 살짝 구부린 채 서세요.",
"반복 하단에서 팔꿈치를 과신전시키지 마세요."
],
"Dumbbell fly": [
"플라이는 어깨 관절에 다른 방식으로 부하를 주니 프레스보다 가벼운 덤벨을 사용하세요.",
"동작 내내 팔꿈치를 살짝 고정된 각도로 굽힌 상태를 유지하세요.",
"가슴에 깊은 스트레치가 느껴질 때까지 덤벨을 양옆으로 내리세요.",
"위팔이 벤치와 거의 나란해지면 하강을 멈추세요.",
"일직선 프레스 경로가 아니라 호를 그리며 덤벨을 다시 올리세요.",
"마치 통을 껴안듯 정점에서 가슴을 모아 조이세요.",
"팔꿈치를 곧게 펴지 마세요. 관절에 부담이 옮겨갑니다.",
"스트레치 자세로 벌릴 때 숨을 들이쉬고, 모을 때 내쉬세요.",
"견갑골을 뒤로 모아 스트레치가 어깨가 아니라 가슴에 실리게 하세요.",
"하단 스트레치 지점에서 제어력을 잃을 정도로 무겁게 하지 마세요.",
"반동으로 덤벨을 날려 올리지 말고 천천히 의도적으로 움직이세요.",
"어깨 앞쪽에서 찌르는 느낌이나 날카로운 통증이 있으면 즉시 멈추세요."
],
"Dumbbell front raise": [
"들어 올리기 전 척추를 중립으로 세우고 코어를 조이세요.",
"덤벨을 몸 앞으로 곧게 들어 올려 어깨 높이 정도까지 올리세요.",
"전체 가동 범위 내내 팔꿈치를 살짝 구부린 상태로 유지하세요.",
"한 팔씩 들든 동시에 들든 항상 제어된 상태를 유지하세요.",
"반동을 이용하거나 몸을 뒤로 젖혀 무게를 흔들어 올리지 마세요.",
"중력에 맡겨 떨어뜨리지 말고 덤벨을 천천히 내리세요.",
"손목은 중립을 유지하고 무게를 들어 올릴 때 구부리지 마세요.",
"어깨 높이를 넘어 올리지 마세요. 추가적인 삼각근 효과 없이 부담만 늘어납니다.",
"올라갈 때 숨을 내쉬고 내려갈 때 들이쉬세요.",
"승모근이 아니라 어깨 앞쪽이 드는 느낌에 집중하세요.",
"어깨에 편한 대로 손바닥이 아래를 향하게 하거나 중립 그립을 사용하세요.",
"프론트 레이즈는 기계적 레버리지가 적으니 더 가벼운 무게를 선택하세요."
],
"Dumbbell hip thrust": [
"벤치에 윗등을 기대고 무릎을 굽힌 채 발바닥 전체를 바닥에 붙이세요.",
"덤벨을 골반 위에 올리고 양손으로 단단히 고정하세요.",
"발뒤꿈치로 바닥을 밀며 엉덩이를 조여 골반을 수평 높이까지 들어 올리세요.",
"맨 위에서 한 박자 멈춰 수축을 느낀 뒤 천천히 내려오세요.",
"턱을 당겨 시선이 천장이 아닌 정면을 향하게 하세요.",
"허리를 과도하게 젖히지 말고, 몸통이 일직선이 되는 지점에서 멈추세요."
],
"Dumbbell lateral raise": [
"무릎을 살짝 굽히고 상체를 약간 앞으로 기울인 채 곧게 서세요.",
"덤벨을 양옆으로 들어 올려 팔이 바닥과 거의 평행이 되게 하세요.",
"손이 아닌 팔꿈치가 먼저 올라가도록 해 측면 삼각근에 긴장을 유지하세요.",
"팔꿈치를 살짝 굽힌 상태를 계속 유지하고, 완전히 펴서 잠그지 마세요.",
"골반이나 상체의 반동을 이용해 무게를 튕겨 올리지 마세요.",
"덤벨을 툭 떨어뜨리지 말고 천천히 통제하며 내리세요.",
"들어 올릴 때 어깨를 으쓱하지 말고 귀에서 멀리 떨어뜨려 두세요.",
"어깨 높이에서 멈추세요. 그 이상 올리면 승모근으로 자극이 옮겨갑니다.",
"덤벨을 들어 올릴 때 숨을 내쉬고, 내릴 때 들이마시세요.",
"매 반복에서 자세가 흐트러지지 않을 만큼 가벼운 무게를 선택하세요.",
"주전자에서 물을 따르듯 새끼손가락이 엄지보다 살짝 높게 향하도록 하세요.",
"승모근으로 으쓱거리며 무게를 올리지 말고, 어깨 움직임만 고립시키세요."
],
"Dumbbell lunge": [
"매 걸음마다 상체를 곧게 세우고 코어에 힘을 유지하세요.",
"앞쪽 정강이가 거의 수직을 유지할 만큼 충분히 크게 내디디세요.",
"뒷무릎이 바닥에 쿵 닿지 않고 살짝 스칠 정도까지만 내려가세요.",
"앞무릎이 안쪽으로 쏠리지 않고 발 방향을 그대로 따라가게 하세요.",
"내려갈 때 숨을 들이마시고, 다시 올라올 때 내쉬세요.",
"내려가는 동안 앞발 뒤꿈치가 바닥에서 뜨지 않게 하세요.",
"발끝이 아닌 앞발 뒤꿈치로 밀어 올라오세요.",
"덤벨을 흔들지 말고 몸통 옆에 붙여 유지하세요.",
"런지 동작 중 등이 앞으로 구부러지지 않게 하세요.",
"앞다리의 대퇴사두근과 둔근이 일하는 느낌에 집중하세요.",
"걸으며 진행할 경우 균형을 잃지 않도록 보폭을 짧고 통제된 상태로 유지하세요.",
"발밑을 내려다보지 말고 고개와 가슴을 들어 정면을 보세요."
],
"Dumbbell pullover": [
"윗등과 머리만 벤치에 대고 엉덩이는 아래로 낮춘 채 눕습니다.",
"덤벨 하나를 양손으로 잡고, 손바닥으로 안쪽 원판을 눌러 고정하세요.",
"동작 내내 팔꿈치를 살짝 굽힌 상태로 고정하세요.",
"광배근과 가슴에 깊은 스트레칭이 느껴질 때까지 덤벨을 머리 뒤로 내리세요.",
"어깨가 조이거나 무리가 가기 시작하는 지점 이상으로는 내리지 마세요.",
"머리 뒤로 내릴 때 숨을 들이마시고, 다시 끌어올릴 때 내쉬세요.",
"코어에 힘을 주어 허리가 벤치에서 뜨지 않게 하세요.",
"스트레칭에 초점을 둔 동작이므로 예상보다 가벼운 무게를 사용하세요.",
"수직으로 곧장 들어 올리지 말고 호를 그리듯 끌어오세요.",
"스트레칭 자세로 뻗을 때 갈비뼈가 위로 들리지 않게 하세요.",
"천천히 움직이고, 반동으로 덤벨을 시작 위치까지 홱 당기지 마세요.",
"어깨 관절에 통증이 느껴지면 무리하지 말고 세트를 중단하세요."
],
"Dumbbell reverse wrist curl": [
"손바닥이 아래를 향하게 하여 팔뚝을 허벅지나 벤치 위에 올려놓으세요.",
"시작 자세에서 충분히 스트레칭되도록 덤벨이 손끝 쪽으로 살짝 굴러가게 두세요.",
"손목을 천천히 위로 말아 올리며 팔뚝 윗면의 신전근을 수축시키세요.",
"무게를 그냥 떨어뜨리지 말고 매 반복마다 통제하며 시작 자세로 내리세요.",
"가벼운 무게를 사용하세요. 팔뚝 신전근은 쉽게 지치고 부상에 취약합니다.",
"팔뚝을 받침대에 평평하게 붙이고 동작 중 팔꿈치가 들리지 않게 하세요."
],
"Dumbbell shrug": [
"양손에 덤벨을 하나씩 들고 팔을 편 채 몸통 옆에 두고 곧게 섭니다.",
"팔꿈치를 굽히지 않고 어깨를 귀 쪽으로 곧장 들어 올리세요.",
"어깨를 앞뒤로 굴리지 말고 수직 방향으로만 움직이세요.",
"맨 위에서 잠시 멈춰 승모근을 조인 뒤 내리세요.",
"덤벨을 툭 떨어뜨리지 말고 천천히 내리세요.",
"목에 힘을 빼고, 동작을 돕기 위해 목을 앞으로 빼지 마세요.",
"승모근보다 손아귀 힘이 먼저 지치면 스트랩을 사용하거나 그립을 단단히 잡으세요.",
"다리나 골반으로 반동을 줘서 무게를 튕겨 올리지 마세요.",
"어깨를 으쓱 올릴 때 숨을 내쉬고, 내릴 때 들이마시세요.",
"팔은 곧게 펴고 이두근이 아닌 승모근이 모든 일을 하게 하세요.",
"무거운 세트에서 흔들리지 않도록 어깨너비로 안정적으로 섭니다.",
"자세가 무너져 동작이 흔들릴 정도로 무게를 과하게 올리지 마세요."
],
"Dumbbell skull crusher": [
"먼저 가벼운 웜업 세트로 안전하고 편안한 팔꿈치 궤적을 찾으세요.",
"세트 내내 위팔을 수직으로 고정하고 완전히 움직이지 않게 하세요.",
"덤벨을 가슴이 아닌 이마나 머리 바로 뒤쪽으로 내리세요.",
"팔꿈치만 굽히고, 반복 동작 중 어깨는 움직이지 않게 하세요.",
"무게를 내릴 때 숨을 들이마시고, 팔을 펼 때 힘차게 내쉬세요.",
"덤벨이 내려갈 때 팔꿈치가 바깥으로 벌어지지 않게 하세요.",
"팔꿈치 관절을 보호하기 위해 천천히 통제하며 내리세요.",
"덤벨이 갑자기 기울지 않도록 손목을 단단히 고정하고 꽉 잡으세요.",
"팔꿈치 관절에 조임이나 무리가 느껴지면 내리는 동작을 멈추세요.",
"팔꿈치를 세게 펴서 잠그지 말고 맨 위에서 삼두근을 완전히 조이세요.",
"벤치 위에서 몸을 안정시키기 위해 발을 바닥에 붙이고 코어에 힘을 주세요.",
"이 운동은 팔꿈치에 부담이 크므로 예상보다 가벼운 무게를 선택하세요."
],
"Dumbbell step-up": [
"발끝만이 아니라 발 전체를 박스 위에 올리세요.",
"위에 올린 다리의 뒤꿈치로 밀어 올리세요. 바닥에 남은 다리는 균형만 잡는 역할입니다.",
"내려오기 전에 맨 위에서 완전히 일어서세요.",
"박스에서 툭 내려오지 말고 내려가는 동작을 통제하세요.",
"상체를 곧게 세우고 박스 위로 몸을 앞으로 던지듯 숙이지 마세요.",
"한쪽 다리로 모든 반복을 마친 뒤 바꾸거나, 일정하게 좌우 번갈아 진행하세요."
],
"Dumbbell sumo squat": [
"무릎이 항상 발끝 방향을 따라가게 하세요. 발끝을 넓게 벌린 자세이므로, 무릎이 안으로 모이지 않도록 적극적으로 바깥쪽으로 밀어야 합니다.",
"가슴을 세우고 상체를 최대한 곧게 유지하세요. 앞으로 숙이면 대퇴사두근과 허벅지 안쪽으로 가는 자극이 줄어듭니다.",
"바닥에서 반동을 주지 말고, 내려가는 동작을 통제하며 근육의 힘으로 방향을 바꾸세요.",
"덤벨은 다리 사이에서 자유롭게 매달려야 합니다. 몸에 붙이면 동작 패턴이 바뀌니 주의하세요.",
"균형과 힘을 유지하려면 발볼만이 아니라 발 전체로 밀어야 합니다."
],
"Dumbbell wrist curl": [
"손바닥이 위를 향하게 하여 팔뚝을 허벅지나 벤치 위에 올려놓으세요.",
"매 반복마다 충분한 가동 범위를 위해 덤벨이 손끝 쪽으로 굴러 내려가게 두세요.",
"팔뚝 굴곡근을 수축시켜 손목을 위로 말아 올리세요.",
"맨 위에서 강하게 조인 뒤 완전히 스트레칭된 자세로 천천히 내리세요.",
"가벼운 무게로 높은 반복수를 사용하세요. 이 운동은 작은 근육을 위한 고립 운동입니다.",
"팔꿈치와 팔뚝은 받침대에 고정하고 손목만 움직이세요."
],
"EZ bar curl": [
"각진 구간을 잡으세요. 이 살짝 기울어진 손목 각도가 바로 EZ바를 쓰는 이유입니다.",
"팔꿈치를 갈비뼈에 고정하고 팔뚝만 움직이세요.",
"가슴 윗부분 높이까지만 컬하세요. 그 이상 올리면 팔꿈치가 앞으로 말릴 뿐입니다.",
"천천히 세면서 통제하며 내리고, 바를 그냥 떨어뜨리지 마세요.",
"곧게 서세요. 뒤로 기대면 컬이 프론트 레이즈가 되어버립니다.",
"손목을 곧게 펴고 맨 위에서 손목을 꺾지 마세요."
],
"EZ bar front raise": [
"팔을 거의 완전히 편 상태를 유지하세요. 팔꿈치를 굽혀 바를 돕게 들면 프론트 레이즈가 아닌 부분 컬이 되어버립니다.",
"반동을 쓰지 마세요. 바를 들기 위해 상체를 흔들어야 한다면 무게를 줄이세요.",
"어깨 높이에서 멈추세요. 평행 이상으로 올리면 전면 삼각근이 아닌 승모근으로 자극이 옮겨갑니다.",
"바를 천천히 통제하며 내리세요. 내리는 구간도 올리는 구간만큼 전면 삼각근 발달에 중요합니다.",
"동작 내내 손목을 중립으로 유지하세요. EZ바의 각진 그립은 스트레이트 바보다 손목 부담을 줄여줍니다."
],
"Farmers carry": [
"곧게 걸으세요. 갈비뼈는 골반 위에 정렬하고 어깨는 뒤로 젖혀 아래로 내립니다.",
"손잡이를 으스러뜨리듯 꽉 잡으세요. 그립이 가장 먼저 지치는 게 바로 이 운동의 핵심입니다.",
"짧고 빠르며 통제된 보폭으로 걸으세요. 좌우로 뒤뚱거리지 마세요.",
"덤벨을 완전히 수평으로 유지하고, 한쪽이 처지지 않게 하세요.",
"바닥이 아닌 정면을 보세요.",
"시간이든 거리든 상관없이, 무게만큼은 정직하게 무겁게 하세요."
],
"Flat barbell bench press": [
"안정적인 바 궤적을 위해 그립을 어깨너비보다 살짝 넓게 잡으세요.",
"바를 랙에서 빼기 전에 견갑골을 뒤로 모으고 아래로 내리세요.",
"발을 바닥에 평평하게 붙이고 동작 내내 아래로 밀어주세요.",
"바를 목이나 배가 아닌 가슴 중앙으로 내리세요.",
"손목을 뒤로 꺾지 말고 팔꿈치 위에 곧게 정렬하세요.",
"매 반복마다 바를 내리기 전에 숨을 들이마시고 코어에 힘을 주세요.",
"가슴에서 바를 밀어 올릴 때 숨을 내쉬세요.",
"반동을 더하려고 바를 가슴에서 튕기지 마세요.",
"팔꿈치를 90도로 벌리지 말고 45~75도 정도로 몸통에 붙이세요.",
"무게를 더 올리기 전에 웜업 세트로 바 궤적을 확실히 익히세요.",
"고중량이나 최대 세트를 시도할 때는 항상 보조자나 세이프티 바를 사용하세요.",
"프레스를 돕기 위해 엉덩이를 들어 올리지 말고 벤치에 붙여 두세요."
],
"Glute bridge": [
"무릎을 굽히고 발은 골반 너비로 벌려 바닥에 붙인 채 바로 눕습니다.",
"몸통 옆에 둔 팔을 바닥으로 눌러 동작을 안정시키세요.",
"발뒤꿈치로 밀며 엉덩이를 조여 골반을 바닥에서 들어 올리세요.",
"맨 위 자세에서 한두 박자 멈추고 엉덩이를 최대한 강하게 조이세요.",
"다음 반복 전에 골반이 바닥에 완전히 닿지 않고 바로 위까지만 내려오게 하세요.",
"무릎이 발 바로 위를 향하도록 살짝 바깥쪽으로 밀어주세요."
],
"Goblet squat": [
"덤벨을 가슴 중앙에 바짝 붙이고 팔꿈치는 아래를 향하게 하세요.",
"맨 아래에서 팔꿈치가 무릎 안쪽에 살짝 닿게 하세요. 그것이 깊이의 기준입니다.",
"뒤꿈치를 바닥에 붙인 채, 바닥을 밀어내듯 일어서세요.",
"힙 힌지처럼 뒤로 앉지 말고 골반 사이로 주저앉듯 내려가세요.",
"가슴을 당당히 펴서 무게에 앞으로 끌려가지 않게 하세요.",
"스쿼트를 처음 배우기에 완벽한 동작입니다. 바벨을 들기 전에 이 동작부터 완전히 익히세요."
],
"Hack squat": [
"어깨를 패드 아래에 딱 맞게 놓고 등을 받침대에 평평하게 붙이세요.",
"발판 위에 어깨너비로 발을 놓아 발 중앙이 하중 경로 아래에 오게 하세요.",
"뒤꿈치가 들리지 않는 선에서 허벅지가 평행을 살짝 넘을 때까지 내려가세요.",
"발 전체로 밀되, 발끝보다 뒤꿈치에 더 힘을 실으세요.",
"내려갈 때 숨을 들이마시고 코어에 힘을 준 뒤, 밀어 올릴 때 내쉬세요.",
"무릎이 안쪽으로 모이지 않고 발끝 방향을 따라가게 하세요.",
"매 반복의 맨 위에서 무릎을 세게 펴서 잠그지 마세요.",
"원판을 추가하기 전에 가벼운 웜업 세트로 깊이감을 익히세요.",
"맨 아래에서 허리가 패드에서 떨어져 구부러지지 않게 하세요.",
"전체 가동 범위 동안 대퇴사두근이 늘어나고 수축하는 느낌에 집중하세요.",
"빠르게 떨어뜨리지 말고 2~3초에 걸쳐 통제하며 내려가세요.",
"준비가 완료될 때까지 안전 걸쇠를 걸어둔 상태를 유지하세요."
],
"Hack squat calf raise": [
"동작 내내 다리를 완전히 편 상태로 유지하세요. 무릎을 굽히면 비복근에서 가자미근으로 자극이 옮겨가 훈련 효과가 줄어듭니다.",
"가동 범위를 최대한 활용하세요. 아래에서는 뒤꿈치를 발판 가장자리보다 최대한 낮게, 위에서는 최대한 높게 올립니다.",
"양쪽 끝에서 잠시 멈춰 반동을 없애고 종아리 근육이 실제로 힘을 내도록 하세요.",
"머신에서 내려오기 전에 안전 손잡이를 거세요. 하중이 실린 슬레드를 고정하지 않은 채 두지 마세요.",
"발판 가장자리에 발볼만 올려두세요. 뒤꿈치가 발판에 닿아 있으면 종아리를 완전히 스트레칭할 수 없습니다."
],
"Hammer curls": [
"컬 동작 내내 손바닥이 서로 마주 보게 유지하세요.",
"팔꿈치가 바깥으로 흔들리지 않게 몸통 옆에 고정하세요.",
"덤벨을 홱 들어 올리지 말고 통제된 템포로 컬하세요.",
"팔뚝과 이두근에 스트레칭이 느껴지도록 덤벨을 완전히 내리세요.",
"동작 중 손목을 일반 컬 그립 방향으로 돌리지 마세요.",
"매 반복의 맨 위에서 팔뚝과 상완근을 조이세요.",
"들어 올릴 때 숨을 내쉬고, 통제하며 내릴 때 들이마시세요.",
"컬을 돕기 위해 뒤로 기대지 말고 상체를 곧게 유지하세요.",
"양팔을 따로 또는 함께 움직이되, 어깨가 한쪽만 으쓱거리지 않게 하세요.",
"반동으로 무게가 자연스러운 가동 범위를 넘어가지 않게 하세요.",
"어깨가 앞으로 말리지 않고 뒤로 당겨 아래로 내린 상태를 유지하세요.",
"팔꿈치를 세게 펴서 완전히 잠그기 직전에 내리는 동작을 멈추세요."
],
"Hanging leg raise": [
"팔뚝을 패드에 단단히 밀착시키고 등을 서포트에 평평하게 붙이세요.",
"들어올리기 전에 코어에 힘을 줘서 허리가 패드에서 뜨지 않게 하세요.",
"골반을 말아 올리듯 무릎이나 다리를 들어 올리세요, 단순히 엉덩이를 흔들지 마세요.",
"다리를 들어 올릴 때 숨을 내쉬고, 천천히 내릴 때 들이쉬세요.",
"다리가 중력에 의해 툭 떨어지게 두지 말고 천천히 내리세요.",
"반동을 이용하거나 다리를 흔들어서 들어 올리지 마세요.",
"허리가 패드에서 떨어지기 전에 내리는 동작을 멈추세요.",
"어깨를 아래로 눌러 유지하고 귀 쪽으로 으쓱 올라가지 않게 하세요.",
"무릎을 가슴 쪽으로 끌어올려 하복부를 더 직접적으로 자극하세요.",
"단순히 높이만 신경 쓰지 말고 맨 위에서 복근을 강하게 조이세요.",
"손잡이는 편안하게 잡아서 팔이 아닌 복근이 일하게 하세요.",
"자세가 안정적으로 유지될 때만 다리를 펴서 더 어려운 변형으로 진행하세요."
],
"Incline barbell chest press": [
"벤치를 30~45도 사이로 맞춰서 어깨가 아닌 상부 가슴을 자극하세요.",
"발을 바닥에 평평하게 붙이고 아래로 힘을 줘서 안정적인 기반을 만드세요.",
"바를 랙에서 빼기 전에 견갑골을 뒤로, 아래로 모아 벤치에 밀착시키세요.",
"쇄골 바로 아래, 상부 가슴까지 바를 내리세요.",
"갈비뼈가 들리지 않는 선에서 허리는 살짝 아치를 유지하세요.",
"내릴 때 숨을 들이쉬고, 밀어 올릴 때 강하게 내쉬세요.",
"가슴에서 바를 튕겨서 반동을 만들지 마세요.",
"프레스하는 내내 손목이 팔꿈치 바로 위에 오도록 유지하세요.",
"인클라인 프레스는 실패 시 빠져나오기 어려우니 보조자나 세이프티 핀을 사용하세요.",
"그냥 위로만 미는 게 아니라 얼굴 쪽으로 살짝 미는 느낌으로 밀어 올리세요.",
"무거운 중량을 올리기 전에 워밍업 세트로 바 궤적을 몸에 익히세요.",
"팔꿈치가 몸통 기준 45~75도 각도를 넘어 벌어지지 않게 하세요."
],
"Incline bench dumbbell press": [
"상부 가슴을 자극하도록 벤치를 30~45도 정도의 완만한 각도로 세팅하세요.",
"발로 바닥을 단단히 딛고 견갑골은 뒤로 고정하세요.",
"덤벨을 목이 아닌 상부 가슴 옆쪽으로 내리세요.",
"매 반복의 최상단에서 덤벨을 위로, 살짝 모아지듯 밀어 올리세요.",
"운동 내내 손목은 중립을 유지하고 팔꿈치 바로 위에 오게 하세요.",
"덤벨을 밀어 올릴 때 숨을 내쉬고, 내릴 때 들이쉬세요.",
"허리를 과도하게 아치 시키면 플랫 벤치프레스처럼 되니 주의하세요.",
"무릎으로 덤벨을 차올리듯 하지 말고, 시작 자세까지 제어하며 들어 올리세요.",
"반복 최하단에서 팔꿈치가 어깨 높이보다 아래로 떨어지지 않게 하세요.",
"무거운 덤벨을 들기 전에 워밍업 세트로 동작 궤도를 익히세요.",
"세트 내내 머리와 윗등을 벤치에 붙이고 있으세요.",
"밀어 올릴 때 덤벨이 얼굴 쪽으로 앞으로 쏠리지 않게 하세요."
],
"Incline bench dumbbell rear delt fly": [
"벤치를 30~45도로 세팅하고 가슴을 패드에 대고 엎드리세요.",
"뉴트럴 그립으로 덤벨을 어깨 아래로 곧게 늘어뜨리세요.",
"팔을 넓은 호를 그리듯 옆으로 들어 올려 어깨 높이와 같아지게 하세요.",
"후면삼각근을 조이는 데 집중하고, 승모근을 으쓱해서 무게를 드는 걸 돕지 마세요.",
"긴장을 계속 유지하도록 덤벨을 천천히 제어하며 내리세요.",
"팔꿈치 관절 부담을 줄이기 위해 팔꿈치를 살짝 굽힌 상태를 계속 유지하세요."
],
"Incline dumbbell curl": [
"팔을 곧게, 몸보다 살짝 뒤쪽으로 늘어뜨리세요 — 그 스트레칭이 핵심입니다.",
"컬 동작 중 팔꿈치가 바닥을 향하게 유지하고, 앞으로 흔들지 마세요.",
"세트 내내 머리와 어깨를 패드에 붙이고 있으세요.",
"스탠딩 컬보다 가벼운 중량으로 시작하세요 — 스트레칭 자세는 봐주는 게 없습니다.",
"양팔을 부드럽고 제어된 동작으로 함께 컬 하세요.",
"매 반복 최하단에서 완전히 스트레칭하세요, 반쪽짜리 반복은 안 됩니다."
],
"Lat pulldown": [
"허벅지 패드를 꽉 조여서 워밍업 세트부터 계속 엉덩이가 고정되게 하세요.",
"손바닥이 앞을 향하게 하고 바를 어깨너비보다 약간 넓게 잡으세요.",
"10~15도 정도 뒤로 기울이고 반복 내내 그 각도를 유지하세요.",
"팔꿈치를 단순히 아래로만이 아니라 엉덩이 쪽으로, 아래와 뒤로 당기세요.",
"바가 쇄골에 가까워질수록 가슴을 위로, 앞으로 내미세요.",
"최하단에서 잠깐 멈춰 광배근을 조인 뒤 바가 올라가게 하세요.",
"무게에 끌려 올라가지 말고 2~3초에 걸쳐 이센트릭 구간을 제어하세요.",
"견갑골이 먼저 개입하기 전에 팔로 바를 확 잡아당기지 마세요.",
"스트레칭 최상단에서 어깨가 귀 쪽으로 으쓱 올라가지 않게 하세요.",
"바를 당길 때 숨을 내쉬고, 올라갈 때 들이쉬세요.",
"손으로 더 세게 잡으려 하지 말고 팔꿈치로 당긴다는 느낌을 가지세요.",
"무게를 억지로 내리려고 상체를 뒤로 젖히지 마세요."
],
"Leg extension": [
"시작하기 전에 머신의 회전축을 무릎 관절과 일치시키세요.",
"발목 패드를 발 바로 위, 정강이에 닿도록 맞추세요.",
"무릎을 확 꺾어 잠그지 않고 다리가 곧게 펴질 때까지 뻗으세요.",
"반동을 이용하거나 상체를 흔들어서 무게를 드는 걸 돕지 마세요.",
"다리를 뻗을 때 숨을 내쉬고, 내릴 때 들이쉬세요.",
"완전히 뻗은 상태에서 잠깐 멈춰 대퇴사두근 수축을 극대화하세요.",
"무게가 빠르게 떨어지게 두지 말고 천천히 내리세요.",
"무게를 올리기 전에 가벼운 워밍업 세트로 무릎 상태를 확인하세요.",
"등을 패드에서 뜨지 않게 평평하게 붙이세요.",
"매 반복 최상단에서 대퇴사두근을 강하게 조이는 데 집중하세요.",
"옆 손잡이를 세게 잡아당기지 말고 가볍게 잡으세요.",
"무릎에 불편함이 느껴지면 완전히 펴기 전에 멈추세요."
],
"Leg press": [
"발을 어깨너비로 벌려 발판에 발뒤꿈치부터 발끝까지 평평하게 올려놓으세요.",
"매 반복 내내 허리를 시트에 밀착시키세요.",
"무릎이 약 90도가 될 때까지 발판을 내리세요.",
"무게를 밀어 올릴 때 무릎이 안쪽으로 모이지 않게 하세요.",
"발판이 내려갈 때 숨을 들이쉬고, 밀어낼 때 내쉬세요.",
"무릎을 완전히 잠그거나 최상단에서 튕기지 마세요.",
"무거운 중량으로 가기 전에 워밍업 세트로 시트 위치를 확인하세요.",
"깊이 내려갈 때 엉덩이가 시트에서 말리지 않고 붙어 있게 하세요.",
"밀어 올릴 때 발뒤꿈치가 발판에서 뜨지 않게 하세요.",
"발끝만이 아니라 발 전체로 미는 데 집중하세요.",
"발판이 빠르게 떨어지게 두지 말고 내려가는 구간을 제어하세요.",
"머리와 어깨는 등받이에 편안하게 기대세요."
],
"Leg press calf raise": [
"발판 아래쪽 끝에 발볼만 올려놓으세요.",
"세트 내내 무릎을 살짝 편 상태로 고정하세요.",
"완전한 스트레칭을 위해 발판이 허용하는 만큼 발뒤꿈치를 내리세요.",
"앞발로 밀어서 최상단에서 발목을 완전히 펴세요.",
"완전히 발목을 편 상태에서 잠깐 멈춘 뒤 다시 내리세요.",
"밀어 올릴 때 숨을 내쉬고, 발뒤꿈치를 내릴 때 들이쉬세요.",
"무게를 밀어 올리는 걸 돕기 위해 무릎을 굽히지 마세요.",
"워밍업 세트로 발판 위 안전한 발 위치를 찾으세요.",
"최하단 스트레칭에서 튕기지 말고 제어하세요.",
"짧게 끊어서 하지 말고 가동 범위를 온전히 사용하세요.",
"대퇴사두근이 아니라 종아리에서 스트레칭과 수축을 느끼는 데 집중하세요.",
"매 반복마다 발 위치를 확인해서 미끄러지지 않게 하세요."
],
"Leg raise": [
"단단한 오버핸드 그립이나 행잉 그립을 사용하고, 들어 올리기 전에 어깨에 완전히 힘이 들어가게 하세요.",
"바에서 흔들리지 않도록 다리를 들기 전에 복근에 힘을 주세요.",
"단순히 고관절만 굽히지 말고 골반을 위로 기울여 다리를 들어 올리세요.",
"다리를 들어 올릴 때 숨을 내쉬고, 천천히 내릴 때 들이쉬세요.",
"다리가 떨어지며 흔들리게 두지 말고 제어하며 내리세요.",
"어깨의 반동을 이용해 다리를 흔들어 올리지 마세요.",
"허리가 과도하게 앞으로 꺾이기 전에 다리 동작을 멈추세요.",
"다리를 편 채로 하는 레이즈가 허리에 부담을 주면 무릎을 살짝 굽히세요.",
"단순히 바 높이에 닿는 게 아니라 최상단에서 하복부를 조이세요.",
"견갑골에 힘을 유지하고 관절에 힘없이 축 매달리지 마세요.",
"다음 반복을 위해 상체를 흔들어 반동을 만들지 마세요.",
"다리를 편 행잉 레이즈로 넘어가기 전에 무릎을 굽힌 레이즈부터 단계적으로 늘려가세요."
],
"Lying hamstring curl": [
"발목 패드가 종아리가 아니라 발뒤꿈치 바로 위에 오도록 조절하세요.",
"동작 내내 엉덩이를 벤치에 평평하게 밀착시키세요.",
"천천히 전체 가동 범위를 활용해 발뒤꿈치를 엉덩이 쪽으로 말아 올리세요.",
"허리 반동을 이용해 무게를 확 끌어 올리지 마세요.",
"최대 수축 지점에서 조이고 잠깐 멈춘 뒤 내리세요.",
"말아 올릴 때 숨을 내쉬고, 패드를 내릴 때 들이쉬세요.",
"무게가 무거워져도 엉덩이가 패드에서 튀어 오르지 않게 하세요.",
"무게를 올리기 전에 가벼운 워밍업 세트로 햄스트링을 깨우세요.",
"종아리보다 햄스트링에 더 집중되도록 발끝을 살짝 세우세요.",
"패드가 확 튕겨 돌아가게 두지 말고 제어하며 내리세요.",
"손잡이는 가볍게 잡고 상체를 이리저리 끌어당기지 마세요.",
"완전히 펴진 상태에서 햄스트링의 스트레칭을 느끼는 데 집중하세요."
],
"Machine abduction": [
"엉덩이를 정렬하고 척추를 패드에 붙인 채 깊숙이 앉으세요.",
"패드를 정강이가 아니라 무릎 바깥쪽에 위치시키세요.",
"바깥쪽 엉덩이가 주도하도록 다리를 천천히 벌리세요.",
"허리 반동을 이용해 무게를 확 벌리지 마세요.",
"밖으로 밀 때 숨을 내쉬고, 다리를 모을 때 들이쉬세요.",
"가장 넓게 벌어진 지점에서 멈춰 중둔근이 작용하는 걸 느끼세요.",
"패드가 통제되지 않은 무게로 확 모아지게 두지 마세요.",
"가벼운 워밍업 세트로 편안한 시작 범위를 찾으세요.",
"어깨는 편안하게 유지하고 손잡이를 너무 세게 잡지 마세요.",
"대퇴사두근이 아니라 바깥쪽 엉덩이와 둔근이 일하는 것을 느끼는 데 집중하세요.",
"반복 중간에 허리가 패드에서 말려 뜨지 않게 하세요.",
"안팎으로 튕기지 말고 일정한 템포를 유지하세요."
],
"Machine adduction": [
"척추를 패드에 붙이고 시트에 깊숙이 앉으세요.",
"패드를 무릎 바로 위, 허벅지 안쪽에 맞추세요.",
"패드를 확 닫듯 하지 말고 다리를 천천히 모으세요.",
"손으로 무릎을 눌러 동작을 돕지 마세요.",
"다리를 모을 때 숨을 내쉬고, 풀 때 들이쉬세요.",
"허벅지 안쪽이 완전히 수축된 상태에서 잠깐 멈춘 뒤 다시 여세요.",
"돌아올 때 무게에 의해 다리가 너무 빨리 벌어지게 두지 마세요.",
"무게를 올리기 전에 가벼운 워밍업 세트로 가동 범위를 테스트하세요.",
"앞으로 구부러지지 않게 등을 패드에 평평하게 붙이세요.",
"엉덩이가 아니라 허벅지 안쪽이 조여지는 것을 느끼는 데 집중하세요.",
"무리하지 않으면서 스트레칭이 느껴지도록 시작 너비를 설정하세요.",
"양방향 모두 부드럽고 제어된 동작을 유지하세요."
],
"Machine chest fly": [
"앉았을 때 손잡이가 가슴 중앙에 오도록 시트 높이를 조절하세요.",
"어깨 통증 없이 가슴이 완전히 스트레칭되는 위치로 암을 설정하세요.",
"매 반복 내내 등을 패드에 단단히 밀착시키세요.",
"패드를 넓은 호를 그리며 모으고 중앙에서 가슴을 조이세요.",
"돌아갈 때 무게에 저항하세요 — 패드가 통제 없이 확 벌어지게 두지 마세요.",
"가슴에 지속적인 긴장을 유지하도록 패드가 중앙에서 닿기 직전에 멈추세요."
],
"Machine chest press": [
"손잡이가 가슴 중앙에 오도록 시트를 조절하세요.",
"프레스 내내 등과 머리를 패드에 평평하게 붙이세요.",
"안정적인 기반을 위해 발을 바닥에 평평하게 붙이세요.",
"최상단에서 팔꿈치를 세게 잠그지 말고 손잡이를 앞으로 미세요.",
"밀 때 숨을 내쉬고, 제어하며 돌아올 때 들이쉬세요.",
"반복 사이에 웨이트 스택이 쾅 떨어지게 두지 마세요.",
"워밍업 세트로 알맞은 시트 높이와 그립 위치를 찾으세요.",
"손목을 손잡이 주위로 꺾지 말고 곧게 유지하세요.",
"밀 때 어깨가 등받이에서 앞으로 말리지 않게 하세요.",
"단순히 밀기만 하지 말고 완전히 뻗은 상태에서 가슴을 모아 조이세요.",
"추가 반복을 짜내려고 등을 패드에서 아치 시키지 마세요.",
"짧게 부분적으로 반복하지 말고 전체 가동 범위를 제어하며 움직이세요."
],
"Machine hip thrust": [
"동작 최상단에서 엉덩이가 완전히 펴질 수 있도록 시트와 어깨 패드를 조절하세요.",
"발을 힙 너비로 벌리고 발끝을 살짝 바깥으로 향하게 해서 풋플레이트에 평평하게 올려놓으세요.",
"발뒤꿈치로 밀며 둔근을 강하게 조여 엉덩이를 앞으로 밀어내세요.",
"매 반복 최상단에서 한 박자 멈춘 뒤 제어하며 무게를 내리세요.",
"허리를 말지 마세요 — 동작은 오직 엉덩이에서만 나와야 합니다.",
"최상단에서 허리가 과신전되지 않도록 내내 코어에 힘을 유지하세요."
],
"Machine lateral raise": [
"손이 아니라 팔꿈치로 패드를 미세요.",
"위팔이 바닥과 평행이 될 때까지만 들어 올리세요 — 그 이상은 안 됩니다.",
"어깨를 아래로 눌러 유지하고 승모근이 으쓱 올라가지 않게 하세요.",
"최상단에서 잠깐 멈추세요 — 머신은 흔들어서 속일 수 없습니다.",
"천천히 내리세요 — 내리는 구간이 운동의 절반입니다.",
"회전축이 어깨 관절과 일치하도록 시트를 맞추세요."
],
"Machine preacher curl": [
"겨드랑이가 패드 상단에 꼭 맞게 걸리도록 시트를 조절하세요.",
"완전히 스트레칭될 때부터 완전히 조일 때까지 위팔을 패드에 붙이고 있으세요.",
"웨이트 스택을 쾅 부딪치지 않고 최하단에서 거의 완전히 펴세요.",
"반복을 짜내려고 가슴을 패드에서 떼지 마세요.",
"최상단에서 조인 다음 내려갈 때 꼬박 2초를 들이세요.",
"머신이 자세를 고정해 주니, 그걸 이용해 안전하게 깊은 자극을 노려보세요."
],
"Machine rear delt fly": [
"시작 자세에서 손잡이가 어깨와 일치하도록 시트를 조절하세요.",
"상체가 흔들리지 않도록 가슴을 패드에 밀착시키세요.",
"손잡이를 밖으로, 뒤로 당길 때 팔꿈치가 먼저 움직이게 하세요.",
"매 반복 끝 지점에서 견갑골을 서로 조이세요.",
"후면삼각근 대신 가슴이나 팔의 힘으로 손잡이를 당기지 마세요.",
"반복 사이에 웨이트 스택이 쾅 떨어지지 않게 돌아오는 구간을 제어하세요.",
"팔꿈치를 살짝 굽힌 상태로 세트 내내 일정하게 유지하세요.",
"손잡이를 벌릴 때 숨을 내쉬고, 돌아올 때 들이쉬세요.",
"동작 중 어깨가 귀 쪽으로 으쓱 올라가지 않게 하세요.",
"등 뒤가 아니라 대략 어깨 높이에서 가동 범위를 멈추세요.",
"후면삼각근이 팔꿈치를 뒤로 당긴다고 상상하며 마인드-머슬 커넥션에 집중하세요.",
"허리가 움직이지 않도록 발을 평평하게 붙이고 코어에 힘을 유지하세요."
],
"Machine seated crunch": [
"가슴 패드가 목이 아니라 상부 가슴에 오도록 시트 높이를 조절하세요.",
"웨이트 스택을 올리기 전에 가벼운 워밍업 세트로 가동 범위를 찾으세요.",
"팔로 확 당기지 말고 복근을 수축시켜 척추를 앞으로 말아 올리세요.",
"복근 수축을 깊게 하기 위해 크런치 할 때 숨을 완전히 내쉬세요.",
"동작 내내 엉덩이가 움직이지 않도록 발을 평평하게 고정하세요.",
"튕기지 말고 완전히 수축된 상태에서 잠깐 멈춰 복근을 조이세요.",
"무게가 확 튕겨 돌아가게 두지 말고 시작 위치로 제어하며 돌아가세요.",
"가짜로 가동 범위를 늘리려고 어깨로 손잡이를 확 당기지 마세요.",
"목은 편안하게 유지하고 턱이 아니라 복근이 당기게 하세요.",
"세트 내내 복근이 일하는 걸 느낄 수 있는 적당한 무게를 사용하세요.",
"팔꿈치를 뻣뻣하게 고정하지 말고, 팔은 힘을 만들어내는 게 아니라 전달만 하게 하세요.",
"코어를 완전히 활성화하도록 허리를 패드 쪽으로 둥글게 마는 데 집중하세요."
],
"Machine shoulder press": [
"시작하기 전에 손잡이가 어깨 높이에 오도록 시트를 조절하세요.",
"세트 내내 등을 패드에 밀착시키세요.",
"손잡이를 밀어 올릴 때 팔꿈치를 과도하게 완전히 펴지 마세요.",
"밀 때 숨을 내쉬고, 손잡이를 원위치로 내릴 때 숨을 들이마시세요.",
"팔이 바닥과 거의 평행이 될 때까지 손잡이를 내리세요.",
"미는 동안 어깨가 귀 쪽으로 으쓱 올라가지 않도록 하세요.",
"손목을 곧게 펴고 손잡이에 눌려 꺾이지 않도록 하세요.",
"웨이트 스택이 쿵 떨어지게 두지 말고 템포를 조절하세요.",
"손잡이를 단순히 움직이기보다 정점에서 어깨를 쥐어짜는 느낌에 집중하세요.",
"팔꿈치가 손잡이 궤도보다 더 벌어지지 않게 하세요.",
"안정적인 자세를 위해 발을 바닥에 평평하게 붙이세요.",
"무게를 올리기 전에 손잡이 그립 너비가 편안한 어깨 위치와 맞는지 확인하세요."
],
"Machine-assisted pull-up": [
"스택에 표시된 숫자는 보조 무게입니다. 시간이 지나며 이 숫자가 줄어드는 것이 곧 발전입니다.",
"완전히 매달린 자세에서 시작하세요. 절반만 하는 반복은 절반짜리 풀업만 만듭니다.",
"턱을 올리려 하기보다 팔꿈치를 아래로, 뒤로 당긴다고 생각하세요.",
"몸을 수직으로 유지하고, 패드 위에서 반동을 주거나 몸을 흔들지 마세요.",
"보조 무게가 적어지면 맨몸 풀업에 도전해보세요.",
"올라갈 때와 내려갈 때 모두 컨트롤하세요. 특히 내려가는 동작(네거티브)이 근력을 가장 많이 키웁니다."
],
"Mountain climbers": [
"손을 어깨 아래에 두고 몸을 일자로 만든 푸시업 플랭크 자세로 시작하세요.",
"시작 전 코어를 단단히 조이고, 동작 내내 그 힘을 유지하세요.",
"엉덩이를 수평으로 유지한 채 한쪽 무릎을 가슴 쪽으로 끌어당기세요. 엉덩이가 들리지 않게 하세요.",
"그냥 빠르게만 반복하기보다, 달리듯 좌우 다리를 컨트롤하며 교차하세요.",
"엉덩이가 위아래로 튀지 않게, 낮은 플랭크 자세를 유지하세요.",
"속도와 강도가 올라가도 숨을 참지 말고 리드미컬하게 호흡하세요."
],
"Overhead EZ bar tricep extension": [
"팔 윗부분은 귀 옆에서 수직으로 고정하고, 팔꿈치만 움직이세요.",
"삼두 장두를 완전히 늘리기 위해 바를 머리 뒤로 충분히 내리세요.",
"팔꿈치를 좁게 유지하세요. 벌어지면 프레스 동작이 돼버립니다.",
"허리가 패드에서 뜨지 않도록 코어에 힘을 주세요.",
"팔이 완전히 펴질 때까지 머리 위로 곧게 밀어 올리세요.",
"푸시다운보다 가벼운 중량을 사용하세요. 스트레치 자세에서 부하가 훨씬 크게 느껴집니다."
],
"Overhead cable tricep extension": [
"케이블 머신을 등지고 서고, 도르래는 바닥 가까이 설정하세요.",
"세트 내내 팔 윗부분을 머리에 가깝게, 흔들리지 않게 유지하세요.",
"팔이 완전히 펴질 때까지 팔뚝을 앞으로, 위로 뻗으세요.",
"케이블을 밀어낼 때 팔꿈치가 바깥으로 벌어지지 않게 하세요.",
"허리 부담을 줄이기 위해 상체를 살짝 앞으로 기울이세요.",
"팔을 펼 때 숨을 내쉬고, 다시 굽힐 때 숨을 들이마시세요.",
"케이블의 당김에 허리가 꺾이지 않도록 코어를 단단히 조이세요.",
"동작을 도중에 멈추지 말고 팔을 다 편 지점에서 삼두를 완전히 쥐어짜세요.",
"로프 어태치먼트를 사용해 양끝을 벌려주면 삼두 수축이 더 강해집니다.",
"반복 시작할 때 케이블을 확 잡아채지 말고 부드럽게 움직이세요.",
"손목이 꺾이지 않게 곧고 단단하게 유지하세요.",
"케이블에 팔이 확 끌려가지 않게 스트레치 자세를 컨트롤하세요."
],
"Pike push-ups": [
"엉덩이를 높이 들어 몸이 역V자를 이루는 다운독 자세로 시작하세요.",
"손을 발 쪽으로 더 가깝게 이동시키면 어깨 각도가 커지고 난이도가 올라갑니다.",
"팔꿈치를 굽혀 머리를 두 손 사이 바닥 쪽으로 내리세요.",
"팔꿈치를 살짝 안쪽으로 향하게 하고, 옆으로 크게 벌리지 마세요.",
"팔이 완전히 펴질 때까지 밀어 올려 역V자 시작 자세로 돌아가세요.",
"파이크 각도를 유지하기 위해 다리를 최대한 곧게 펴세요."
],
"Plank": [
"어깨를 팔꿈치 바로 위에 두어 팔뚝 자세를 안정적으로 만드세요.",
"배에 주먹이 날아올 것처럼 코어에 힘을 꽉 주세요.",
"엉덩이를 조여 골반이 바닥 쪽으로 처지지 않게 하세요.",
"머리부터 발뒤꿈치까지 몸을 일직선으로 유지하세요.",
"버티는 동안 숨을 참지 말고 고르게 호흡하세요.",
"엉덩이가 솟아 역V자 모양이 되지 않게 하세요.",
"허리가 처지지 않게 하세요. 시간이 지나면 척추에 부담이 됩니다.",
"정면이 아닌 바닥을 보며 목을 중립 상태로 유지하세요.",
"팔뚝을 바닥에 눌러 등 윗부분에 힘이 들어가게 하세요.",
"자세가 무너진 플랭크를 억지로 버티지 말고, 자세가 흐트러지면 바로 멈추세요.",
"안정적인 자세를 위해 발을 골반 너비로 벌리세요.",
"버티는 시간을 늘리는 데만 집중하지 말고, 긴장을 유지하는 질에 집중하세요."
],
"Plate-loaded standing calf raise": [
"어깨를 패드 아래에 맞추고, 무릎은 완전히 펴지 말고 살짝 굽히세요.",
"발볼을 플랫폼에 올리고 발뒤꿈치는 가장자리 밖으로 나오게 하세요.",
"발뒤꿈치를 최대한 깊게 내려 종아리가 충분히 늘어나는 느낌을 받으세요.",
"발볼로 밀어 올려 완전히 까치발 상태가 될 때까지 올라가세요.",
"정점에서 잠시 멈춰 종아리를 쥐어짠 뒤 내려가세요.",
"올라갈 때 숨을 내쉬고, 발뒤꿈치를 내릴 때 숨을 들이마시세요.",
"바닥에서 튕기지 말고 스트레치 구간을 컨트롤하세요.",
"무거운 중량을 올리기 전, 워밍업 세트로 발 위치와 균형을 확인하세요.",
"어깨 패드에 기대지 말고 상체를 곧게 세우세요.",
"무릎을 굽혔다 폈다 하며 반동으로 중량을 밀어내지 마세요.",
"정강이가 아닌 종아리에서 자극이 느껴지는지에 집중하세요.",
"매 세트마다 발 위치를 확인해 발이 바깥으로 밀리지 않게 하세요."
],
"Preacher curl": [
"시작 전 팔 윗부분 뒷면을 패드에 완전히 밀착시키세요.",
"중량을 컬 할 때 팔꿈치가 패드에서 떨어지지 않게 하세요.",
"팔이 거의 다 펴질 때까지 바를 내려 완전한 스트레치를 느끼세요.",
"반복 하단에서 팔꿈치를 세게 완전히 펴지 마세요.",
"곧바로 다음 반복으로 넘어가지 말고 정점에서 이두를 쥐어짜세요.",
"들어 올릴 때 숨을 내쉬고, 바를 내릴 때 숨을 들이마시세요.",
"손목이 뒤로 꺾이지 않게 곧고 단단하게 유지하세요.",
"프리처 자세는 반동을 쓸 수 없으니 더 느린 템포로 진행하세요.",
"무거운 반복에서도 뒤로 기대지 말고 가슴을 패드에 붙이세요.",
"이두가 지치더라도 어깨로 중량을 들썩이며 들어 올리지 마세요.",
"이 자세는 레버리지가 불리하니 스탠딩 컬보다 가벼운 중량을 선택하세요.",
"세트 내내 안정적인 자세를 위해 발을 바닥에 평평하게 붙이세요."
],
"Pull-ups": [
"바를 어깨너비보다 약간 넓게 잡고, 엄지손가락으로 바를 완전히 감싸 쥐세요.",
"전체 가동범위를 사용하기 위해 완전히 매달린 자세에서 시작하세요.",
"팔꿈치를 아래, 뒤로 당기며 가슴을 바 쪽으로 이끌어 올리세요.",
"스트릭트 세트에서는 반동을 주거나 다리를 흔들어 추진력을 만들지 마세요.",
"정점에서 견갑골을 모으고 가슴을 위로 밀어 올리세요.",
"빠르게 툭 떨어지지 말고 컨트롤하며 매달린 자세로 내려가세요.",
"반복 중 다리가 흔들리지 않도록 코어와 엉덩이에 힘을 주세요.",
"올라갈 때 숨을 내쉬고, 내려갈 때 숨을 들이마시세요.",
"매달린 자세 하단에서 어깨가 귀 쪽으로 으쓱 올라가지 않게 하세요.",
"바를 끌어내린다는 생각보다 몸을 바 쪽으로 끌어올린다고 생각하세요.",
"목을 앞으로 내밀지 않고도 턱이 바를 넘도록 하세요.",
"풀 레인지가 아직 힘들다면 밴드나 어시스트 머신을 이용해 전체 가동범위를 유지하세요."
],
"Push-ups": [
"손을 어깨너비 정도로 벌리고 손가락을 펼쳐 안정감을 높이세요.",
"동작 내내 머리부터 발뒤꿈치까지 몸을 일직선으로 유지하세요.",
"엉덩이가 처지거나 솟아 플랭크 자세가 무너지지 않게 하세요.",
"전체 가동범위를 위해 가슴이 바닥에 거의 닿을 때까지 내리세요.",
"팔꿈치를 상체 기준 약 45도로 유지하고, 크게 벌리지 마세요.",
"내려갈 때 숨을 들이마시고, 밀어 올릴 때 숨을 내쉬세요.",
"턱을 살짝 당기고 목을 앞으로 내밀지 말고 중립으로 유지하세요.",
"척추를 안정시키기 위해 코어에 힘을 주고 엉덩이를 조이세요.",
"팔꿈치를 90도로 크게 벌리지 마세요. 어깨에 무리가 갈 수 있습니다.",
"손가락 끝이 아니라 손바닥 전체로 하중을 분산시키세요.",
"바닥 쪽으로 빠르게 떨어지지 말고 내려가는 속도를 늦추세요.",
"전신 정렬을 유지하기 힘들다면 인클라인 자세나 무릎을 짚는 방식으로 난이도를 낮추세요."
],
"Reverse EZ bar curl": [
"세트 내내 손바닥을 아래로 향하게 하세요. 이 어색한 그립 자체가 이 운동의 핵심입니다.",
"손목을 완전히 곧게 펴고, 아래로 꺾이지 않게 하세요.",
"팔꿈치를 옆구리에 고정하고, 팔뚝만으로 컬 하세요.",
"일반 컬보다 훨씬 가벼운 중량을 쓰게 되는 게 정상입니다.",
"천천히 내리세요. 팔뚝은 내리는 동작(네거티브)에서 성장합니다.",
"바를 세게 움켜쥐세요. 바를 으스러뜨리듯 잡으면 팔뚝이 더 많이 동원됩니다."
],
"Reverse grip pulldown": [
"바를 어깨너비로 잡되 손바닥이 자신을 향하게 해, 광배근 하부와 이두에 더 집중하세요.",
"당기기 전 가슴을 세우고 어깨를 뒤로 젖히세요.",
"팔꿈치를 몸통에 가깝게 스치듯 곧장 허리 쪽으로 당기세요.",
"바가 가슴 윗부분에 닿을 때 견갑골을 모아 쥐어짜세요.",
"바가 튕겨 올라가게 두지 말고, 컨트롤하며 저항하듯 늘려 올리세요.",
"너무 무거운 중량을 감당하려고 지나치게 뒤로 젖히지 마세요.",
"손목을 중립으로 유지하고, 바를 당기는 데 손목을 사용하지 마세요.",
"당길 때 숨을 내쉬고, 완전히 늘어난 자세로 돌아갈 때 숨을 들이마시세요.",
"정점에서 견갑골이 완전히 벌어지도록 두어 완전한 스트레치를 느끼세요.",
"당기는 동안 팔꿈치가 옆으로 벌어지지 않게 하세요.",
"단순히 팔을 굽히기보다 팔꿈치를 갈비뼈 옆으로 밀어내는 느낌에 집중하세요.",
"세트 내내 발을 바닥에 붙이고 엉덩이를 패드 아래에서 고정하세요."
],
"Romanian deadlift": [
"리프트 내내 바를 정강이와 허벅지에 가깝게 붙이세요.",
"엉덩이를 뒤로 밀며 상체가 앞으로 기울어지도록 힙힌지 동작을 하세요.",
"무릎을 완전히 펴지 말고 살짝 굽힌 상태를 유지하세요.",
"준비 자세부터 완전히 일어설 때까지 척추를 평평하고 중립으로 유지하세요.",
"햄스트링이 충분히 늘어나는 느낌이 들 때까지만 바를 내리세요.",
"바를 더 낮게 내리려고 허리를 구부리지 마세요.",
"내려가기 전 숨을 들이마시고 힘을 준 뒤, 일어설 때 숨을 내쉬세요.",
"마무리 동작은 허리가 아니라 엉덩이를 앞으로 밀어서 만드세요.",
"동작 내내 어깨를 뒤로 펴고 가슴을 당당히 세우세요.",
"바닥에서 바를 확 잡아채지 말고 부드럽게 당기기 시작하세요.",
"허리가 아닌 햄스트링에 긴장이 쌓이는 느낌에 집중하세요.",
"그립이 미끄러지기 시작하면 더블 오버핸드나 믹스 그립, 초크를 사용하세요."
],
"Russian twist": [
"무릎을 굽히고 앉아 상체를 약 45도 뒤로 기울이세요.",
"발을 바닥에서 살짝 들어 올려 코어 사용과 난이도를 높이세요.",
"상체를 좌우로 완전히 회전시키세요. 움직임은 팔이 아니라 코어에서 나와야 합니다.",
"전체 가동범위를 위해 매번 양쪽 바닥에 중량이나 손을 닿게 하세요.",
"회전하는 동안 숨을 참지 말고 내내 고르게 호흡하세요.",
"양쪽 모두 45도 기울기를 유지해 허리가 구부러지지 않게 하세요."
],
"Seated cable row": [
"무릎을 살짝 굽히고 발을 발판에 단단히 고정한 채 앉으세요.",
"매 반복마다 팔을 완전히 펴고 상체를 살짝 앞으로 기울인 자세에서 시작하세요.",
"척추를 중립으로 유지하며 팔꿈치를 갈비뼈를 지나 곧장 뒤로 당기세요.",
"당기기가 끝나는 지점에서 견갑골을 모아 잠시 유지하세요.",
"상체를 뒤로 흔들며 반동으로 중량을 움직이지 마세요.",
"스트레치 구간에서 가슴을 세우고 허리가 구부러지지 않게 하세요.",
"중량에 팔이 갑자기 앞으로 끌려가지 않도록 되돌아가는 구간을 컨트롤하세요.",
"당길 때 숨을 내쉬고, 팔을 다시 뻗을 때 숨을 들이마시세요.",
"손목을 곧게 유지하고 광배근과 등 중앙 근육으로 당기세요.",
"승모근이 으쓱 올라가지 않게 하고, 어깨는 아래, 뒤로 당긴 상태를 유지하세요.",
"손잡이를 가슴 위쪽이 아니라 갈비뼈 하부 쪽으로 당기세요.",
"당길 때 팔꿈치를 크게 벌리지 말고 몸에 가깝게 붙이세요."
],
"Seated calf raise": [
"시작 전 무릎 패드를 허벅지에 딱 맞게 조절하세요.",
"발볼을 플랫폼에 올리고 발뒤꿈치는 자유롭게 늘어뜨리세요.",
"발뒤꿈치를 최대한 내려 종아리가 깊게 늘어나게 하세요.",
"발볼로 밀어 완전히 까치발 상태까지 올라가세요.",
"정점에서 잠시 멈춰 종아리를 강하게 쥐어짜세요.",
"올라갈 때 숨을 내쉬고, 내려갈 때 숨을 들이마시세요.",
"하단 스트레치 자세에서 튕기듯 반동을 주지 마세요.",
"패드가 툭 떨어지게 두지 말고 천천히 내리며 컨트롤하세요.",
"동작 내내 무릎을 움직이지 말고 같은 각도로 굽힌 상태를 유지하세요.",
"종아리에서만 스트레치와 수축이 느껴지는지에 집중하세요.",
"반복하는 동안 발이 안이나 밖으로 돌아가지 않게 하세요.",
"짧고 부분적인 펄스 동작 대신 전체 가동범위를 사용하세요."
],
"Seated dumbbell shoulder press": [
"등받이에 상체를 곧게 세우고, 허리는 꺾이지 않게 평평하게 붙이세요.",
"머리 위로 밀어 올리기 전, 덤벨을 귀 높이에 위치시킨 자세에서 시작하세요.",
"덤벨을 위로, 살짝 안쪽으로 밀어 올리되 정점에서 서로 부딪히지 않게 하세요.",
"밀어 올릴 때 숨을 내쉬고, 덤벨을 내릴 때 숨을 들이마시세요.",
"팔꿈치가 어깨 높이보다 살짝 아래에 올 때까지만 내리세요.",
"관절 부담을 줄이기 위해 정점에서 팔꿈치를 세게 완전히 펴지 마세요.",
"회전근개와 어깨 관절을 준비시키기 위해 먼저 가벼운 워밍업 세트를 하세요.",
"반복하는 내내 손목이 팔꿈치 바로 위에 오도록 유지하세요.",
"팔꿈치가 너무 앞으로 벌어지지 않게 하세요. 삼각근에 실리는 부하가 줄어듭니다.",
"밀어 올릴 때 갈비뼈가 들리지 않도록 코어에 힘을 주세요.",
"손바닥으로 미는 느낌에 집중하며, 전면과 측면 삼각근이 중량을 밀어내는 것을 느끼세요.",
"덤벨이 머리 뒤로 넘어가지 않게 하세요. 어깨 관절에 무리가 갑니다."
],
"Seated hamstring curl": [
"패드를 조절하기 전, 머신의 회전축을 무릎 관절에 맞추세요.",
"컬 동작 중 엉덩이가 들리지 않도록 허벅지 패드를 딱 맞게 조절하세요.",
"발뒤꿈치를 전체 가동범위로 아래, 뒤로 굽히세요.",
"엉덩이나 상체를 이용해 중량을 확 잡아채듯 움직이지 마세요.",
"굽힐 때 숨을 내쉬고, 시작 자세로 돌아갈 때 숨을 들이마시세요.",
"햄스트링 자극을 극대화하기 위해 최대 수축 지점에서 잠시 멈추세요.",
"중량이 확 튕겨 올라가게 두지 말고 천천히 내리세요.",
"편안한 패드 위치를 찾기 위해 가벼운 워밍업 세트를 진행하세요.",
"등을 시트에 평평하게 붙이고 앞으로 구부러지지 않게 하세요.",
"발끝을 살짝 세워 종아리보다 햄스트링에 더 집중되게 하세요.",
"매 반복의 상단에서 스트레치가 느껴지는지에 집중하세요.",
"손잡이를 힘줘 꽉 쥐지 말고 편안하게 잡으세요."
],
"Side plank": [
"들어 올리기 전 팔꿈치를 어깨 바로 아래에 두세요.",
"발목부터 머리까지 자로 잰 듯 일직선이 될 때까지 엉덩이를 들어 올리세요.",
"버티는 내내 아래쪽 옆구리를 쥐어짜세요. 관절에만 매달리듯 버티지 마세요.",
"목을 길게 유지하고 아래가 아닌 정면을 바라보세요.",
"엉덩이가 처지면 그 세트는 끝입니다. 처졌다면 낮춰서 버티는 게 아니라 그만해야 할 때입니다.",
"양쪽 시간을 맞추세요. 더 약한 쪽이 기준 시간이 됩니다."
],
"Single-arm cable fly": [
"팔꿈치를 살짝 구부린 상태로 동작 내내 고정하세요 — 시작부터 끝까지 그 각도가 바뀌면 안 됩니다.",
"모든 움직임은 어깨 관절에서 나와야 하며 팔꿈치 각도는 고정되어야 합니다. 당길 때 팔꿈치가 더 구부러진다면 로우 동작이 되어버립니다.",
"돌아올 때 케이블에 팔이 홱 끌려가지 않도록 하세요 — 스트레칭 구간까지 끝까지 컨트롤하세요.",
"상체를 고정하세요. 가동범위를 늘리려고 몸을 케이블 쪽으로 돌리면 가슴에 실리는 부하가 빠져나갑니다.",
"두 발을 앞뒤로 벌려 안정적인 자세를 만드세요 — 그렇지 않으면 가슴이 아니라 상체로 동작을 보상하게 됩니다."
],
"Single-arm dumbbell overhead tricep extension": [
"위팔을 머리에 가깝게 붙이고 곧게 위쪽을 향하게 유지하세요.",
"삼두근이 깊게 늘어나는 느낌이 들 때까지 덤벨을 머리 뒤로 내리세요.",
"반대쪽 손으로 운동하는 팔의 팔꿈치를 받쳐주면 더 안정적입니다.",
"팔을 머리 위로 완전히 펴되, 정점에서 관절을 세게 꺾어 잠그지 마세요.",
"동작 중 팔꿈치가 머리에서 바깥쪽으로 벌어지지 않도록 하세요.",
"밀어 올릴 때 숨을 내쉬고, 덤벨을 머리 뒤로 내릴 때 숨을 들이쉬세요.",
"코어를 단단히 조이고 갈비뼈를 내려 허리가 과도하게 젖혀지지 않게 하세요.",
"내릴 때 천천히 움직여 삼두근에 긴장을 계속 유지하세요.",
"무거운 무게를 들 때 상체를 비틀어 반동을 주지 마세요.",
"손목이 뒤로 꺾이지 않도록 곧고 단단하게 유지하세요.",
"동작 중 한쪽으로 기울지 말고 곧게 앉거나 서세요.",
"한쪽 팔의 반복을 제어된 동작으로 모두 마친 후에만 반대쪽으로 바꾸세요."
],
"Single-arm dumbbell row": [
"반대쪽 손은 벤치를 짚어 지지하고, 척추는 비틀지 말고 평평하게 유지하세요.",
"매 반복 하단에서 덤벨이 곧게 아래로 매달리게 하여 완전히 스트레칭하세요.",
"팔꿈치를 옆구리를 스치듯 위와 뒤로 당기세요.",
"힘든 반복에서 상체를 돌려 무게를 억지로 들어 올리지 마세요.",
"당기기 동작의 정점에서 견갑골을 척추 쪽으로 조이세요.",
"운동하는 쪽 골반이 위로 돌아가지 않도록 벤치와 평행하게 유지하세요.",
"덤벨을 떨어뜨리듯 내리지 말고 천천히 내려 긴장을 유지하세요.",
"덤벨을 당길 때 숨을 내쉬고, 내릴 때 숨을 들이쉬세요.",
"당길 때 어깨가 귀 쪽으로 으쓱 올라가지 않게 하세요.",
"목은 중립을 유지하고 무게를 보려고 고개를 돌리지 마세요.",
"손이나 손목이 아니라 팔꿈치가 동작을 주도하도록 집중하세요.",
"양쪽 광배근이 고르게 발달하도록 반복 횟수를 맞춘 후에만 반대쪽으로 바꾸세요."
],
"Single-arm lat pulldown": [
"운동하는 쪽 어깨가 위로 뻗어 정점에서 완전히 스트레칭되게 하세요.",
"손잡이를 턱까지 당기는 게 아니라 팔꿈치를 골반 쪽으로 내리듯 당기세요.",
"상체를 정면으로 고정하세요 — 케이블 쪽으로 비트는 것 금지.",
"양쪽 반복 횟수를 정확히 맞추세요. 더 약한 쪽 기준으로 개수를 정하세요.",
"하단에서 견갑골을 아래로 당긴 채 잠깐 멈추세요.",
"양팔 랫풀다운보다 가벼운 무게가 정상입니다 — 몸을 기울여 반동 주지 마세요."
],
"Single-arm tricep kickback": [
"엉덩이를 힌지로 접고, 등은 둥글게 말리지 않고 평평하게 유지하세요.",
"위팔을 바닥과 평행하게, 몸통 옆에 고정한 채 유지하세요.",
"팔꿈치에서만 펴세요. 위팔을 흔들어 무게를 들어 올리지 마세요.",
"완전히 편 지점에서 삼두근을 강하게 쥐어짠 후 다시 내리세요.",
"반동이나 골반을 튕겨 덤벨을 위로 흔들어 올리지 마세요.",
"팔을 뒤로 펼 때 숨을 내쉬고, 다시 구부릴 때 숨을 들이쉬세요.",
"무게를 보려고 목을 빼지 말고 중립으로 유지하세요.",
"반대쪽 손을 벤치에 짚어 안정감을 더하세요.",
"이 동작은 레버리지가 불리하므로 예상보다 가벼운 무게를 사용하세요.",
"매 반복 시작 시 팔꿈치를 대략 직각으로 구부린 상태를 유지하세요.",
"무게를 뒤로 차올릴 때 어깨가 들리거나 돌아가지 않게 하세요.",
"팔뚝이 빠르게 떨어지지 않도록 내리는 구간을 제어하세요."
],
"Smith machine Romanian deadlift": [
"일반 루마니안 데드리프트 시작 자세에 맞춰 바를 허벅지 중간 높이에 설정하세요.",
"고정된 수직 궤적을 보완하기 위해 발을 바보다 약간 앞쪽에 두세요.",
"바를 다리를 따라 내릴 때 그냥 아래로 내리지 말고 엉덩이를 뒤로 밀어내세요.",
"허리가 말리기 전, 햄스트링이 한계에 도달하는 지점에서 멈추세요.",
"발뒤꿈치로 밀며 엉덩이를 앞으로 내밀고 둔근을 조여 일어서세요.",
"바가 동작 내내 몸에 가깝게 붙어 움직이게 하세요 — 내려갈 때 다리를 스치듯 지나가야 합니다."
],
"Smith machine bench press": [
"밀어 올릴 때 바가 가슴 중앙 위로 자연스러운 궤적을 그리도록 벤치 위치를 맞추세요.",
"고정된 바 궤적은 프리웨이트 벤치프레스와 다릅니다 — 필요하면 그립 너비를 조정하세요.",
"발을 바닥에 평평하게 붙이고 견갑골을 모아 내린 상태를 유지하세요.",
"바를 제어하며 가슴 중앙까지 내린 후 일직선으로 다시 밀어 올리세요.",
"바를 곧장 위로 밀어 빼지 말고, 회전시켜 안전 훅에서 풀어내세요.",
"각 세트가 끝나면 바를 돌려 안전하게 훅에 다시 걸어두세요."
],
"Smith machine hip thrust": [
"바닥에 앉았을 때 골반 위에 편안하게 걸치도록 스미스 바 높이를 맞추세요.",
"바벨 패드나 폼롤러를 사용해 골반에 닿는 바를 쿠션 처리하세요.",
"발뒤꿈치로 밀며 몸이 일직선이 될 때까지 엉덩이를 위로 밀어 올리세요.",
"정점에서 둔근을 강하게 조이고 한 박자 멈춘 뒤 내리세요.",
"엉덩이를 제어하며 내리세요 — 바가 떨어지거나 몸을 덮치듯 내려오지 않게 하세요.",
"발을 바닥에 평평하게 붙이고 무릎이 동작 내내 발끝 방향과 일직선을 이루게 하세요."
],
"Smith machine inverted row": [
"바를 골반 높이나 그보다 낮게 설정하세요 — 바닥에 가까울수록 동작이 더 어려워집니다.",
"몸을 일직선으로 유지한 채 바 아래에 매달리고, 어깨너비로 그립을 잡으세요.",
"견갑골을 모아 조이며 가슴을 바 쪽으로 끌어올리세요.",
"머리부터 발뒤꿈치까지 몸을 단단하게 유지하세요 — 엉덩이가 바닥 쪽으로 처지면 안 됩니다.",
"팔이 완전히 펴질 때까지 천천히 제어하며 몸을 다시 내리세요.",
"맨몸 로우가 쉬워지면 발을 벤치 위에 올려 난이도를 크게 높이세요."
],
"Smith machine shoulder press": [
"벤치를 90도로 세우고, 바가 턱 높이에서 시작하도록 위치를 맞추세요.",
"어깨 관절 부담을 줄이기 위해 바를 어깨너비보다 약간 넓게 잡으세요.",
"고정된 수직 궤적을 따라 바를 곧장 위로 밀어 올리세요 — 얼굴을 피해 호를 그릴 필요가 없습니다.",
"바를 목 뒤가 아니라 가슴 윗부분 높이까지 내리세요.",
"허리를 벤치 패드에 밀착시키고 과도하게 젖히지 마세요.",
"무거운 무게에서 허리가 과신전되지 않도록 코어를 단단히 조이세요."
],
"Smith machine shrug": [
"바를 허벅지 앞에 두고 팔을 아래로 완전히 편 채 곧게 서세요.",
"어깨를 귀 쪽으로 곧게, 제어된 수직 동작으로 으쓱 올리세요.",
"정점에서 한 박자 수축을 유지해 승모근을 확실히 자극하세요.",
"무게를 툭 떨어뜨리지 말고 어깨를 천천히 시작 자세로 내리세요.",
"팔은 동작 내내 곧게 펴세요 — 슈러그는 이두근 컬이 아니라 승모근 운동입니다.",
"어깨를 원을 그리듯 돌리지 마세요. 장기적으로 어깨 관절에 무리를 줄 수 있습니다."
],
"Smith machine squat": [
"고정된 수직 궤적을 고려해 발을 바보다 약간 앞쪽에 두세요.",
"발을 어깨너비로 벌리고 발끝을 살짝 바깥쪽으로 향하게 하세요.",
"허벅지가 최소 바닥과 평행해질 때까지 앉은 후 다시 밀고 올라오세요.",
"발뒤꿈치로 밀어 올리고 동작 내내 가슴을 곧게 세운 상태를 유지하세요.",
"세트 중 실패했을 때를 대비해 안전 훅을 알맞은 높이에 맞춰두세요.",
"스미스 머신은 균형을 잡을 필요가 없으므로 깊이와 컨트롤에만 온전히 집중하세요."
],
"Smith machine standing calf raise": [
"바를 승모근 윗부분에 걸치고, 발볼(앞꿈치)을 발판 위에 올리세요.",
"발뒤꿈치를 발판 끝에서 늘어뜨려 매 반복 하단에서 완전히 스트레칭되게 하세요.",
"매 반복 전 발뒤꿈치를 최대한 낮춰 스트레칭을 극대화하세요.",
"발볼로 밀어 올라가 정점에서 종아리를 강하게 조이세요.",
"반동을 없애기 위해 매 반복의 정점과 하단에서 잠깐 멈추세요.",
"다리를 동작 내내 완전히 곧게 펴세요 — 무릎을 구부리면 가자미근으로 자극이 옮겨갑니다."
],
"Straight arm cable pulldown": [
"엉덩이를 살짝 앞으로 접고 팔꿈치를 부드럽게 구부린 채 곧게 서세요.",
"팔은 동작 내내 곧게 펴고, 어깨 관절에서만 움직이세요.",
"바를 바닥 쪽으로 곧장 내리지 말고 허벅지 방향으로 호를 그리며 당기세요.",
"하단에서 광배근을 강하게 조인 후 바가 다시 올라가게 하세요.",
"무게가 무거워질수록 팔꿈치를 더 구부리지 마세요. 자극이 삼두근으로 옮겨갑니다.",
"당길 때 허리가 젖혀지지 않도록 코어를 단단히 조이세요.",
"바가 내려갈 때 숨을 내쉬고, 위로 돌아갈 때 숨을 들이쉬세요.",
"정점에서 힘을 풀지 말고 천천히 올라가며 광배근 긴장을 유지하세요.",
"당기는 것을 돕기 위해 몸 전체를 뒤로 젖히지 마세요. 광배근이 일하게 두세요.",
"세트 내내 어깨를 귀에서 멀리 아래로 내리세요.",
"광배근이 팔을 끌어내린다고 상상하며 마인드-머슬 커넥션에 집중하세요.",
"반복 사이에 케이블이 팔을 너무 빠르게 다시 끌어올리지 않게 하세요."
],
"T-bar row": [
"상체를 45도로 접은 힌지 자세를 잡고 세트 내내 그대로 고정하세요.",
"손잡이를 가슴 아랫부분까지 당기며 팔꿈치를 위와 뒤로 밀어내세요.",
"정점에서 견갑골을 한 박자 모아 조이세요.",
"무게를 들려고 몸을 일으키지 마세요 — 그건 등 힘이 아니라 반동입니다.",
"등을 평평하게 유지하세요. 지칠 때 등이 말리는 것이 이 운동에서 가장 큰 부상 위험입니다.",
"다리는 단단히 고정하세요 — 다리는 힘을 내는 엔진이 아니라 지지대입니다."
],
"Tricep dips": [
"팔꿈치가 옆으로 벌어지지 않고 곧게 뒤로 향하게 하세요.",
"위팔이 바닥과 거의 평행해질 때까지 몸을 내리세요.",
"가슴보다 삼두근에 자극을 집중하려면 상체를 곧게 세우세요.",
"내려갈 때 어깨가 귀 쪽으로 으쓱 올라가지 않게 하세요.",
"내려갈 때 숨을 들이쉬고, 다시 밀어 올릴 때 숨을 내쉬세요.",
"어깨 관절에 조이는 느낌이 든다면 내려가는 것을 멈추세요.",
"엉덩이가 처지지 않도록 코어를 단단히 조이세요.",
"한쪽으로 기울지 말고 양 손바닥에 힘을 고르게 실어 미세요.",
"맨몸 반복이 너무 쉬워지면 무게를 추가하거나 무릎을 더 구부리세요.",
"매 반복 정점에서 팔꿈치를 세게 꺾어 잠그지 마세요.",
"손목이 바깥으로 벌어지지 않고 어깨 바로 아래에 오게 하세요.",
"딥스 하단에서 빠르게 튕기지 말고 제어하며 움직이세요."
],
"Triceps pushdown": [
"팔꿈치를 몸통 옆에 고정하고 세트 내내 그 위치를 유지하세요.",
"무게를 올리기 전 가벼운 워밍업 세트로 팔꿈치 위치를 몸에 익히세요.",
"삼두근에 긴장을 유지하려면 어깨가 아니라 엉덩이에서부터 살짝 앞으로 기울이세요.",
"바를 팔이 완전히 펴질 때까지 내리되, 관절을 세게 꺾어 잠그지 마세요.",
"팔뚝이 바닥과 대략 평행해질 때까지만 바가 올라가게 하세요.",
"내릴 때 숨을 내쉬고, 바를 제어하며 올릴 때 숨을 들이쉬세요.",
"체중이나 상체 기울임을 이용해 억지로 무게를 내리누르지 마세요.",
"팔꿈치를 완전히 편 지점에서 잠깐 멈추고 조여 삼두근 수축을 극대화하세요.",
"손목이 바 위에서 꺾이지 않도록 곧고 단단하게 유지하세요.",
"바가 튕기듯 올라가게 두지 말고 이완 구간을 제어하세요.",
"케이블 도르래를 위쪽에 설정해 시작 각도에서 팔꿈치 부담을 최소화하세요.",
"케이블 궤적이 기울지 않고 수직을 유지하도록 케이블 머신에 가깝게 서세요."
],
"Walking lunge": [
"앞쪽 무릎이 발목 위에 오도록 충분히 긴 보폭으로 내디디세요.",
"뒤쪽 무릎을 바닥 쪽으로 내리세요 — 그냥 앞으로 기울이지 마세요.",
"앞발 뒤꿈치로 밀며 다음 런지로 이어서 나아가세요.",
"상체를 곧게 세우세요. 덤벨은 몸통 옆에서 흔들림 없이 매달려 있어야 합니다.",
"매 걸음마다 다리를 번갈아 가세요 — 다리별이 아니라 전체 걸음 수로 세세요.",
"보폭이 짧으면 대퇴사두근에, 보폭이 길면 둔근에 더 자극이 갑니다."
],
"Wide-grip cable row": [
"시작 자세에서 더 멀리 뻗으려고 허리를 둥글게 말지 마세요 — 추가적인 스트레칭은 척추를 굽히는 게 아니라 견갑골을 벌리는 데서 나와야 합니다.",
"당길 때 팔꿈치를 바깥으로 벌리세요. 팔꿈치가 옆구리로 모이면 와이드 그립의 효과가 줄어들어 일반 로우가 되어버립니다.",
"상체를 동작 내내 곧게 세우세요 — 무게를 움직이려고 뒤로 젖히면 등의 역할이 사라지고 허리에 무리가 갈 위험이 있습니다.",
"당기기 마지막에는 광배근뿐 아니라 윗등과 후면 삼각근에 조임을 집중하세요 — 그것이 와이드 그립의 목적입니다.",
"돌아올 때 천천히 제어하세요. 이완 구간에서 윗등이 발달합니다."
]
,
  "Dumbbell standing calf raise": [
    "빈 손으로 안정적인 곳을 잡으세요 — 이 운동은 종아리 운동이면서 동시에 균형 운동이기도 합니다.",
    "매 반복 전에 스텝이 허용하는 만큼 발뒤꿈치를 낮춰 완전히 스트레칭하세요.",
    "발볼로 밀어 올리며 정상에서 최대한 높이 까치발을 들어보세요.",
    "정상에서 잠깐 멈추고 종아리를 힘껏 수축한 뒤 내려오세요.",
    "무릎은 부드럽게 고정하세요 — 움직임은 무릎이 아니라 발목에서 나와야 합니다.",
    "한쪽을 모두 마친 뒤 반대쪽으로 바꾸거나, 덤벨 두 개를 사용한다면 양쪽을 균등하게 실시해 약한 쪽 종아리가 소홀해지지 않게 하세요."
  ],
"Decline barbell bench press": [
"랙에서 바를 빼기 전에 발목을 롤러에 단단히 걸어 고정하세요.",
"플랫 벤치프레스와 달리 바는 하부 가슴까지 내리세요.",
"세트 내내 견갑골을 벤치에 붙이고 고정된 상태를 유지하세요.",
"디클라인 각도로 가동범위는 짧아지지만, 내리는 동작은 서두르지 말고 컨트롤하세요.",
"디클라인 자세는 실패 시 빠져나오기 어려우니 보조자나 세이프티가 있는 랙을 이용하세요.",
"팔꿈치는 몸통에 대해 90도가 아닌 약 45도 각도를 유지하세요."
],
"Barbell floor press": [
"바닥에서는 팔뚝(위팔)이 완전히 바닥에 닿게 하세요. 그게 깊이 기준이지 가슴이 아닙니다.",
"바닥에서의 정지로 모멘텀이 사라지므로, 튕기지 말고 힘 있게 밀어 올리세요.",
"다리는 펴서 힘을 빼세요. 벤치프레스처럼 다리로 밀어 올리는 동작은 없습니다.",
"바닥이 하위 3분의 1 구간을 제한해 주므로 삼두근 락아웃 힘을 기르기에 좋습니다.",
"그립은 어깨보다 살짝 넓게. 다리의 도움이 없는 만큼 너무 넓으면 어깨에 무리가 갑니다.",
"각 반복 전에 호흡을 가다듬고 코어를 조이세요. 바닥에서 튕기는 반동을 쓸 수 없습니다."
],
"Barbell pullover": [
"벤치에는 어깨와 등 윗부분만 올리고 엉덩이는 낮게, 브릿지 자세처럼 유지하세요.",
"팔꿈치는 부드럽게 고정한 채로. 이건 팔꿈치를 굽히는 동작이 아니라 어깨를 축으로 한 움직임입니다.",
"어깨가 아니라 등과 가슴에 진짜 스트레칭을 느낄 때까지 머리 뒤로 내리세요.",
"생각보다 가벼운 중량으로 시작하세요. 이건 근력보다는 스트레칭과 수축을 위한 운동입니다.",
"바를 가슴 위로 다시 올릴 때 숨을 내쉬세요.",
"갈비뼈는 내린 상태를 유지하세요. 가동범위를 늘리려고 벌리면 허리에 부담이 갑니다."
],
"Incline dumbbell fly": [
"세트 내내 팔꿈치 각도를 살짝 굽힌 채 고정하세요. 펴지거나 무너지지 않도록.",
"덤벨이 어깨보다 아래로 떨어질 때까지가 아니라 상부 가슴에 스트레칭이 느껴질 때까지 내리세요.",
"미는 동작이 아니라 통을 껴안는 느낌으로. 호를 그리는 움직임은 어깨에서 나옵니다.",
"정점에서 덤벨을 그냥 맞부딪히지 말고 책을 덮듯이 가슴을 꽉 조여주세요.",
"견갑골은 벤치에 고정한 채로. 앞으로 말리면 어깨 운동이 되어버립니다.",
"플랫 플라이보다 가벼운 중량을 사용하세요. 인클라인 각도는 하단에서 부담을 늘립니다."
],
"Decline dumbbell fly": [
"벤치는 완만한 디클라인으로 설정하세요. 각도가 너무 급하면 세팅이 불안정해집니다.",
"다른 플라이 종목과 마찬가지로 팔꿈치는 살짝 굽힌 채 고정하세요.",
"가슴 높이까지만 내리세요. 디클라인 각도가 이미 안전한 범위를 줄여줍니다.",
"덤벨을 맞부딪히지 말고 정점에서 꽉 수축시키세요.",
"이 운동은 하부 가슴 섬유를 겨냥합니다. 상부를 겨냥하는 인클라인 종목과 함께 하세요.",
"시작 시 보조자에게 덤벨을 건네받으세요. 디클라인 자세에서 혼자 세팅하기는 불안정합니다."
],
"Dumbbell floor press": [
"바닥에서는 삼두근을 바닥에 닿게 하세요. 그게 정지 지점이지 피해야 할 게 아닙니다.",
"발은 바닥에 평평하게 붙이고 코어를 조이세요. 다리로 도와줄 방법이 없습니다.",
"바닥이 가동범위를 제한해주므로 일반 벤치프레스가 어깨에 부담될 때 좋은 대안입니다.",
"정점에서 덤벨을 살짝 서로 붙여가며 밀어 올려 가슴을 완전히 수축시키세요.",
"덤벨은 가슴까지 컬한 다음 뒤로 굴려 세팅하세요. 바닥에서 한번에 들어 올리지 마세요.",
"내리는 동작을 컨트롤하세요. 팔꿈치를 바닥에 떨구듯 내리면 목적을 벗어납니다."
],
"Neutral-grip dumbbell press": [
"반복 내내 손바닥을 서로 마주보게 유지하세요. 일반 덤벨프레스처럼 회전하지 않습니다.",
"이 그립은 어깨에 부담이 적어서 일반 프레스가 관절에 무리라면 좋은 선택입니다.",
"위팔이 벤치와 거의 평행해질 때까지 내리고, 일반 프레스보다 팔꿈치를 몸에 더 붙이세요.",
"정점에서 덤벨이 거의 맞닿도록 살짝 안쪽으로 모으며 밀어 올리세요.",
"발을 바닥에 붙이고 엉덩이에 힘을 줘 안정된 자세를 만드세요.",
"이 뉴트럴 그립은 프로네이티드 그립 프레스보다 삼두근도 조금 더 자극합니다."
],
"Smith machine incline press": [
"중량을 걸기 전에 바 아래에 벤치를 세팅해 바의 궤도가 상부 가슴에 맞도록 하세요.",
"바의 궤도가 고정되어 있으니 균형을 잡기보다 내리는 동작 컨트롤에 집중하세요.",
"상부 가슴/쇄골 부위까지 내리세요. 그게 인클라인 각도가 겨냥하는 부위입니다.",
"발은 바닥에 붙이고 견갑골은 세트 내내 고정하세요.",
"자세를 잡고 코어를 조인 후에만 바를 돌려서 잠금 해제하세요.",
"마시가 안정감을 줘도 팔꿈치는 45~60도 이상 벌리지 마세요."
],
"Machine-assisted dip": [
"스택 중량이 많을수록 보조가 강해집니다. 처음엔 보조를 많이 걸고 점차 줄여가세요.",
"플랫폼 중앙에 무릎을 대어 세트 중 머신이 기울거나 흔들리지 않도록 하세요.",
"가슴을 겨냥하려면 살짝 앞으로 기울고, 삼두근을 겨냥하려면 몸을 곧게 세우세요.",
"위팔이 바닥과 거의 평행해질 때까지 내리세요. 어깨가 불편하면 더 깊이 내려가지 마세요.",
"정점에서 과하게 락아웃하지 말고 밀어 올리세요.",
"강해질수록 보조 중량을 줄여 자기 체중이 더 많이 작용하도록 하세요."
],
"Cable crossover": [
"살짝 앞으로 기울인 자세와 세트 내내 고정된 팔꿈치의 가벼운 굽힘으로 시작하세요.",
"손을 아래로 곧장 내리지 말고 나무를 껴안듯 호를 그리며 아래 안쪽으로 움직이세요.",
"바닥에서 손을 살짝 교차시켜 가슴을 완전히 수축시킨 뒤 리셋하세요.",
"케이블에 몸을 기대야 하니 발을 앞뒤로 벌려 안정된 자세를 만드세요.",
"돌아올 때는 컨트롤하세요. 웨이트 스택에 끌려 급하게 돌아오지 않도록.",
"시작 전 양쪽 도르래 높이가 같은지 핀을 확인하세요."
],
"Cable low-to-high fly": [
"도르래를 낮게 설정하고 손은 엉덩이 옆쪽에서 시작하세요.",
"팔을 위로 안쪽으로 휘두르며 가슴 높이 위에서 손을 모아 마무리하세요.",
"하이 투 로우 크로스오버와 반대로, 이 각도는 상부 가슴 섬유를 겨냥합니다.",
"팔꿈치는 살짝 굽힌 채 고정하세요. 프레스 동작이 되지 않도록.",
"휘두르며 올릴 때 상체를 살짝 앞으로 기울이면 긴장을 어깨가 아닌 가슴에 유지할 수 있습니다.",
"정점에서 잠시 멈춰 수축시킨 후 컨트롤하며 되돌리세요."
],
"Decline push-ups": [
"튼튼한 박스나 벤치에 발을 올리세요. 발이 높을수록 상부 가슴과 어깨 부담이 커집니다.",
"머리부터 발끝까지 일직선을 유지하세요. 엉덩이가 처지거나 솟지 않도록.",
"가슴이 바닥에 거의 닿을 때까지 내리고 팔꿈치는 약 45도 각도로 유지하세요.",
"상체에 체중이 더 실려 일반 푸시업보다 어렵습니다. 자세가 무너지면 플랫 푸시업으로 돌아가세요.",
"허리를 보호하기 위해 세트 내내 코어에 힘을 유지하세요.",
"손목 보호를 위해 손가락 끝이 아니라 손바닥 전체로 바닥을 밀어내세요."
],
"Wide-grip push-ups": [
"손을 어깨너비보다 확실히 넓게, 손가락은 살짝 바깥쪽을 향하게 놓으세요.",
"일반 푸시업보다 가동범위가 짧아지는 게 정상이니 놀라지 마세요.",
"팔꿈치를 평소보다 더 바깥으로 벌려도 됩니다. 이 변형은 의도적으로 삼두근보다 가슴을 우선합니다.",
"몸을 곧은 일직선으로 유지하세요. 넓은 그립에서는 엉덩이가 처지기 쉬우니 코어를 조이세요.",
"빠르게 떨어지지 말고 컨트롤하며 내리세요. 넓은 그립은 속도가 빠르면 어깨 부담이 늘어납니다.",
"어깨가 불편하면 무리하지 말고 그립을 살짝 좁히세요."
],
"Pendlay row": [
"모든 반복의 바닥에서 바는 바닥에 닿습니다. 띄우거나 튕기지 마세요.",
"당기기 전 등을 평평하게, 바닥과 거의 평행하게 세팅하고 세트 내내 유지하세요.",
"바닥에서 폭발적으로 당기며 팔꿈치를 위로 뒤로 움직이세요.",
"이 종목은 저반복으로 매 반복마다 완전히 정지하기 위한 것입니다. 터치 앤 고 로우로 만들지 마세요.",
"머리는 중립 위치를 유지하세요. 목을 위로 뻗어도 얻는 게 없습니다.",
"다음 반복으로 이어지는 반동이 없으므로 매번 당기기 전에 코어를 단단히 조이세요."
],
"Rack pull": [
"바를 걸기 전에 핀을 무릎 높이(원하는 부분 가동범위 시작점)로 설정하세요.",
"이렇게 하면 바닥에서 당기는 것보다 더 무거운 중량으로 데드리프트 상부 구간을 과부하할 수 있습니다.",
"당기는 내내 바를 정강이와 허벅지에 가깝게 유지하세요.",
"뒤로 젖히지 말고 엉덩이를 조여 고관절을 완전히 신전시키세요.",
"정점에서 슈러그로 바꾸지 마세요. 고관절과 무릎이 완전히 펴지면 멈추세요.",
"가동범위가 짧은 만큼 중량을 과하게 걸기 쉬우니 점진적으로 늘리세요."
],
"Yates row": [
"바를 언더핸드(손바닥이 자신을 향하게)로 잡으세요. 그게 일반 바벨 로우와의 차이입니다.",
"펜들레이 로우보다 곧게, 약 45도 상체 각도를 유지하세요.",
"바를 하부 갈비뼈/허리 쪽으로 당기며 팔꿈치를 아래로 뒤로 움직이세요.",
"언더핸드 그립은 자연스럽게 이두근도 더 많이 사용하니 그 부위도 느껴질 겁니다.",
"이 곧은 각도에서 허리를 보호하기 위해 코어를 조이세요.",
"바를 떨어뜨려 어깨를 잡아채지 말고 내리는 동작을 컨트롤하세요."
],
"Chest-supported dumbbell row": [
"팔이 자유롭게 매달릴 수 있는 높이로 벤치를 설정해 가슴이 패드에 딱 붙게 하세요.",
"상체가 고정되어 있으니 모든 힘은 등에서 나옵니다. 몸을 흔들어 반칙할 수 없습니다.",
"덤벨을 엉덩이 쪽으로 당기며 팔꿈치를 뒤로 살짝 바깥으로 움직이세요.",
"정점에서 견갑골을 모은 후 컨트롤하며 내리세요.",
"목은 편안하게, 위를 쳐다보지 말고 척추와 일직선을 유지하세요.",
"허리가 전혀 관여하지 않으니 서서 하는 로우보다 무거운 중량을 다뤄보세요."
],
"Incline dumbbell row": [
"벤치를 급한 인클라인으로 설정하고 가슴을 지지한 채 엎드리세요.",
"시작 시 덤벨을 완전히 늘어뜨려 충분히 스트레칭하세요.",
"팔꿈치를 크게 벌리지 말고 몸에 붙인 채 덤벨을 엉덩이 쪽으로 당기세요.",
"이 각도는 반동을 완전히 배제합니다. 서서 하는 로우와의 차이를 느껴보세요.",
"목을 중립으로 유지하기 위해 이마를 패드에 대거나 아래를 보세요.",
"반복 사이에 웨이트를 떨어뜨리지 말고 컨트롤하며 내리세요."
],
"Kroc row": [
"한쪽 무릎과 손을 벤치에 대어 지지하고, 반대쪽 팔은 무거운 덤벨을 들고 자유롭게 매달리세요.",
"일반 싱글암 로우보다 무겁고 덜 엄격한 종목입니다. 약간의 엉덩이·상체 회전은 정상입니다.",
"다리와 엉덩이로 당기기를 시작하도록 도우며 덤벨을 엉덩이 쪽으로 힘차게 끌어올리세요.",
"이 변형은 척추에 부하가 더 실리니 허리를 항상 조인 상태로 유지하세요.",
"정점에서 어깨가 귀 쪽으로 으쓱 올라가지 않게, 아래로 뒤로 유지하세요.",
"동작에 반동이 실리는 만큼 중량은 점진적으로 늘리세요."
],
"Machine high row": [
"시트 높이를 조절해 핸들이 배가 아닌 상부 가슴 높이에 맞도록 하세요.",
"핸들을 상부 가슴 쪽으로 뒤로 아래로 당기며 팔꿈치를 위로 바깥으로 움직이세요.",
"동작의 끝에서 견갑골을 강하게 모으세요.",
"이 각도는 일반적인 등 중부 로우보다 상부 등과 후면 삼각근을 더 강조합니다.",
"가슴은 패드에 계속 붙여두세요. 추가 가동범위를 위해 뜨지 않도록.",
"웨이트 스택에 팔이 앞으로 끌려가지 않게 되돌리는 동작을 컨트롤하세요."
],
"Machine pullover": [
"머신 팔의 회전축이 어깨 위치에 맞도록 시트를 조절하세요.",
"팔꿈치는 살짝 굽힌 채 고정하세요. 삼두근 프레스가 아니라 광배근 스트레칭·수축 종목입니다.",
"광배근에 완전한 스트레칭을 느낄 때까지 팔이 올라가게 한 후 아래로 당기세요.",
"팔이 아니라 광배근으로 당기며 팔꿈치를 엉덩이 쪽으로 몰아넣는 느낌으로.",
"가슴을 등받이 패드에 붙인 채, 추가 가동범위를 위해 젖히지 마세요.",
"바벨이나 케이블 풀오버가 어깨에 부담이면 이 머신이 좋은 대안입니다."
],
"Cable pullover": [
"도르래를 높게 설정하고 타워에서 편안한 거리를 두고 서거나 무릎을 꿇으세요.",
"바벨 버전처럼 팔꿈치를 살짝 굽힌 채 고정하고 호를 그리며 내리세요.",
"허벅지 높이 정도까지 바를 당겨 내리되, 팔이 아닌 광배근으로 당기는 데 집중하세요.",
"허리를 젖혀 가동범위를 늘리지 말고 갈비뼈를 내리고 코어를 조이세요.",
"일정한 케이블 장력 덕분에 무거운 로우나 풀다운 후 광배근 마무리 운동으로 좋습니다.",
"스트레칭된 위치로 돌아올 때 컨트롤하세요. 웨이트에 끌려 앞으로 튀어나가지 않도록."
],
"Inverted row": [
"몸을 일직선으로 유지하며 도전적인 기울기를 만들 수 있는 높이로 바를 설정하세요.",
"바가 낮을수록 어렵고, 높을수록 쉬워집니다.",
"몸을 머리부터 발끝까지 단단하게 유지하세요. 엉덩이가 바닥으로 처지지 않도록.",
"팔을 굽히기만 하지 말고 팔꿈치를 뒤로 당기며 가슴을 바 쪽으로 끌어올리세요.",
"정점에서 견갑골을 모은 후 컨트롤하며 내리세요.",
"머신이 사용 중일 때 케이블 로우의 좋은 맨몸 대안입니다."
],
"Superman": [
"팔·가슴·다리를 동시에 바닥에서 들어올리세요. 상체나 하체만 드는 게 아니라.",
"강하게 젖히기보다 손끝과 발끝을 멀리 뻗는 느낌을 가지세요.",
"정점에서 잠시 멈춰 엉덩이와 허리를 조인 후 컨트롤하며 내리세요.",
"목은 중립으로 유지하며, 정면이 아니라 앞쪽 바닥을 보세요.",
"이건 저부하 운동입니다. 중량을 추가하기보다 반복 수나 유지 시간을 늘리세요.",
"호흡을 참지 말고 유지하는 내내 평소대로 호흡하세요."
],
"Scapular pull-ups": [
"팔을 완전히 편 채로 매달리세요. 팔꿈치를 굽혀 당기는 동작이 아닙니다.",
"모든 움직임은 견갑골이 아래로 안쪽으로 모이는 데서 나옵니다. 팔을 굽히지 않고요.",
"몇 센티미터만 올라가면 정상입니다. 무리해서 완전한 풀업으로 만들지 마세요.",
"풀업 전 워밍업이나 어깨 컨트롤을 먼저 익히는 초급자 단계 연습으로 좋습니다.",
"어깨를 으쓱하며 내릴 때 몸이 흔들리지 않도록 코어에 힘을 주세요.",
"으쓱한 바닥 지점에서 잠시 멈춘 후 편안한 매달림으로 돌아가세요."
],
"Landmine press": [
"플레이트를 걸기 전 바의 빈 끝을 랜드마인 어태치먼트나 튼튼한 구석에 고정하세요.",
"밀수록 바는 자연스럽게 위로 앞으로 호를 그립니다. 궤도에 저항하지 말고 따라가세요.",
"다리를 앞뒤로 벌린 자세가 똑바로 선 자세보다 안정적인 발판이 됩니다.",
"이 각도는 스트레이트 오버헤드 프레스보다 어깨에 부담이 적어서 일반 프레스가 어깨에 무리라면 좋은 선택입니다.",
"손바닥 전체로 밀고 손목은 팔꿈치 바로 위에 유지하세요.",
"한 손이든 양손이든 바를 밀 수 있습니다. 먼저 양손으로 궤도를 익히세요."
],
"Barbell seated shoulder press": [
"체육관에 등받이 벤치가 있다면 앉아서 하세요. 다리 힘을 제거해 어깨를 더 단독으로 자극합니다.",
"바는 낮은 위치가 아니라 상부 가슴/쇄골 부위에서 시작하세요.",
"앞이 아니라 곧장 위로 밀어 정수리 위에서 바를 마무리하세요.",
"다리 힘이 없는 만큼 코어를 조이세요. 상체 안정은 코어가 담당합니다.",
"매 반복마다 같은 시작 위치까지 컨트롤하며 내리세요.",
"정점에서 끼는 느낌이 든다면 억지로 락아웃하지 말고 살짝 못 미친 지점에서 멈추세요."
],
"Dumbbell scaption raise": [
"덤벨을 대각선으로, 몸 정면이 아니라 약 30도 앞쪽으로 올리세요.",
"올리는 내내 엄지손가락을 살짝 위로 향하게 리드하세요.",
"이 각도는 임핀지먼트 구간을 피할 수 있어 일반 래터럴 레이즈보다 어깨에 편한 경우가 많습니다.",
"어깨 높이까지만 올리세요. 그 이상은 이득 없이 부담만 늘어납니다.",
"래터럴 레이즈보다 가벼운 중량을 쓰세요. 대각선 궤도는 역학적으로 효율이 떨어집니다.",
"팔꿈치는 살짝 굽힌 채, 반동을 이용해 흔들어 올리지 마세요."
],
"Cable Y-raise": [
"시작 전 낮은 도르래에서 케이블을 등 뒤로 교차시켜 대각선으로 당겨지도록 하세요.",
"팔을 위로 바깥으로 올려 엄지를 리드로 머리 위에 넓은 'Y' 모양을 만드세요.",
"팔꿈치를 락하지 말고 동작 내내 살짝 굽힌 채로 유지하세요.",
"이 종목은 하부 승모근과 후면 삼각근을 함께 단련하는 훌륭한 자세 개선용 마무리 운동입니다.",
"가벼운 중량을 사용하세요. 이건 컨트롤과 자세를 위한 운동이지 무거운 리프트가 아닙니다.",
"팔을 올릴 때 어깨가 귀 쪽으로 으쓱 올라가지 않도록 하세요."
],
"Cable front raise": [
"도르래를 낮게 설정하고 타워를 등지고 서세요.",
"팔을 어깨 높이까지 정면으로 곧게 올리고 손바닥은 아래를 향하게 하세요.",
"정점에서 중력의 도움이 없어 덤벨 프론트 레이즈보다 정점에서 더 힘듭니다.",
"상체를 고정하세요. 웨이트를 올리려고 뒤로 젖히지 마세요.",
"케이블에 팔이 뒤로 튕겨나가지 않게 내리는 동작을 컨트롤하세요.",
"번갈아 하거나 양팔을 동시에, 자세가 더 깔끔한 쪽을 선택하세요."
],
"Plate-loaded shoulder press": [
"핸들이 어깨 높이에서 시작하도록 시트 높이를 설정하세요.",
"머신의 고정된 궤도를 따라 핸들을 밀어 올리세요. 웨이트를 직접 균형 잡을 필요가 없습니다.",
"프레스하는 내내 등을 패드에 붙이세요.",
"궤도가 고정되어 있어 초보자가 안전하게 프레스 근력을 기르기에 좋습니다.",
"정점에서 팔꿈치를 과하게 락아웃하지 마세요. 살짝 못 미친 지점에서 멈추세요.",
"웨이트를 떨어뜨리지 말고 컨트롤하며 시작 위치로 돌아가세요."
],
"Drag curl": [
"바가 올라가는 동안 몸에 계속 붙어 있게 하세요. 몸에서 멀어지는 호가 아니라 몸을 따라 끌어올립니다.",
"바가 올라가면서 일반 컬과 달리 팔꿈치가 상체 뒤쪽으로 이동하게 하세요.",
"이 방식은 이두근 뒤쪽에 대한 자극을 늘리고 전면 삼각근 관여를 줄입니다.",
"일반 컬보다 가벼운 중량을 사용하세요. 힘의 곡선이 달라서 정점에서 더 힘듭니다.",
"동작 내내 손목을 곧게 유지하고, 보완하려고 굽히지 마세요.",
"같은 경로로 바를 끌어내리듯 컨트롤하세요."
],
"21s barbell curl": [
"반복 구간을 3등분하세요: 하단 부분 반복 7회, 상단 부분 반복 7회, 그다음 전체 반복 7회.",
"하단 부분 반복은 완전히 편 상태에서 팔꿈치 90도까지입니다.",
"상단 부분 반복은 팔꿈치 90도에서 완전 수축까지입니다.",
"세 구간 내내 팔꿈치를 옆구리에 고정하세요. 앞으로 흘러나오지 않도록.",
"평소 컬보다 가벼운 중량을 사용하세요. 지속적인 긴장이 빠르게 쌓입니다.",
"팔 운동 마지막에 넣으세요. 근력 향상보다는 마무리 운동입니다."
],
"Wide-grip barbell curl": [
"바를 어깨너비보다 확실히 넓게 잡으세요.",
"이 그립은 이두근 내측(단두)에 자극을 더 실어줍니다.",
"그립이 넓어도 팔꿈치는 옆구리에 붙여두세요.",
"일반 컬보다 가동범위가 약간 짧고 제한적일 것으로 예상하세요.",
"중량이 무거워져도 팔꿈치를 앞으로 흘리지 마세요. 그건 반동에 의존한다는 신호입니다.",
"올리는 동작만큼 내리는 동작도 신경 써서 컨트롤하세요."
],
"Zottman curl": [
"손바닥을 위로 향한 일반적인 언더핸드 그립으로 컬을 하세요.",
"정점에서 손목을 회전시켜 내리기 전 손바닥을 아래로 향하게 하세요.",
"손바닥이 아래로 향한 채 천천히 내리세요. 이게 이 종목의 특징으로, 내리는 동작에서 전완을 강하게 자극합니다.",
"바닥에 도달하면 다시 손바닥을 위로 회전시켜 다음 반복을 준비하세요.",
"반전된 내리기 그립이 확연히 더 어려우니 일반 컬보다 가벼운 중량을 사용하세요.",
"컬과 역방향 내리기 동작 모두에서 팔꿈치를 옆구리에 고정하세요."
],
"Spider curl": [
"급경사 인클라인 벤치에 엎드려 팔이 자유롭게 매달리게 하세요.",
"세트 내내 위팔을 벤치 패드에 붙인 채 유지하세요. 흔들지 않도록.",
"이 자세는 반동을 완전히 배제해 엄격한 이두근 단관절 운동이 됩니다.",
"이두근이 완전히 수축될 때까지 컬을 올리세요.",
"천천히 완전히 내리세요. 데드행 바닥 자세가 강한 스트레칭을 만들어줍니다.",
"스탠딩 컬보다 가벼운 중량을 사용하세요. 이 엄격한 자세는 무리한 중량을 용납하지 않습니다."
],
"Cross-body hammer curl": [
"일반 해머 컬처럼 뉴트럴 그립(손바닥이 안쪽)을 동작 내내 유지하세요.",
"덤벨을 곧장 위가 아니라 대각선으로 반대쪽 어깨를 향해 컬하세요.",
"이 각도는 상완근과 전완을 곧은 해머 컬과 약간 다르게 자극합니다.",
"팔꿈치는 몸통 옆에 비교적 고정한 채, 몸을 가로질러 흘러가지 않게 하세요.",
"서두르지 말고 컨트롤하며 팔을 번갈아 하세요.",
"올릴 때와 같은 대각선 경로로 내리세요."
],
"Plate-loaded machine bicep curl": [
"세트 시작 전 위팔을 각도가 있는 패드에 완전히 올려두세요.",
"전완으로만 컬하세요. 패드가 위팔을 고정해 몸을 흔드는 반칙을 할 수 없습니다.",
"머신이 반동을 제거하므로 각 반복의 정점에서 강하게 수축시키세요.",
"플레이트를 떨어뜨려 팔이 곧게 튕기지 않게, 컨트롤하며 내리세요.",
"피로한 상태에서도 엄격한 자세를 유지하기 쉬워 마무리 운동으로 좋습니다.",
"팔꿈치가 머신의 회전축에 맞도록 시트를 조절하세요."
],
"Cable spider curl": [
"도르래를 낮게 설정하고 타워를 향해 급경사 인클라인 벤치에 엎드리세요.",
"덤벨 스파이더 컬과 마찬가지로 위팔을 벤치 패드에 고정하세요.",
"케이블은 덤벨과 달리 바닥에서 느슨해지지 않고 동작 내내 일정한 장력을 유지합니다.",
"완전 수축까지 컬한 후 컨트롤하며 내리세요.",
"생각보다 가벼운 중량을 사용하세요. 일정한 장력 때문에 보이는 것보다 더 힘듭니다.",
"목은 편안하게, 옆으로 두거나 아래를 보세요."
],
"Dumbbell close-grip floor press": [
"일반 플로어 프레스보다 덤벨을 서로 가깝게 붙여 가슴 위에서 구성하세요.",
"내리면서 팔꿈치를 바깥이 아니라 갈비뼈에 붙이세요.",
"바닥에서는 삼두근이 바닥에 닿게 하세요. 그게 깊이 기준입니다.",
"이 변형은 일반 플로어 프레스보다 삼두근에 더 많은 부하를 실어줍니다.",
"정점에서 덤벨을 살짝 모으며 밀어 올려 삼두근을 완전히 수축시키세요.",
"부담을 피하기 위해 손목을 팔꿈치 바로 위에 유지하세요."
],
"Seated machine tricep extension": [
"시작 전 위팔이 패드로 고정되도록 시트를 조절하세요.",
"정점에서 삼두근 수축에 집중하며 팔을 완전히 펴세요.",
"위팔은 동작 내내 고정하세요. 움직이는 건 전완뿐이어야 합니다.",
"웨이트를 떨어뜨리지 말고 컨트롤하며 완전 스트레칭까지 되돌리세요.",
"오버헤드 익스텐션이 팔꿈치에 부담이면 이 머신은 삼두근을 안전하게 단련하는 선택지입니다.",
"중량이 늘어나도 어깨를 으쓱하지 말고 편안하게 내린 상태를 유지하세요."
],
"Bench dips": [
"벤치 가장자리를 엉덩이 바로 뒤에서 손가락이 앞을 향하게 잡으세요.",
"곧장 아래로 내리며 팔꿈치를 옆이 아니라 뒤로 향하게 하세요.",
"위팔이 바닥과 거의 평행해지면 멈추세요. 더 깊이 내려가면 어깨에 부담이 갑니다.",
"엉덩이를 벤치에 가깝게 유지하세요. 발을 너무 멀리 놓으면 어깨 부담이 늘어납니다.",
"맨몸 반복이 쉬워지면 무릎 위에 플레이트를 올리세요.",
"어깨에 끼는 느낌이 들면 무리하지 말고 가동범위를 줄이세요."
],
"Close-grip push-ups": [
"가슴 아래에 손을 가깝게, 엄지와 검지가 거의 닿게 놓으세요.",
"내리면서 팔꿈치를 갈비뼈에 바짝 붙이세요. 이게 삼두근 자극을 늘리는 요인입니다.",
"머리부터 발끝까지 몸을 일직선으로 유지하세요.",
"일반 푸시업보다 손목에 부담이 크니 손목을 곧게 유지하고 뒤로 젖히지 마세요.",
"가슴이 손 바로 위에 올 때까지 내리고 완전히 밀어 올리세요.",
"팔꿈치나 손목이 불편하면 그립을 살짝 넓혀 조정하세요."
],
"Barbell reverse curl": [
"손바닥을 아래로(오버핸드) 향한 그립으로 잡으세요. 일반 컬과 반대입니다.",
"이 그립은 일반 컬보다 전완과 상완근에 자극을 실어줍니다.",
"일반 컬보다 확연히 가벼운 중량을 쓰게 될 겁니다. 이 그립은 훨씬 약합니다.",
"손목을 동작 내내 단단하고 곧게 유지하세요. 부하에 뒤로 꺾이지 않도록.",
"컬하는 내내 팔꿈치를 옆구리에 고정하세요.",
"오버핸드 그립은 내리는 동작 컨트롤이 보기보다 어려우니 신경 써서 내리세요."
],
"Dumbbell finger curl": [
"앉아서 전완을 허벅지에 얹고 손목을 무릎 너머로 살짝 늘어뜨리세요.",
"덤벨을 느슨하게 쥐어 손가락 끝 쪽으로 굴러 내려가게 하세요.",
"손가락을 오므려 핸들을 쥐었다가 다시 펴세요. 손목은 동작 내내 움직이지 않습니다.",
"이건 손목을 움직이는 리스트 컬과 달리 그립 힘 자체를 겨냥합니다.",
"가벼운 중량을 사용하세요. 그립과 손가락 굴근은 빨리 지칩니다.",
"파머스 캐리나 데드행과 함께 하면 그립 전반을 골고루 단련할 수 있습니다."
],
"Cable wrist curl": [
"앉아서 전완을 허벅지에 얹고 손목을 무릎 너머로 살짝 늘어뜨리세요.",
"손목을 편안한 범위까지 위로 컬한 후 컨트롤하며 내리세요.",
"전완을 허벅지에 고정하세요. 움직이는 건 손목뿐이어야 합니다.",
"케이블의 일정한 장력은 정점에서 느슨해지는 덤벨 리스트 컬과 다른 느낌을 줍니다.",
"가벼운 중량으로 반복 수를 늘리세요. 전완은 볼륨에 잘 반응합니다.",
"반복 사이에 웨이트가 손목을 급하게 끌어내리지 않게 하세요."
],
"Cable reverse wrist curl": [
"손바닥을 아래로 향한 채 바를 잡으세요.",
"전완을 허벅지에 얹고 손목을 무릎 너머로 살짝 늘어뜨리세요.",
"손목을 위로 신전시켜 손등을 들어 올린 후 컨트롤하며 내리세요.",
"이건 일반 리스트 컬의 반대쪽, 전완 윗부분을 겨냥합니다.",
"일반 리스트 컬보다 가벼운 중량을 사용하세요. 이 방향은 확연히 약합니다.",
"전완을 동작 내내 정지시키고 손목만 움직이세요."
],
"Bench-supported seated reverse fly": [
"세운 인클라인 패드를 마주 보고 앉아 가슴을 밀착하세요.",
"양손에 덤벨을 들고 팔을 편 채 늘어뜨리세요.",
"팔꿈치를 살짝 굽힌 채 팔을 옆으로 올려 견갑골을 모으세요.",
"가슴 지지가 반동을 완전히 제거해 엄격한 후면 삼각근 단관절 운동이 됩니다.",
"목을 다치지 않게 패드에 머리를 대거나 아래를 보세요.",
"후면 삼각근은 작은 근육이니 생각보다 가벼운 중량을 사용하세요."
],
"Prone dumbbell Y-raise": [
"인클라인 벤치에 엎드려 양손에 가벼운 덤벨을 드세요.",
"팔을 곧장 아래로 늘어뜨리세요.",
"팔을 위로 바깥으로 올려 엄지를 리드로 'Y' 모양을 만드세요.",
"가벼운 중량을 유지하세요. 이건 근력 향상이 아니라 컨트롤과 자세를 위한 운동입니다.",
"올린 정점에서 견갑골을 아래로 안쪽으로 모으세요.",
"목은 편안하게, 척추와 일직선을 유지하세요."
],
"Cable reverse fly": [
"몸 앞에서 케이블을 교차시켜 각 손으로 반대쪽 타워의 핸들을 잡으세요.",
"팔을 바깥으로 뒤로 휘두르며 견갑골을 모으세요.",
"팔꿈치는 락하지 말고 동작 내내 살짝 굽힌 채로 유지하세요.",
"교차된 케이블 경로는 넓은 범위에서 일정한 장력을 만들어 덤벨과 다른 느낌을 줍니다.",
"후면 삼각근은 빨리 지치고 무거운 부하가 필요 없으니 가벼운 중량을 사용하세요.",
"웨이트 스택에 앞으로 끌려가지 말고 교차된 시작 위치로 컨트롤하며 돌아오세요."
],
"Cross-cable reverse fly": [
"시작 전 고관절에서 약 45도 앞으로 숙이고 동작 내내 그 각도를 유지하세요.",
"몸 앞에서 교차해 반대쪽 핸들을 각 손으로 잡으세요.",
"팔을 바깥으로 뒤로 휘두르며 정점에서 견갑골을 모으세요.",
"앞으로 숙인 자세는 곧게 선 자세보다 후면 삼각근 자극을 더 강하게 실어줍니다.",
"이 숙인 각도에서 허리를 보호하기 위해 코어를 조이세요.",
"가벼운 중량으로 템포를 컨트롤하며, 반동으로 흔들지 마세요."
],
"Barbell high pull": [
"바를 허벅지에서 시작해 무릎을 살짝 풀고 고관절을 살짝 숙인 준비 자세를 취하세요.",
"바를 몸에 가깝게 당겨 올리며 팔꿈치가 손보다 먼저 올라가도록 리드하세요.",
"이건 슈러그와 당기기가 결합된 동작이니 컬처럼 팔꿈치를 굽혀 도와주지 마세요.",
"바가 최고점에 도달할 때 발끝으로 서듯 몸을 확장시켜 전신으로 당기세요.",
"중간 정도 중량을 사용하세요. 이 폭발적인 당기기는 무거운 부하보다 속도가 중요합니다.",
"동작 내내 바를 상체에 가깝게 유지하세요. 멀어지면 허리에 부담이 갑니다."
],
"Dumbbell high pull": [
"무릎을 살짝 풀고 허벅지에서 덤벨을 든 준비 자세로 시작하세요.",
"덤벨을 몸에 가깝게 당겨 올리며 팔꿈치가 손보다 먼저 올라가도록 리드하세요.",
"바벨 버전과 같은 슈러그 앤 풀 메커니즘이지만 덤벨이라 손의 궤도가 더 자연스럽습니다.",
"고관절을 펴며 발끝으로 서듯 당기세요.",
"덤벨을 상체에 가깝게 유지하고 바깥으로 흔들리지 않게 하세요.",
"중간 정도 중량으로 최대 부하보다 속도에 집중하세요."
],
"Cable shrug": [
"타워를 마주보고 서서 낮은 도르래 핸들이나 바를 팔을 편 채 잡으세요.",
"팔을 곧게 편 채 어깨를 귀 쪽으로 곧장 으쓱하세요.",
"케이블의 일정한 장력은 덤벨이나 바벨 슈러그와 다른 느낌을 줍니다.",
"정점에서 잠시 멈춘 후 컨트롤하며 내리세요.",
"어깨를 돌리지 말고 곧장 위로 곧장 아래로 으쓱하세요.",
"무릎을 살짝 풀고 코어를 조인 채, 다리로 돕지 마세요."
],
"Plate-loaded shrug": [
"머신 프레임 안에 서서 팔을 편 채 사이드 핸들을 잡으세요.",
"머신의 로딩된 암이 어깨와 함께 올라가도록 곧장 으쓱하세요.",
"고정된 궤도 덕분에 프리웨이트 균형을 신경 쓰지 않고 슈러그에만 집중할 수 있습니다.",
"정점에서 잠시 멈춘 후 컨트롤하며 내리세요.",
"대부분의 사람이 덤벨로 안전하게 다루는 것보다 더 무거운 중량을 실을 수 있습니다.",
"슈러그 중 머리를 앞뒤로 기울이지 말고 중립을 유지하세요."
],
"Barbell walking lunge": [
"백스쿼트처럼 바벨을 상부 등에 얹으세요. 목이 아닙니다.",
"컨트롤하며 앞으로 걸음을 내딛고 뒤쪽 무릎을 바닥에 닿지 않을 정도로 내리세요.",
"앞발 뒤꿈치로 밀어 일어서며 곧바로 다음 런지로 발을 내딛으세요. 발을 리셋하지 마세요.",
"동작 내내 상체를 곧게 유지하세요. 바를 진 채 앞으로 기울면 균형 위험이 있습니다.",
"이동하는 종목이니 충분한 공간을 확보하세요.",
"균형과 컨트롤이 익숙해질 때까지 스테이셔너리 런지보다 가벼운 중량으로 시작하세요."
],
"Barbell step-up": [
"바벨을 상부 등에 얹은 후 박스 앞에 서세요.",
"무릎이 90도를 크게 넘지 않는 높이의 박스를 선택하세요.",
"바닥을 미는 뒷다리가 아니라 딛는 발의 뒤꿈치로 밀어 올리세요.",
"박스 위에서 완전히 일어선 후 내려오세요.",
"동작 내내 상체를 높이 세우세요. 앞으로 기울여 반동을 만들지 마세요.",
"박스에서 뛰어내리지 말고 컨트롤하며 내려오세요."
],
"Box squat": [
"박스에 앉았을 때 허벅지가 평행이나 살짝 그 아래가 되는 높이로 설정하세요.",
"앉듯이 내려가 실제로 박스에 앉고, 바닥에서 잠시 고관절을 이완한 후 밀어 올리세요.",
"박스 쪽으로 앉는 동안 정강이를 최대한 수직으로 유지하세요.",
"박스에서 튕기지 말고 멈춘 후 컨트롤하며 밀어 올리세요.",
"고관절을 뒤로 앉히는 법을 익히고 완전 정지 상태에서의 근력을 기를 수 있습니다.",
"신전 반사의 도움이 없으니 정지 구간 내내 코어를 조이세요."
],
"Dumbbell front squat": [
"덤벨을 각 어깨에 세로로 얹고 끝이 전면 삼각근에 닿게 하세요.",
"바벨 프론트 스쿼트처럼 팔꿈치를 위로 앞으로 향하게 유지하세요.",
"백스쿼트보다 상체를 곧게 유지하며 스쿼트하세요.",
"내려가면서 무릎을 앞으로 바깥으로, 발끝 방향으로 움직이세요.",
"바벨 랙이 비어있지 않을 때 프론트 스쿼트 패턴을 연습하는 좋은 방법입니다.",
"코어를 단단히 조이세요. 전방 부하는 느슨한 코어를 용납하지 않습니다."
],
"Dumbbell reverse lunge": [
"앞이 아니라 뒤로 발을 내딛으세요. 포워드 런지보다 무릎에 부담이 적습니다.",
"뒤쪽 무릎을 바닥에 부딪히지 않게 내리세요.",
"뒤로 내딛는 동안 체중 대부분을 앞다리에 실으세요.",
"뒷발이 아니라 앞발로 밀어 일어서세요.",
"상체를 곧게 유지하세요. 앞으로 기울면 원하는 부위에서 부담이 빠져나갑니다.",
"포워드 런지가 무릎에 부담이면 이건 종종 좋은 대안이 됩니다."
],
"Heel-elevated dumbbell squat": [
"시작 전 작은 웨지나 원판 몇 개를 뒤꿈치 아래에 놓으세요.",
"이 거상은 더 곧게 앉으며 무릎을 더 앞으로 낼 수 있게 해 대퇴사두근 자극을 강조합니다.",
"뒤꿈치 거상이 역학을 바꾸므로 일반 스쿼트보다 스탠스를 좁게 하세요.",
"발목 가동성이 일반 스쿼트에서 깊이를 제한하는 사람에게 좋은 선택지입니다.",
"허벅지가 평행이나 그 아래가 될 때까지 내려가고 상체는 계속 곧게 유지하세요.",
"뒤꿈치가 들려 있어도 발 전체로 밀어 일어서세요."
],
"Belt squat": [
"중량을 언랙하기 전에 힙 벨트를 채우고 플랫폼 위에 곧게 서세요.",
"부하가 고관절에서 매달리므로 척추에는 부하가 전혀 실리지 않아 백스쿼트가 허리에 부담일 때 좋은 선택지입니다.",
"손은 자유롭게 하거나 사이드 레일에 가볍게 얹고, 잡아당기지 마세요.",
"상체를 곧게 유지한 채 스쿼트하며 벨트의 부하가 다리 사이를 지나가게 하세요.",
"발 전체로 밀어 일어서세요.",
"까다로운 허리를 관리하면서도 다리를 계속 강하게 훈련하는 좋은 방법입니다."
],
"Pendulum squat": [
"시작 전 어깨를 패드 아래에 위치시키고 발을 각도가 있는 플랫폼에 올리세요.",
"회전하는 암 덕분에 가동범위에 따라 저항이 변하며, 내려갈수록 더 무거워집니다.",
"스쿼트하는 내내 등을 패드에 붙이세요.",
"이 머신은 궤도가 고정되어 있어 매우 컨트롤되고 관절에 부드러운 스쿼트 패턴을 가능하게 합니다.",
"컨트롤하며 내려가세요. 머신의 저항 곡선은 느리고 신중한 하강 구간에 보상을 줍니다.",
"발 전체로 밀어 호를 완성하며 일어서세요."
],
"Vertical leg press": [
"무릎을 가슴 쪽으로 당기고 머리 위 플랫폼에 발을 얹은 채 등을 대고 누우세요.",
"무릎이 완전히 락되기 직전까지 플랫폼을 곧장 밀어 올려 다리를 폅니다.",
"이 각도는 45도 레그프레스보다 체중이 더 많이 저항에 실립니다.",
"허리를 패드에 계속 붙이세요. 패드에서 떠서 말리지 않도록.",
"가슴 쪽으로 급하게 내려오지 않게 플랫폼을 컨트롤하며 완전한 범위로 되돌리세요.",
"수직 각도는 무겁게 느껴지니 일반 레그프레스보다 가벼운 중량으로 시작하세요."
],
"Bodyweight squat": [
"내려가면서 팔을 앞으로 뻗어 체중의 균형을 잡으세요.",
"가슴을 세우고 뒤꿈치를 바닥에 붙인 채 엉덩이를 뒤로 아래로 앉히세요.",
"좋은 자세를 유지할 수 있는 범위 내에서 가동성이 허락하는 만큼 깊게 내려가세요.",
"이건 다른 모든 스쿼트 변형의 기초 동작입니다. 중량을 더하기 전에 완벽히 익히세요.",
"발 전체로 바닥을 밀어내며 일어서세요.",
"초급자 전용이 아니라 워밍업이나 고반복 마무리 운동으로도 활용하세요."
],
"Jump squat": [
"팔을 뒤로 휘두르며 쿼터 스쿼트 자세로 힘을 모으세요.",
"팔을 앞으로 위로 휘두르며 최대한 강하게 위로 폭발적으로 뛰세요.",
"무릎을 굽혀 충격을 흡수하며 부드럽게 착지하세요.",
"파워를 기르는 것이라면 바로 다음 점프로 튕기지 말고 반복마다 완전히 리셋하세요.",
"이건 파워와 컨디셔닝 운동입니다. 반복은 적당히, 질은 높게 유지하세요.",
"가능하다면 어느 정도 충격을 흡수하는 바닥에서 하세요. 콘크리트 바닥은 관절에 가혹합니다."
],
"Wall sit": [
"벽에 등을 대고 미끄러져 내려가 허벅지가 바닥과 거의 평행해질 때까지 내려가세요.",
"무릎을 발끝 앞으로 밀지 말고 발목 바로 위에 유지하세요.",
"유지하는 내내 등 전체를 벽에 밀착하세요.",
"호흡을 참지 말고 유지하는 내내 평소대로 호흡하세요.",
"이건 정적인 아이소메트릭 유지 운동입니다. 반복 수가 아니라 유지 시간으로 관리하세요.",
"맨몸 유지가 쉬워지면 무릎 위에 가벼운 덤벨을 올리세요."
],
"Barbell good morning": [
"스쿼트처럼 바벨을 상부 등에 얹고 곧게 서세요.",
"무릎을 부드럽게 고정한 채 고관절에서 힌지하세요.",
"등을 평평하게 유지하며 상체가 바닥과 거의 평행해질 때까지 내려가세요.",
"동작 내내 등을 평평하게 유지하세요. 바를 진 채 등이 말리는 건 정말 부상 위험이 있습니다.",
"아주 가벼운 중량으로 시작하세요. 이 종목은 무리한 중량을 용납하지 않으며 허리와 햄스트링에 큰 부하가 실립니다.",
"상체가 바닥과 평행에 이르거나 햄스트링이 뻣뻣하다면 더 일찍 하강을 멈추세요."
],
"Sumo deadlift": [
"발끝을 바깥으로 향한 넓은 스탠스를 취하고 무릎 안쪽에서 바를 잡으세요.",
"당기기 전 자세를 잡으며 무릎을 발끝 방향으로 바깥으로 밀어내세요.",
"이 스탠스는 컨벤셔널 데드리프트보다 더 곧게 서므로 대퇴사두근과 내전근에 부하가 더 실리는 경향이 있습니다.",
"바가 바닥에서 떨어질 때 고관절과 어깨를 함께 신전시키세요.",
"당기는 내내 바를 몸에 가깝게 유지하세요.",
"뒤로 젖히지 말고 엉덩이를 조여 정점을 마무리하세요."
],
"Stiff-leg deadlift": [
"동작 내내 다리를 거의 완전히 편 상태로 유지하세요. 아주 살짝만 무릎을 굽힙니다.",
"고관절에서 앞으로 숙이며 바를 다리에 가깝게 내리세요.",
"햄스트링에 강한 스트레칭이 느껴질 때, 보통 정강이 높이 정도에서 멈추세요.",
"등을 평평하게 유지하세요. 이 변형은 등이 말리면 허리에 더 많은 부담을 줍니다.",
"무릎이 거의 굽혀지지 않으니 루마니안 데드리프트보다 햄스트링을 더 강하게 겨냥합니다.",
"일반 데드리프트보다 가벼운 중량을 사용하세요. 곧은 다리 자세는 역학적으로 불리합니다."
],
"Single-leg dumbbell RDL": [
"시작 전 한 다리로 곧게 서서 양손에 덤벨을 드세요.",
"고관절에서 앞으로 숙이며 자유로운 다리를 곧장 뒤로 뻗어 상체와 'T'자 모양을 만드세요.",
"동작 내내 지지하는 다리의 무릎을 살짝 굽힌 채, 완전히 잠그지 마세요.",
"고관절을 바닥과 평행하게 유지하세요. 숙일 때 회전하며 열리지 않도록.",
"이건 근력만큼 균형 운동이기도 합니다. 익히는 동안 약간 흔들리는 게 정상입니다.",
"햄스트링 유연성과 균형이 허락하는 만큼만 덤벨을 내리세요."
],
"Dumbbell sumo deadlift": [
"단일 덤벨을 양손으로 다리 사이에서 세로로 잡으세요.",
"스모 데드리프트처럼 발끝을 바깥으로 향한 넓은 스탠스를 취하세요.",
"일어서는 동안 덤벨을 몸에 가깝게 유지하세요.",
"발 전체로 밀어 일어서며 정점에서 엉덩이를 조이세요.",
"등을 평평하게 유지하세요. 덤벨에 닿으려고 등을 말지 마세요.",
"바벨 세팅이 없을 때 스모 패턴을 연습하는 좋은 선택지입니다."
],
"Standing machine hamstring curl": [
"시작 전 가슴 패드에 기대어 지지하세요.",
"한쪽 발목을 패드가 달린 롤러 뒤에 걸고 다리를 곧장 아래로 폅니다.",
"뒤꿈치를 엉덩이 쪽으로 컬하세요.",
"정점에서 수축시킨 후 컨트롤하며 내리세요.",
"안정을 위해 지지하는 다리는 락하지 말고 부드럽게 유지하세요.",
"컬을 돕기 위해 엉덩이를 뒤로 밀지 마세요. 그건 반동에 의존한다는 신호입니다."
],
"Cable pull-through": [
"도르래를 낮게 설정하고 타워를 등진 채 로프를 다리 사이에 걸치세요.",
"고관절에서 앞으로 숙이며 로프가 손을 다리 사이 뒤쪽으로 당기게 하세요.",
"동작 내내 등을 평평하게, 무릎은 부드럽게 굽힌 채로 유지하세요. 이건 스쿼트가 아니라 힌지입니다.",
"고관절을 힘차게 앞으로 밀어 일어서며 정점에서 엉덩이를 조이세요.",
"로프가 스윙하는 동안 몸에 가깝게 유지하세요.",
"데드리프트에 중량을 싣기 전 힙 힌지 패턴을 배우는 좋은 방법입니다."
],
"B-stance barbell hip thrust": [
"상부 등을 벤치에 대고 바벨을 엉덩이에 얹으세요.",
"발을 앞뒤로 벌리고 체중 대부분을 평평하게 딛은 발에 실으세요.",
"일하는 다리로 고관절을 완전히 신전시켜 그쪽 엉덩이를 강하게 조이세요.",
"이렇게 하면 완전한 싱글 레그로 가지 않고도 좌우 근력 차이를 다룰 수 있습니다.",
"정점에서 턱을 살짝 당기고 목을 과신전시키지 마세요.",
"엉덩이를 떨어뜨리지 말고 컨트롤하며 시작 위치로 돌아가세요."
],
"Barbell glute bridge": [
"바닥에 등을 대고 누워 바벨을 엉덩이에 얹고 무릎을 굽히세요.",
"엉덩이를 곧장 위로 밀어 올려 정점에서 엉덩이를 강하게 조이세요.",
"상부 등과 머리는 동작 내내 바닥에 붙여두세요. 이게 힙 스러스트와의 차이입니다.",
"가동범위가 힙 스러스트보다 짧으니 벤치가 없을 때 좋은 선택지입니다.",
"턱을 살짝 당기고 정점에서 허리를 과신전시키지 마세요.",
"엉덩이를 바닥으로 떨어뜨리지 말고 컨트롤하며 내리세요."
],
"Curtsy lunge": [
"한쪽 다리를 대각선 뒤로, 반대쪽 다리 뒤로 교차시켜 커트시하듯 내딛으세요.",
"내려가는 동안 체중 대부분을 앞다리에 실으세요.",
"이 각도는 일반 런지와 다르게 엉덩이, 특히 중둔근을 자극합니다.",
"동작 내내 상체를 곧게 유지하고 엉덩이는 정면을 향하게 하세요.",
"앞발 뒤꿈치로 밀어 일어서세요.",
"처음엔 균형이 어려운 게 정상입니다. 곧은 런지보다 자연스럽지 않은 동작이기 때문입니다."
],
"Dumbbell single-leg hip thrust": [
"상부 등을 벤치에 대고 단일 덤벨을 엉덩이에 얹으세요.",
"한 발은 바닥에 평평하게, 다른 다리는 곧게 무부하로 앞에 뻗으세요.",
"지지하는 발로 고관절을 완전히 신전시키며 자유로운 다리를 곧게 유지하세요.",
"이건 한 번에 한쪽 엉덩이를 단련하고 좌우 근력 차이를 드러냅니다.",
"고관절을 수평으로 유지하세요. 무부하 쪽이 처지거나 회전하지 않도록.",
"한 쪽씩 작업하니 양다리 버전보다 가벼운 중량을 사용하세요."
],
"45-degree hip extension machine": [
"엉덩이를 패드 윗부분에 두고 발목을 롤러 아래에 고정하세요.",
"햄스트링에 스트레칭을 느낄 때까지 등을 평평하게 유지하며 아래로 숙이세요.",
"어깨부터 발목까지 몸이 일직선이 될 때까지 일어나세요. 그 이상 젖히지 마세요.",
"맨몸 버전은 팔을 가슴에 모으고, 부하를 더하려면 원판을 드세요.",
"허리만이 아니라 정점에서 엉덩이를 조이세요.",
"무릎에 부드러우면서 엉덩이와 햄스트링을 기르는 훌륭한 종목입니다."
],
"Standing plate-loaded glute kickback": [
"머신에 서서 프레임으로 몸을 지지하세요.",
"한쪽 발을 로딩된 플랫폼에 놓으세요.",
"일하는 다리를 곧장 뒤로 위로 움직여 정점에서 엉덩이를 강하게 조이세요.",
"상체는 안정되게, 살짝만 숙이고 킥을 돕기 위해 흔들지 마세요.",
"엉덩이를 정면으로 유지하고 일하는 쪽으로 열지 마세요.",
"웨이트 스택에 떨어지지 말고 컨트롤하며 시작 위치로 돌아가세요."
],
"Single-leg glute bridge": [
"등을 대고 누워 한쪽 무릎을 굽혀 발을 평평하게 놓으세요.",
"다른 다리를 곧게 뻗으세요.",
"지지하는 발로 엉덩이를 올리며 뻗은 다리를 곧고 안정되게 유지하세요.",
"일하는 다리의 엉덩이를 정점에서 강하게 조이세요.",
"고관절을 수평으로 유지하세요. 무부하 쪽이 처지지 않도록.",
"기구 없이 한쪽씩 엉덩이 근력을 기르는 훌륭한 방법입니다."
],
"Frog pump": [
"등을 대고 누워 발바닥을 맞대고 무릎을 넓게 벌리세요.",
"무릎을 넓게, 발바닥을 맞댄 채로 계속 유지하세요.",
"외회전된 고관절 각도로 엉덩이를 강렬하게 자극합니다.",
"레페티션을 서두르지 말고 정점에서 강하게 조여 엉덩이를 완전히 수축시키세요.",
"가동범위가 짧으니 이 종목은 높은 반복 범위에서 잘 반응합니다.",
"정점에서 허리가 과도하게 젖혀지지 않도록 하세요."
],
"Donkey kicks": [
"등을 평평하게, 처지거나 젖혀지지 않게 하여 네발 기기 자세로 시작하세요.",
"한쪽 무릎을 90도 고정 각도로 굽힌 채 유지하세요.",
"뒤꿈치로 밀어내듯 발을 천장을 향해 차올리세요.",
"정점에서 엉덩이를 조이고, 허리를 젖혀 높이를 더 벌지 마세요.",
"동작 내내 고관절을 바닥과 수평으로 유지하세요. 열리지 않도록.",
"이건 저부하 운동입니다. 속도보다 마인드-머슬 커넥션에 집중하세요."
],
"Barbell standing calf raise": [
"박스에 오르기 전 스쿼트처럼 바벨을 상부 등에 얹으세요.",
"발 앞쪽 볼을 작은 블록에 올리고 뒤꿈치를 뒤로 늘어뜨려 서세요.",
"올라가기 전 뒤꿈치를 블록보다 낮게 내려 완전한 스트레칭을 만드세요.",
"발끝으로 최대한 높이 서서 정점에서 종아리를 강하게 조이세요.",
"동작 내내 다리는 비교적 곧게 유지하세요. 이건 스쿼트가 아닙니다.",
"바로 내려오지 말고 각 반복의 정점에서 잠시 멈추세요."
],
"Single-leg dumbbell calf raise": [
"한 손에 덤벨을 들고 다른 손은 벽이나 랙에 가볍게 대어 균형을 잡으세요.",
"작은 블록 위에 한쪽 발로 서서 뒤꿈치를 뒤쪽 가장자리에서 늘어뜨리세요.",
"올라가기 전 뒤꿈치를 블록보다 낮게 내려 완전한 스트레칭을 만드세요.",
"발끝으로 최대한 높이 서서 정점에서 종아리를 조이세요.",
"한쪽씩 훈련하면 좌우 종아리 근력 차이를 드러내고 교정할 수 있습니다.",
"세트 내내 사용하지 않는 다리를 바닥에서 들고 있으세요."
],
"Dumbbell seated calf raise": [
"벤치에 앉아 발을 작은 블록에 올리고, 각 무릎 위에 덤벨을 세워 균형 잡으세요.",
"올라가기 전 뒤꿈치를 블록보다 낮게 내려 완전한 스트레칭을 만드세요.",
"덤벨을 균형 있고 안정적으로 유지하며 발끝으로 서세요.",
"앉은 각도는 서서 단련하는 큰 종아리 근육보다 가자미근에 부하를 옮깁니다.",
"손은 덤벨이 기울지 않게 지지하는 데 쓰고, 들어 올리는 데 쓰지 마세요.",
"각 반복의 정점에서 완전한 수축을 위해 잠시 멈추세요."
],
"Donkey calf raise machine": [
"고관절에서 앞으로 숙이고 머신의 로딩된 패드 아래에 허리를 고정하세요.",
"발 앞쪽 볼을 플랫폼에 올리고 뒤꿈치를 가장자리에서 늘어뜨리세요.",
"올라가기 전 뒤꿈치를 내려 완전한 스트레칭을 만드세요.",
"이 숙인 자세는 스트레칭을 만들어내기 때문에 가장 효과적인 종아리 각도 중 하나로 꼽힙니다.",
"다리는 비교적 곧게 유지하고 발목이 일하게 하세요.",
"지지대는 균형을 위해 잡고 웨이트를 드는 데 쓰지 마세요."
],
"Standing bodyweight calf raise": [
"작은 계단의 가장자리에 발 앞쪽 볼을 올리고 뒤꿈치를 늘어뜨려 서세요.",
"올라가기 전 뒤꿈치를 계단보다 낮게 내려 깊은 스트레칭을 만드세요.",
"발끝으로 최대한 높이 서서 정점에서 잠시 멈추세요.",
"필요하면 균형을 위해 벽에 가볍게 손을 대되, 손으로 들어 올리는 걸 돕지 마세요.",
"기구가 전혀 필요 없는 훌륭한 워밍업이나 고반복 마무리 운동입니다.",
"맨몸 반복이 너무 쉬워지면 바로 중량을 더하지 말고 템포를 늦추세요."
],
"Single-leg bodyweight calf raise": [
"작은 계단 가장자리에 한쪽 발로 서서 뒤꿈치를 뒤로 늘어뜨리세요.",
"뒤꿈치를 내려 완전한 스트레칭을 만든 후 발끝으로 최대한 높이 서세요.",
"사용하지 않는 발은 세트 내내 바닥에서 들고 있으세요.",
"한쪽 종아리로 전체 체중을 지탱하니 양다리 버전보다 확연히 어렵습니다.",
"벽을 붙잡아 돕지 말고 균형을 위해 가볍게 대세요.",
"맨몸 반복이 쉬워지면 한 손에 덤벨을 드세요."
],
"Side-lying dumbbell hip adduction": [
"옆으로 누워 위쪽 다리를 굽히고 발을 아래쪽 다리 앞에 놓으세요.",
"가벼운 덤벨을 아래쪽 곧은 다리의 발목에 올리세요.",
"아래쪽 다리를 곧장 위로, 굽힌 위쪽 다리를 향해 올리세요. 그게 일하는 동작입니다.",
"올리는 다리는 무릎을 굽히지 말고 곧게 유지하세요.",
"이건 대부분의 훈련 계획에서 소홀히 다루는 내전근을 겨냥합니다.",
"내전근은 대퇴사두근이나 햄스트링보다 작은 근육군이니 가벼운 중량을 사용하세요."
],
"Cable hip adduction": [
"타워에서 먼 쪽 다리에 발목 커프를 채우고 타워를 향해 옆으로 서세요.",
"그 다리를 몸 정중선을 넘어 바깥으로 올린 위치에서 시작하세요.",
"다리를 몸 안쪽으로, 지지하는 다리를 지나 움직이세요.",
"다리를 반동으로 휘두르지 말고 머신 프레임을 잡아 균형을 잡으세요.",
"다리를 움직이는 데 도움 되려고 상체를 기울이지 말고 곧게 유지하세요.",
"좌우 반복 수를 맞춰 바꾸며 양쪽 다리를 균형 있게 단련하세요."
],
"Sumo squat hold": [
"발끝을 바깥으로 향한 넓은 스탠스를 취한 후 스쿼트로 내려가세요.",
"허벅지가 평행이 될 때까지 내려가 그 자세를 유지하세요.",
"유지하는 내내 무릎을 발끝 방향으로 바깥으로 향하게 유지하세요.",
"상체를 곧게 유지하고 앞으로 기울지 마세요.",
"맨몸 유지가 쉬워지면 가슴 앞에 단일 덤벨을 들어 난이도를 높이세요.",
"호흡을 참지 말고 유지하는 내내 평소대로 호흡하세요."
],
"Cable hip abduction": [
"타워에서 가까운 쪽 다리에 발목 커프를 채우고 타워를 향해 옆으로 서세요.",
"그 다리를 지지하는 다리 앞에서 살짝 교차시킨 위치에서 시작하세요.",
"다리를 몸에서 멀어지는 방향으로, 편안한 범위까지 바깥으로 휘두르세요.",
"몸을 기울여 도우려 하지 말고 머신 프레임으로 균형을 잡으세요.",
"이건 걷거나 뛸 때 고관절 안정에 중요한 바깥쪽 고관절(외전근)을 겨냥합니다.",
"좌우 반복 수를 맞춰 바꾸며 양쪽 고관절을 균형 있게 단련하세요."
],
"Side-lying leg raise": [
"다리를 곧게 겹쳐 옆으로 누우세요.",
"위쪽 다리를 곧장 위로 올리세요. 앞으로 흔들지 말고 몸과 일직선을 유지하며.",
"고관절을 뒤로 굴리지 말고, 엉덩이를 겹친 채로 올리세요.",
"떨어뜨리지 말고 컨트롤하며 내리세요.",
"기구 없이 바깥쪽 고관절을 겨냥하는 훌륭한 방법입니다.",
"맨몸 반복이 쉬워지면 발목 웨이트를 추가하세요."
],
"Clamshells": [
"무릎을 굽혀 겹치고 발을 붙인 채 옆으로 누우세요.",
"위쪽 무릎을 경첩처럼 여는 동안 발은 계속 붙여두세요.",
"고관절을 겹친 채 정지시키세요. 여분의 가동범위를 만들려고 엉덩이를 뒤로 굴리는 게 가장 흔한 실수입니다.",
"이건 소홀히 다뤄지기 쉬운 중둔근을 특히 겨냥합니다.",
"맨몸 반복이 쉬워지면 허벅지에 가벼운 저항 밴드를 두르세요.",
"무릎을 세게 열지 말고 천천히 컨트롤하며 움직이세요."
],
"Standing hip abduction": [
"벽이나 의자에 가볍게 손을 대고 곧게 서세요.",
"한쪽 다리를 곧게 편 채 옆으로 곧장 올리세요.",
"동작 내내 상체를 곧게 유지하세요. 올린 다리에서 멀어지도록 기울여 반칙하지 않도록.",
"떨어뜨리지 말고 컨트롤하며 내리세요.",
"맨몸 반복이 쉬워지면 가벼운 발목 밴드를 추가하세요.",
"기구 없이 어디서든 고관절 안정성을 훈련할 수 있는 편리한 종목입니다."
],
"Dumbbell side bend": [
"단일 덤벨을 한 손에 들고 몸 옆에 늘어뜨리세요.",
"덤벨 쪽으로 곧장 옆으로 굽히세요. 비틀거나 앞으로 기울지 말고 한 평면에서만 움직이세요.",
"굽힘의 바닥에서 반대쪽 상체에 스트레칭을 느끼세요.",
"이건 일하는 쪽의 복사근을 겨냥합니다.",
"동작 내내 코어를 조여, 허리만 일하지 않도록 하세요.",
"손을 바꿔 반복 수를 맞추며 양쪽을 균등하게 단련하세요."
],
"Weighted sit-up": [
"단일 덤벨이나 원판을 양손으로 가슴에 든 채 동작 내내 유지하세요.",
"웨이트를 가슴에 꽉 고정하세요. 앞으로 흘러나오면 허리에 부담이 늘어납니다.",
"반동이 아니라 복근으로 상체를 앉은 자세까지 완전히 말아 올리세요.",
"발을 바닥에 평평하게 두거나 안정된 것에 고정하세요.",
"빠르게 떨어지지 말고 컨트롤하며 내리세요.",
"맨몸 싯업이 너무 쉬워졌을 때만 중량을 추가해 난이도를 높이세요."
],
"Cable woodchopper": [
"도르래를 높게 설정하고 타워를 향해 옆으로 서서 양손으로 핸들을 한쪽 어깨 근처에서 잡으세요.",
"상체를 회전시켜 핸들을 대각선으로 아래로, 몸 반대쪽 엉덩이 쪽으로 당기세요.",
"고관절도 상체와 함께 회전하게 하세요. 이건 팔로만 당기는 게 아니라 전신 회전 운동입니다.",
"동작 내내 팔은 비교적 곧게 유지하세요. 힘은 팔이 아니라 코어의 회전에서 나옵니다.",
"케이블에 튕겨나가지 말고 시작 위치로 컨트롤하며 돌아오세요.",
"좌우 반복 수를 맞춰 바꾸며 양방향 회전을 균형 있게 단련하세요."
],
"Captains chair leg raise": [
"전완을 패드가 있는 암레스트에 얹고 등을 패드에 밀착하세요.",
"다리를 앞으로 들어 올리며 무릎을 가슴 쪽으로 굽히거나, 곧게 유지해 더 어렵게 만드세요.",
"동작 내내 상체를 정지시켜 패드에 고정하세요. 반동을 만들려고 흔들지 마세요.",
"떨어뜨리지 말고 컨트롤하며 내리세요.",
"행잉 레그레이즈가 그립에 너무 힘들다면 좋은 대안입니다.",
"각 반복의 정점에서 골반을 살짝 말아 더 깊은 복근 수축을 얻으세요."
],
"Hollow body hold": [
"등을 대고 누운 후 어깨와 다리를 동시에 바닥에서 들어 올리세요.",
"팔을 머리 위로 뻗고 다리를 곧게 펴세요.",
"유지하는 내내 허리를 바닥에 누른 채로 유지하세요. 그게 주요 체크포인트입니다.",
"다리를 바닥에 더 가깝게 하면 어려워지고, 무릎을 굽히면 쉬워집니다.",
"호흡을 참지 말고 유지하는 내내 평소대로 호흡하세요.",
"이건 체조의 기본 코어 자세입니다. 반복 수가 아니라 유지 시간을 기록하세요."
],
"V-ups": [
"팔을 머리 위로 뻗고 다리를 곧게 펴서 평평하게 누우세요.",
"상체와 다리를 동시에 접어 올리며 손을 발끝을 향해 뻗으세요.",
"접는 내내 팔과 다리를 비교적 곧게 유지하세요.",
"동작의 정점에서 엉덩이만 바닥에 닿아야 합니다.",
"빠르게 떨어지지 말고 컨트롤하며 내리세요.",
"완전히 곧은 다리 버전이 처음에 너무 어렵다면 무릎을 살짝 굽혀 난이도를 낮추세요."
]
};
function tipsFor(name){if(CFG.lang==='ja'&&EX_TIPS_JA[name]&&EX_TIPS_JA[name].length)return EX_TIPS_JA[name];if(CFG.lang==='ko'&&EX_TIPS_KO[name]&&EX_TIPS_KO[name].length)return EX_TIPS_KO[name];return EX_TIPS[name];}
function tipFor(name){const tips=tipsFor(name);return tips&&tips.length?tips[Math.floor(Math.random()*tips.length)]:t('tip_fallback');}

// ═══ EXERCISE INSTRUCTIONS (step-by-step: setup → start → movement) ═══
const EX_INSTRUCTIONS={
  "Barbell front squat":[
    "Set the bar in a rack at shoulder height; step in and rest it across your front delts with elbows lifted high and fingertips under the bar.",
    "Unrack, step back, and set your feet shoulder-width with toes slightly out.",
    "Brace your core and squat straight down, keeping your torso as upright as possible and elbows high.",
    "Descend until your hips drop below knee level, knees tracking over your toes, heels flat.",
    "Drive up through your whole foot, keeping the elbows up so the bar stays seated, and stand tall."
  ],
  "Goblet squat":[
    "Hold one dumbbell vertically against your chest, both palms cupping the top head, elbows pointing down.",
    "Stand with feet slightly wider than shoulder-width, toes turned out a little.",
    "Squat down between your hips, keeping the dumbbell glued to your sternum and chest tall.",
    "At the bottom, let your elbows lightly touch the insides of your knees, heels flat.",
    "Push the floor away to stand back up, exhaling on the way up."
  ],
  "Walking lunge":[
    "Hold a dumbbell in each hand at your sides and stand tall.",
    "Step forward into a lunge until your front thigh is parallel and your back knee hovers just above the floor.",
    "Drive through the front heel and bring the rear leg through into the next step.",
    "Land straight into the next lunge with the opposite leg leading.",
    "Continue alternating legs, keeping your torso upright and the dumbbells still."
  ],
  "Dumbbell step-up":[
    "Stand facing a sturdy knee-height box with a dumbbell in each hand.",
    "Place your whole foot flat on the box.",
    "Drive through that heel to lift your body up — don't push off the floor leg.",
    "Stand fully upright on top with both feet on the box.",
    "Step down under control and repeat, either finishing one leg first or alternating."
  ],
  "Barbell deadlift":[
    "Stand with mid-foot under the bar, feet hip-width; hinge down and grip just outside your shins.",
    "Flatten your back, lift your chest, and pull the slack out of the bar with straight arms.",
    "Brace, then drive the floor away — hips and shoulders rising together, bar dragging up your shins.",
    "Once past the knees, push your hips through to a tall lockout; don't lean back.",
    "Return the bar to the floor with control by hinging first, bending knees once it passes them, and reset each rep."
  ],
  "Cable glute kickback":[
    "Set the pulley to its lowest point and cuff the ankle strap to one ankle.",
    "Face the tower, hold the frame, and hinge slightly forward with a soft standing knee.",
    "Sweep the strapped leg straight back and up, squeezing the glute at the top.",
    "Keep the hips square and lower back neutral throughout.",
    "Return under control without letting the stack touch down; finish the set, then switch legs."
  ],
  "T-bar row":[
    "Load one end of the bar in a landmine pivot and straddle it, feet planted.",
    "Hinge to about 45 degrees with a flat back and hook the V-handle under the bar.",
    "Pull the handle to your lower chest, elbows driving up and back.",
    "Squeeze your shoulder blades together at the top for a beat.",
    "Lower the plates under control without letting your torso rise; keep the hinge fixed all set."
  ],
  "Machine-assisted pull-up":[
    "Set the assist weight on the stack — heavier assist makes the pull easier.",
    "Kneel both knees onto the assist pad and grip the overhead handles slightly wider than shoulders.",
    "Start from straight arms, then pull your elbows down and back until your chin passes hand height.",
    "Lower yourself all the way back to a full hang under control.",
    "Across weeks, reduce the assist weight — the goal is an unassisted pull-up."
  ],
  "Single-arm lat pulldown":[
    "Attach a single D-handle to the high pulley and sit with thighs under the pads.",
    "Reach one arm fully overhead and grip the handle, letting the shoulder stretch upward.",
    "Pull the handle down toward the same-side shoulder, elbow driving to your hip.",
    "Keep your torso square — no twisting or leaning to help.",
    "Return to a full overhead stretch under control; match reps on both arms."
  ],
  "Chest dips":[
    "Mount parallel dip bars with arms locked out, then bend your knees and cross your ankles.",
    "Lean your torso forward about 30 degrees — chest toward the floor.",
    "Lower yourself until your shoulders approach elbow height, elbows flaring slightly out.",
    "Keep the forward lean at the bottom; feel the stretch across your chest.",
    "Press back up by squeezing your chest, stopping just short of a harsh lockout."
  ],
  "Barbell upright row":[
    "Hold a barbell at your thighs with an overhand, shoulder-width grip.",
    "Pull the bar straight up your body, leading with your elbows out to the sides.",
    "Stop when the bar reaches upper-chest height, elbows just above shoulder level.",
    "Keep your wrists below your elbows and the bar close to your shirt the whole way.",
    "Lower slowly to full hanging arms; no swinging or lean-back between reps."
  ],
  "Machine lateral raise":[
    "Adjust the seat so your shoulders line up with the machine's pivot point.",
    "Sit tall with the pads resting against the outside of your upper arms, hands light on the grips.",
    "Push through your elbows to raise both arms out to the sides.",
    "Stop when your upper arms are parallel to the floor.",
    "Lower slowly until the pads nearly return, keeping tension off the stack bottom."
  ],
  "Barbell push press":[
    "Rack the bar on your front shoulders, elbows slightly forward, hands just outside shoulders.",
    "Dip: bend your knees into a shallow quarter squat, torso staying perfectly vertical.",
    "Drive: snap your legs straight to launch the bar off your shoulders.",
    "Punch your arms to a full lockout overhead, head moving through once the bar clears.",
    "Lower the bar back to your shoulders, absorbing with soft knees, and reset before the next rep."
  ],
  "EZ bar curl":[
    "Grip the EZ bar's angled sections underhand, hands about shoulder-width.",
    "Stand tall with elbows pinned lightly to your ribs.",
    "Curl the bar to upper-chest height without moving your upper arms.",
    "Squeeze your biceps at the top for a moment.",
    "Lower under control to fully straight arms each rep."
  ],
  "Incline dumbbell curl":[
    "Set a bench to about 45 degrees and lie back with a dumbbell in each hand.",
    "Let both arms hang straight down and slightly behind your torso, palms forward.",
    "Curl both dumbbells up while your elbows keep pointing at the floor.",
    "Squeeze at shoulder height without swinging the elbows forward.",
    "Lower slowly to the full hanging stretch before the next rep."
  ],
  "Concentration curl":[
    "Sit on a bench, feet wide, and lean forward.",
    "Brace the back of one elbow against the inside of the same-side thigh, dumbbell hanging.",
    "Curl the dumbbell up toward that shoulder — the elbow never leaves the thigh.",
    "Squeeze hard at the top for a full second.",
    "Lower to a completely straight arm; finish the set, then switch arms."
  ],
  "Reverse EZ bar curl":[
    "Grip the EZ bar's angled sections with an overhand (palms-down) grip.",
    "Stand tall, elbows pinned to your sides, wrists dead straight.",
    "Curl the bar to upper-chest height keeping the knuckles up the whole way.",
    "Pause briefly at the top without the wrists buckling.",
    "Lower slowly to straight arms — the negative is where forearms grow."
  ],
  "Machine preacher curl":[
    "Set the seat so your armpits hook over the top edge of the sloped pad.",
    "Lay your upper arms flat on the pad and grip the machine handles palms-up.",
    "Curl the handles up toward your shoulders, upper arms staying on the pad.",
    "Squeeze at the top, chest staying against the pad.",
    "Lower to a near-full stretch without letting the stack slam, and repeat."
  ],
  "Overhead EZ bar tricep extension":[
    "Sit on an upright bench, feet flat, and press the EZ bar overhead with a narrow grip.",
    "Keep your upper arms vertical beside your ears, elbows pointing forward-up.",
    "Bend only your elbows to lower the bar behind your head.",
    "Stop at a deep, comfortable stretch — upper arms still vertical.",
    "Press back to full lockout overhead without flaring the elbows."
  ],
  "Ab wheel rollout":[
    "Kneel on a mat with the wheel under your shoulders, arms straight.",
    "Tuck your hips slightly and squeeze your glutes to lock your lower back flat.",
    "Roll the wheel forward, letting your body extend into one straight line.",
    "Go only as far as you can without your lower back arching.",
    "Pull the wheel back to the start using your abs, exhaling as you return."
  ],
  "Side plank":[
    "Lie on one side with your forearm on the mat, elbow directly under your shoulder.",
    "Stack your legs straight, top foot on bottom foot.",
    "Lift your hips until your body is one straight line from ankles to head.",
    "Hold, breathing steadily, squeezing the bottom-side waist.",
    "When your hips start to sag, the set is over; rest and switch sides."
  ],
  "Bicycle crunch":[
    "Lie on your back, fingertips at your temples, knees up, shoulder blades curled off the mat.",
    "Draw one knee in while extending the other leg out to hover above the floor.",
    "Rotate your ribcage to bring the opposite elbow toward the bent knee.",
    "Switch sides in a smooth pedaling motion — extend, draw in, rotate.",
    "Keep your lower back pressed into the mat and move slowly both directions."
  ],
  "Farmers carry":[
    "Deadlift a heavy dumbbell up in each hand — hinge down and stand up with a flat back, don't stoop.",
    "Stand tall: shoulders back and down, ribs stacked over hips, eyes forward.",
    "Walk with short, quick, controlled steps, keeping both dumbbells dead level.",
    "Keep your grip crushed tight and arms straight — no shrugging or swinging.",
    "Walk for the target time or distance, then set the weights down with a flat-back hinge."
  ],
  "Flat barbell bench press":[
    "Set a flat bench inside a rack; position the bar so your arms are almost fully extended when you lie below it.",
    "Lie flat, plant both feet on the floor, retract and depress your shoulder blades into the bench, and grip the bar slightly wider than shoulder-width with thumbs wrapped around.",
    "Unrack and lower the bar in a controlled path to your mid-chest, keeping your elbows at roughly 45-75° from your torso.",
    "Press the bar back up along the same path until your arms are fully extended.",
    "Inhale and brace your core before each descent; exhale forcefully as you drive the bar up."
  ],
  "Bench dumbbell chest press":[
    "Sit on a flat bench with a dumbbell on each knee; kick them up one at a time as you lie back.",
    "Hold the dumbbells directly above your chest with arms extended and palms facing forward.",
    "Lower the dumbbells in a controlled arc until your upper arms are level with the bench, elbows at roughly 60-75°.",
    "Press the dumbbells back up and slightly inward along the same arc to the starting position.",
    "To dismount, bring the dumbbells to your thighs and sit up — never drop them to the floor."
  ],
  "Incline barbell chest press":[
    "Set the bench to 30-45° inside a rack; adjust the bar so your arms are nearly extended when lying below it.",
    "Lie back with shoulder blades retracted, feet flat on the floor, and grip the bar slightly wider than shoulder-width.",
    "Unrack and lower the bar toward your upper chest, just below the collarbone, with elbows traveling at about 60-75°.",
    "Drive the bar straight up until your arms are locked out, then re-rack after your final rep.",
    "Brace your core before each descent and exhale forcefully on the press."
  ],
  "Incline bench dumbbell press":[
    "Set the bench to 30-45°; sit at the low end with a dumbbell on each knee, then kick them up as you lie back.",
    "Position the dumbbells at upper-chest level, palms facing forward, elbows below the dumbbells.",
    "Press both dumbbells up and slightly toward each other until your arms are fully extended.",
    "Lower them back in a controlled arc, keeping elbows at 60-75° until they return to upper-chest level.",
    "After the final rep, bring the dumbbells to your knees and sit up to safely dismount."
  ],
  "Decline dumbbell press":[
    "Set the bench to a decline angle and secure your feet firmly under the leg pads.",
    "Lie back and position a dumbbell on each side of your lower chest with elbows bent.",
    "Press both dumbbells up and slightly inward until your arms are fully extended.",
    "Lower them under control until your elbows are at about bench level.",
    "After the final rep, bring the dumbbells to your lower chest and sit up by engaging your core."
  ],
  "Dumbbell fly":[
    "Lie flat on a bench; press two dumbbells up to the starting position with arms almost fully extended and a fixed slight bend at the elbow.",
    "Keep that elbow angle locked and open your arms wide in a wide arc toward the floor.",
    "Lower until you feel a deep chest stretch — upper arms roughly level with the bench.",
    "Bring both arms back up in the same arc by squeezing your chest, until the dumbbells are back above your chest.",
    "All movement is from the shoulder joint — the elbow angle never changes."
  ],
  "Cable chest fly":[
    "Set both pulleys to chest or shoulder height; stand in the center and grip one handle in each hand.",
    "Step one foot forward into a staggered stance and lean slightly forward with a flat back; arms extend outward with a slight elbow bend.",
    "Sweep both arms forward and together in a wide arc until the handles meet at about chest height in front of you.",
    "Slowly reverse the arc, letting your arms open back until you feel a full chest stretch.",
    "Control the return — the cables shouldn't pull your arms back uncontrolled."
  ],
  "Machine chest fly":[
    "Adjust the seat so the handles align with your mid-chest; choose a weight and set the arm range to a comfortable stretch position.",
    "Sit with your back pressed flat against the pad and grip the handles with the arms open wide.",
    "Bring both pads forward in a wide arc until they nearly meet in front of your chest.",
    "Slowly allow the pads to separate and travel back to the start, feeling a full stretch.",
    "Keep your back against the pad and avoid shrugging your shoulders at any point."
  ],
  "Machine chest press":[
    "Adjust the seat so the handles are at mid-chest level; select a weight.",
    "Sit with your back flat against the pad and grip the handles with a shoulder-width grip.",
    "Press the handles straight forward until your arms are nearly fully extended — avoid hard locking out.",
    "Control the handles back toward your chest until you feel a full stretch.",
    "Keep your feet flat on the floor and your back in full contact with the pad throughout."
  ],
  "Dumbbell pullover":[
    "Lie across a flat bench with only your upper back on the surface; feet flat on the floor, hips slightly dropped.",
    "Hold one dumbbell with both hands and raise it above your chest with arms almost fully extended and a slight elbow bend.",
    "Lower the dumbbell in an arc behind your head toward the floor, feeling a deep stretch across your chest and lats.",
    "Pull the dumbbell back up in the same arc to directly above your chest.",
    "Keep your hips low and the elbow angle fixed throughout — this is an arc, not a pressing motion."
  ],
  "Lat pulldown":[
    "Adjust the thigh pad to secure your legs; grip the bar wider than shoulder-width with an overhand grip and sit down.",
    "Lean slightly back (10-15°), brace your core, and begin with arms fully extended overhead.",
    "Pull the bar toward your upper chest by driving your elbows down and back, squeezing your lats as it comes in.",
    "Slowly allow the bar to rise back up in a controlled path until your arms are fully extended.",
    "Think 'elbows to hips' rather than just pulling with your hands to keep the focus on your lats."
  ],
  "Reverse grip pulldown":[
    "Sit at the lat pulldown machine; grip the bar shoulder-width with palms facing toward you (underhand).",
    "Secure your legs under the pad, lean slightly back, and begin with arms fully extended overhead.",
    "Pull the bar to your upper chest by driving your elbows down and squeezing your lats.",
    "Slowly let the bar travel back up until your arms are fully extended again.",
    "Avoid using only your biceps to curl the bar down — the drive should come from retracting your shoulder blades first."
  ],
  "Seated cable row":[
    "Sit at the cable row station with feet on the foot rests and knees slightly bent; grip the handle with both hands.",
    "Sit upright with your torso at roughly 90° and arms extended toward the pulley — this is the start.",
    "Pull the handle toward your lower abdomen by driving your elbows back and squeezing your shoulder blades together.",
    "Slowly extend your arms back to the starting position while letting your shoulder blades protract.",
    "Keep your torso upright throughout — avoid rocking back to generate momentum."
  ],
  "Barbell row":[
    "Stand over a barbell with feet hip-width apart; hinge at the hips to roughly 45-70°, grip the bar slightly wider than shoulder-width with an overhand grip.",
    "Keep your back flat, chest tall, and let the bar hang at arm's length — this is your start.",
    "Pull the bar up toward your lower chest or upper abdomen by driving your elbows back and up.",
    "Lower the bar back to the hanging position in a controlled path, arms fully extending.",
    "Hold your torso angle fixed throughout — resist the urge to stand up as you pull."
  ],
  "Single-arm dumbbell row":[
    "Place one hand and the same-side knee on a flat bench; hold a dumbbell in the free hand with your arm hanging straight down.",
    "Keep your back flat and parallel to the floor, core braced — this is your start.",
    "Pull the dumbbell up toward your hip by driving your elbow back and up past your torso.",
    "Lower the dumbbell back down in a controlled arc until your arm is fully extended.",
    "Lead with your elbow, not your hand — this keeps the work on your lat rather than your bicep."
  ],
  "Chest-supported machine row":[
    "Adjust the pad height so your chest rests flat against it; set the handles to a comfortable height.",
    "Sit with your chest pinned firmly against the pad and grip the handles.",
    "Pull the handles back by driving your elbows behind you and squeezing your shoulder blades together.",
    "Slowly return the handles to the start, letting your arms extend fully and your shoulder blades protract.",
    "The chest pad removes lower-back involvement — keep it pinned so your back stays isolated."
  ],
  "Straight arm cable pulldown":[
    "Set the cable pulley to the highest position; grab the bar or rope with a shoulder-width overhand grip.",
    "Step back and lean slightly forward with arms extended overhead — this is the start.",
    "With arms kept nearly straight and just a soft elbow bend, pull the bar down in a wide arc until it reaches your thighs.",
    "Slowly reverse the arc, letting your arms rise back to the overhead starting position.",
    "All movement comes from the shoulder joint — elbows stay fixed throughout. This isolates the lats."
  ],
  "Pull-ups":[
    "Grip a pull-up bar with an overhand grip, hands slightly wider than shoulder-width.",
    "Hang with arms fully extended; retract your shoulder blades slightly to engage your lats before pulling.",
    "Pull yourself up by driving your elbows down toward your hips until your chin clears the bar.",
    "Lower yourself in a fully controlled descent until your arms are straight again.",
    "Avoid kipping or using momentum — full control up and down maximizes lat development."
  ],
  "Chin-ups":[
    "Grip the pull-up bar with hands shoulder-width apart or slightly closer, palms facing toward you (underhand/supinated grip).",
    "Hang with arms fully extended; retract your shoulder blades slightly to engage your lats before pulling.",
    "Pull yourself up by driving your elbows down and toward your hips until your chin clears the bar.",
    "Lower yourself in a fully controlled descent until your arms are straight again.",
    "The underhand grip recruits more bicep than a standard pull-up — drive the movement from your back first, not just your arms."
  ],
  "Smith machine bench press":[
    "Set the bench flat inside the Smith machine; position it so the bar sits at arm's reach when you lie below it.",
    "Lie back, retract and depress your shoulder blades into the bench, and grip the bar slightly wider than shoulder-width.",
    "Rotate the bar off the safety hooks to unrack; hold it above your mid-chest with arms extended.",
    "Lower the bar to your mid-chest in a controlled path, keeping elbows at roughly 60-75° from your torso.",
    "Press the bar back up until your arms are fully extended, then re-rack by rotating onto the hooks after your final rep."
  ],
  "Smith machine inverted row":[
    "Set the Smith bar at hip height or lower; lie face-up underneath it with heels on the floor, body straight.",
    "Grip the bar shoulder-width apart with an overhand grip; your arms are extended and your body is in a plank line.",
    "Pull your chest up to the bar by squeezing your shoulder blades together and driving your elbows back.",
    "Lower yourself in a controlled descent until your arms are fully extended.",
    "Keep your hips and core rigid throughout — your entire body moves as one unit."
  ],
  "Dead hang":[
    "Grip a pull-up bar slightly wider than shoulder-width with an overhand grip.",
    "Step or jump up so your full body weight is hanging with arms fully extended.",
    "Allow your shoulders to rise naturally and your spine to decompress; breathe steadily and steadily.",
    "Hold for the target duration, maintaining grip tension without excessive swinging.",
    "Step or lower yourself down carefully once the hold is complete."
  ],
  "Barbell overhead press":[
    "Set a barbell in a rack at upper-chest height; grip it slightly wider than shoulder-width with thumbs wrapped around.",
    "Unrack, step back, feet shoulder-width apart; hold the bar at upper-chest level with elbows forward and just below the bar.",
    "Press the bar straight up — tuck your head back slightly to clear it — until your arms are fully extended.",
    "Lower the bar back to upper-chest level under control.",
    "Keep your core braced and avoid excessive lower-back lean — drive the bar in a straight vertical path."
  ],
  "Seated dumbbell shoulder press":[
    "Sit on an upright bench with your back against the pad; hold a dumbbell in each hand at shoulder height, elbows at 90°, palms forward.",
    "Brace your lower back against the pad and plant feet flat on the floor.",
    "Press both dumbbells directly overhead until your arms are fully extended.",
    "Lower them back to shoulder height, elbows returning to 90°.",
    "Avoid arching your lower back as the weight gets heavier — keep your back in contact with the pad."
  ],
  "Arnold press":[
    "Sit on an upright bench with your back against the pad; hold a dumbbell in each hand at shoulder height, palms facing toward you.",
    "Brace your core and plant your feet flat.",
    "As you press the dumbbells up, rotate your palms outward so they face forward by the time your arms are fully extended.",
    "Lower the dumbbells while rotating your palms back inward until they face toward you again at shoulder height.",
    "The rotation should be smooth and continuous from bottom to top — not a two-stage movement."
  ],
  "Dumbbell lateral raise":[
    "Stand upright holding a dumbbell in each hand at your sides with a slight bend at the elbow.",
    "Brace your core and keep your torso completely still throughout — this is a strict isolation movement.",
    "Raise both arms out to the sides in a wide arc until they are parallel to the floor, leading slightly with your elbows.",
    "Lower the dumbbells back to your sides under full control.",
    "Avoid shrugging your traps — keep your neck long and shoulders depressed throughout."
  ],
  "Cable lateral raise":[
    "Set a low cable pulley; stand beside the machine and grip the handle with the hand farthest from the pulley.",
    "Stand upright with your near hand bracing lightly on the machine for balance.",
    "Raise your arm out and up in a wide arc until it is parallel to the floor, the cable pulling across your body.",
    "Lower your arm back down slowly against the cable tension.",
    "Lean slightly away from the pulley to increase the range of motion and maintain tension at the start."
  ],
  "Dumbbell front raise":[
    "Stand upright holding a dumbbell in each hand at your front thighs, palms facing down or inward.",
    "Brace your core, keep your torso upright, and arms almost fully straight.",
    "Raise both arms directly forward and up until they are parallel to the floor.",
    "Lower them back to your thighs in a controlled arc.",
    "Avoid rocking your torso — the movement should come entirely from your front deltoids."
  ],
  "EZ bar front raise":[
    "Stand upright holding an EZ bar with both hands on the angled inner grips, palms semi-inward, the bar at your thighs.",
    "Brace your core and keep your torso completely still.",
    "Raise the bar directly forward and up until your arms are parallel to the floor.",
    "Lower the bar back to your thighs in a controlled arc.",
    "Avoid bending your elbows or rocking your torso to assist — the lift comes entirely from your front deltoids."
  ],
  "Machine shoulder press":[
    "Adjust the seat so the handles are at shoulder height; select a weight.",
    "Sit with your back flat against the pad, grip the handles with palms forward, elbows at 90° below the handles.",
    "Press the handles directly overhead until your arms are nearly fully extended.",
    "Lower the handles back to shoulder height under control.",
    "Keep your back in contact with the pad throughout and avoid arching or sliding up the seat."
  ],
  "Smith machine shoulder press":[
    "Set the bench upright at 90° under the Smith machine; position the bar at just above chin height.",
    "Grip the bar slightly wider than shoulder-width; unrack by rotating it off the hooks.",
    "Press the bar straight up along the fixed vertical path until your arms are fully extended.",
    "Lower it back to upper-chest level under control.",
    "Re-rack by rotating the bar back onto the hooks after your final rep."
  ],
  "Cable face pull":[
    "Set the cable pulley to upper-face height; attach a rope and grip one end in each hand, palms facing down.",
    "Step back to create cable tension; stand with feet shoulder-width apart and arms extended toward the pulley.",
    "Pull the rope toward your face by flaring your elbows out and upward to ear level, externally rotating your upper arms.",
    "At the end of the pull your thumbs point behind you and your hands are at ear level — hold for a brief squeeze.",
    "Slowly return the rope to the start under control; keep your torso still throughout."
  ],
  "Bent-over dumbbell reverse fly":[
    "Hold a dumbbell in each hand; hinge at the hips until your torso is roughly parallel to the floor, arms hanging down.",
    "Keep your back flat, core engaged, and a slight bend in your knees.",
    "Raise both arms out to the sides in a wide arc, leading with your elbows, until they are level with your shoulders.",
    "Squeeze your rear delts at the top, then lower the dumbbells back down under control.",
    "Avoid raising your torso as you lift — hold the hinge angle fixed for the entire set."
  ],
  "Incline bench dumbbell rear delt fly":[
    "Set the bench to 30-45°; lie face-down with your chest resting on the pad, legs off the end.",
    "Hold a dumbbell in each hand hanging below your shoulders with a neutral grip, arms nearly straight.",
    "Raise both arms out to the sides in a wide arc until they are level with your shoulders.",
    "Squeeze your rear delts at the top, then lower the dumbbells back to the hanging start under control.",
    "The face-down position eliminates momentum — control every rep slowly to maximize rear delt activation."
  ],
  "Machine rear delt fly":[
    "Adjust the seat and set the arms so you can grip the handles with arms extended forward at shoulder height.",
    "Sit facing the pad with your chest against it (if applicable); grip the handles with palms facing each other.",
    "Pull both handles back and out in a wide arc, squeezing your rear delts and upper back.",
    "Slowly return the handles forward to the start, arms extending fully.",
    "Avoid shrugging your traps — keep your shoulders depressed and the movement driven by your rear delts."
  ],
  "Barbell curl":[
    "Stand upright holding a barbell at hip level with an underhand grip, hands shoulder-width apart.",
    "Pin your upper arms against your sides, feet shoulder-width apart, core braced.",
    "Curl the bar up toward your shoulders by flexing at the elbows, keeping your upper arms stationary.",
    "Lower the bar back to the starting position in a fully controlled arc — don't let it drop.",
    "Avoid rocking your torso or letting your elbows drift forward — the movement is purely at the elbow joint."
  ],
  "Dumbbell bicep curl":[
    "Stand holding a dumbbell in each hand at your sides with palms facing forward.",
    "Pin your upper arms against your torso; keep your shoulders back and chest tall.",
    "Curl both (or alternating) dumbbells toward your shoulders, keeping your upper arms completely still.",
    "Lower the dumbbells back to the starting position under full control.",
    "Keep your elbows aligned with your torso throughout — they should not drift forward as you curl."
  ],
  "Hammer curls":[
    "Stand holding a dumbbell in each hand at your sides with palms facing inward (neutral grip).",
    "Pin your upper arms against your sides and brace your core.",
    "Curl both dumbbells up toward your shoulders with palms remaining in the neutral position throughout.",
    "Lower them back to the fully extended starting position under control.",
    "Don't rotate your wrists — maintaining the neutral grip targets the brachialis and brachioradialis."
  ],
  "Cable bicep curl":[
    "Set the pulley to the lowest position and attach a straight bar or EZ bar; grip it underhand at shoulder-width.",
    "Stand upright, step back slightly so the cable is taut, and begin with arms extended downward.",
    "Curl the bar up toward your shoulders, keeping your upper arms stationary and elbows pinned to your sides.",
    "Slowly lower the bar against the cable tension until your arms are fully extended.",
    "The cable provides constant tension at the bottom position — use this to work the full arc more effectively than a dumbbell."
  ],
  "Cable rope hammer curl":[
    "Set the pulley to the lowest position and attach a rope; grip one end in each hand with palms facing each other.",
    "Stand upright, step back so the cable is taut, and begin with arms extended downward.",
    "Curl both ends of the rope up toward your shoulders, keeping palms facing each other throughout.",
    "At the top, you can split the rope slightly outward for a stronger peak contraction.",
    "Lower the rope back under control, allowing your arms to fully extend before the next rep."
  ],
  "Preacher curl":[
    "Adjust the preacher bench so your upper arms rest fully on the pad and your armpits sit at the top edge.",
    "Grip the EZ bar with an underhand grip; start with arms extended down the slope of the pad.",
    "Curl the bar up by flexing at the elbow until your forearms are vertical or just past.",
    "Lower the bar back down slowly all the way to the fully extended position — feel the full stretch.",
    "The eccentric phase on a preacher bench is especially effective — resist the urge to drop the weight."
  ],
  "Barbell skull crusher":[
    "Lie flat on a bench; grip a barbell or EZ bar with hands shoulder-width, arms extended vertically above your chest.",
    "Keep your upper arms pointing straight up at the ceiling — they stay completely stationary.",
    "Bend only at the elbows and lower the bar toward your forehead or just past your head.",
    "Extend your elbows to press the bar back up to the starting position.",
    "Control the descent carefully — bar proximity to your face demands a deliberately slow negative."
  ],
  "Dumbbell skull crusher":[
    "Lie flat on a bench; hold a dumbbell in each hand with arms extended above your chest, palms facing each other.",
    "Keep your upper arms vertical and completely still — they do not move during the exercise.",
    "Bend at the elbows and lower both dumbbells toward the sides of your head.",
    "Extend your arms back up to the starting position by straightening at the elbows.",
    "If your upper arms are swinging, reduce the weight — this should be a pure elbow hinge."
  ],
  "Triceps pushdown":[
    "Set the cable pulley to the top position; attach a straight bar or V-bar and grip it overhand.",
    "Stand close to the pulley with elbows pinned at your sides at roughly 90°, leaning slightly forward.",
    "Push the bar down by extending at the elbows until your arms are fully straight.",
    "Allow the bar to rise back up under control until your elbows return to about 90°.",
    "Your elbows are the pivot point and must stay pinned to your sides — they should not drift backward or forward."
  ],
  "Cable rope tricep extension":[
    "Set the cable to the highest position; attach a rope and grip one end in each hand with palms facing each other.",
    "Stand with elbows pinned at your sides, bent at roughly 90°, leaning slightly forward.",
    "Push the rope down by extending at the elbows; simultaneously spread the ends of the rope apart as you reach full extension.",
    "Control the rope back up, allowing your elbows to return to 90°.",
    "Splitting the rope at the bottom intensifies the peak tricep contraction — make it deliberate."
  ],
  "Overhead cable tricep extension":[
    "Set the cable to the highest position; grab a rope with both hands and face away from the machine.",
    "Step forward and raise the rope overhead; bend your elbows so your hands are behind your head with upper arms beside your ears.",
    "Extend your arms overhead by straightening at the elbows until fully locked out.",
    "Lower the rope back behind your head under control, returning to the bent-elbow starting position.",
    "Your upper arms stay pressed against the sides of your head — only your forearms should move."
  ],
  "Single-arm dumbbell overhead tricep extension":[
    "Hold a dumbbell in one hand; sit on a bench with back support and press the dumbbell overhead until your arm is fully extended.",
    "Bend your elbow, lowering the dumbbell behind your head — your upper arm stays vertical beside your head.",
    "Extend your arm back up by contracting your tricep until it is fully straight overhead.",
    "Lower with full control on every rep.",
    "Support your working arm's elbow with your free hand if it tends to drift forward."
  ],
  "Close-grip bench press":[
    "Lie flat on a bench inside a rack; grip the bar narrower than shoulder-width (about fist-width apart) with thumbs wrapped around.",
    "Unrack with arms fully extended above your chest.",
    "Lower the bar to your lower chest/sternum, keeping your elbows tucked close to your ribs — not flaring out.",
    "Press the bar back up along the same path until your arms are fully extended.",
    "The narrow grip and tucked elbows shift the primary load from your chest to your triceps."
  ],
  "Tricep dips":[
    "Grip the parallel bars and jump up so your arms are locked out, body suspended above the bars.",
    "Keep your torso upright (leaning forward shifts emphasis to chest) and elbows pointing straight back.",
    "Lower your body by bending at the elbows until your upper arms are at least parallel to the floor.",
    "Push back up by extending your elbows until your arms are fully locked out.",
    "Add weight (dumbbell between legs or a dip belt) once bodyweight reps feel easy."
  ],
  "Diamond push-ups":[
    "Get into a push-up position; bring your hands together under your sternum so your index fingers and thumbs form a diamond shape.",
    "Keep your body in a rigid plank from head to heels with core and glutes braced.",
    "Lower your chest toward the diamond by bending your elbows — they track backward, not flaring outward.",
    "Push back up to the start, fully extending your arms.",
    "Drop to your knees to decrease difficulty or elevate your feet to increase it."
  ],
  "Single-arm tricep kickback":[
    "Place one hand and the same-side knee on a bench; hold a dumbbell in the free hand with your upper arm parallel to the floor.",
    "Brace your core and keep your back flat — your upper arm stays pinned parallel to the floor for the entire set.",
    "Extend your forearm backward by straightening your elbow until your entire arm is parallel to the floor.",
    "Bend the elbow back to 90° in a controlled return.",
    "Your upper arm must not drop or swing — only your forearm moves at the elbow."
  ],
  "Cable tricep kickback":[
    "Attach a D-handle to the low pulley; stand beside the machine and grip it with one hand, palm facing inward.",
    "Hinge at the hips until your torso is about 45° to the floor; pin your upper arm against your torso, parallel to the floor.",
    "Extend your forearm backward by straightening your elbow until your entire arm is parallel to the floor.",
    "Slowly bend your elbow back to 90° against the cable resistance.",
    "Your upper arm stays completely fixed — only your forearm pivots at the elbow."
  ],
  "Plank":[
    "Kneel and place both forearms flat on the floor, elbows directly under your shoulders, hands in fists or flat.",
    "Extend both legs back into a plank so only your forearms and toes are on the floor; lift your hips until your body is in a straight line.",
    "Brace your core as if absorbing a punch, squeeze your glutes, and keep your hips perfectly level.",
    "Hold this position while breathing steadily — do not hold your breath.",
    "End the hold by dropping your knees to the floor; stop the moment your form begins to break down."
  ],
  "Leg raise":[
    "Lie flat on the floor with your arms at your sides or under your glutes for lumbar support.",
    "Begin with your legs extended and lifted just slightly off the floor.",
    "Raise both legs together until they are vertical (or as high as is comfortable), keeping them as straight as possible.",
    "Lower your legs back down slowly — stop just before your heels touch the floor.",
    "Keep your lower back pressed into the floor throughout; if it peels up, raise your legs higher on the descent."
  ],
  "Hanging leg raise":[
    "Grip the vertical knee raise station handles (or a pull-up bar) and hang with arms extended, body straight.",
    "Begin with your legs straight and hanging directly below you.",
    "Raise your legs with knees straight (or slightly bent) until they are at least parallel to the floor — higher if you can.",
    "Lower your legs slowly back to the hanging position without swinging.",
    "Resist momentum — a slow and controlled rep builds far more core strength than swinging."
  ],
  "Decline sit-ups":[
    "Hook your feet securely under the leg pads of a decline bench; lie back with arms crossed or hands lightly behind your head.",
    "Start at the bottom with your torso parallel to the floor and your back flat on the pad.",
    "Curl your torso upward by contracting your abs until your torso is roughly vertical.",
    "Lower back down slowly until your back is flat on the pad again.",
    "If hands are behind your head, they are there only for support — do not pull your neck forward."
  ],
  "Machine seated crunch":[
    "Adjust the seat height so the arm pads rest on your upper chest or shoulders; select a weight.",
    "Sit with your back against the pad, grip the handles, and brace your core.",
    "Crunch forward by curling your ribcage toward your pelvis using your abs to pull the pads down.",
    "Slowly return to the upright starting position under control.",
    "This is a spinal curl — your hips stay fixed on the seat; only your torso rounds."
  ],
  "Cable crunch":[
    "Set the cable to the top position and attach a rope; kneel below the pulley and grip one end of the rope in each hand at either side of your face.",
    "Keep your hips completely still in the kneeling position — they should not move.",
    "Crunch downward by rounding your spine, pulling your elbows toward your thighs.",
    "Hold the contracted position for a brief count, then slowly rise back to the starting position while keeping cable tension.",
    "Only your abs should be doing the work — your hips must not sink back toward your heels."
  ],
  "Russian twist":[
    "Sit on the floor with knees bent and feet slightly lifted; lean your torso back to roughly 45°.",
    "Hold a weight plate or dumbbell with both hands extended in front of your chest.",
    "Rotate your torso to one side, bringing the weight toward the floor beside your hip.",
    "Rotate all the way to the opposite side in one continuous motion, keeping your feet off the floor.",
    "The rotation comes from your obliques — let your torso lead the movement, not just your arms."
  ],
  "Mountain climbers":[
    "Start in a high push-up/plank position with hands directly under your shoulders and your body in a rigid straight line.",
    "Brace your core; hips should be neither sagging nor piked.",
    "Drive one knee toward your chest while the opposite leg remains extended.",
    "As that foot returns to the start, immediately drive the other knee forward in a running alternation.",
    "Keep your hips level at plank height throughout — they should not bounce with each drive."
  ],
  "Barbell hip thrust":[
    "Sit on the floor with your upper back against a bench; roll a loaded barbell over your legs and position it across your hips — use a foam pad for comfort.",
    "Plant your feet flat on the floor hip-width apart, knees bent at roughly 90°, toes slightly out; upper back rests across the middle of the bench.",
    "Drive through your heels, squeeze your glutes, and push your hips up until your thighs are parallel to the floor and your body forms a straight line from knees to shoulders.",
    "Lower your hips back toward the floor under control and repeat.",
    "Keep your chin tucked and avoid looking at the ceiling — this helps prevent lower-back overextension at the top."
  ],
  "Dumbbell hip thrust":[
    "Sit on the floor with your upper back against a bench; place a dumbbell across your hips and hold it with both hands.",
    "Feet flat on the floor hip-width apart, knees bent at about 90°.",
    "Drive through your heels and squeeze your glutes to lift your hips until your body forms a straight line from knees to shoulders.",
    "Lower your hips back toward the floor under control.",
    "Keep your chin tucked; stop at the top when your body is straight — do not hyperextend your lower back."
  ],
  "Smith machine hip thrust":[
    "Place a bench behind you and sit with your upper back against it; position the Smith bar at hip level and use a pad.",
    "Rotate the bar off the hooks to unrack; plant feet flat on the floor hip-width apart, knees at 90°.",
    "Drive your hips up by pressing through your heels and squeezing your glutes until your body is straight.",
    "Lower your hips back down slowly, then re-rack by rotating the bar onto the hooks after your final rep.",
    "Set the safety hooks at a height that will catch the bar if you need to bail."
  ],
  "Glute bridge":[
    "Lie flat on the floor with knees bent, feet flat hip-width apart, arms at your sides.",
    "Press your feet and arms down into the floor for stability.",
    "Drive your hips upward by squeezing your glutes until your body forms a straight line from shoulders to knees.",
    "Hold the top contraction for one to two seconds, then lower your hips to just above the floor — not fully resting.",
    "Keep tension on your glutes by stopping an inch above the floor at the bottom of each rep."
  ],
  "Machine hip thrust":[
    "Adjust the machine's seat and shoulder pad per the guide so your hips can fully extend at the top.",
    "Sit with your back against the seat and feet flat on the footplate hip-width apart.",
    "Drive through your heels and squeeze your glutes to push your hips forward against the pad's resistance.",
    "Hold the fully extended position for one count, then lower under control.",
    "Stop at full hip extension — do not allow your lower back to hyperextend."
  ],
  "Dumbbell lunge":[
    "Stand upright holding a dumbbell in each hand at your sides; take a long step forward with one foot.",
    "Keep your torso upright with your front shin nearly vertical and your front knee tracking over your second toe.",
    "Lower your back knee toward the floor until your front thigh is roughly parallel to the floor.",
    "Drive through your front heel to push yourself back up to standing.",
    "Step forward with the opposite foot for alternating lunges, or complete all reps on one side before switching."
  ],
  "Bulgarian split squat":[
    "Place your rear foot on a bench or elevated surface behind you; step your front foot far enough forward so your shin stays vertical when you lower.",
    "Stand tall with torso upright, core braced; hold dumbbells at your sides or a barbell across your back.",
    "Lower your back knee toward the floor by bending both knees simultaneously, keeping your front shin vertical.",
    "Drive through your front heel to push back up to the starting position.",
    "Most of your weight should be on your front foot — the rear foot provides balance, not a push-off."
  ],
  "Leg press":[
    "Adjust the seat so your knees are at roughly 90° when feet are flat on the platform, shoulder-width apart with toes slightly out.",
    "Sit with your entire back and glutes in contact with the seat; grip the handles.",
    "Press the platform away until your legs are nearly straight — avoid fully locking your knees.",
    "Slowly bend your knees and lower the platform until your thighs are at about 90°.",
    "Never allow your lower back to peel off the seat — if it does, reduce your range of motion."
  ],
  "Hack squat":[
    "Adjust the shoulder pads; step onto the foot plate shoulder-width apart with toes slightly out and back flat against the backrest.",
    "Place your shoulders under the pads and release the safety handles to start.",
    "Lower by bending your knees until your thighs reach at least parallel to the foot plate.",
    "Drive through your heels to push the sled back up until your legs are nearly straight, then engage the safety handles after your final rep.",
    "Keep your heels flat on the platform and avoid letting your knees cave inward throughout."
  ],
  "Smith machine squat":[
    "Set the bar at upper-chest height; position your feet slightly forward of the bar, shoulder-width apart, toes out.",
    "Step under the bar, rest it on your upper traps, and unrack by rotating it off the hooks.",
    "Squat down by bending your knees and hips simultaneously until your thighs are at least parallel to the floor.",
    "Drive through your heels to return to standing, then re-rack after the final rep.",
    "The fixed bar path may feel unusual — move your feet forward until the descent feels natural for your build."
  ],
  "Barbell back squat":[
    "Set the bar at shoulder height in a rack; step under and rest it across your upper traps, hands slightly wider than shoulder-width.",
    "Unrack and step back; feet shoulder-width apart, toes turned slightly out, brace your core and keep your chest tall.",
    "Descend by pushing your hips back and bending your knees together — keep your chest up and knees tracking over your toes.",
    "Reach at least parallel depth, then drive through your heels to stand back up.",
    "Always use safety bars set at or just below your parallel depth when training without a spotter."
  ],
  "Leg extension":[
    "Adjust the seat back and shin pad so your knee joint aligns with the machine's pivot; set the shin pad at your lower shin.",
    "Sit with your back against the pad, grip the handles, and shins against the pad.",
    "Extend both legs by contracting your quads until your legs are fully straight.",
    "Hold the peak contraction briefly, then lower the pad back to the starting position under control.",
    "Avoid using momentum — the movement is purely from your knee joint, not a swinging motion."
  ],
  "Dumbbell sumo squat":[
    "Stand with feet significantly wider than shoulder-width, toes pointing out at roughly 45°; hold one dumbbell vertically with both hands between your legs.",
    "Keep your torso upright and core braced — the dumbbell hangs freely between your legs.",
    "Bend both knees while pushing them outward in line with your toes; lower until your thighs are parallel or below.",
    "Drive through your heels to straighten your legs back to standing.",
    "Keep your chest tall throughout and avoid rounding your lower back as you descend."
  ],
  "Romanian deadlift":[
    "Stand holding a barbell at hip level with an overhand grip, feet hip-width apart.",
    "Keep your back flat, chest tall, and a soft bend in your knees.",
    "Hinge at the hips — push them backward — lowering the bar along your legs, keeping it close to your body.",
    "Stop when your hamstrings are fully stretched and before your lower back rounds; re-drive your hips forward.",
    "Squeeze your glutes hard at the top and stand fully before the next rep."
  ],
  "Dumbbell Romanian deadlift":[
    "Stand holding a dumbbell in each hand in front of your thighs, palms facing your body.",
    "Keep your back flat, a soft bend in your knees, and brace your core.",
    "Hinge at the hips and lower the dumbbells along your legs — keep them close to your shins.",
    "Stop when you feel your hamstrings fully stretched and before your lower back rounds.",
    "Drive your hips forward and squeeze your glutes hard to return to standing."
  ],
  "Smith machine Romanian deadlift":[
    "Position your feet slightly forward of the bar; set the bar at mid-thigh height and grip it overhand at shoulder-width.",
    "Unrack by rotating the bar off the hooks; stand tall with the bar in front of your thighs.",
    "Hinge at the hips, pushing them backward as the bar travels down your legs in the fixed path.",
    "Stop when your hamstrings reach their limit, then drive your hips forward to return to standing.",
    "The Smith's fixed vertical path differs from a free bar — adjust your foot position forward until the movement feels natural."
  ],
  "Lying hamstring curl":[
    "Lie face-down on the machine; align your knee joint with the machine pivot and position the pad just above your heels.",
    "Grip the handles for stability and keep your hips pressed flat into the pad.",
    "Curl your legs up by bending your knees, pulling the pad toward your glutes.",
    "Slowly lower the pad back to the starting position under control.",
    "If your hips lift off the pad during the curl, reduce the weight — that's a sign of compensation."
  ],
  "Seated hamstring curl":[
    "Adjust the seat back and the leg pad so your knee joint aligns with the machine pivot; the upper pad should secure your thighs.",
    "Sit with your back against the pad, grip the handles, thighs pressed under the upper pad.",
    "Flex your knees to pull the lower pad toward the floor, contracting your hamstrings.",
    "Slowly raise the pad back to the starting position under control.",
    "Keep your thighs pressed against the upper pad throughout so they don't rise and your hamstrings bear the full load."
  ],
  "Seated calf raise":[
    "Sit on the machine and position the knee pads just above your knees; place only the balls of your feet on the footplate with heels hanging off.",
    "Lower your heels as far as possible to achieve a full calf stretch.",
    "Press through the balls of your feet to raise your heels as high as possible, fully contracting your calves.",
    "Lower back down slowly to the full stretch position.",
    "Pause briefly at both the top and bottom to eliminate bounce momentum."
  ],
  "Plate-loaded standing calf raise":[
    "Step onto the platform with only the balls of your feet on the edge; position your shoulders under the pads.",
    "Begin with heels lowered as far as possible to the full stretch.",
    "Press through the balls of your feet to raise your heels as high as possible, squeezing your calves.",
    "Lower your heels back down slowly for the full stretch before the next rep.",
    "Keep your legs fully straight — bending your knees shifts the load away from the gastrocnemius."
  ],
  "Leg press calf raise":[
    "Sit in the leg press machine; place only the balls of your feet at the lower edge of the platform.",
    "Keep your legs nearly straight with just a very slight knee bend — do not engage your quads.",
    "Lower your heels toward the floor as far as the machine allows for a full calf stretch.",
    "Press through the balls of your feet to push the platform away, fully raising your heels.",
    "Pause at the top before lowering; slow, deliberate reps are far more effective than fast bouncing."
  ],
  "Hack squat calf raise":[
    "Step onto the hack squat footplate with only the balls of your feet at the lower edge, heels hanging off; shoulders under the pads.",
    "Keep your legs fully extended — knees straight — and release the safety handles.",
    "Lower your heels as far below the footplate edge as possible for the full calf stretch.",
    "Drive through the balls of your feet to raise your heels as high as possible.",
    "Re-engage the safety handles after your final rep; your legs must remain fully extended throughout the set."
  ],
  "Dumbbell standing calf raise":[
    "Hold a dumbbell in one hand; stand with the balls of your feet on an elevated surface such as a step or weight plate, heels hanging off.",
    "Hold a stable surface with your free hand for balance.",
    "Lower your heel as far as possible to achieve a full calf stretch.",
    "Press through the ball of your foot to raise your heel as high as possible.",
    "Complete all reps on one foot before switching, or use two dumbbells and work both calves together."
  ],
  "Smith machine standing calf raise":[
    "Place a step or plate on the floor inside the Smith machine; rest the bar on your upper traps and unrack.",
    "Place only the balls of your feet on the edge of the step, heels hanging off.",
    "Lower your heels as far as possible for a full stretch.",
    "Drive through the balls of your feet to raise your heels as high as possible.",
    "Re-rack after your final rep; the Smith machine allows heavier loading than dumbbells for progressive overload."
  ],
  "Machine adduction":[
    "Sit on the adductor machine; adjust the pads so they rest on your inner thighs with your legs spread to the starting position.",
    "Sit with your back flat against the seat and grip the handles.",
    "Squeeze your legs together against the pad resistance, bringing your thighs toward each other.",
    "Slowly allow your legs to spread back to the starting position under control.",
    "Keep your back flat and avoid rounding forward to assist the movement."
  ],
  "Machine abduction":[
    "Sit on the abductor machine; adjust the pads so they rest on your outer thighs with your legs together.",
    "Sit with your back flat against the pad and grip the handles.",
    "Push your legs outward against the pad resistance as far as the machine allows.",
    "Slowly bring your thighs back together to the starting position under control.",
    "Lean slightly forward from your hips to bias the glute medius rather than your hip flexors."
  ],
  "Barbell shrug":[
    "Stand over a loaded barbell with feet hip-width apart; grip it overhand just outside hip-width and lift it to a standing position.",
    "Let the bar hang at your thighs with arms completely straight.",
    "Shrug your shoulders straight up toward your ears as high as possible.",
    "Hold the top position for one count, then lower your shoulders back down slowly.",
    "Do not roll your shoulders — the movement is a pure vertical shrug. Arms stay dead-straight throughout."
  ],
  "Dumbbell shrug":[
    "Stand holding a dumbbell in each hand at your sides with arms fully extended.",
    "Stand upright, feet shoulder-width apart, core braced.",
    "Shrug both shoulders straight up toward your ears as high as possible.",
    "Hold the top for one count, then lower your shoulders back down with control.",
    "Arms stay completely straight — do not bend your elbows or roll your shoulders."
  ],
  "Smith machine shrug":[
    "Stand inside the Smith machine; grip the bar in front of your thighs with an overhand grip at shoulder-width.",
    "Unrack by rotating the bar off the hooks; stand with the bar at thigh level, arms straight.",
    "Shrug your shoulders straight up toward your ears as high as possible.",
    "Lower your shoulders back down slowly under control.",
    "Re-rack after your final rep; the fixed bar path makes heavy shrug work safer and more stable."
  ],
  "Dumbbell wrist curl":[
    "Sit at the end of a bench; rest your forearms on your thighs with palms facing up, wrists just past your knees.",
    "Hold a dumbbell in each hand; let them roll toward your fingertips for a full starting stretch.",
    "Curl your wrists upward as far as possible, contracting your forearm flexors.",
    "Lower back to the fully stretched position under control.",
    "Keep your forearms flat on your thighs throughout — only your wrists should move."
  ],
  "Dumbbell reverse wrist curl":[
    "Sit at the end of a bench; rest your forearms on your thighs with palms facing down, wrists just past your knees.",
    "Hold a dumbbell in each hand; let your wrists lower toward the floor for a full starting stretch.",
    "Curl your wrists upward by contracting the extensor muscles on the back of your forearms.",
    "Lower back to the fully stretched position under control.",
    "Use lighter weight than wrist curls — the extensors are smaller and fatigue quickly; high reps with control are ideal."
  ],
  "Push-ups":[
    "Place your hands on the floor slightly wider than shoulder-width, arms straight, body in a rigid plank from head to heels.",
    "Engage your core and squeeze your glutes — this locked plank is your starting and finishing position.",
    "Lower your chest toward the floor by bending your elbows at roughly 45° from your torso until your chest nearly touches.",
    "Push the floor away and extend your elbows until your arms are fully straight.",
    "Your hips must not sag or pike — your body moves as one rigid unit every rep."
  ],
  "Pike push-ups":[
    "Start in a high plank/push-up position; walk your feet toward your hands until your body forms an inverted V with hips high.",
    "Keep your legs as straight as possible — the closer your feet, the steeper the shoulder angle.",
    "Lower your head toward the floor between your hands by bending your elbows outward and slightly inward.",
    "Push back up until your arms are fully extended, returning to the inverted-V position.",
    "Moving your feet farther from your hands makes the exercise easier; closer makes it harder and more shoulder-dominant."
  ],
  "Wide-grip cable row":[
    "Attach a long straight bar to the low cable; sit on the bench with feet on the foot rests and grip the bar wider than shoulder-width.",
    "Sit upright with arms extended toward the pulley — this is the start.",
    "Pull the bar toward your lower chest by driving your elbows back and out to the sides, squeezing your upper back and rear delts.",
    "Slowly extend your arms back to the start, letting your shoulder blades protract fully.",
    "The wide grip and flared elbows shift the load from your lats to your upper back and rear delts compared to a narrow-grip row."
  ],
  "Single-arm cable fly":[
    "Set the cable to shoulder or upper-chest height; stand sideways to the machine and grab the handle with the hand farthest from the pulley.",
    "Step away for cable tension and stagger your feet for balance; your working arm extends outward with a chest stretch.",
    "Sweep your arm forward and across your body in a wide arc until your hand crosses the midline in front of your chest.",
    "Slowly reverse the arc, allowing the cable to pull your arm back out to the starting stretch position.",
    "Keep a slight bend in your elbow throughout — all movement is from your shoulder joint."
  ],
  "Back extension":[
    "Adjust the hyperextension bench so the hip pad sits just below your hip bones; hook your feet securely under the ankle rollers.",
    "Cross your arms over your chest; let your torso hang down toward the floor — this is your starting position.",
    "Raise your torso by contracting your lower back and glutes until your body is in a straight horizontal line.",
    "Lower back down to the hanging starting position under control.",
    "Stop at horizontal — do not hyperextend past a straight line, which places excessive strain on your lumbar spine."
  ],
  "Decline barbell bench press":[
    "Lie back on a decline bench and hook your ankles securely under the padded rollers.",
    "Grip the bar slightly wider than shoulder-width and unrack it over your lower chest.",
    "Lower the bar under control to your lower chest, elbows at roughly 45 degrees from your torso.",
    "Press the bar back up to full arm extension without losing the arch in your upper back.",
    "Rerack carefully at the end of the set, since a decline bench is harder to bail out of than a flat one."
  ],
  "Barbell floor press":[
    "Lie flat on the floor with a loaded barbell, knees bent and feet flat.",
    "Grip the bar just outside shoulder width and hold it with arms extended above your chest.",
    "Lower the bar until your upper arms/triceps rest on the floor.",
    "Press the bar back up to full extension, focusing on driving through your triceps.",
    "Reset your breath and brace before each rep since there's no bounce off the floor to help you."
  ],
  "Barbell pullover":[
    "Lie on a flat bench with only your shoulders and upper back supported, hips lower than your shoulders.",
    "Hold a barbell with straight arms directly above your chest.",
    "Keeping your elbows slightly bent and fixed, lower the bar in an arc behind your head until you feel a stretch.",
    "Pull the bar back up along the same arc to the starting position over your chest.",
    "Keep your core braced throughout so your lower back doesn't arch to add extra range."
  ],
  "Incline dumbbell fly":[
    "Lie back on an incline bench set to 30-45 degrees, a dumbbell in each hand.",
    "Extend your arms above your chest with a slight bend in your elbows, palms facing each other.",
    "Lower your arms out to the sides in a wide arc until you feel a stretch across your upper chest.",
    "Bring the dumbbells back together above your chest, squeezing your chest at the top.",
    "Keep the same slight elbow bend throughout every rep."
  ],
  "Decline dumbbell fly":[
    "Lie back on a decline bench, a dumbbell in each hand held above your lower chest.",
    "Keep a slight, fixed bend in your elbows, palms facing each other.",
    "Lower your arms out to the sides in a wide arc to chest level.",
    "Bring the dumbbells back together above your chest, squeezing at the top.",
    "Have a spotter hand you the dumbbells to get into position safely."
  ],
  "Dumbbell floor press":[
    "Lie flat on the floor with a dumbbell in each hand, knees bent and feet flat.",
    "Curl the dumbbells up to your chest, then press them up to full extension above you.",
    "Lower the dumbbells under control until your triceps rest on the floor.",
    "Press back up to full extension, keeping your wrists stacked over your elbows.",
    "Repeat for the set, then lower the dumbbells to your chest and set them down safely."
  ],
  "Neutral-grip dumbbell press":[
    "Lie on a flat bench with a dumbbell in each hand, palms facing each other.",
    "Start with the dumbbells at chest height, elbows bent.",
    "Press the dumbbells straight up, keeping your palms facing each other the entire time.",
    "Bring the dumbbells close together at the top without letting them touch.",
    "Lower back to chest height under control and repeat."
  ],
  "Smith machine incline press":[
    "Position an incline bench under the bar of a Smith machine.",
    "Lie back and grip the bar slightly wider than shoulder-width, then twist to unrack it.",
    "Lower the bar to your upper chest under control.",
    "Press the bar back up to full extension along the machine's fixed path.",
    "Twist to rerack the bar securely once your set is finished."
  ],
  "Machine-assisted dip":[
    "Set the assist weight on the machine's stack — more weight means more assistance.",
    "Kneel or stand on the platform and grip the parallel dip handles.",
    "Lower your body by bending your elbows until your upper arms are roughly parallel to the floor.",
    "Press back up to full arm extension without locking out aggressively.",
    "As you get stronger over time, reduce the assist weight to rely on more of your own bodyweight."
  ],
  "Cable crossover":[
    "Set both pulleys high on a dual-pulley cable station and grip a handle in each hand.",
    "Stand centered between the towers with a slight forward lean, arms extended out to the sides.",
    "Sweep your hands down and together in an arc until they cross in front of your hips.",
    "Squeeze your chest at the bottom of the crossing motion.",
    "Control the return back to the starting position and repeat."
  ],
  "Cable low-to-high fly":[
    "Set both pulleys low on a dual-pulley cable station and grip a handle in each hand.",
    "Stand centered between the towers, arms starting down and out to the sides.",
    "Sweep your arms up and in until your hands meet above chest height.",
    "Squeeze your chest at the top before controlling the return.",
    "Keep a slight, fixed bend in your elbows throughout every rep."
  ],
  "Decline push-ups":[
    "Place your feet on a sturdy box or bench and your hands on the floor under your shoulders.",
    "Set your body in a straight line from head to heels.",
    "Lower your chest toward the floor, elbows at roughly 45 degrees.",
    "Press back up to full arm extension without letting your hips sag or pike.",
    "Repeat for the set, keeping your core braced throughout."
  ],
  "Wide-grip push-ups":[
    "Place your hands on the floor noticeably wider than shoulder width.",
    "Set your body in a straight line from head to heels.",
    "Lower your chest toward the floor, letting your elbows flare out to the sides.",
    "Press back up to full arm extension.",
    "Repeat for the set, keeping your core braced to prevent your hips from sagging."
  ],
  "Pendlay row":[
    "Set a barbell on the floor and bend over at the hips until your torso is roughly parallel to the floor.",
    "Grip the bar with hands just outside shoulder width, arms extended straight down.",
    "Pull the bar explosively up to your lower chest, driving your elbows up and back.",
    "Lower the bar back to a full stop on the floor.",
    "Reset your position and repeat for each rep, keeping your back flat throughout."
  ],
  "Rack pull":[
    "Set the safety pins in a squat rack to roughly knee height and load the barbell on top.",
    "Stand at the bar with feet hip-width, hinge down, and grip the bar just outside your shins.",
    "Brace your core and pull the bar up by extending your hips and knees together.",
    "Stand fully upright, squeezing your glutes at the top without leaning back.",
    "Lower the bar back down to the pins under control and reset for the next rep."
  ],
  "Yates row":[
    "Stand over a barbell and bend forward to roughly 45 degrees.",
    "Grip the bar with an underhand grip, hands about shoulder-width apart.",
    "Pull the bar up toward your lower ribs/waist, driving your elbows down and back.",
    "Lower the bar back to the starting position under control.",
    "Keep your torso at the same 45-degree angle throughout the set."
  ],
  "Chest-supported dumbbell row":[
    "Set an incline bench to a low angle and lie face-down with your chest against the pad.",
    "Let a dumbbell hang in each hand with your arms fully extended.",
    "Row the dumbbells up toward your hips, driving your elbows back.",
    "Squeeze your shoulder blades together at the top of the row.",
    "Lower the dumbbells back to a full stretch under control and repeat."
  ],
  "Incline dumbbell row":[
    "Set a bench to a steep incline and lie face-down against it, chest supported.",
    "Let a dumbbell hang in each hand with your arms fully extended.",
    "Row the dumbbells up toward your hips, keeping your elbows close to your body.",
    "Squeeze your shoulder blades together at the top.",
    "Lower under control back to a full stretch and repeat."
  ],
  "Kroc row":[
    "Brace one knee and hand on a flat bench, torso roughly parallel to the floor.",
    "Grip a heavy dumbbell in your free hand, arm hanging straight down.",
    "Row the dumbbell up powerfully toward your hip, allowing a small amount of hip and torso rotation.",
    "Lower the dumbbell back to a full stretch under control.",
    "Complete all reps on one side before switching to the other."
  ],
  "Machine high row":[
    "Sit at the machine and adjust the seat so the handles line up with your upper chest.",
    "Grip the handles with your arms extended forward, chest against the pad.",
    "Pull the handles back and down toward your upper chest, driving your elbows up and out.",
    "Squeeze your shoulder blades together at the back of the movement.",
    "Control the return to the starting position and repeat."
  ],
  "Machine pullover":[
    "Sit at the machine and adjust the seat so your shoulders line up with the machine's pivot point.",
    "Grip the overhead lever bar with your arms raised and elbows slightly bent.",
    "Let the lever arc down and forward toward your torso, pulling with your lats.",
    "Continue until the lever reaches roughly chest or stomach height.",
    "Control the return to the starting overhead position and repeat."
  ],
  "Cable pullover":[
    "Set the pulley high on a cable station and attach a straight bar.",
    "Stand or kneel facing away from the tower with your arms extended overhead.",
    "Keeping a slight bend in your elbows, pull the bar down and forward in an arc to roughly thigh height.",
    "Squeeze your lats at the bottom of the movement.",
    "Control the return back to the overhead starting position and repeat."
  ],
  "Inverted row":[
    "Set a bar at roughly waist height in a rack.",
    "Lie underneath it and grip the bar with arms extended, body in a straight line, heels on the floor.",
    "Pull your chest up to the bar, driving your elbows back.",
    "Lower back down under control to full arm extension.",
    "Keep your body rigid and straight from head to heels throughout the set."
  ],
  "Superman":[
    "Lie face-down on the floor with your arms extended forward overhead and legs straight.",
    "Simultaneously lift your arms, chest, and legs off the floor.",
    "Hold briefly at the top, squeezing your glutes and lower back.",
    "Lower back down under control to the starting position.",
    "Repeat for the set, breathing normally throughout."
  ],
  "Scapular pull-ups":[
    "Hang from a pull-up bar with your arms fully extended.",
    "Without bending your elbows, depress your shoulder blades down and together.",
    "Let your body rise a few inches as your shoulder blades pull down.",
    "Pause briefly, then return to a relaxed hang.",
    "Repeat for the set, keeping your elbows essentially straight throughout."
  ],
  "Landmine press":[
    "Anchor a barbell in a landmine attachment or sturdy corner and load the free end with plates.",
    "Stand in a staggered stance and grip the loaded end with both hands at shoulder height.",
    "Press the bar forward and upward, following its natural pivoting arc.",
    "Extend your arms until they're fully reached forward and up.",
    "Lower back to shoulder height under control and repeat."
  ],
  "Barbell seated shoulder press":[
    "Sit upright on a bench with a barbell held at your upper chest, hands just outside shoulder width.",
    "Brace your core to stabilize your torso since you have no leg drive to help.",
    "Press the bar straight up until your arms are fully extended overhead.",
    "Lower the bar back down to your upper chest under control.",
    "Repeat for the set, keeping your torso upright throughout."
  ],
  "Dumbbell scaption raise":[
    "Stand holding a light dumbbell in each hand at your sides.",
    "Raise your arms diagonally, roughly 30 degrees in front of your body, thumbs leading.",
    "Raise until your arms reach shoulder height.",
    "Lower back down under control to the starting position.",
    "Keep a slight bend in your elbows throughout the set."
  ],
  "Cable Y-raise":[
    "Set both pulleys low on a dual-pulley cable station and cross the cables behind you.",
    "Grip a handle in each hand, arms starting down and slightly crossed in front of your hips.",
    "Raise your arms up and out to form a wide \"Y\" shape overhead.",
    "Lower back down under control to the starting position.",
    "Keep a slight bend in your elbows and use light weight throughout."
  ],
  "Cable front raise":[
    "Set the pulley low on a cable station and stand facing away from the tower.",
    "Grip the handle or rope with your arm hanging down in front of your thigh.",
    "Raise your arm straight forward to shoulder height.",
    "Lower back down under control to the starting position.",
    "Complete all reps on one side, or alternate arms, keeping your torso still throughout."
  ],
  "Plate-loaded shoulder press":[
    "Sit at the machine and adjust the seat so the handles start at shoulder height.",
    "Grip the handles with your back against the pad.",
    "Press the handles up along the machine's fixed path until your arms are extended.",
    "Lower back down under control to shoulder height.",
    "Repeat for the set, keeping your back against the pad throughout."
  ],
  "Drag curl":[
    "Stand holding a barbell with an underhand grip at your thighs, arms extended.",
    "Curl the bar upward while dragging it along the surface of your body.",
    "Let your elbows travel back behind your torso as the bar rises.",
    "Curl until your biceps are fully contracted near your chest.",
    "Lower the bar back down along the same path under control."
  ],
  "21s barbell curl":[
    "Stand holding a barbell at your thighs with an underhand grip.",
    "Perform 7 bottom-half curls, from full extension to your elbow at 90 degrees.",
    "Perform 7 top-half curls, from your elbow at 90 degrees to full contraction.",
    "Finish with 7 full-range curls, from full extension to full contraction.",
    "Keep your elbows pinned at your sides throughout all three phases."
  ],
  "Wide-grip barbell curl":[
    "Stand holding a barbell with your hands noticeably wider than shoulder width.",
    "Keep your elbows tucked at your sides, arms extended at the start.",
    "Curl the bar up toward your shoulders.",
    "Squeeze your biceps at the top before lowering under control.",
    "Repeat for the set without letting your elbows drift forward."
  ],
  "Zottman curl":[
    "Stand holding a dumbbell in each hand at your sides, palms facing forward.",
    "Curl the dumbbells up to shoulder height with a normal underhand grip.",
    "At the top, rotate your wrists so your palms face down.",
    "Lower the dumbbells slowly with this reversed, palms-down grip.",
    "Rotate your wrists back to palms-up at the bottom and repeat."
  ],
  "Spider curl":[
    "Drape your torso face-down over a steep incline bench, arms hanging freely in front.",
    "Grip a dumbbell in each hand, arms fully extended.",
    "Curl the dumbbells up while keeping your upper arms pressed against the bench pad.",
    "Squeeze your biceps at the top of the curl.",
    "Lower slowly and fully back to the starting position."
  ],
  "Cross-body hammer curl":[
    "Stand holding a dumbbell in each hand at your sides with a neutral grip.",
    "Curl one dumbbell diagonally up and across your body toward the opposite shoulder.",
    "Squeeze your biceps at the top before lowering back down along the same path.",
    "Repeat with the same arm for all reps, or alternate arms.",
    "Keep your elbow relatively fixed at your side throughout each rep."
  ],
  "Plate-loaded machine bicep curl":[
    "Sit at the machine and rest your upper arms on the angled pad.",
    "Grip the handles with your arms extended.",
    "Curl the handles up using only your forearms, keeping your upper arms on the pad.",
    "Squeeze your biceps at the top before lowering under control.",
    "Repeat for the set, adjusting the seat so your elbows align with the pivot point."
  ],
  "Cable spider curl":[
    "Set the pulley low and drape your torso face-down over a steep incline bench facing the tower.",
    "Grip the attached bar with your arms hanging down, upper arms against the bench pad.",
    "Curl the bar up to a full contraction, keeping your upper arms pinned to the pad.",
    "Lower back down under control to a full stretch.",
    "Repeat for the set, using lighter weight than you'd expect due to the constant cable tension."
  ],
  "Dumbbell close-grip floor press":[
    "Lie flat on the floor with a dumbbell in each hand held close together above your chest.",
    "Lower the dumbbells, keeping your elbows tucked tight to your ribs.",
    "Stop once your triceps touch the floor.",
    "Press the dumbbells back up, bringing them slightly together at the top.",
    "Repeat for the set, keeping your wrists stacked over your elbows throughout."
  ],
  "Seated machine tricep extension":[
    "Sit at the machine and adjust the seat so your upper arms are braced by the pads.",
    "Grip the handle with your arms bent.",
    "Extend your arms fully, squeezing your triceps at the top.",
    "Return under control to the starting bent position.",
    "Repeat for the set, keeping your upper arms pinned in place throughout."
  ],
  "Bench dips":[
    "Sit on the edge of a bench and grip it with your hands just behind your hips.",
    "Walk your feet out and lift your hips off the bench, arms supporting your weight.",
    "Lower your body straight down until your elbows reach roughly 90 degrees.",
    "Press back up to full arm extension.",
    "Repeat for the set, keeping your elbows pointing behind you rather than flaring out."
  ],
  "Close-grip push-ups":[
    "Place your hands close together on the floor under your chest.",
    "Set your body in a straight line from head to heels.",
    "Lower your chest toward your hands, keeping your elbows tucked tight to your ribs.",
    "Press back up to full arm extension.",
    "Repeat for the set, keeping your wrists straight throughout."
  ],
  "Barbell reverse curl":[
    "Stand holding a barbell with an overhand grip, arms extended at your thighs.",
    "Keeping your elbows pinned at your sides, curl the bar up toward your shoulders.",
    "Squeeze at the top before lowering under control.",
    "Repeat for the set, keeping your wrists firm and straight throughout.",
    "Use lighter weight than your standard curl since this grip is noticeably weaker."
  ],
  "Dumbbell finger curl":[
    "Sit and rest your forearms on your thighs, wrists hanging just past your knees.",
    "Hold a dumbbell loosely in your open fingers, letting it roll down toward your fingertips.",
    "Curl your fingers closed around the handle.",
    "Open your fingers back out under control, letting the dumbbell roll back down.",
    "Repeat for the set, keeping your wrists still throughout."
  ],
  "Cable wrist curl":[
    "Set the pulley low and attach a straight bar.",
    "Sit and rest your forearms on your thighs, wrists hanging just past your knees, palms up.",
    "Curl your wrists up as far as comfortable.",
    "Lower back down under control to a full stretch.",
    "Repeat for the set, keeping your forearms pinned to your thighs throughout."
  ],
  "Cable reverse wrist curl":[
    "Set the pulley low and attach a straight bar.",
    "Sit and rest your forearms on your thighs, wrists hanging just past your knees, palms down.",
    "Extend your wrists upward, lifting the back of your hands.",
    "Lower back down under control to a full stretch.",
    "Repeat for the set, keeping your forearms still throughout."
  ],
  "Bench-supported seated reverse fly":[
    "Sit facing a raised incline bench pad and rest your chest against it.",
    "Let a dumbbell hang in each hand with your arms extended down.",
    "Raise your arms out to the sides with a slight elbow bend, squeezing your shoulder blades together.",
    "Lower back down under control to the starting position.",
    "Repeat for the set, keeping your chest pressed against the pad throughout."
  ],
  "Prone dumbbell Y-raise":[
    "Lie face-down on an incline bench with a light dumbbell in each hand.",
    "Let your arms hang straight down and slightly forward.",
    "Raise your arms up and out to form a \"Y\" shape, thumbs leading.",
    "Lower back down under control to the starting position.",
    "Repeat for the set using light weight, since this is a control exercise, not a strength builder."
  ],
  "Cable reverse fly":[
    "Set both pulleys at shoulder height on a dual-pulley cable station.",
    "Stand centered between the towers and cross your arms in front of your chest to grip the opposite handles.",
    "Sweep your arms outward and back, squeezing your shoulder blades together.",
    "Control the return back to the crossed starting position.",
    "Repeat for the set, keeping a slight bend in your elbows throughout."
  ],
  "Cross-cable reverse fly":[
    "Set both pulleys at shoulder height on a dual-pulley cable station.",
    "Stand between the towers and hinge forward at your hips to roughly 45 degrees.",
    "Reach across your body to grip the opposite handles.",
    "Sweep your arms out and back, squeezing your shoulder blades together.",
    "Control the return to the crossed starting position, keeping your torso hinged throughout."
  ],
  "Barbell high pull":[
    "Stand holding a barbell at your thighs, knees soft, hips slightly hinged.",
    "Pull the bar up close to your body, letting your elbows lead and rise above your hands.",
    "Extend up onto your toes as the bar reaches chest/collarbone height.",
    "Lower the bar back down under control to your thighs.",
    "Repeat for the set, keeping the bar close to your torso throughout."
  ],
  "Dumbbell high pull":[
    "Stand holding a dumbbell in each hand at your thighs, knees soft.",
    "Pull the dumbbells up close to your body, letting your elbows lead and rise above your hands.",
    "Extend up onto your toes as the dumbbells reach chest height.",
    "Lower back down under control to your thighs.",
    "Repeat for the set, keeping the dumbbells close to your torso throughout."
  ],
  "Cable shrug":[
    "Set the pulley low and attach a straight bar or handle.",
    "Stand facing the tower, holding the handle with straight arms.",
    "Shrug your shoulders straight up toward your ears.",
    "Hold briefly at the top, then lower back down under control.",
    "Repeat for the set, keeping your arms locked straight throughout."
  ],
  "Plate-loaded shrug":[
    "Stand within the machine's frame and grip the side handles.",
    "Keep your arms straight throughout the movement.",
    "Shrug your shoulders straight up, letting the machine's loaded arms rise with you.",
    "Hold briefly at the top, then lower back down under control.",
    "Repeat for the set, keeping your head neutral throughout."
  ],
  "Barbell walking lunge":[
    "Rack a barbell across your upper back and stand tall.",
    "Step forward into a lunge, lowering your back knee toward the floor without touching.",
    "Push through your front heel to stand up and step directly into the next lunge with the opposite leg.",
    "Continue alternating legs, walking forward for the set.",
    "Keep your torso upright throughout to maintain balance with the loaded bar."
  ],
  "Barbell step-up":[
    "Rack a barbell across your upper back and stand in front of a sturdy box.",
    "Place one foot flat on top of the box.",
    "Drive through that heel to lift your body up onto the box.",
    "Stand fully upright with both feet on the box.",
    "Step back down under control and repeat, alternating legs or finishing one side first."
  ],
  "Box squat":[
    "Rack a barbell across your upper back and position a box directly behind you at squat depth.",
    "Squat down, pushing your hips back toward the box.",
    "Sit briefly on the box, relaxing your hips at the bottom without leaning back.",
    "Drive back up to standing under control.",
    "Repeat for the set, keeping your core braced through the pause on the box."
  ],
  "Dumbbell front squat":[
    "Hold a dumbbell upright at each shoulder, elbows pointing forward and up.",
    "Stand with feet shoulder-width apart.",
    "Squat down, keeping your torso upright and knees tracking over your toes.",
    "Descend until your thighs are at or below parallel.",
    "Drive back up to standing, keeping the dumbbells racked at your shoulders throughout."
  ],
  "Dumbbell reverse lunge":[
    "Stand tall holding a dumbbell in each hand at your sides.",
    "Step one leg backward into a lunge, lowering your back knee toward the floor.",
    "Keep most of your weight on your front leg throughout the step back.",
    "Push off your front foot to return to standing.",
    "Repeat, alternating legs or finishing one side before switching."
  ],
  "Heel-elevated dumbbell squat":[
    "Place a small wedge or weight plates under your heels.",
    "Stand with feet closer together than a standard squat, a dumbbell in each hand.",
    "Squat down, keeping your torso tall and knees traveling forward.",
    "Descend until your thighs are at or below parallel.",
    "Drive up through your whole foot to return to standing."
  ],
  "Belt squat":[
    "Clip a hip belt onto the machine's loaded mechanism and stand on the raised platform.",
    "Keep your hands free or lightly resting on the side rails.",
    "Squat down, keeping your torso upright as the load travels between your legs.",
    "Descend to your comfortable depth.",
    "Drive through your whole foot to return to standing."
  ],
  "Pendulum squat":[
    "Position yourself under the machine's angled shoulder pads, feet on the platform.",
    "Keep your back against the pads throughout the movement.",
    "Squat down as the sled swings along its pivoting arc.",
    "Descend to your comfortable depth, controlling the resistance as it increases.",
    "Drive back up through your whole foot to complete the arc."
  ],
  "Vertical leg press":[
    "Lie on your back on the machine with your knees bent toward your chest, feet on the platform overhead.",
    "Grip the side handles for stability.",
    "Press the platform straight up until your legs are extended, stopping just short of locking your knees.",
    "Lower the platform back down under control to a full range.",
    "Repeat for the set, keeping your lower back pressed into the pad throughout."
  ],
  "Bodyweight squat":[
    "Stand with feet shoulder-width apart, arms extended forward.",
    "Sit your hips back and down, keeping your chest up and heels flat.",
    "Descend as deep as your mobility comfortably allows.",
    "Push through your whole foot to stand back up.",
    "Repeat for the set, keeping your arms forward for balance throughout."
  ],
  "Jump squat":[
    "Stand with feet shoulder-width apart and load into a quarter squat, arms swung back.",
    "Explode upward as hard as you can, swinging your arms forward and up.",
    "Leave the ground with both feet at the top of the jump.",
    "Land softly with bent knees, absorbing the impact.",
    "Reset into the quarter-squat position and repeat for the set."
  ],
  "Wall sit":[
    "Stand with your back against a wall and slide down until your thighs are roughly parallel to the floor.",
    "Keep your knees stacked over your ankles, not pushed past your toes.",
    "Press your back flat against the wall and hold the position.",
    "Breathe normally throughout the hold.",
    "Slide back up the wall to stand once the target time is reached."
  ],
  "Barbell good morning":[
    "Rack a barbell across your upper back and stand tall.",
    "Keeping a soft, fixed knee bend, hinge forward at your hips.",
    "Lower your torso until it's roughly parallel to the floor, keeping your back flat.",
    "Drive your hips forward to return to standing.",
    "Repeat for the set, starting with very light weight."
  ],
  "Sumo deadlift":[
    "Stand over a barbell with a wide stance, toes turned out.",
    "Grip the bar with your hands inside your knees and set your hips low, chest up.",
    "Drive through the floor, extending your hips and knees together as the bar rises.",
    "Stand fully upright, squeezing your glutes at the top.",
    "Lower the bar back to the floor under control and reset for the next rep."
  ],
  "Stiff-leg deadlift":[
    "Stand holding a barbell at your thighs, legs almost completely straight.",
    "Hinge forward at your hips, letting the bar slide down close to your legs.",
    "Lower until you feel a strong stretch in your hamstrings.",
    "Drive your hips forward to return to standing.",
    "Repeat for the set, keeping your back flat and knees nearly straight throughout."
  ],
  "Single-leg dumbbell RDL":[
    "Stand tall on one leg holding a dumbbell in each hand.",
    "Hinge forward at your hips while your free leg extends straight back.",
    "Lower until your torso is roughly parallel to the floor, forming a \"T\" shape with your free leg.",
    "Drive your hips forward to return to standing, bringing your free leg back down.",
    "Complete all reps on one leg before switching sides."
  ],
  "Dumbbell sumo deadlift":[
    "Stand over a single dumbbell with a wide stance, toes turned out.",
    "Grip the top of the dumbbell with both hands between your legs.",
    "Drive through the floor, extending your hips and knees together as you stand.",
    "Stand fully upright, squeezing your glutes at the top.",
    "Lower the dumbbell back to the floor under control and reset."
  ],
  "Standing machine hamstring curl":[
    "Stand at the machine and lean into the chest pad for support.",
    "Brace one ankle behind the padded roller, leg extended straight down.",
    "Curl your heel up toward your glute.",
    "Squeeze at the top before lowering back down under control.",
    "Complete all reps on one leg before switching to the other."
  ],
  "Cable pull-through":[
    "Set the pulley low and attach a rope, then face away from the tower with the rope between your legs.",
    "Hinge forward at your hips, letting the rope pull your hands back between your legs.",
    "Keep your back flat and knees softly bent throughout.",
    "Drive your hips forward powerfully to stand up, squeezing your glutes at the top.",
    "Repeat for the set, keeping the rope close to your body as it swings through."
  ],
  "B-stance barbell hip thrust":[
    "Rest your upper back against a bench with a barbell across your hips.",
    "Stagger your feet, planting most of your weight on one foot.",
    "Drive through the planted foot to full hip extension, squeezing that glute at the top.",
    "Lower back down under control without letting your hips drop fully.",
    "Complete all reps on one side before switching feet."
  ],
  "Barbell glute bridge":[
    "Lie on your back on the floor with a barbell across your hips and knees bent.",
    "Plant your feet flat on the floor, shoulder-width apart.",
    "Drive your hips straight up, squeezing your glutes at the top.",
    "Lower back down under control to the starting position.",
    "Repeat for the set, keeping your upper back and head resting on the floor throughout."
  ],
  "Curtsy lunge":[
    "Stand tall holding a dumbbell in each hand.",
    "Step one leg diagonally back and across behind your other leg.",
    "Lower until your back knee hovers near the floor, keeping most of your weight on your front leg.",
    "Push through your front heel to return to standing.",
    "Repeat, alternating legs or finishing one side before switching."
  ],
  "Dumbbell single-leg hip thrust":[
    "Rest your upper back against a bench with a single dumbbell resting on your hips.",
    "Plant one foot flat on the floor and extend the other leg straight out.",
    "Drive through the planted foot to full hip extension, keeping the free leg straight.",
    "Lower back down under control without letting your hips drop fully.",
    "Complete all reps on one side before switching legs."
  ],
  "45-degree hip extension machine":[
    "Position your hips at the top edge of the angled pad, ankles secured under the rollers.",
    "Cross your arms over your chest or hold a plate for added resistance.",
    "Hinge down until you feel a stretch in your hamstrings, keeping your back flat.",
    "Rise back up until your body forms a straight line from shoulders to ankles.",
    "Repeat for the set, squeezing your glutes at the top of each rep."
  ],
  "Standing plate-loaded glute kickback":[
    "Stand at the machine and brace yourself on the frame for support.",
    "Place one foot on the loaded platform behind you.",
    "Drive the working leg back and up in a straight line.",
    "Squeeze your glute at the top before lowering back down under control.",
    "Complete all reps on one leg before switching to the other."
  ],
  "Single-leg glute bridge":[
    "Lie on your back with one knee bent and the foot flat on the floor.",
    "Extend the other leg straight out.",
    "Drive your hips up through the planted foot, keeping the extended leg straight.",
    "Lower back down under control to the starting position.",
    "Complete all reps on one side before switching legs."
  ],
  "Frog pump":[
    "Lie on your back with the soles of your feet pressed together and knees splayed wide.",
    "Keep your feet together and knees wide throughout the movement.",
    "Drive your hips straight up, squeezing your glutes hard at the top.",
    "Lower back down under control to the starting position.",
    "Repeat for the set at a higher rep range."
  ],
  "Donkey kicks":[
    "Get on your hands and knees with your back flat.",
    "Keep one knee bent at a fixed 90-degree angle.",
    "Kick that foot up toward the ceiling, driving through your heel.",
    "Squeeze your glute at the top, then lower back down under control.",
    "Complete all reps on one leg before switching to the other."
  ],
  "Barbell standing calf raise":[
    "Rack a barbell across your upper back and stand with the balls of your feet on a small block, heels hanging off.",
    "Lower your heels below the block for a full stretch.",
    "Rise up onto your toes as high as possible.",
    "Squeeze your calves hard at the top, then lower back down.",
    "Repeat for the set, keeping your legs relatively straight throughout."
  ],
  "Single-leg dumbbell calf raise":[
    "Hold a dumbbell in one hand and lightly touch a wall with the other for balance.",
    "Stand on one foot on a small block, heel hanging off the back edge.",
    "Lower your heel below the block for a full stretch.",
    "Rise up onto your toes as high as possible, then lower back down.",
    "Complete all reps on one leg before switching to the other."
  ],
  "Dumbbell seated calf raise":[
    "Sit on a bench with your feet on a small block, heels hanging off.",
    "Rest a dumbbell upright on each knee, holding them in place with your hands.",
    "Lower your heels below the block for a full stretch.",
    "Rise up onto your toes, keeping the dumbbells balanced.",
    "Repeat for the set, pausing briefly at the top of each rep."
  ],
  "Donkey calf raise machine":[
    "Bend forward at the hips and brace your waist under the machine's loaded pad.",
    "Place the balls of your feet on the platform, heels hanging off.",
    "Lower your heels for a full stretch.",
    "Rise up onto your toes as high as possible.",
    "Repeat for the set, holding the support bar for balance throughout."
  ],
  "Standing bodyweight calf raise":[
    "Stand on the edge of a small step with the balls of your feet planted, heels hanging off.",
    "Lower your heels below the step for a deep stretch.",
    "Rise up onto your toes as high as possible.",
    "Pause briefly at the top, then lower back down.",
    "Repeat for the set, lightly touching a wall for balance if needed."
  ],
  "Single-leg bodyweight calf raise":[
    "Stand on one foot on the edge of a small step, heel hanging off the back.",
    "Lower your heel for a full stretch.",
    "Rise up onto your toes as high as possible.",
    "Lower back down under control.",
    "Complete all reps on one leg before switching to the other."
  ],
  "Side-lying dumbbell hip adduction":[
    "Lie on your side with your top leg bent, foot planted in front of your bottom leg.",
    "Rest a light dumbbell on the ankle of your straight, bottom leg.",
    "Lift the bottom leg straight up toward the bent top leg.",
    "Lower back down under control to the starting position.",
    "Complete all reps on one side before switching to the other."
  ],
  "Cable hip adduction":[
    "Attach an ankle cuff to the leg farther from the tower and stand sideways to it.",
    "Start with that leg raised out to the side, crossing your body's midline.",
    "Sweep the leg inward, across your body, past your standing leg.",
    "Return under control to the starting position.",
    "Complete all reps on one side before switching legs."
  ],
  "Sumo squat hold":[
    "Take a wide stance with your toes turned out.",
    "Lower into a squat until your thighs are parallel to the floor.",
    "Hold that position, keeping your knees tracking out over your toes.",
    "Keep your torso upright throughout the hold.",
    "Stand back up once the target time is reached."
  ],
  "Cable hip abduction":[
    "Attach an ankle cuff to the leg closer to the tower and stand sideways to it.",
    "Start with that leg crossed slightly in front of your standing leg.",
    "Sweep the leg outward, away from your body, as far as comfortable.",
    "Return under control to the starting position.",
    "Complete all reps on one side before switching legs."
  ],
  "Side-lying leg raise":[
    "Lie on your side with your legs stacked and straight.",
    "Lift your top leg straight up, keeping it in line with your body.",
    "Raise as high as comfortable without rolling your hips backward.",
    "Lower back down under control to the starting position.",
    "Complete all reps on one side before switching to the other."
  ],
  "Clamshells":[
    "Lie on your side with your knees bent and stacked, feet together.",
    "Keep your feet touching throughout the movement.",
    "Open your top knee upward like a hinge.",
    "Lower back down under control to the starting position.",
    "Complete all reps on one side before switching to the other."
  ],
  "Standing hip abduction":[
    "Stand tall, lightly holding a wall or chair for balance.",
    "Lift one leg straight out to the side, fully extended.",
    "Raise as high as comfortable while keeping your torso upright.",
    "Lower back down under control to the starting position.",
    "Complete all reps on one leg before switching to the other."
  ],
  "Dumbbell side bend":[
    "Stand holding a single dumbbell in one hand, letting it hang at your side.",
    "Bend directly sideways toward the dumbbell.",
    "Feel the stretch on the opposite side of your torso at the bottom.",
    "Return to standing under control.",
    "Complete all reps on one side, then switch hands and repeat on the other."
  ],
  "Weighted sit-up":[
    "Lie on your back with your knees bent and feet flat on the floor.",
    "Hold a single dumbbell or plate against your chest with both hands.",
    "Curl your torso up to a seated position, keeping the weight clamped to your chest.",
    "Lower back down under control to the starting position.",
    "Repeat for the set, keeping your feet anchored throughout."
  ],
  "Cable woodchopper":[
    "Set the pulley high and stand sideways to the tower.",
    "Grip the handle with both hands near one shoulder.",
    "Rotate your torso and pull the handle diagonally down and across your body toward the opposite hip.",
    "Return under control to the starting position.",
    "Complete all reps on one side before switching to the other."
  ],
  "Captains chair leg raise":[
    "Rest your forearms on the padded armrests and press your back into the pad.",
    "Let your legs hang straight down to start.",
    "Raise your legs up in front of you, bending your knees toward your chest.",
    "Lower back down under control to the starting position.",
    "Repeat for the set, keeping your torso braced against the pad throughout."
  ],
  "Hollow body hold":[
    "Lie on your back, then lift your shoulders and legs off the floor at the same time.",
    "Extend your arms overhead and your legs straight.",
    "Keep your lower back pressed into the floor throughout the hold.",
    "Hold the position, breathing normally.",
    "Lower back down once the target time is reached."
  ],
  "V-ups":[
    "Lie flat with your arms extended overhead and legs straight.",
    "Simultaneously fold your torso and legs upward.",
    "Reach your hands toward your toes at the top, balancing on your hips.",
    "Lower back down under control to the starting position.",
    "Repeat for the set, bending your knees slightly if the full straight-leg version is too difficult."
  ]
};
const EX_INSTRUCTIONS_JA={
"Ab wheel rollout": [
"マットに膝をつき、肩の下にホイールをセットして腕を伸ばします。",
"骨盤を軽く後傾させ、お尻を締めて腰を平らにロックします。",
"ホイールを前方に転がし、体が一直線になるまで伸ばしていきます。",
"腰が反らない範囲までで止めましょう。",
"腹筋を使ってホイールをスタート位置まで引き戻し、戻りながら息を吐きます。"
],
"Arnold press": [
"背もたれ付きのベンチに座り、背中をパッドに預けます。ダンベルを肩の高さで両手に持ち、手のひらを自分に向けます。",
"体幹を固め、足の裏全体を床に付けます。",
"ダンベルを押し上げながら手のひらを外側に回転させ、腕が伸びきる頃には正面を向くようにします。",
"手のひらを内側に回転させ戻しながらダンベルを下ろし、肩の高さで再び自分の方を向くようにします。",
"回転は下から上まで滑らかに連続させ、2段階に分けないようにしましょう。"
],
"Back extension": [
"ハイパーエクステンションベンチを、腰パッドが骨盤のすぐ下に来るように調整し、足首をローラーにしっかり固定します。",
"腕を胸の前で組み、上体を床に向けて下ろします。これがスタートポジションです。",
"腰と臀部の力で上体を起こし、体が一直線の水平になるまで上げていきます。",
"コントロールしながら、ぶら下がったスタートポジションまで戻します。",
"水平の位置で止め、まっすぐより上に反らさないようにしましょう。腰椎に過度な負担がかかります。"
],
"Barbell back squat": [
"ラックのバーを肩の高さにセットし、バーの下に入って僧帽筋の上に乗せます。手は肩幅よりやや広めに握ります。",
"バーをラックから外して一歩下がり、足は肩幅に開いてつま先はやや外向き。体幹を固めて胸を高く保ちます。",
"お尻を後ろに引きながら両膝を同時に曲げて下ろします。胸は高く、膝はつま先の方向を保ちましょう。",
"最低でも太ももが床と平行になる深さまで下ろし、かかとで床を押して立ち上がります。",
"スポッターなしでトレーニングする際は、必ず平行の深さかそれよりやや低い位置にセーフティバーを設定しましょう。"
],
"Barbell curl": [
"バーベルを腰の高さで逆手(アンダーグリップ)で持ち、手は肩幅に開いて立ちます。",
"上腕を体の横に固定し、足は肩幅に開いて体幹を固めます。",
"肘を曲げてバーを肩に向けてカールし、上腕は動かさないようにします。",
"バーを完全にコントロールしながらスタート位置まで戻します。落とさないようにしましょう。",
"体を揺らしたり肘を前に流したりせず、肘関節のみで動かしましょう。"
],
"Barbell deadlift": [
"バーの真下に足の中央がくるように立ち、足は腰幅に開きます。股関節を折り曲げ、すねのすぐ外側を握ります。",
"背中を平らにし、胸を上げ、腕をまっすぐ伸ばしたままバーのたるみを取ります。",
"体幹を固め、床を押し離すように力を出します。お尻と肩を同時に上げ、バーはすねに沿わせて引き上げます。",
"膝を過ぎたら、腰を前に押し出して高い位置でロックアウトします。上体を後ろに反らさないようにしましょう。",
"股関節から折り曲げ、膝を過ぎたら曲げていく形でコントロールしながらバーを床に戻し、毎レップリセットします。"
],
"Barbell front squat": [
"ラックのバーを肩の高さにセットし、前肩の上に乗せます。肘を高く上げ、指先をバーの下に添えます。",
"バーを外して一歩下がり、足は肩幅に開いてつま先はやや外向きにします。",
"体幹を固め、上体をできるだけ垂直に保ちながら真下にしゃがみます。肘は高いままにしましょう。",
"お尻が膝の高さより下がるまで下ろします。膝はつま先の方向へ、かかとは床に付けたままにします。",
"足裏全体で床を押して立ち上がります。バーが安定するよう肘を高く保ち、まっすぐ立ちましょう。"
],
"Barbell hip thrust": [
"床に座り、上背部をベンチに預けます。バーベルを脚の上から転がして腰の上に乗せ、フォームパッドを使うと快適です。",
"足は腰幅に開いて床にしっかり付け、膝は約90度に曲げてつま先はやや外向きにします。上背部はベンチの中央に乗せます。",
"かかとで床を押し、お尻を締めながら腰を押し上げます。太ももが床と平行になり、膝から肩まで一直線になるようにしましょう。",
"コントロールしながら腰を床の方に戻し、繰り返します。",
"あごは引いたまま、天井を見上げないようにしましょう。トップでの腰の反りすぎを防げます。"
],
"Barbell overhead press": [
"バーベルを胸上部の高さのラックにセットし、肩幅よりやや広めに親指を巻き付けて握ります。",
"バーを外して一歩下がり、足は肩幅に開きます。バーは胸上部の高さで持ち、肘はバーのすぐ下、やや前に構えます。",
"バーをまっすぐ上に押し上げます。頭をわずかに後ろに引いてバーを通し、腕が完全に伸びきるまで押します。",
"バーを胸上部の高さまでコントロールしながら下ろします。",
"体幹を固め、腰を過度に反らさないようにしましょう。バーはまっすぐ垂直の軌道で押し上げます。"
],
"Barbell push press": [
"バーを前肩にラックし、肘はやや前方、手は肩幅よりやや外側に置きます。",
"沈み込み: 膝を曲げて浅いクォータースクワットに入り、上体は完全に垂直を保ちます。",
"押し出し: 脚を一気に伸ばしてバーを肩から打ち出します。",
"バーが顔を通過したら、腕を完全にロックアウトするまで頭上に突き上げます。",
"膝を軟らかく使って衝撃を吸収しながらバーを肩まで下ろし、次のレップの前にリセットします。"
],
"Barbell row": [
"バーベルの上に足を腰幅に開いて立ち、股関節を45〜70度ほど折り曲げます。バーは肩幅よりやや広めに順手で握ります。",
"背中は平らに、胸は高く保ち、バーを腕の長さいっぱいにぶら下げた状態がスタートです。",
"肘を後方・上方に引きながら、バーを下胸部か上腹部に向けて引き上げます。",
"腕を完全に伸ばしながら、コントロールした軌道でバーをぶら下げた位置まで戻します。",
"上体の角度は動作中ずっと固定しましょう。引くときに立ち上がりたくなる衝動を抑えましょう。"
],
"Barbell shrug": [
"バーベルの上に足を腰幅に開いて立ち、腰幅よりやや外側で順手で握って立ち上がります。",
"腕を完全に伸ばした状態で、バーを太ももの前にぶら下げます。",
"肩をできるだけ高く、耳に向かって真上にすくめます。",
"トップの位置を一拍キープしてから、肩をゆっくり戻します。",
"肩を回さないようにしましょう。純粋な垂直方向のシュラッグです。腕は動作中ずっとまっすぐ伸ばしたままにします。"
],
"Barbell skull crusher": [
"ベンチに仰向けになり、バーベルかEZバーを肩幅で握り、腕を胸の真上に垂直に伸ばします。",
"上腕は天井に向けてまっすぐ保ち、動作中は完全に静止させます。",
"肘だけを曲げて、バーを額か頭のすぐ後ろまで下ろします。",
"肘を伸ばしてバーをスタート位置まで押し戻します。",
"下ろす動作は特に慎重にコントロールしましょう。バーが顔に近いため、意図的にゆっくりとしたネガティブが必要です。"
],
"Barbell upright row": [
"バーベルを太ももの前で順手・肩幅グリップで持ちます。",
"肘を体の外側に向けて先導させながら、バーを体に沿ってまっすぐ引き上げます。",
"バーが胸上部の高さに達し、肘が肩よりわずかに高い位置で止めます。",
"手首は肘より下に、バーは体の近くを保ったまま動作を通しましょう。",
"腕が完全に伸びるまでゆっくり下ろします。レップの間に体を揺らしたり反らしたりしないようにしましょう。"
],
"Bench dumbbell chest press": [
"フラットベンチに座り、両膝の上にダンベルを1つずつ乗せます。仰向けになりながら片方ずつ蹴り上げて構えます。",
"ダンベルを胸の真上で持ち、腕を伸ばして手のひらを前方に向けます。",
"コントロールした弧を描きながら、上腕がベンチと同じ高さになるまでダンベルを下ろします。肘の角度は約60〜75度です。",
"同じ弧を描きながら、ダンベルを真上よりやや内側に向けてスタート位置まで押し上げます。",
"終える際はダンベルを太ももに戻してから起き上がりましょう。床に落とさないようにしましょう。"
],
"Bent-over dumbbell reverse fly": [
"両手にダンベルを持ち、上体が床とほぼ平行になるまで股関節から前傾します。腕は下にぶら下げます。",
"背中は平らに、体幹を締め、膝は軽く曲げておきます。",
"肘を先導させながら、両腕を大きく弧を描いて体の横に持ち上げ、肩の高さまで上げます。",
"トップでリアデルトをぎゅっと締め、コントロールしながらダンベルを下ろします。",
"持ち上げるときに上体が起き上がらないようにしましょう。前傾の角度をセット全体で固定しておきましょう。"
],
"Bicycle crunch": [
"仰向けになり、指先をこめかみに添えて膝を立て、肩甲骨をマットから浮かせます。",
"片方の膝を引き寄せながら、もう片方の脚を伸ばして床の少し上に浮かせます。",
"肋骨から回転させ、反対側の肘を曲げた膝に近づけます。",
"自転車を漕ぐような滑らかな動きで左右を切り替えます。伸ばして、引き寄せて、回転させて。",
"腰をマットに押し付けたまま、どちらの方向もゆっくり動かしましょう。"
],
"Bulgarian split squat": [
"後ろ足をベンチや台の上に乗せます。下ろしたときにすねが垂直を保てるくらい、前足を前方に置きましょう。",
"上体をまっすぐ起こし、体幹を固めます。ダンベルを体の横に持つか、バーベルを背中に担ぎます。",
"両膝を同時に曲げながら、後ろの膝を床に向けて下ろします。前のすねは垂直を保ちましょう。",
"前足のかかとで床を押して、スタート位置まで立ち上がります。",
"体重の大部分は前足に乗せましょう。後ろ足はバランスを取るためだけで、押し上げには使いません。"
],
"Cable bicep curl": [
"プーリーを最も低い位置にセットし、ストレートバーかEZバーを取り付けます。肩幅で逆手に握ります。",
"まっすぐ立ち、少し後ろに下がってケーブルにテンションをかけ、腕を下に伸ばした状態から始めます。",
"上腕を動かさず、肘を体の横に固定したまま、バーを肩に向けてカールします。",
"ケーブルのテンションに逆らいながら、腕が完全に伸びきるまでゆっくりバーを下ろします。",
"ケーブルは最下点でも一定のテンションを保つので、ダンベルより効果的に全可動域を鍛えられます。"
],
"Cable chest fly": [
"両方のプーリーを胸か肩の高さにセットし、中央に立って片手ずつハンドルを握ります。",
"片足を前に出した構えで、背中を平らに保ちながらわずかに前傾します。腕は外側に伸ばし、肘は軽く曲げます。",
"両腕を前方かつ内側に大きく弧を描いて動かし、体の前、胸の高さあたりでハンドルを合わせます。",
"胸に十分なストレッチを感じるまで、ゆっくり弧を逆再生するように腕を開いていきます。",
"戻す動作もコントロールしましょう。ケーブルに腕を制御不能な形で引き戻されないようにします。"
],
"Cable crunch": [
"ケーブルを一番上の位置にセットしてロープアタッチメントを取り付け、プーリーの下に膝をつき、顔の両側でロープの両端をそれぞれの手で握ります。",
"膝をついた状態で股関節は完全に固定し、動かさないようにします。",
"背骨を丸めながら体を下方向に丸め込み、肘を太ももに近づけます。",
"収縮した姿勢を一瞬キープしたら、ケーブルのテンションを保ちながらゆっくりとスタートポジションに戻します。",
"動作は腹筋だけで行い、お尻がかかとの方に沈み込まないようにします。"
],
"Cable face pull": [
"ケーブルプーリーを顔の高さにセットし、ロープアタッチメントを取り付けて手のひらを下に向けた状態で両端を握ります。",
"ケーブルにテンションがかかるまで後ろに下がり、足を肩幅に開いて、腕をプーリーの方向に伸ばして立ちます。",
"肘を外側かつ上方向、耳の高さまで開きながら、上腕を外旋させてロープを顔に向かって引きます。",
"引き切った位置では親指が後ろを向き、手は耳の高さにあります。この位置で一瞬しっかり収縮させます。",
"コントロールしながらゆっくりとロープをスタート位置に戻します。上体は動作中ずっと安定させておきましょう。"
],
"Cable glute kickback": [
"プーリーを一番下の位置にセットし、アンクルストラップを片足の足首に装着します。",
"タワーに向かって立ち、フレームを持って、軸足の膝を軽く緩めながら上体を少し前傾させます。",
"ストラップを付けた脚をまっすぐ後方かつ上方に振り上げ、トップでお尻を締めます。",
"動作中は骨盤を正面に向けたまま、腰は自然なニュートラルポジションを保ちます。",
"ウェイトスタックが完全に着地しないようコントロールしながら戻します。セットを終えたら反対の脚に切り替えます。"
],
"Cable lateral raise": [
"ケーブルプーリーを低い位置にセットし、マシンの横に立って、プーリーから遠い方の手でハンドルを握ります。",
"上体をまっすぐに保ち、近い方の手は軽くマシンに添えてバランスを取ります。",
"腕を大きな弧を描くように横から上へ、床と平行になるまで上げます。ケーブルは体を横切るように引かれます。",
"ケーブルのテンションに逆らいながら、ゆっくりと腕を下ろします。",
"プーリーとは反対側へ軽く体を傾けることで可動域が広がり、スタート位置でもテンションを保てます。"
],
"Cable rope hammer curl": [
"プーリーを一番下の位置にセットしてロープアタッチメントを取り付け、手のひらを向かい合わせにして両端をそれぞれの手で握ります。",
"まっすぐ立ち、ケーブルにテンションがかかるまで後ろに下がって、腕を下に伸ばした状態からスタートします。",
"手のひらを向かい合わせにしたまま、ロープの両端を肩に向かって巻き上げます。",
"トップではロープの両端を少し外側に開くと、より強い収縮が得られます。",
"コントロールしながらロープを下ろし、次のレップの前に腕を完全に伸ばし切ります。"
],
"Cable rope tricep extension": [
"ケーブルを一番上の位置にセットしてロープアタッチメントを取り付け、手のひらを向かい合わせにして両端をそれぞれの手で握ります。",
"肘を体側に固定し、約90度に曲げた状態で、上体を少し前傾させて立ちます。",
"肘を伸ばしながらロープを押し下げ、伸びきったタイミングで両端を左右に開きます。",
"コントロールしながらロープを戻し、肘が再び90度になるようにします。",
"下端でロープを開く動作は上腕三頭筋の収縮を強めるので、意識的に行いましょう。"
],
"Cable tricep kickback": [
"低い位置のプーリーにDハンドルを取り付け、マシンの横に立って、手のひらを内側に向けて片手で握ります。",
"上体が床に対して約45度になるまで股関節から前傾し、上腕を体側に固定して床と平行にします。",
"肘を伸ばしながら前腕を後方に伸展させ、腕全体が床と平行になるまで動かします。",
"ケーブルの負荷に逆らいながら、ゆっくりと肘を90度まで戻します。",
"上腕は完全に固定したまま、前腕だけが肘を支点に動きます。"
],
"Chest dips": [
"平行棒に腕を伸ばし切った状態で乗り、膝を曲げて足首を交差させます。",
"上体を約30度前傾させ、胸を床に向けるようにします。",
"肩が肘の高さに近づくまで体を下ろし、肘は少し外側に開かせます。",
"下端でも前傾姿勢を保ち、胸全体にストレッチを感じましょう。",
"胸を収縮させながら押し上げ、肘を完全に伸ばし切る直前で止めます。"
],
"Chest-supported machine row": [
"パッドの高さを、胸がしっかり密着するように調整し、ハンドルを楽な高さにセットします。",
"胸をパッドにしっかり押し付けた状態で座り、ハンドルを握ります。",
"肘を後方に引きながらハンドルを引き、肩甲骨を寄せ合わせます。",
"ゆっくりとハンドルをスタート位置に戻し、腕を完全に伸ばして肩甲骨を開きます。",
"チェストパッドが腰への負担を取り除いてくれます。しっかり押し付けて、背中だけを効かせましょう。"
],
"Chin-ups": [
"懸垂バーを肩幅かそれよりやや狭い間隔で、手のひらを自分の方に向けて（逆手で）握ります。",
"腕を完全に伸ばしてぶら下がり、引く前に肩甲骨を軽く寄せて広背筋を働かせます。",
"肘を下方向かつ腰に向けて引きながら、顎がバーを越えるまで体を引き上げます。",
"腕が再びまっすぐになるまで、完全にコントロールしながら体を下ろします。",
"逆手グリップは通常の懸垂より上腕二頭筋を多く使います。腕だけでなく、まず背中から動作を始めましょう。"
],
"Close-grip bench press": [
"ラックの中でベンチに仰向けになり、肩幅より狭く（拳一つ分程度の間隔で）、親指を巻き付けてバーを握ります。",
"腕を完全に伸ばした状態でバーをラックアウトし、胸の上に構えます。",
"肘を脇腹に近づけたまま外に開かず、バーを胸の下部・胸骨あたりまで下ろします。",
"同じ軌道でバーを押し上げ、腕を完全に伸ばし切ります。",
"狭いグリップと締めた肘により、主な負荷が胸から上腕三頭筋へと移ります。"
],
"Concentration curl": [
"ベンチに座り、足を大きく開いて上体を前に倒します。",
"片方の肘の裏側を同じ側の太ももの内側に押し当て、ダンベルをぶら下げます。",
"その肩に向かってダンベルを巻き上げます。肘は太ももから離しません。",
"トップで1秒間しっかり収縮させます。",
"腕が完全にまっすぐになるまで下ろします。セットを終えたら反対の腕に切り替えます。"
],
"Dead hang": [
"懸垂バーを肩幅よりやや広く、順手で握ります。",
"台に乗るかジャンプして、腕を完全に伸ばした状態で全体重をぶら下げます。",
"肩が自然に上がるのに任せ、背骨を解放させます。呼吸は落ち着いて続けましょう。",
"目標の時間まで保持します。過度に揺れないよう、握りのテンションを保ちましょう。",
"保持が終わったら、慎重に台に足をつけるか体を下ろします。"
],
"Decline dumbbell press": [
"ベンチをデクラインの角度に設定し、脚をレッグパッドの下にしっかり固定します。",
"仰向けになり、肘を曲げた状態で胸の下部の両脇にダンベルを構えます。",
"両方のダンベルをやや内側に向けて押し上げ、腕を完全に伸ばし切ります。",
"肘がベンチの高さ程度になるまで、コントロールしながら下ろします。",
"最後のレップの後、ダンベルを胸の下部に引き寄せ、体幹を使って体を起こします。"
],
"Decline sit-ups": [
"デクラインベンチのレッグパッドに足をしっかり引っ掛け、腕を胸の前で組むか頭の後ろに軽く添えて仰向けになります。",
"上体が床と平行になり、背中がパッドに平らについた状態からスタートします。",
"腹筋を収縮させながら上体を丸め、ほぼ垂直になるまで起き上がります。",
"背中が再びパッドに平らにつくまで、ゆっくりと下ろします。",
"手を頭の後ろに添える場合は、あくまで軽く支えるだけにし、首を前に引っ張らないようにします。"
],
"Diamond push-ups": [
"プッシュアップの姿勢を取り、胸骨の下で両手を合わせて、人差し指と親指でダイヤモンドの形を作ります。",
"体幹とお尻を固め、頭からかかとまで一直線のプランク姿勢を保ちます。",
"肘を曲げて胸をダイヤモンドに近づけます。肘は外側に開かず、後方に動かします。",
"スタート位置まで押し戻し、腕を完全に伸ばし切ります。",
"難易度を下げるには膝をつき、上げるには足を高い位置に置きます。"
],
"Dumbbell Romanian deadlift": [
"ダンベルを両手に持ち、手のひらを体に向けて太ももの前に構えて立ちます。",
"背中はまっすぐに保ち、膝は軽く緩め、体幹をしっかり固めます。",
"股関節から前傾し、ダンベルを脚に沿わせながら、すねに近い位置を保って下ろします。",
"ハムストリングスが十分に伸びたと感じたところで、腰が丸まる前に止めます。",
"骨盤を前に押し出し、お尻を強く締めながら立ち上がります。"
],
"Dumbbell bicep curl": [
"ダンベルを両手に持ち、手のひらを前に向けて体の横に構えて立ちます。",
"上腕を体側に固定し、肩を後ろに引いて胸を張ります。",
"上腕を完全に固定したまま、両方（または片方ずつ）のダンベルを肩に向かって巻き上げます。",
"完全にコントロールしながら、ダンベルをスタート位置まで下ろします。",
"肘は動作中ずっと体幹と同じラインに保ち、巻き上げる際に前に流れないようにします。"
],
"Dumbbell fly": [
"ベンチに仰向けになり、腕をほぼ完全に伸ばして肘を軽く曲げた状態で、2つのダンベルをスタート位置まで押し上げます。",
"その肘の角度を保ったまま、大きな弧を描くように腕を床に向かって開きます。",
"胸に深いストレッチを感じるまで下ろします。上腕がベンチとほぼ同じ高さになる位置です。",
"胸を収縮させながら、同じ弧を描いて両腕を戻し、ダンベルが再び胸の上にくるまで上げます。",
"動作はすべて肩関節から行い、肘の角度は変えません。"
],
"Dumbbell front raise": [
"ダンベルを両手に持ち、手のひらを下か内側に向けて、太ももの前に構えてまっすぐ立ちます。",
"体幹を固め、上体をまっすぐに保ち、腕はほぼ完全に伸ばした状態にします。",
"両腕を体の前方かつ上方に、床と平行になるまで上げます。",
"コントロールしながら弧を描くように、太ももの位置まで戻します。",
"上体を揺らさず、動作は完全に肩の前部（三角筋前部）だけで行います。"
],
"Dumbbell hip thrust": [
"床に座り、上背部をベンチに預けます。ダンベルを骨盤の上に乗せ、両手で押さえます。",
"足は腰幅に開いて床にしっかりつけ、膝はおよそ90度に曲げます。",
"かかとで床を押し、お尻を締めながら腰を持ち上げ、膝から肩まで体が一直線になるようにします。",
"コントロールしながら腰を床に向けて下ろします。",
"あごは軽く引いたまま、体が一直線になったところで止め、腰を反りすぎないようにします。"
],
"Dumbbell lateral raise": [
"直立し、両手にダンベルを持って体の横に下げ、肘を軽く曲げます。",
"体幹を固定し、動作中は上体を完全に静止させます。これは厳密なアイソレーション種目です。",
"両腕を大きな弧を描くように横に上げ、床と平行になるまで持ち上げます。肘をわずかに先行させます。",
"ダンベルを完全にコントロールしながら体の横まで下ろします。",
"僧帽筋をすくめないよう、首を長く保ち、肩を下げたままにします。"
],
"Dumbbell lunge": [
"直立して両手にダンベルを持ち、体の横に下げます。片足を大きく前に踏み出します。",
"上体をまっすぐに保ち、前脚のすねはほぼ垂直に、前膝は足の人差し指の方向に向けます。",
"前脚の太ももが床とほぼ平行になるまで、後ろ膝を床に向かって下ろします。",
"前足のかかとで床を押し、立ち上がります。",
"交互に行う場合は反対の足を前に出します。片側ずつ行う場合は、そのまま全レップを終えてから足を入れ替えます。"
],
"Dumbbell pullover": [
"フラットベンチに対して横向きに寝転び、上背部だけをベンチに乗せます。足は床につけ、腰はやや下げます。",
"ダンベルを1つ両手で持ち、肘を軽く曲げたまま腕をほぼ伸ばして胸の上に構えます。",
"ダンベルを弧を描くように頭の後ろへ下ろし、胸と広背筋に深いストレッチを感じます。",
"同じ弧を描くようにダンベルを胸の真上まで引き戻します。",
"腰は低い位置を保ち、肘の角度も一定に固定します。これはプレス動作ではなく弧を描く動きです。"
],
"Dumbbell reverse wrist curl": [
"ベンチの端に座り、前腕を太ももに乗せます。手のひらは下向きにし、手首が膝より少し先に出るようにします。",
"両手にダンベルを持ち、手首を床に向けて下ろし、しっかりストレッチをかけます。",
"前腕の背面にある伸筋群を使って、手首を上に巻き上げます。",
"コントロールしながら、完全にストレッチした位置まで戻します。",
"リストカールより軽い重量を使いましょう。伸筋群は小さくすぐ疲労するため、コントロールされた高回数が理想的です。"
],
"Dumbbell shrug": [
"両手にダンベルを持ち、腕を完全に伸ばして体の横に下げて立ちます。",
"直立し、足は肩幅に開き、体幹を締めます。",
"両肩をできるだけ高く、まっすぐ耳に向かって持ち上げます。",
"一番上で1秒キープし、コントロールしながら肩を下ろします。",
"腕は常にまっすぐ伸ばしたままにし、肘を曲げたり肩を回したりしないようにします。"
],
"Dumbbell skull crusher": [
"ベンチに仰向けになり、両手にダンベルを持って胸の上で腕を伸ばし、手のひらを向かい合わせにします。",
"上腕は垂直に保ち、動作中は完全に静止させます。",
"肘を曲げ、両方のダンベルを頭の横に向かって下ろします。",
"肘を伸ばして、開始姿勢まで腕を戻します。",
"上腕が動いてしまう場合は重量を下げましょう。この種目は肘の曲げ伸ばしだけで行うのが正解です。"
],
"Dumbbell standing calf raise": [
"片手にダンベルを持ち、ステップ台やプレートなど段差のある台に足の付け根(母趾球)を乗せ、かかとを台の外に出します。",
"空いている手で安定した場所につかまり、バランスを取ります。",
"ふくらはぎに十分なストレッチがかかるまで、かかとをできるだけ深く下げます。",
"母趾球で床を押し、かかとをできるだけ高く持ち上げます。",
"片足ずつ全レップを終えてから反対側に切り替えるか、ダンベルを2つ使って両足同時に行います。"
],
"Dumbbell step-up": [
"膝の高さほどの頑丈なボックスの前に立ち、両手にダンベルを持ちます。",
"足全体をボックスにしっかり乗せます。",
"そのかかとで押して体を持ち上げます。床に残っている脚で蹴らないようにします。",
"両足をボックスに乗せ、完全に立ち上がります。",
"コントロールしながら台から下り、片脚ずつ、または左右交互に繰り返します。"
],
"Dumbbell sumo squat": [
"足を肩幅よりかなり広く開き、つま先を約45度外側に向けて立ちます。ダンベルを1つ、両手で縦に持って脚の間に構えます。",
"上体をまっすぐに保ち、体幹を締めます。ダンベルは脚の間で自由にぶら下げます。",
"両膝をつま先の方向に押し出しながら曲げ、太ももが床と平行かそれ以下になるまで下ろします。",
"かかとで床を押し、脚を伸ばして立ち上がります。",
"動作中は胸を張り続け、下ろす際に腰が丸まらないようにします。"
],
"Dumbbell wrist curl": [
"ベンチの端に座り、前腕を太ももに乗せます。手のひらは上向きにし、手首が膝より少し先に出るようにします。",
"両手にダンベルを持ち、指先の方向へ転がして、開始姿勢でしっかりストレッチをかけます。",
"前腕の屈筋群を収縮させ、手首をできるだけ高く巻き上げます。",
"コントロールしながら、完全にストレッチした位置まで戻します。",
"前腕は太ももの上に平らに乗せたままにし、手首だけを動かします。"
],
"EZ bar curl": [
"EZバーの角度がついた部分を、肩幅程度でアンダーグリップ(逆手)で握ります。",
"姿勢をまっすぐにし、肘を軽く脇腹に固定します。",
"上腕を動かさずに、バーを胸の上あたりの高さまで巻き上げます。",
"一番上で上腕二頭筋を一瞬しっかり収縮させます。",
"毎レップ、コントロールしながら腕が完全に伸びる位置まで下ろします。"
],
"EZ bar front raise": [
"直立し、EZバーの内側の角度がついた部分を両手で持ちます。手のひらはやや内向きにし、バーを太ももの前に構えます。",
"体幹を締め、上体を完全に静止させます。",
"バーを前方かつ上方向にまっすぐ持ち上げ、腕が床と平行になるまで上げます。",
"コントロールしながら弧を描くように、バーを太もものところまで下ろします。",
"肘を曲げたり上体を揺らして助けたりせず、三角筋前部の力だけで持ち上げます。"
],
"Farmers carry": [
"両手に重いダンベルを持ち、デッドリフトの要領で持ち上げます。背中をまっすぐ保ったまま股関節を折り曲げて立ち上がり、猫背にならないようにします。",
"姿勢を高く保ちます。肩は後ろ下に引き、肋骨は骨盤の真上に乗せ、視線は前方に向けます。",
"短く速い、コントロールされた歩幅で歩き、両方のダンベルを水平に保ちます。",
"握りは強く保ち、腕はまっすぐにします。肩をすくめたり振ったりしないようにします。",
"目標の時間または距離を歩いたら、背中をまっすぐ保ったまま股関節を折り曲げてダンベルを下ろします。"
],
"Flat barbell bench press": [
"ラック内にフラットベンチをセットし、下に仰向けになったときに腕がほぼ伸び切る高さにバーを合わせます。",
"仰向けに寝て両足を床につけ、肩甲骨をベンチに寄せて下げます。バーは肩幅よりやや広めに、親指を巻き込んで握ります。",
"バーをラックから外し、肘を体から45〜75度程度に保ちながら、コントロールされた軌道で胸の中央まで下ろします。",
"同じ軌道でバーを押し上げ、腕が完全に伸びるまで戻します。",
"下ろす前に毎回息を吸って体幹を締め、押し上げるときに力強く息を吐きます。"
],
"Glute bridge": [
"床に仰向けになり、膝を曲げて足を腰幅に開き、腕は体の横に置きます。",
"足と腕を床に押し付け、体を安定させます。",
"お尻を締めながら腰を持ち上げ、肩から膝まで体が一直線になるようにします。",
"一番上で1〜2秒収縮をキープし、腰を床の少し上まで下ろします。完全には休めません。",
"毎レップ、床の少し手前で止めることで、お尻への負荷を保ちます。"
],
"Goblet squat": [
"ダンベルを1つ縦に持ち、胸に当てます。両手のひらでダンベルの上部を包み込むように持ち、肘は下に向けます。",
"足は肩幅より少し広めに開き、つま先を軽く外側に向けて立ちます。",
"股関節の間に座り込むように下ろし、ダンベルを胸骨に密着させたまま胸を張っておきます。",
"ボトムで肘を膝の内側に軽く触れさせ、かかとは床につけたままにします。",
"床を押し離すようにして立ち上がり、上がるときに息を吐きます。"
],
"Hack squat": [
"肩パッドを調整し、フットプレートに肩幅で足を乗せます。つま先は少し外側に向け、背中は背もたれに平らに密着させます。",
"肩をパッドの下に入れ、セーフティハンドルを外して開始します。",
"膝を曲げて、太ももが少なくともフットプレートと平行になるまで下ろします。",
"かかとで押してソリを押し戻し、脚がほぼ伸びるまで上げます。最後のレップの後はセーフティハンドルをかけます。",
"かかとはプレートにつけたままにし、動作中は膝が内側に入らないようにします。"
],
"Hack squat calf raise": [
"ハックスクワットのフットプレートの下端に母趾球だけを乗せ、かかとは外に出します。肩はパッドの下に入れます。",
"脚を完全に伸ばした状態(膝をまっすぐ)にし、セーフティハンドルを外します。",
"ふくらはぎを十分にストレッチするため、かかとをフットプレートの端からできるだけ深く下げます。",
"母趾球で押し、かかとをできるだけ高く持ち上げます。",
"最後のレップの後、セーフティハンドルを再度かけます。セット中は脚を常に完全に伸ばしたままにします。"
],
"Hammer curls": [
"両手にダンベルを持ち、体の横に下げて立ちます。手のひらは内側に向けます(ニュートラルグリップ)。",
"上腕を体の横に固定し、体幹を締めます。",
"手のひらをニュートラルな向きに保ったまま、両方のダンベルを肩に向かって巻き上げます。",
"コントロールしながら、腕が完全に伸びる開始姿勢まで戻します。",
"手首を回転させないようにします。ニュートラルグリップを保つことで上腕筋と腕橈骨筋に効かせられます。"
],
"Hanging leg raise": [
"バーチカルニーレイズ台のハンドル（または懸垂バー）を握り、腕を伸ばして体をまっすぐにしてぶら下がります。",
"脚をまっすぐ伸ばし、体の真下に下げた状態からスタートします。",
"膝を伸ばしたまま（または軽く曲げて）、床と平行になるまで、できればさらに高く脚を上げます。",
"反動をつけずに、ゆっくりと脚を元のぶら下がった位置まで下ろします。",
"反動に頼らないこと。ゆっくりコントロールされた反復のほうが、振り子運動よりもはるかに体幹を鍛えられます。"
],
"Incline barbell chest press": [
"ラック内でベンチを30〜45度に設定し、下に横たわったときに腕がほぼ伸びきる高さにバーを調整します。",
"肩甲骨を寄せて仰向けになり、足裏を床につけ、肩幅よりやや広めにバーを握ります。",
"バーをラックから外し、肘を60〜75度の角度に保ちながら、鎖骨のすぐ下の胸上部までゆっくり下ろします。",
"腕が伸びきるまでバーをまっすぐ押し上げ、最後のレップの後にラックへ戻します。",
"下ろす前に体幹を固め、押し上げるときに力強く息を吐きましょう。"
],
"Incline bench dumbbell press": [
"ベンチを30〜45度に設定し、低い方の端に座って両膝の上にダンベルを置き、仰向けになりながら蹴り上げて構えます。",
"ダンベルを胸上部の高さに構え、手のひらを前方に向け、肘をダンベルの真下に位置させます。",
"両方のダンベルを押し上げながら軽く寄せ、腕が完全に伸びきるまで動作を続けます。",
"肘の角度を60〜75度に保ちながら、弧を描くようにコントロールして胸上部の高さまで戻します。",
"最後のレップの後、ダンベルを膝の上に戻してから起き上がり、安全に終了します。"
],
"Incline bench dumbbell rear delt fly": [
"ベンチを30〜45度に設定し、胸をパッドに乗せてうつ伏せになり、脚をベンチの端から出します。",
"ニュートラルグリップで両手にダンベルを持ち、腕をほぼ伸ばして肩の真下に垂らします。",
"大きな弧を描くように両腕を横に上げ、肩の高さになるまで持ち上げます。",
"トップでリアデルトを締め、その後コントロールしながら元の垂らした位置までダンベルを下ろします。",
"うつ伏せの姿勢は反動を使えないため、リアデルトを最大限に働かせるよう、1レップずつゆっくりコントロールしましょう。"
],
"Incline dumbbell curl": [
"ベンチを約45度に設定し、両手にダンベルを持って仰向けになります。",
"手のひらを前に向け、両腕を体よりやや後ろにまっすぐ垂らします。",
"肘を床に向けたまま、両方のダンベルをカールして持ち上げます。",
"肘を前に振らずに、肩の高さでしっかり締めましょう。",
"次のレップに移る前に、ゆっくりと完全に垂れ下がったストレッチ位置まで下ろします。"
],
"Lat pulldown": [
"太もものパッドを調整して脚を固定し、肩幅より広めにオーバーグリップでバーを握って座ります。",
"体を10〜15度ほど後ろに傾け、体幹を固め、腕を頭上に伸ばした状態からスタートします。",
"肘を下方・後方へ引きながらバーを胸上部に引き寄せ、広背筋を締めます。",
"腕が完全に伸びきるまで、コントロールしながらゆっくりとバーを戻します。",
"手で引くのではなく「肘を股関節に近づける」意識を持ち、広背筋への意識を保ちましょう。"
],
"Leg extension": [
"シートの背もたれとすねパッドを調整し、膝関節がマシンの回転軸と一致するようにします。すねパッドはすねの下部に当たるように設定します。",
"背中をパッドに当てて座り、ハンドルを握り、すねをパッドに当てます。",
"大腿四頭筋を収縮させて両脚を完全にまっすぐになるまで伸ばします。",
"収縮のピークで一瞬止め、その後コントロールしながらパッドを開始位置まで戻します。",
"反動を使わないこと。動作は膝関節のみで行い、振り子のような動きにならないようにしましょう。"
],
"Leg press": [
"シートを調整し、足をプレートに肩幅で置いて、つま先をやや外側に向けたときに膝がおよそ90度になるようにします。",
"背中とお尻全体をシートに密着させて座り、ハンドルを握ります。",
"脚がほぼまっすぐになるまでプレートを押し出します。膝を完全にロックしないよう注意しましょう。",
"ゆっくり膝を曲げ、太ももがおよそ90度になるまでプレートを下ろします。",
"腰がシートから離れないようにしましょう。離れてしまう場合は可動域を狭めてください。"
],
"Leg press calf raise": [
"レッグプレスマシンに座り、足の付け根だけをプレートの下端に乗せます。",
"膝をごくわずかに曲げるだけで、脚はほぼまっすぐに保ちます。大腿四頭筋を使わないようにしましょう。",
"マシンが許す範囲でかかとを床の方向に下げ、ふくらはぎを十分にストレッチします。",
"足の付け根で踏み込んでプレートを押し出し、かかとを完全に持ち上げます。",
"トップで一瞬止めてから下ろします。素早く弾ませるより、ゆっくり丁寧に行うレップの方がはるかに効果的です。"
],
"Leg raise": [
"床に仰向けになり、腰を守るために腕を体の横か、お尻の下に置きます。",
"脚を伸ばし、床からわずかに浮かせた状態からスタートします。",
"両脚をできるだけまっすぐに保ちながら、垂直になるまで（または無理のない高さまで）一緒に上げます。",
"ゆっくりと脚を下ろし、かかとが床に触れる直前で止めます。",
"動作中は常に腰を床に押し付けたままにしましょう。腰が浮いてしまう場合は、下ろす際の位置をもっと高めに調整してください。"
],
"Lying hamstring curl": [
"マシンにうつ伏せになり、膝関節をマシンの回転軸に合わせ、パッドがかかとのすぐ上にくるよう調整します。",
"安定のためにハンドルを握り、腰をパッドに平らに押し付けたままにします。",
"膝を曲げてパッドをお尻の方向へ引き寄せるように脚をカールします。",
"コントロールしながら、ゆっくりとパッドを開始位置まで戻します。",
"カール中に腰がパッドから浮く場合は、代償動作のサインなので重量を落としましょう。"
],
"Machine abduction": [
"アブダクションマシンに座り、脚を閉じた状態でパッドが太ももの外側に当たるよう調整します。",
"背中をパッドに平らにつけて座り、ハンドルを握ります。",
"マシンが許す範囲まで、パッドの負荷に逆らって脚を外側に押し開きます。",
"コントロールしながら、ゆっくりと太ももを開始位置まで閉じていきます。",
"股関節から軽く前傾すると、股関節屈筋ではなく中臀筋により効かせられます。"
],
"Machine adduction": [
"アダクションマシンに座り、脚を開いた開始位置でパッドが太ももの内側に当たるよう調整します。",
"背中をシートに平らにつけて座り、ハンドルを握ります。",
"パッドの負荷に逆らって脚を締め、太もも同士を近づけます。",
"コントロールしながら、ゆっくりと脚を開始位置まで開いていきます。",
"背中は平らに保ち、前に丸めて動作を補助しないようにしましょう。"
],
"Machine chest fly": [
"ハンドルが胸の中央の高さにくるようシートを調整し、重量を選んでアームの可動域を無理のないストレッチ位置に設定します。",
"背中をパッドに平らに押し付けて座り、アームを大きく開いた状態でハンドルを握ります。",
"大きな弧を描くように両方のパッドを前方に動かし、胸の前でほぼ触れ合うところまで寄せます。",
"ゆっくりとパッドを開いて開始位置に戻し、しっかりとしたストレッチを感じましょう。",
"背中はパッドに当てたままにし、どの瞬間も肩をすくめないようにしましょう。"
],
"Machine chest press": [
"ハンドルが胸の中央の高さにくるようシートを調整し、重量を選びます。",
"背中をパッドに平らにつけて座り、肩幅でハンドルを握ります。",
"腕がほぼ完全に伸びるまでハンドルをまっすぐ前方に押し出します。強くロックしすぎないようにしましょう。",
"十分なストレッチを感じるまで、コントロールしながらハンドルを胸の方へ戻します。",
"動作中は常に足を床につけ、背中をパッドに密着させたままにしましょう。"
],
"Machine hip thrust": [
"ガイドに従ってマシンのシートと肩のパッドを調整し、トップで股関節を完全に伸ばせるようにします。",
"背中をシートに当てて座り、両足を腰幅に開いてフットプレートに平らに置きます。",
"かかとで踏み込み、お尻を締めながらパッドの負荷に逆らって股関節を前に押し出します。",
"完全に伸ばした状態を1カウント保ってから、コントロールしながら下ろします。",
"股関節が完全に伸びたところで止め、腰が反りすぎないようにしましょう。"
],
"Machine lateral raise": [
"肩がマシンの回転軸と一致するよう、シートを調整します。",
"姿勢を正して座り、パッドを上腕の外側に当て、グリップは軽く握ります。",
"肘で押して、両腕を横に上げます。",
"上腕が床と平行になったところで止めます。",
"ウェイトスタックの底に負荷が抜けないよう、パッドがほぼ戻るところまでゆっくり下ろします。"
],
"Machine preacher curl": [
"脇が傾斜パッドの上端に引っかかるよう、シートを設定します。",
"上腕をパッドに平らに乗せ、手のひらを上に向けてマシンのハンドルを握ります。",
"上腕をパッドにつけたまま、ハンドルを肩の方へカールして持ち上げます。",
"胸をパッドにつけたまま、トップでしっかり締めます。",
"ウェイトスタックを叩きつけずに、ほぼ完全に伸ばしきる位置まで下ろして繰り返します。"
],
"Machine rear delt fly": [
"肩の高さで腕を前方に伸ばしてハンドルを握れるよう、シートとアームを調整します。",
"パッドに向かって座り（該当する場合は胸をパッドに当て）、手のひらを向かい合わせにしてハンドルを握ります。",
"大きな弧を描くように両方のハンドルを後方・外側に引き、リアデルトと背中上部を締めます。",
"腕を完全に伸ばしながら、ゆっくりとハンドルを前方の開始位置へ戻します。",
"僧帽筋をすくめないこと。肩を下げたまま、リアデルト主導で動作を行いましょう。"
],
"Machine seated crunch": [
"アームパッドが胸上部または肩に当たるようシートの高さを調整し、重量を選びます。",
"背中をパッドに当てて座り、ハンドルを握り、体幹を固めます。",
"腹筋を使って肋骨を骨盤に近づけるように丸め、パッドを引き下げてクランチします。",
"コントロールしながら、ゆっくりと直立した開始位置に戻ります。",
"これは背骨を丸める動作です。腰はシートに固定したまま、上体だけを丸めます。"
],
"Machine shoulder press": [
"ハンドルが肩の高さにくるようシートを調整し、重量を設定します。",
"背中をパッドに密着させて座り、手のひらを前に向けてハンドルを握り、肘をハンドルの下で90度に曲げます。",
"腕がほぼ伸びきるまで、ハンドルを頭の真上に押し上げます。",
"コントロールしながらハンドルを肩の高さまで戻します。",
"動作中は背中をパッドに密着させ続け、反り返ったりシートの上でずり上がったりしないようにします。"
],
"Machine-assisted pull-up": [
"ウェイトスタックでアシスト重量を設定します。アシストが重いほど懸垂は楽になります。",
"両膝をアシストパッドに乗せ、頭上のハンドルを肩幅よりやや広めに握ります。",
"腕を伸ばした状態からスタートし、顎が手の高さを超えるまで肘を下と後ろに引きます。",
"コントロールしながら、完全にぶら下がる姿勢まで体を戻します。",
"数週間かけてアシスト重量を減らしていき、最終的にはアシストなしの懸垂を目指しましょう。"
],
"Mountain climbers": [
"手を肩の真下につき、体を頭からかかとまで一直線に保った、腕を伸ばしたプッシュアップ／プランクの姿勢からスタートします。",
"体幹を固めます。腰が落ちたり高く上がったりしないようにします。",
"反対側の脚を伸ばしたまま、片膝を胸に引きつけます。",
"その足を元の位置に戻すと同時に、すぐにもう片方の膝を前に引きつけ、ランニングのように左右を切り替えます。",
"動作中は腰の高さをプランクの位置で保ち、膝を引きつけるたびに上下にバウンドしないようにします。"
],
"Overhead EZ bar tricep extension": [
"背もたれのあるベンチに座り、足裏を床につけ、狭めのグリップでEZバーを頭上に押し上げます。",
"上腕は耳の横で垂直に保ち、肘は前上方に向けます。",
"肘だけを曲げて、バーを頭の後ろに下ろします。",
"上腕を垂直に保ったまま、無理のない深いストレッチのところで止めます。",
"肘を外に開かないようにしながら、頭上でしっかり伸びきるまで押し戻します。"
],
"Overhead cable tricep extension": [
"ケーブルを最も高い位置に設定し、ロープを両手で握って、マシンに背を向けて立ちます。",
"前に一歩踏み出してロープを頭上に上げ、肘を曲げて手が頭の後ろにくるようにし、上腕は耳の横につけます。",
"肘を完全に伸ばしきるまで、腕を頭上に伸ばします。",
"コントロールしながらロープを頭の後ろに戻し、肘を曲げた最初の姿勢に戻ります。",
"上腕は頭の横に固定したままにし、動かすのは前腕だけにします。"
],
"Pike push-ups": [
"腕を伸ばしたプランク／プッシュアップの姿勢からスタートし、足を手に近づけていき、腰を高く上げて体で逆V字を作ります。",
"脚はできるだけまっすぐに保ちます。足を手に近づけるほど、肩への角度が急になります。",
"肘をやや外側から内側へ曲げるようにしながら、頭を両手の間の床に向かって下ろします。",
"腕が完全に伸びきるまで押し上げ、逆V字の姿勢に戻ります。",
"足を手から離すほど動作は楽になり、近づけるほど難しく、より肩に効く種目になります。"
],
"Plank": [
"膝をつき、両前腕を床に置きます。肘は肩の真下にし、手は握りこぶしか手のひらを床につけます。",
"両脚を後ろに伸ばしてプランクの姿勢を作り、前腕とつま先だけを床につけます。体が一直線になるまで腰を持ち上げます。",
"パンチを受け止めるように体幹を固め、お尻を締めて、腰の高さを一定に保ちます。",
"呼吸を止めずに一定のリズムで呼吸しながら、この姿勢をキープします。",
"膝を床につけてキープを終えます。フォームが崩れ始めたらすぐに終了しましょう。"
],
"Plate-loaded standing calf raise": [
"足の付け根だけをプラットフォームの端に乗せ、肩をパッドの下にセットします。",
"かかとをできるだけ下げ、しっかり伸びた状態からスタートします。",
"前足部で押し上げてかかとをできるだけ高く上げ、ふくらはぎを収縮させます。",
"次のレップの前に、かかとをゆっくり下げてしっかり伸ばします。",
"脚は完全に伸ばしたままにします。膝を曲げると腓腹筋への負荷が逃げてしまいます。"
],
"Preacher curl": [
"プリーチャーベンチを調整し、上腕がしっかりパッドに乗り、脇がパッドの上端にくるようにします。",
"アンダーグリップでEZバーを握り、パッドの傾斜に沿って腕を伸ばした状態からスタートします。",
"肘を曲げてバーを巻き上げ、前腕が垂直かそれよりやや上にくるまで動かします。",
"バーをゆっくりと完全に伸びきる位置まで下ろし、しっかりストレッチを感じます。",
"プリーチャーベンチでのネガティブ動作は特に効果的です。ウェイトを落とさず、しっかり耐えながら下ろしましょう。"
],
"Pull-ups": [
"懸垂バーをオーバーグリップで握り、手の幅は肩幅よりやや広めにします。",
"腕を完全に伸ばしてぶら下がり、引き上げる前に肩甲骨を軽く寄せて広背筋を働かせます。",
"肘を腰に向かって下げるように引き上げ、顎がバーを越えるまで体を引き上げます。",
"腕が再びまっすぐになるまで、しっかりコントロールしながら体を下ろします。",
"反動を使わず、上げ下げともしっかりコントロールすることで広背筋の発達を最大化します。"
],
"Push-ups": [
"手を肩幅よりやや広めに床につき、腕をまっすぐ伸ばして、頭からかかとまで体を一直線のプランク姿勢にします。",
"体幹に力を入れ、お尻を締めます。この固定されたプランク姿勢がスタートと終わりの位置になります。",
"肘を体幹から約45度の角度で曲げ、胸が床にほぼつくまで下ろします。",
"床を押し離すようにして肘を伸ばし、腕が完全にまっすぐになるまで押し上げます。",
"腰が落ちたり上がったりしないようにし、体を一枚の板のように一体で動かします。"
],
"Reverse EZ bar curl": [
"EZバーの角度がついた部分を、オーバーグリップ（手のひらを下）で握ります。",
"背筋を伸ばして立ち、肘を体側に固定し、手首はまっすぐに保ちます。",
"手の甲を上に向けたまま、バーを胸の上部の高さまで巻き上げます。",
"トップで一瞬止め、手首が折れないようにします。",
"腕がまっすぐになるまでゆっくり下ろします。前腕はこのネガティブ動作で発達します。"
],
"Reverse grip pulldown": [
"ラットプルダウンマシンに座り、手のひらを自分に向けたアンダーグリップで肩幅にバーを握ります。",
"脚をパッドの下に固定し、上体を少し後ろに傾け、腕を完全に伸ばした状態からスタートします。",
"肘を下に引き、広背筋を締めながら、バーを胸の上部まで引き下げます。",
"腕が再び完全に伸びきるまで、バーをゆっくり戻します。",
"力こぶだけでバーを引き下げず、まず肩甲骨を寄せる動きから引き始めましょう。"
],
"Romanian deadlift": [
"オーバーグリップでバーベルを腰の高さで持ち、足を腰幅に開いて立ちます。",
"背中をまっすぐに保ち、胸を張り、膝は軽く曲げておきます。",
"股関節を折りたたむように腰を後ろに引きながら、バーを体に近づけたまま脚に沿って下ろします。",
"ハムストリングスがしっかり伸び、腰が丸まる直前で止め、股関節を前に押し出して戻ります。",
"トップでお尻をしっかり締め、完全に立ち上がってから次のレップに移ります。"
],
"Russian twist": [
"膝を曲げて床に座り、足を軽く浮かせ、上体を約45度後ろに傾けます。",
"プレートやダンベルを両手で持ち、胸の前で腕を伸ばします。",
"上体を片側にひねり、ウェイトを腰の横の床に近づけます。",
"足を床から浮かせたまま、一連の動きで反対側まで一気にひねります。",
"ひねりは腹斜筋から生み出します。腕だけでなく上体から動きをリードしましょう。"
],
"Seated cable row": [
"ケーブルローのマシンに座り、足をフットレストに乗せて膝を軽く曲げ、両手でハンドルを握ります。",
"上体を約90度に起こし、腕をプーリーに向かって伸ばした姿勢がスタートポジションです。",
"肘を後ろに引き、肩甲骨を寄せながら、ハンドルを下腹部に向かって引きます。",
"肩甲骨を開かせながら、ゆっくり腕を伸ばしてスタートポジションに戻します。",
"動作中は上体を起こしたままにし、反動をつけるために後ろに揺らさないようにします。"
],
"Seated calf raise": [
"マシンに座り、ニーパッドを膝のすぐ上に合わせます。足の付け根だけをフットプレートに乗せ、かかとは外に垂らします。",
"ふくらはぎが十分にストレッチされるよう、かかとをできるだけ下げます。",
"前足部で押し、かかとをできるだけ高く上げてふくらはぎを完全に収縮させます。",
"ゆっくりと下ろし、しっかり伸びた位置まで戻します。",
"トップとボトムの両方で一瞬止め、反動を使わないようにします。"
],
"Seated dumbbell shoulder press": [
"背もたれのあるベンチに座り、背中をパッドにつけます。両手にダンベルを持ち、肩の高さで肘を90度に曲げ、手のひらを前に向けます。",
"腰をパッドに押しつけて固め、足裏全体を床につけます。",
"両方のダンベルを頭上にまっすぐ押し上げ、腕を完全に伸ばします。",
"肘が90度に戻るように、ダンベルを肩の高さまで下ろします。",
"重量が重くなっても腰を反らさないようにし、背中をパッドにつけたままにしましょう。"
],
"Seated hamstring curl": [
"膝関節がマシンの回転軸に合うように、シートの背もたれとレッグパッドを調整します。上部のパッドで太ももを固定します。",
"背中をパッドにつけて座り、ハンドルを握り、太ももを上部のパッドの下にしっかり押し当てます。",
"膝を曲げて下部のパッドを床に向かって引き、ハムストリングスを収縮させます。",
"コントロールしながら、ゆっくりパッドをスタートポジションまで戻します。",
"太ももを上部のパッドに押し当てたままにして浮かないようにし、ハムストリングスに負荷を集中させます。"
],
"Side plank": [
"片側を下にして横になり、前腕をマットにつけ、肘を肩の真下にセットします。",
"脚をまっすぐ重ね、上側の足を下側の足の上に乗せます。",
"くるぶしから頭まで体が一直線になるまで腰を持ち上げます。",
"呼吸を一定に保ちながら、下側の脇腹を締めてキープします。",
"腰が落ち始めたらセット終了です。休憩して反対側に切り替えましょう。"
],
"Single-arm cable fly": [
"ケーブルを肩から胸上部の高さにセットし、マシンに対して横向きに立って、プーリーから遠い方の手でハンドルを握ります。",
"ケーブルにテンションがかかる位置まで離れ、バランスを取るために足を前後に開きます。動かす腕は胸のストレッチを感じながら外側へ伸ばします。",
"腕を体の前方・内側へ大きな弧を描くように振り、手が胸の正中線を越えるまで動かします。",
"ゆっくりと弧を逆再生し、ケーブルに引かれるまま腕を開始位置のストレッチまで戻します。",
"肘は軽く曲げたまま——動きはすべて肩関節から行います。"
],
"Single-arm dumbbell overhead tricep extension": [
"片手にダンベルを持ち、背もたれのあるベンチに座って、腕が完全に伸びきるまでダンベルを頭上にプレスします。",
"肘を曲げてダンベルを頭の後ろに下ろします——上腕は頭の横で垂直を保ちます。",
"三頭筋を収縮させて腕を元の位置まで伸ばし、頭上で完全にまっすぐにします。",
"毎レップ、完全にコントロールしながら下ろしましょう。",
"作業側の肘が前方へ流れやすい場合は、反対の手で支えましょう。"
],
"Single-arm dumbbell row": [
"フラットベンチに片手と同じ側の膝を乗せ、反対の手でダンベルを持って腕をまっすぐ下に垂らします。",
"背中をフラットに床と平行に保ち、体幹を固めます——これがスタートポジションです。",
"肘を後方・上方へ引き、体幹を通り越すようにダンベルを腰へ引き上げます。",
"腕が完全に伸びきるまで、コントロールされた弧を描いてダンベルを下ろします。",
"手ではなく肘から動かしましょう——これにより上腕二頭筋ではなく広背筋に負荷が集中します。"
],
"Single-arm lat pulldown": [
"シングルDハンドルをハイプーリーに取り付け、太ももをパッドの下に入れて座ります。",
"片腕を頭上いっぱいに伸ばしてハンドルを握り、肩をストレッチさせます。",
"肘を腰に向かって引きながら、同じ側の肩に向かってハンドルを引き下げます。",
"体幹は正面のまま——ひねったり傾けたりして補助しないようにしましょう。",
"コントロールしながら頭上のフルストレッチに戻します——両腕でレップ数を揃えましょう。"
],
"Single-arm tricep kickback": [
"ベンチに片手と同じ側の膝を乗せ、反対の手でダンベルを持ち、上腕を床と平行に保ちます。",
"体幹を固め、背中をフラットに保ちます——セット中ずっと上腕は床と平行に固定します。",
"肘を伸ばして前腕を後方へ伸ばし、腕全体が床と平行になるまで動かします。",
"コントロールしながら肘を90度まで曲げて戻します。",
"上腕は下がったり振れたりしてはいけません——肘だけを動かして前腕を動かします。"
],
"Smith machine Romanian deadlift": [
"足をバーよりやや前に置き、バーを太もも中央の高さにセットして肩幅のオーバーハンドグリップで握ります。",
"バーをフックから回してラックアウトし、太もも前でバーを構えて真っすぐ立ちます。",
"股関節から前傾し、腰を後ろに引きながらバーを固定軌道に沿って脚に沿わせて下ろします。",
"ハムストリングスの可動域いっぱいで止め、腰を前に押し出して立ち上がります。",
"スミスマシンの固定垂直軌道はフリーバーとは異なります——動作が自然に感じるまで足の位置を前方に調整しましょう。"
],
"Smith machine bench press": [
"スミスマシンの中にベンチをフラットにセットし、下に寝た時にバーが手の届く位置にくるよう調整します。",
"仰向けになり肩甲骨を寄せて下げてベンチに沈め、肩幅よりやや広くバーを握ります。",
"バーをセーフティフックから回してラックアウトし、腕を伸ばして胸の中央上に構えます。",
"肘を体幹から60〜75度に保ちながら、コントロールした軌道でバーを胸の中央まで下ろします。",
"腕が完全に伸びきるまでバーを押し上げ、最後のレップの後にバーを回してラックに戻します。"
],
"Smith machine hip thrust": [
"後ろにベンチを置いて上背部をもたれさせて座り、スミスマシンのバーを腰の高さにセットしてパッドを使います。",
"バーをフックから回してラックアウトし、足を腰幅でフラットに床につけ、膝を90度にします。",
"かかとで踏み込み、お尻を締めながら体が一直線になるまで腰を突き上げます。",
"腰をゆっくりと下ろし、最後のレップの後にバーを回してフックに戻します。",
"万が一のために、バーをキャッチできる高さにセーフティフックをセットしておきましょう。"
],
"Smith machine inverted row": [
"スミスマシンのバーを腰の高さかそれより低くセットし、その下に仰向けになってかかとを床につけ、体をまっすぐにします。",
"肩幅のオーバーハンドグリップでバーを握ります——腕は伸び、体はプランクの姿勢になります。",
"肩甲骨を寄せて肘を後ろに引きながら、胸をバーに引き上げます。",
"腕が完全に伸びきるまで、コントロールしながら体を下ろします。",
"腰と体幹はセット中ずっと固く保ちましょう——体全体を一つのユニットとして動かします。"
],
"Smith machine shoulder press": [
"スミスマシンの下でベンチを90度の直立にセットし、バーをあごよりやや上の高さに位置させます。",
"肩幅よりやや広くバーを握り、フックから回してラックアウトします。",
"固定垂直軌道に沿って、腕が完全に伸びきるまでバーをまっすぐ上に押し上げます。",
"コントロールしながら胸上部の高さまで下ろします。",
"最後のレップの後、バーを回してフックに戻します。"
],
"Smith machine shrug": [
"スミスマシンの中に立ち、太もも前で肩幅のオーバーハンドグリップでバーを握ります。",
"バーをフックから回してラックアウトし、腕をまっすぐにして太ももの高さでバーを構えます。",
"肩をできるだけ高く、まっすぐ耳に向けてすくめます。",
"肩をゆっくりコントロールしながら開始位置まで下ろします。",
"最後のレップの後にラックに戻します——固定されたバー軌道により、高重量のシュラッグをより安全かつ安定して行えます。"
],
"Smith machine squat": [
"バーを胸上部の高さにセットし、足を肩幅でバーよりやや前、つま先を外向きにして立ちます。",
"バーの下に入り、僧帽筋上部に乗せ、フックから回してラックアウトします。",
"膝と股関節を同時に曲げ、太ももが少なくとも床と平行になるまでしゃがみます。",
"かかとで踏み込んで立ち上がり、最後のレップの後にラックに戻します。",
"固定されたバー軌道は最初違和感があるかもしれません——自分の体格に合った自然な動きになるまで足を前方に調整しましょう。"
],
"Smith machine standing calf raise": [
"スミスマシンの中に台やプレートを床に置き、バーを僧帽筋上部に乗せてラックアウトします。",
"足の母指球だけを台の端に乗せ、かかとをはみ出させます。",
"かかとをできるだけ深く下ろし、フルストレッチを作ります。",
"母指球で踏み込み、かかとをできるだけ高く上げます。",
"最後のレップの後にラックに戻します——スミスマシンはダンベルより高重量を扱えるため、漸進的過負荷に適しています。"
],
"Straight arm cable pulldown": [
"ケーブルプーリーを最も高い位置にセットし、肩幅のオーバーハンドグリップでバーまたはロープを握ります。",
"後ろに下がり、腕を頭上に伸ばした状態でわずかに前傾します——これがスタートです。",
"腕をほぼまっすぐに保ち肘を軽く曲げたまま、バーを大きな弧を描いて太ももまで引き下げます。",
"ゆっくりと弧を逆再生し、腕を頭上の開始位置まで戻します。",
"動きはすべて肩関節から——肘は動作中ずっと固定されたままです。これにより広背筋を単独で鍛えられます。"
],
"T-bar row": [
"バーの片端をランドマインに固定し、足を据えてまたぎます。",
"背中をフラットに保ちながら約45度に前傾し、バーの下でVハンドルを握ります。",
"肘を上後方へ引きながら、ハンドルを胸の下部まで引きます。",
"トップで肩甲骨を寄せて一瞬締めます。",
"体幹を上げないようコントロールしながらプレートを下ろします——セット中ずっと前傾角度は固定したままです。"
],
"Tricep dips": [
"平行棒を握って体を持ち上げ、腕をロックアウトしてバーの上に体を浮かせます。",
"体幹を直立に保ち(前傾すると胸への負荷が増えます)、肘はまっすぐ後ろに向けます。",
"上腕が少なくとも床と平行になるまで、肘を曲げて体を下ろします。",
"肘を伸ばして腕が完全にロックアウトするまで押し上げます。",
"自重レップが楽に感じたら、加重(脚の間にダンベルを挟むかディップベルトを使用)しましょう。"
],
"Triceps pushdown": [
"ケーブルプーリーを最上部にセットし、ストレートバーまたはVバーを取り付けてオーバーハンドで握ります。",
"プーリーの近くに立ち、肘を体の側面に約90度で固定し、わずかに前傾します。",
"肘を伸ばして、腕が完全にまっすぐになるまでバーを押し下げます。",
"肘が約90度に戻るまで、コントロールしながらバーを上げます。",
"肘は支点であり、体の側面に固定したまま——前後に動かさないようにしましょう。"
],
"Walking lunge": [
"両手にダンベルを持ち、体の横に構えて真っすぐ立ちます。",
"前に踏み出してランジの姿勢を取り、前腿が床と平行になり後ろ膝が床のすぐ上でホバーするまで下げます。",
"前足のかかとで踏み込み、後ろ脚を前に運んで次のステップへ進みます。",
"反対の脚をリードにして、まっすぐ次のランジへ着地します。",
"体幹を直立に保ち、ダンベルを静かに保ちながら脚を交互に繰り返します。"
],
"Wide-grip cable row": [
"ロウケーブルにロングストレートバーを取り付け、ベンチに座って足をフットレストに置き、肩幅より広くバーを握ります。",
"腕をプーリーに向けて伸ばし、直立して座ります——これがスタートです。",
"肘を後方・外側へ引きながら、上背部とリアデルトを締めてバーを胸の下部まで引きます。",
"ゆっくりと腕を開始位置まで伸ばし戻し、肩甲骨を完全に前へ突き出させます。",
"ワイドグリップと肘を張り出す動作により、ナローグリップのロウに比べて広背筋から上背部・リアデルトへ負荷が移ります。"
],
"Decline barbell bench press": [
"デクラインベンチに仰向けになり、足首をパッド付きローラーにしっかり引っ掛けます。",
"肩幅よりやや広くバーを握り、下部胸筋の上でラックアウトします。",
"バーを下部胸筋までコントロールして下ろします。肘は体幹に対して約45度に保ちます。",
"上背部のアーチを保ったまま、バーを腕が完全に伸びるまで押し上げます。",
"デクラインベンチはフラットベンチより失敗時に逃げにくいので、セット終了後は慎重にラックに戻します。"
],
"Barbell floor press": [
"ロードしたバーベルを持ち、床に仰向けに寝て膝を曲げ足を平らにつけます。",
"肩幅よりやや広くバーを握り、胸の上で腕を伸ばして構えます。",
"上腕・三頭筋が床につくまでバーを下ろします。",
"バーを腕が完全に伸びるまで押し上げ、三頭筋で押し切ることを意識します。",
"床からの跳ね返りを使えないので、各レップの前に呼吸を整えて体幹を固めます。"
],
"Barbell pullover": [
"フラットベンチに肩と上背部だけを乗せ、お尻を低く保ちます。",
"バーベルを胸の真上で腕をまっすぐにして持ちます。",
"肘を軽く曲げて固定したまま、ストレッチを感じるまで頭の後ろへ弧を描いて下ろします。",
"同じ弧を描いてバーを胸の上のスタート位置まで引き戻します。",
"腰が反って余分な可動域を稼がないよう、体幹を固めておきます。"
],
"Incline dumbbell fly": [
"30〜45度に設定したインクラインベンチに仰向けになり、両手にダンベルを持ちます。",
"肘を軽く曲げて胸の上で腕を伸ばし、手のひらを向かい合わせます。",
"上部胸筋にストレッチを感じるまで、腕を大きく弧を描いて左右に開きます。",
"胸を頂点で収縮させながら、ダンベルを再び合わせます。",
"毎レップ、同じ軽い肘の曲げを保ちましょう。"
],
"Decline dumbbell fly": [
"デクラインベンチに仰向けになり、ダンベルを下部胸筋の上で構えます。",
"肘を軽く曲げて固定し、手のひらを向かい合わせます。",
"腕を大きく弧を描いて胸の高さまで左右に開きます。",
"頂点で収縮させながら、ダンベルを胸の上で合わせます。",
"スポッターに安全にダンベルを渡してもらい、セットアップしましょう。"
],
"Dumbbell floor press": [
"ダンベルを両手に持ち、床に仰向けに寝て膝を曲げ足を平らにつけます。",
"ダンベルを胸までカールしてから、頭上に押し上げて腕を伸ばします。",
"上腕三頭筋が床につくまでダンベルをコントロールして下ろします。",
"手首を肘の真上に保ちながら、腕が完全に伸びるまで押し上げます。",
"セットを終えたら、ダンベルを胸まで下ろしてから安全に置きます。"
],
"Neutral-grip dumbbell press": [
"フラットベンチに寝て、両手にダンベルを持ち、手のひらを向かい合わせます。",
"ダンベルを胸の高さで構え、肘を曲げます。",
"手のひらを向かい合わせたまま、ダンベルをまっすぐ押し上げます。",
"頂点でダンベルを触れさせずに近づけます。",
"コントロールして胸の高さまで下ろし、繰り返します。"
],
"Smith machine incline press": [
"スミスマシンのバーの下にインクラインベンチを設置します。",
"仰向けになり、肩幅よりやや広くバーを握って回してアンラックします。",
"バーを上部胸筋までコントロールして下ろします。",
"マシンの固定された軌道に沿って、バーが完全に伸びるまで押し上げます。",
"セットを終えたら、バーを回して確実にラックに戻します。"
],
"Machine-assisted dip": [
"マシンのスタックで補助重量を設定します。重量が多いほど補助が強くなります。",
"プラットフォームに膝立ちまたは立ち、平行なディップハンドルを握ります。",
"肘を曲げ、上腕がほぼ床と平行になるまで体を下げます。",
"腕が完全に伸びるまで、強くロックアウトせずに押し上げます。",
"強くなったら、補助重量を減らして自体重の負荷を増やしていきます。"
],
"Cable crossover": [
"デュアルプーリーのケーブルステーションで両方のプーリーを高く設定し、両手にハンドルを持ちます。",
"タワーの中央に立ち、少し前傾して腕を左右に伸ばします。",
"手を下へ内へ弧を描くように動かし、腰の前で交差させます。",
"交差の底で胸をしっかり収縮させます。",
"スタート位置へコントロールして戻し、繰り返します。"
],
"Cable low-to-high fly": [
"デュアルプーリーのケーブルステーションで両方のプーリーを低く設定し、両手にハンドルを持ちます。",
"タワーの中央に立ち、腕を下へ外へ構えます。",
"腕を上へ内へ振り上げ、手を胸の高さより上で合わせます。",
"頂点で胸を収縮させてから、コントロールして戻します。",
"動作中ずっと肘は軽く固定して曲げたままにします。"
],
"Decline push-ups": [
"足を頑丈な台やベンチに乗せ、手は肩の下の床に置きます。",
"頭からかかとまで体を一直線にセットします。",
"肘を約45度に保ちながら、胸を床に近づけて下ろします。",
"腕が完全に伸びるまで押し上げます。お尻が下がったり上がったりしないようにします。",
"セット中は体幹を固めたまま繰り返します。"
],
"Wide-grip push-ups": [
"肩幅よりはっきり広く手を床に置きます。",
"頭からかかとまで体を一直線にセットします。",
"肘を外側に開かせながら、胸を床に近づけて下ろします。",
"腕が完全に伸びるまで押し上げます。",
"お尻が沈まないよう体幹を固めたまま繰り返します。"
],
"Pendlay row": [
"床にバーベルを置き、股関節から前傾して体をほぼ床と平行にします。",
"肩幅よりやや広くバーを握り、腕をまっすぐ下に伸ばします。",
"バーを爆発的に下部胸筋まで引き上げ、肘を上へ後ろへ動かします。",
"バーを床まで完全に下ろして止めます。",
"各レップで体勢をリセットし、動作中ずっと背中をフラットに保ちます。"
],
"Rack pull": [
"スクワットラックのセーフティピンを膝の高さ程度に設定し、バーベルをロードします。",
"バーの前に足を腰幅で立ち、前傾してすねのすぐ外側でバーを握ります。",
"体幹を固め、股関節と膝を一緒に伸ばしてバーを引き上げます。",
"完全に直立し、後ろに反らずお尻を締めて頂点を仕上げます。",
"バーをコントロールしてピンまで下ろし、次のレップに備えます。"
],
"Yates row": [
"バーベルの前に立ち、約45度前傾します。",
"肩幅程度の順手グリップでバーを握ります。",
"バーを下部肋骨・腰のあたりまで引き上げ、肘を下へ後ろへ動かします。",
"コントロールしてバーをスタート位置まで下ろします。",
"セット中ずっと同じ45度の体幹角度を保ちます。"
],
"Chest-supported dumbbell row": [
"インクラインベンチを低い角度に設定し、胸をパッドにつけてうつ伏せになります。",
"各手にダンベルを持ち、腕を完全に伸ばして垂らします。",
"ダンベルを腰の方向へ引き上げ、肘を後ろへ動かします。",
"頂点で肩甲骨を寄せます。",
"コントロールしてフルストレッチまで下ろし、繰り返します。"
],
"Incline dumbbell row": [
"ベンチを急なインクラインに設定し、胸を支えてうつ伏せになります。",
"各手にダンベルを持ち、腕を完全に伸ばして垂らします。",
"肘を体に近づけたまま、ダンベルを腰の方向へ引き上げます。",
"頂点で肩甲骨を寄せます。",
"コントロールしてフルストレッチまで戻し、繰り返します。"
],
"Kroc row": [
"片膝と片手をフラットベンチにつけ、体をほぼ床と平行にします。",
"自由な方の手に重いダンベルを持ち、腕をまっすぐ下に垂らします。",
"多少の股関節・体幹の回転を許しながら、ダンベルを力強く腰へ引き上げます。",
"コントロールしてフルストレッチまで下ろします。",
"片側のレップをすべて終えてから、反対側に切り替えます。"
],
"Machine high row": [
"マシンに座り、ハンドルが上部胸筋の高さに合うようシートを調整します。",
"胸をパッドにつけ、腕を前に伸ばしてハンドルを握ります。",
"ハンドルを上部胸筋の方へ後ろ・下へ引き、肘を上へ外へ動かします。",
"動作の後方で肩甲骨を寄せます。",
"コントロールしてスタート位置まで戻し、繰り返します。"
],
"Machine pullover": [
"マシンに座り、肩がマシンの支点に合うようシートを調整します。",
"腕を上げ、肘を軽く曲げてオーバーヘッドのレバーバーを握ります。",
"広背筋を使って、レバーを弧を描くように下へ前へ動かします。",
"レバーが胸か腹のあたりの高さになるまで続けます。",
"オーバーヘッドのスタート位置までコントロールして戻し、繰り返します。"
],
"Cable pullover": [
"ケーブルステーションでプーリーを高く設定し、ストレートバーを取り付けます。",
"タワーに背を向けて立つか膝立ちになり、腕を頭上に伸ばします。",
"肘を軽く曲げたまま、バーを太もも程度の高さまで弧を描いて下へ前へ引きます。",
"動作のボトムで広背筋を収縮させます。",
"オーバーヘッドのスタート位置までコントロールして戻し、繰り返します。"
],
"Inverted row": [
"ラックにバーを腰程度の高さに設定します。",
"その下に仰向けになり、腕を伸ばしてバーを握り、体を一直線に、かかとを床につけます。",
"肘を後ろへ動かしながら、胸をバーに引き寄せます。",
"コントロールして腕が完全に伸びるまで下ろします。",
"セット中ずっと頭からかかとまで体を固く一直線に保ちます。"
],
"Superman": [
"床にうつ伏せになり、腕を前方頭上に伸ばし、脚をまっすぐにします。",
"腕・胸・脚を同時に床から持ち上げます。",
"頂点で少し止め、お尻と腰を締めます。",
"コントロールしてスタート位置まで下ろします。",
"普段通り呼吸しながら繰り返します。"
],
"Scapular pull-ups": [
"腕を完全に伸ばしてプルアップバーにぶら下がります。",
"肘を曲げずに、肩甲骨を下へ内へ寄せます。",
"肩甲骨が寄るにつれて体を数センチ持ち上げます。",
"少し止めてから、リラックスしたぶら下がりに戻します。",
"動作中ずっと肘はほぼまっすぐに保ちながら繰り返します。"
],
"Landmine press": [
"バーベルをランドマインアタッチメントか頑丈な角に固定し、空いた端にプレートをロードします。",
"前後にずらしたスタンスで立ち、両手で肩の高さの端を握ります。",
"バーを自然な旋回の弧に沿って前へ上へ押し出します。",
"腕が前へ上へ完全に伸びるまで続けます。",
"コントロールして肩の高さまで下ろし、繰り返します。"
],
"Barbell seated shoulder press": [
"ベンチに直立して座り、バーベルを上部胸筋の高さで両手に持ちます。手は肩幅よりやや広めに。",
"脚の踏み込みがない分、体幹を固めて体を安定させます。",
"腕が頭上に完全に伸びるまでバーをまっすぐ押し上げます。",
"コントロールしてバーを上部胸筋まで下ろします。",
"体幹を直立させたまま繰り返します。"
],
"Dumbbell scaption raise": [
"各手に軽いダンベルを持って立ちます。",
"親指をリードにして、体の約30度前方の対角線上にダンベルを上げます。",
"腕が肩の高さに達するまで上げます。",
"コントロールしてスタート位置まで下ろします。",
"動作中ずっと肘を軽く曲げたまま繰り返します。"
],
"Cable Y-raise": [
"デュアルプーリーのケーブルステーションで両方のプーリーを低く設定し、ケーブルを背後で交差させます。",
"各手にハンドルを持ち、腕を下へ、腰の前でやや交差させて構えます。",
"腕を上へ外へ上げ、頭上に大きな「Y」の形を作ります。",
"コントロールしてスタート位置まで下ろします。",
"軽い重量を使い、動作中ずっと肘を軽く曲げたまま繰り返します。"
],
"Cable front raise": [
"ケーブルステーションでプーリーを低く設定し、タワーに背を向けて立ちます。",
"ハンドルかロープを握り、腕を太もも前に垂らします。",
"腕をまっすぐ肩の高さまで前に上げます。",
"コントロールしてスタート位置まで下ろします。",
"片側ずつ、または両腕同時に、体幹を静止させたまま繰り返します。"
],
"Plate-loaded shoulder press": [
"マシンに座り、ハンドルが肩の高さから始まるようシートを調整します。",
"背中をパッドにつけて、ハンドルを握ります。",
"マシンの固定された軌道に沿って、腕が伸びるまでハンドルを押し上げます。",
"コントロールして肩の高さまで下ろします。",
"動作中ずっと背中をパッドにつけたまま繰り返します。"
],
"Drag curl": [
"バーベルを順手グリップで持ち、腕を太もものところで伸ばして立ちます。",
"バーを体に沿って引きずり上げるようにカールします。",
"バーが上がるにつれて肘を体幹の後ろへ動かします。",
"二頭筋が胸の近くで完全に収縮するまでカールします。",
"同じ軌道でコントロールしてバーを下ろします。"
],
"21s barbell curl": [
"バーベルを順手グリップで太もものところで持ちます。",
"完全伸展から肘90度までのボトムハーフカールを7回行います。",
"肘90度から完全収縮までのトップハーフカールを7回行います。",
"完全伸展から完全収縮までのフルレンジカールを7回で仕上げます。",
"3つのフェーズすべてで肘を体側に固定したまま行います。"
],
"Wide-grip barbell curl": [
"肩幅よりはっきり広くバーベルを持って立ちます。",
"肘を体側に引き寄せ、腕を伸ばした状態でスタートします。",
"バーを肩の方へカールします。",
"頂点で二頭筋を収縮させてから、コントロールして下ろします。",
"肘を前に流さないよう気をつけながら繰り返します。"
],
"Zottman curl": [
"各手にダンベルを持ち、手のひらを前に向けて立ちます。",
"通常の順手グリップでダンベルを肩の高さまでカールします。",
"頂点で手首を回転させ、手のひらを下に向けます。",
"この反転させたグリップのままゆっくりダンベルを下ろします。",
"ボトムで手首を上向きに回転させ直し、繰り返します。"
],
"Spider curl": [
"急な角度のインクラインベンチにうつ伏せになり、腕を自由に垂らします。",
"各手にダンベルを持ち、腕を完全に伸ばします。",
"上腕をベンチパッドに固定したまま、ダンベルをカールします。",
"頂点で二頭筋を収縮させます。",
"ゆっくり完全にスタート位置まで下ろします。"
],
"Cross-body hammer curl": [
"各手にダンベルを持ち、ニュートラルグリップで太ももの横に立ちます。",
"片方のダンベルを対角線上に体を横切らせ、反対側の肩の方へカールします。",
"頂点で二頭筋を収縮させてから、同じ対角線の軌道で下ろします。",
"同じ腕ですべてのレップを行うか、両腕を交互に行います。",
"各レップで肘を体側に比較的固定したまま繰り返します。"
],
"Plate-loaded machine bicep curl": [
"マシンに座り、上腕を角度のついたパッドに乗せます。",
"腕を伸ばした状態でハンドルを握ります。",
"上腕をパッドに乗せたまま、前腕だけでハンドルをカールします。",
"頂点で二頭筋を収縮させてから、コントロールして下ろします。",
"肘がマシンの支点に合うようシートを調整しながら繰り返します。"
],
"Cable spider curl": [
"プーリーを低く設定し、急な角度のインクラインベンチにタワーに向かってうつ伏せになります。",
"取り付けたバーを握り、腕を垂らし、上腕をベンチパッドにつけます。",
"上腕をパッドに固定したまま、バーを完全収縮までカールします。",
"コントロールしてフルストレッチまで下ろします。",
"一定のケーブル張力を考慮し、想定より軽い重量で繰り返します。"
],
"Dumbbell close-grip floor press": [
"各手にダンベルを持ち、床に仰向けに寝て胸の上で近づけて構えます。",
"肘を肋骨に引き寄せたまま下ろします。",
"三頭筋が床につくまで下ろします。",
"頂点でダンベルをやや内側に寄せながら押し上げます。",
"手首を肘の真上に保ったまま繰り返します。"
],
"Seated machine tricep extension": [
"マシンに座り、上腕がパッドで固定されるようシートを調整します。",
"腕を曲げた状態でハンドルを握ります。",
"頂点で三頭筋を収縮させながら腕を完全に伸ばします。",
"コントロールして曲げたスタート位置まで戻します。",
"動作中ずっと上腕を固定したまま繰り返します。"
],
"Bench dips": [
"ベンチの端に座り、腰の真後ろで手を握ります。",
"足を前に出して腰をベンチから浮かせ、腕で体重を支えます。",
"肘がほぼ90度になるまで体をまっすぐ下ろします。",
"腕が完全に伸びるまで押し上げます。",
"肘を後ろに向けたまま、外側に開かないよう繰り返します。"
],
"Close-grip push-ups": [
"胸の下で手を近づけて床に置きます。",
"頭からかかとまで体を一直線にセットします。",
"肘を肋骨に引き寄せたまま、胸を手に近づけて下ろします。",
"腕が完全に伸びるまで押し上げます。",
"手首をまっすぐに保ったまま繰り返します。"
],
"Barbell reverse curl": [
"バーベルを順手グリップで持ち、太もものところで腕を伸ばして立ちます。",
"肘を体側に固定したまま、バーを肩の方へカールします。",
"頂点で収縮させてから、コントロールして下ろします。",
"動作中ずっと手首を固くまっすぐに保ちながら繰り返します。",
"このグリップは明らかに弱いため、通常のカールより軽い重量を使います。"
],
"Dumbbell finger curl": [
"座って前腕を太ももに乗せ、手首を膝より少し先に垂らします。",
"指を開いてダンベルを緩く持ち、指先の方へ転がり落とします。",
"指を閉じてハンドルを握り込みます。",
"コントロールして指を開き、ダンベルを転がり落とします。",
"手首を動かさないまま繰り返します。"
],
"Cable wrist curl": [
"プーリーを低く設定し、ストレートバーを取り付けます。",
"座って前腕を太ももに乗せ、手首を膝より少し先に垂らし、手のひらを上に向けてバーを握ります。",
"手首を心地よい範囲まで上へカールします。",
"コントロールしてフルストレッチまで下ろします。",
"前腕を太ももに固定したまま繰り返します。"
],
"Cable reverse wrist curl": [
"プーリーを低く設定し、ストレートバーを取り付けます。",
"座って前腕を太ももに乗せ、手首を膝より少し先に垂らし、手のひらを下に向けてバーを握ります。",
"手首を上へ伸展させ、手の甲を持ち上げます。",
"コントロールしてフルストレッチまで下ろします。",
"前腕を静止させたまま繰り返します。"
],
"Bench-supported seated reverse fly": [
"起こしたインクラインベンチのパッドに向かって座り、胸を押し付けます。",
"各手にダンベルを持ち、腕を伸ばして垂らします。",
"肘を軽く曲げたまま腕を左右に上げ、肩甲骨を寄せます。",
"コントロールしてスタート位置まで下ろします。",
"動作中ずっと胸をパッドに押し付けたまま繰り返します。"
],
"Prone dumbbell Y-raise": [
"インクラインベンチにうつ伏せになり、各手に軽いダンベルを持ちます。",
"腕をまっすぐ下、やや前方に垂らします。",
"親指をリードにして腕を上へ外へ上げ、「Y」の形を作ります。",
"コントロールしてスタート位置まで下ろします。",
"軽い重量で、これは筋力種目ではなくコントロール種目であることを意識して繰り返します。"
],
"Cable reverse fly": [
"デュアルプーリーのケーブルステーションで両方のプーリーを肩の高さに設定します。",
"タワーの中央に立ち、体の前で腕を交差させて反対側のハンドルを握ります。",
"腕を外側へ後ろへ振り、肩甲骨を寄せます。",
"交差したスタート位置までコントロールして戻します。",
"動作中ずっと肘を軽く曲げたまま繰り返します。"
],
"Cross-cable reverse fly": [
"デュアルプーリーのケーブルステーションで両方のプーリーを肩の高さに設定します。",
"タワーの間に立ち、股関節から約45度前傾します。",
"体の前で交差させて反対側のハンドルを握ります。",
"腕を外側へ後ろへ振り、肩甲骨を寄せます。",
"体幹を前傾させたまま、交差したスタート位置までコントロールして戻します。"
],
"Barbell high pull": [
"バーベルを太もものところで持ち、膝を軽く緩め、股関節をやや前傾させます。",
"バーを体に近づけて引き上げ、肘をリードにして手より高く上げます。",
"バーが胸・鎖骨の高さに達するにつれてつま先立ちになります。",
"コントロールしてバーを太ももまで下ろします。",
"動作中ずっとバーを体幹に近づけたまま繰り返します。"
],
"Dumbbell high pull": [
"各手にダンベルを持ち、太もものところで膝を軽く緩めて立ちます。",
"ダンベルを体に近づけて引き上げ、肘をリードにして手より高く上げます。",
"ダンベルが胸の高さに達するにつれてつま先立ちになります。",
"コントロールして太ももまで下ろします。",
"動作中ずっとダンベルを体幹に近づけたまま繰り返します。"
],
"Cable shrug": [
"プーリーを低く設定し、ストレートバーかハンドルを取り付けます。",
"タワーに向かって立ち、腕を伸ばしてハンドルを握ります。",
"肩を耳に向かってまっすぐすくめます。",
"頂点で少し止めてから、コントロールして下ろします。",
"動作中ずっと腕をロックしたまま繰り返します。"
],
"Plate-loaded shrug": [
"マシンのフレーム内に立ち、サイドハンドルを握ります。",
"動作中ずっと腕をまっすぐに保ちます。",
"マシンのロードされたアームと一緒にまっすぐ肩をすくめます。",
"頂点で少し止めてから、コントロールして下ろします。",
"頭を中立に保ったまま繰り返します。"
],
"Barbell walking lunge": [
"バーベルを上背部に担ぎ、直立して立ちます。",
"前に踏み出し、後ろ膝を床に触れない程度まで下げます。",
"前足のかかとで押して立ち上がり、反対の脚で直接次のランジへ踏み出します。",
"脚を交互に切り替えながら、前へ歩くように続けます。",
"バランスを保つため、動作中ずっと体幹を直立させておきます。"
],
"Barbell step-up": [
"バーベルを上背部に担ぎ、頑丈な台の前に立ちます。",
"片足を台の上に平らに置きます。",
"その足のかかとで踏み込み、体を台の上に引き上げます。",
"両足を台の上に揃えて完全に直立します。",
"コントロールして降り、脚を交互に切り替えるか片側から始めて繰り返します。"
],
"Box squat": [
"バーベルを上背部に担ぎ、スクワットの深さに合わせたボックスを真後ろに置きます。",
"腰をボックスの方へ後ろに引きながらしゃがみます。",
"ボックスに少し座り、後ろに反らず底で股関節をリラックスさせます。",
"コントロールして立ち上がりに戻ります。",
"ボックス上での静止中は体幹を固めたまま繰り返します。"
],
"Dumbbell front squat": [
"ダンベルを各肩に縦向きに構え、肘を前へ上へ向けます。",
"肩幅程度に足を開いて立ちます。",
"体幹を直立させ、膝をつま先の方向に向けながらしゃがみます。",
"太ももが平行かそれ以下になるまで下ろします。",
"ダンベルを肩に構えたまま立ち上がりに戻ります。"
],
"Dumbbell reverse lunge": [
"各手にダンベルを持ち、直立して立ちます。",
"片脚を後ろに踏み出し、後ろ膝を床に向けて下げます。",
"踏み出す間、体重の大部分を前足に残します。",
"前足で押して立ち上がりに戻ります。",
"脚を交互に切り替えるか片側を終えてから切り替えて繰り返します。"
],
"Heel-elevated dumbbell squat": [
"小さなウェッジかプレートをかかとの下に置きます。",
"通常のスクワットより足を近づけて立ち、各手にダンベルを持ちます。",
"体幹を高く保ち、膝を前に動かしながらしゃがみます。",
"太ももが平行かそれ以下になるまで下ろします。",
"足全体で押して立ち上がりに戻ります。"
],
"Belt squat": [
"マシンのロードされた機構にヒップベルトを装着し、台の上に立ちます。",
"手は自由にするかサイドレールに軽く添えます。",
"体幹を直立させたまましゃがみ、重量が脚の間を通るようにします。",
"心地よい深さまで下ろします。",
"足全体で押して立ち上がりに戻ります。"
],
"Pendulum squat": [
"マシンの角度のついた肩パッドの下に体を位置づけ、足をプラットフォームに乗せます。",
"動作中ずっと背中をパッドにつけたままにします。",
"スライドが旋回する弧に沿ってしゃがみます。",
"心地よい深さまで下ろし、負荷が増えるのをコントロールします。",
"足全体で押して弧を完成させ、立ち上がりに戻ります。"
],
"Vertical leg press": [
"マシンに仰向けに寝て、膝を胸に引き寄せ、足を頭上のプラットフォームに乗せます。",
"サイドハンドルを握って安定させます。",
"膝が完全にロックする直前まで、プラットフォームをまっすぐ押し上げて脚を伸ばします。",
"コントロールしてプラットフォームをフルレンジまで下ろします。",
"動作中ずっと腰をパッドに押し付けたまま繰り返します。"
],
"Bodyweight squat": [
"肩幅程度に足を開いて立ち、腕を前に伸ばします。",
"胸を上げ、かかとを床につけたまま、腰を後ろへ下へ沈めます。",
"心地よくフォームを保てる範囲で深くしゃがみます。",
"足全体で床を押し返して立ち上がります。",
"動作中ずっと腕を前に伸ばしたままバランスを取りながら繰り返します。"
],
"Jump squat": [
"肩幅程度に足を開いて立ち、腕を後ろに振りながらクォータースクワットに沈み込みます。",
"腕を前へ上へ振りながら、できるだけ強く上に跳びます。",
"ジャンプの頂点で両足を地面から離します。",
"膝を曲げて衝撃を吸収し、柔らかく着地します。",
"クォータースクワットの姿勢に戻り、繰り返します。"
],
"Wall sit": [
"壁に背をつけて立ち、太ももが床とほぼ平行になるまで滑り降ります。",
"膝はつま先より前に出さず、足首の真上に保ちます。",
"背中を壁に押し付けたままポジションをホールドします。",
"ホールド中は普段通り呼吸します。",
"目標の時間に達したら壁を滑って立ち上がります。"
],
"Barbell good morning": [
"バーベルを上背部に担ぎ、直立して立ちます。",
"膝を柔らかく固定したまま、股関節からヒンジします。",
"背中をフラットに保ちながら、体幹がほぼ床と平行になるまで下げます。",
"股関節を前に押し出して立ち上がりに戻ります。",
"とても軽い重量から始めて繰り返します。"
],
"Sumo deadlift": [
"つま先を外に向けた広いスタンスでバーベルの上に立ちます。",
"膝の内側でバーを握り、腰を低く、胸を上げます。",
"床を押し、バーが上がるにつれて股関節と膝を一緒に伸ばします。",
"頂点でお尻を締めながら完全に直立します。",
"コントロールしてバーを床まで下ろし、次のレップに備えます。"
],
"Stiff-leg deadlift": [
"バーベルを太ももで持ち、脚をほぼ完全に伸ばして立ちます。",
"股関節から前傾し、バーを脚に沿って近く下ろします。",
"ハムストリングに強いストレッチを感じるまで下ろします。",
"股関節を前に押し出して立ち上がりに戻ります。",
"動作中ずっと背中をフラットに、膝をほぼまっすぐに保って繰り返します。"
],
"Single-leg dumbbell RDL": [
"片足で直立し、各手にダンベルを持ちます。",
"股関節から前傾しながら、自由な脚をまっすぐ後ろに伸ばします。",
"体幹がほぼ床と平行になり、自由な脚と「T」の字を作るまで下ろします。",
"股関節を前に押し出して立ち上がりに戻り、自由な脚を下ろします。",
"片脚ですべてのレップを終えてから、反対側に切り替えます。"
],
"Dumbbell sumo deadlift": [
"つま先を外に向けた広いスタンスで単一のダンベルの上に立ちます。",
"脚の間でダンベルの上部を両手で握ります。",
"床を押し、立ち上がるにつれて股関節と膝を一緒に伸ばします。",
"頂点でお尻を締めながら完全に直立します。",
"コントロールしてダンベルを床まで下ろし、リセットします。"
],
"Standing machine hamstring curl": [
"マシンに立ち、チェストパッドに寄りかかって支えます。",
"片方の足首をパッド付きローラーの後ろに固定し、脚をまっすぐ下に伸ばします。",
"かかとをお尻の方へカールします。",
"頂点で収縮させてから、コントロールして下ろします。",
"片脚ですべてのレップを終えてから、反対側に切り替えます。"
],
"Cable pull-through": [
"プーリーを低く設定してロープを取り付け、タワーに背を向けてロープを脚の間にまたぎます。",
"股関節から前傾し、ロープに引かれて手を脚の間で後ろに動かします。",
"動作中ずっと背中をフラットに、膝を柔らかく曲げたままにします。",
"力強く股関節を前へ突き出して立ち上がり、頂点でお尻を締めます。",
"ロープが振れる間、体に近づけたまま繰り返します。"
],
"B-stance barbell hip thrust": [
"上背部をベンチにつけ、バーベルを腰に乗せます。",
"足を前後にずらし、体重の大部分を一方の足に乗せます。",
"働いている脚で股関節をフルエクステンションまで伸ばし、そのお尻を締めます。",
"腰を完全に落とさず、コントロールして下ろします。",
"片側のレップをすべて終えてから、足を切り替えます。"
],
"Barbell glute bridge": [
"床に仰向けに寝て、バーベルを腰に乗せ、膝を曲げます。",
"足を肩幅程度に床に平らにつけます。",
"腰をまっすぐ上に突き上げ、頂点でお尻を締めます。",
"コントロールしてスタート位置まで下ろします。",
"動作中ずっと上背部と頭を床につけたまま繰り返します。"
],
"Curtsy lunge": [
"各手にダンベルを持ち、直立して立ちます。",
"片脚を斜め後ろへ、もう片方の脚の後ろへ交差させて踏み出します。",
"体重の大部分を前足に残しながら、後ろ膝が床の近くになるまで下げます。",
"前足のかかとで押して立ち上がりに戻ります。",
"脚を交互に切り替えるか、片側を終えてから切り替えて繰り返します。"
],
"Dumbbell single-leg hip thrust": [
"上背部をベンチにつけ、単一のダンベルを腰に乗せます。",
"片足を床に平らに置き、もう片方の脚をまっすぐ前に伸ばします。",
"支えている足で股関節をフルエクステンションまで伸ばし、自由な脚をまっすぐ保ちます。",
"腰を完全に落とさず、コントロールして下ろします。",
"片側のレップをすべて終えてから、脚を切り替えます。"
],
"45-degree hip extension machine": [
"腰を角度のついたパッドの上端に置き、足首をローラーの下に固定します。",
"胸の前で腕を組むか、負荷を加えるならプレートを持ちます。",
"背中をフラットに保ちながら、ハムストリングにストレッチを感じるまで下へヒンジします。",
"肩から足首まで体が一直線になるまで起き上がります。",
"各レップの頂点でお尻を締めながら繰り返します。"
],
"Standing plate-loaded glute kickback": [
"マシンに立ち、フレームで体を支えます。",
"片足をロードされたプラットフォームに乗せます。",
"働いている脚をまっすぐ後ろ上へ動かします。",
"頂点でお尻を締めてから、コントロールして下ろします。",
"片脚ですべてのレップを終えてから、反対側に切り替えます。"
],
"Single-leg glute bridge": [
"仰向けに寝て、片膝を曲げて足を平らにつけます。",
"もう片方の脚をまっすぐ伸ばします。",
"支えている足で腰を上げ、伸ばした脚をまっすぐ安定させます。",
"コントロールしてスタート位置まで下ろします。",
"片脚ですべてのレップを終えてから、脚を切り替えます。"
],
"Frog pump": [
"仰向けに寝て足の裏を合わせ、膝を大きく開きます。",
"動作中ずっと足を合わせ、膝を開いたままにします。",
"腰をまっすぐ上に突き上げ、頂点でお尻を強く締めます。",
"コントロールしてスタート位置まで下ろします。",
"高めのレップ数で繰り返します。"
],
"Donkey kicks": [
"背中をフラットに保ち、四つん這いになります。",
"片膝を90度の固定角度で曲げたまま保ちます。",
"その足を天井へ向かって蹴り上げ、かかとで押し出します。",
"頂点でお尻を締めてから、コントロールして下ろします。",
"片脚ですべてのレップを終えてから、反対側に切り替えます。"
],
"Barbell standing calf raise": [
"バーベルを上背部に担ぎ、小さな台の上に足のつま先側を乗せ、かかとを垂らして立ちます。",
"上がる前にかかとを台より下げてフルストレッチを作ります。",
"できるだけ高くつま先立ちになります。",
"頂点でふくらはぎを強く締めてから下ろします。",
"動作中ずっと脚を比較的まっすぐに保って繰り返します。"
],
"Single-leg dumbbell calf raise": [
"片手にダンベルを持ち、もう片方の手を壁に軽く添えます。",
"小さな台の上に片足で立ち、かかとを後ろの端から垂らします。",
"上がる前にかかとを台より下げてフルストレッチを作ります。",
"できるだけ高くつま先立ちになり、それから下ろします。",
"片脚ですべてのレップを終えてから、反対側に切り替えます。"
],
"Dumbbell seated calf raise": [
"ベンチに座り、足を小さな台に乗せ、かかとを垂らします。",
"各膝にダンベルを縦に乗せます。",
"上がる前にかかとを台より下げてフルストレッチを作ります。",
"ダンベルをバランスよく保ちながら、つま先立ちになります。",
"各レップの頂点で少し止めて繰り返します。"
],
"Donkey calf raise machine": [
"股関節から前傾し、マシンのロードされたパッドの下に腰を固定します。",
"足のつま先側をプラットフォームに乗せ、かかとを端から垂らします。",
"上がる前にかかとを下げてフルストレッチを作ります。",
"できるだけ高くつま先立ちになります。",
"サポートバーで動作中ずっとバランスを保ちながら繰り返します。"
],
"Standing bodyweight calf raise": [
"小さな段差の端に足のつま先側を乗せ、かかとを垂らして立ちます。",
"上がる前にかかとを段差より下げて深いストレッチを作ります。",
"できるだけ高くつま先立ちになります。",
"頂点で少し止めてから下ろします。",
"必要ならバランスのために壁に軽く触れながら繰り返します。"
],
"Single-leg bodyweight calf raise": [
"小さな段差の端に片足で立ち、かかとを後ろに垂らします。",
"かかとを下げてフルストレッチを作ります。",
"できるだけ高くつま先立ちになります。",
"コントロールして下ろします。",
"片脚ですべてのレップを終えてから、反対側に切り替えます。"
],
"Side-lying dumbbell hip adduction": [
"横向きに寝て、上側の脚を曲げ、足を下側の脚の前に置きます。",
"軽いダンベルを下側の、まっすぐな脚の足首に乗せます。",
"下側の脚をまっすぐ上げ、曲げた上側の脚に向けて動かします。",
"コントロールしてスタート位置まで下ろします。",
"片側のレップをすべて終えてから、反対側に切り替えます。"
],
"Cable hip adduction": [
"タワーから遠い方の脚に足首カフを装着し、タワーに対して横向きに立ちます。",
"その脚を体の正中線を越えて外側に上げた位置から始めます。",
"脚を体の内側へ、軸足を越えて動かします。",
"コントロールしてスタート位置まで戻します。",
"片側のレップをすべて終えてから、脚を切り替えます。"
],
"Sumo squat hold": [
"つま先を外に向けた広いスタンスを取ります。",
"太もも平行になるまでスクワットに沈み込みます。",
"膝をつま先の方向へ外側に保ちながらそのポジションをホールドします。",
"体幹を直立させたままホールドします。",
"目標の時間に達したら立ち上がります。"
],
"Cable hip abduction": [
"タワーに近い方の脚に足首カフを装着し、タワーに対して横向きに立ちます。",
"その脚を軸足の少し前で交差させた位置から始めます。",
"脚を体から離す方向へ、心地よい範囲まで外側に振ります。",
"コントロールしてスタート位置まで戻します。",
"片側のレップをすべて終えてから、脚を切り替えます。"
],
"Side-lying leg raise": [
"脚をまっすぐ重ねて横向きに寝ます。",
"上側の脚を体と一直線に保ちながらまっすぐ上げます。",
"腰を後ろに転がさずに、心地よい高さまで上げます。",
"コントロールしてスタート位置まで下ろします。",
"片側のレップをすべて終えてから、反対側に切り替えます。"
],
"Clamshells": [
"膝を曲げて重ね、足をくっつけた状態で横向きに寝ます。",
"動作中ずっと足をくっつけたままにします。",
"上側の膝をヒンジのように開きます。",
"コントロールしてスタート位置まで下ろします。",
"片側のレップをすべて終えてから、反対側に切り替えます。"
],
"Standing hip abduction": [
"壁か椅子に軽く手を添えて、直立して立ちます。",
"片脚をまっすぐ横に、完全に伸ばして上げます。",
"体幹を直立させたまま、心地よい高さまで上げます。",
"コントロールしてスタート位置まで下ろします。",
"片脚ですべてのレップを終えてから、反対側に切り替えます。"
],
"Dumbbell side bend": [
"単一のダンベルを片手に持ち、体の横に垂らして立ちます。",
"ダンベル側へまっすぐ横に曲げます。",
"ボトムで反対側の体幹にストレッチを感じます。",
"コントロールして立ち上がりに戻ります。",
"片側のレップをすべて終えたら、手を持ち替えて反対側を行います。"
],
"Weighted sit-up": [
"膝を曲げて足を床に平らにつけ、仰向けに寝ます。",
"単一のダンベルかプレートを両手で胸に押し当てます。",
"ウェイトを胸に固定したまま、体幹を座った姿勢まで起こします。",
"コントロールしてスタート位置まで下ろします。",
"足を固定したまま繰り返します。"
],
"Cable woodchopper": [
"プーリーを高く設定し、タワーに対して横向きに立ちます。",
"両手でハンドルを片方の肩の近くで握ります。",
"体幹を回転させ、ハンドルを対角線上に下へ体の反対側の腰へ引きます。",
"コントロールしてスタート位置まで戻します。",
"片側のレップをすべて終えてから、反対側に切り替えます。"
],
"Captains chair leg raise": [
"前腕をパッド付きのアームレストに乗せ、背中をパッドに押し付けます。",
"脚をまっすぐ下に垂らしてスタートします。",
"脚を前方へ上げ、膝を胸に向けて曲げます。",
"コントロールしてスタート位置まで下ろします。",
"動作中ずっと体幹をパッドに固定したまま繰り返します。"
],
"Hollow body hold": [
"仰向けに寝てから、肩と脚を同時に床から持ち上げます。",
"腕を頭上に、脚をまっすぐ伸ばします。",
"ホールド中ずっと腰を床に押し付けたままにします。",
"普段通り呼吸しながらポジションをホールドします。",
"目標の時間に達したら下ろします。"
],
"V-ups": [
"腕を頭上に伸ばし、脚をまっすぐにして仰向けに寝ます。",
"体幹と脚を同時に折りたたむように起こします。",
"頂点で手をつま先に向けて伸ばし、お尻でバランスを取ります。",
"コントロールしてスタート位置まで下ろします。",
"完全なストレートレッグバージョンが難しい場合は、膝を少し曲げて繰り返します。"
]
};
const EX_INSTRUCTIONS_KO={
"Ab wheel rollout": [
"매트 위에 무릎을 꿇고 어깨 아래에 휠을 위치시킨 뒤 팔을 곧게 폅니다.",
"골반을 살짝 말아 넣고 엉덩이에 힘을 줘서 허리를 평평하게 고정합니다.",
"휠을 앞으로 굴려 몸이 일직선으로 펴지도록 합니다.",
"허리가 꺾이지 않는 범위까지만 밀고 나갑니다.",
"복근의 힘으로 휠을 시작 위치까지 당겨오며, 돌아올 때 숨을 내쉽니다."
],
"Arnold press": [
"등받이가 있는 벤치에 등을 기대고 앉아, 양손에 덤벨을 들고 어깨 높이에 위치시키되 손바닥은 자신을 향하게 합니다.",
"코어에 힘을 주고 발바닥을 바닥에 단단히 붙입니다.",
"덤벨을 밀어 올리면서 손바닥을 바깥쪽으로 회전시켜, 팔이 완전히 펴졌을 때는 손바닥이 앞을 향하도록 합니다.",
"덤벨을 내리면서 손바닥을 다시 안쪽으로 회전시켜, 어깨 높이에 도달했을 때는 다시 자신을 향하도록 합니다.",
"회전은 아래에서 위까지 부드럽고 연속적으로 이루어져야 하며, 두 단계로 끊어지는 동작이 되어서는 안 됩니다."
],
"Back extension": [
"힙 패드가 골반뼈 바로 아래에 위치하도록 백 익스텐션 벤치를 조정하고, 발을 발목 패드 아래에 단단히 고정합니다.",
"팔을 가슴 앞에서 교차하고, 상체가 바닥을 향해 늘어지도록 합니다. 이것이 시작 자세입니다.",
"허리와 엉덩이에 힘을 줘 상체를 들어 올려, 몸이 일직선의 수평이 될 때까지 올립니다.",
"통제된 속도로 다시 시작 자세까지 내려옵니다.",
"수평 지점에서 멈추세요. 일직선을 넘어 과도하게 젖히면 허리에 지나친 부담이 갑니다."
],
"Barbell back squat": [
"랙에서 바벨을 어깨 높이로 설정한 뒤, 그 아래로 들어가 승모근 윗부분에 걸치고 손은 어깨너비보다 약간 넓게 잡습니다.",
"바벨을 랙에서 빼내 뒤로 물러난 뒤, 발은 어깨너비로 벌리고 발끝은 살짝 바깥쪽을 향하게 하며, 코어에 힘을 주고 가슴을 펴세요.",
"엉덩이를 뒤로 밀며 무릎을 함께 굽혀 내려갑니다. 가슴은 펴고 무릎은 발끝 방향을 향하도록 유지하세요.",
"최소한 허벅지가 바닥과 평행이 될 때까지 내려간 뒤, 뒤꿈치로 바닥을 밀어내며 일어섭니다.",
"보조자 없이 훈련할 때는 항상 세이프티 바를 평행 깊이 또는 그보다 살짝 낮게 설정해 사용하세요."
],
"Barbell curl": [
"바벨을 언더핸드 그립으로 잡고 골반 높이에 위치시킨 채 어깨너비로 손을 벌려 곧게 섭니다.",
"팔 윗부분을 몸통 옆에 고정하고, 발은 어깨너비로 벌리며, 코어에 힘을 줍니다.",
"팔 윗부분은 고정한 채 팔꿈치를 굽혀 바벨을 어깨 쪽으로 들어 올립니다.",
"바벨을 완전히 통제된 궤적으로 시작 위치까지 내립니다. 그냥 떨어뜨리지 마세요.",
"상체를 흔들거나 팔꿈치가 앞으로 빠지지 않게 하세요. 이 동작은 오직 팔꿈치 관절에서만 이루어집니다."
],
"Barbell deadlift": [
"바벨이 발 중앙 위에 오도록 서고 발은 골반 너비로 벌린 뒤, 힙 힌지로 내려가 정강이 바로 바깥쪽을 잡습니다.",
"등을 평평하게 펴고 가슴을 들어 올린 뒤, 팔을 곧게 편 채 바벨의 유격을 당겨 없앱니다.",
"코어에 힘을 준 뒤 바닥을 밀어낸다는 느낌으로 일어섭니다. 엉덩이와 어깨가 함께 올라오고, 바벨은 정강이를 스치며 올라옵니다.",
"무릎을 지나면 엉덩이를 앞으로 밀어 곧게 선 자세로 마무리합니다. 몸을 뒤로 젖히지 마세요.",
"먼저 힙 힌지로 내려가다가 바벨이 무릎을 지나면 무릎을 굽히며 통제된 속도로 바닥까지 내린 뒤, 매 반복마다 다시 세팅합니다."
],
"Barbell front squat": [
"랙에서 바벨을 어깨 높이로 설정한 뒤, 그 안으로 들어가 어깨 앞쪽에 바벨을 걸치고 팔꿈치를 높이 들며 손가락을 바벨 아래에 위치시킵니다.",
"바벨을 빼내 뒤로 물러난 뒤, 발을 어깨너비로 벌리고 발끝을 살짝 바깥쪽으로 향하게 합니다.",
"코어에 힘을 주고 상체를 최대한 곧게 세운 채, 팔꿈치를 높이 유지하며 곧장 아래로 앉습니다.",
"엉덩이가 무릎보다 낮아질 때까지 내려가며, 무릎은 발끝 방향을 향하고 뒤꿈치는 바닥에 붙인 채로 유지합니다.",
"발 전체로 바닥을 밀어내며 일어서고, 팔꿈치를 계속 높이 유지해 바벨이 제자리에 있도록 하세요."
],
"Barbell hip thrust": [
"바닥에 앉아 등 윗부분을 벤치에 기댄 뒤, 중량을 실은 바벨을 다리 위로 굴려 골반 위에 위치시킵니다. 편안함을 위해 폼 패드를 사용하세요.",
"발을 바닥에 평평하게 놓고 골반 너비로 벌리며 무릎은 약 90도로 굽히고 발끝은 살짝 바깥을 향하게 하며, 등 윗부분은 벤치 중간에 걸칩니다.",
"뒤꿈치로 밀어내고 엉덩이에 힘을 주며, 허벅지가 바닥과 평행이 되고 무릎부터 어깨까지 일직선이 될 때까지 골반을 밀어 올립니다.",
"통제된 속도로 골반을 다시 바닥 쪽으로 내린 뒤 반복합니다.",
"턱을 당기고 천장을 쳐다보지 않도록 하세요. 이는 최고점에서 허리가 과도하게 꺾이는 것을 막아줍니다."
],
"Barbell overhead press": [
"랙에서 바벨을 가슴 윗부분 높이로 설정한 뒤, 어깨너비보다 살짝 넓게 엄지를 감싸 잡습니다.",
"바벨을 빼내 뒤로 물러난 뒤 발을 어깨너비로 벌리고, 바벨을 가슴 윗부분 높이에서 팔꿈치가 바로 아래 앞쪽에 오도록 잡습니다.",
"고개를 살짝 뒤로 빼 공간을 만들며 바벨을 팔이 완전히 펴질 때까지 똑바로 밀어 올립니다.",
"통제된 속도로 바벨을 다시 가슴 윗부분 높이까지 내립니다.",
"코어에 힘을 유지하고 허리가 과도하게 젖혀지지 않도록 하며, 바벨을 수직에 가까운 궤적으로 밀어 올리세요."
],
"Barbell push press": [
"바벨을 어깨 앞쪽에 걸치고 팔꿈치는 살짝 앞으로, 손은 어깨보다 살짝 바깥쪽에 위치시킵니다.",
"딥: 무릎을 굽혀 얕은 쿼터 스쿼트 자세를 만들되 상체는 완벽히 수직을 유지합니다.",
"드라이브: 다리를 순간적으로 펴서 바벨을 어깨에서 쏘아 올립니다.",
"바벨이 지나가면 고개를 밀어 넣으며 팔을 완전히 펴서 머리 위로 락아웃합니다.",
"무릎을 부드럽게 굽혀 충격을 흡수하며 바벨을 다시 어깨로 내린 뒤, 다음 반복 전에 자세를 재정비합니다."
],
"Barbell row": [
"바벨 위에 서서 발을 골반 너비로 벌리고, 힙 힌지로 상체를 약 45~70도 숙인 뒤, 어깨너비보다 살짝 넓게 오버핸드 그립으로 바벨을 잡습니다.",
"등을 평평하게, 가슴은 편 채 유지하고 바벨이 팔 길이만큼 늘어지게 둡니다. 이것이 시작 자세입니다.",
"팔꿈치를 뒤로, 위로 밀어내며 바벨을 가슴 아랫부분이나 윗배 쪽으로 당겨 올립니다.",
"통제된 궤적으로 바벨을 다시 매달린 자세까지 내리며 팔을 완전히 폅니다.",
"동작 내내 상체 각도를 고정하세요. 당기면서 몸을 일으키고 싶은 충동을 참으세요."
],
"Barbell shrug": [
"중량을 실은 바벨 위에 발을 골반 너비로 벌려 서고, 골반 너비보다 살짝 넓게 오버핸드로 잡은 뒤 일어서서 바벨을 들어 올립니다.",
"팔을 완전히 편 채 바벨이 허벅지 앞에 늘어지게 둡니다.",
"어깨를 최대한 높이 귀 쪽으로 똑바로 으쓱 올립니다.",
"최고점에서 한 박자 멈춘 뒤 어깨를 천천히 다시 내립니다.",
"어깨를 돌리지 마세요. 이 동작은 순수하게 수직으로만 으쓱하는 동작입니다. 팔은 동작 내내 완전히 편 상태를 유지합니다."
],
"Barbell skull crusher": [
"벤치에 등을 대고 누워, 바벨이나 EZ바를 어깨너비로 잡고 팔을 가슴 위로 수직으로 폅니다.",
"팔 윗부분은 천장을 향해 똑바로 세운 채 완전히 고정합니다.",
"팔꿈치만 굽혀 바벨을 이마 쪽이나 머리를 살짝 넘어가는 지점까지 내립니다.",
"팔꿈치를 펴서 바벨을 다시 시작 위치까지 밀어 올립니다.",
"내리는 동작을 신중히 통제하세요. 바벨이 얼굴 가까이 있으므로 의도적으로 천천히 내려야 합니다."
],
"Barbell upright row": [
"바벨을 허벅지 앞에서 오버핸드, 어깨너비 그립으로 잡습니다.",
"팔꿈치를 옆으로 이끌며 바벨을 몸을 따라 똑바로 위로 당깁니다.",
"바벨이 가슴 윗부분 높이에 도달하고 팔꿈치가 어깨보다 살짝 높아지면 멈춥니다.",
"동작 내내 손목은 팔꿈치보다 아래에 두고 바벨은 옷에 가깝게 유지합니다.",
"천천히 팔이 완전히 늘어진 자세까지 내리며, 반복 사이에 흔들거나 몸을 젖히지 않습니다."
],
"Bench dumbbell chest press": [
"플랫 벤치에 앉아 무릎 위에 덤벨을 하나씩 올린 뒤, 뒤로 누우면서 한쪽씩 덤벨을 들어 올립니다.",
"팔을 곧게 펴고 손바닥이 앞을 향하게 한 채 덤벨을 가슴 바로 위에 위치시킵니다.",
"통제된 곡선 궤적으로 덤벨을 내려, 팔 윗부분이 벤치와 같은 높이가 되고 팔꿈치 각도가 약 60~75도가 되게 합니다.",
"같은 궤적을 따라 덤벨을 다시 위로, 살짝 안쪽으로 밀어 올려 시작 위치로 돌아옵니다.",
"동작을 마칠 때는 덤벨을 허벅지 쪽으로 가져온 뒤 일어나 앉으세요. 절대 바닥에 떨어뜨리지 마세요."
],
"Bent-over dumbbell reverse fly": [
"양손에 덤벨을 들고, 상체가 바닥과 거의 평행이 될 때까지 힙 힌지로 숙이며 팔은 아래로 늘어뜨립니다.",
"등을 평평하게, 코어에 힘을 유지하고 무릎은 살짝 굽힙니다.",
"팔꿈치가 이끌게 하며 양팔을 넓은 곡선을 그리듯 옆으로 들어 올려 어깨 높이와 같아질 때까지 올립니다.",
"최고점에서 후면삼각근을 조인 뒤 통제된 속도로 덤벨을 다시 내립니다.",
"들어 올릴 때 상체가 일어나지 않게 하세요. 세트 내내 힙 힌지 각도를 고정하세요."
],
"Bicycle crunch": [
"등을 대고 누워 손가락 끝을 관자놀이에 대고, 무릎을 세우며 어깨뼈를 매트에서 살짝 들어 올립니다.",
"한쪽 무릎을 몸 쪽으로 당기면서 다른 쪽 다리는 바닥 위에 뜨도록 뻗습니다.",
"갈비뼈를 회전시켜 반대쪽 팔꿈치가 굽힌 무릎 쪽으로 향하게 합니다.",
"펴고, 당기고, 회전하는 부드러운 페달링 동작으로 좌우를 번갈아 합니다.",
"허리를 매트에 밀착시킨 채 양방향 모두 천천히 움직이세요."
],
"Bulgarian split squat": [
"뒷발을 몸 뒤쪽의 벤치나 높은 곳에 올려놓고, 내려갔을 때 정강이가 수직을 유지할 수 있도록 앞발을 충분히 앞으로 내딛습니다.",
"상체를 곧게 세우고 코어에 힘을 준 채, 덤벨을 몸 옆에 들거나 바벨을 등에 짊어집니다.",
"양쪽 무릎을 동시에 굽혀 뒷무릎을 바닥 쪽으로 내리되, 앞정강이는 수직을 유지합니다.",
"앞발 뒤꿈치로 밀어내며 시작 위치까지 다시 올라옵니다.",
"체중의 대부분은 앞발에 실려야 합니다. 뒷발은 단지 균형을 위한 것이지 미는 용도가 아닙니다."
],
"Cable bicep curl": [
"도르래를 가장 낮은 위치로 설정하고 스트레이트 바나 EZ바를 연결한 뒤, 어깨너비로 언더핸드 그립을 잡습니다.",
"곧게 선 채 케이블이 팽팽해지도록 살짝 뒤로 물러나, 팔을 아래로 편 상태에서 시작합니다.",
"팔 윗부분을 고정하고 팔꿈치를 몸 옆에 붙인 채 바를 어깨 쪽으로 들어 올립니다.",
"케이블 장력에 저항하며 팔이 완전히 펴질 때까지 천천히 바를 내립니다.",
"케이블은 하단 위치에서도 일정한 장력을 제공합니다. 이를 활용해 덤벨보다 전체 궤적을 더 효과적으로 자극하세요."
],
"Cable chest fly": [
"양쪽 도르래를 가슴이나 어깨 높이로 설정하고, 중앙에 서서 양손에 손잡이를 하나씩 잡습니다.",
"한쪽 발을 앞으로 내딛어 스탠스를 만들고 등을 평평하게 유지한 채 살짝 앞으로 기울이며, 팔은 팔꿈치를 살짝 굽힌 채 옆으로 펼칩니다.",
"양팔을 넓은 곡선을 그리며 앞으로, 함께 모아 손잡이가 몸 앞 가슴 높이에서 만날 때까지 움직입니다.",
"천천히 반대 방향으로 곡선을 그리며 팔을 벌려 가슴에 완전한 스트레칭이 느껴질 때까지 엽니다.",
"돌아오는 동작을 통제하세요. 케이블이 팔을 통제 불가능하게 뒤로 당기게 두지 마세요."
],
"Cable crunch": [
"케이블을 최상단에 놓고 로프를 연결한 뒤, 풀리 아래에 무릎을 꿇고 로프 양 끝을 얼굴 양옆에서 각각 한 손으로 잡으세요.",
"무릎 꿇은 자세에서 엉덩이는 완전히 고정하고 움직이지 않도록 하세요.",
"척추를 둥글게 말면서 팔꿈치를 허벅지 쪽으로 당겨 크런치 동작을 만드세요.",
"수축된 자세를 잠깐 유지한 뒤, 케이블의 긴장을 유지하면서 천천히 시작 자세로 돌아오세요.",
"오직 복근만 일하도록 하고, 엉덩이가 뒤꿈치 쪽으로 주저앉지 않도록 하세요."
],
"Cable face pull": [
"케이블 풀리를 얼굴 상단 높이에 맞추고 로프를 연결한 뒤, 손바닥이 아래를 향하게 양손으로 로프 끝을 각각 잡으세요.",
"케이블에 장력이 걸리도록 뒤로 물러서고, 어깨너비로 서서 팔을 풀리 쪽으로 뻗으세요.",
"팔꿈치를 바깥쪽 위로 귀 높이까지 벌리며 로프를 얼굴 쪽으로 당기고, 위팔을 외회전시키세요.",
"당기는 동작 끝에서 엄지손가락이 뒤를 향하고 손이 귀 높이에 오도록 한 뒤 잠깐 강하게 조이세요.",
"상체를 그대로 고정한 채 로프를 천천히 제어하며 시작 자세로 되돌리세요."
],
"Cable glute kickback": [
"풀리를 가장 낮은 위치로 맞추고 발목 스트랩을 한쪽 발목에 채우세요.",
"타워를 마주 보고 프레임을 잡은 채, 지지하는 무릎을 살짝 굽히고 상체를 약간 앞으로 숙이세요.",
"스트랩을 찬 다리를 곧게 편 채로 뒤로 위로 쓸어 올리며 정점에서 둔근을 조이세요.",
"동작 내내 엉덩이는 정면을 향하게, 허리는 중립을 유지하세요.",
"무게추가 부딪히지 않도록 제어하며 되돌린 뒤, 세트를 마치고 다리를 바꾸세요."
],
"Cable lateral raise": [
"낮은 케이블 풀리를 설정하고 머신 옆에 서서 풀리에서 먼 쪽 손으로 핸들을 잡으세요.",
"가까운 쪽 손은 균형을 위해 머신에 가볍게 짚고 몸을 곧게 세우세요.",
"팔이 바닥과 평행이 될 때까지 넓은 호를 그리며 옆으로 위로 들어 올리세요. 이때 케이블이 몸을 가로질러 당깁니다.",
"케이블의 저항을 느끼며 팔을 천천히 다시 내리세요.",
"가동 범위를 늘리고 시작 지점의 긴장을 유지하기 위해 풀리에서 살짝 몸을 기울이세요."
],
"Cable rope hammer curl": [
"풀리를 가장 낮은 위치에 놓고 로프를 연결한 뒤, 손바닥이 서로 마주 보게 양손으로 로프 끝을 각각 잡으세요.",
"몸을 곧게 세우고 케이블이 팽팽해지도록 뒤로 물러선 뒤, 팔을 아래로 뻗은 자세로 시작하세요.",
"손바닥이 서로 마주 보는 상태를 유지하며 로프 양 끝을 어깨 쪽으로 컬링하세요.",
"정점에서는 더 강한 최고 수축을 위해 로프를 살짝 바깥쪽으로 벌려도 좋습니다.",
"로프를 제어하며 다시 내리고, 다음 반복 전에 팔을 완전히 펴세요."
],
"Cable rope tricep extension": [
"케이블을 최상단 위치에 놓고 로프를 연결한 뒤, 손바닥이 서로 마주 보게 양손으로 로프 끝을 각각 잡으세요.",
"팔꿈치를 옆구리에 고정하고 약 90도로 굽힌 채 상체를 살짝 앞으로 기울여 서세요.",
"팔꿈치를 펴며 로프를 아래로 밀고, 완전히 펴지는 순간 로프 양 끝을 동시에 벌리세요.",
"로프를 제어하며 다시 위로 올려 팔꿈치가 90도로 돌아오게 하세요.",
"하단에서 로프를 벌리는 동작은 삼두근의 최고 수축을 강화하니 의도적으로 실행하세요."
],
"Cable tricep kickback": [
"낮은 풀리에 D-핸들을 연결하고 머신 옆에 서서 손바닥이 안쪽을 향하게 한 손으로 잡으세요.",
"상체가 바닥과 약 45도가 될 때까지 고관절을 접고, 위팔을 몸통에 붙여 바닥과 평행하게 고정하세요.",
"팔꿈치를 펴서 전완을 뒤로 뻗어 팔 전체가 바닥과 평행해질 때까지 뻗으세요.",
"케이블의 저항에 맞서 팔꿈치를 천천히 90도로 다시 굽히세요.",
"위팔은 완전히 고정된 상태를 유지하고, 오직 전완만 팔꿈치를 축으로 움직여야 합니다."
],
"Chest dips": [
"평행 딥스 바에 팔을 완전히 편 채로 올라선 뒤, 무릎을 굽히고 발목을 교차하세요.",
"상체를 약 30도 앞으로 기울여 가슴이 바닥을 향하게 하세요.",
"어깨가 팔꿈치 높이 근처까지 내려가도록 몸을 낮추고, 팔꿈치는 살짝 바깥으로 벌리세요.",
"하단에서도 앞으로 기울인 자세를 유지하며 가슴 전체의 스트레치를 느끼세요.",
"가슴을 조이며 밀어 올리되, 거칠게 완전히 잠그기 직전에 멈추세요."
],
"Chest-supported machine row": [
"패드 높이를 조정해 가슴이 평평하게 닿도록 하고, 핸들을 편안한 높이로 맞추세요.",
"가슴을 패드에 단단히 밀착시켜 앉고 핸들을 잡으세요.",
"팔꿈치를 뒤로 밀며 견갑골을 서로 모아 조이면서 핸들을 당기세요.",
"천천히 핸들을 시작 위치로 되돌리며 팔을 완전히 펴고 견갑골이 앞으로 벌어지게 하세요.",
"가슴 패드가 허리의 개입을 차단하니, 등만 고립되도록 패드에 밀착된 상태를 유지하세요."
],
"Chin-ups": [
"풀업 바를 어깨너비 또는 그보다 살짝 좁게, 손바닥이 자신을 향하게(언더핸드/서프네이션 그립) 잡으세요.",
"팔을 완전히 편 채로 매달리고, 당기기 전에 견갑골을 살짝 뒤로 모아 광배근을 활성화하세요.",
"팔꿈치를 아래와 골반 쪽으로 밀어 턱이 바를 넘을 때까지 몸을 끌어올리세요.",
"팔이 다시 완전히 펴질 때까지 완전히 제어된 상태로 몸을 내리세요.",
"언더핸드 그립은 일반 풀업보다 이두근을 더 많이 동원하니, 팔이 아니라 등에서부터 동작을 주도하세요."
],
"Close-grip bench press": [
"랙 안 벤치에 등을 대고 누워, 바를 어깨너비보다 좁게(주먹 하나 정도 간격) 엄지손가락을 감아 잡으세요.",
"가슴 위에서 팔을 완전히 편 채로 바를 랙에서 빼내세요.",
"바를 가슴 하부/흉골 쪽으로 내리며, 팔꿈치를 갈비뼈에 바짝 붙이고 바깥으로 벌리지 마세요.",
"같은 경로를 따라 팔이 완전히 펴질 때까지 바를 다시 밀어 올리세요.",
"좁은 그립과 붙인 팔꿈치는 주된 부하를 가슴에서 삼두근으로 옮깁니다."
],
"Concentration curl": [
"벤치에 앉아 발을 넓게 벌리고 상체를 앞으로 숙이세요.",
"한쪽 팔꿈치 뒤쪽을 같은 쪽 허벅지 안쪽에 대고, 덤벨을 늘어뜨리세요.",
"덤벨을 그 어깨 쪽으로 컬링하세요. 팔꿈치는 허벅지에서 절대 떨어지지 않습니다.",
"정점에서 1초간 강하게 조이세요.",
"팔이 완전히 펴질 때까지 내리고, 세트를 마친 뒤 팔을 바꾸세요."
],
"Dead hang": [
"풀업 바를 어깨너비보다 살짝 넓게 오버핸드 그립으로 잡으세요.",
"발을 딛거나 뛰어올라 팔을 완전히 편 채 온몸의 체중이 매달리게 하세요.",
"어깨가 자연스럽게 올라가고 척추가 이완되도록 두면서 안정적으로 계속 호흡하세요.",
"과도하게 흔들리지 않도록 악력의 긴장을 유지하며 목표 시간만큼 버티세요.",
"버티기가 끝나면 조심스럽게 발을 딛거나 몸을 내리세요."
],
"Decline dumbbell press": [
"벤치를 디클라인 각도로 설정하고 발을 레그 패드 아래에 단단히 고정하세요.",
"등을 대고 누워 팔꿈치를 굽힌 채 덤벨을 가슴 하부 양옆에 위치시키세요.",
"팔이 완전히 펴질 때까지 두 덤벨을 위와 살짝 안쪽으로 밀어 올리세요.",
"팔꿈치가 벤치 높이 정도에 올 때까지 제어하며 내리세요.",
"마지막 반복 후 덤벨을 가슴 하부로 가져오고 코어에 힘을 주며 일어나세요."
],
"Decline sit-ups": [
"디클라인 벤치의 레그 패드 아래에 발을 단단히 걸고, 팔을 교차하거나 손을 머리 뒤에 가볍게 대고 누우세요.",
"상체가 바닥과 평행하고 등이 패드에 평평하게 닿은 하단 자세에서 시작하세요.",
"복근을 수축시켜 상체가 거의 수직이 될 때까지 위로 말아 올리세요.",
"등이 다시 패드에 평평하게 닿을 때까지 천천히 내려가세요.",
"손을 머리 뒤에 뒀다면 그건 지지용일 뿐이니 목을 앞으로 잡아당기지 마세요."
],
"Diamond push-ups": [
"푸시업 자세를 취하고 흉골 아래에서 검지와 엄지가 다이아몬드 모양을 이루도록 손을 모으세요.",
"코어와 둔근을 조여 머리부터 발뒤꿈치까지 단단한 플랭크 자세를 유지하세요.",
"팔꿈치를 굽혀 가슴을 다이아몬드 쪽으로 내리세요. 팔꿈치는 뒤로 향하고 바깥으로 벌어지지 않아야 합니다.",
"팔을 완전히 펴며 시작 자세로 다시 밀어 올리세요.",
"난이도를 낮추려면 무릎을 대고, 높이려면 발을 올리세요."
],
"Dumbbell Romanian deadlift": [
"양손에 덤벨을 하나씩 들고 손바닥이 몸을 향하게 허벅지 앞에 두고 서세요.",
"등을 평평하게, 무릎을 살짝 부드럽게 구부린 채 코어를 조이세요.",
"고관절을 힌지처럼 접으며 덤벨을 다리를 따라 내리되, 정강이에 가깝게 유지하세요.",
"햄스트링이 완전히 늘어나는 느낌이 들고 허리가 말리기 전에 멈추세요.",
"엉덩이를 앞으로 밀고 둔근을 강하게 조이며 일어서세요."
],
"Dumbbell bicep curl": [
"양손에 덤벨을 하나씩 들고 손바닥이 앞을 향하게 하여 옆에 두고 서세요.",
"위팔을 몸통에 고정하고, 어깨는 뒤로, 가슴은 들어 올린 상태를 유지하세요.",
"위팔을 완전히 고정한 채 덤벨을 동시에 또는 번갈아 어깨 쪽으로 컬링하세요.",
"완전히 제어하며 덤벨을 시작 자세로 되돌리세요.",
"동작 내내 팔꿈치를 몸통과 일직선으로 유지하세요. 컬링할 때 앞으로 흘러가면 안 됩니다."
],
"Dumbbell fly": [
"벤치에 등을 대고 누워, 팔꿈치를 살짝 고정된 각도로 유지하며 두 덤벨을 거의 완전히 편 팔로 시작 위치까지 밀어 올리세요.",
"그 팔꿈치 각도를 고정한 채 팔을 넓은 호를 그리며 바닥 쪽으로 벌리세요.",
"가슴에 깊은 스트레치가 느껴질 때까지 내리세요. 위팔이 벤치와 거의 나란해지는 지점입니다.",
"가슴을 조이며 같은 호를 그려 덤벨이 가슴 위로 다시 돌아올 때까지 양팔을 들어 올리세요.",
"모든 움직임은 어깨 관절에서 나옵니다. 팔꿈치 각도는 절대 바뀌지 않습니다."
],
"Dumbbell front raise": [
"양손에 덤벨을 하나씩 들고 손바닥이 아래나 안쪽을 향하게 허벅지 앞에 두고 곧게 서세요.",
"코어를 조이고 상체를 곧게 세우며 팔은 거의 완전히 편 상태를 유지하세요.",
"양팔을 곧바로 앞으로 위로 들어 올려 바닥과 평행이 될 때까지 올리세요.",
"제어된 호를 그리며 팔을 다시 허벅지로 내리세요.",
"상체를 흔들지 마세요. 동작은 전적으로 어깨 전면 삼각근에서 나와야 합니다."
],
"Dumbbell hip thrust": [
"바닥에 앉아 윗등을 벤치에 기대고, 덤벨을 골반 위에 올려 양손으로 잡으세요.",
"발은 골반 너비로 벌려 바닥에 붙이고, 무릎은 약 90도로 굽힙니다.",
"발뒤꿈치로 밀며 엉덩이를 조여, 무릎부터 어깨까지 몸이 일직선이 될 때까지 골반을 들어 올리세요.",
"골반을 천천히 통제하며 바닥 쪽으로 내리세요.",
"턱을 당긴 채로, 몸이 일직선이 되는 지점에서 멈추고 허리를 과도하게 젖히지 마세요."
],
"Dumbbell lateral raise": [
"양손에 덤벨을 하나씩 들고 몸통 옆에 둔 채 팔꿈치를 살짝 굽히고 곧게 섭니다.",
"코어에 힘을 주고 동작 내내 상체를 완전히 고정하세요. 이 운동은 철저한 고립 운동입니다.",
"팔꿈치를 살짝 앞세워 양팔을 넓은 호를 그리며 옆으로 들어 올려 바닥과 평행이 되게 하세요.",
"덤벨을 완전히 통제하며 다시 몸통 옆으로 내리세요.",
"승모근을 으쓱이지 말고, 목을 길게 유지하며 어깨를 계속 아래로 눌러주세요."
],
"Dumbbell lunge": [
"양손에 덤벨을 하나씩 들고 곧게 선 상태에서 한쪽 발을 크게 앞으로 내디디세요.",
"상체를 곧게 세우고 앞정강이는 거의 수직을 유지하며, 앞무릎이 둘째 발가락 방향을 따라가게 하세요.",
"앞허벅지가 바닥과 거의 평행이 될 때까지 뒷무릎을 바닥 쪽으로 내리세요.",
"앞발 뒤꿈치로 밀어 다시 일어서세요.",
"반대쪽 발로 내디뎌 좌우 번갈아 진행하거나, 한쪽 다리로 모든 반복을 마친 뒤 바꾸세요."
],
"Dumbbell pullover": [
"윗등만 벤치에 걸치듯 눕고, 발은 바닥에 붙이며 엉덩이는 살짝 낮춥니다.",
"덤벨 하나를 양손으로 잡고 팔을 거의 완전히 편 채 살짝 굽힌 상태로 가슴 위로 들어 올리세요.",
"덤벨을 호를 그리며 머리 뒤 바닥 방향으로 내려, 가슴과 광배근에 깊은 스트레칭을 느끼세요.",
"같은 호를 그리며 덤벨을 다시 가슴 바로 위까지 끌어올리세요.",
"엉덩이는 낮게, 팔꿈치 각도는 고정한 채 유지하세요. 이 동작은 프레스가 아닌 호 모양의 움직임입니다."
],
"Dumbbell reverse wrist curl": [
"벤치 끝에 앉아 손바닥이 아래를 향하게 팔뚝을 허벅지에 올리고, 손목이 무릎을 살짝 넘어가게 하세요.",
"양손에 덤벨을 하나씩 들고, 손목이 바닥 쪽으로 내려가 충분히 스트레칭되게 하세요.",
"팔뚝 뒷면의 신전근을 수축시켜 손목을 위로 말아 올리세요.",
"완전히 스트레칭된 자세로 통제하며 되돌아오세요.",
"리스트 컬보다 가벼운 무게를 사용하세요. 신전근은 크기가 작아 쉽게 지치므로, 통제된 고반복이 이상적입니다."
],
"Dumbbell shrug": [
"양손에 덤벨을 하나씩 들고 팔을 완전히 편 채 몸통 옆에 두고 섭니다.",
"발은 어깨너비로 벌리고 코어에 힘을 준 채 곧게 섭니다.",
"양쪽 어깨를 최대한 높이 귀 쪽으로 곧장 으쓱 올리세요.",
"맨 위에서 한 박자 멈춘 뒤 어깨를 통제하며 다시 내리세요.",
"팔은 완전히 편 상태를 유지하고, 팔꿈치를 굽히거나 어깨를 굴리지 마세요."
],
"Dumbbell skull crusher": [
"벤치에 등을 대고 누워, 양손에 덤벨을 하나씩 들고 손바닥이 마주 보게 한 채 가슴 위로 팔을 뻗으세요.",
"위팔을 수직으로 유지하고 완전히 고정하세요. 운동 내내 움직이지 않아야 합니다.",
"팔꿈치를 굽혀 양쪽 덤벨을 머리 옆쪽으로 내리세요.",
"팔꿈치를 펴서 팔을 다시 시작 자세로 들어 올리세요.",
"위팔이 흔들린다면 무게를 줄이세요. 이 동작은 오직 팔꿈치 경첩 움직임이어야 합니다."
],
"Dumbbell standing calf raise": [
"한 손에 덤벨을 들고, 계단이나 원판 같은 높은 곳에 발볼로 서서 뒤꿈치는 밖으로 걸치세요.",
"균형을 위해 반대쪽 손으로 고정된 지지대를 잡으세요.",
"종아리가 완전히 스트레칭되도록 뒤꿈치를 최대한 낮추세요.",
"발볼로 밀어 뒤꿈치를 최대한 높이 들어 올리세요.",
"한쪽 발로 모든 반복을 마친 뒤 바꾸거나, 덤벨 두 개를 사용해 양쪽 종아리를 동시에 운동하세요."
],
"Dumbbell step-up": [
"양손에 덤벨을 하나씩 들고 무릎 높이의 튼튼한 박스 앞에 섭니다.",
"발 전체를 박스 위에 평평하게 올리세요.",
"그 발의 뒤꿈치로 밀어 몸을 들어 올리세요. 바닥에 남은 다리로 밀지 마세요.",
"박스 위에서 양발을 모두 딛고 완전히 일어서세요.",
"내려오는 동작을 통제하며 반복하세요. 한쪽 다리를 먼저 끝내거나 번갈아 진행합니다."
],
"Dumbbell sumo squat": [
"발을 어깨너비보다 상당히 넓게 벌리고 발끝은 약 45도 바깥으로 향하게 섭니다. 덤벨 하나를 양손으로 잡고 다리 사이에서 수직으로 듭니다.",
"상체를 곧게 세우고 코어에 힘을 주세요. 덤벨은 다리 사이에서 자유롭게 매달려 있습니다.",
"무릎을 발끝 방향으로 밀어내며 굽히고, 허벅지가 바닥과 평행이 되거나 그 아래까지 내려가세요.",
"뒤꿈치로 밀어 다리를 펴며 일어서세요.",
"동작 내내 가슴을 세우고, 내려갈 때 허리가 구부러지지 않게 하세요."
],
"Dumbbell wrist curl": [
"벤치 끝에 앉아 손바닥이 위를 향하게 팔뚝을 허벅지에 올리고, 손목이 무릎을 살짝 넘어가게 하세요.",
"양손에 덤벨을 하나씩 들고, 충분히 스트레칭되도록 손끝 쪽으로 굴러가게 두세요.",
"팔뚝 굴곡근을 수축시켜 손목을 최대한 위로 말아 올리세요.",
"완전히 스트레칭된 자세로 통제하며 되돌아오세요.",
"팔뚝은 허벅지 위에 계속 평평하게 붙이고 손목만 움직이세요."
],
"EZ bar curl": [
"EZ바의 각진 구간을 언더핸드로 잡고, 손 간격은 어깨너비 정도로 합니다.",
"팔꿈치를 갈비뼈에 가볍게 고정한 채 곧게 섭니다.",
"위팔을 움직이지 않고 바를 가슴 윗부분 높이까지 컬하세요.",
"맨 위에서 잠시 이두근을 조이세요.",
"매 반복마다 팔이 완전히 펴질 때까지 통제하며 내리세요."
],
"EZ bar front raise": [
"EZ바의 안쪽 각진 그립을 양손으로 잡고, 손바닥은 약간 안쪽을 향하게 하여 바를 허벅지에 둔 채 곧게 섭니다.",
"코어에 힘을 주고 상체를 완전히 고정하세요.",
"바를 정면으로 곧장 들어 올려 팔이 바닥과 평행이 되게 하세요.",
"통제된 호를 그리며 바를 다시 허벅지로 내리세요.",
"팔꿈치를 굽히거나 상체를 흔들어 돕지 마세요. 동작은 전적으로 전면 삼각근에서 나와야 합니다."
],
"Farmers carry": [
"무거운 덤벨을 양손에 하나씩 들고 데드리프트 방식으로 들어 올리세요. 허리를 곧게 편 채 힙 힌지로 내려갔다 일어서고, 등을 웅크리지 마세요.",
"곧게 섭니다. 어깨는 뒤로 젖혀 아래로 내리고, 갈비뼈는 골반 위에 정렬하며 시선은 정면을 향합니다.",
"짧고 빠르며 통제된 보폭으로 걸으며, 양쪽 덤벨을 완전히 수평으로 유지하세요.",
"그립은 꽉 쥐고 팔은 곧게 편 채로 유지하세요. 어깨를 으쓱이거나 팔을 흔들지 마세요.",
"목표한 시간이나 거리만큼 걸은 뒤, 허리를 곧게 편 힙 힌지 자세로 무게를 내려놓으세요."
],
"Flat barbell bench press": [
"랙 안에 플랫 벤치를 놓고, 그 아래 누웠을 때 팔이 거의 완전히 펴지는 높이에 바를 맞추세요.",
"벤치에 등을 대고 누워 양발을 바닥에 붙이고, 견갑골을 모아 아래로 내려 벤치에 밀착시킨 뒤, 어깨너비보다 살짝 넓게 엄지를 감싸 바를 잡으세요.",
"바를 랙에서 빼내 팔꿈치를 몸통에서 45~75도 각도로 유지하며 가슴 중앙까지 통제된 궤적으로 내리세요.",
"같은 궤적을 따라 팔이 완전히 펴질 때까지 바를 다시 밀어 올리세요.",
"내리기 전에 숨을 들이마시고 코어에 힘을 주며, 바를 밀어 올릴 때 힘차게 내쉬세요."
],
"Glute bridge": [
"무릎을 굽히고 발은 골반 너비로 바닥에 붙인 채 팔은 몸통 옆에 두고 바닥에 눕습니다.",
"안정감을 위해 발과 팔로 바닥을 눌러주세요.",
"엉덩이를 조여 골반을 위로 들어 올려 어깨부터 무릎까지 몸이 일직선이 되게 하세요.",
"맨 위에서 1~2초간 수축을 유지한 뒤, 골반을 바닥 바로 위까지만 내리고 완전히 쉬지 마세요.",
"매 반복의 아래 지점에서 바닥에서 몇 센티미터 위에 멈춰 엉덩이 긴장을 유지하세요."
],
"Goblet squat": [
"덤벨 하나를 가슴 앞에 수직으로 들고 양 손바닥으로 윗부분을 감싸며 팔꿈치는 아래를 향하게 하세요.",
"발을 어깨너비보다 살짝 넓게 벌리고 발끝은 약간 바깥으로 향하게 섭니다.",
"덤벨을 가슴에 붙인 채 가슴을 세우고, 골반 사이로 주저앉듯 스쿼트하세요.",
"맨 아래에서 뒤꿈치를 바닥에 붙인 채 팔꿈치가 무릎 안쪽에 살짝 닿게 하세요.",
"바닥을 밀어내며 일어서고, 올라오면서 숨을 내쉬세요."
],
"Hack squat": [
"어깨 패드를 조절하고, 발판 위에 어깨너비로 발을 올려 발끝은 살짝 바깥으로 향하게 하며 등은 등받이에 평평하게 붙이세요.",
"어깨를 패드 아래에 놓고 안전 손잡이를 풀어 시작하세요.",
"무릎을 굽혀 허벅지가 발판과 최소 평행이 될 때까지 내려가세요.",
"뒤꿈치로 밀어 다리가 거의 펴질 때까지 슬레드를 밀어 올리고, 마지막 반복 후 안전 손잡이를 다시 거세요.",
"뒤꿈치를 발판에 평평하게 붙이고, 동작 내내 무릎이 안쪽으로 모이지 않게 하세요."
],
"Hack squat calf raise": [
"핵 스쿼트 발판 아래쪽 가장자리에 발볼만 올리고 뒤꿈치는 밖으로 걸치며, 어깨를 패드 아래에 놓으세요.",
"다리를 완전히 편 채 무릎을 곧게 유지하고 안전 손잡이를 풀어주세요.",
"종아리를 완전히 스트레칭하기 위해 뒤꿈치를 발판 가장자리보다 최대한 낮게 내리세요.",
"발볼로 밀어 뒤꿈치를 최대한 높이 들어 올리세요.",
"마지막 반복 후 안전 손잡이를 다시 걸어주세요. 세트 내내 다리는 완전히 편 상태를 유지해야 합니다."
],
"Hammer curls": [
"양손에 덤벨을 하나씩 들고 손바닥이 안쪽을 향하게(뉴트럴 그립) 몸통 옆에 두고 섭니다.",
"위팔을 몸통 옆에 고정하고 코어에 힘을 주세요.",
"손바닥이 계속 뉴트럴 자세를 유지한 채 양쪽 덤벨을 어깨 쪽으로 컬하세요.",
"완전히 편 시작 자세로 통제하며 되돌리세요.",
"손목을 돌리지 마세요. 뉴트럴 그립을 유지해야 상완근과 상완요골근을 제대로 타겟할 수 있습니다."
],
"Hanging leg raise": [
"버티컬 니레이즈 스테이션의 손잡이(또는 풀업 바)를 잡고 팔을 편 채 몸을 곧게 펴서 매달리세요.",
"다리를 곧게 펴고 몸 바로 아래로 늘어뜨린 상태에서 시작하세요.",
"무릎을 편 채(또는 살짝 굽힌 채) 다리를 최소 바닥과 평행이 될 때까지 들어 올리고, 가능하다면 더 높이 올리세요.",
"흔들리지 않게 다리를 천천히 매달린 자세로 되돌리세요.",
"반동을 이겨내세요 — 천천히 제어하며 하는 반복이 흔들어서 하는 것보다 코어 힘을 훨씬 더 키웁니다."
],
"Incline barbell chest press": [
"랙 안에서 벤치를 30~45도로 세팅하고, 눕고 나서 팔이 거의 다 펴지도록 바 높이를 맞추세요.",
"견갑골을 모으고 발을 바닥에 평평히 붙인 채 누워서, 바를 어깨너비보다 약간 넓게 잡으세요.",
"바를 랙에서 빼내고 팔꿈치를 60~75도 각도로 유지하며 쇄골 바로 아래, 상부 가슴 쪽으로 내리세요.",
"팔이 다 펴질 때까지 바를 곧게 밀어 올리고, 마지막 반복 후 다시 랙에 거치하세요.",
"내릴 때마다 코어에 힘을 주고, 밀어 올릴 때 강하게 숨을 내쉬세요."
],
"Incline bench dumbbell press": [
"벤치를 30~45도로 세팅하고, 낮은 쪽 끝에 앉아 양쪽 무릎에 덤벨을 하나씩 올린 뒤 누우면서 무릎으로 차올리세요.",
"덤벨을 상부 가슴 높이에 위치시키고, 손바닥은 앞을 향하게, 팔꿈치는 덤벨 아래에 오게 하세요.",
"양팔이 완전히 펴질 때까지 덤벨을 위로, 살짝 서로 모으듯 밀어 올리세요.",
"팔꿈치를 60~75도로 유지하며 완만한 호를 그리듯 제어해서 상부 가슴 높이까지 다시 내리세요.",
"마지막 반복 후 덤벨을 무릎 위로 가져온 다음 일어나 앉아 안전하게 마무리하세요."
],
"Incline bench dumbbell rear delt fly": [
"벤치를 30~45도로 세팅하고, 가슴을 패드에 댄 채 다리는 벤치 끝 밖으로 내놓고 엎드리세요.",
"뉴트럴 그립으로 양손에 덤벨을 들고 팔을 거의 편 채 어깨 아래로 늘어뜨리세요.",
"양팔을 넓은 호를 그리듯 옆으로 들어 올려 어깨 높이가 될 때까지 올리세요.",
"최상단에서 후면삼각근을 조인 다음, 덤벨을 제어하며 처음 매달린 자세로 내리세요.",
"엎드린 자세는 반동을 원천 차단합니다 — 후면삼각근 자극을 극대화하려면 매 반복을 천천히 제어하세요."
],
"Incline dumbbell curl": [
"벤치를 약 45도로 세팅하고 양손에 덤벨을 든 채 등을 기대고 앉으세요.",
"손바닥이 앞을 향하게, 양팔을 곧게 몸통보다 살짝 뒤쪽으로 늘어뜨리세요.",
"팔꿈치가 계속 바닥을 향하게 유지하며 양쪽 덤벨을 컬 하세요.",
"팔꿈치를 앞으로 흔들지 않고 어깨 높이에서 조여주세요.",
"다음 반복 전에 완전히 늘어진 스트레칭 자세까지 천천히 내리세요."
],
"Lat pulldown": [
"허벅지 패드를 조절해 다리를 고정하고, 바를 오버핸드 그립으로 어깨너비보다 넓게 잡은 뒤 앉으세요.",
"10~15도 정도 살짝 뒤로 기울이고 코어에 힘을 준 채, 팔을 머리 위로 완전히 편 상태에서 시작하세요.",
"팔꿈치를 아래와 뒤로 움직여 바를 상부 가슴 쪽으로 당기고, 내려올 때 광배근을 조이세요.",
"바가 제어된 궤도로 천천히 올라가 팔이 완전히 펴질 때까지 두세요.",
"손으로만 당기지 말고 '팔꿈치를 엉덩이 쪽으로'라는 느낌으로 광배근에 집중하세요."
],
"Leg extension": [
"무릎 관절이 머신의 회전축과 일치하도록 등받이와 정강이 패드를 조절하고, 정강이 패드는 정강이 아래쪽에 맞추세요.",
"등을 패드에 대고 앉아 손잡이를 잡고, 정강이를 패드에 붙이세요.",
"대퇴사두근을 수축시켜 다리가 완전히 펴질 때까지 양다리를 뻗으세요.",
"최대 수축 상태를 잠깐 유지한 다음, 제어하며 패드를 시작 위치로 내리세요.",
"반동을 이용하지 마세요 — 이 동작은 흔드는 동작이 아니라 오직 무릎 관절에서만 나와야 합니다."
],
"Leg press": [
"발을 발판에 평평하게 올리고 어깨너비로 벌려 발끝을 살짝 바깥으로 향하게 했을 때 무릎이 약 90도가 되도록 시트를 조절하세요.",
"등 전체와 엉덩이가 시트에 닿게 앉고 손잡이를 잡으세요.",
"다리가 거의 펴질 때까지 발판을 밀어내되, 무릎을 완전히 잠그지는 마세요.",
"무릎을 천천히 굽혀 허벅지가 약 90도가 될 때까지 발판을 내리세요.",
"허리가 시트에서 뜨게 두지 마세요 — 뜬다면 가동 범위를 줄이세요."
],
"Leg press calf raise": [
"레그프레스 머신에 앉아 발판 아래쪽 끝에 발볼만 올려놓으세요.",
"무릎을 아주 살짝만 굽혀 다리를 거의 편 상태로 유지하고, 대퇴사두근에 힘을 주지 마세요.",
"종아리를 완전히 스트레칭하도록 머신이 허용하는 만큼 발뒤꿈치를 바닥 쪽으로 내리세요.",
"발볼로 밀어서 발판을 밀어내고 발뒤꿈치를 완전히 들어 올리세요.",
"내리기 전 최상단에서 멈추세요 — 빠르게 튕기는 것보다 천천히, 의도적으로 하는 반복이 훨씬 효과적입니다."
],
"Leg raise": [
"바닥에 등을 대고 누워 팔을 옆에 두거나 허리 지지를 위해 엉덩이 밑에 두세요.",
"다리를 편 채 바닥에서 살짝만 띄운 상태로 시작하세요.",
"양다리를 가능한 한 곧게 편 채, 수직이 될 때까지(또는 편안한 만큼 높이) 함께 들어 올리세요.",
"다리를 천천히 다시 내리고, 발뒤꿈치가 바닥에 닿기 직전에 멈추세요.",
"내내 허리를 바닥에 밀착시키고, 만약 뜬다면 내리는 각도를 더 높게 조정하세요."
],
"Lying hamstring curl": [
"머신에 엎드려서 무릎 관절을 머신 회전축과 맞추고, 패드는 발뒤꿈치 바로 위에 위치시키세요.",
"안정성을 위해 손잡이를 잡고 엉덩이를 패드에 평평하게 밀착시키세요.",
"무릎을 굽혀 패드를 엉덩이 쪽으로 당기며 다리를 말아 올리세요.",
"제어하며 패드를 천천히 시작 위치로 내리세요.",
"컬 동작 중 엉덩이가 패드에서 들리면 무게를 줄이세요 — 이는 보상 동작의 신호입니다."
],
"Machine abduction": [
"어브덕션 머신에 앉아 다리를 모은 상태에서 패드가 허벅지 바깥쪽에 닿도록 조절하세요.",
"등을 패드에 평평하게 붙이고 손잡이를 잡으세요.",
"머신이 허용하는 만큼 패드 저항에 맞서 다리를 바깥쪽으로 미세요.",
"제어하며 허벅지를 천천히 시작 위치로 다시 모으세요.",
"고관절 굴근보다 중둔근에 집중되도록 고관절에서부터 살짝 앞으로 기울이세요."
],
"Machine adduction": [
"어덕션 머신에 앉아 다리를 시작 위치로 벌린 상태에서 패드가 허벅지 안쪽에 닿도록 조절하세요.",
"등을 시트에 평평하게 붙이고 손잡이를 잡으세요.",
"패드 저항에 맞서 허벅지를 서로 가까워지게 다리를 모으세요.",
"제어하며 다리를 천천히 시작 위치로 다시 벌리세요.",
"등을 평평하게 유지하고 동작을 돕기 위해 앞으로 구부리지 마세요."
],
"Machine chest fly": [
"손잡이가 가슴 중앙에 오도록 시트를 조절하고, 무게를 선택한 뒤 암 범위를 편안한 스트레칭 위치로 설정하세요.",
"등을 패드에 평평하게 붙이고 앉아 팔을 넓게 벌린 채 손잡이를 잡으세요.",
"양쪽 패드를 넓은 호를 그리며 앞으로 모아 가슴 앞에서 거의 만날 때까지 가져오세요.",
"완전한 스트레칭을 느끼며 패드가 천천히 벌어져 시작 위치로 돌아가게 하세요.",
"등을 패드에 붙인 채 유지하고 어느 순간에도 어깨를 으쓱하지 마세요."
],
"Machine chest press": [
"손잡이가 가슴 중앙 높이에 오도록 시트를 조절하고 무게를 선택하세요.",
"등을 패드에 평평하게 붙이고 앉아 어깨너비 그립으로 손잡이를 잡으세요.",
"팔이 거의 완전히 펴질 때까지 손잡이를 곧게 앞으로 밀되, 세게 잠그지는 마세요.",
"완전한 스트레칭이 느껴질 때까지 손잡이를 제어하며 가슴 쪽으로 되돌리세요.",
"내내 발을 바닥에 평평하게 붙이고 등을 패드에 완전히 밀착시키세요."
],
"Machine hip thrust": [
"가이드에 따라 최상단에서 엉덩이가 완전히 펴질 수 있도록 머신의 시트와 어깨 패드를 조절하세요.",
"등을 시트에 대고 앉아 발을 힙 너비로 벌려 풋플레이트에 평평하게 올려놓으세요.",
"발뒤꿈치로 밀며 둔근을 조여 패드 저항에 맞서 엉덩이를 앞으로 밀어내세요.",
"완전히 편 자세를 한 박자 유지한 다음 제어하며 내리세요.",
"엉덩이가 완전히 펴진 지점에서 멈추세요 — 허리가 과신전되지 않게 하세요."
],
"Machine lateral raise": [
"어깨가 머신의 회전축과 일치하도록 시트를 조절하세요.",
"허리를 곧게 펴고 앉아 패드가 위팔 바깥쪽에 닿게 하고, 손은 그립에 가볍게 올리세요.",
"팔꿈치로 밀어 양팔을 옆으로 들어 올리세요.",
"위팔이 바닥과 평행이 되면 멈추세요.",
"웨이트 스택 바닥에서 긴장이 풀리지 않도록 패드가 거의 돌아올 때까지 천천히 내리세요."
],
"Machine preacher curl": [
"겨드랑이가 경사진 패드의 윗부분에 걸리도록 시트를 조절하세요.",
"위팔을 패드 위에 평평하게 대고 손바닥이 위를 향하게 머신 손잡이를 잡으세요.",
"위팔은 패드에 붙인 채 손잡이를 어깨 쪽으로 컬 하세요.",
"가슴은 패드에 붙인 채 최상단에서 조이세요.",
"웨이트 스택이 쾅 부딪히지 않게 하며 거의 완전히 스트레칭될 때까지 내린 뒤 반복하세요."
],
"Machine rear delt fly": [
"팔을 어깨 높이에서 앞으로 편 채 손잡이를 잡을 수 있도록 시트와 암을 조절하세요.",
"가슴을 패드에 댄 채 패드를 마주 보고 앉아(해당하는 경우), 손바닥이 서로 마주 보게 손잡이를 잡으세요.",
"양쪽 손잡이를 넓은 호를 그리며 뒤로, 밖으로 당기며 후면삼각근과 윗등을 조이세요.",
"손잡이를 천천히 앞으로 되돌려 시작 위치로 가져오며 팔을 완전히 펴세요.",
"승모근을 으쓱하지 마세요 — 어깨는 아래로 눌러 유지하고 동작은 후면삼각근이 주도하게 하세요."
],
"Machine seated crunch": [
"암 패드가 상부 가슴이나 어깨에 닿도록 시트 높이를 조절하고 무게를 선택하세요.",
"등을 패드에 대고 앉아 손잡이를 잡고 코어에 힘을 주세요.",
"복근을 이용해 갈비뼈를 골반 쪽으로 말아 올리며 패드를 아래로 당겨 앞으로 크런치 하세요.",
"제어하며 천천히 처음 곧은 자세로 돌아가세요.",
"이것은 척추를 마는 동작입니다 — 엉덩이는 시트에 고정된 채 상체만 둥글게 말립니다."
],
"Machine shoulder press": [
"손잡이가 어깨 높이에 오도록 시트를 조절하고 중량을 선택합니다.",
"등을 패드에 밀착시키고 앉아 손바닥이 앞을 향하게 손잡이를 잡으며, 팔꿈치는 손잡이 아래 90도를 이룹니다.",
"팔이 거의 완전히 펴질 때까지 손잡이를 머리 위로 곧게 밀어 올립니다.",
"손잡이를 컨트롤하며 어깨 높이로 다시 내립니다.",
"동작 내내 등을 패드에 붙이고, 허리가 뜨거나 시트 위로 미끄러지지 않도록 합니다."
],
"Machine-assisted pull-up": [
"스택에서 보조 무게를 설정합니다. 보조 무게가 클수록 당기기가 쉬워집니다.",
"양 무릎을 보조 패드 위에 올리고, 머리 위 손잡이를 어깨보다 약간 넓게 잡습니다.",
"팔을 곧게 편 상태에서 시작해, 턱이 손 높이를 넘을 때까지 팔꿈치를 아래, 뒤로 당깁니다.",
"컨트롤하며 완전히 매달린 자세까지 천천히 내려옵니다.",
"몇 주에 걸쳐 보조 무게를 줄여나가세요. 최종 목표는 보조 없는 풀업입니다."
],
"Mountain climbers": [
"손을 어깨 바로 아래에 두고 몸을 일직선으로 만든 하이 플랭크(푸시업) 자세로 시작합니다.",
"코어에 힘을 주고, 엉덩이가 처지거나 너무 높이 들리지 않게 합니다.",
"반대쪽 다리는 편 채로 한쪽 무릎을 가슴 쪽으로 당깁니다.",
"그 발이 제자리로 돌아오면 곧바로 반대쪽 무릎을 당겨 달리듯 번갈아 반복합니다.",
"동작 내내 엉덩이를 플랭크 높이로 수평 유지하고, 매 동작마다 튀어 오르지 않게 합니다."
],
"Overhead EZ bar tricep extension": [
"등받이가 있는 벤치에 발을 바닥에 붙이고 앉아, 좁은 그립으로 EZ바를 머리 위로 밀어 올립니다.",
"팔 윗부분을 귀 옆에서 수직으로 유지하고, 팔꿈치는 앞쪽 위를 향하게 합니다.",
"팔꿈치만 굽혀 바를 머리 뒤로 내립니다.",
"팔 윗부분을 수직으로 유지한 채, 편안하게 늘어나는 지점까지 내립니다.",
"팔꿈치가 벌어지지 않게 하며 다시 머리 위로 완전히 밀어 올립니다."
],
"Overhead cable tricep extension": [
"케이블을 가장 높은 위치에 설정하고, 로프를 양손으로 잡은 뒤 머신을 등지고 섭니다.",
"앞으로 한 걸음 나와 로프를 머리 위로 들어 올리고, 팔꿈치를 굽혀 손이 머리 뒤에, 팔 윗부분은 귀 옆에 오게 합니다.",
"팔꿈치를 완전히 펴서 팔을 머리 위로 곧게 뻗습니다.",
"로프를 컨트롤하며 다시 머리 뒤로 내려 팔꿈치를 굽힌 시작 자세로 돌아갑니다.",
"팔 윗부분은 머리 옆에 고정된 채로 두고, 팔뚝만 움직여야 합니다."
],
"Pike push-ups": [
"하이 플랭크(푸시업) 자세로 시작해, 발을 손 쪽으로 걸어 이동시켜 엉덩이가 높이 든 역V자 자세를 만듭니다.",
"다리를 최대한 곧게 펴세요. 발이 손에 가까울수록 어깨 각도가 가팔라집니다.",
"팔꿈치를 바깥쪽으로, 살짝 안쪽으로 굽히며 머리를 두 손 사이 바닥 쪽으로 내립니다.",
"팔이 완전히 펴질 때까지 밀어 올려 역V자 자세로 돌아갑니다.",
"발을 손에서 멀리 둘수록 쉬워지고, 가까이 둘수록 어려워지며 어깨에 더 집중됩니다."
],
"Plank": [
"무릎을 꿇고 양 팔뚝을 바닥에 평평하게 놓아 팔꿈치가 어깨 바로 아래에 오게 하며, 손은 주먹을 쥐거나 평평하게 둡니다.",
"양다리를 뒤로 뻗어 팔뚝과 발끝만 바닥에 닿는 플랭크 자세를 만들고, 몸이 일직선이 될 때까지 엉덩이를 들어 올립니다.",
"주먹을 맞는 것처럼 코어에 힘을 주고, 엉덩이를 조이며, 골반을 완전히 수평으로 유지합니다.",
"숨을 참지 않고 고르게 호흡하며 이 자세를 유지합니다.",
"무릎을 바닥에 내려 마무리하고, 자세가 무너지기 시작하는 순간 바로 멈춥니다."
],
"Plate-loaded standing calf raise": [
"발볼만 플랫폼 가장자리에 올리고, 어깨를 패드 아래에 위치시킵니다.",
"발뒤꿈치를 최대한 내려 완전히 늘어난 자세에서 시작합니다.",
"발볼로 밀어 발뒤꿈치를 최대한 높이 들어 올리며 종아리를 쥐어짭니다.",
"다음 반복 전, 발뒤꿈치를 천천히 내려 완전히 늘어난 자세로 돌아갑니다.",
"다리를 완전히 편 상태를 유지하세요. 무릎을 굽히면 비복근(장딴지 근육)에 실리는 부하가 줄어듭니다."
],
"Preacher curl": [
"프리처 벤치를 조절해 팔 윗부분이 패드에 완전히 밀착되고, 겨드랑이가 패드 상단 가장자리에 오게 합니다.",
"EZ바를 언더핸드 그립으로 잡고, 팔을 패드의 경사면을 따라 뻗은 자세로 시작합니다.",
"팔꿈치를 굽혀 팔뚝이 수직이 되거나 살짝 넘어설 때까지 바를 들어 올립니다.",
"바를 천천히 내려 팔이 완전히 펴진 자세로 돌아가며 충분한 스트레치를 느낍니다.",
"프리처 벤치에서는 내리는 동작(이심성 수축)이 특히 효과적이니, 중량을 툭 떨어뜨리려는 유혹을 참으세요."
],
"Pull-ups": [
"풀업 바를 오버핸드 그립으로 잡되, 손을 어깨너비보다 약간 넓게 벌립니다.",
"팔을 완전히 편 채 매달리고, 당기기 전 견갑골을 살짝 모아 광배근에 힘을 넣습니다.",
"턱이 바를 넘을 때까지 팔꿈치를 엉덩이 쪽으로 당기며 몸을 끌어올립니다.",
"팔이 다시 완전히 펴질 때까지 완전히 컨트롤하며 내려갑니다.",
"반동이나 킵핑을 쓰지 마세요. 오르내리는 동작을 완전히 컨트롤해야 광배근 발달을 극대화할 수 있습니다."
],
"Push-ups": [
"손을 어깨너비보다 약간 넓게 바닥에 짚고, 팔을 펴고, 머리부터 발뒤꿈치까지 단단한 플랭크 자세를 만듭니다.",
"코어에 힘을 주고 엉덩이를 조이세요. 이 고정된 플랭크 자세가 시작이자 마무리 자세입니다.",
"팔꿈치를 상체 기준 약 45도로 굽히며 가슴이 바닥에 거의 닿을 때까지 내립니다.",
"바닥을 밀어내며 팔이 완전히 펴질 때까지 팔꿈치를 폅니다.",
"엉덩이가 처지거나 솟으면 안 됩니다. 매 반복마다 몸 전체가 하나의 단단한 단위로 움직여야 합니다."
],
"Reverse EZ bar curl": [
"EZ바의 각진 부분을 오버핸드(손바닥 아래) 그립으로 잡습니다.",
"허리를 곧게 세우고 서서, 팔꿈치는 옆구리에 고정하고 손목은 완전히 곧게 유지합니다.",
"손등이 계속 위를 향하게 유지하며 바를 가슴 윗부분 높이까지 들어 올립니다.",
"손목이 꺾이지 않게 유지하며 정점에서 잠시 멈춥니다.",
"팔이 곧게 펴질 때까지 천천히 내립니다. 네거티브 구간에서 팔뚝이 성장합니다."
],
"Reverse grip pulldown": [
"랫풀다운 머신에 앉아, 바를 어깨너비로 언더핸드(손바닥이 자신을 향하게) 그립으로 잡습니다.",
"다리를 패드 아래에 고정하고, 상체를 살짝 뒤로 기울인 채 팔을 머리 위로 완전히 편 자세에서 시작합니다.",
"팔꿈치를 아래로 당기고 광배근을 쥐어짜며 바를 가슴 윗부분까지 당깁니다.",
"팔이 다시 완전히 펴질 때까지 천천히 바를 되돌립니다.",
"이두만으로 바를 당기지 마세요. 먼저 견갑골을 모으는 데서 힘이 시작돼야 합니다."
],
"Romanian deadlift": [
"발을 골반 너비로 벌리고 서서, 오버핸드 그립으로 바벨을 골반 높이에서 잡습니다.",
"등을 평평하게, 가슴은 세우고, 무릎은 살짝 굽힌 상태를 유지합니다.",
"엉덩이를 뒤로 밀며 힙힌지 동작을 하고, 바를 몸에 가깝게 붙인 채 다리를 따라 내립니다.",
"햄스트링이 완전히 늘어나고 허리가 구부러지기 직전에 멈춘 뒤, 엉덩이를 다시 앞으로 밀어냅니다.",
"정점에서 엉덩이를 강하게 조이고, 다음 반복 전 완전히 일어섭니다."
],
"Russian twist": [
"바닥에 앉아 무릎을 굽히고 발을 살짝 들어 올리며, 상체를 약 45도 뒤로 기울입니다.",
"원판이나 덤벨을 양손으로 잡고 가슴 앞으로 팔을 뻗습니다.",
"상체를 한쪽으로 회전시켜 중량을 엉덩이 옆 바닥 쪽으로 가져갑니다.",
"발을 바닥에서 뗀 채 한 번의 연속 동작으로 반대쪽까지 완전히 회전합니다.",
"회전은 복사근에서 나옵니다. 팔이 아니라 상체가 동작을 이끌게 하세요."
],
"Seated cable row": [
"케이블 로우 스테이션에 앉아 발을 발판에 올리고 무릎을 살짝 굽힌 채, 양손으로 손잡이를 잡습니다.",
"상체를 약 90도로 곧게 세우고 팔을 도르래 쪽으로 뻗은 자세가 시작 자세입니다.",
"팔꿈치를 뒤로 당기고 견갑골을 모으며 손잡이를 아랫배 쪽으로 당깁니다.",
"견갑골이 자연스럽게 벌어지도록 하며 천천히 팔을 뻗어 시작 자세로 돌아갑니다.",
"동작 내내 상체를 곧게 세우고, 반동을 만들기 위해 뒤로 흔들지 마세요."
],
"Seated calf raise": [
"머신에 앉아 무릎 패드를 무릎 바로 위에 위치시키고, 발볼만 발판에 올리고 발뒤꿈치는 밖으로 늘어뜨립니다.",
"발뒤꿈치를 최대한 내려 종아리가 완전히 늘어나게 합니다.",
"발볼로 밀어 발뒤꿈치를 최대한 높이 들어 올리며 종아리를 완전히 수축시킵니다.",
"천천히 내려 완전히 늘어난 자세로 돌아갑니다.",
"반동을 없애기 위해 정점과 바닥 모두에서 잠시 멈춥니다."
],
"Seated dumbbell shoulder press": [
"등받이가 있는 벤치에 등을 붙이고 앉아, 양손에 덤벨을 들고 어깨 높이에서 팔꿈치를 90도로, 손바닥은 앞을 향하게 합니다.",
"허리를 패드에 밀착시키고 발을 바닥에 평평하게 붙입니다.",
"양 덤벨을 팔이 완전히 펴질 때까지 머리 위로 곧게 밀어 올립니다.",
"팔꿈치가 다시 90도가 되도록 어깨 높이로 내립니다.",
"중량이 무거워져도 허리가 꺾이지 않게, 등을 계속 패드에 붙이세요."
],
"Seated hamstring curl": [
"등받이와 다리 패드를 조절해 무릎 관절이 머신의 회전축과 일치하게 하고, 상단 패드가 허벅지를 고정하게 합니다.",
"등을 패드에 붙이고 앉아 손잡이를 잡고, 허벅지를 상단 패드 아래에 고정합니다.",
"무릎을 굽혀 하단 패드를 바닥 쪽으로 당기며 햄스트링을 수축시킵니다.",
"컨트롤하며 천천히 패드를 시작 자세로 되돌립니다.",
"허벅지가 들리지 않도록 동작 내내 상단 패드에 밀착시켜, 햄스트링이 부하를 온전히 받도록 합니다."
],
"Side plank": [
"한쪽으로 누워 팔뚝을 매트에 대고, 팔꿈치는 어깨 바로 아래에 둡니다.",
"다리를 곧게 펴서 포개고, 위쪽 발을 아래쪽 발 위에 올립니다.",
"발목부터 머리까지 몸이 일직선이 될 때까지 엉덩이를 들어 올립니다.",
"고르게 호흡하며 아래쪽 옆구리를 쥐어짠 채 자세를 유지합니다.",
"엉덩이가 처지기 시작하면 세트가 끝난 것입니다. 쉬고 반대쪽으로 바꿉니다."
],
"Single-arm cable fly": [
"케이블을 어깨나 가슴 윗부분 높이에 맞추고, 머신을 옆으로 향한 채 도르래에서 먼 쪽 손으로 손잡이를 잡습니다.",
"케이블에 장력이 걸리도록 한 걸음 물러서고 두 발을 앞뒤로 벌려 균형을 잡습니다. 동작하는 팔은 가슴이 스트레칭되도록 바깥쪽으로 뻗습니다.",
"팔을 크게 호를 그리며 앞으로, 몸 중앙을 가로질러 손이 가슴 앞 정중선을 넘을 때까지 당겨옵니다.",
"천천히 반대로 호를 그리며, 케이블이 팔을 다시 시작 스트레칭 자세로 당기도록 둡니다.",
"팔꿈치는 살짝 구부린 상태를 동작 내내 유지하세요 — 모든 움직임은 어깨 관절에서 나옵니다."
],
"Single-arm dumbbell overhead tricep extension": [
"한 손에 덤벨을 들고 등받이가 있는 벤치에 앉아, 팔이 완전히 펴질 때까지 덤벨을 머리 위로 밀어 올립니다.",
"팔꿈치를 구부려 덤벨을 머리 뒤로 내립니다 — 위팔은 머리 옆에서 수직을 유지합니다.",
"삼두근을 수축시켜 팔을 다시 위로 펴서 머리 위에서 완전히 곧게 만듭니다.",
"매 반복마다 완전히 제어하며 내립니다.",
"운동하는 팔의 팔꿈치가 앞으로 쏠리는 경향이 있다면 반대쪽 손으로 받쳐줍니다."
],
"Single-arm dumbbell row": [
"한 손과 같은 쪽 무릎을 플랫 벤치 위에 올리고, 반대쪽 손으로 덤벨을 들어 팔이 곧게 아래로 매달리게 합니다.",
"등을 평평하게 바닥과 평행으로 유지하고 코어를 조입니다 — 이것이 시작 자세입니다.",
"팔꿈치를 상체 뒤 위쪽으로 밀어 올리며 덤벨을 골반 쪽으로 당깁니다.",
"제어된 호를 그리며 팔이 완전히 펴질 때까지 덤벨을 다시 내립니다.",
"손이 아니라 팔꿈치가 동작을 이끌게 하세요 — 이렇게 하면 이두근이 아니라 광배근에 자극이 집중됩니다."
],
"Single-arm lat pulldown": [
"높은 도르래에 싱글 D 핸들을 연결하고, 허벅지를 패드 아래에 넣은 채 앉습니다.",
"한쪽 팔을 완전히 위로 뻗어 손잡이를 잡고, 어깨가 위로 스트레칭되게 합니다.",
"손잡이를 같은 쪽 어깨 쪽으로 당기며, 팔꿈치를 골반 방향으로 내립니다.",
"상체를 정면으로 고정하세요 — 비틀거나 기울여 반동을 주지 마세요.",
"제어하며 다시 완전히 위로 뻗은 스트레칭 자세로 돌아갑니다. 양팔 반복 횟수를 맞추세요."
],
"Single-arm tricep kickback": [
"한 손과 같은 쪽 무릎을 벤치에 올리고, 반대쪽 손으로 덤벨을 들어 위팔이 바닥과 평행하게 만듭니다.",
"코어를 조이고 등을 평평하게 유지합니다 — 위팔은 세트 내내 바닥과 평행하게 고정합니다.",
"팔꿈치를 펴서 팔뚝을 뒤로 뻗어 팔 전체가 바닥과 평행해질 때까지 폅니다.",
"제어된 동작으로 팔꿈치를 다시 90도로 구부립니다.",
"위팔이 떨어지거나 흔들려서는 안 됩니다 — 팔꿈치를 축으로 팔뚝만 움직입니다."
],
"Smith machine Romanian deadlift": [
"발을 바보다 약간 앞쪽에 두고, 바를 허벅지 중간 높이에 맞춘 후 어깨너비로 오버핸드 그립을 잡습니다.",
"바를 회전시켜 훅에서 풀고, 허벅지 앞에 바를 둔 채 곧게 섭니다.",
"엉덩이를 뒤로 밀며 힌지 동작을 하고, 바는 고정된 궤적을 따라 다리를 타고 내려갑니다.",
"햄스트링이 한계에 도달하면 멈추고, 엉덩이를 앞으로 밀어 다시 일어섭니다.",
"스미스 머신의 고정된 수직 궤적은 프리 바와 다릅니다 — 동작이 자연스럽게 느껴질 때까지 발 위치를 앞쪽으로 조정하세요."
],
"Smith machine bench press": [
"스미스 머신 안에 벤치를 플랫으로 설치하고, 누웠을 때 바가 팔이 닿는 위치에 오도록 맞춥니다.",
"등을 대고 누워 견갑골을 벤치 쪽으로 모아 내리고, 바를 어깨너비보다 약간 넓게 잡습니다.",
"바를 회전시켜 안전 훅에서 풀고, 팔을 편 채 가슴 중앙 위쪽에 위치시킵니다.",
"팔꿈치를 상체에서 대략 60~75도 각도로 유지하며 바를 제어된 궤적으로 가슴 중앙까지 내립니다.",
"팔이 완전히 펴질 때까지 바를 다시 밀어 올리고, 마지막 반복 후 회전시켜 훅에 걸어둡니다."
],
"Smith machine hip thrust": [
"벤치를 등 뒤에 두고 윗등을 기댄 채 앉고, 스미스 바를 골반 높이에 맞춘 후 패드를 사용합니다.",
"바를 회전시켜 훅에서 풀고, 발을 골반너비로 바닥에 평평하게 붙이며 무릎을 90도로 만듭니다.",
"발뒤꿈치로 밀고 둔근을 조이며 몸이 일직선이 될 때까지 엉덩이를 위로 밀어 올립니다.",
"엉덩이를 천천히 다시 내리고, 마지막 반복 후 바를 회전시켜 훅에 걸어둡니다.",
"혹시 실패했을 때 바를 받아줄 수 있도록 안전 훅 높이를 맞춰두세요."
],
"Smith machine inverted row": [
"스미스 바를 골반 높이나 그보다 낮게 맞추고, 발뒤꿈치를 바닥에 댄 채 몸을 곧게 펴고 바 아래에 눕습니다.",
"어깨너비로 오버핸드 그립을 잡습니다. 팔은 펴져 있고 몸은 플랭크처럼 일직선을 이룹니다.",
"견갑골을 모으고 팔꿈치를 뒤로 밀며 가슴을 바 쪽으로 끌어올립니다.",
"팔이 완전히 펴질 때까지 제어된 동작으로 몸을 내립니다.",
"엉덩이와 코어를 동작 내내 단단하게 유지하세요 — 몸 전체가 하나처럼 움직여야 합니다."
],
"Smith machine shoulder press": [
"스미스 머신 아래에 벤치를 90도로 세우고, 바를 턱 높이보다 살짝 위에 맞춥니다.",
"바를 어깨너비보다 약간 넓게 잡고, 회전시켜 훅에서 풉니다.",
"고정된 수직 궤적을 따라 팔이 완전히 펴질 때까지 바를 곧장 위로 밀어 올립니다.",
"제어하며 가슴 윗부분 높이까지 다시 내립니다.",
"마지막 반복 후 바를 회전시켜 훅에 다시 걸어둡니다."
],
"Smith machine shrug": [
"스미스 머신 안에 서서 허벅지 앞의 바를 어깨너비로 오버핸드 그립을 잡습니다.",
"바를 회전시켜 훅에서 풀고, 바가 허벅지 높이에 오도록 서서 팔을 곧게 폅니다.",
"어깨를 최대한 높이 귀 쪽으로 곧게 으쓱 올립니다.",
"제어하며 어깨를 천천히 다시 내립니다.",
"마지막 반복 후 바를 다시 걸어둡니다. 고정된 바 궤적 덕분에 무거운 무게로 슈러그를 해도 더 안전하고 안정적입니다."
],
"Smith machine squat": [
"바를 가슴 윗부분 높이에 맞추고, 발을 바보다 약간 앞쪽에 어깨너비로 벌려 발끝을 바깥으로 향하게 둡니다.",
"바 아래로 들어가 승모근 윗부분에 걸치고, 회전시켜 훅에서 풉니다.",
"무릎과 엉덩이를 동시에 구부리며 허벅지가 최소 바닥과 평행해질 때까지 앉습니다.",
"발뒤꿈치로 밀어 일어서고, 마지막 반복 후 바를 다시 걸어둡니다.",
"고정된 바 궤적이 낯설게 느껴질 수 있습니다 — 자신의 체형에 맞게 하강이 자연스러워질 때까지 발을 앞쪽으로 옮겨보세요."
],
"Smith machine standing calf raise": [
"스미스 머신 안 바닥에 스텝이나 원판을 놓고, 바를 승모근 윗부분에 걸친 후 훅에서 풉니다.",
"발볼만 스텝 끝에 올리고 발뒤꿈치는 늘어뜨립니다.",
"발뒤꿈치를 최대한 낮춰 완전히 스트레칭합니다.",
"발볼로 밀며 발뒤꿈치를 최대한 높이 들어 올립니다.",
"마지막 반복 후 바를 다시 걸어둡니다. 스미스 머신은 덤벨보다 무거운 무게를 다룰 수 있어 점진적 과부하에 유리합니다."
],
"Straight arm cable pulldown": [
"케이블 도르래를 가장 높은 위치에 맞추고, 바나 로프를 어깨너비로 오버핸드 그립으로 잡습니다.",
"뒤로 물러서서 상체를 살짝 앞으로 기울이고 팔을 머리 위로 편 채 시작합니다.",
"팔을 거의 곧게 펴고 팔꿈치만 살짝 구부린 채, 바가 허벅지에 닿을 때까지 넓은 호를 그리며 아래로 당깁니다.",
"천천히 반대로 호를 그리며, 팔이 다시 머리 위 시작 자세로 올라가게 합니다.",
"모든 움직임은 어깨 관절에서 나옵니다 — 팔꿈치는 동작 내내 고정됩니다. 이렇게 하면 광배근을 고립시켜 자극할 수 있습니다."
],
"T-bar row": [
"바 한쪽 끝을 랜드마인 피벗에 고정하고, 그 위에 다리를 벌려 서서 발을 단단히 딛습니다.",
"등을 평평하게 유지하며 약 45도로 힌지 자세를 잡고, V바 손잡이를 바 아래에 겁니다.",
"손잡이를 가슴 아랫부분까지 당기며 팔꿈치를 위와 뒤로 밀어냅니다.",
"정점에서 견갑골을 한 박자 모아 조입니다.",
"상체가 들리지 않도록 원판을 제어하며 내립니다. 세트 내내 힌지 각도를 고정하세요."
],
"Tricep dips": [
"평행봉을 잡고 뛰어 올라 팔을 완전히 편 상태로 몸을 봉 위에 지탱합니다.",
"상체를 곧게 세우고(앞으로 기울이면 가슴에 자극이 집중됨) 팔꿈치는 곧게 뒤를 향하게 합니다.",
"팔꿈치를 구부려 위팔이 최소 바닥과 평행해질 때까지 몸을 내립니다.",
"팔꿈치를 펴며 팔이 완전히 펴질 때까지 다시 밀어 올립니다.",
"맨몸 반복이 쉬워지면 무게(다리 사이 덤벨 또는 딥 벨트)를 추가합니다."
],
"Triceps pushdown": [
"케이블 도르래를 맨 위 위치에 맞추고, 스트레이트 바나 V바를 연결해 오버핸드로 잡습니다.",
"도르래에 가깝게 서서 팔꿈치를 몸통 옆에 대략 90도로 고정하고, 상체를 살짝 앞으로 기울입니다.",
"팔꿈치를 펴며 팔이 완전히 곧게 펴질 때까지 바를 아래로 밉니다.",
"팔꿈치가 다시 대략 90도로 돌아올 때까지 바를 제어하며 올라가게 합니다.",
"팔꿈치가 회전축이므로 몸통 옆에 고정되어야 합니다 — 앞이나 뒤로 움직이면 안 됩니다."
],
"Walking lunge": [
"양손에 덤벨을 하나씩 들고 몸통 옆에 둔 채 곧게 섭니다.",
"앞으로 내디뎌 런지 자세를 잡고, 앞쪽 허벅지가 평행해지고 뒤쪽 무릎이 바닥 바로 위에 뜰 때까지 내려갑니다.",
"앞발 뒤꿈치로 밀며 뒷다리를 앞으로 가져와 다음 걸음으로 이어갑니다.",
"반대쪽 다리를 앞세워 곧바로 다음 런지 자세로 착지합니다.",
"상체를 곧게 세우고 덤벨을 흔들림 없이 유지하며 다리를 계속 번갈아 갑니다."
],
"Wide-grip cable row": [
"낮은 케이블에 긴 스트레이트 바를 연결하고, 벤치에 앉아 발을 발판에 올린 후 바를 어깨너비보다 넓게 잡습니다.",
"상체를 곧게 세우고 팔을 도르래 쪽으로 편 채 시작합니다.",
"팔꿈치를 뒤와 옆으로 밀어내며 바를 가슴 아랫부분 쪽으로 당기고, 윗등과 후면 삼각근을 조입니다.",
"천천히 팔을 다시 시작 자세로 펴며 견갑골이 완전히 벌어지게 둡니다.",
"좁은 그립 로우와 비교하면, 와이드 그립과 벌어진 팔꿈치는 부하를 광배근에서 윗등과 후면 삼각근 쪽으로 옮겨줍니다."
],
"Decline barbell bench press": [
"디클라인 벤치에 등을 대고 누워 발목을 패드가 있는 롤러에 단단히 걸어 고정합니다.",
"어깨너비보다 살짝 넓게 바를 잡고 하부 가슴 위에서 랙아웃합니다.",
"바를 하부 가슴까지 컨트롤하며 내립니다. 팔꿈치는 몸통에 대해 약 45도를 유지합니다.",
"상부 등의 아치를 유지한 채 바를 팔이 완전히 펴질 때까지 밀어 올립니다.",
"디클라인 벤치는 플랫 벤치보다 실패 시 빠져나오기 어려우니 세트가 끝나면 신중하게 랙에 걸어둡니다."
],
"Barbell floor press": [
"로딩한 바벨을 들고 바닥에 등을 대고 누워 무릎을 굽히고 발을 평평하게 둡니다.",
"어깨너비보다 살짝 넓게 바를 잡고 가슴 위에서 팔을 펴서 구성합니다.",
"위팔과 삼두근이 바닥에 닿을 때까지 바를 내립니다.",
"삼두근으로 밀어낸다는 느낌으로 바를 팔이 완전히 펴질 때까지 밀어 올립니다.",
"바닥에서의 반동을 쓸 수 없으니 각 반복 전에 호흡을 가다듬고 코어를 조입니다."
],
"Barbell pullover": [
"플랫 벤치에 어깨와 상부 등만 올리고 엉덩이는 낮게 유지합니다.",
"바벨을 가슴 바로 위에서 팔을 곧게 펴 잡습니다.",
"팔꿈치를 살짝 굽힌 채 고정하고 스트레칭이 느껴질 때까지 머리 뒤로 호를 그리며 내립니다.",
"같은 호를 그리며 바를 가슴 위 시작 위치까지 끌어올립니다.",
"여분의 가동범위를 위해 허리가 젖혀지지 않게 코어를 조인 상태로 유지합니다."
],
"Incline dumbbell fly": [
"30~45도로 설정한 인클라인 벤치에 등을 대고 누워 양손에 덤벨을 듭니다.",
"팔꿈치를 살짝 굽히고 가슴 위에서 팔을 펴 손바닥을 마주보게 합니다.",
"상부 가슴에 스트레칭을 느낄 때까지 팔을 크게 호를 그리며 좌우로 벌립니다.",
"가슴을 정점에서 수축시키며 덤벨을 다시 모읍니다.",
"매 반복마다 같은 정도로 팔꿈치를 살짝 굽힌 상태를 유지합니다."
],
"Decline dumbbell fly": [
"디클라인 벤치에 등을 대고 누워 덤벨을 하부 가슴 위에서 구성합니다.",
"팔꿈치를 살짝 굽혀 고정하고 손바닥을 마주보게 합니다.",
"팔을 크게 호를 그리며 가슴 높이까지 좌우로 벌립니다.",
"정점에서 수축시키며 덤벨을 가슴 위에서 모읍니다.",
"보조자에게 덤벨을 안전하게 건네받아 세팅합니다."
],
"Dumbbell floor press": [
"양손에 덤벨을 들고 바닥에 등을 대고 누워 무릎을 굽히고 발을 평평하게 둡니다.",
"덤벨을 가슴까지 컬한 다음 머리 위로 밀어 올려 팔을 폅니다.",
"삼두근이 바닥에 닿을 때까지 덤벨을 컨트롤하며 내립니다.",
"손목을 팔꿈치 바로 위에 유지하며 팔이 완전히 펴질 때까지 밀어 올립니다.",
"세트를 마치면 덤벨을 가슴까지 내린 후 안전하게 내려놓습니다."
],
"Neutral-grip dumbbell press": [
"플랫 벤치에 누워 양손에 덤벨을 들고 손바닥을 마주보게 합니다.",
"덤벨을 가슴 높이에서 구성하고 팔꿈치를 굽힙니다.",
"손바닥을 계속 마주본 채로 덤벨을 곧장 밀어 올립니다.",
"정점에서 덤벨을 닿지 않을 정도로 가깝게 모읍니다.",
"컨트롤하며 가슴 높이까지 내리고 반복합니다."
],
"Smith machine incline press": [
"스미스 머신 바 아래에 인클라인 벤치를 설치합니다.",
"등을 대고 누워 어깨너비보다 살짝 넓게 바를 잡고 돌려서 언랙합니다.",
"바를 상부 가슴까지 컨트롤하며 내립니다.",
"머신의 고정된 궤도를 따라 바가 완전히 펴질 때까지 밀어 올립니다.",
"세트를 마치면 바를 돌려 확실하게 랙에 걸어둡니다."
],
"Machine-assisted dip": [
"머신 스택에서 보조 중량을 설정합니다. 중량이 많을수록 보조가 강해집니다.",
"플랫폼에 무릎을 대거나 서서 평행한 딥 핸들을 잡습니다.",
"팔꿈치를 굽혀 위팔이 바닥과 거의 평행해질 때까지 몸을 내립니다.",
"과하게 락아웃하지 않으면서 팔이 완전히 펴질 때까지 밀어 올립니다.",
"강해지면 보조 중량을 줄여 자기 체중이 더 많이 작용하게 합니다."
],
"Cable crossover": [
"듀얼 도르래 케이블 스테이션에서 양쪽 도르래를 높게 설정하고 각 손에 핸들을 잡습니다.",
"타워 중앙에 서서 살짝 앞으로 기울고 팔을 좌우로 뻗습니다.",
"손을 아래로 안쪽으로 호를 그리며 움직여 엉덩이 앞에서 교차시킵니다.",
"가슴을 정점에서 수축시킵니다.",
"시작 위치까지 컨트롤하며 돌아와 반복합니다."
],
"Cable low-to-high fly": [
"듀얼 도르래 케이블 스테이션에서 양쪽 도르래를 낮게 설정하고 각 손에 핸들을 잡습니다.",
"타워 중앙에 서서 팔을 아래로 바깥으로 구성합니다.",
"팔을 위로 안쪽으로 휘둘러 손을 가슴 높이 위에서 모읍니다.",
"정점에서 가슴을 수축시킨 후 컨트롤하며 내립니다.",
"동작 내내 팔꿈치를 살짝 굽힌 채 고정하고 반복합니다."
],
"Decline push-ups": [
"튼튼한 박스나 벤치에 발을 올리고 손은 어깨 아래 바닥에 놓습니다.",
"머리부터 발끝까지 몸을 일직선으로 세팅합니다.",
"팔꿈치를 약 45도로 유지하며 가슴을 바닥 쪽으로 내립니다.",
"팔이 완전히 펴질 때까지 밀어 올립니다. 엉덩이가 처지거나 솟지 않게 합니다.",
"세트 내내 코어를 조인 채 반복합니다."
],
"Wide-grip push-ups": [
"어깨너비보다 확실히 넓게 손을 바닥에 놓습니다.",
"머리부터 발끝까지 몸을 일직선으로 세팅합니다.",
"팔꿈치를 바깥으로 벌리며 가슴을 바닥 쪽으로 내립니다.",
"팔이 완전히 펴질 때까지 밀어 올립니다.",
"엉덩이가 처지지 않도록 코어를 조인 채 반복합니다."
],
"Pendlay row": [
"바닥에 바벨을 두고 고관절에서 앞으로 숙여 몸을 바닥과 거의 평행하게 합니다.",
"어깨너비보다 살짝 넓게 바를 잡고 팔을 곧장 아래로 폅니다.",
"바를 폭발적으로 하부 가슴까지 당겨 올리며 팔꿈치를 위로 뒤로 움직입니다.",
"바를 바닥까지 완전히 내려 멈춥니다.",
"매 반복마다 자세를 리셋하며 동작 내내 등을 평평하게 유지합니다."
],
"Rack pull": [
"스쿼트 랙의 세이프티 핀을 무릎 높이 정도로 설정하고 바벨을 로딩합니다.",
"바 앞에 발을 골반너비로 서서 앞으로 숙여 정강이 바로 바깥에서 바를 잡습니다.",
"코어를 조이고 고관절과 무릎을 함께 펴서 바를 당겨 올립니다.",
"완전히 곧게 서서 뒤로 젖히지 말고 엉덩이를 조여 정점을 마무리합니다.",
"바를 컨트롤하며 핀까지 내리고 다음 반복을 준비합니다."
],
"Yates row": [
"바벨 앞에 서서 약 45도 앞으로 숙입니다.",
"어깨너비 정도의 언더핸드 그립으로 바를 잡습니다.",
"바를 하부 갈비뼈/허리 부위까지 당겨 올리며 팔꿈치를 아래로 뒤로 움직입니다.",
"컨트롤하며 바를 시작 위치까지 내립니다.",
"세트 내내 같은 45도 상체 각도를 유지합니다."
],
"Chest-supported dumbbell row": [
"인클라인 벤치를 낮은 각도로 설정하고 가슴을 패드에 댄 채 엎드립니다.",
"각 손에 덤벨을 들고 팔을 완전히 펴서 늘어뜨립니다.",
"덤벨을 엉덩이 쪽으로 당겨 올리며 팔꿈치를 뒤로 움직입니다.",
"정점에서 견갑골을 모읍니다.",
"컨트롤하며 완전한 스트레칭까지 내리고 반복합니다."
],
"Incline dumbbell row": [
"벤치를 급한 인클라인으로 설정하고 가슴을 지지한 채 엎드립니다.",
"각 손에 덤벨을 들고 팔을 완전히 펴서 늘어뜨립니다.",
"팔꿈치를 몸에 붙인 채 덤벨을 엉덩이 쪽으로 당겨 올립니다.",
"정점에서 견갑골을 모읍니다.",
"컨트롤하며 완전한 스트레칭까지 되돌리고 반복합니다."
],
"Kroc row": [
"한쪽 무릎과 손을 플랫 벤치에 대고 몸을 바닥과 거의 평행하게 합니다.",
"자유로운 손에 무거운 덤벨을 들고 팔을 곧장 아래로 늘어뜨립니다.",
"약간의 고관절·상체 회전을 허용하며 덤벨을 힘차게 엉덩이 쪽으로 당겨 올립니다.",
"컨트롤하며 완전한 스트레칭까지 내립니다.",
"한쪽의 모든 반복을 마친 후 반대쪽으로 바꿉니다."
],
"Machine high row": [
"머신에 앉아 핸들이 상부 가슴 높이에 맞도록 시트를 조절합니다.",
"가슴을 패드에 대고 팔을 앞으로 뻗어 핸들을 잡습니다.",
"핸들을 상부 가슴 쪽으로 뒤로 아래로 당기며 팔꿈치를 위로 바깥으로 움직입니다.",
"동작의 끝에서 견갑골을 모읍니다.",
"컨트롤하며 시작 위치로 돌아와 반복합니다."
],
"Machine pullover": [
"머신에 앉아 어깨가 머신의 회전축에 맞도록 시트를 조절합니다.",
"팔을 올려 팔꿈치를 살짝 굽힌 채 오버헤드 레버 바를 잡습니다.",
"광배근을 사용해 레버를 호를 그리며 아래로 앞으로 움직입니다.",
"레버가 가슴이나 배 정도 높이에 이를 때까지 계속합니다.",
"오버헤드 시작 위치까지 컨트롤하며 돌아와 반복합니다."
],
"Cable pullover": [
"케이블 스테이션에서 도르래를 높게 설정하고 스트레이트 바를 부착합니다.",
"타워를 등지고 서거나 무릎을 꿇고 팔을 머리 위로 뻗습니다.",
"팔꿈치를 살짝 굽힌 채 바를 허벅지 정도 높이까지 호를 그리며 아래로 앞으로 당깁니다.",
"동작의 바닥에서 광배근을 수축시킵니다.",
"오버헤드 시작 위치까지 컨트롤하며 돌아와 반복합니다."
],
"Inverted row": [
"랙에 바를 허리 정도 높이로 설정합니다.",
"그 아래 누워 팔을 뻗어 바를 잡고 몸을 일직선으로, 뒤꿈치를 바닥에 둡니다.",
"팔꿈치를 뒤로 움직이며 가슴을 바 쪽으로 끌어올립니다.",
"컨트롤하며 팔이 완전히 펴질 때까지 내립니다.",
"세트 내내 몸을 머리부터 발끝까지 단단히 일직선으로 유지합니다."
],
"Superman": [
"바닥에 엎드려 팔을 앞쪽 머리 위로 뻗고 다리를 곧게 폅니다.",
"팔·가슴·다리를 동시에 바닥에서 들어 올립니다.",
"정점에서 잠시 멈춰 엉덩이와 허리를 조입니다.",
"컨트롤하며 시작 위치까지 내립니다.",
"평소대로 호흡하며 반복합니다."
],
"Scapular pull-ups": [
"팔을 완전히 편 채 풀업 바에 매달립니다.",
"팔꿈치를 굽히지 않은 채 견갑골을 아래로 안쪽으로 모읍니다.",
"견갑골이 모이면서 몸이 몇 센티미터 올라가게 합니다.",
"잠시 멈춘 후 편안하게 매달린 상태로 돌아갑니다.",
"동작 내내 팔꿈치를 거의 곧게 유지하며 반복합니다."
],
"Landmine press": [
"바벨을 랜드마인 어태치먼트나 튼튼한 구석에 고정하고 빈 끝에 원판을 로딩합니다.",
"앞뒤로 벌린 스탠스로 서서 양손으로 어깨 높이의 끝을 잡습니다.",
"바를 자연스러운 회전 호를 따라 앞으로 위로 밀어냅니다.",
"팔이 앞으로 위로 완전히 뻗을 때까지 계속합니다.",
"컨트롤하며 어깨 높이까지 내리고 반복합니다."
],
"Barbell seated shoulder press": [
"벤치에 곧게 앉아 바벨을 상부 가슴 높이에서 양손으로 잡습니다. 손은 어깨너비보다 살짝 넓게.",
"다리 힘이 없는 만큼 코어를 조여 몸을 안정시킵니다.",
"팔이 머리 위로 완전히 펴질 때까지 바를 곧장 밀어 올립니다.",
"컨트롤하며 바를 상부 가슴까지 내립니다.",
"상체를 곧게 유지한 채 반복합니다."
],
"Dumbbell scaption raise": [
"각 손에 가벼운 덤벨을 들고 섭니다.",
"엄지를 리드로 몸의 약 30도 앞쪽 대각선으로 덤벨을 올립니다.",
"팔이 어깨 높이에 이를 때까지 올립니다.",
"컨트롤하며 시작 위치까지 내립니다.",
"동작 내내 팔꿈치를 살짝 굽힌 채 반복합니다."
],
"Cable Y-raise": [
"듀얼 도르래 케이블 스테이션에서 양쪽 도르래를 낮게 설정하고 케이블을 등 뒤에서 교차시킵니다.",
"각 손에 핸들을 들고 팔을 아래로, 엉덩이 앞에서 살짝 교차시켜 구성합니다.",
"팔을 위로 바깥으로 올려 머리 위에 넓은 'Y' 모양을 만듭니다.",
"컨트롤하며 시작 위치까지 내립니다.",
"가벼운 중량으로 동작 내내 팔꿈치를 살짝 굽힌 채 반복합니다."
],
"Cable front raise": [
"케이블 스테이션에서 도르래를 낮게 설정하고 타워를 등지고 섭니다.",
"핸들이나 로프를 잡고 팔을 허벅지 앞에 늘어뜨립니다.",
"팔을 곧장 어깨 높이까지 앞으로 올립니다.",
"컨트롤하며 시작 위치까지 내립니다.",
"한쪽씩 또는 양팔 동시에, 상체를 정지시킨 채 반복합니다."
],
"Plate-loaded shoulder press": [
"머신에 앉아 핸들이 어깨 높이에서 시작하도록 시트를 조절합니다.",
"등을 패드에 대고 핸들을 잡습니다.",
"머신의 고정된 궤도를 따라 팔이 펴질 때까지 핸들을 밀어 올립니다.",
"컨트롤하며 어깨 높이까지 내립니다.",
"동작 내내 등을 패드에 댄 채 반복합니다."
],
"Drag curl": [
"바벨을 언더핸드 그립으로 잡고 허벅지에서 팔을 편 채 섭니다.",
"바가 몸을 따라 끌리듯 올라가게 컬합니다.",
"바가 올라가면서 팔꿈치를 상체 뒤쪽으로 움직입니다.",
"이두근이 가슴 근처에서 완전히 수축될 때까지 컬합니다.",
"같은 경로로 컨트롤하며 바를 내립니다."
],
"21s barbell curl": [
"바벨을 언더핸드 그립으로 허벅지에서 잡습니다.",
"완전히 편 상태에서 팔꿈치 90도까지의 하단 부분 컬을 7회 합니다.",
"팔꿈치 90도에서 완전 수축까지의 상단 부분 컬을 7회 합니다.",
"완전히 편 상태에서 완전 수축까지의 전체 범위 컬 7회로 마무리합니다.",
"세 구간 내내 팔꿈치를 옆구리에 고정한 채 진행합니다."
],
"Wide-grip barbell curl": [
"어깨너비보다 확실히 넓게 바벨을 잡고 섭니다.",
"팔꿈치를 옆구리에 붙이고 팔을 편 상태로 시작합니다.",
"바를 어깨 쪽으로 컬합니다.",
"정점에서 이두근을 수축시킨 후 컨트롤하며 내립니다.",
"팔꿈치가 앞으로 흘러나오지 않게 하며 반복합니다."
],
"Zottman curl": [
"각 손에 덤벨을 들고 손바닥을 앞으로 향한 채 섭니다.",
"일반적인 언더핸드 그립으로 덤벨을 어깨 높이까지 컬합니다.",
"정점에서 손목을 회전시켜 손바닥을 아래로 향하게 합니다.",
"이 반전된 그립인 채로 천천히 덤벨을 내립니다.",
"바닥에서 손목을 다시 위로 회전시켜 반복합니다."
],
"Spider curl": [
"급경사 인클라인 벤치에 엎드려 팔을 자유롭게 늘어뜨립니다.",
"각 손에 덤벨을 들고 팔을 완전히 폅니다.",
"위팔을 벤치 패드에 고정한 채 덤벨을 컬합니다.",
"정점에서 이두근을 수축시킵니다.",
"천천히 완전히 시작 위치까지 내립니다."
],
"Cross-body hammer curl": [
"각 손에 덤벨을 들고 뉴트럴 그립으로 허벅지 옆에 섭니다.",
"한쪽 덤벨을 대각선으로 몸을 가로질러 반대쪽 어깨 쪽으로 컬합니다.",
"정점에서 이두근을 수축시킨 후 같은 대각선 경로로 내립니다.",
"같은 팔로 모든 반복을 하거나 양팔을 번갈아 합니다.",
"각 반복에서 팔꿈치를 몸통 옆에 비교적 고정한 채 진행합니다."
],
"Plate-loaded machine bicep curl": [
"머신에 앉아 위팔을 각도가 있는 패드에 올립니다.",
"팔을 편 상태로 핸들을 잡습니다.",
"위팔을 패드에 올린 채 전완으로만 핸들을 컬합니다.",
"정점에서 이두근을 수축시킨 후 컨트롤하며 내립니다.",
"팔꿈치가 머신의 회전축에 맞도록 시트를 조절하며 반복합니다."
],
"Cable spider curl": [
"도르래를 낮게 설정하고 타워를 향해 급경사 인클라인 벤치에 엎드립니다.",
"부착된 바를 잡고 팔을 늘어뜨리며 위팔을 벤치 패드에 붙입니다.",
"위팔을 패드에 고정한 채 바를 완전 수축까지 컬합니다.",
"컨트롤하며 완전 스트레칭까지 내립니다.",
"일정한 케이블 장력을 고려해 생각보다 가벼운 중량으로 반복합니다."
],
"Dumbbell close-grip floor press": [
"각 손에 덤벨을 들고 바닥에 등을 대고 누워 가슴 위에서 가깝게 구성합니다.",
"팔꿈치를 갈비뼈에 붙인 채 내립니다.",
"삼두근이 바닥에 닿을 때까지 내립니다.",
"정점에서 덤벨을 살짝 안쪽으로 모으며 밀어 올립니다.",
"손목을 팔꿈치 바로 위에 유지한 채 반복합니다."
],
"Seated machine tricep extension": [
"머신에 앉아 위팔이 패드로 고정되도록 시트를 조절합니다.",
"팔을 굽힌 채 핸들을 잡습니다.",
"정점에서 삼두근을 수축시키며 팔을 완전히 폅니다.",
"컨트롤하며 굽힌 시작 위치로 되돌립니다.",
"동작 내내 위팔을 고정한 채 반복합니다."
],
"Bench dips": [
"벤치 가장자리에 앉아 엉덩이 바로 뒤에서 손을 잡습니다.",
"발을 앞으로 내밀고 엉덩이를 벤치에서 들어 올려 팔로 체중을 지탱합니다.",
"팔꿈치가 거의 90도가 될 때까지 몸을 곧장 내립니다.",
"팔이 완전히 펴질 때까지 밀어 올립니다.",
"팔꿈치를 뒤로 향하게, 바깥으로 벌리지 않으며 반복합니다."
],
"Close-grip push-ups": [
"가슴 아래에 손을 가깝게 놓고 바닥에 놓습니다.",
"머리부터 발끝까지 몸을 일직선으로 세팅합니다.",
"팔꿈치를 갈비뼈에 붙인 채 가슴을 손 쪽으로 내립니다.",
"팔이 완전히 펴질 때까지 밀어 올립니다.",
"손목을 곧게 유지한 채 반복합니다."
],
"Barbell reverse curl": [
"바벨을 오버핸드 그립으로 잡고 허벅지에서 팔을 편 채 섭니다.",
"팔꿈치를 몸통 옆에 고정한 채 바를 어깨 쪽으로 컬합니다.",
"정점에서 수축시킨 후 컨트롤하며 내립니다.",
"동작 내내 손목을 단단하고 곧게 유지한 채 반복합니다.",
"이 그립은 확연히 약하니 일반 컬보다 가벼운 중량을 사용합니다."
],
"Dumbbell finger curl": [
"앉아서 전완을 허벅지에 얹고 손목을 무릎 너머로 살짝 늘어뜨립니다.",
"손가락을 펴서 덤벨을 느슨하게 쥐고 손가락 끝 쪽으로 굴러 내려가게 합니다.",
"손가락을 오므려 핸들을 쥡니다.",
"컨트롤하며 손가락을 펴고 덤벨을 굴려 내립니다.",
"손목을 움직이지 않은 채 반복합니다."
],
"Cable wrist curl": [
"도르래를 낮게 설정하고 스트레이트 바를 부착합니다.",
"앉아서 전완을 허벅지에 얹고 손목을 무릎 너머로 살짝 늘어뜨리며 손바닥을 위로 향해 바를 잡습니다.",
"손목을 편안한 범위까지 위로 컬합니다.",
"컨트롤하며 완전한 스트레칭까지 내립니다.",
"전완을 허벅지에 고정한 채 반복합니다."
],
"Cable reverse wrist curl": [
"도르래를 낮게 설정하고 스트레이트 바를 부착합니다.",
"앉아서 전완을 허벅지에 얹고 손목을 무릎 너머로 살짝 늘어뜨리며 손바닥을 아래로 향해 바를 잡습니다.",
"손목을 위로 신전시켜 손등을 들어 올립니다.",
"컨트롤하며 완전한 스트레칭까지 내립니다.",
"전완을 정지시킨 채 반복합니다."
],
"Bench-supported seated reverse fly": [
"세운 인클라인 벤치 패드를 마주 보고 앉아 가슴을 밀착합니다.",
"각 손에 덤벨을 들고 팔을 펴서 늘어뜨립니다.",
"팔꿈치를 살짝 굽힌 채 팔을 좌우로 올려 견갑골을 모읍니다.",
"컨트롤하며 시작 위치까지 내립니다.",
"동작 내내 가슴을 패드에 밀착한 채 반복합니다."
],
"Prone dumbbell Y-raise": [
"인클라인 벤치에 엎드려 각 손에 가벼운 덤벨을 듭니다.",
"팔을 곧장 아래, 살짝 앞으로 늘어뜨립니다.",
"엄지를 리드로 팔을 위로 바깥으로 올려 'Y' 모양을 만듭니다.",
"컨트롤하며 시작 위치까지 내립니다.",
"가벼운 중량으로, 이건 근력 종목이 아니라 컨트롤 종목임을 의식하며 반복합니다."
],
"Cable reverse fly": [
"듀얼 도르래 케이블 스테이션에서 양쪽 도르래를 어깨 높이로 설정합니다.",
"타워 중앙에 서서 몸 앞에서 팔을 교차시켜 반대쪽 핸들을 잡습니다.",
"팔을 바깥으로 뒤로 휘두르며 견갑골을 모읍니다.",
"교차된 시작 위치까지 컨트롤하며 돌아갑니다.",
"동작 내내 팔꿈치를 살짝 굽힌 채 반복합니다."
],
"Cross-cable reverse fly": [
"듀얼 도르래 케이블 스테이션에서 양쪽 도르래를 어깨 높이로 설정합니다.",
"타워 사이에 서서 고관절에서 약 45도 앞으로 숙입니다.",
"몸 앞에서 교차시켜 반대쪽 핸들을 잡습니다.",
"팔을 바깥으로 뒤로 휘두르며 견갑골을 모읍니다.",
"상체를 숙인 채 교차된 시작 위치까지 컨트롤하며 돌아갑니다."
],
"Barbell high pull": [
"바벨을 허벅지에서 들고 무릎을 살짝 풀며 고관절을 살짝 숙입니다.",
"바를 몸에 가깝게 당겨 올리며 팔꿈치가 손보다 먼저 올라가게 리드합니다.",
"바가 가슴/쇄골 높이에 이르면서 발끝으로 섭니다.",
"컨트롤하며 바를 허벅지까지 내립니다.",
"동작 내내 바를 상체에 가깝게 유지한 채 반복합니다."
],
"Dumbbell high pull": [
"각 손에 덤벨을 들고 무릎을 살짝 풀며 허벅지에서 섭니다.",
"덤벨을 몸에 가깝게 당겨 올리며 팔꿈치가 손보다 먼저 올라가게 리드합니다.",
"덤벨이 가슴 높이에 이르면서 발끝으로 섭니다.",
"컨트롤하며 허벅지까지 내립니다.",
"동작 내내 덤벨을 상체에 가깝게 유지한 채 반복합니다."
],
"Cable shrug": [
"도르래를 낮게 설정하고 스트레이트 바나 핸들을 부착합니다.",
"타워를 마주보고 서서 팔을 펴 핸들을 잡습니다.",
"어깨를 귀 쪽으로 곧장 으쓱합니다.",
"정점에서 잠시 멈춘 후 컨트롤하며 내립니다.",
"동작 내내 팔을 잠근 채 반복합니다."
],
"Plate-loaded shrug": [
"머신 프레임 안에 서서 사이드 핸들을 잡습니다.",
"동작 내내 팔을 곧게 유지합니다.",
"머신의 로딩된 암과 함께 곧장 어깨를 으쓱합니다.",
"정점에서 잠시 멈춘 후 컨트롤하며 내립니다.",
"머리를 중립으로 유지한 채 반복합니다."
],
"Barbell walking lunge": [
"바벨을 상부 등에 얹고 곧게 섭니다.",
"앞으로 걸음을 내딛으며 뒤쪽 무릎을 바닥에 닿지 않을 정도로 내립니다.",
"앞발 뒤꿈치로 밀어 일어서며 반대쪽 다리로 곧바로 다음 런지를 내딛습니다.",
"다리를 번갈아 바꾸며 앞으로 걷듯 계속합니다.",
"균형을 위해 동작 내내 상체를 곧게 유지합니다."
],
"Barbell step-up": [
"바벨을 상부 등에 얹고 튼튼한 박스 앞에 섭니다.",
"한쪽 발을 박스 위에 평평하게 올립니다.",
"그 발의 뒤꿈치로 밀어 몸을 박스 위로 끌어올립니다.",
"양발을 박스 위에 나란히 하며 완전히 곧게 섭니다.",
"컨트롤하며 내려오고 다리를 번갈아 하거나 한쪽을 먼저 마친 후 반복합니다."
],
"Box squat": [
"바벨을 상부 등에 얹고 박스를 스쿼트 깊이에 맞춰 바로 뒤에 둡니다.",
"엉덩이를 박스 쪽으로 뒤로 밀며 내려갑니다.",
"박스에 살짝 앉아 바닥에서 뒤로 젖히지 않고 고관절을 이완합니다.",
"컨트롤하며 다시 일어섭니다.",
"박스 위 정지 중 코어를 조인 채 반복합니다."
],
"Dumbbell front squat": [
"덤벨을 각 어깨에 세로로 들고 팔꿈치를 앞으로 위로 향합니다.",
"발을 어깨너비로 벌려 섭니다.",
"상체를 곧게 유지하며 무릎을 발끝 방향으로 향하게 하고 내려갑니다.",
"허벅지가 평행이나 그 아래에 이를 때까지 내려갑니다.",
"덤벨을 어깨에 얹은 채 다시 일어섭니다."
],
"Dumbbell reverse lunge": [
"각 손에 덤벨을 들고 곧게 섭니다.",
"한쪽 다리를 뒤로 내딛으며 뒤쪽 무릎을 바닥 쪽으로 내립니다.",
"내딛는 동안 체중 대부분을 앞다리에 유지합니다.",
"앞발로 밀어 다시 섭니다.",
"다리를 번갈아 하거나 한쪽을 마친 후 바꿔 반복합니다."
],
"Heel-elevated dumbbell squat": [
"작은 웨지나 원판을 뒤꿈치 아래에 놓습니다.",
"일반 스쿼트보다 발을 가깝게 하고 각 손에 덤벨을 듭니다.",
"상체를 높이 유지하며 무릎을 앞으로 움직이며 내려갑니다.",
"허벅지가 평행이나 그 아래에 이를 때까지 내려갑니다.",
"발 전체로 밀어 다시 섭니다."
],
"Belt squat": [
"머신의 로딩된 기구에 힙 벨트를 채우고 높은 플랫폼에 섭니다.",
"손은 자유롭게 하거나 사이드 레일에 가볍게 얹습니다.",
"상체를 곧게 유지한 채 내려가며 부하가 다리 사이를 지나가게 합니다.",
"편안한 깊이까지 내려갑니다.",
"발 전체로 밀어 다시 섭니다."
],
"Pendulum squat": [
"머신의 각도가 있는 어깨 패드 아래에 몸을 위치시키고 발을 플랫폼에 올립니다.",
"동작 내내 등을 패드에 붙입니다.",
"슬라이드가 회전하는 호를 따라 내려갑니다.",
"편안한 깊이까지 내려가며 늘어나는 저항을 컨트롤합니다.",
"발 전체로 밀어 호를 완성하며 다시 섭니다."
],
"Vertical leg press": [
"머신에 등을 대고 누워 무릎을 가슴 쪽으로 당기고 발을 머리 위 플랫폼에 올립니다.",
"사이드 핸들을 잡아 안정시킵니다.",
"무릎이 완전히 락되기 직전까지 플랫폼을 곧장 밀어 올려 다리를 폅니다.",
"컨트롤하며 플랫폼을 완전한 범위로 내립니다.",
"동작 내내 허리를 패드에 누른 채 반복합니다."
],
"Bodyweight squat": [
"어깨너비로 발을 벌리고 팔을 앞으로 뻗으며 섭니다.",
"가슴을 세우고 뒤꿈치를 바닥에 붙인 채 엉덩이를 뒤로 아래로 앉힙니다.",
"편안하게 가동성이 허락하는 만큼 깊게 내려갑니다.",
"발 전체로 바닥을 밀어내며 다시 섭니다.",
"동작 내내 팔을 앞으로 뻗어 균형을 잡으며 반복합니다."
],
"Jump squat": [
"어깨너비로 발을 벌리고 팔을 뒤로 휘두르며 쿼터 스쿼트로 내려갑니다.",
"팔을 앞으로 위로 휘두르며 최대한 강하게 위로 폭발적으로 뜁니다.",
"점프의 정점에서 양발이 바닥에서 떨어지게 합니다.",
"무릎을 굽혀 충격을 흡수하며 부드럽게 착지합니다.",
"쿼터 스쿼트 자세로 돌아가 반복합니다."
],
"Wall sit": [
"벽에 등을 대고 서서 허벅지가 바닥과 거의 평행해질 때까지 미끄러져 내려갑니다.",
"무릎을 발끝 앞으로 밀지 말고 발목 바로 위에 유지합니다.",
"등을 벽에 밀착한 채 자세를 유지합니다.",
"유지하는 내내 평소대로 호흡합니다.",
"목표 시간에 도달하면 벽을 타고 미끄러져 올라와 섭니다."
],
"Barbell good morning": [
"바벨을 상부 등에 얹고 곧게 섭니다.",
"무릎을 부드럽게 고정한 채 고관절에서 힌지합니다.",
"등을 평평하게 유지하며 상체가 바닥과 거의 평행해질 때까지 내려갑니다.",
"고관절을 앞으로 밀어 다시 섭니다.",
"아주 가벼운 중량으로 시작해 반복합니다."
],
"Sumo deadlift": [
"발끝을 바깥으로 향한 넓은 스탠스로 바벨 위에 섭니다.",
"무릎 안쪽에서 바를 잡고 엉덩이를 낮게, 가슴을 세웁니다.",
"바닥을 밀며 바가 올라가는 동안 고관절과 무릎을 함께 폅니다.",
"정점에서 엉덩이를 조인 채 완전히 곧게 섭니다.",
"컨트롤하며 바를 바닥까지 내리고 다음 반복을 준비합니다."
],
"Stiff-leg deadlift": [
"바벨을 허벅지에서 들고 다리를 거의 완전히 편 채 섭니다.",
"고관절에서 앞으로 숙이며 바를 다리에 가깝게 내립니다.",
"햄스트링에 강한 스트레칭이 느껴질 때까지 내립니다.",
"고관절을 앞으로 밀어 다시 섭니다.",
"동작 내내 등을 평평하게, 무릎을 거의 곧게 유지하며 반복합니다."
],
"Single-leg dumbbell RDL": [
"한 다리로 곧게 서서 각 손에 덤벨을 듭니다.",
"고관절에서 앞으로 숙이며 자유로운 다리를 곧장 뒤로 뻗습니다.",
"상체가 바닥과 거의 평행해지고 자유로운 다리와 'T'자 모양이 될 때까지 내립니다.",
"고관절을 앞으로 밀어 다시 서며 자유로운 다리를 내립니다.",
"한쪽 다리로 모든 반복을 마친 후 반대쪽으로 바꿉니다."
],
"Dumbbell sumo deadlift": [
"발끝을 바깥으로 향한 넓은 스탠스로 단일 덤벨 위에 섭니다.",
"다리 사이에서 덤벨 윗부분을 양손으로 잡습니다.",
"바닥을 밀며 일어서는 동안 고관절과 무릎을 함께 폅니다.",
"정점에서 엉덩이를 조인 채 완전히 곧게 섭니다.",
"컨트롤하며 덤벨을 바닥까지 내리고 리셋합니다."
],
"Standing machine hamstring curl": [
"머신에 서서 가슴 패드에 기대어 지지합니다.",
"한쪽 발목을 패드가 있는 롤러 뒤에 고정하고 다리를 곧장 아래로 폅니다.",
"뒤꿈치를 엉덩이 쪽으로 컬합니다.",
"정점에서 수축시킨 후 컨트롤하며 내립니다.",
"한쪽 다리로 모든 반복을 마친 후 반대쪽으로 바꿉니다."
],
"Cable pull-through": [
"도르래를 낮게 설정하고 로프를 부착한 후 타워를 등지고 로프를 다리 사이에 걸칩니다.",
"고관절에서 앞으로 숙이며 로프가 손을 다리 사이 뒤쪽으로 당기게 합니다.",
"동작 내내 등을 평평하게, 무릎을 부드럽게 굽힌 채 유지합니다.",
"고관절을 힘차게 앞으로 밀어 일어서며 정점에서 엉덩이를 조입니다.",
"로프가 스윙하는 동안 몸에 가깝게 유지하며 반복합니다."
],
"B-stance barbell hip thrust": [
"상부 등을 벤치에 대고 바벨을 엉덩이에 얹습니다.",
"발을 앞뒤로 벌려 체중 대부분을 한쪽 발에 둡니다.",
"일하는 다리로 고관절을 완전히 신전시켜 그쪽 엉덩이를 조입니다.",
"엉덩이를 완전히 떨어뜨리지 말고 컨트롤하며 내립니다.",
"한쪽의 모든 반복을 마친 후 발을 바꿉니다."
],
"Barbell glute bridge": [
"바닥에 등을 대고 누워 바벨을 엉덩이에 얹고 무릎을 굽힙니다.",
"발을 어깨너비로 바닥에 평평하게 둡니다.",
"엉덩이를 곧장 위로 밀어 올려 정점에서 조입니다.",
"컨트롤하며 시작 위치까지 내립니다.",
"동작 내내 상부 등과 머리를 바닥에 붙인 채 반복합니다."
],
"Curtsy lunge": [
"각 손에 덤벨을 들고 곧게 섭니다.",
"한쪽 다리를 대각선 뒤로, 반대쪽 다리 뒤로 교차시켜 내딛습니다.",
"체중 대부분을 앞다리에 유지하며 뒤쪽 무릎이 바닥 근처가 될 때까지 내립니다.",
"앞발 뒤꿈치로 밀어 다시 섭니다.",
"다리를 번갈아 하거나 한쪽을 마친 후 바꿔 반복합니다."
],
"Dumbbell single-leg hip thrust": [
"상부 등을 벤치에 대고 단일 덤벨을 엉덩이에 얹습니다.",
"한쪽 발을 바닥에 평평하게 두고 다른 다리를 곧장 앞으로 뻗습니다.",
"지지하는 발로 고관절을 완전히 신전시키며 자유로운 다리를 곧게 유지합니다.",
"엉덩이를 완전히 떨어뜨리지 말고 컨트롤하며 내립니다.",
"한쪽의 모든 반복을 마친 후 다리를 바꿉니다."
],
"45-degree hip extension machine": [
"엉덩이를 각도가 있는 패드의 윗부분에 두고 발목을 롤러 아래에 고정합니다.",
"가슴 앞에 팔을 모으거나 부하를 위해 원판을 듭니다.",
"등을 평평하게 유지하며 햄스트링에 스트레칭을 느낄 때까지 아래로 힌지합니다.",
"어깨부터 발목까지 몸이 일직선이 될 때까지 일어납니다.",
"각 반복의 정점에서 엉덩이를 조이며 반복합니다."
],
"Standing plate-loaded glute kickback": [
"머신에 서서 프레임으로 몸을 지지합니다.",
"한쪽 발을 로딩된 플랫폼에 올립니다.",
"일하는 다리를 곧장 뒤로 위로 움직입니다.",
"정점에서 엉덩이를 조인 후 컨트롤하며 내립니다.",
"한쪽 다리로 모든 반복을 마친 후 반대쪽으로 바꿉니다."
],
"Single-leg glute bridge": [
"등을 대고 누워 한쪽 무릎을 굽혀 발을 평평하게 둡니다.",
"다른 다리를 곧게 폅니다.",
"지지하는 발로 엉덩이를 올리며 뻗은 다리를 곧고 안정되게 유지합니다.",
"컨트롤하며 시작 위치까지 내립니다.",
"한쪽 다리로 모든 반복을 마친 후 다리를 바꿉니다."
],
"Frog pump": [
"등을 대고 누워 발바닥을 맞대고 무릎을 넓게 벌립니다.",
"동작 내내 발을 맞대고 무릎을 벌린 채 유지합니다.",
"엉덩이를 곧장 위로 밀어 올려 정점에서 강하게 조입니다.",
"컨트롤하며 시작 위치까지 내립니다.",
"높은 반복 범위로 반복합니다."
],
"Donkey kicks": [
"등을 평평하게 유지하며 네발 기기 자세를 취합니다.",
"한쪽 무릎을 90도 고정 각도로 유지합니다.",
"그 발을 천장을 향해 차올리며 뒤꿈치로 밀어냅니다.",
"정점에서 엉덩이를 조인 후 컨트롤하며 내립니다.",
"한쪽 다리로 모든 반복을 마친 후 반대쪽으로 바꿉니다."
],
"Barbell standing calf raise": [
"바벨을 상부 등에 얹고 발 앞쪽 볼을 작은 블록에 올리고 뒤꿈치를 늘어뜨려 섭니다.",
"올라가기 전 뒤꿈치를 블록보다 낮게 내려 완전한 스트레칭을 만듭니다.",
"발끝으로 최대한 높이 섭니다.",
"정점에서 종아리를 강하게 조인 후 내립니다.",
"동작 내내 다리를 비교적 곧게 유지하며 반복합니다."
],
"Single-leg dumbbell calf raise": [
"한 손에 덤벨을 들고 다른 손을 벽에 가볍게 댑니다.",
"작은 블록 위에 한쪽 발로 서서 뒤꿈치를 뒤쪽 가장자리에서 늘어뜨립니다.",
"올라가기 전 뒤꿈치를 블록보다 낮게 내려 완전한 스트레칭을 만듭니다.",
"발끝으로 최대한 높이 섰다가 내립니다.",
"한쪽 다리로 모든 반복을 마친 후 반대쪽으로 바꿉니다."
],
"Dumbbell seated calf raise": [
"벤치에 앉아 발을 작은 블록에 올리고 뒤꿈치를 늘어뜨립니다.",
"각 무릎에 덤벨을 세로로 얹습니다.",
"올라가기 전 뒤꿈치를 블록보다 낮게 내려 완전한 스트레칭을 만듭니다.",
"덤벨을 균형 있게 유지하며 발끝으로 섭니다.",
"각 반복의 정점에서 잠시 멈추며 반복합니다."
],
"Donkey calf raise machine": [
"고관절에서 앞으로 숙이고 머신의 로딩된 패드 아래에 허리를 고정합니다.",
"발 앞쪽 볼을 플랫폼에 올리고 뒤꿈치를 가장자리에서 늘어뜨립니다.",
"올라가기 전 뒤꿈치를 내려 완전한 스트레칭을 만듭니다.",
"발끝으로 최대한 높이 섭니다.",
"지지 바로 동작 내내 균형을 잡으며 반복합니다."
],
"Standing bodyweight calf raise": [
"작은 계단 가장자리에 발 앞쪽 볼을 올리고 뒤꿈치를 늘어뜨려 섭니다.",
"올라가기 전 뒤꿈치를 계단보다 낮게 내려 깊은 스트레칭을 만듭니다.",
"발끝으로 최대한 높이 섭니다.",
"정점에서 잠시 멈춘 후 내립니다.",
"필요하면 균형을 위해 벽에 가볍게 대며 반복합니다."
],
"Single-leg bodyweight calf raise": [
"작은 계단 가장자리에 한쪽 발로 서서 뒤꿈치를 뒤로 늘어뜨립니다.",
"뒤꿈치를 내려 완전한 스트레칭을 만듭니다.",
"발끝으로 최대한 높이 섭니다.",
"컨트롤하며 내립니다.",
"한쪽 다리로 모든 반복을 마친 후 반대쪽으로 바꿉니다."
],
"Side-lying dumbbell hip adduction": [
"옆으로 누워 위쪽 다리를 굽히고 발을 아래쪽 다리 앞에 놓습니다.",
"가벼운 덤벨을 아래쪽 곧은 다리의 발목에 올립니다.",
"아래쪽 다리를 곧장 위로, 굽힌 위쪽 다리를 향해 올립니다.",
"컨트롤하며 시작 위치까지 내립니다.",
"한쪽의 모든 반복을 마친 후 반대쪽으로 바꿉니다."
],
"Cable hip adduction": [
"타워에서 먼 쪽 다리에 발목 커프를 채우고 타워를 향해 옆으로 섭니다.",
"그 다리를 몸 정중선을 넘어 바깥으로 올린 위치에서 시작합니다.",
"다리를 몸 안쪽으로, 지지하는 다리를 지나 움직입니다.",
"컨트롤하며 시작 위치까지 되돌립니다.",
"한쪽의 모든 반복을 마친 후 다리를 바꿉니다."
],
"Sumo squat hold": [
"발끝을 바깥으로 향한 넓은 스탠스를 취합니다.",
"허벅지가 평행이 될 때까지 스쿼트로 내려갑니다.",
"무릎을 발끝 방향으로 바깥으로 향하게 유지한 채 자세를 유지합니다.",
"동작 내내 상체를 곧게 유지합니다.",
"목표 시간에 도달하면 다시 섭니다."
],
"Cable hip abduction": [
"타워에서 가까운 쪽 다리에 발목 커프를 채우고 타워를 향해 옆으로 섭니다.",
"그 다리를 지지하는 다리 앞에서 살짝 교차시킨 위치에서 시작합니다.",
"다리를 몸에서 멀어지는 방향으로, 편안한 범위까지 바깥으로 휘두릅니다.",
"컨트롤하며 시작 위치까지 되돌립니다.",
"한쪽의 모든 반복을 마친 후 다리를 바꿉니다."
],
"Side-lying leg raise": [
"다리를 곧게 겹쳐 옆으로 눕습니다.",
"위쪽 다리를 몸과 일직선으로 곧장 위로 올립니다.",
"고관절을 뒤로 굴리지 않으며 편안한 높이까지 올립니다.",
"컨트롤하며 시작 위치까지 내립니다.",
"한쪽의 모든 반복을 마친 후 반대쪽으로 바꿉니다."
],
"Clamshells": [
"무릎을 굽혀 겹치고 발을 붙인 채 옆으로 눕습니다.",
"동작 내내 발을 붙인 채로 유지합니다.",
"위쪽 무릎을 경첩처럼 엽니다.",
"컨트롤하며 시작 위치까지 내립니다.",
"한쪽의 모든 반복을 마친 후 반대쪽으로 바꿉니다."
],
"Standing hip abduction": [
"벽이나 의자에 가볍게 손을 대고 곧게 섭니다.",
"한쪽 다리를 곧게 편 채 옆으로 곧장 올립니다.",
"상체를 곧게 유지한 채 편안한 높이까지 올립니다.",
"컨트롤하며 시작 위치까지 내립니다.",
"한쪽 다리로 모든 반복을 마친 후 반대쪽으로 바꿉니다."
],
"Dumbbell side bend": [
"단일 덤벨을 한 손에 들고 몸 옆에 늘어뜨려 섭니다.",
"덤벨 쪽으로 곧장 옆으로 굽힙니다.",
"바닥에서 반대쪽 상체에 스트레칭을 느낍니다.",
"컨트롤하며 다시 섭니다.",
"한쪽의 모든 반복을 마친 후 손을 바꿔 반대쪽을 합니다."
],
"Weighted sit-up": [
"무릎을 굽히고 발을 바닥에 평평하게 둔 채 등을 대고 눕습니다.",
"단일 덤벨이나 원판을 양손으로 가슴에 밀착합니다.",
"웨이트를 가슴에 고정한 채 상체를 앉은 자세까지 말아 올립니다.",
"컨트롤하며 시작 위치까지 내립니다.",
"발을 고정한 채 반복합니다."
],
"Cable woodchopper": [
"도르래를 높게 설정하고 타워를 향해 옆으로 섭니다.",
"양손으로 핸들을 한쪽 어깨 근처에서 잡습니다.",
"상체를 회전시켜 핸들을 대각선으로 아래로 몸 반대쪽 엉덩이 쪽으로 당깁니다.",
"컨트롤하며 시작 위치까지 되돌립니다.",
"한쪽의 모든 반복을 마친 후 반대쪽으로 바꿉니다."
],
"Captains chair leg raise": [
"전완을 패드가 있는 암레스트에 얹고 등을 패드에 밀착합니다.",
"다리를 곧장 아래로 늘어뜨려 시작합니다.",
"다리를 앞으로 들어 올리며 무릎을 가슴 쪽으로 굽힙니다.",
"컨트롤하며 시작 위치까지 내립니다.",
"동작 내내 상체를 패드에 고정한 채 반복합니다."
],
"Hollow body hold": [
"등을 대고 누운 후 어깨와 다리를 동시에 바닥에서 들어 올립니다.",
"팔을 머리 위로, 다리를 곧게 폅니다.",
"유지하는 내내 허리를 바닥에 누른 채 유지합니다.",
"평소대로 호흡하며 자세를 유지합니다.",
"목표 시간에 도달하면 내립니다."
],
"V-ups": [
"팔을 머리 위로 뻗고 다리를 곧게 펴서 평평하게 눕습니다.",
"상체와 다리를 동시에 접어 올립니다.",
"정점에서 손을 발끝을 향해 뻗으며 엉덩이로 균형을 잡습니다.",
"컨트롤하며 시작 위치까지 내립니다.",
"완전한 스트레이트 레그 버전이 어렵다면 무릎을 살짝 굽혀 반복합니다."
]
};
function instructionsFor(name){if(CFG.lang==='ja'&&EX_INSTRUCTIONS_JA[name]&&EX_INSTRUCTIONS_JA[name].length)return EX_INSTRUCTIONS_JA[name];if(CFG.lang==='ko'&&EX_INSTRUCTIONS_KO[name]&&EX_INSTRUCTIONS_KO[name].length)return EX_INSTRUCTIONS_KO[name];return EX_INSTRUCTIONS[name];}
function showExInstructions(name){const steps=instructionsFor(name);gid('exinfo-name').textContent=exDisplayName(name);gid('exinfo-list').innerHTML=steps&&steps.length?steps.map((t,i)=>'<li style="font-size:15px;color:var(--txt);line-height:1.6;margin-bottom:2px">'+t+'</li>').join(''):'<li style="font-size:15px;color:var(--txt2)">'+t('instructions_coming_soon')+'</li>';gid('exinfo-overlay').style.display='block';gid('exinfo-sheet').style.display='block';document.body.style.overflow='hidden';}
function closeExInfo(){gid('exinfo-overlay').style.display='none';gid('exinfo-sheet').style.display='none';document.body.style.overflow='';}
