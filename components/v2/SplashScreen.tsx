"use client";

import { useEffect, useState } from "react";

const SPLASH_SHOW_MS = 2200;
const SPLASH_EXIT_MS = 500;

export default function SplashScreen({ onDone }: { onDone: () => void }) {
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const exitTimer = setTimeout(() => setExiting(true), SPLASH_SHOW_MS);
    const doneTimer = setTimeout(() => onDone(), SPLASH_SHOW_MS + SPLASH_EXIT_MS);
    return () => { clearTimeout(exitTimer); clearTimeout(doneTimer); };
  }, [onDone]);

  return (
    <div
      style={{
        position: "fixed", inset: 0, zIndex: 9999,
        background: "#08080d",
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        gap: 36,
        animation: exiting ? `splash-exit ${SPLASH_EXIT_MS}ms cubic-bezier(0.4,0,1,1) forwards` : undefined,
        pointerEvents: "none",
      }}
    >
      {/* Ghost stack: float wrapper → shadow */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>

        {/* Float + enter wrapper */}
        <div style={{
          position: "relative",
          animation: "splash-ghost-enter 0.6s cubic-bezier(0.34,1.56,0.64,1) both, splash-ghost-float 3s ease-in-out 0.6s infinite",
        }}>
          {/* Aura glow behind ghost — absolute, overflow visible from parent */}
          <div style={{
            position: "absolute",
            inset: -50,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(154,123,255,0.36) 0%, rgba(108,92,231,0.12) 50%, transparent 70%)",
            animation: "splash-aura-pulse 2.4s ease-in-out infinite",
            zIndex: 0,
          }} />

          {/* Ghost mascot — full 512×512 viewBox, no background tile */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="80 28 352 410"
            width="176"
            height="205"
            style={{ display: "block", position: "relative", zIndex: 1, overflow: "visible" }}
          >
            <defs>
              <radialGradient id="sp-body" cx="0.36" cy="0.28" r="0.95">
                <stop offset="0" stopColor="#eef3ff" />
                <stop offset="0.26" stopColor="#bcc6ff" />
                <stop offset="0.52" stopColor="#8f86fb" />
                <stop offset="0.76" stopColor="#9a6cf2" />
                <stop offset="1" stopColor="#d86ce0" />
              </radialGradient>
              <radialGradient id="sp-warm" cx="0.62" cy="0.86" r="0.5">
                <stop offset="0" stopColor="#ff8de0" stopOpacity="0.65" />
                <stop offset="1" stopColor="#ff8de0" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="sp-spec" cx="0.5" cy="0.5" r="0.5">
                <stop offset="0" stopColor="#ffffff" stopOpacity="0.95" />
                <stop offset="0.6" stopColor="#ffffff" stopOpacity="0.25" />
                <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="sp-tip" cx="0.4" cy="0.35" r="0.7">
                <stop offset="0" stopColor="#ffffff" />
                <stop offset="0.5" stopColor="#b9a6ff" />
                <stop offset="1" stopColor="#7c6cf0" />
              </radialGradient>
            </defs>

            {/* Ripple circles from antenna tip */}
            {([0, 0.6, 1.2] as number[]).map((delay) => (
              <circle
                key={delay}
                cx="256" cy="58" r="22"
                fill="none" stroke="#b9a6ff" strokeWidth="3"
                style={{
                  transformBox: "fill-box",
                  transformOrigin: "center",
                  animation: `splash-antenna-ripple 1.8s ease-out ${delay}s infinite`,
                }}
              />
            ))}

            {/* Antenna */}
            <g style={{ animation: "splash-antenna-glow 2s ease-in-out 0.8s infinite" }}>
              <rect x="248" y="60" width="16" height="86" rx="8" fill="#6a5cd6" />
              <circle cx="256" cy="58" r="20" fill="url(#sp-tip)" />
              <circle cx="256" cy="58" r="20" fill="none" stroke="#ffffff" strokeOpacity="0.35" strokeWidth="2" />
            </g>

            {/* Ghost body */}
            <path
              d="M256 120 C174 120 120 182 120 266 C120 304 120 334 126 364 C133 398 156 416 192 416 C216 416 230 400 256 400 C282 400 296 416 320 416 C356 416 379 398 386 364 C392 334 392 304 392 266 C392 182 338 120 256 120 Z"
              fill="url(#sp-body)"
            />
            <path
              d="M256 120 C174 120 120 182 120 266 C120 304 120 334 126 364 C133 398 156 416 192 416 C216 416 230 400 256 400 C282 400 296 416 320 416 C356 416 379 398 386 364 C392 334 392 304 392 266 C392 182 338 120 256 120 Z"
              fill="url(#sp-warm)"
            />

            {/* Specular highlights */}
            <ellipse cx="198" cy="196" rx="66" ry="48" fill="url(#sp-spec)" transform="rotate(-24 198 196)" />
            <ellipse cx="330" cy="180" rx="16" ry="12" fill="#ffffff" fillOpacity="0.7" />

            {/* Eyes */}
            <g fill="#2a1f54">
              <rect x="206" y="232" width="34" height="86" rx="17" />
              <rect x="272" y="232" width="34" height="86" rx="17" />
            </g>
            <g fill="#ffffff" fillOpacity="0.9">
              <circle cx="223" cy="250" r="6" />
              <circle cx="289" cy="250" r="6" />
            </g>
          </svg>
        </div>

        {/* Shadow — stays fixed while ghost floats */}
        <div style={{
          width: 72, height: 12,
          marginTop: 4,
          borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(80,55,180,0.6) 0%, transparent 70%)",
          animation: "splash-shadow-pulse 3s ease-in-out 0.6s infinite",
        }} />
      </div>

      {/* App name */}
      <div style={{
        fontSize: 26, fontWeight: 800, letterSpacing: "-0.03em",
        color: "#ffffff",
        fontFamily: "var(--font-inter), system-ui, sans-serif",
        animation: "splash-name-rise 0.45s 0.55s cubic-bezier(0.4,0,0.2,1) both",
      }}>
        GhostRadio
      </div>
    </div>
  );
}
