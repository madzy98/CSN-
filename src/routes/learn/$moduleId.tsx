import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { CsnButton } from "@/components/csn/button";
import { Panel, ProgressRail } from "@/components/csn/panel";
import { Shell } from "@/components/csn/shell";
import { t } from "@/lib/csn/i18n";
import { questionsForModule } from "@/lib/csn/questions";
import { useCsnStore } from "@/lib/csn/store";
import { MODULES, type ModuleId } from "@/lib/csn/types";

export const Route = createFileRoute("/learn/$moduleId")({ component: ModulePage });

function ModulePage() {
  const { moduleId } = Route.useParams();
  const nav = useNavigate();
  const lang = useCsnStore((s) => s.lang);
  const stats = useCsnStore((s) => s.moduleStats);
  const startExam = useCsnStore((s) => s.startExam);
  const copy = t(lang);
  const id: ModuleId = MODULES.includes(moduleId as ModuleId) ? (moduleId as ModuleId) : "signs";
  const list = questionsForModule(id);
  const st = stats[id];
  const ratio = st.answered ? st.correct / st.answered : 0;

  return (
    <Shell>
      <div className="space-y-4">
        <button type="button" className="text-[14px] text-[var(--csn-blue)]" onClick={() => nav({ to: "/learn" })}>
          ← {copy.learn}
        </button>
        <h1 className="font-display text-[28px]">{copy.modules[id].name}</h1>
        <p className="text-[14px] text-[var(--csn-text-3)]">{copy.modules[id].blurb}</p>
        <Panel>
          <div className="flex justify-between text-[14px]">
            <span>
              {copy.mastery} {Math.round(ratio * 100)}%
            </span>
            <span className="text-[var(--csn-text-3)]">
              {st.correct}/{st.answered || list.length}
            </span>
          </div>
          <ProgressRail value={ratio} className="mt-2" />
          <p className="mt-2 text-[12px] text-[var(--csn-text-4)]">
            XP {st.xp} · {copy.wrong} {Math.max(0, st.answered - st.correct)}
          </p>
        </Panel>
        <CsnButton
          className="w-full"
          onClick={() => {
            startExam("practice", { module: id, size: Math.min(20, list.length) });
            void nav({ to: "/play" });
          }}
        >
          {copy.startModule} · {Math.min(20, list.length)}
        </CsnButton>
        <CsnButton
          variant="secondary"
          className="w-full"
          onClick={() => {
            startExam("practice", { module: id, size: list.length });
            void nav({ to: "/play" });
          }}
        >
          {copy.allQuestions} · {list.length}
        </CsnButton>
      </div>
    </Shell>
  );
}
