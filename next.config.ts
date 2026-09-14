import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export: every route prerenders, and Firebase Hosting serves the
  // `out/` folder. No server, no Cloud Functions.
  output: "export",
  images: { unoptimized: true },
  trailingSlash: false,
};

export default nextConfig;
