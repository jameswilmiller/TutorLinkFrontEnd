import { useEffect } from "react";

export function useClickOutside(ref, handler, enabled = true) {
  useEffect(() => {
    if (!enabled) return;

    function onPointerDown(e) {
      if (ref.current && !ref.current.contains(e.target)) handler(e);
    }
    function onKey(e) {
      if (e.key === "Escape") handler(e);
    }

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("touchstart", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("touchstart", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [ref, handler, enabled]);
}