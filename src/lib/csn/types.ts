export type Lang = "lv" | "en";
export type ThemeId = "basic" | "dark" | "neon" | "pro";

export const MODULES = [
  "signs",
  "markings",
  "priority",
  "speed",
  "vehicle",
  "firstaid",
  "danger",
  "night",
  "weather",
] as const;

export type ModuleId = (typeof MODULES)[number];

export type ExamMode =
  | "mock"
  | "practice"
  | "mistakes"
  | "challenge"
  | "speed"
  | "hardcore"
  | "elite"
  | "marathon"
  | "replay";

export type DailyKind = "correct20" | "mock" | "mistakes" | "score80" | "fast20";

export type FeatureId =
  | "dark-mode"
  | "daily-challenge"
  | "speed-mode"
  | "early-mistakes"
  | "neon-theme"
  | "button-fx"
  | "exam-music"
  | "focus-mode"
  | "pro-stats"
  | "hardcore"
  | "night-pack"
  | "weather-pack"
  | "vehicle-pack"
  | "custom-size"
  | "exam-replay"
  | "mistake-insights"
  | "elite-mode"
  | "dynamic-scenes"
  | "pro-dark"
  | "marathon"
  | "master-badge";

export type BadgeId =
  | "firstSteps"
  | "noFear"
  | "speedDemon"
  | "comeback"
  | "streakMaster"
  | "knowledgeKing"
  | "nightRider"
  | "weatherWarrior"
  | "eliteDriver"
  | "masterDriver";

export type Visual =
  | { type: "none" }
  | { type: "sign"; sign: string }
  | { type: "marking"; marking: string }
  | { type: "scene"; scene: string };

export type LocaleQuestion = {
  q: string;
  options: string[];
  correct: number;
  explain: string;
};

export type Question = {
  id: string;
  module: ModuleId;
  difficulty: number;
  visual: Visual;
  rule: string;
  lv: LocaleQuestion;
  en: LocaleQuestion;
};

export type AnswerRecord = {
  questionId: string;
  chosen: number;
  correct: boolean;
  timeMs: number;
};

export type ExamResult = {
  id: string;
  mode: ExamMode;
  startedAt: number;
  finishedAt: number;
  size: number;
  correct: number;
  passed: boolean;
  xpEarned: number;
  answers: AnswerRecord[];
  questionIds: string[];
};

export type Session = {
  mode: ExamMode;
  module?: ModuleId;
  questionIds: string[];
  index: number;
  answers: AnswerRecord[];
  startedAt: number;
  questionStartedAt: number;
  paused: boolean;
  pauseStartedAt: number;
  pausedMs: number;
};

export type ModuleStat = {
  answered: number;
  correct: number;
  timeMs: number;
  xp: number;
};

export type QuestionStat = {
  seen: number;
  correct: number;
  wrong: number;
  lastMs: number;
};

export type Daily = {
  date: string;
  kind: DailyKind;
  progress: number;
  target: number;
  completed: boolean;
  xp: number;
};

export const UNLOCK_AT: Record<FeatureId, number> = {
  "dark-mode": 2,
  "daily-challenge": 3,
  "speed-mode": 4,
  "early-mistakes": 5,
  "neon-theme": 6,
  "button-fx": 7,
  "exam-music": 8,
  "focus-mode": 9,
  "pro-stats": 10,
  hardcore: 12,
  "night-pack": 15,
  "weather-pack": 18,
  "vehicle-pack": 20,
  "custom-size": 22,
  "exam-replay": 25,
  "mistake-insights": 28,
  "elite-mode": 30,
  "dynamic-scenes": 35,
  "pro-dark": 40,
  marathon: 45,
  "master-badge": 50,
};

export const BADGE_XP: Record<BadgeId, number> = {
  firstSteps: 20,
  noFear: 50,
  speedDemon: 40,
  comeback: 80,
  streakMaster: 100,
  knowledgeKing: 150,
  nightRider: 80,
  weatherWarrior: 80,
  eliteDriver: 200,
  masterDriver: 500,
};

export const BADGE_ORDER: BadgeId[] = [
  "firstSteps",
  "noFear",
  "speedDemon",
  "comeback",
  "streakMaster",
  "knowledgeKing",
  "nightRider",
  "weatherWarrior",
  "eliteDriver",
  "masterDriver",
];

export const MODULE_FEATURE: Partial<Record<ModuleId, FeatureId>> = {
  night: "night-pack",
  weather: "weather-pack",
  vehicle: "vehicle-pack",
};
