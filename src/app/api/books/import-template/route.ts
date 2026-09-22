import { proxyError, UpstreamError } from "@/core/lib/apiProxy";
import { getHeader } from "@/core/lib/utils";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const format =
      new URL(request.url).searchParams.get("format") === "csv"
        ? "csv"
        : "xlsx";

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/books/import-template?format=${format}`,
      {
        method: "GET",
        headers: { Authorization: getHeader(request) || "" },
      },
    );

    if (!response.ok) {
      throw new UpstreamError(
        response.status,
        await response.text().catch(() => ""),
      );
    }

    // Binary pass-through: the body is an .xlsx/.csv file, not JSON.
    return new NextResponse(await response.arrayBuffer(), {
      status: 200,
      headers: {
        "Content-Type":
          response.headers.get("Content-Type") ?? "application/octet-stream",
        "Content-Disposition":
          response.headers.get("Content-Disposition") ??
          `attachment; filename="book_import_template.${format}"`,
      },
    });
  } catch (error) {
    return proxyError(error, "Failed to download the import template");
  }
}
