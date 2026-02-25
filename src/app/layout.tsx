import type { Metadata } from "next";
import { Bebas_Neue, DM_Sans } from "next/font/google";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  weight: "400",
  variable: "--font-bebas",
  subsets: ["latin"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Piece of Mind Guns | Premium Firearms, Silencers & Accessories",
  description:
    "Utah's premier destination for premium firearms, silencers, optics, and accessories. Curated selection from Noveske, Daniel Defense, HK, B&T, Dead Air, and more. Salt Lake City.",
  keywords:
    "guns, firearms, silencers, suppressors, optics, Salt Lake City, Utah, Noveske, Daniel Defense, HK, Dead Air, NFA",
  openGraph: {
    title: "Piece of Mind Guns | Premium Firearms & Silencers",
    description:
      "Utah's premier destination for premium firearms, silencers, optics, and accessories.",
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
      <body className={`${bebasNeue.variable} ${dmSans.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
