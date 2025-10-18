import type { Metadata } from "next";
import { Space_Grotesk, Syne, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/common/Navbar";

// Primary Font
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

// Display Font
const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

// Monospace Font
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Egnuma Gelana | Frontend Developer & Graphics Designer",
  description: "Award-winning portfolio showcasing innovative web development and creative design solutions. Specializing in modern, animated web experiences.",
  keywords: "Frontend Developer, Graphics Designer, Web Development, UI/UX, React, Next.js, Portfolio",
  authors: [{ name: "Egnuma Gelana" }],
  creator: "Egnuma Gelana",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://egnumagelana.com",
    title: "Egnuma Gelana | Frontend Developer & Graphics Designer",
    description: "Award-winning portfolio showcasing innovative web development and creative design solutions.",
    siteName: "Egnuma Gelana Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Egnuma Gelana | Frontend Developer & Graphics Designer",
    description: "Award-winning portfolio showcasing innovative web development and creative design solutions.",
    creator: "@egnumagelana",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${spaceGrotesk.variable} ${syne.variable} ${jetbrainsMono.variable} font-sans antialiased relative`}
      >
        {/* Mesh Gradient Background */}
        <div className="fixed inset-0 -z-10">
          <div className="absolute inset-0 mesh-gradient" />
          <div className="absolute inset-0 bg-ink/90" />
        </div>
        
        {/* Main Content */}
        <main className="relative z-10">
          <Navbar />
          {children}
        </main>
      </body>
    </html>
  );
}