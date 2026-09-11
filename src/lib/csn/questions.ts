import raw from "@/data/questions.json";
import type { ModuleId, Question } from "./types";

export const QUESTIONS = raw as Question[];

const byId = new Map(QUESTIONS.map((q) => [q.id, q]));

export function getQuestion(id: string): Question {
  const q = byId.get(id);
  if (!q) throw new Error(`Unknown question ${id}`);
  return q;
}

export function questionsForModule(module: ModuleId): Question[] {
  return QUESTIONS.filter((q) => q.module === module);
}

function shuffle<T>(arr: T[], rnd: () => number): T[] {
  const n = [...arr];
  for (let e = n.length - 1; e > 0; e--) {
    const r = Math.floor(rnd() * (e + 1));
    [n[e], n[r]] = [n[r], n[e]];
  }
  return n;
}

export function pickQuestionIds(opts: {
  mode: string;
  size: number;
  module?: ModuleId;
  wrongIds: string[];
}): string[] {
  const rnd = Math.random;
  let pool: Question[] = QUESTIONS;
  if (opts.mode === "practice" && opts.module) pool = questionsForModule(opts.module);
  else if (opts.mode === "mistakes") {
    const set = new Set(opts.wrongIds);
    pool = QUESTIONS.filter((q) => set.has(q.id));
    if (pool.length < 5) pool = QUESTIONS;
  } else if (opts.mode === "elite") {
    pool = QUESTIONS.filter((q) => q.difficulty >= 2);
  } else if (opts.mode === "night-pack") {
    pool = questionsForModule("night");
  }

  const shuffled = shuffle(pool, rnd);
  const ids: string[] = [];
  const seen = new Set<string>();
  for (const q of shuffled) {
    if (seen.has(q.id)) continue;
    ids.push(q.id);
    seen.add(q.id);
    if (ids.length >= opts.size) break;
  }
  if (ids.length < opts.size) {
    for (const q of shuffle(QUESTIONS, rnd)) {
      if (seen.has(q.id)) continue;
      ids.push(q.id);
      seen.add(q.id);
      if (ids.length >= opts.size) break;
    }
  }
  return ids;
}
