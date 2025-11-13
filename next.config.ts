import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.unsplash.com",
      },
      // Development: Allow any hostname
      ...(process.env.NODE_ENV === "development"
        ? [
            {
              protocol: "https" as const,
              hostname: "**",
            },
          ]
        : []),
      ...(process.env.NEXT_PUBLIC_S3_HOSTNAME
        ? [
            {
              protocol: "https" as const,
              hostname: process.env.NEXT_PUBLIC_S3_HOSTNAME,
            },
          ]
        : []),
    ],
  },
};

export default nextConfig;
