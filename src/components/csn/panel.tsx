import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from "react";

export function Panel({ className = "", ...rest }: HTMLAttributes<HTMLDivElement>) {
  return <div className={`rounded-[16px] p-4 panel-graphite ${className}`} {...rest} />;
}

export function ListGroup({ className = "", ...rest }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`divide-y divide-[var(--csn-hairline)] overflow-hidden rounded-[16px] panel-graphite ${className}`}
      {...rest}
    />
  );
}

export function ListRow({
  className = "",
  children,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      className={`flex min-h-12 w-full items-center gap-3 px-4 py-3 text-left disabled:opacity-55 ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}

export function ListItem({ className = "", ...rest }: HTMLAttributes<HTMLDivElement>) {
  return <div className={`flex min-h-12 items-center gap-3 px-4 py-3 ${className}`} {...rest} />;
}

export function ProgressRail({ value, gold, className = "" }: { value: number; gold?: boolean; className?: string }) {
  const pct = Math.max(0, Math.min(100, Math.round(value * 100)));
  const milestone = gold || pct >= 100;
  return (
    <div className={`h-1 overflow-hidden rounded-full bg-[var(--csn-surface-3)] ${className}`}>
      <div
        className="h-full rounded-full transition-[width] duration-[320ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{
          width: `${pct}%`,
          background: milestone ? "var(--csn-gold)" : "var(--csn-blue)",
          boxShadow: milestone ? "0 0 8px var(--csn-gold-dim)" : "0 0 8px var(--csn-accent-glow)",
        }}
      />
    </div>
  );
}

export function TelemetryRing({ value }: { value: number }) {
  const pct = Math.max(0, Math.min(100, Math.round(value)));
  const r = 38;
  const c = 2 * Math.PI * r;
  return (
    <svg viewBox="0 0 100 100" className="size-24" aria-hidden>
      <circle cx="50" cy="50" r={r} fill="none" stroke="var(--csn-surface-3)" strokeWidth="6" />
      <circle
        cx="50"
        cy="50"
        r={r}
        fill="none"
        stroke="var(--csn-blue)"
        strokeWidth="6"
        strokeLinecap="round"
        strokeDasharray={c}
        strokeDashoffset={c * (1 - pct / 100)}
        transform="rotate(-90 50 50)"
      />
      <text
        x="50"
        y="54"
        textAnchor="middle"
        fill="var(--csn-text-1)"
        fontSize="18"
        fontWeight="600"
        fontFamily="Manrope, sans-serif"
      >
        {pct}%
      </text>
    </svg>
  );
}

export function Chip({
  children,
  tone = "muted",
}: {
  children: ReactNode;
  tone?: "muted" | "blue" | "gold" | "danger" | "success";
}) {
  const map = {
    muted: "bg-[var(--csn-surface-2)] text-[var(--csn-text-3)]",
    blue: "bg-[var(--csn-blue-dim)] text-[var(--csn-blue)]",
    gold: "bg-[var(--csn-gold-dim)] text-[var(--csn-gold)]",
    danger: "bg-[var(--csn-red-dim)] text-[var(--csn-red)]",
    success: "bg-[var(--csn-green-dim)] text-[var(--csn-green)]",
  };
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-medium ${map[tone]}`}>
      {children}
    </span>
  );
}
