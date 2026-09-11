import {
  officialSignSrc,
  hasOfficialRaster,
} from "@/lib/csn/officialSigns";

type Props = {
  signId: string;
  className?: string;
  children?: React.ReactNode;
};

/**
 * Official plate. Effects stay on the parent card, never on this image.
 * If the official file is not imported yet, children (legacy SVG) render.
 * Do not generate children with Imagine.
 */
export function OfficialSign({ signId, className, children }: Props) {
  if (!hasOfficialRaster(signId)) {
    return <div className={className}>{children}</div>;
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
