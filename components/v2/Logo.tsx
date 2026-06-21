export default function Logo({ compact }: { compact?: boolean }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/app-icon.svg"
        alt="GhostRadio"
        width={34}
        height={34}
        style={{
          width: 34, height: 34, flexShrink: 0, borderRadius: 8,
          boxShadow: "0 4px 16px rgba(108,92,231,0.4)",
        }}
      />
      {!compact && (
        <span style={{ fontSize: 16, fontWeight: 750, letterSpacing: "-0.02em", color: "var(--v-fg)" }}>
          GhostRadio
        </span>
      )}
    </div>
  );
}
