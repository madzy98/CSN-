import { useEffect, useRef } from "react";
import { CsnMark } from "./logo";
import { ThemeHero } from "./hero";
import { t } from "@/lib/csn/i18n";
import type { Lang } from "@/lib/csn/types";

const KEY = "csn-splash-done";

export function splashDone(): boolean {
  try {
    return sessionStorage.getItem(KEY) === "1";
  } catch {
    return false;
  }
}

export function markSplashDone() {
  try {
    sessionStorage.setItem(KEY, "1");
  } catch {
    /* ignore */
  }
}

export function Splash({ lang, onDismiss }: { lang: Lang; onDismiss: () => void }) {
  const copy = t(lang);
  const once = useRef(false);
  const go = () => {
    if (once.current) return;
    once.current = true;
    onDismiss();
  };
  useEffect(() => {
    const id = window.setTimeout(go, 2200);
    return () => window.clearTimeout(id);
  }, []);
  return (
    <button
      type="button"
      data-no-press
      className="fixed inset-0 z-[100] flex cursor-pointer flex-col bg-[var(--csn-bg-0)] text-left"
      style={{ touchAction: "manipulation", WebkitTapHighlightColor: "transparent", zIndex: 2147483000 }}
      onClick={go}
      aria-label={copy.skipSplash}
    >
      <ThemeHero className="h-full w-full" energy>
        <div className="flex h-full flex-col justify-end px-6 pb-[max(2.5rem,env(safe-area-inset-bottom))] pt-[max(2rem,env(safe-area-inset-top))]">
          <div className="pointer-events-none splash-in">
            <div className="flex items-center gap-3">
              <CsnMark size={44} />
              <div>
                <div className="font-display text-[32px] leading-none tracking-tight">CSN+</div>
                <div className="mt-1 text-[13px] text-[var(--csn-text-3)]">{copy.tagline}</div>
              </div>
            </div>
            <span className="control-body mt-8 inline-flex h-14 min-w-[13rem] items-center justify-center rounded-[16px] px-8 text-base font-medium">
              {copy.skipSplash}
            </span>
            <span className="mt-3 block text-[12px] text-[var(--csn-text-4)]">{copy.splashTap}</span>
          </div>
        </div>
      </ThemeHero>
    </button>
  );
}
