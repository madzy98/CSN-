import { UNLOCK_AT, type FeatureId } from "./types";

/** Live F(e): XP required to *enter* level e. */
export function xpToEnterLevel(level: number): number {
  if (level <= 1) return 0;
  const t = level - 1;
  return 20 * t * (t + 1) + 60 * t;
}

/** Live I(xp). Levels 1..50. */
export function levelFromXp(xp: number): number {
  let t = 1;
  while (t < 50 && xp >= xpToEnterLevel(t + 1)) t += 1;
  return t;
}

export function levelProgress(xp: number) {
  const level = levelFromXp(xp);
  if (level >= 50) return { level: 50, into: 1, need: 1, pct: 1 };
  const n = xpToEnterLevel(level);
  const r = xpToEnterLevel(level + 1);
  const into = xp - n;
  const need = r - n;
  return { level, into, need, pct: need === 0 ? 1 : into / need };
}

/** Live ee(streak). */
export function streakMult(streak: number): number {
  return streak >= 30 ? 1.5 : streak >= 7 ? 1.2 : streak >= 2 ? 1 + 0.1 * Math.min(streak - 1, 5) : 1;
}

/** Live B(xp, streak). */
export function applyStreak(xp: number, streak: number): number {
  return Math.round(xp * streakMult(streak));
}

/** Live V(n): allowed wrong answers. 30 → 3. */
export function allowedWrong(n: number): number {
  return Math.max(0, Math.floor(n * 0.09999999999999998 + 1e-9));
}

/** Live te(mode): seconds per question. */
export function questionSeconds(mode: string): number {
  return mode === "speed" ? 30 : mode === "hardcore" ? 45 : 60;
}

export function unlockLevel(xp: number, adminMode: boolean): number {
  return adminMode ? 50 : levelFromXp(xp);
}

export function hasFeature(level: number, feature: FeatureId): boolean {
  return level >= UNLOCK_AT[feature];
}

export function formatDuration(ms: number): string {
  const n = Math.max(0, Math.round(ms / 1000));
  return `${Math.floor(n / 60)} min ${n % 60} s`;
}

export function formatClock(ms: number): string {
  const t = Math.max(0, Math.ceil(ms / 1000));
  const m = Math.floor(t / 60);
  const s = t % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export function todayKey(d = new Date()): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export function yesterdayKey(d = new Date()): string {
  const t = new Date(d);
  t.setDate(t.getDate() - 1);
  return todayKey(t);
}

export function mulberry32(seed: number) {
  let t = seed >>> 0;
  return () => {
    t = (t * 1664525 + 1013904223) >>> 0;
    return t / 4294967296;
  };
}
