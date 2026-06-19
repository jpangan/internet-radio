"use client";

import { useEffect, useState } from "react";

export interface ToastMessage {
  id: number;
  text: string;
  type?: "added" | "removed";
}

interface ToastProps {
  messages: ToastMessage[];
  onDismiss: (id: number) => void;
}

function ToastItem({ msg, onDismiss }: { msg: ToastMessage; onDismiss: (id: number) => void }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const show = requestAnimationFrame(() => setVisible(true));
    const hide = setTimeout(() => setVisible(false), 2600);
    const remove = setTimeout(() => onDismiss(msg.id), 3000);
    return () => {
      cancelAnimationFrame(show);
      clearTimeout(hide);
      clearTimeout(remove);
    };
  }, [msg.id, onDismiss]);

  const isAdded = msg.type !== "removed";

  return (
    <div
      style={{
        display: "flex", alignItems: "center", gap: 10,
        padding: "11px 16px 11px 12px",
        borderRadius: "var(--v-r-lg)",
        background: "var(--v-mat-chrome)",
        backdropFilter: "var(--v-mat-blur)",
        WebkitBackdropFilter: "var(--v-mat-blur)",
        border: "1px solid var(--v-hairline-2)",
        boxShadow: "var(--v-shadow-pop)",
        color: "var(--v-fg)",
        fontSize: 14, fontWeight: 600,
        fontFamily: "var(--v-font)",
        whiteSpace: "nowrap",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0) scale(1)" : "translateY(10px) scale(0.97)",
        transition: "opacity .25s var(--v-ease-soft), transform .25s var(--v-ease-soft)",
        pointerEvents: "none",
      }}
    >
      <span style={{
        width: 28, height: 28, borderRadius: "var(--v-r-md)", flexShrink: 0,
        display: "flex", alignItems: "center", justifyContent: "center",
        background: isAdded ? "var(--v-accent-soft)" : "rgba(255,255,255,0.08)",
        color: isAdded ? "var(--v-accent)" : "var(--v-fg-3)",
      }}>
        {isAdded ? (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        ) : (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        )}
      </span>
      {msg.text}
    </div>
  );
}

export default function Toast({ messages, onDismiss }: ToastProps) {
  if (messages.length === 0) return null;

  return (
    <div style={{
      position: "absolute", bottom: 96, left: 0, right: 0, zIndex: 90,
      display: "flex", flexDirection: "column", alignItems: "center",
      gap: 8, pointerEvents: "none",
    }}>
      {messages.map((msg) => (
        <ToastItem key={msg.id} msg={msg} onDismiss={onDismiss} />
      ))}
    </div>
  );
}
