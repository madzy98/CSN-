import { useEffect } from "react";
import { hydrateCsnStore } from "@/lib/csn/store";

function pressEl(target: EventTarget | null): HTMLElement | null {
  if (!(target instanceof Element)) return null;
  const el = target.closest<HTMLElement>("button, [role='button'], a.csn-press");
  if (!el) return null;
  if (el.hasAttribute("data-no-press")) return null;
  if (el instanceof HTMLButtonElement && el.disabled) return null;
  if (el.getAttribute("aria-disabled") === "true") return null;
  return el;
}

function clearPressed() {
  document.querySelectorAll(".is-pressed").forEach((n) => n.classList.remove("is-pressed"));
}

export function CsnHydrate() {
  useEffect(() => {
    void hydrateCsnStore();
  }, []);

  useEffect(() => {
    const down = (e: PointerEvent) => {
      const el = pressEl(e.target);
      if (!el) return;
      el.classList.add("is-pressed");
    };
    const up = () => clearPressed();
    document.addEventListener("pointerdown", down, { capture: true, passive: true });
    document.addEventListener("pointerup", up, { capture: true, passive: true });
    document.addEventListener("pointercancel", up, { capture: true, passive: true });
    window.addEventListener("blur", up);
    return () => {
      document.removeEventListener("pointerdown", down, true);
      document.removeEventListener("pointerup", up, true);
      document.removeEventListener("pointercancel", up, true);
      window.removeEventListener("blur", up);
      clearPressed();
    };
  }, []);

  return null;
}
