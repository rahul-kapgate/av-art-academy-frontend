import type { NextConfig } from "next";

const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:5000";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    agentFeedback: true,
  },
  cacheComponents: true,

  async rewrites() {
    return [
      {
        source: "/api/v1/auth/:path*",

        destination: `${API_BASE_URL.replace(/\/$/, "")}/api/v1/auth/:path*`,
      },
    ];
  },

  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
