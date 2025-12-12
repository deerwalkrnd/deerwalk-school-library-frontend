import * as Sentry from "@sentry/nextjs";

function getCommonOptions() {
  return {
    dsn: process.env.SENTRY_DSN,
    enabled: Boolean(process.env.SENTRY_DSN),
    environment: process.env.SENTRY_ENVIRONMENT ?? process.env.NODE_ENV,
    tracesSampleRate: 1.0,
    debug: false,
  };
}

export function register() {
  if (process.env.NEXT_RUNTIME === "edge") {
    Sentry.init(getCommonOptions());
    return;
  }

  if (process.env.NEXT_RUNTIME === "nodejs") {
    Sentry.init({
      ...getCommonOptions(),
      profilesSampleRate: 1.0,
    });
  }
}
