import { assertUpstreamOk, proxyError } from "@/core/lib/apiProxy";
import { getHeader } from "@/core/lib/utils";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const authHeader = getHeader(request);

    const page = searchParams.get("page") || "1";
    const limit = searchParams.get("limit") || "10";
    const isAck = searchParams.get("is_ack");

    const searchableValue = searchParams.get("searchable_value");
    const searchableField = searchParams.get("searchable_field");
    const startDate = searchParams.get("start_date");
    const endDate = searchParams.get("end_date");

    const backendUrl = new URL(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/feedbacks`,
    );
    backendUrl.searchParams.append("page", page);
    backendUrl.searchParams.append("limit", limit);
    if (isAck !== null) {
      backendUrl.searchParams.append("is_ack", isAck);
    }
    if (searchableValue) {
      backendUrl.searchParams.append("searchable_value", searchableValue);
      if (searchableField) {
        backendUrl.searchParams.append("searchable_field", searchableField);
      }
    }
    if (startDate) {
      backendUrl.searchParams.append("start_date", startDate);
    }
    if (endDate) {
      backendUrl.searchParams.append("end_date", endDate);
    }

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
    return proxyError(error, "Failed to fetch feedbacks");
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const authHeader = getHeader(req);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/feedbacks`,
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
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error("Failed to submit feedback:", error);
    return proxyError(error, "Failed to submit feedback");
  }
}
