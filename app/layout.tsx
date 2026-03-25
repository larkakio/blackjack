import type { Metadata, Viewport } from "next";
import { Orbitron, Exo_2, Rajdhani } from "next/font/google";
import { Providers } from "./providers";
import "./globals.css";

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
});
const exo = Exo_2({ subsets: ["latin"], variable: "--font-exo" });
const rajdhani = Rajdhani({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-rajdhani",
});

const APP_URL =
  process.env.NEXT_PUBLIC_APP_URL || "https://blackjack-chi-rust.vercel.app";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: "#0a0e1a",
};

export const metadata: Metadata = {
  title: "Blackjack Neo Play on Base",
  description:
    "Futuristic Blackjack game with swipe controls on Base. Hit, stand, double, split — neon cyberpunk style.",
  openGraph: {
    title: "Blackjack Neo Play on Base",
    description: "Win crypto playing Blackjack with swipe gestures on Base",
    images: [{ url: `${APP_URL}/hero-image.png`, width: 1200, height: 630 }],
    url: APP_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: "Blackjack Neo Play on Base",
    description: "Futuristic Blackjack on Base",
    images: [`${APP_URL}/hero-image.png`],
  },
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },
  manifest: "/manifest.json",
  other: {
    "base:app_id": "6995758d25337829d86a5406",
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${orbitron.variable} ${exo.variable} ${rajdhani.variable}`}
    >
      <body className="min-h-screen bg-space-dark text-white antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
