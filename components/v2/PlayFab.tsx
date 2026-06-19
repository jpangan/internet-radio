"use client";

interface PlayFabProps {
  playing: boolean;
  loading?: boolean;
  onClick: (e: React.MouseEvent) => void;
  size?: number;
  light?: boolean;
  style?: React.CSSProperties;
}

export default function PlayFab({ playing, loading, onClick, size = 56, light, style = {} }: PlayFabProps) {
  const iconSize = size * 0.42;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={playing ? "Pause" : "Play"}
      className="v-fab"
      style={{
        width: size, height: size, flexShrink: 0,
        borderRadius: "var(--v-r-pill)", border: "none", cursor: "pointer",
        background: light
          ? "#fff"
          : "linear-gradient(135deg, var(--v-accent), var(--v-accent-2))",
        color: light ? "#111" : "var(--v-on-accent)",
        display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: light
          ? "0 12px 40px rgba(0,0,0,0.35)"
          : "0 8px 28px rgba(108,92,231,0.45)",
        transition: "transform .12s var(--v-ease-soft)",
        ...style,
      }}
    >
      {loading ? (
        <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none" style={{ animation: "spin 1s linear infinite" }}>
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" opacity=".25"/>
          <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.4 0 0 5.4 0 12h4z" opacity=".75"/>
        </svg>
      ) : playing ? (
        <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="currentColor">
          <rect x="6" y="4" width="4" height="16" rx="1.5"/>
          <rect x="14" y="4" width="4" height="16" rx="1.5"/>
        </svg>
      ) : (
        <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="currentColor"
          style={{ marginLeft: size * 0.03 }}>
          <path d="M8 5v14l11-7z"/>
        </svg>
      )}
    </button>
  );
}
