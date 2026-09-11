# CSN+ BUILDER GROK SCRIPT
# Lasīt šo failu PILNĪBĀ pirms jebkura koda vai bildes.
# Read this file FULLY before any code or image work.

Product: CSN+ (Latvian Category B driving-theory trainer)
Repo: https://github.com/madzy98/CSN-
Legal source: https://likumi.lv/ta/id/274865-celu-satiksmes-noteikumi#piel4

You have been told this more than once. Forgetting it is ERR-003.
Going deeper in the app does not reset these rules.

==================================================
0. FIRST ACTION EVERY SESSION
==================================================

1. Re-read this file.
2. Restate the BLOCKED errors in one short list.
3. Classify every visual the user is talking about:
   A. official road sign
   B. general traffic scenario
4. If A — do not open Imagine / generate_image / edit_image / SVG redraw.
5. Do not change question text, answers, explanations, or scoring unless the user explicitly asked for that.

==================================================
1. ERROR MEMORY — NEVER REPEAT
==================================================

ERR-001 BLOCKED
Official Latvian road signs were redrawn as SVG / AI art.
File that did it: src/components/csn/question-visual.tsx
It draws plates with Manrope and (was) CSS drop-shadow.
THAT IS FORBIDDEN. Do not add more sign drawings to that map.
Do not "improve" existing drawings.

ERR-002 BLOCKED
Minimum-speed sign in the screenshot is CSN 423
"Minimālā ātruma ierobežojums"
Bank slug: min-speed-50
Question id: sg046
It is a BLUE circular mandatory plate with a WHITE number.
It is NOT 323 (red-ring max speed).
It is NOT 531 (recommended-speed zone).

ERR-003 BLOCKED
Later builder passes forgot ERR-001 and redid the same damage.
If a new feature needs images, still obey ERR-001.

ERR-004 BLOCKED
Forbidden sources for official plates:
old CSN editions, Google, Pinterest, Wikipedia/Commons,
generic EU icon packs, emoji, Lucide, Font Awesome,
Imagine outputs, previous AI images in chat.

Allowed source only:
current Likumi.lv 4. pielikums plate, frozen as public/signs/{number}.png

ERR-005 BLOCKED
Scenario art and official signs are different pipelines.
visual.type === "sign"  → official pipeline only
visual.type === "scene" → may be redesigned
visual.type === "marking" → treat like official data if it is a CSN marking drawing

ERR-006 BLOCKED
Sign fixes must not rewrite lv/en question copy, options, correct index, explain, scoring.

ERR-007 BLOCKED
Do not tell the user "fixed" unless the rendered 423 plate
matches the current 4. pielikums drawing.

==================================================
2. ABSOLUTE RULE — DO NOT ALTER OFFICIAL SIGNS
==================================================

DO NOT:
- redraw, recreate, generate, stylize, improve, modernize, simplify
- change colours, symbols, borders, typography, proportions, perspective
- apply filter / brightness / contrast / hue-rotate / drop-shadow on the plate
- trace SVG from a screenshot
- replace a plate with a similar icon
- send public/signs/* through Imagine

MAY:
- scale the official file: width 240px; height auto
- put shadow / radius / glow on the CARD around the plate

==================================================
3. HOW TO SHOW A SIGN
==================================================

Use:
  src/lib/csn/officialSigns.ts     slug → CSN number
  src/components/csn/official-sign.tsx
  public/signs/{number}.png        official raster only

min-speed-50 → 423 → /signs/423.png

If 423.png is missing:
  SAY IT IS MISSING.
  Do not generate a lookalike.
  Do not draw a new SVG "close enough".

To import an official plate:
  1. Open current Likumi 4. pielikums
  2. Save the official drawing as public/signs/{number}.png with no filters
  3. Add the number to OFFICIAL_SIGN_FILE_SET
  4. Stop

==================================================
4. SESSION CHECKLIST
==================================================

[ ] Read this file
[ ] Did not call Imagine on a sign
[ ] Did not edit public/signs pixels except official import
[ ] Did not add drop-shadow / filter on the plate
[ ] Did not change question answers
[ ] sg046 / min-speed-50 still maps to 423
[ ] If claiming fixed: opened the question and compared to Likumi 4. pielikums

==================================================
5. REFUSAL LINES
==================================================

"I will not generate or restyle official CSN sign {id}."
"That would repeat ERR-001. Using the frozen asset instead."
"Question wording stays as-is (ERR-006)."
"423.png is not imported yet. I will not invent it."
