import {
  officialSignSrc,
  hasOfficialRaster,
} from "@/lib/csn/officialSigns";

type Props = {
  signId: string;
  className?: string;
};

/**
 * Official CSN plate. Effects stay on the parent card, never on this image.
 * Missing official raster → explicit missing-asset state. Never SVG / custom drawing.
 */
export function OfficialSign({ signId, className }: Props) {
  if (!hasOfficialRaster(signId)) {
    if (import.meta.env.DEV) {
      console.error(`[CSN+] missing official sign raster: ${signId || "(empty)"}`);
    }
    return (
      <div
        className={className}
        data-missing-official-sign={signId || "unmapped"}
        role="img"
        aria-label={`Trūkst oficiālā ceļa zīmes attēla${signId ? ` ${signId}` : ""}`}
      >
        <div className="flex aspect-square w-full items-center justify-center rounded-xl border border-dashed border-[var(--csn-hairline)] bg-[var(--csn-surface-2)] p-3 text-center">
          <p className="text-[11px] leading-snug text-[var(--csn-text-4)]">
            Oficiālais zīmes attēls nav pieejams
          </p>
        </div>
      </div>
    );
  }
  return (
    <div className={className}>
      <img
        className="sign-img block h-auto w-full"
        src={officialSignSrc(signId)}
        alt={`${signId}. ceļa zīme`}
        width={240}
        height={240}
        draggable={false}
        decoding="async"
      />
    </div>
  );
}
