"use client";

export default function OfflinePage() {
  return (
    <div
      className="flex h-dvh flex-col items-center justify-center px-6 text-center"
      style={{ background: "var(--bg)" }}
    >
      {/* Background glow */}
      <div
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 50% 50%, rgba(124,108,240,0.08), transparent 70%)",
        }}
      />

      <div
        className="mb-7 flex h-24 w-24 items-center justify-center rounded-[28px]"
        style={{
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.09)",
        }}
      >
        <svg
          className="h-12 w-12"
          style={{ color: "rgba(255,255,255,0.35)" }}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        >
          <line x1="1" y1="1" x2="23" y2="23" />
          <path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.55M5 12.55a10.94 10.94 0 0 1 5.17-2.39M10.71 5.05A16 16 0 0 1 22.56 9M1.42 9a15.91 15.91 0 0 1 4.7-2.88M8.53 16.11a6 6 0 0 1 6.95 0M12 20h.01" />
        </svg>
      </div>

      <h1 className="text-2xl font-bold tracking-tight text-white">
        You&apos;re offline
      </h1>
      <p
        className="mt-3 max-w-xs text-sm leading-relaxed"
        style={{ color: "rgba(255,255,255,0.4)" }}
      >
        No internet connection. Connect to Wi-Fi or mobile data to stream radio
        stations.
      </p>

      <button
        type="button"
        onClick={() => window.location.reload()}
        className="mt-8 rounded-full px-7 py-3 text-sm font-semibold text-white transition-all active:scale-95"
        style={{
          background: "rgba(124,108,240,0.2)",
          border: "1px solid rgba(124,108,240,0.4)",
        }}
      >
        Try again
      </button>
    </div>
  );
}
