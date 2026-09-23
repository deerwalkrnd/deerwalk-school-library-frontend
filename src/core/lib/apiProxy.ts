import { NextResponse } from "next/server";

/**
 * Raised when the backend answers a proxied call with a non-2xx status.
 *
 * Route handlers used to collapse every failure into a 500, which meant the
 * client could not tell "your session expired" (401) from "that book is gone"
 * (404) from a genuine server fault. Carrying the status lets the handler
 * echo it back.
 */
export class UpstreamError extends Error {
  constructor(
    readonly status: number,
    readonly body: string,
  ) {
    super(`Upstream responded with ${status}`);
    this.name = "UpstreamError";
  }
}

/** Throw an `UpstreamError` unless the response is ok. */
export async function assertUpstreamOk(response: Response): Promise<void> {
  if (!response.ok) {
    const body = await response.text().catch(() => "");
    throw new UpstreamError(response.status, body);
  }
}

/**
 * Turn a caught error into the response to send back.
 *
 * Upstream failures keep their status and JSON body (so `detail.msg` from
 * FastAPI still reaches the UI); anything else is a real 500.
 */
export function proxyError(error: unknown, fallbackMessage: string) {
  if (error instanceof UpstreamError) {
    try {
      return NextResponse.json(JSON.parse(error.body), {
        status: error.status,
      });
    } catch {
      return NextResponse.json(
        { message: error.body || fallbackMessage },
        { status: error.status },
      );
    }
  }

  console.error(fallbackMessage, error);
  return NextResponse.json({ message: fallbackMessage }, { status: 500 });
}
