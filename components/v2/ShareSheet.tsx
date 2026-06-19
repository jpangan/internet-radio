"use client";

import { useEffect, useState } from "react";
import { gradientFor, initials } from "@/lib/cover";
import { parseTags } from "@/lib/utils";
import type { Station } from "@/lib/types";
import QRCode from "react-qr-code";

interface ShareSheetProps {
  open: boolean;
  station: Station | null;
  onClose: () => void;
  url: string;
}

export default function ShareSheet({ open, station, onClose, url }: ShareSheetProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!open) setCopied(false);
  }, [open, station]);

  if (!open || !station) return null;

  const g = gradientFor(station.name);
  const ini = initials(station.name);
  const tags = parseTags(station.tags, 3);
  const meta = [station.country, station.language].filter(Boolean).join(" · ");
  const prettyUrl = url.replace(/^https?:\/\//, "");

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  return (
    <div
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      style={{
        position: "absolute", inset: 0, zIndex: 80,
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: 18, background: "rgba(0,0,0,0.5)",
        backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)",
      }}
    >
      <div style={{
        width: "100%", maxWidth: 372, position: "relative",
        borderRadius: "var(--v-r-xl)", overflow: "hidden",
        maxHeight: "calc(100% - 24px)", overflowY: "auto",
        background: "var(--v-bg-2)", border: "1px solid var(--v-hairline-2)",
        boxShadow: "var(--v-shadow-pop)", animation: "v-rise .36s var(--v-ease)",
      }}>
        {/* Ambient gradient header */}
        <div style={{ position: "relative", height: 132, overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: "-30%", background: g.css, filter: "blur(36px) saturate(150%)" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,0,0,0.15), var(--v-bg-2))" }} />
          <button type="button" onClick={onClose} aria-label="Close" style={{
            position: "absolute", top: 14, right: 14, width: 32, height: 32, borderRadius: 99,
            border: "none", cursor: "pointer", background: "rgba(0,0,0,0.28)", color: "#fff",
            display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(8px)",
          }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>
          <div style={{
            position: "absolute", left: 0, right: 0, top: 14, textAlign: "center",
            fontSize: 10.5, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em",
            color: "rgba(255,255,255,0.78)",
          }}>
            Share station
          </div>
        </div>

        <div style={{ padding: "0 24px 24px", marginTop: -52, position: "relative" }}>
          {/* Cover + identity */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
            <div style={{
              width: 96, height: 96, borderRadius: "var(--v-r-lg)", background: g.css,
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.14), 0 16px 40px rgba(0,0,0,0.4)",
              border: "3px solid var(--v-bg-2)",
            }}>
              <span style={{ fontWeight: 800, fontSize: 34, color: "rgba(255,255,255,0.95)", letterSpacing: "-0.03em" }}>
                {ini}
              </span>
            </div>
            <div style={{ textAlign: "center", maxWidth: "100%" }}>
              <h2 style={{
                margin: 0, fontSize: 19, fontWeight: 780, letterSpacing: "-0.02em",
                color: "var(--v-fg)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
              }}>
                {station.name}
              </h2>
              {meta && <p style={{ margin: "5px 0 0", fontSize: 13, color: "var(--v-fg-3)" }}>{meta}</p>}
            </div>
            {(tags.length > 0 || station.codec) && (
              <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 7 }}>
                {tags.map((t) => (
                  <span key={t} style={{
                    padding: "4px 12px", borderRadius: 99, fontSize: 11.5, fontWeight: 600,
                    textTransform: "capitalize", background: "var(--v-elev-2)",
                    border: "1px solid var(--v-hairline)", color: "var(--v-fg-2)",
                  }}>{t}</span>
                ))}
                {station.codec && (
                  <span style={{
                    padding: "4px 10px", borderRadius: 99, fontSize: 10.5, fontWeight: 700,
                    letterSpacing: "0.04em", textTransform: "uppercase",
                    background: "var(--v-accent-soft)", color: "var(--v-accent)",
                  }}>
                    {station.codec}{station.bitrate ? ` · ${station.bitrate}k` : ""}
                  </span>
                )}
              </div>
            )}
          </div>

          {/* QR card */}
          {url && (
            <div style={{ marginTop: 22, display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div style={{
                position: "relative", borderRadius: "var(--v-r-lg)", padding: 16,
                background: "#fff",
                boxShadow: "0 0 0 1px var(--v-accent-soft), 0 16px 44px rgba(108,92,231,0.26)",
              }}>
                <QRCode value={url} size={176} />
                {/* Logo overlay */}
                <div style={{
                  position: "absolute", inset: 0, display: "flex",
                  alignItems: "center", justifyContent: "center", pointerEvents: "none",
                }}>
                  <div style={{ width: 38, height: 38, borderRadius: 10, background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 0 4px #fff" }}>
                    <div style={{
                      width: 32, height: 32, borderRadius: 9,
                      background: "linear-gradient(135deg, var(--v-accent), var(--v-accent-2))",
                      display: "flex", alignItems: "center", justifyContent: "center", color: "#fff",
                    }}>
                      <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <path d="M16 12a4 4 0 0 1-8 0"/><path d="M12 12v9"/><circle cx="12" cy="12" r="2"/>
                        <path d="M12 3v1M4.2 6.2l.7.7M19.1 6.2l-.7.7M2 12h1M21 12h1"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              <div style={{ marginTop: 12, fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--v-fg-4)" }}>
                Scan to tune in
              </div>
            </div>
          )}

          {/* Readable link */}
          <div style={{
            marginTop: 20, display: "flex", alignItems: "center", gap: 10,
            padding: "10px 12px 10px 14px", borderRadius: "var(--v-r-md)",
            background: "var(--v-elev-2)", border: "1px solid var(--v-hairline)",
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" style={{ color: "var(--v-fg-3)", flexShrink: 0 }}>
              <circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20M12 2a14.5 14.5 0 0 1 0 20M2 12h20"/>
            </svg>
            <span style={{
              flex: 1, minWidth: 0, fontSize: 13, color: "var(--v-fg-2)",
              whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
            }}>
              {prettyUrl}
            </span>
          </div>

          {/* Copy link button */}
          <button
            type="button"
            onClick={copyLink}
            style={{
              marginTop: 10, width: "100%", padding: "14px 0",
              borderRadius: "var(--v-r-md)", border: "none", cursor: "pointer",
              fontSize: 14.5, fontWeight: 700,
              background: copied ? "rgba(52,199,89,0.16)" : "linear-gradient(135deg, var(--v-accent), var(--v-accent-2))",
              color: copied ? "#34c759" : "#fff",
              boxShadow: copied ? "none" : "0 8px 24px rgba(108,92,231,0.4)",
              transition: "background .2s, color .2s",
            }}
          >
            <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
              {copied ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M20 6L9 17l-5-5"/></svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                </svg>
              )}
              {copied ? "Link copied to clipboard" : "Copy Link"}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
