import type { NextConfig } from "next";

// Every route is prerendered at build time (static generation) and served by
// Vercel. No `output: "export"`: Vercel handles the static output itself.
const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
