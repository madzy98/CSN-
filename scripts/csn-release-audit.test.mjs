import assert from "node:assert/strict";
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { createHash } from "node:crypto";
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

const phase2 = JSON.parse(
  readFileSync(join(root, "src/data/questions-250.json"), "utf8"),
);
const originalHash = createHash("sha256")
  .update(readFileSync(join(root, "src/data/questions.json")))
  .digest("hex");

test("original 270-question file is immutable (SHA-256)", () => {
  assert.equal(
    originalHash,
    "0de7e4c05b7892af0916f900e564d16ba6fcf5b4a9391f99161d6ccc3795d1a3",
  );
});

test("phase-2 bank is 250 unique n250_* questions; combined runtime is 520", () => {
  assert.equal(phase2.length, 250);
  const ids = phase2.map((q) => q.id);
  assert.equal(new Set(ids).size, 250);
  for (const id of ids) assert.match(id, /^n250_\d{3}$/);
  const origIds = new Set(questions.map((q) => q.id));
  for (const id of ids) assert.equal(origIds.has(id), false, `id collision ${id}`);
  assert.equal(questions.length + phase2.length, 520);
});

test("phase-2 questions have valid modules, answers, Latvian copy", () => {
  const modules = new Set([
    "signs",
    "markings",
    "priority",
    "speed",
    "vehicle",
    "firstaid",
    "danger",
    "night",
    "weather",
  ]);
  for (const q of phase2) {
    assert.ok(modules.has(q.module), `${q.id} module ${q.module}`);
    assert.equal(typeof q.lv.q, "string");
    assert.ok(q.lv.q.length > 8, q.id);
    assert.ok(Array.isArray(q.lv.options), q.id);
    assert.ok(q.lv.options.length >= 2, q.id);
    assert.ok(
      q.lv.correct >= 0 && q.lv.correct < q.lv.options.length,
      q.id,
    );
    assert.ok(["sign", "none", "scene", "marking", "image", "video"].includes(q.visual.type), q.id);
  }
});

test("phase-2 sign visuals map to official PNG rasters, not package composites", () => {
  const pngs = pngSet();
  for (const q of phase2) {
    if (q.visual.type !== "sign") continue;
    const id = String(q.visual.sign);
    assert.ok(/^\d{3}$/.test(id), `${q.id} sign id ${id}`);
    assert.ok(pngs.has(id), `${q.id} missing official raster ${id}`);
    assert.equal(q.visual.src, undefined, `${q.id} must not use ZIP composite`);
  }
});

test("phase-2 image and video assets exist under public/p2", () => {
  for (const q of phase2) {
    if (q.visual.type === "image") {
      const p = join(root, "public", q.visual.src.replace(/^\//, ""));
      assert.ok(existsSync(p), `${q.id} missing ${p}`);
      assert.doesNotMatch(q.visual.src, /sign_/);
    }
    if (q.visual.type === "video") {
      const p = join(root, "public", q.visual.src.replace(/^\//, ""));
      assert.ok(existsSync(p), `${q.id} missing ${p}`);
    }
  }
});

test("phase-2 current-law triangle distances", () => {
  const q131 = phase2.find((q) => q.id === "n250_131");
  const q179 = phase2.find((q) => q.id === "n250_179");
  const q230 = phase2.find((q) => q.id === "n250_230");
  assert.equal(q131.lv.options[q131.lv.correct], "15 m");
  assert.equal(q179.lv.options[q179.lv.correct], "15 m");
  assert.equal(q230.lv.options[q230.lv.correct], "Tikai A");
  assert.match(q131.lv.explain, /175\.1/);
  assert.match(q230.lv.explain, /100 m/);
});

test("phase-2 language fix for additional plates 854 and 860", () => {
  const q59 = phase2.find((q) => q.id === "n250_059");
  const q60 = phase2.find((q) => q.id === "n250_060");
  assert.equal(q59.lv.options[q59.lv.correct], "Informācija par velosipēdu ceļu");
  assert.equal(q60.lv.options[q60.lv.correct], "Elektromobiļiem");
});

test("question-visual renders image and video without SVG official-sign fallback", () => {
  assert.match(questionVisual, /visual\.type === "image"/);
  assert.match(questionVisual, /visual\.type === "video"/);
  assert.match(questionVisual, /<video/);
});
