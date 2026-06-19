export default function Logo({ compact }: { compact?: boolean }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <div style={{
        width: 34, height: 34, flexShrink: 0, borderRadius: 11,
        display: "flex", alignItems: "center", justifyContent: "center",
        background: "linear-gradient(135deg, var(--v-accent), var(--v-accent-2))",
        color: "#fff", boxShadow: "0 4px 16px rgba(108,92,231,0.4)",
      }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M16 12a4 4 0 0 1-8 0" />
          <path d="M12 12v9" />
          <path d="M12 3v1" />
          <path d="M4.2 6.2l.7.7" />
          <path d="M19.1 6.2l-.7.7" />
          <path d="M2 12h1" />
          <path d="M21 12h1" />
          <circle cx="12" cy="12" r="2" />
        </svg>
      </div>
      {!compact && (
        <span style={{ fontSize: 16, fontWeight: 750, letterSpacing: "-0.02em", color: "var(--v-fg)" }}>
          Internet Radio
        </span>
      )}
    </div>
  );
}
