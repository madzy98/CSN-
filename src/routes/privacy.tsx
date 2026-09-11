import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Shell } from "@/components/csn/shell";
import { t } from "@/lib/csn/i18n";
import { useCsnStore } from "@/lib/csn/store";

export const Route = createFileRoute("/privacy")({ component: PrivacyPage });

function PrivacyPage() {
  const nav = useNavigate();
  const lang = useCsnStore((s) => s.lang);
  const copy = t(lang);
  const lv = lang === "lv";

  return (
    <Shell>
      <div className="space-y-4">
        <button type="button" className="text-[14px] text-[var(--csn-blue)]" onClick={() => nav({ to: "/settings" })}>
          ← {copy.settings}
        </button>
        <h1 className="font-display text-[28px]">{copy.privacy}</h1>
        <div className="space-y-3 text-[14px] leading-relaxed text-[var(--csn-text-2)]">
          <p>{lv ? "CSN+ ir B kategorijas teorijas treneris. Dati paliek šajā ierīcē." : "CSN+ is a category B theory trainer. Data stays on this device."}</p>
          <p>
            {lv
              ? "Lietotne saglabā progresu, iestatījumus, kļūdas un eksāmenu vēsturi lokāli (pārlūkā). Mēs nesūtam personu identificējošus datus uz serveri un neprasām kontu."
              : "The app stores progress, settings, mistakes and exam history locally (in the browser). We do not send personally identifying data to a server and do not require an account."}
          </p>
          <p>
            {lv
              ? "Admin režīms tikai atver funkcijas šajā ierīcē. Tas nemaina jautājumu banku un nepublicē rezultātus."
              : "Admin mode only unlocks features on this device. It does not change the question bank and does not publish results."}
          </p>
          <p>
            {lv
              ? "Progresu var dzēst Iestatījumos ar “Atiestatīt progresu”."
              : "Progress can be deleted in Settings with “Reset progress”."}
          </p>
        </div>
      </div>
    </Shell>
  );
}
