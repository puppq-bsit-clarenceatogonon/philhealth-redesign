import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  // Replace "philhealth-redesign" with your actual GitHub repo name
  basePath: process.env.NODE_ENV === "production" ? "/philhealth-redesign" : "",
  assetPrefix: process.env.NODE_ENV === "production" ? "/philhealth-redesign/" : "",
};

export default nextConfig;