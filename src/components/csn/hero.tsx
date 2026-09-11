import type { ReactNode } from "react";

export function ThemeHero({
  className = "",
  children,
  energy = false,
}: {
  className?: string;
  children?: ReactNode;
  energy?: boolean;
}) {
  return (
    <div className={`relative overflow-hidden bg-[var(--csn-bg-0)] ${className}`}>
      <div
        className="absolute inset-0 bg-cover bg-[center_62%] bg-no-repeat"
        style={{ backgroundImage: "var(--csn-hero)" }}
        aria-hidden
      />
      {energy ? <div className="energy-veil absolute inset-0" /> : null}
      <div className="hero-overlay absolute inset-0" />
      <div className="relative z-[1] h-full">{children}</div>
    </div>
  );
}
