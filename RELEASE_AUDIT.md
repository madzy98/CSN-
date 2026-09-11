# CSN+ A–Z audit report (2026-09-11)

Legal source (Latvian, current): [Likumi.lv MK 279](https://likumi.lv/ta/id/274865-celu-satiksmes-noteikumi)  
Tyre tread: [MK 295](https://likumi.lv/ta/id/292396)  
Burns: [NMPD — termiski apdegumi](https://www.nmpd.gov.lv/lv/termiski-apdegumi-un-applaucejumi)

This pass patched **targeted** errors. It did **not** wholesale-rewrite `questions.json`. Official sign PNGs were **not** generated, redrawn or restyled.

## Questions

| Metric | Count |
|---|---|
| Total | 270 |
| Unique ids | 270 |
| Content/rule/visual patched this pass | 77 |
| Unchanged (scanned; no blocking error found) | 193 |
| Blocking legal errors from the mandatory list | 0 remaining |
| Remaining non-blocking risks | see below |

## Signs

| Metric | Value |
|---|---|
| Catalog (`officialSigns.json`) | 316 |
| PNG files (`public/signs/*.png`) | 316 |
| `423.png` | present — blue circular **minimum** 50 (not red-ring 323) |
| `323.png` | present — red-ring **maximum** 50 |
| Sign questions after fix | 98, all mapped to an existing PNG |
| Unmapped sign slugs in the bank | 0 |
| OfficialSign SVG fallback | removed |
| Generated/redrawn official signs this pass | 0 |

Provenance: `officialSigns.json` `image_source` is celuaprikojums.lv product photos, with `legal_source` pointing at Likumi 4. pielikums. **Not claimed** as original Likumi.lv scan files.

## What was fixed

### Sign references
- `sg018` rule 103 → **104** (left curve)
- `wt009` 148 → **128** (Sānvējš)
- `wt013` 139 → **117** (Akmeņu nogruvumi)
- `dg013` / `nt007` 150 → **125** (Savvaļas dzīvnieki)
- `dg019` 118 «Bērni» → **121** (118 is road works)
- `wt001` / `wt004` stale 148/152 sign numbers → **115**

### Broken slugs (not official plates)
`pedestrian-info`, `tram`, `fog` are not 4. pielikums plates. Visuals changed to existing **scenes** (`pedestrian-zebra`, `tram-stop`, `fog-follow`). No custom SVG sign.

`stop-ahead` / `yield-ahead` had no official advance-warning raster. Showing 207/206 would teach the wrong plate. Questions converted to **text** (no fake plate).

`speed-30/70/90/110` cannot use `323.png` (that file is a **50** plate). Those questions no longer render a plate; the number is in the question text. `speed-50` still uses official `323.png`. `min-speed-50` still uses official `423.png`.

### OfficialSign
Missing raster → explicit “Oficiālais zīmes attēls nav pieejams”. **No** SVG/children fallback.

### Tunnel / lights
`sg055`, `nt012` no longer teach “always dipped beam only”. Current **160** allows DRL / dipped / front fog in daylight; **162** applies when visibility is inadequate; **121.2** still forbids stopping in tunnels.

### Speed / trailer
`sp019` (car + trailer on 552): correct answer **120 km/h**, not 90. Current **103.4** has no 90 km/h trailer clause. **103.2** 50 km/h is towing a **motor vehicle**.

### Vehicle
- Winter tyres / studs / 3PMSF / tread: **219** + **MK 295** (not old 236)
- Daytime lights: **160** (not 36)
- Seat belts: **25.4**; children ≤150 cm: **185**
- Poor visibility lights: **162**; horn: **172**
- `vh017` rewritten to **222** (both dipped beams at night / driver-side wiper in rain) — not a generic “mirror or exhaust” ban

### First aid
- `fa010` cool **≥20 min** with cool/cold **not icy** water (NMPD). Labelled as medical guidance, not CSN
- `fa012` triangle **≥15 m** built-up / **≥100 m** outside (**175.1 / 175.2**)
- `fa017` / `fa001` duty to help: **39.2**, not 273 (273 is mandatory-direction signs vs public transport)
- `fa009` do not automatically raise legs if trauma is possible

### Markings
`mk001–mk028` internal `rule` remapped from old 137–149 to current **292.x / 920–944**. Question stems/answers were already about the marking meaning and were kept.

### Heuristics vs law
2-second gap, “~50 m fog”, “3–4 s in rain” are now labelled **practical advice** where they appeared as if they were CSN figures. **168** has no metre threshold. **163.2** 150 m main→dipped remains law.

### Learner UI
`question.rule` removed from play / results / mistakes. `rule` remains in the dataset for audit.

## What was not changed
- Official PNG pixels
- Question ids, modules, difficulty, scoring
- 193 questions whose content was not shown to be wrong
- Catalog size 316 (no invented extra plates)
- App navigation / quiz / language / XP behaviour

## Remaining risks (not blocking the listed errors)

1. **No official rasters for 323 variants 30/70/90/110** — those items are text-only. Do not generate lookalikes.
2. **Shark-teeth** mapped to the **292.11 give-way family**; a distinct 5. pielikums number was not found as a separate current id.
3. **`vh008`** first-aid kit + extinguisher: content kept; exact current paragraph not pin-pointed (old 241 is now truck rear plates).
4. **`vh015`** handheld phone ban: content kept; exact current subpoint of **25** not pin-pointed.
5. **`sg040` / `sg063`** living-street 141–143 numbering: 139–140 verified; 141–143 left as-is pending a full living-zone paragraph dump.
6. Sign **provenance** is celuaprikojums.lv correspondence, not a Likumi.lv original-file proof.
7. Unchanged questions were scanned for the known error patterns; **not** every unchanged sentence was re-quoted against Likumi.

## Legal points verified this pass (Latvian text)

- **39.2** duty to help casualties  
- **101** 50 / 20 living zone / 90 outside (all vehicles)  
- **102** posted speed-sign limits still subject to 99  
- **103.2** towing motor vehicles 50; **103.4** 552: cars 120 / buses 110; winter cars 110 / others 100; **no trailer-90 clause**  
- **121.2** no stopping in tunnels  
- **160–168** lights; **168** rear fog only in thick fog / heavy rain / snow  
- **172** horn  
- **175.1 / 175.2** triangle 15 m / 100 m  
- **185** children ≤150 cm restraint  
- **219** winter tyres 1 Dec–1 Mar; no studs 1 May–1 Oct  
- **222** closed list of defects that forbid driving  
- **273** mandatory-direction signs / public transport — **not** first aid  
- **292.1–292.16** markings 920–939 (and user-confirmed 940/941/943/944)  
- **4. pielikums** 103 right / 104 left, 117 rocks, 118 works, 121 children, 125 animals, 128 wind, 323 max, 423 min, 544 tunnel, 552 expressway  

## Code / tests

| Check | Result |
|---|---|
| JSON parse / 270 unique ids | PASS |
| TypeScript `tsc --noEmit` | PASS |
| CSN release audit tests (`scripts/csn-release-audit.test.mjs`) | PASS 6/6 |
| Full `npm test` | 193 pass / **8 fail** — all 8 are pre-existing `scripts/grok-pwa-plugin.test.mjs` OG/title tests, not CSN |
| ESLint on touched CSN files | no new errors in official-sign / play / results / officialSigns; `question-visual.tsx` still has pre-existing `@ts-nocheck` / `var` errors |
| Production `npm run build` | PASS |
| Smoke | preview `/` HTTP 200; `/signs/423.png` HTTP 200 |

## Release-gate honesty

Blocking items from the mandatory list were corrected.

**Not claimed as 100% sentence-level Likumi re-verification of every unchanged question.** Remaining risks are listed above.

Unconditional slogan **CSN+ RELEASE READY** is **not** declared, because:
- 8 pre-existing platform OG tests still fail
- some legal paragraph numbers remain unpinned (`vh008`, `vh015`)
- 323 plates for 30/70/90/110 have no official rasters (questions are text-only)
- sign-file provenance is celuaprikojums.lv correspondence, not a Likumi original-file proof

