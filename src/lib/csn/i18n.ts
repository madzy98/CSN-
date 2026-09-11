import raw from "@/data/i18n.json";
import type { Lang } from "./types";

export type Copy = (typeof raw)["lv"];

export const I18N = raw as { lv: Copy; en: Copy };

export function t(lang: Lang): Copy {
  return I18N[lang];
}

export function fill(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, k: string) => String(vars[k] ?? ""));
}
