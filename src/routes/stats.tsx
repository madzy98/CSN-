import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Chip, ListGroup, ListRow, Panel, ProgressRail, TelemetryRing } from "@/components/csn/panel";
import { Shell } from "@/components/csn/shell";
import { t } from "@/lib/csn/i18n";
import { useCsnStore } from "@/lib/csn/store";
import { MODULES } from "@/lib/csn/types";
import { formatDuration, hasFeature, unlockLevel } from "@/lib/csn/xp";

export const Route = createFileRoute("/stats")({ component: StatsPage });

function StatsPage() {
  const nav = useNavigate();
  const lang = useCsnStore((s) => s.lang);
  const history = useCsnStore((s) => s.examHistory);
  const moduleStats = useCsnStore((s) => s.moduleStats);
  const totalTimeMs = useCsnStore((s) => s.totalTimeMs);
  const xp = useCsnStore((s) => s.xp);
  const adminMode = useCsnStore((s) => s.adminMode);
  const achievements = useCsnStore((s) => s.achievements);
  const copy = t(lang);
  const level = unlockLevel(xp, adminMode);
  const pro = hasFeature(level, "pro-stats");
  const avg = history.length
    ? Math.round(history.reduce((a, e) => a + e.correct / Math.max(1, e.size), 0) / history.length * 100)
    : 0;
  const chart = [...history]
    .reverse()
    .slice(-12)
    .map((e, i) => ({ i: i + 1, pct: Math.round((e.correct / Math.max(1, e.size)) * 100) }));
  const ranked = MODULES.map((m) => {
    const st = moduleStats[m];
    return { m, ratio: st.answered ? st.correct / st.answered : -1, answered: st.answered };
  }).sort((a, b) => a.ratio - b.ratio);

  return (
    <Shell>
      <div className="space-y-5">
        <div className="flex items-end justify-between">
          <h1 className="font-display text-[28px]">{copy.stats}</h1>
          <button type="button" className="text-[14px] text-[var(--csn-blue)]" onClick={() => nav({ to: "/achievements" })}>
            {copy.achievements}
          </button>
        </div>

        <Panel>
          <div className="flex items-center justify-between gap-4">
            <div className="min-w-0">
              <div className="text-[11px] font-medium text-[var(--csn-text-4)]">{copy.avgScore}</div>
              <div className="mt-2 text-[13px] text-[var(--csn-text-3)]">
                {copy.examsTaken} <span className="font-display text-[22px] tabular text-[var(--csn-text-1)]">{history.length}</span>
              </div>
            </div>
            <TelemetryRing value={avg} />
          </div>
        </Panel>

        <div className="flex items-center justify-between px-1 text-[13px] text-[var(--csn-text-3)]">
          <span>
            {copy.timeLearning} · <span className="tabular">{formatDuration(totalTimeMs)}</span>
          </span>
          <span className="tabular">
            {copy.achievements} {achievements.length}/10
          </span>
        </div>

        {pro && chart.length > 1 ? (
          <Panel className="h-48 p-2">
            <div className="px-3 pt-2 text-[11px] font-medium text-[var(--csn-text-4)]">{copy.improvement}</div>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chart} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
                <CartesianGrid stroke="var(--csn-hairline)" vertical={false} />
                <XAxis dataKey="i" hide />
                <YAxis domain={[0, 100]} tick={{ fill: "var(--csn-text-4)", fontSize: 10 }} />
                <Tooltip
                  contentStyle={{
                    background: "var(--csn-surface-1)",
                    border: "1px solid var(--csn-hairline)",
                    borderRadius: 8,
                    fontSize: 12,
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="pct"
                  stroke="var(--csn-blue)"
                  fill="var(--csn-blue)"
                  fillOpacity={0.15}
                />
              </AreaChart>
            </ResponsiveContainer>
          </Panel>
        ) : null}

        <div>
          <h2 className="font-display text-[20px]">{copy.weakTopics}</h2>
          <div className="mt-2 space-y-3">
            {ranked
              .filter((e) => e.answered > 0)
              .slice(0, 3)
              .map((e) => (
                <div key={e.m} className="px-1">
                  <div className="flex justify-between text-[14px]">
                    <span>{copy.modules[e.m].name}</span>
                    <span className="tabular text-[var(--csn-text-3)]">{Math.round(e.ratio * 100)}%</span>
                  </div>
                  <ProgressRail value={e.ratio} className="mt-2" />
                </div>
              ))}
            {ranked.every((e) => e.answered === 0) ? (
              <p className="text-[14px] text-[var(--csn-text-3)]">{copy.noneYet}</p>
            ) : null}
          </div>
        </div>

        <div>
          <h2 className="font-display text-[20px]">{copy.strongTopics}</h2>
          <div className="mt-2 space-y-3">
            {ranked
              .filter((e) => e.answered > 0)
              .slice(-3)
              .reverse()
              .map((e) => (
                <div key={e.m} className="px-1">
                  <div className="flex justify-between text-[14px]">
                    <span>{copy.modules[e.m].name}</span>
                    <span className="tabular text-[var(--csn-text-3)]">{Math.round(e.ratio * 100)}%</span>
                  </div>
                  <ProgressRail value={e.ratio} className="mt-2" />
                </div>
              ))}
          </div>
        </div>

        <div>
          <h2 className="mb-2 font-display text-[20px]">{copy.history}</h2>
          {history.length === 0 ? (
            <p className="px-1 text-[14px] text-[var(--csn-text-3)]">{copy.emptyHistory}</p>
          ) : (
            <ListGroup>
              {history.slice(0, 8).map((e) => (
                <ListRow key={e.id} onClick={() => nav({ to: "/results" })}>
                  <div className="min-w-0 flex-1">
                    <div className="text-[14px]">{copy.examModes[e.mode]}</div>
                    <div className="text-[12px] text-[var(--csn-text-4)]">
                      {new Date(e.finishedAt).toLocaleDateString()}
                    </div>
                  </div>
                  <Chip tone={e.passed ? "success" : "danger"}>
                    {Math.round((e.correct / Math.max(1, e.size)) * 100)}%
                  </Chip>
                </ListRow>
              ))}
            </ListGroup>
          )}
        </div>
      </div>
    </Shell>
  );
}
