import { ImageResponse } from "next/og";

export const size = { width: 192, height: 192 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(<RadioIcon size={192} />, { ...size });
}

function RadioIcon({ size: s }: { size: number }) {
  const r = s * 0.22;
  return (
    <div
      style={{
        width: s,
        height: s,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #9488f5 0%, #6c5ce7 100%)",
        borderRadius: r,
        position: "relative",
      }}
    >
      {/* Outer arc */}
      <div
        style={{
          position: "absolute",
          width: s * 0.52,
          height: s * 0.52,
          borderRadius: "50%",
          border: `${s * 0.035}px solid rgba(255,255,255,0.45)`,
          display: "flex",
          clipPath: "inset(0 0 45% 0)",
          transform: `translateY(${s * 0.06}px)`,
        }}
      />
      {/* Middle arc */}
      <div
        style={{
          position: "absolute",
          width: s * 0.33,
          height: s * 0.33,
          borderRadius: "50%",
          border: `${s * 0.035}px solid rgba(255,255,255,0.72)`,
          display: "flex",
          clipPath: "inset(0 0 45% 0)",
          transform: `translateY(${s * 0.06}px)`,
        }}
      />
      {/* Center dot */}
      <div
        style={{
          position: "absolute",
          width: s * 0.12,
          height: s * 0.12,
          borderRadius: "50%",
          background: "white",
          bottom: s * 0.355,
        }}
      />
    </div>
  );
}
