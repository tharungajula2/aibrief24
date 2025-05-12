// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // 🚦  Prevent ESLint warnings from blocking the Vercel build
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;

