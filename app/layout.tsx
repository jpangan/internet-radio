import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Internet Radio",
  description: "Stream radio stations from around the world",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Internet Radio",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#07070f",
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
        <link rel="icon" href="/favicon.svg" sizes="any" />
      </head>
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
