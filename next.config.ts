import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value: "frame-ancestors 'self' https://www.psychofolio.com https://psychofolio.com",
          },
          // Explicitly NOT setting X-Frame-Options so iframe embedding works
        ],
      },
    ];
  },
};

export default nextConfig;
