import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* output: "standalone" removed — deployment platform handles server */
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
};

export default nextConfig;
