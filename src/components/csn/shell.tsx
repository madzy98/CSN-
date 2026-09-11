import { Link, useRouterState } from "@tanstack/react-router";
import { BookOpen, Flag, House, Settings, Trophy } from "lucide-react";
import { useEffect } from "react";
import { t } from "@/lib/csn/i18n";
import { hydrateCsnStore, useCsnStore } from "@/lib/csn/store";
import { levelFromXp } from "@/lib/csn/xp";
import { CsnMark } from "./logo";

const TABS = [
  { to: "/", icon: House, key: "home" as const },
  { to: "/learn", icon: BookOpen, key: "learn" as const },
  { to: "/exam", icon: Flag, key: "exam" as const },
  { to: "/stats", icon: Trophy, key: "stats" as const },
  { to: "/settings", icon: Settings, key: "settings" as const },
];

export function Shell({
  children,
  cinematic = false,
}: {
  children: React.ReactNode;
  cinematic?: boolean;
}) {
  const lang = useCsnStore((s) => s.lang);
  const xp = useCsnStore((s) => s.xp);
  const theme = useCsnStore((s) => s.theme);
  const copy = t(lang);
  const level = levelFromXp(xp);
  const path = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    void hydrateCsnStore();
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dataset.theme = theme;
  }, [lang, theme]);

  return (
    <div className="min-h-dvh bg-[var(--csn-bg-0)] text-[var(--csn-text-1)]">
      <div className="mx-auto flex min-h-dvh w-full max-w-lg flex-col">
        <header
          className={`sticky top-0 z-20 flex items-center justify-between gap-3 px-4 py-3 pt-[max(0.75rem,env(safe-area-inset-top))] ${
            cinematic ? "border-b border-transparent glass-bar" : "border-b border-[var(--csn-hairline)] glass-bar"
          }`}
        >
          <Link to="/" className="min-w-0">
            <div className="flex items-center gap-2.5">
              <CsnMark size={28} />
              <div className="font-display text-[22px] tracking-tight">CSN+</div>
            </div>
          </Link>
          <div className="flex items-center gap-3">
            <div className="text-right leading-tight">
              <div className="text-[11px] font-medium text-[var(--csn-text-4)]">
                {copy.level} {level}
              </div>
              <div className="tabular text-[13px] font-medium text-[var(--csn-gold)]">{xp} XP</div>
            </div>
            <button
              className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[var(--csn-surface-2)] text-[11px] font-medium text-[var(--csn-text-3)]"
              onClick={() => useCsnStore.getState().setLang(lang === "lv" ? "en" : "lv")}
              aria-label={copy.language}
            >
              {lang === "lv" ? "LV" : "EN"}
            </button>
          </div>
        </header>
        <main
          className={`flex-1 px-4 pb-[calc(var(--csn-nav-h)+env(safe-area-inset-bottom)+1.25rem)] ${
            cinematic ? "pt-0" : "pt-5"
          }`}
        >
          {children}
        </main>
        <nav className="fixed inset-x-0 bottom-0 z-20 mx-auto max-w-lg border-t border-[var(--csn-hairline)] glass-bar px-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-1.5">
          <ul className="grid grid-cols-5">
            {TABS.map((tab) => {
              const active = tab.to === "/" ? path === "/" : path.startsWith(tab.to);
              const Icon = tab.icon;
              return (
                <li key={tab.to}>
                  <Link
                    to={tab.to}
                    className={`flex min-h-12 flex-col items-center justify-center gap-0.5 rounded-[8px] text-[11px] font-medium ${
                      active ? "text-[var(--csn-blue)]" : "text-[var(--csn-text-4)]"
                    }`}
                  >
                    <Icon className="size-5" strokeWidth={active ? 2.2 : 1.8} />
                    {copy[tab.key]}
                    {active ? (
                      <span className="h-0.5 w-4 rounded-full bg-[var(--csn-blue)] shadow-[0_0_8px_var(--csn-accent-glow)]" />
                    ) : (
                      <span className="h-0.5 w-4" />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
}
