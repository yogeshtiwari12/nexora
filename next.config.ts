import type { NextConfig } from "next";
import { withSentryConfig } from "@sentry/nextjs";

const nextConfig: NextConfig = {
  reactStrictMode: true,
};

const sentryWebpackPluginOptions = {
  org: "nxxora",
  project: "javascript-nextjs",

  // Silence logs locally
  silent: true,

  // Faster builds
  widenClientFileUpload: false,

  // Route browser requests through Next.js
  tunnelRoute: "/monitoring",

  // Remove Sentry logger statements
  disableLogger: true,

  // Enable Vercel Cron Monitoring
  automaticVercelMonitors: true,
};

// Upload sourcemaps only in CI/production
export default process.env.CI
  ? withSentryConfig(nextConfig, sentryWebpackPluginOptions)
  : nextConfig;