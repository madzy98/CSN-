import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ChevronRight, Lock } from "lucide-react";
import { Shell } from "@/components/csn/shell";
import { ListGroup, ListRow, ProgressRail } from "@/components/csn/panel";
import { fill, t } from "@/lib/csn/i18n";
import { questionsForModule } from "@/lib/csn/questions";
import { useCsnStore } from "@/lib/csn/store";
import { MODULES, MODULE_FEATURE, UNLOCK_AT } from "@/lib/csn/types";
import { hasFeature, unlockLevel } from "@/lib/csn/xp";

export const Route = createFileRoute("/learn/")({ component: Learn });

function Learn() {
  const nav = useNavigate();
  const lang = useCsnStore((s) => s.lang);
  const stats = useCsnStore((s) => s.moduleStats);
  const xp = useCsnStore((s) => s.xp);
  const adminMode = useCsnStore((s) => s.adminMode);
  const copy = t(lang);
  const level = unlockLevel(xp, adminMode);

  return (
    <Shell>
      <div className="space-y-4">
        <h1 className="font-display text-[28px]">{copy.learnPath}</h1>
        <ListGroup>
          {MODULES.map((id) => {
            const st = stats[id];
            const total = questionsForModule(id).length;
            const ratio = st.answered ? st.correct / st.answered : 0;
            const feat = MODULE_FEATURE[id];
            const locked = feat ? !hasFeature(level, feat) : false;
            return (
              <ListRow
                key={id}
                disabled={locked}
                onClick={() => nav({ to: "/learn/$moduleId", params: { moduleId: id } })}
                className="!items-start py-4"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-[16px] font-semibold">{copy.modules[id].name}</div>
                      <p className="mt-1 text-[14px] text-[var(--csn-text-3)]">{copy.modules[id].blurb}</p>
                    </div>
                    {locked ? (
                      <Lock className="size-4 shrink-0 text-[var(--csn-text-4)]" />
                    ) : (
                      <ChevronRight className="size-4 shrink-0 text-[var(--csn-text-4)]" />
                    )}
                  </div>
                  {locked && feat ? (
                    <p className="mt-3 text-[12px] text-[var(--csn-text-4)]">
                      {fill(copy.unlockAt, { level: UNLOCK_AT[feat] })}
                    </p>
                  ) : (
                    <div className="mt-3">
                      <div className="mb-1 flex justify-between text-[12px] text-[var(--csn-text-3)]">
                        <span>
                          {copy.mastery} {Math.round(ratio * 100)}%
                        </span>
                        <span>
                          {st.answered}/{total}
                        </span>
                      </div>
                      <ProgressRail value={ratio} />
                    </div>
                  )}
                </div>
              </ListRow>
            );
          })}
        </ListGroup>
      </div>
    </Shell>
  );
}
