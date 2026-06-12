"use client";

import * as Flags from "country-flag-icons/react/3x2";

interface FlagIconProps {
  code: string; // ISO 3166-1 alpha-2
  className?: string;
}

export default function FlagIcon({ code, className = "" }: FlagIconProps) {
  const key = code?.toUpperCase() as keyof typeof Flags;
  const Flag = Flags[key];

  if (!Flag) {
    return (
      <span
        className={`inline-flex items-center justify-center text-xs ${className}`}
        style={{ color: "rgba(255,255,255,0.3)" }}
      >
        🌐
      </span>
    );
  }

  return <Flag className={className} />;
}
