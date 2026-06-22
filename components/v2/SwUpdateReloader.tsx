"use client";

import { useEffect } from "react";

// When skipWaiting activates a new service worker it fires "controllerchange".
// Reloading at that point ensures the page uses the new SW's precache (fresh
// CSS / font URLs) rather than continuing with the previous SW's stale assets.
export default function SwUpdateReloader() {
  useEffect(() => {
    if (typeof navigator === "undefined" || !navigator.serviceWorker) return;
    const reload = () => window.location.reload();
    navigator.serviceWorker.addEventListener("controllerchange", reload);
    return () => navigator.serviceWorker.removeEventListener("controllerchange", reload);
  }, []);
  return null;
}
