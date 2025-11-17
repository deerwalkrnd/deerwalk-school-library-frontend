import * as Sentry from "@sentry/nextjs";

export function register() {
  const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN;
  const environment =
    process.env.NEXT_PUBLIC_VERCEL_ENV ?? process.env.NODE_ENV;

  Sentry.init({
    dsn,
    enabled: Boolean(dsn),
    environment,
    tracesSampleRate: 1.0,
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
    integrations: [Sentry.replayIntegration()],
    debug: false,
  });
}
