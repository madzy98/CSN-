import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Pause, Play, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { CsnAnswer } from "@/components/csn/answer";
import { CsnButton } from "@/components/csn/button";
import { Panel } from "@/components/csn/panel";
import { QuestionVisual } from "@/components/csn/question-visual";
import { fill, t } from "@/lib/csn/i18n";
import { getQuestion, loc as questionText } from "@/lib/csn/questions";
import { useCsnStore } from "@/lib/csn/store";
import { formatClock, questionSeconds } from "@/lib/csn/xp";

export const Route = createFileRoute("/play")({ component: PlayPage });

function PlayPage() {
  const nav = useNavigate();
  const lang = useCsnStore((s) => s.lang);
  const session = useCsnStore((s) => s.session);
  const focusMode = useCsnStore((s) => s.focusMode);
  const selectAnswer = useCsnStore((s) => s.selectAnswer);
  const nextQuestion = useCsnStore((s) => s.nextQuestion);
  const togglePause = useCsnStore((s) => s.togglePause);
  const abortExam = useCsnStore((s) => s.abortExam);
  const finishExam = useCsnStore((s) => s.finishExam);
  const copy = t(lang);
  const [chosen, setChosen] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [quitOpen, setQuitOpen] = useState(false);
  const [now, setNow] = useState(Date.now());
  const [timedOut, setTimedOut] = useState(false);
  const explainRef = useRef<HTMLDivElement>(null);
  const finishing = useRef(false);

  useEffect(() => {
    if (!session && !finishing.current) void nav({ to: "/exam" });
  }, [session, nav]);

  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 200);
    return () => window.clearInterval(id);
  }, []);

  const qid = session?.questionIds[session.index];
  const question = qid ? getQuestion(qid) : null;
  const loc = question ? questionText(question, lang) : null;
  const limit = session ? questionSeconds(session.mode) * 1000 : 60000;
  const elapsed = session
    ? session.paused
      ? session.pauseStartedAt - session.questionStartedAt - session.pausedMs
      : now - session.questionStartedAt - session.pausedMs
    : 0;
  const remain = Math.max(0, limit - elapsed);

  useEffect(() => {
    setChosen(null);
    setRevealed(false);
    setTimedOut(false);
  }, [qid]);

  useEffect(() => {
    if (session && !session.paused && !revealed && question) {
      if (session.answers.length > session.index) return;
      if (remain <= 0) {
        setTimedOut(true);
        setRevealed(true);
        selectAnswer(-1, true);
      }
    }
  }, [remain, session, revealed, question, selectAnswer]);

  useEffect(() => {
    if (revealed) explainRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [revealed]);

  if (!session || !question || !loc) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-[var(--csn-bg-0)] text-[var(--csn-text-3)]">
        {copy.selectAnswer}
      </div>
    );
  }

  const total = session.questionIds.length;
  const n = session.index + 1;
  const last = session.index >= session.questionIds.length - 1 && revealed;

  function pick(i: number) {
    if (revealed || session!.paused) return;
    setChosen(i);
    setRevealed(true);
    selectAnswer(i);
  }

  function goNext() {
    if (session!.index >= session!.questionIds.length - 1) {
      finishing.current = true;
      finishExam();
      void nav({ to: "/results" });
      return;
    }
    nextQuestion();
  }

  return (
    <div className="flex min-h-dvh bg-[var(--csn-bg-0)] text-[var(--csn-text-1)]">
      <div className={`mx-auto flex min-h-dvh w-full max-w-lg flex-col ${focusMode ? "bg-[var(--csn-bg-0)]" : ""}`}>
        <header className="sticky top-0 z-10 flex items-center gap-2 border-b border-[var(--csn-hairline)] glass-bar px-3 py-2 pt-[max(0.5rem,env(safe-area-inset-top))]">
          <CsnButton variant="icon" onClick={() => setQuitOpen(true)} aria-label={copy.quit}>
            <X className="size-5" />
          </CsnButton>
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between text-[12px] text-[var(--csn-text-3)]">
              <span>{fill(copy.questionOf, { n, total })}</span>
              <span className={`tabular ${remain < 10000 ? "text-[var(--csn-red)]" : "text-[var(--csn-blue)]"}`}>
                {formatClock(remain)}
              </span>
            </div>
            <div className="mt-1 h-1 overflow-hidden rounded-full bg-[var(--csn-surface-3)]">
              <div
                className="h-full transition-[width] duration-200"
                style={{
                  width: `${Math.max(0, (remain / limit) * 100)}%`,
                  background: remain < 10000 ? "var(--csn-red)" : "var(--csn-blue)",
                }}
              />
            </div>
          </div>
          <CsnButton
            variant="icon"
            onClick={togglePause}
            aria-label={session.paused ? copy.resume : copy.pause}
          >
            {session.paused ? <Play className="size-5" /> : <Pause className="size-5" />}
          </CsnButton>
        </header>

        <div className="flex-1 space-y-4 overflow-y-auto px-4 py-4">
          <QuestionVisual visual={question.visual} />
          <h1 className="text-[18px] font-semibold leading-snug">{loc.q}</h1>
          <div className="space-y-2">
            {loc.options.map((opt, i) => {
              let state: "idle" | "selected" | "correct" | "incorrect" | "locked" = "idle";
              if (revealed) {
                if (i === loc.correct) state = "correct";
                else if (i === chosen) state = "incorrect";
                else state = "locked";
              }
              return (
                <CsnAnswer
                  key={i}
                  label={opt}
                  index={i}
                  state={state}
                  disabled={revealed || session.paused}
                  onSelect={() => pick(i)}
                />
              );
            })}
          </div>
          {revealed ? (
            <div ref={explainRef} className="rounded-[16px] bg-[var(--csn-surface-2)] p-4">
              <p
                className={`mb-2 text-[14px] font-medium ${
                  timedOut || chosen !== loc.correct ? "text-[var(--csn-red)]" : "text-[var(--csn-green)]"
                }`}
              >
                {timedOut ? copy.timedOut : chosen === loc.correct ? copy.correct : copy.wrong}
              </p>
              <p className="text-[12px] font-medium text-[var(--csn-text-4)]">
                {copy.explanation}
              </p>
              <p className="mt-2 text-[14px] leading-relaxed text-[var(--csn-text-2)]">{loc.explain}</p>
            </div>
          ) : null}
        </div>

        <div className="border-t border-[var(--csn-hairline)] px-4 py-3 pb-[max(1.25rem,calc(env(safe-area-inset-bottom)+1.25rem))]">
          <CsnButton className="w-full" disabled={!revealed} onClick={goNext}>
            {last ? copy.resultsTitle : copy.next}
          </CsnButton>
        </div>

        {session.paused ? (
          <div className="fixed inset-0 z-30 flex items-center justify-center bg-[var(--csn-bg-0)]/80 px-6">
            <Panel className="w-full max-w-sm p-6 text-center">
              <h2 className="font-display text-[22px]">{copy.pause}</h2>
              <CsnButton className="mt-6 w-full" onClick={togglePause}>
                {copy.resume}
              </CsnButton>
            </Panel>
          </div>
        ) : null}

        {quitOpen ? (
          <div className="fixed inset-0 z-40 flex items-center justify-center bg-[var(--csn-bg-0)]/80 px-6">
            <Panel className="w-full max-w-sm p-6">
              <h2 className="font-display text-[20px]">{copy.quit}</h2>
              <p className="mt-2 text-[14px] text-[var(--csn-text-3)]">{copy.quitConfirm}</p>
              <div className="mt-5 grid grid-cols-2 gap-2">
                <CsnButton variant="tertiary" onClick={() => setQuitOpen(false)}>
                  {copy.cancel}
                </CsnButton>
                <CsnButton
                  variant="danger"
                  onClick={() => {
                    abortExam();
                    void nav({ to: "/exam" });
                  }}
                >
                  {copy.quit}
                </CsnButton>
              </div>
            </Panel>
          </div>
        ) : null}
      </div>
    </div>
  );
}
