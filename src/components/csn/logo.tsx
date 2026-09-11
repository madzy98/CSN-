export function CsnMark({ size = 36 }: { size?: number }) {
  return (
    <svg viewBox="0 0 120 120" width={size} height={size} aria-hidden className="relative">
      <defs>
        <linearGradient id="csn-metal" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#3a3a3a" />
          <stop offset="45%" stopColor="#121212" />
          <stop offset="100%" stopColor="#2a2a2a" />
        </linearGradient>
        <linearGradient id="csn-edge" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--csn-blue)" stopOpacity="0.9" />
          <stop offset="100%" stopColor="var(--csn-blue)" stopOpacity="0.15" />
        </linearGradient>
      </defs>
      <polygon
        points="60,10 112,108 8,108"
        fill="url(#csn-metal)"
        stroke="url(#csn-edge)"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <polygon points="60,28 96,98 24,98" fill="var(--csn-bg-0)" opacity="0.55" />
      <rect x="54" y="52" width="12" height="36" rx="2" fill="var(--csn-blue)" />
      <rect x="42" y="64" width="36" height="12" rx="2" fill="var(--csn-blue)" />
    </svg>
  );
}

export function CsnWordmark({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-2.5">
      <CsnMark size={compact ? 28 : 36} />
      <div className="leading-none">
        <div className="font-display text-[28px] tracking-tight text-[var(--csn-text-1)]">CSN+</div>
      </div>
    </div>
  );
}
