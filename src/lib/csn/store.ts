import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import {
  BADGE_XP,
  MODULES,
  UNLOCK_AT,
  type BadgeId,
  type Daily,
  type DailyKind,
  type ExamMode,
  type ExamResult,
  type FeatureId,
  type Lang,
  type ModuleId,
  type ModuleStat,
  type QuestionStat,
  type Session,
  type ThemeId,
} from "./types";
import {
  applyStreak,
  allowedWrong,
  hasFeature,
  levelFromXp,
  unlockLevel,
  mulberry32,
  todayKey,
  yesterdayKey,
} from "./xp";
import { QUESTIONS, getQuestion, loc, pickQuestionIds } from "./questions";

const DAILY_KINDS: DailyKind[] = ["correct20", "mock", "mistakes", "score80", "fast20"];

function emptyModule(): ModuleStat {
  return { answered: 0, correct: 0, timeMs: 0, xp: 0 };
}

function emptyModules(): Record<ModuleId, ModuleStat> {
  const e = {} as Record<ModuleId, ModuleStat>;
  for (const m of MODULES) e[m] = emptyModule();
  return e;
}

function makeDaily(date: string): Daily {
  const rnd = mulberry32(date.split("").reduce((a, c) => a + c.charCodeAt(0), 0) * 997);
  const kind = DAILY_KINDS[Math.floor(rnd() * DAILY_KINDS.length)];
  return {
    date,
    kind,
    progress: 0,
    target: kind === "correct20" ? 20 : 1,
    completed: false,
    xp: kind === "correct20" ? 80 : kind === "mock" ? 120 : kind === "fast20" ? 150 : 100,
  };
}

const INITIAL = {
  lang: "lv" as Lang,
  theme: "dark" as ThemeId,
  examSize: 30,
  sound: false,
  focusMode: false,
  adminMode: false,
  onboardingDone: false,
  xp: 0,
  totalXp: 0,
  lastActiveDate: "",
  streak: 0,
  bestStreak: 0,
  wrongIds: [] as string[],
  moduleStats: emptyModules(),
  questionStats: {} as Record<string, QuestionStat>,
  achievements: [] as BadgeId[],
  examHistory: [] as ExamResult[],
  lastExam: null as ExamResult | null,
  daily: makeDaily(todayKey()),
  totalTimeMs: 0,
  todayXp: 0,
  todayXpDate: todayKey(),
};

function streakPatch(state: typeof INITIAL) {
  const t = todayKey();
  if (state.lastActiveDate === t) return {};
  if (state.lastActiveDate === yesterdayKey()) {
    const n = state.streak + 1;
    return { lastActiveDate: t, streak: n, bestStreak: Math.max(state.bestStreak, n) };
  }
  return { lastActiveDate: t, streak: 1, bestStreak: Math.max(state.bestStreak, 1) };
}

function newBadges(state: {
  questionStats: Record<string, QuestionStat>;
  examHistory: ExamResult[];
  streak: number;
  moduleStats: Record<ModuleId, ModuleStat>;
  achievements: BadgeId[];
  xp: number;
}): BadgeId[] {
  const have = new Set(state.achievements);
  const out: BadgeId[] = [];
  const seen = Object.values(state.questionStats).reduce((a, s) => a + s.seen, 0);
  if (seen >= 1 && !have.has("firstSteps")) out.push("firstSteps");
  if (state.examHistory.some((e) => e.mode === "mock") && !have.has("noFear")) out.push("noFear");
  if (
    Object.values(state.questionStats).some((s) => s.correct > 0 && s.lastMs > 0 && s.lastMs < 8000) &&
    !have.has("speedDemon")
  )
    out.push("speedDemon");
  if (
    Object.values(state.questionStats).filter((s) => s.wrong > 0 && s.correct > 0).length >= 20 &&
    !have.has("comeback")
  )
    out.push("comeback");
  if (state.streak >= 7 && !have.has("streakMaster")) out.push("streakMaster");
  const last3 = state.examHistory.slice(0, 3);
  if (
    last3.length === 3 &&
    last3.every((e) => e.size > 0 && e.correct / e.size >= 0.9) &&
    !have.has("knowledgeKing")
  )
    out.push("knowledgeKing");
  const night = state.moduleStats.night;
  if (night.answered >= 8 && night.correct / night.answered >= 0.8 && !have.has("nightRider"))
    out.push("nightRider");
  const weather = state.moduleStats.weather;
  if (weather.answered >= 8 && weather.correct / weather.answered >= 0.8 && !have.has("weatherWarrior"))
    out.push("weatherWarrior");
  if (state.examHistory.some((e) => e.mode === "elite" && e.passed) && !have.has("eliteDriver"))
    out.push("eliteDriver");
  if (levelFromXp(state.xp) >= 50 && !have.has("masterDriver")) out.push("masterDriver");
  return out;
}

function unlocksBetween(fromLevel: number, toLevel: number): FeatureId[] {
  const out: FeatureId[] = [];
  if (toLevel <= fromLevel) return out;
  for (const [k, v] of Object.entries(UNLOCK_AT) as [FeatureId, number][]) {
    if (v > fromLevel && v <= toLevel) out.push(k);
  }
  return out;
}

type StartOpts = { size?: number; module?: ModuleId; ids?: string[] };

type CsnStore = typeof INITIAL & {
  session: Session | null;
  pendingUnlocks: string[];
  hydrated: boolean;
  hydrateDay: () => void;
  setLang: (lang: Lang) => void;
  setTheme: (theme: ThemeId) => void;
  setExamSize: (n: number) => void;
  setSound: (on: boolean) => void;
  setFocus: (on: boolean) => void;
  setAdminMode: (on: boolean) => void;
  finishOnboarding: () => void;
  addXp: (n: number) => { gained: number; newUnlocks: FeatureId[] };
  startExam: (mode: ExamMode, opts?: StartOpts) => void;
  selectAnswer: (chosen: number, timedOut?: boolean) => {
    record: { questionId: string; chosen: number; correct: boolean; timeMs: number };
    leveled: FeatureId[];
  };
  nextQuestion: () => void;
  togglePause: () => void;
  abortExam: () => void;
  finishExam: () => ExamResult | null;
  resetAll: () => void;
  dismissUnlocks: () => void;
};

let persistReady = false;

const guardedStorage = createJSONStorage(() => {
  if (typeof window === "undefined") {
    return {
      getItem: () => null,
      setItem: () => {},
      removeItem: () => {},
    };
  }
  return {
    getItem: (k: string) => localStorage.getItem(k),
    setItem: (k: string, v: string) => {
      if (!persistReady) return;
      localStorage.setItem(k, v);
    },
    removeItem: (k: string) => localStorage.removeItem(k),
  };
});

export const useCsnStore = create<CsnStore>()(
  persist(
    (set, get) => ({
      ...INITIAL,
      session: null,
      pendingUnlocks: [],
      hydrated: false,
      hydrateDay: () => {
        const n = get();
        const r = todayKey();
        const i: Partial<CsnStore> = { ...streakPatch(n) };
        if (n.daily.date !== r) i.daily = makeDaily(r);
        if (n.todayXpDate !== r) {
          i.todayXp = 0;
          i.todayXpDate = r;
        }
        if (Object.keys(i).length) set(i);
      },
      setLang: (lang) => set({ lang }),
      setTheme: (theme) => set({ theme }),
      setExamSize: (n) => set({ examSize: Math.min(100, Math.max(30, n)) }),
      setSound: (sound) => set({ sound }),
      setFocus: (focusMode) => set({ focusMode }),
      setAdminMode: (adminMode) => {
        if (adminMode) {
          set({ adminMode: true });
          return;
        }
        const n = get();
        const level = levelFromXp(n.xp);
        let theme = n.theme;
        if (theme === "neon" && level < UNLOCK_AT["neon-theme"]) theme = "dark";
        if (theme === "pro" && level < UNLOCK_AT["pro-dark"]) theme = "dark";
        set({ adminMode: false, theme });
      },
      finishOnboarding: () => set({ onboardingDone: true }),
      addXp: (n) => {
        const r = get();
        const i = applyStreak(n, r.streak);
        const a = levelFromXp(r.xp);
        const o = r.xp + i;
        const c = levelFromXp(o);
        const l = unlocksBetween(a, c);
        const u = todayKey();
        set({
          xp: o,
          totalXp: r.totalXp + i,
          todayXp: r.todayXpDate === u ? r.todayXp + i : i,
          todayXpDate: u,
          pendingUnlocks: [...get().pendingUnlocks, ...l],
        });
        return { gained: i, newUnlocks: l };
      },
      startExam: (mode, opts) => {
        get().hydrateDay();
        const i = get();
        const a = unlockLevel(i.xp, i.adminMode);
        let o = opts?.size ?? (mode === "marathon" ? 200 : mode === "challenge" ? 20 : i.examSize);
        if (mode === "mock" && !hasFeature(a, "custom-size")) o = 30;
        if (mode === "speed") o = Math.min(o, 40);
        if (mode === "hardcore") o = 30;
        if (mode === "elite") o = 30;
        const s =
          opts?.ids ??
          pickQuestionIds({ mode, size: o, module: opts?.module, wrongIds: i.wrongIds });
        const c = Date.now();
        set({
          session: {
            mode,
            module: opts?.module,
            questionIds: s,
            index: 0,
            answers: [],
            startedAt: c,
            questionStartedAt: c,
            paused: false,
            pauseStartedAt: 0,
            pausedMs: 0,
          },
        });
      },
      selectAnswer: (chosen, timedOut = false) => {
        const i = get();
        const a = i.session;
        if (!a) throw new Error("no session");
        const o = a.questionIds[a.index];
        const s = getQuestion(o);
        const c = loc(s, i.lang).correct;
        const l = !timedOut && chosen === c;
        const u = Date.now() - a.questionStartedAt - a.pausedMs;
        const d = { questionId: o, chosen: timedOut ? -1 : chosen, correct: l, timeMs: u };
        const f = { ...i.questionStats };
        const p = f[o] ?? { seen: 0, correct: 0, wrong: 0, lastMs: 0 };
        f[o] = {
          seen: p.seen + 1,
          correct: p.correct + +!!l,
          wrong: p.wrong + +!l,
          lastMs: u,
        };
        const m = { ...i.moduleStats };
        const h = { ...m[s.module] };
        h.answered += 1;
        h.correct += +!!l;
        h.timeMs += u;
        m[s.module] = h;
        let g = i.wrongIds.filter((id) => id !== o);
        if (!l) g = [o, ...g].slice(0, 500);
        let _ = 0;
        if (l) {
          _ += 10;
          if (u < 20000) _ += 5;
        }
        const v = levelFromXp(i.xp);
        const y = applyStreak(_, i.streak);
        const b = i.xp + y;
        const x = i.totalXp + y;
        const S = levelFromXp(b);
        const C = unlocksBetween(v, S);
        let w = i.daily;
        if (!w.completed && w.kind === "correct20" && l) {
          const e = Math.min(w.target, w.progress + 1);
          w = { ...w, progress: e, completed: e >= w.target };
        }
        const T = todayKey();
        const E: Partial<CsnStore> = {
          questionStats: f,
          moduleStats: m,
          wrongIds: g,
          xp: b,
          totalXp: x,
          todayXp: i.todayXpDate === T ? i.todayXp + y : y,
          todayXpDate: T,
          totalTimeMs: i.totalTimeMs + u,
          daily: w,
        };
        const D = newBadges({
          questionStats: f,
          examHistory: i.examHistory,
          streak: i.streak,
          moduleStats: m,
          achievements: i.achievements,
          xp: b,
        });
        let O = 0;
        if (D.length) {
          E.achievements = [...i.achievements, ...D];
          for (const e of D) O += BADGE_XP[e] ?? 0;
        }
        if (O) {
          E.xp = b + O;
          E.totalXp = x + O;
        }
        set({
          ...E,
          session: { ...a, answers: [...a.answers, d], pausedMs: 0 },
          pendingUnlocks: [...i.pendingUnlocks, ...C, ...D],
        });
        if (w.completed && !i.daily.completed) get().addXp(w.xp);
        return { record: d, leveled: C };
      },
      nextQuestion: () => {
        const n = get().session;
        if (n)
          set({
            session: {
              ...n,
              index: n.index + 1,
              questionStartedAt: Date.now(),
              paused: false,
              pausedMs: 0,
            },
          });
      },
      togglePause: () => {
        const n = get().session;
        if (!n) return;
        if (n.paused) {
          const t = Date.now() - n.pauseStartedAt;
          set({ session: { ...n, paused: false, pausedMs: n.pausedMs + t, pauseStartedAt: 0 } });
        } else {
          set({ session: { ...n, paused: true, pauseStartedAt: Date.now() } });
        }
      },
      abortExam: () => set({ session: null }),
      finishExam: () => {
        const n = get();
        const r = n.session;
        if (!r) return null;
        const i = r.answers.filter((e) => e.correct).length;
        const a = r.answers.length;
        const o = a - i;
        const s = r.mode === "hardcore" ? o === 0 : o <= allowedWrong(Math.max(a, 1));
        let c = 100;
        if (r.mode === "mistakes") c = 150;
        if (r.mode === "marathon") c = 250;
        if (r.mode === "elite") c = 180;
        if (s && i === a && a >= 10) c += 200;
        if (!s) c = Math.round(c * 0.35);
        const l = applyStreak(c, n.streak);
        const u: ExamResult = {
          id: `${r.startedAt}`,
          mode: r.mode,
          startedAt: r.startedAt,
          finishedAt: Date.now(),
          size: a,
          correct: i,
          passed: s,
          xpEarned: l,
          answers: r.answers,
          questionIds: r.questionIds,
        };
        let d = n.daily;
        if (
          !d.completed &&
          ((d.kind === "mock" && r.mode === "mock") ||
            (d.kind === "mistakes" && r.mode === "mistakes") ||
            (d.kind === "score80" && a && i / a >= 0.8) ||
            (d.kind === "fast20" && u.finishedAt - u.startedAt < 1200000))
        ) {
          d = { ...d, progress: 1, completed: true };
        }
        const f = [u, ...n.examHistory].slice(0, 50);
        const p = levelFromXp(n.xp);
        const m = n.xp + l;
        const h = levelFromXp(m);
        const g = unlocksBetween(p, h);
        const _: Partial<CsnStore> = {
          xp: m,
          totalXp: n.totalXp + l,
          todayXp: n.todayXp + l,
          examHistory: f,
          lastExam: u,
          daily: d,
        };
        const v = newBadges({ ...n, ..._, achievements: n.achievements } as typeof n);
        if (v.length) _.achievements = [...n.achievements, ...v];
        set({
          ..._,
          session: null,
          pendingUnlocks: [...n.pendingUnlocks, ...g, ...v],
        });
        if (d.completed && !n.daily.completed) get().addXp(d.xp);
        return u;
      },
      resetAll: () =>
        set({
          ...INITIAL,
          daily: makeDaily(todayKey()),
          todayXpDate: todayKey(),
          session: null,
          pendingUnlocks: [],
          moduleStats: emptyModules(),
        }),
      dismissUnlocks: () => set({ pendingUnlocks: [] }),
    }),
    {
      name: "csnplus-v1",
      skipHydration: true,
      storage: guardedStorage,
      partialize: (e) => ({
        lang: e.lang,
        theme: e.theme,
        examSize: e.examSize,
        sound: e.sound,
        focusMode: e.focusMode,
        adminMode: e.adminMode,
        onboardingDone: e.onboardingDone,
        xp: e.xp,
        totalXp: e.totalXp,
        lastActiveDate: e.lastActiveDate,
        streak: e.streak,
        bestStreak: e.bestStreak,
        wrongIds: e.wrongIds,
        moduleStats: e.moduleStats,
        questionStats: e.questionStats,
        achievements: e.achievements,
        examHistory: e.examHistory,
        lastExam: e.lastExam,
        daily: e.daily,
        totalTimeMs: e.totalTimeMs,
        todayXp: e.todayXp,
        todayXpDate: e.todayXpDate,
      }),
    },
  ),
);

export const questionCount = QUESTIONS.length;

let hydrateStarted = false;

export function hydrateCsnStore() {
  if (hydrateStarted) return Promise.resolve();
  hydrateStarted = true;
  return Promise.resolve(useCsnStore.persist.rehydrate()).then(() => {
    persistReady = true;
    useCsnStore.setState({ hydrated: true });
    useCsnStore.getState().hydrateDay();
  });
}
