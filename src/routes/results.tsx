import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { CsnButton } from "@/components/csn/button";
import { Chip, Panel } from "@/components/csn/panel";
import { QuestionVisual } from "@/components/csn/question-visual";
import { Shell } from "@/components/csn/shell";
import { fill, t } from "@/lib/csn/i18n";
import { getQuestion } from "@/lib/csn/questions";
import { useCsnStore } from "@/lib/csn/store";
import { allowedWrong, formatDuration, hasFeature, unlockLevel } from "@/lib/csn/xp";

export const Route = createFileRoute("/results")({ component: ResultsPage });

function ResultsPage() {
  const nav = useNavigate();
  const lang = useCsnStore((s) => s.lang);
  const lastExam = useCsnStore((s) => s.lastExam);
  const startExam = useCsnStore((s) => s.startExam);
  const xp = useCsnStore((s) => s.xp);
  const adminMode = useCsnStore((s) => s.adminMode);
  const copy = t(lang);
  const [wrongOnly, setWrongOnly] = useState(true);
  const level = unlockLevel(xp, adminMode);

  if (!lastExam) {
    return (
      <Shell>
        <Panel>
          <p className="text-[14px] text-[var(--csn-text-3)]">{copy.emptyHistory}</p>
          <CsnButton className="mt-4" onClick={() => nav({ to: "/exam" })}>
            {copy.startExam}
          </CsnButton>
        </Panel>
      </Shell>
    );
  }

  const pct = lastExam.size ? Math.round((lastExam.correct / lastExam.size) * 100) : 0;
  const rows = wrongOnly ? lastExam.answers.filter((a) => !a.correct) : lastExam.answers;

  return (
    <Shell>
      <div className="space-y-4">
        <div className="text-center">
          <Chip tone={lastExam.passed ? "success" : "danger"}>{lastExam.passed ? copy.pass : copy.fail}</Chip>
          <h1 className="mt-3 font-display text-[32px] tabular">{pct}%</h1>
          <p className="mt-2 text-[14px] text-[var(--csn-text-3)]">
            {lastExam.correct}/{lastExam.size} · {fill(copy.passNeed, { n: allowedWrong(lastExam.size) })}
          </p>
          <p className="mt-1 text-[14px] text-[var(--csn-text-3)]">
            {copy.time}: {formatDuration(lastExam.finishedAt - lastExam.startedAt)} · +{lastExam.xpEarned} XP
          </p>
          <p className="mt-3 text-[14px]">{lastExam.passed ? copy.passedBody : copy.failedBody}</p>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <CsnButton
            onClick={() => {
              startExam(lastExam.mode === "replay" ? "mock" : lastExam.mode, { size: lastExam.size });
              void nav({ to: "/play" });
            }}
          >
            {copy.retry}
          </CsnButton>
          <CsnButton variant="secondary" onClick={() => nav({ to: "/" })}>
            {copy.homeBtn}
          </CsnButton>
        </div>
        <div className="flex gap-2">
          <CsnButton variant="choice" selected={!wrongOnly} onClick={() => setWrongOnly(false)}>
            {copy.filterAll}
          </CsnButton>
          <CsnButton variant="choice" selected={wrongOnly} onClick={() => setWrongOnly(true)}>
            {copy.filterWrong}
          </CsnButton>
        </div>
        <div className="space-y-3">
          {rows.map((ans, i) => {
            const q = getQuestion(ans.questionId);
            const loc = q[lang];
            return (
              <Panel key={`${ans.questionId}-${i}`}>
                <div className="flex items-center justify-between">
                  <Chip tone={ans.correct ? "success" : "danger"}>{ans.correct ? copy.correct : copy.wrong}</Chip>
                  <span className="text-[12px] text-[var(--csn-text-4)]">{q.rule}</span>
                </div>
                <div className="mt-3">
                  <QuestionVisual visual={q.visual} />
                </div>
                <p className="mt-3 text-[14px] font-medium">{loc.q}</p>
                <ul className="mt-2 space-y-1 text-[14px]">
                  {loc.options.map((opt, n) => (
                    <li
                      key={n}
                      className={
                        n === loc.correct
                          ? "text-[var(--csn-green)]"
                          : n === ans.chosen && n !== loc.correct
                            ? "text-[var(--csn-red)]"
                            : "text-[var(--csn-text-2)]"
                      }
                    >
                      {String.fromCharCode(65 + n)}. {opt}
                      {n === ans.chosen ? ` · ${copy.youChose}` : null}
                      {n === loc.correct ? ` · ${copy.rightAnswer}` : null}
                    </li>
                  ))}
                </ul>
                <p className="mt-3 text-[14px] text-[var(--csn-text-3)]">{loc.explain}</p>
                {hasFeature(level, "mistake-insights") && !ans.correct ? (
                  <p className="mt-2 text-[12px] text-[var(--csn-blue)]">
                    {copy.insights}: {copy.modules[q.module].name}
                  </p>
                ) : null}
              </Panel>
            );
          })}
          {rows.length === 0 ? <p className="text-[14px] text-[var(--csn-text-3)]">{copy.perfect}</p> : null}
        </div>
      </div>
    </Shell>
  );
}
