import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "VideoBoost AI — Enhance Videos to 4K Ultra HD",
  description: "Transform your low-resolution videos into stunning 1080p, 2K, and 4K quality using AI. Fast, secure, and professional video enhancement online.",
  keywords: [
    "AI video enhancer",
    "video upscale online",
    "480p to 4K",
    "video quality improve",
    "AI video upscaling",
    "enhance video online free",
    "1080p 2K 4K video",
    "video boost AI"
  ],
  authors: [{ name: "VideoBoost AI" }],
  creator: "VideoBoost AI",
  publisher: "VideoBoost AI",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    type: "website",
    url: "https://video-enhance-ai.vercel.app",
    title: "VideoBoost AI — Enhance Videos to 4K Ultra HD",
    description: "Transform your low-resolution videos into stunning 1080p, 2K, and 4K quality using AI. Fast, free, and professional.",
    siteName: "VideoBoost AI",
    images: [
      {
        url: "https://video-enhance-ai.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "VideoBoost AI — Video Enhancer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "VideoBoost AI — Enhance Videos to 4K Ultra HD",
    description: "Transform your low-resolution videos into stunning 4K quality using AI. Free to try!",
    images: ["https://video-enhance-ai.vercel.app/og-image.png"],
  },
  alternates: {
    canonical: "https://video-enhance-ai.vercel.app",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
