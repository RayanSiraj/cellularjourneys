import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function useOpenHashTarget() {
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return;
    const target = document.getElementById(hash.slice(1));
    if (target instanceof HTMLDetailsElement) target.open = true;
    const frame = window.requestAnimationFrame(() => {
      target?.scrollIntoView({ block: "start" });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [hash]);
}
