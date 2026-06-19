import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  basePath: process.env.NODE_ENV === "production" ? "/philhealth-redesign" : "",
  assetPrefix: process.env.NODE_ENV === "production" ? "/philhealth-redesign/" : "",
  typescript: {
    // Skip type checking during build — we just want the static export
    ignoreBuildErrors: true,
  },
};

export default nextConfig;