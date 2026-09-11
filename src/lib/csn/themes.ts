import type { ThemeId } from "./types";

/** Visual worlds for existing ThemeId values. Names in UI stay locked i18n. */
export const THEME_HERO: Record<ThemeId, string> = {
  dark: "/themes/dark.jpg",
  neon: "/themes/neon.jpg",
  pro: "/themes/pro.jpg",
  basic: "/themes/basic.jpg",
};

export const THEME_BOOT = `try{var r=localStorage.getItem("csnplus-v1");if(r){var s=JSON.parse(r).state;if(s&&s.theme)document.documentElement.dataset.theme=s.theme;if(s&&s.lang)document.documentElement.lang=s.lang}}catch(e){}`;
