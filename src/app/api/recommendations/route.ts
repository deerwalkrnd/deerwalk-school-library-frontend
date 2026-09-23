import { assertUpstreamOk, proxyError } from "@/core/lib/apiProxy";
import { getHeader } from "@/core/lib/utils";
import { NextResponse } from "next/server";
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get("page") || "1";
    const limit = searchParams.get("limit") || "10";
    const searchableValue = searchParams.get("searchable_value");
    const searchableField = searchParams.get("searchable_field");
    const backendUrl = new URL(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/recommendations`,
    );
    // backendUrl.searchParams.append("sort_by", "created_at");
    backendUrl.searchParams.append("page", page);
    backendUrl.searchParams.append("limit", limit);

    if (searchableValue) {
      backendUrl.searchParams.append("searchable_value", searchableValue);
      if (searchableField) {
        backendUrl.searchParams.append("searchable_field", searchableField);
      }
    }
    const authHeader = getHeader(request);
    const response = await fetch(backendUrl, {
      method: "GET",
      headers: {
        Authorization: authHeader || "",
        "Content-Type": "application/json",
      },
    });
    await assertUpstreamOk(response);
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return proxyError(error, "Failed to fetch recommendations");
  }
}
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const authHeader = getHeader(request);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/recommendations`,
      {
        method: "POST",
        headers: {
          Authorization: authHeader || "",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      },
    );
    await assertUpstreamOk(response);
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Failed to create recommendation:", error);
    return proxyError(error, "Failed to create recommendation");
  }
}
