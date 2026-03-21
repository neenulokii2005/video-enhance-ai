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
  title: "VideoBoost AI — Free AI Video Enhancer | 4K Upscaling",
  description: "Enhance your videos with AI. Upscale to 4K, improve quality, reduce noise. Free to use. No watermark. Fast processing.",
  keywords: "AI video enhancer, video upscaling, 4K upscale, video quality improve, free video enhancer, VideoBoost AI",
  authors: [{ name: "VideoBoost AI" }],
  metadataBase: new URL("https://video-enhance-ai.vercel.app"),
  openGraph: {
    title: "VideoBoost AI — Free AI Video Enhancer",
    description: "Enhance your videos with AI. Upscale to 4K for free.",
    url: "https://video-enhance-ai.vercel.app",
    siteName: "VideoBoost AI",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "VideoBoost AI Preview",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "VideoBoost AI — Free AI Video Enhancer",
    description: "Enhance your videos with AI. Upscale to 4K for free.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}