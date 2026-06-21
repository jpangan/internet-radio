import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import QueryProvider from "@/components/QueryProvider";
import PostHogProvider from "@/components/PostHogProvider";
import ThemeProvider from "@/components/v2/ThemeProvider";
import "./globals.css";

// Self-hosted Inter via next/font: emits the file under /_next/static/media
// (which the PWA service worker precaches), injects a preload <link>, and adds
// size-adjusted fallback metrics. Exposed as the --font-inter CSS variable.
const inter = localFont({
  src: [
    { path: "./fonts/InterVariable.woff2", style: "normal", weight: "100 900" },
    { path: "./fonts/InterVariable-Italic.woff2", style: "italic", weight: "100 900" },
  ],
  variable: "--font-inter",
  display: "swap",
  preload: true,
  fallback: ["system-ui", "-apple-system", "Segoe UI", "Roboto", "sans-serif"],
});

export const metadata: Metadata = {
  title: "Internet Radio",
  description: "Stream radio stations from around the world",
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Internet Radio",
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#08080d" },
    { media: "(prefers-color-scheme: light)", color: "#f4f4f7" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased">
        <PostHogProvider>
          <QueryProvider>
            <ThemeProvider>{children}</ThemeProvider>
          </QueryProvider>
        </PostHogProvider>
      </body>
    </html>
  );
}
