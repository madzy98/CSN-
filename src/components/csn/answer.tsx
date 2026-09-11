type State = "idle" | "selected" | "correct" | "incorrect" | "locked";

export function CsnAnswer({
  label,
  index,
  state,
  disabled,
  onSelect,
}: {
  label: string;
  index: number;
  state: State;
  disabled?: boolean;
  onSelect: () => void;
}) {
  const letter = String.fromCharCode(65 + index);
  const tone =
    state === "correct"
      ? "bg-[var(--csn-green-dim)] shadow-[inset_0_0_0_1px_var(--csn-green)]"
      : state === "incorrect"
        ? "bg-[var(--csn-red-dim)] shadow-[inset_0_0_0_1px_var(--csn-red)]"
        : state === "selected"
          ? "bg-[var(--csn-blue-dim)] shadow-[inset_0_0_0_1px_var(--csn-blue)]"
          : "panel-graphite";
  const dim = state === "locked" ? "opacity-45" : "";
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onSelect}
      className={
        `flex min-h-[52px] w-full items-start gap-3 rounded-[12px] px-4 py-3.5 text-left text-base leading-snug ` +
        `transition-[transform,background-color,box-shadow,opacity] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] ` +
        `active:not-disabled:scale-[0.99] ${tone} ${dim}`
      }
    >
      <span className="mt-0.5 w-5 shrink-0 text-[12px] font-medium text-[var(--csn-text-4)]">
        {letter}
      </span>
      <span className="min-w-0 flex-1 text-[var(--csn-text-1)]">{label}</span>
    </button>
  );
}
