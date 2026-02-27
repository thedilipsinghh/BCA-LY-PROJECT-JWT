import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://bca-ly-project-jwt-server.vercel.app/api/:path*",
      },
    ];
  }
};

export default nextConfig;
