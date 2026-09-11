# CSN+ V4.22 — visual world pass

Existing product facts below still hold. This pass only restyles.

## Visual system

- Tokens: `src/styles.css` — `--csn-accent*` per `html[data-theme]`
- Existing theme IDs only: `basic` | `dark` | `neon` | `pro` (names in i18n locked)
- Heroes: `public/themes/{dark,neon,pro,basic}.jpg` — original cars, no brand marks
- Theme boot: inline script reads `csnplus-v1` and sets `data-theme` before paint
- Hero background is CSS `var(--csn-hero)` so the car matches the theme on first frame
- Copy: existing `tagline` (“B kategorijas teorija”) on splash; no invented slogans
- Audio: still a boolean; no engine to duck

## Locked (unchanged)

- Persist `csnplus-v1`, splash `csn-splash-done`
- 270-question bank, XP, pass V(n), timers, routes, i18n keys

---

# CSN+ V3 — Phase 0 AUDIT

Invented nothing. Facts from (a) this workspace at audit time and (b) the live CSN+ product at https://csnplus.grok.me whose JS bundles were read in full.

## 0. PROJECT ROOT

- **Exact root being edited:** `/workspace`
- **In-scope:** `src/`, `public/`, `AUDIT.md`, `REVIEW.md`, `startup.sh` (platform contract)
- **FORBIDDEN:** `csn_plus_v3/`, a second app, a parallel repo
- All edits stay inside `/workspace`

**Source finding:** this sandbox had no CSN+ source (TanStack Start template only: `src/lib/*` platform helpers, no `src/routes`). Product facts were taken from the live CSN+ build (`csnplus.grok.me` assets). Question bank reconstructed byte-for-byte from that store (270 `W()` records). Persistence key, XP formulae, exam numbers copied from that store — not guessed.

This pass is a **visual/UX restyle of that existing product**. Logic, keys, numbers, strings, bank: locked to the live app.

## 1. STACK

- Language: TypeScript
- Framework: React 19 + TanStack Start / Router / Query
- State: Zustand + persist middleware
- Router: TanStack file routes
- Build: Vite 8 via `npm run dev`
- CSS: Tailwind v4
- Packages: lucide-react, recharts, zustand
- Targets: web. No Android/iOS native project.

## 2. ENTRY + ROUTES

Start: `src/router.tsx` → `src/routes/__root.tsx` → `/`

| Route | File | Exists in live product |
|---|---|---|
| `/` | `src/routes/index.tsx` | yes (home + splash overlay) |
| `/learn` | `src/routes/learn/index.tsx` | yes |
| `/learn/$moduleId` | `src/routes/learn/$moduleId.tsx` | yes |
| `/exam` | `src/routes/exam.tsx` | yes |
| `/play` | `src/routes/play.tsx` | yes (learn + exam session) |
| `/results` | `src/routes/results.tsx` | yes |
| `/stats` | `src/routes/stats.tsx` | yes |
| `/settings` | `src/routes/settings.tsx` | yes |
| `/mistakes` | `src/routes/mistakes.tsx` | yes |
| `/achievements` | `src/routes/achievements.tsx` | yes |

Splash: EXISTS (session overlay, auto-dismiss + tap). Keep.

## 3. NAVIGATION

Tabs (5), Latvian labels from live i18n `lv`: Sākums, Mācīties, Eksāmens, Statistika, Iestatījumi.

## 4. STATE + PERSISTENCE

**PERSISTENCE KEYS — IMMUTABLE**

| Key | Purpose |
|---|---|
| `csnplus-v1` | Zustand persist store name (DO NOT RENAME) |
| `csn-splash-done` | sessionStorage `"1"` after splash dismissed |

**Partialize fields inside `csnplus-v1` (locked names):**

`lang`, `theme`, `examSize`, `sound`, `focusMode`, `onboardingDone`, `xp`, `totalXp`, `lastActiveDate`, `streak`, `bestStreak`, `wrongIds`, `moduleStats`, `questionStats`, `achievements`, `examHistory`, `lastExam`, `daily`, `totalTimeMs`, `todayXp`, `todayXpDate`

## 5. QUESTION SYSTEM

- Data: 270 questions in `src/data/questions.json`
- Answer labels: A/B/C/D
- Modules: signs 70, markings 28, priority 40, speed 30, vehicle 22, firstaid 18, danger 24, night 18, weather 20

## 6–7. LEARNING + EXAM

- Per-question timer: speed 30s, hardcore 45s, else 60s
- Pass: hardcore 0 wrongs; else `V(n)=floor(n*0.1)` → 30 q ⇒ 3
- Immediate feedback after tap. KEEP.
- Modes: mock, practice, mistakes, challenge, speed, hardcore, elite, marathon, replay

## 8–9. STATS + AUDIO

Existing metrics only. `sound` boolean, default false, gated level 8. No AudioContext.

## 12. COPY

`tagline` = “B kategorijas teorija” — existing, used on splash.
Slogans `ready`, `readyBody`, `splashKicker` remain in JSON, not rendered.
Everything else in `lv` / `en` locked.
