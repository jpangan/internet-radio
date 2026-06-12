import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Internet Radio",
  description: "Stream radio stations from around the world",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
