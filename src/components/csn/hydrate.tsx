import { useEffect } from "react";
import { hydrateCsnStore } from "@/lib/csn/store";

export function CsnHydrate() {
  useEffect(() => {
    void hydrateCsnStore();
  }, []);
  return null;
}
