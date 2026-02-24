import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Piece of Mind Guns | Premium Firearms, Silencers & Accessories",
  description: "Utah's premier destination for premium firearms, silencers, optics, and accessories. Curated selection from Noveske, Daniel Defense, HK, B&T, Dead Air, and more. Salt Lake City.",
  keywords: "guns, firearms, silencers, suppressors, optics, Salt Lake City, Utah, Noveske, Daniel Defense, HK, Dead Air, NFA",
  openGraph: {
    title: "Piece of Mind Guns | Premium Firearms & Silencers",
    description: "Utah's premier destination for premium firearms, silencers, optics, and accessories.",
    type: "website",
    locale: "en_US",
    siteName: "Piece of Mind Guns",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
