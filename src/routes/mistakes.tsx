import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { CsnButton } from "@/components/csn/button";
import { ListGroup, ListItem, Panel } from "@/components/csn/panel";
import { Shell } from "@/components/csn/shell";
import { fill, t } from "@/lib/csn/i18n";
import { getQuestion } from "@/lib/csn/questions";
import { useCsnStore } from "@/lib/csn/store";
import { hasFeature, unlockLevel } from "@/lib/csn/xp";

export const Route = createFileRoute("/mistakes")({ component: MistakesPage });

function MistakesPage() {
  const nav = useNavigate();
  const lang = useCsnStore((s) => s.lang);
  const wrongIds = useCsnStore((s) => s.wrongIds);
  const startExam = useCsnStore((s) => s.startExam);
  const xp = useCsnStore((s) => s.xp);
  const adminMode = useCsnStore((s) => s.adminMode);
  const copy = t(lang);
  const need = hasFeature(unlockLevel(xp, adminMode), "early-mistakes") ? 10 : 30;
  const canStart = adminMode || wrongIds.length >= need;

  return (
    <Shell>
      <div className="space-y-4">
        <h1 className="font-display text-[28px]">{copy.mistakes}</h1>
        {wrongIds.length === 0 ? (
          <Panel>
            <p className="text-[14px] text-[var(--csn-text-3)]">{copy.noMistakes}</p>
          </Panel>
        ) : (
          <>
            <p className="text-[14px] text-[var(--csn-text-3)]">
              {wrongIds.length < need
                ? fill(copy.needMistakes, { n: need })
                : `${wrongIds.length} ${copy.questions}`}
            </p>
            <CsnButton
              className="w-full"
              disabled={wrongIds.length < need}
              onClick={() => {
                startExam("mistakes", { size: Math.min(30, wrongIds.length) });
                void nav({ to: "/play" });
              }}
            >
              {copy.mistakeExam}
            </CsnButton>
            <ListGroup>
              {wrongIds.slice(0, 40).map((id) => {
                const q = getQuestion(id);
                return (
                  <ListItem key={id} className="!items-start">
                    <div className="min-w-0">
                      <p className="text-[14px]">{q[lang].q}</p>
                      <p className="mt-1 text-[12px] text-[var(--csn-text-4)]">
                        {copy.modules[q.module].name} · {q.rule}
                      </p>
                    </div>
                  </ListItem>
                );
              })}
            </ListGroup>
          </>
        )}
      </div>
    </Shell>
  );
}
