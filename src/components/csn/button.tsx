import type { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "tertiary" | "danger" | "icon" | "choice";
type Size = "md" | "sm";

const base =
  "inline-flex min-h-12 items-center justify-center gap-2 font-medium " +
  "transition-[transform,box-shadow,opacity] duration-[90ms] ease-[cubic-bezier(0.2,0,0,1)] " +
  "disabled:cursor-not-allowed disabled:opacity-[0.38] disabled:active:translate-y-0 disabled:active:scale-100 " +
  "focus-visible:outline-none";

const variants: Record<Exclude<Variant, "choice">, string> = {
  primary:
    "control-body csn-sweep h-14 rounded-[16px] px-5 text-base text-[var(--csn-text-1)] " +
    "active:not-disabled:scale-[0.985] active:not-disabled:translate-y-px " +
    "[&:active:not(:disabled)_svg]:translate-x-[2px] " +
    "focus-visible:shadow-[inset_0_0_0_1px_var(--csn-hairline-2),inset_0_0_0_1px_var(--csn-accent-edge)]",
  secondary:
    "h-14 rounded-[16px] bg-transparent px-5 text-base text-[var(--csn-text-2)] shadow-border " +
    "active:not-disabled:scale-[0.985] active:not-disabled:translate-y-px " +
    "focus-visible:shadow-border-hover",
  tertiary: "min-h-12 rounded-[12px] bg-transparent px-3 text-[var(--csn-text-2)]",
  danger:
    "h-14 rounded-[16px] px-5 text-base text-[var(--csn-text-1)] " +
    "shadow-[inset_0_0_0_1px_rgba(255,77,90,0.45)] bg-[var(--csn-red-dim)]",
  icon: "size-12 shrink-0 rounded-[8px] p-0 text-[var(--csn-text-3)]",
};

function choiceClass(selected: boolean) {
  return selected
    ? "min-h-12 rounded-[12px] px-4 py-2 text-[14px] bg-[var(--csn-blue-dim)] text-[var(--csn-text-1)] shadow-[inset_0_0_0_1px_var(--csn-blue)]"
    : "min-h-12 rounded-[12px] px-4 py-2 text-[14px] bg-[var(--csn-surface-2)] text-[var(--csn-text-2)]";
}

export function CsnButton({
  variant = "primary",
  size = "md",
  selected = false,
  className = "",
  children,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
  selected?: boolean;
}) {
  const tone = variant === "choice" ? choiceClass(selected) : variants[variant];
  const sizeClass =
    variant === "primary" || variant === "secondary" || variant === "danger"
      ? size === "sm"
        ? "h-12 text-[14px]"
        : ""
      : "";
  return (
    <button
      type="button"
      className={`${base} ${tone} ${sizeClass} ${className}`}
      {...rest}
      aria-pressed={variant === "choice" ? selected : undefined}
    >
      {children}
    </button>
  );
}
