import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Play } from "lucide-react";
import { useEffect, useState } from "react";
import { CsnButton } from "@/components/csn/button";
import { Chip, ProgressRail } from "@/components/csn/panel";
import { ThemeHero } from "@/components/csn/hero";
import { Shell } from "@/components/csn/shell";
import { Splash, markSplashDone, splashDone } from "@/components/csn/splash";
import { fill, t } from "@/lib/csn/i18n";
import { questionCount, useCsnStore } from "@/lib/csn/store";
import { hasFeature, levelProgress, unlockLevel } from "@/lib/csn/xp";
import { MODULES } from "@/lib/csn/types";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const nav = useNavigate();
  const lang = useCsnStore((s) => s.lang);
  const xp = useCsnStore((s) => s.xp);
  const adminMode = useCsnStore((s) => s.adminMode);
  const streak = useCsnStore((s) => s.streak);
  const daily = useCsnStore((s) => s.daily);
  const lastExam = useCsnStore((s) => s.lastExam);
  const moduleStats = useCsnStore((s) => s.moduleStats);
  const startExam = useCsnStore((s) => s.startExam);
  const finishOnboarding = useCsnStore((s) => s.finishOnboarding);
  const copy = t(lang);
  const unlock = unlockLevel(xp, adminMode);
  const progress = levelProgress(xp);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    if (splashDone()) setShowSplash(false);
  }, []);

  const weak = [...MODULES]
    .map((m) => {
      const st = moduleStats[m];
      return { m, ratio: st.answered ? st.correct / st.answered : 0, answered: st.answered };
    })
    .sort((a, b) => a.ratio - b.ratio || a.answered - b.answered)[0];

  return (
    <>
      <Shell cinematic>
        <ThemeHero className="-mx-4 -mt-[4.35rem] h-[min(52vh,420px)] min-h-[300px]" energy>
          <div className="flex h-full flex-col justify-end px-4 pb-5">
            <div className="flex items-end justify-between gap-3">
              <div>
                <div className="text-[11px] font-medium text-[var(--csn-text-3)]">
                  {copy.level} {progress.level}
                </div>
                <div className="mt-1 font-display text-[28px] tabular text-[var(--csn-text-1)]">
                  {progress.into}
                  <span className="text-[16px] font-medium text-[var(--csn-text-3)]">
                    {" "}
                    / {progress.need} XP
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-[11px] font-medium text-[var(--csn-text-4)]">{copy.streak}</div>
                <div className="mt-1 font-display text-[22px] tabular">{streak} {copy.days}</div>
              </div>
            </div>
            <div className="mt-3">
              <ProgressRail value={progress.pct} />
            </div>
            {hasFeature(unlock, "daily-challenge") ? (
              <div className="mt-3 flex items-center justify-between gap-3 text-[13px] text-[var(--csn-text-3)]">
                <span>
                  {copy.dailyChallenge}
                  {" · "}
                  {copy.challengeKinds[daily.kind]}
                </span>
                <span className="tabular text-[var(--csn-gold)]">
                  {daily.completed ? copy.completed : `${daily.progress}/${daily.target}`}
                </span>
              </div>
            ) : (
              <p className="mt-3 text-[12px] text-[var(--csn-text-4)]">
                {fill(copy.unlockAt, { level: 3 })} · {copy.dailyChallenge}
              </p>
            )}
          </div>
        </ThemeHero>

        <div className="space-y-5 pt-5">
          <CsnButton
            className="w-full"
            onClick={() => {
              startExam("mock", { size: 30 });
              void nav({ to: "/play" });
            }}
          >
            <Play className="size-5" />
            {copy.start30}
          </CsnButton>

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              className="rounded-[16px] px-4 py-3 text-left panel-graphite"
              onClick={() => nav({ to: "/learn" })}
            >
              <div className="text-[11px] font-medium text-[var(--csn-text-4)]">{copy.learnPath}</div>
              <div className="mt-1 text-[14px] font-medium">{copy.learn}</div>
              <div className="mt-1 text-[12px] text-[var(--csn-text-3)]">
                {questionCount} {copy.questions}
              </div>
            </button>
            <button
              type="button"
              className="rounded-[16px] px-4 py-3 text-left panel-graphite"
              onClick={() => nav({ to: "/exam" })}
            >
              <div className="text-[11px] font-medium text-[var(--csn-text-4)]">{copy.modes}</div>
              <div className="mt-1 text-[14px] font-medium">{copy.mockExam}</div>
              <div className="mt-1 text-[12px] text-[var(--csn-text-3)]">{copy.officialHint}</div>
            </button>
          </div>

          {lastExam || (weak && weak.answered > 0) ? (
            <div className="space-y-3">
              {lastExam ? (
                <button
                  type="button"
                  className="flex w-full items-center justify-between rounded-[16px] px-4 py-3 text-left panel-graphite"
                  onClick={() => nav({ to: "/results" })}
                >
                  <div>
                    <div className="text-[11px] text-[var(--csn-text-4)]">{copy.lastResult}</div>
                    <div className="mt-1 text-[20px] font-semibold tabular">
                      {lastExam.correct}/{lastExam.size}
                    </div>
                  </div>
                  <Chip tone={lastExam.passed ? "success" : "danger"}>
                    {lastExam.passed ? copy.pass : copy.fail}
                  </Chip>
                </button>
              ) : null}
              {weak && weak.answered > 0 ? (
                <div className="flex items-center justify-between gap-3 px-1">
                  <div>
                    <div className="text-[11px] text-[var(--csn-text-4)]">{copy.recommended}</div>
                    <div className="mt-0.5 text-[14px] font-medium">{copy.modules[weak.m].name}</div>
                  </div>
                  <CsnButton
                    variant="tertiary"
                    className="text-[var(--csn-blue)]"
                    onClick={() => nav({ to: "/learn/$moduleId", params: { moduleId: weak.m } })}
                  >
                    {copy.startModule}
                  </CsnButton>
                </div>
              ) : null}
            </div>
          ) : null}
        </div>
      </Shell>
      {showSplash ? (
        <Splash
          lang={lang}
          onDismiss={() => {
            markSplashDone();
            finishOnboarding();
            setShowSplash(false);
          }}
        />
      ) : null}
    </>
  );
}
