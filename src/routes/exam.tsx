import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ChevronRight, Gauge, Infinity as InfinityIcon, RotateCcw, ShieldAlert, Timer } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { CsnButton } from "@/components/csn/button";
import { Chip, ListGroup, ListRow, Panel } from "@/components/csn/panel";
import { Shell } from "@/components/csn/shell";
import { fill, t } from "@/lib/csn/i18n";
import { useCsnStore } from "@/lib/csn/store";
import { UNLOCK_AT, type ExamMode } from "@/lib/csn/types";
import { allowedWrong, hasFeature, unlockLevel } from "@/lib/csn/xp";

export const Route = createFileRoute("/exam")({ component: ExamPage });

function ExamPage() {
  const nav = useNavigate();
  const lang = useCsnStore((s) => s.lang);
  const xp = useCsnStore((s) => s.xp);
  const adminMode = useCsnStore((s) => s.adminMode);
  const examSize = useCsnStore((s) => s.examSize);
  const setExamSize = useCsnStore((s) => s.setExamSize);
  const startExam = useCsnStore((s) => s.startExam);
  const lastExam = useCsnStore((s) => s.lastExam);
  const wrongIds = useCsnStore((s) => s.wrongIds);
  const copy = t(lang);
  const level = unlockLevel(xp, adminMode);

  function go(mode: ExamMode, size?: number) {
    startExam(mode, { size });
    void nav({ to: "/play" });
  }

  const custom = hasFeature(level, "custom-size");
  const needMistakes = hasFeature(level, "early-mistakes") ? 10 : 30;
  const canMistakes = adminMode || wrongIds.length >= needMistakes;

  return (
    <Shell>
      <div className="space-y-5">
        <div>
          <h1 className="font-display text-[28px]">{copy.mockExam}</h1>
          <p className="mt-1 text-[14px] text-[var(--csn-text-3)]">{copy.officialHint}</p>
        </div>

        <Panel>
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">{copy.officialMock}</div>
              <p className="mt-1 text-[14px] text-[var(--csn-text-3)]">{fill(copy.passNeed, { n: allowedWrong(30) })}</p>
            </div>
            <Chip tone="blue">30</Chip>
          </div>
          <CsnButton className="mt-4 w-full" onClick={() => go("mock", 30)}>
            {copy.startExam}
          </CsnButton>
        </Panel>

        <Panel>
          <div className="flex items-center justify-between">
            <div className="font-medium">{copy.examSize}</div>
            {custom ? null : <Chip>{fill(copy.unlockAt, { level: UNLOCK_AT["custom-size"] })}</Chip>}
          </div>
          <input
            type="range"
            min={30}
            max={100}
            step={5}
            disabled={!custom}
            value={custom ? examSize : 30}
            onChange={(e) => setExamSize(Number(e.target.value))}
            className="mt-4 w-full accent-[var(--csn-blue)]"
          />
          <div className="mt-1 text-[14px] tabular text-[var(--csn-text-3)]">
            {custom ? examSize : 30} {copy.questions}
          </div>
          {custom ? (
            <CsnButton variant="secondary" className="mt-3 w-full" onClick={() => go("mock", examSize)}>
              {copy.startExam}
            </CsnButton>
          ) : null}
        </Panel>

        <ListGroup>
          <ModeRow
            icon={Timer}
            title={copy.speedMode}
            hint={copy.speedHint}
            locked={!hasFeature(level, "speed-mode")}
            unlock={UNLOCK_AT["speed-mode"]}
            onClick={() => go("speed", 30)}
            unlockAt={copy.unlockAt}
          />
          <ModeRow
            icon={ShieldAlert}
            title={copy.hardcore}
            hint={copy.hardcoreHint}
            locked={!hasFeature(level, "hardcore")}
            unlock={UNLOCK_AT.hardcore}
            onClick={() => go("hardcore")}
            unlockAt={copy.unlockAt}
          />
          <ModeRow
            icon={Gauge}
            title={copy.elite}
            hint={copy.eliteHint}
            locked={!hasFeature(level, "elite-mode")}
            unlock={UNLOCK_AT["elite-mode"]}
            onClick={() => go("elite")}
            unlockAt={copy.unlockAt}
          />
          <ModeRow
            icon={InfinityIcon}
            title={copy.marathon}
            hint={copy.marathonHint}
            locked={!hasFeature(level, "marathon")}
            unlock={UNLOCK_AT.marathon}
            onClick={() => go("marathon")}
            unlockAt={copy.unlockAt}
          />
          <ModeRow
            icon={RotateCcw}
            title={copy.replay}
            hint={copy.examModes.replay}
            locked={!hasFeature(level, "exam-replay") || !lastExam}
            showUnlock={!hasFeature(level, "exam-replay")}
            unlock={UNLOCK_AT["exam-replay"]}
            onClick={() => {
              if (!lastExam) return;
              startExam("replay", { ids: lastExam.questionIds });
              void nav({ to: "/play" });
            }}
            unlockAt={copy.unlockAt}
          />
          <ListRow disabled={!canMistakes} onClick={() => go("mistakes", wrongIds.length >= 5 ? Math.min(30, wrongIds.length) : 30)}>
            <div className="min-w-0 flex-1">
              <div className="font-medium">{copy.mistakeExam}</div>
              <p className="mt-0.5 text-[13px] text-[var(--csn-text-3)]">
                {canMistakes
                  ? `${wrongIds.length} ${copy.questions}`
                  : fill(copy.needMistakes, { n: needMistakes })}
              </p>
            </div>
            {canMistakes ? <ChevronRight className="size-4 text-[var(--csn-text-4)]" /> : null}
          </ListRow>
        </ListGroup>
      </div>
    </Shell>
  );
}

function ModeRow({
  icon: Icon,
  title,
  hint,
  locked,
  unlock,
  onClick,
  unlockAt,
  showUnlock = true,
}: {
  icon: LucideIcon;
  title: string;
  hint: string;
  locked: boolean;
  unlock: number;
  onClick: () => void;
  unlockAt: string;
  showUnlock?: boolean;
}) {
  return (
    <ListRow disabled={locked} onClick={onClick}>
      <Icon className="size-5 shrink-0 text-[var(--csn-text-3)]" />
      <div className="min-w-0 flex-1">
        <div className="font-medium">{title}</div>
        <p className="mt-0.5 text-[13px] text-[var(--csn-text-3)]">{hint}</p>
      </div>
      {locked && showUnlock ? (
        <Chip>{fill(unlockAt, { level: unlock })}</Chip>
      ) : (
        <ChevronRight className="size-4 shrink-0 text-[var(--csn-text-4)]" />
      )}
    </ListRow>
  );
}
