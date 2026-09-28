# Launch post drafts

**Drafts only. Nothing here has been posted, and none of it should be posted
by a script.** Post by hand, one community at a time, after reading that
community's rules on the day.

## Before posting anywhere

- **Say you made it.** These are written in your voice as someone who lifts
  and uses the app, but on Reddit a post that hides that you built the thing
  counts as undisclosed self-promotion, and most fitness subs ban for it.
  Every draft below says "I made" up front for that reason.
- **Rules are unverified.** Reddit blocked automated reads of the rules pages
  while these were drafted, so the rule notes below come from general
  knowledge of those communities, not from their sidebars. Before posting,
  open each **Check** link, read the rules and any pinned self-promotion
  thread, and update the note here.
- **Account history matters.** Many subs filter new or low-karma accounts, and
  moderators look for a 9:1 ratio of normal participation to self-promotion.
  Comment in a community for a while before posting your own link there.
- **Stick to claims the app backs up:** free, no account, no ads, 221
  exercises with illustrations, English/Japanese/Korean, works offline once
  loaded, workouts stored on the phone (anonymous usage counts are sent; see
  `privacy.html`). Don't claim rest-timer alerts in the background, and don't
  cite user numbers, ratings or reviews.
- **Reply to every comment in the first few hours.** Take criticism as bug
  reports and say what you'll change.
- **Link:** `https://jedmangubat.github.io/gainpath/`. For a question-shaped
  post, link the matching guide instead (e.g. `/guides/when-to-increase-weight.html`).

---

## Reddit

### r/Fitness: don't make a post

**Check:** https://www.reddit.com/r/Fitness/about/rules
**Rule note (unverified):** self-promotion is removed outside the designated
weekly thread, which search results call "Self-Promotion Saturday". Apps
count.
**Angle:** only in that weekly thread. Keep it to two lines plus the link.

> I made a free workout tracker that suggests your next weight from how many
> reps you had left on your last set (5+ left → add weight, 1–2 → hold, fail
> twice → drop). No account, no ads, runs in the browser and installs to your
> home screen. Feedback welcome: https://jedmangubat.github.io/gainpath/

### r/beginnerfitness: "what weight do I start with?"

**Check:** https://www.reddit.com/r/beginnerfitness/about/rules
**Rule note (unverified):** usually allows helpful posts but removes plain
ads. Lead with the answer, not the app.
**Angle:** a beginner's biggest question is what weight to use, so answer it
properly and mention the app last.

**Title:** The simple rule I use for picking weights (and a free tracker I made that does it for you)

> The question I see most here is "what weight should I use?" This is the
> rule I settled on after a lot of guessing:
>
> 1. **New lift:** choose a weight where your last rep feels like you could
>    do about 3 more. Too light costs you one session. Too heavy can cost
>    you a sore joint.
> 2. **After the last set, ask how many more reps you could have done with
>    good form.**
>    - 5+ → add weight next time
>    - 3–4 → add the smallest jump
>    - 1–2 → stay, this is the sweet spot
>    - 0 twice in a row → drop a bit
> 3. **Round to what your gym has.** If the dumbbells go 12.5, 15, 17.5,
>    "+1 kg" means the next dumbbell.
>
> I got tired of doing this in my notes app, so I built a free tracker that
> asks that one question after each exercise and suggests the next weight.
> You always tap to accept, it never changes anything by itself. There's no
> account or ads, and your workouts stay on your phone. Setup is three
> screens.
>
> https://jedmangubat.github.io/gainpath/
>
> I'm the only developer, so if anything is confusing, tell me and I'll fix it.

### r/GYM: the progression logic, for people who already lift

**Check:** https://www.reddit.com/r/GYM/about/rules
**Rule note (unverified):** a large, loosely moderated sub, but repeated
promotion gets removed. Post once.
**Angle:** show the reasoning behind the numbers, since this crowd already
tracks.

**Title:** I built a free tracker that turns "reps in reserve" into a next-weight suggestion. Is this how you'd do it?

> I've been logging for years and wanted a tracker that answers one question:
> what do I put on the bar next time? So I made one.
>
> After each exercise it asks how many reps you had left on the last set:
>
> - 5+ → full step (5 kg on squat/deadlift/rows, 2.5 kg on everything else)
> - 3–4 → smallest step (2.5 kg, or 1 kg on dumbbells under 20 kg)
> - 1–2 → hold
> - 0 two sessions in a row → drop one step
>
> For a lift you've never logged, it estimates from related ones. If you bench
> 80×8 with a few reps left, it proposes about 57.5 kg for incline and 25 kg
> dumbbells for 10 reps. Everything snaps to the plates and dumbbells you tell
> it your gym has. After 4+ weeks off a lift it offers a 10–15% lighter
> restart, and you can dismiss it.
>
> It's free, with no account and no ads, and runs in the browser (it installs
> to your home screen): https://jedmangubat.github.io/gainpath/
>
> I'd like pushback on the step sizes. What do you use?

### r/SideProject: the build story

**Check:** https://www.reddit.com/r/SideProject/about/rules
**Rule note (unverified):** sharing your own project is the point of the sub.
Posts still need substance, not only a link.
**Angle:** the build story.

**Title:** My gym tracker is one HTML file: no framework, no build step, works offline

> GainPath is a workout tracker I've been building for myself and a few
> friends. Some choices that turned out well:
>
> - **One `index.html`, no build step.** Vanilla JS and CSS. Deploys are a git
>   push to GitHub Pages.
> - **A PWA instead of an app store.** Installs to the home screen and works
>   offline in basement gyms with no signal.
> - **No backend for user data.** Workouts stay on the phone (localStorage plus
>   a verified IndexedDB copy), and backups are files you save yourself.
> - **Tests guard the math.** The weight formulas are in one DOM-free section
>   with 250 unit tests, because a wrong suggestion is the worst bug a
>   tracker can have.
>
> The hardest part was iPhone Safari. It deletes a site's data after 7 days
> without a visit unless the site is installed, so the app now warns about
> that and nags for backups.
>
> https://jedmangubat.github.io/gainpath/ (free, no account, no ads)

### r/PWA: the iPhone storage problem

**Check:** https://www.reddit.com/r/PWA/about/rules
**Rule note (unverified):** small and technical. Project posts are fine if
they teach something.
**Angle:** protecting user data on iOS.

**Title:** What I learned keeping workout data safe in a PWA on iPhone

> My workout tracker stores everything on the device, so losing data is the
> worst thing that can happen. What I ended up doing:
>
> - Every save mirrors to IndexedDB after a one-time, verified migration
>   (copy, compare record by record, only then mark it done).
> - Call `navigator.storage.persist()` at startup and show the result in
>   Settings.
> - On iPhone Safari (not installed), show a warning about the 7-day
>   eviction, with Add to Home Screen steps. On my device, installing kept
>   the data from Safari.
> - Never swallow a storage error. A failed save shows an alert with a
>   one-tap backup built from memory.
>
> Live app, if you want to see how it behaves:
> https://jedmangubat.github.io/gainpath/. Happy to go into detail.

### Communities to skip

- **r/weightroom:** strict about quality and self-promotion (unverified).
  Only take part if you're already a regular.
- **r/xxfitness:** a women-centred community. The app does have separate
  default weights for women, but a man posting a product there is likely to
  be unwelcome. Only post if the rules clearly allow it, and consider
  messaging the mods first.

---

## Filipino gym and fitness communities

**Where:** r/Philippines (check: https://www.reddit.com/r/Philippines/about/rules,
which is general-interest and may have a flair or weekly thread for this),
plus Facebook gym groups you're already a member of. Read each group's pinned
admin rules; many ban links or require approval. Some local subreddits for
fitness may exist. Confirm they're active before posting.
**Angle:** free, with no subscription in a market where app subscriptions
feel expensive. Works with poor gym Wi-Fi.
Taglish, casual.

**Draft (Taglish):**

> Mga ka-gym, gumawa ako ng libreng workout tracker. Wala siyang bayad, walang
> ads, at hindi kailangan mag-sign up. 😅
>
> Ginawa ko kasi ang hirap tandaan kung ilang kilo ginamit ko last time, at
> hindi ko alam kung kailan dapat magdagdag. After every exercise, isang
> tanong lang: ilang reps pa kaya mo sa huling set? Tapos siya na ang
> magsasabi kung dagdag, stay, o bawas next time. Ikaw pa rin ang magde-decide,
> suggestion lang siya.
>
> - Gumagana kahit mahina ang signal sa gym (offline pag na-load na)
> - 221 exercises na may pictures at form tips
> - Nasa phone mo lang ang workouts mo, walang account
> - Pwede i-install sa home screen, parang app na rin
>
> https://jedmangubat.github.io/gainpath/
>
> Solo dev lang ako, kaya kung may bug o gusto niyong idagdag, sabihin niyo
> lang. 🙏

**English version (for groups that post in English):**

> Made a free workout tracker for fellow gym-goers: no subscription, no ads,
> no sign-up. After each exercise it asks how many reps you had left on your
> last set and suggests whether to add, hold or drop weight next time. You
> always confirm it. It works offline once loaded, which helps in gyms with
> bad signal, and your workouts stay on your phone.
> https://jedmangubat.github.io/gainpath/. I'm a solo dev, feedback welcome.

---

## Gym communities in Japan

GainPath's interface is fully translated into Japanese, so there are two
audiences.

### r/japanlife: foreigners training in Japan

**Check:** https://www.reddit.com/r/japanlife/about/rules
**Rule note (unverified):** has rules on self-promotion and often routes
things like this into recurring threads. Look for a weekly or "shameless
plug" thread before posting on its own.
**Angle:** kg-first gyms, and a Japanese UI you can hand to a Japanese
training partner.

> For anyone lifting in Japan: I made a free workout tracker (no account,
> no ads) that works in kg by default and has a full Japanese interface, which
> helps if you train with Japanese friends. It suggests your next weight from
> how many reps you had left on your last set, and you can tell it the plates
> and dumbbells your gym has so it only suggests weights you can load.
> https://jedmangubat.github.io/gainpath/

### Japanese-language posts (X/Twitter #筋トレ, note.com)

**Where:** X with #筋トレ #筋トレ記録 #ジム. A longer version fits a note.com
article. No subreddit rules apply, but posting the same text over and over
is spam. Post once, then reply to people.
**Angle:** a simple, free, ad-free record app. Japanese users care about
privacy, and the app needs no registration. Keep the tone plain and humble.

**X / short:**

> 筋トレ記録アプリを個人で作りました。無料・広告なし・登録不要です。
> 最後のセットで「あと何回できたか」を選ぶと、次回の重量を提案します（採用するかは自分で決められます）。
> ジムにあるプレートやダンベルに合わせて丸めてくれます。日本語対応、記録はスマホの中だけ。
> https://jedmangubat.github.io/gainpath/
> #筋トレ #筋トレ記録

**Longer (note.com / blog opening):**

> 「前回何kgだったっけ？」「いつ重量を上げればいい？」を解決したくて、筋トレ記録アプリを作りました。
>
> 使い方はシンプルです。種目が終わったら、最後のセットで「あと何回できたか」を選ぶだけ。
> 5回以上なら重量アップ、3〜4回なら小さくアップ、1〜2回ならそのまま、2回続けて限界ならダウン、と提案します。提案はワンタップで採用・却下でき、勝手に変わることはありません。
>
> ・無料、広告なし、アカウント登録なし
> ・221種目、イラストとフォームのポイント付き
> ・一度読み込めばオフラインでも使えます
> ・ワークアウトの記録は端末の中だけに保存
>
> 個人開発なので、不具合や要望があれば気軽に教えてください。

*(English gist, for your review: "I built a workout log to answer 'what did I
lift last time?' and 'when do I add weight?'. Rate how many reps you had left
on the last set and it suggests up/small up/hold/down. You always confirm.
Free, no ads, no sign-up, 221 illustrated exercises, works offline, records
stay on your device. Solo dev, feedback welcome.")* Have a native speaker
read the Japanese before posting.

---

## Posting log

| Date | Community | Link | Notes |
|------|-----------|------|-------|
| | | | |
