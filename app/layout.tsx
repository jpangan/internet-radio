import type { Metadata, Viewport } from "next";
import QueryProvider from "@/components/QueryProvider";
import PostHogProvider from "@/components/PostHogProvider";
import ThemeProvider from "@/components/v2/ThemeProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Internet Radio",
  description: "Stream radio stations from around the world",
  manifest: "/manifest.json",
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
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/icon-192.png" sizes="192x192" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="mask-icon" href="/favicon.svg" color="#8b7bff" />
      </head>
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
