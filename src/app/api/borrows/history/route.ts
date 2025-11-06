import { getHeader } from "@/core/lib/utils";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    let authHeader = getHeader(request);

    const page = searchParams.get("page") || "1";
    const limit = searchParams.get("limit") || "10";
    const searchableValue = searchParams.get("searchable_value");
    const searchableField = searchParams.get("searchable_field");
    const startDate = searchParams.get("start_date");
    const endDate = searchParams.get("end_date");
    const backendUrl = new URL(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/borrows/history`,
    );
    backendUrl.searchParams.append("page", page);
    backendUrl.searchParams.append("limit", limit);

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

    if (!response.ok) {
      throw new Error(`Network! status ${response.ok}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch borrow history" },
      { status: 500 },
    );
  }
}
