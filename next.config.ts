import type { NextConfig } from "next";
import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  dest: "public",
  cacheOnFrontEndNav: true,
  reloadOnOnline: true,
  disable: process.env.NODE_ENV === "development",
  fallbacks: {
    document: "/offline",
  },
  // Activate new service worker immediately and claim all open tabs so
  // users always get the latest version without needing to close the app.
  workboxOptions: {
    disableDevLogs: true,
    skipWaiting: true,
    clientsClaim: true,
    // Precache the font at its stable public URL so it's always available
    // offline and never falls through to a runtime-cache miss on iOS.
    additionalManifestEntries: [
      { url: "/fonts/InterVariable.woff2", revision: null },
    ],
  },
});

const nextConfig: NextConfig = {
  outputFileTracingRoot: import.meta.dirname,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**" },
      { protocol: "http", hostname: "**" },
    ],
  },
};

export default withPWA(nextConfig);
