import type { NextConfig } from "next";
import { withSentryConfig } from "@sentry/nextjs";

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

const sentryBuildOptions =
  process.env.SENTRY_AUTH_TOKEN &&
  process.env.SENTRY_ORG &&
  process.env.SENTRY_PROJECT
    ? {
        silent: true,
        org: process.env.SENTRY_ORG,
        project: process.env.SENTRY_PROJECT,
        authToken: process.env.SENTRY_AUTH_TOKEN,
      }
    : {
        silent: true,
        sourcemaps: {
          disable: true,
        },
      };

export default withSentryConfig(nextConfig, sentryBuildOptions);
