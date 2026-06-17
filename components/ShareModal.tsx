"use client";

import { useState } from "react";
import QRCode from "react-qr-code";
import type { Station, Country } from "@/lib/types";
import { useModalAnimation } from "@/lib/useModalAnimation";

interface ShareModalProps {
  isOpen: boolean;
  url: string;
  onClose: () => void;
  onCopyLink: () => void;
  copied?: boolean;
  station?: Station | null;
  country?: Country | null;
}

function RadioFallback() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full p-2.5" style={{ color: "rgba(148,136,245,0.6)" }}>
      <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
      <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
    </svg>
  );
}

export default function ShareModal({
  isOpen,
  url,
  onClose,
  onCopyLink,
  copied = false,
  station,
  country,
}: ShareModalProps) {
  const [faviconError, setFaviconError] = useState(false);
  const { shouldRender, animatingOut } = useModalAnimation(isOpen);

  if (!shouldRender) return null;

  const tags = station?.tags
    ? station.tags.split(",").map((t) => t.trim()).filter(Boolean).slice(0, 3)
    : [];

  const hasFavicon = !!station?.favicon && !faviconError;

  return (
    <div
      className={`${animatingOut ? "modal-overlay-out" : "modal-overlay"} fixed inset-0 z-50 flex items-end sm:items-center sm:justify-center sm:p-4`}
      style={{
        background: "rgba(0,0,0,0.72)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className={`${animatingOut ? "modal-sheet-down" : "modal-sheet"} w-full sm:max-w-xs relative flex flex-col overflow-hidden rounded-t-3xl sm:rounded-3xl`}
        style={{
          background: "linear-gradient(160deg, rgba(18,14,40,0.99) 0%, rgba(10,10,22,0.99) 100%)",
          backdropFilter: "blur(40px) saturate(180%)",
          WebkitBackdropFilter: "blur(40px) saturate(180%)",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 -4px 60px rgba(0,0,0,0.7), 0 0 0 1px rgba(124,108,240,0.08), inset 0 1px 0 rgba(255,255,255,0.06)",
        }}
      >
        {/* Drag handle — mobile */}
        <div className="flex justify-center pt-3 sm:hidden shrink-0">
          <div className="h-1 w-10 rounded-full" style={{ background: "rgba(255,255,255,0.15)" }} />
        </div>

        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 z-10 flex h-7 w-7 items-center justify-center rounded-full transition-colors"
          style={{ background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.4)" }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(255,255,255,0.13)";
            e.currentTarget.style.color = "white";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(255,255,255,0.07)";
            e.currentTarget.style.color = "rgba(255,255,255,0.4)";
          }}
        >
          <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        {/* Station hero */}
        <div className="flex flex-col items-center px-6 pt-7 pb-5 gap-3">
          {/* Favicon */}
          <div
            className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl overflow-hidden"
            style={{
              background: "rgba(124,108,240,0.1)",
              border: "1.5px solid rgba(124,108,240,0.2)",
              boxShadow: "0 0 24px rgba(124,108,240,0.2)",
            }}
          >
            {hasFavicon ? (
              <img
                src={station!.favicon}
                alt=""
                className="h-full w-full object-cover"
                onError={() => setFaviconError(true)}
              />
            ) : (
              <RadioFallback />
            )}
          </div>

          {/* Name */}
          <div className="text-center min-w-0 w-full px-2">
            <h2
              className="text-base font-bold leading-tight text-white truncate"
              title={station?.name}
            >
              {station?.name ?? "Radio Station"}
            </h2>
            {(country?.name || station?.language) && (
              <p className="text-xs mt-1 truncate" style={{ color: "rgba(255,255,255,0.38)" }}>
                {[country?.name, station?.language].filter(Boolean).join(" · ")}
              </p>
            )}
          </div>

          {/* Tags */}
          {tags.length > 0 && (
            <div className="flex flex-wrap justify-center gap-1.5">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full px-2.5 py-0.5 text-[10px] font-medium capitalize"
                  style={{
                    background: "rgba(124,108,240,0.12)",
                    border: "1px solid rgba(124,108,240,0.22)",
                    color: "rgba(196,190,255,0.85)",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Bitrate / codec */}
          {(station?.bitrate || station?.codec) && (
            <div className="flex items-center gap-2">
              {station.codec && (
                <span
                  className="rounded-md px-2 py-0.5 text-[10px] font-semibold tracking-wide uppercase"
                  style={{ background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.28)" }}
                >
                  {station.codec}
                </span>
              )}
              {station.bitrate ? (
                <span className="text-[10px]" style={{ color: "rgba(255,255,255,0.22)" }}>
                  {station.bitrate} kbps
                </span>
              ) : null}
            </div>
          )}
        </div>

        {/* Divider with label */}
        <div className="flex items-center gap-3 px-6 pb-5">
          <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.06)" }} />
          <span className="text-[10px] tracking-widest uppercase font-medium" style={{ color: "rgba(255,255,255,0.2)" }}>
            Scan to tune in
          </span>
          <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.06)" }} />
        </div>

        {/* QR Code */}
        <div className="flex flex-col items-center px-6 pb-6 gap-4">
          <div
            className="relative rounded-2xl p-4"
            style={{
              background: "white",
              boxShadow: "0 0 0 1px rgba(124,108,240,0.2), 0 8px 40px rgba(124,108,240,0.25), 0 2px 8px rgba(0,0,0,0.4)",
            }}
          >
            <QRCode value={url} size={188} fgColor="#1a0f3c" bgColor="white" />

            {/* Station favicon overlay in center of QR */}
            {hasFavicon && (
              <div
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
              >
                <div
                  className="h-9 w-9 rounded-lg overflow-hidden"
                  style={{
                    background: "white",
                    padding: "3px",
                    boxShadow: "0 0 0 1.5px rgba(124,108,240,0.3)",
                  }}
                >
                  <img
                    src={station!.favicon}
                    alt=""
                    className="h-full w-full object-cover rounded-md"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Copy Link button */}
          <button
            type="button"
            onClick={copied ? undefined : onCopyLink}
            className="w-full rounded-xl py-3 text-sm font-semibold transition-all active:scale-[0.97]"
            style={{
              background: copied
                ? "rgba(52,199,89,0.15)"
                : "rgba(124,108,240,0.18)",
              border: copied
                ? "1px solid rgba(52,199,89,0.35)"
                : "1px solid rgba(124,108,240,0.3)",
              color: copied ? "rgb(52,199,89)" : "rgba(255,255,255,0.9)",
              boxShadow: copied
                ? "0 0 16px rgba(52,199,89,0.1)"
                : "0 0 16px rgba(124,108,240,0.08)",
            }}
            onMouseEnter={(e) => {
              if (!copied) {
                e.currentTarget.style.background = "rgba(124,108,240,0.3)";
                e.currentTarget.style.boxShadow = "0 0 20px rgba(124,108,240,0.2)";
              }
            }}
            onMouseLeave={(e) => {
              if (!copied) {
                e.currentTarget.style.background = "rgba(124,108,240,0.18)";
                e.currentTarget.style.boxShadow = "0 0 16px rgba(124,108,240,0.08)";
              }
            }}
          >
            {copied ? (
              <span className="flex items-center justify-center gap-1.5">
                <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Link copied!
              </span>
            ) : (
              <span className="flex items-center justify-center gap-1.5">
                <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
                Copy Link
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
