import { createFileRoute } from "@tanstack/react-router";
import { Award, Lock } from "lucide-react";
import { Chip, ListGroup, ListItem } from "@/components/csn/panel";
import { Shell } from "@/components/csn/shell";
import { t } from "@/lib/csn/i18n";
import { useCsnStore } from "@/lib/csn/store";
import { BADGE_ORDER } from "@/lib/csn/types";

export const Route = createFileRoute("/achievements")({ component: AchievementsPage });

function AchievementsPage() {
  const lang = useCsnStore((s) => s.lang);
  const achievements = useCsnStore((s) => s.achievements);
  const copy = t(lang);
  const have = new Set(achievements);

  return (
    <Shell>
      <div className="space-y-4">
        <h1 className="font-display text-[28px]">{copy.achievements}</h1>
        <ListGroup>
          {BADGE_ORDER.map((id) => {
            const unlocked = have.has(id);
            const meta = copy.badgeList[id];
            return (
              <ListItem key={id} className={`!items-start ${unlocked ? "" : "opacity-70"}`}>
                {unlocked ? (
                  <Award className="mt-0.5 size-5 shrink-0 text-[var(--csn-gold)]" />
                ) : (
                  <Lock className="mt-0.5 size-5 shrink-0 text-[var(--csn-text-4)]" />
                )}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-medium">{meta.name}</span>
                    {unlocked ? <Chip tone="gold">{copy.completed}</Chip> : <Chip>{copy.locked}</Chip>}
                  </div>
                  <p className="mt-1 text-[14px] text-[var(--csn-text-3)]">{meta.desc}</p>
                </div>
              </ListItem>
            );
          })}
        </ListGroup>
      </div>
    </Shell>
  );
}
