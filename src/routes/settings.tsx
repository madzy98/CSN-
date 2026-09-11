import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { CsnButton } from "@/components/csn/button";
import { Chip, ListGroup, ListItem, ListRow, Panel } from "@/components/csn/panel";
import { Shell } from "@/components/csn/shell";
import { fill, t } from "@/lib/csn/i18n";
import { useCsnStore } from "@/lib/csn/store";
import { THEME_HERO } from "@/lib/csn/themes";
import { UNLOCK_AT, type ThemeId } from "@/lib/csn/types";
import { hasFeature, unlockLevel } from "@/lib/csn/xp";

export const Route = createFileRoute("/settings")({ component: SettingsPage });

function SettingsPage() {
  const nav = useNavigate();
  const lang = useCsnStore((s) => s.lang);
  const theme = useCsnStore((s) => s.theme);
  const sound = useCsnStore((s) => s.sound);
  const focusMode = useCsnStore((s) => s.focusMode);
  const adminMode = useCsnStore((s) => s.adminMode);
  const examSize = useCsnStore((s) => s.examSize);
  const xp = useCsnStore((s) => s.xp);
  const setLang = useCsnStore((s) => s.setLang);
  const setTheme = useCsnStore((s) => s.setTheme);
  const setSound = useCsnStore((s) => s.setSound);
  const setFocus = useCsnStore((s) => s.setFocus);
  const setAdminMode = useCsnStore((s) => s.setAdminMode);
  const setExamSize = useCsnStore((s) => s.setExamSize);
  const resetAll = useCsnStore((s) => s.resetAll);
  const [confirm, setConfirm] = useState(false);
  const [showApk, setShowApk] = useState(false);
  const copy = t(lang);
  const level = unlockLevel(xp, adminMode);
  useEffect(() => {
    setShowApk(typeof navigator !== "undefined" && !/CSNplusApp/.test(navigator.userAgent));
  }, []);
  const themes: { id: ThemeId; label: string; need: number | null }[] = [
    { id: "basic", label: copy.basic, need: null },
    { id: "dark", label: copy.dark, need: UNLOCK_AT["dark-mode"] },
    { id: "neon", label: copy.neon, need: UNLOCK_AT["neon-theme"] },
    { id: "pro", label: copy.pro, need: UNLOCK_AT["pro-dark"] },
  ];

  return (
    <Shell>
      <div className="space-y-5">
        <h1 className="font-display text-[28px]">{copy.settings}</h1>

        <ListGroup>
          <div className="px-4 py-3">
            <div className="text-[11px] font-medium text-[var(--csn-text-4)]">{copy.language}</div>
            <div className="mt-3 grid grid-cols-2 gap-2">
              {(["lv", "en"] as const).map((code) => (
                <CsnButton
                  key={code}
                  variant="choice"
                  selected={lang === code}
                  onClick={() => setLang(code)}
                >
                  {code === "lv" ? "Latviešu" : "English"}
                </CsnButton>
              ))}
            </div>
          </div>

          <div className="px-4 py-3">
            <div className="text-[11px] font-medium text-[var(--csn-text-4)]">{copy.theme}</div>
            <div className="mt-3 grid grid-cols-2 gap-2">
              {themes.map((th) => {
                const locked = th.need !== null && level < th.need;
                const on = theme === th.id;
                return (
                  <button
                    key={th.id}
                    type="button"
                    disabled={locked}
                    onClick={() => setTheme(th.id)}
                    className={`overflow-hidden rounded-[12px] text-left disabled:opacity-45 ${
                      on ? "shadow-[inset_0_0_0_1px_var(--csn-blue)]" : "shadow-[inset_0_0_0_1px_var(--csn-hairline)]"
                    }`}
                  >
                    <img
                      src={THEME_HERO[th.id]}
                      alt=""
                      className="h-16 w-full object-cover object-[center_70%]"
                    />
                    <div className="px-2.5 py-2">
                      <div className="text-[13px] font-medium">{th.label}</div>
                      {locked && th.need ? (
                        <div className="text-[11px] text-[var(--csn-text-4)]">
                          {fill(copy.unlockAt, { level: th.need })}
                        </div>
                      ) : null}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <ListItem>
            <div className="min-w-0 flex-1">
              <div className="font-medium">{copy.sound}</div>
              <p className="text-[13px] text-[var(--csn-text-3)]">
                {hasFeature(level, "exam-music")
                  ? copy.featuresMap["exam-music"]
                  : fill(copy.unlockAt, { level: 8 })}
              </p>
            </div>
            <CsnButton
              variant="choice"
              selected={sound}
              className="min-w-[5.75rem] shrink-0"
              disabled={!hasFeature(level, "exam-music")}
              onClick={() => setSound(!sound)}
            >
              {sound ? copy.on : copy.off}
            </CsnButton>
          </ListItem>

          <ListItem>
            <div className="min-w-0 flex-1">
              <div className="font-medium">{copy.focus}</div>
              <p className="text-[13px] text-[var(--csn-text-3)]">
                {hasFeature(level, "focus-mode")
                  ? copy.featuresMap["focus-mode"]
                  : fill(copy.unlockAt, { level: 9 })}
              </p>
            </div>
            <CsnButton
              variant="choice"
              selected={focusMode}
              className="min-w-[5.75rem] shrink-0"
              disabled={!hasFeature(level, "focus-mode")}
              onClick={() => setFocus(!focusMode)}
            >
              {focusMode ? copy.on : copy.off}
            </CsnButton>
          </ListItem>

          <div className="px-4 py-3">
            <div className="flex items-center justify-between">
              <span className="font-medium">{copy.examSize}</span>
              {hasFeature(level, "custom-size") ? (
                <span className="tabular text-[14px]">{examSize}</span>
              ) : (
                <Chip>{fill(copy.unlockAt, { level: UNLOCK_AT["custom-size"] })}</Chip>
              )}
            </div>
            <input
              type="range"
              min={30}
              max={100}
              step={5}
              disabled={!hasFeature(level, "custom-size")}
              value={examSize}
              onChange={(e) => setExamSize(Number(e.target.value))}
              className="mt-3 w-full accent-[var(--csn-blue)]"
            />
          </div>
        </ListGroup>

        <ListGroup>
          <ListRow onClick={() => nav({ to: "/mistakes" })}>
            <span className="min-w-0 flex-1 font-medium">{copy.mistakes}</span>
            <ChevronRight className="size-4 text-[var(--csn-text-4)]" />
          </ListRow>
          <ListRow onClick={() => nav({ to: "/achievements" })}>
            <span className="min-w-0 flex-1 font-medium">{copy.achievements}</span>
            <ChevronRight className="size-4 text-[var(--csn-text-4)]" />
          </ListRow>
          <ListRow onClick={() => nav({ to: "/privacy" })}>
            <span className="min-w-0 flex-1 font-medium">{copy.privacy}</span>
            <ChevronRight className="size-4 text-[var(--csn-text-4)]" />
          </ListRow>
        </ListGroup>

        <ListGroup>
          <ListItem>
            <div className="min-w-0 flex-1">
              <div className="font-medium">{copy.adminMode}</div>
              <p className="text-[13px] text-[var(--csn-text-3)]">{copy.adminHint}</p>
            </div>
            <CsnButton
              variant="choice"
              selected={adminMode}
              className="min-w-[5.75rem] shrink-0"
              onClick={() => setAdminMode(!adminMode)}
            >
              {adminMode ? copy.on : copy.off}
            </CsnButton>
          </ListItem>
        </ListGroup>

        {showApk ? (
          <>
            <a
              href="/CSNplus-1.6.0.apk"
              download="CSNplus-1.6.0.apk"
              className="control-body csn-sweep inline-flex h-14 w-full items-center justify-center gap-2 rounded-[16px] px-5 text-base font-medium text-[var(--csn-text-1)]"
            >
              {copy.downloadApk}
            </a>
            <p className="-mt-2 text-center text-[12px] text-[var(--csn-text-4)]">{copy.downloadApkHint}</p>
          </>
        ) : null}

        <CsnButton variant="danger" className="w-full" onClick={() => setConfirm(true)}>
          {copy.reset}
        </CsnButton>

        {confirm ? (
          <div className="fixed inset-0 z-40 flex items-center justify-center bg-[var(--csn-bg-0)]/80 px-6">
            <Panel className="w-full max-w-sm">
              <p className="text-[14px]">{copy.resetConfirm}</p>
              <div className="mt-4 grid grid-cols-2 gap-2">
                <CsnButton variant="tertiary" onClick={() => setConfirm(false)}>
                  {copy.cancel}
                </CsnButton>
                <CsnButton
                  variant="danger"
                  onClick={() => {
                    resetAll();
                    setConfirm(false);
                  }}
                >
                  {copy.yesReset}
                </CsnButton>
              </div>
            </Panel>
          </div>
        ) : null}
      </div>
    </Shell>
  );
}
