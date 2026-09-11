import assert from "node:assert/strict";
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const questions = JSON.parse(
  readFileSync(join(root, "src/data/questions.json"), "utf8"),
);
const officialSignsTs = readFileSync(
  join(root, "src/lib/csn/officialSigns.ts"),
  "utf8",
);
const officialSignTsx = readFileSync(
  join(root, "src/components/csn/official-sign.tsx"),
  "utf8",
);
const questionVisual = readFileSync(
  join(root, "src/components/csn/question-visual.tsx"),
  "utf8",
);
const play = readFileSync(join(root, "src/routes/play.tsx"), "utf8");
const results = readFileSync(join(root, "src/routes/results.tsx"), "utf8");
const mistakes = readFileSync(join(root, "src/routes/mistakes.tsx"), "utf8");

function mapping() {
  const m = officialSignsTs.match(
    /SIGN_SLUG_TO_ID: Record<string, string> = \{([\s\S]*?)\n\};/,
  );
  assert.ok(m, "SIGN_SLUG_TO_ID block");
  const out = {};
  for (const [, a, b, n] of m[1].matchAll(
    /(?:([\w]+)|"([^"]+)")\s*:\s*"(\d+)"/g,
  )) {
    out[a || b] = n;
  }
  return out;
}

function pngSet() {
  return new Set(
    readdirSync(join(root, "public/signs"))
      .filter((f) => f.endsWith(".png"))
      .map((f) => f.replace(/\.png$/, "")),
  );
}

function byId(id) {
  return questions.find((q) => q.id === id);
}

test("bank has 270 unique questions with locale integrity", () => {
  assert.equal(questions.length, 270);
  const ids = questions.map((q) => q.id);
  assert.equal(new Set(ids).size, 270);
  for (const q of questions) {
    for (const loc of ["lv", "en"]) {
      assert.equal(typeof q[loc].q, "string");
      assert.ok(q[loc].q.length > 8, q.id);
      assert.ok(Array.isArray(q[loc].options), q.id);
      assert.ok(q[loc].options.length >= 3, q.id);
      assert.equal(typeof q[loc].explain, "string");
      assert.ok(
        q[loc].correct >= 0 && q[loc].correct < q[loc].options.length,
        q.id,
      );
    }
    assert.equal(q.lv.correct, q.en.correct, q.id);
    assert.equal(q.lv.options.length, q.en.options.length, q.id);
    assert.ok(["sign", "none", "scene", "marking"].includes(q.visual.type), q.id);
  }
});

test("every sign visual maps to an existing official PNG", () => {
  const map = mapping();
  const pngs = pngSet();
  assert.equal(pngs.size, 316);
  assert.ok(pngs.has("423"));
  assert.ok(pngs.has("323"));
  const forbidden = new Set([
    "fog",
    "tram",
    "pedestrian-info",
    "stop-ahead",
    "yield-ahead",
    "speed-30",
    "speed-70",
    "speed-90",
    "speed-110",
  ]);
  for (const q of questions) {
    if (q.visual.type !== "sign") continue;
    const slug = q.visual.sign;
    assert.ok(!forbidden.has(slug), `${q.id} still uses ${slug}`);
    const id = map[slug];
    assert.ok(id, `${q.id} unmapped slug ${slug}`);
    assert.ok(pngs.has(id), `${q.id} missing raster ${id}`);
  }
});

test("min-speed-50 maps to official 423, not 323", () => {
  const map = mapping();
  assert.equal(map["min-speed-50"], "423");
  const q = byId("sg046");
  assert.equal(q.visual.sign, "min-speed-50");
  assert.match(q.rule, /423/);
  assert.ok(existsSync(join(root, "public/signs/423.png")));
});

test("known legal corrections", () => {
  assert.equal(byId("sg018").rule, "CSN 104. zīme");
  assert.match(byId("wt009").rule, /128/);
  assert.match(byId("wt013").rule, /117/);
  assert.match(byId("dg013").rule, /125/);
  assert.match(byId("dg019").rule, /121/);
  assert.match(byId("nt007").rule, /125/);
  assert.equal(byId("sp019").lv.correct, 2);
  assert.equal(byId("sp019").lv.options[2], "120 km/h");
  assert.match(byId("fa010").lv.options[0], /20 min/);
  assert.match(byId("fa012").lv.options[0], /15 m/);
  assert.match(byId("fa012").lv.options[0], /100 m/);
  assert.match(byId("fa017").rule, /39\.2/);
  assert.doesNotMatch(byId("fa017").rule, /273/);
  assert.match(byId("vh001").rule, /219/);
  assert.match(byId("vh006").rule, /185/);
  assert.match(byId("vh014").rule, /172/);
  assert.match(byId("vh004").rule, /160/);
  assert.match(byId("vh017").rule, /222/);
  assert.match(byId("mk001").rule, /292\.1/);
  assert.match(byId("mk005").rule, /929/);
});

test("OfficialSign does not fall back to SVG children", () => {
  assert.doesNotMatch(officialSignTsx, /children/);
  assert.match(officialSignTsx, /missing official sign raster/);
  assert.match(officialSignTsx, /Oficiālais zīmes attēls nav pieejams/);
  assert.doesNotMatch(
    questionVisual,
    /children:\s*\(0, t\.jsx\)\(v,/,
  );
});

test("learner UI does not leak question.rule", () => {
  assert.doesNotMatch(play, /question\.rule/);
  assert.doesNotMatch(results, /q\.rule/);
  assert.doesNotMatch(mistakes, /q\.rule/);
});
