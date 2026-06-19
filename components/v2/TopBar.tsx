"use client";

interface TopBarProps {
  title: string;
  onBack?: () => void;
}

export default function TopBar({ title, onBack }: TopBarProps) {
  return (
    <div style={{
      position: "sticky", top: 0, zIndex: 20, display: "flex", alignItems: "center", gap: 14,
      padding: "16px 4px",
      background: "linear-gradient(var(--v-bg) 60%, transparent)",
    }}>
      {onBack && (
        <button
          type="button"
          onClick={onBack}
          aria-label="Back"
          style={{
            width: 36, height: 36, borderRadius: 99, border: "none", cursor: "pointer",
            background: "var(--v-elev-2)", color: "var(--v-fg)",
            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
        </button>
      )}
      <h1 style={{
        margin: 0, fontSize: 28, fontWeight: 800, letterSpacing: "-0.03em",
        color: "var(--v-fg)", lineHeight: 1,
      }}>
        {title}
      </h1>
    </div>
  );
}
