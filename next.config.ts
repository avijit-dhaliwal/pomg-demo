import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    DATA_MODE: process.env.DATA_MODE ?? "demo",
    LIVE_METRICS_JSON: process.env.LIVE_METRICS_JSON ?? "",
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn11.bigcommerce.com" },
      { protocol: "https", hostname: "danieldefense.com" },
      { protocol: "https", hostname: "www.sigsauer.com" },
      { protocol: "https", hostname: "hk-usa.com" },
      { protocol: "https", hostname: "kafodufi.myhostpoint.ch" },
      { protocol: "https", hostname: "www.lwrci.com" },
      { protocol: "https", hostname: "www.nighthawkcustom.com" },
      { protocol: "https", hostname: "www.knightarmco.com" },
      { protocol: "https", hostname: "www.eotechinc.com" },
      { protocol: "https", hostname: "upload.wikimedia.org" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "cdn55.coreware.com" },
    ],
  },
};

export default nextConfig;
