"use client";

import { useState } from "react";

interface StationFaviconProps {
  src: string;
  alt: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeClasses = {
  sm: "h-8 w-8",
  md: "h-10 w-10",
  lg: "h-32 w-32",
};

function RadioIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9" />
      <path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5" />
      <circle cx="12" cy="12" r="2" />
      <path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5" />
      <path d="M19.1 4.9C23 8.8 23 15.1 19.1 19" />
    </svg>
  );
}

export default function StationFavicon({
  src,
  alt,
  size = "md",
  className = "",
}: StationFaviconProps) {
  const [error, setError] = useState(false);
  const sizeClass = sizeClasses[size];

  if (!src || error) {
    return (
      <div
        className={`${sizeClass} flex shrink-0 items-center justify-center rounded-lg bg-[var(--surface)] text-[var(--muted)] ${className}`}
      >
        <RadioIcon className={size === "lg" ? "h-12 w-12" : "h-5 w-5"} />
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className={`${sizeClass} shrink-0 rounded-lg bg-[var(--surface)] object-cover ${className}`}
      onError={() => setError(true)}
    />
  );
}
