import { getHeader } from "@/core/lib/utils";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get("page") || "1";
    const limit = searchParams.get("limit") || "10";
    const searchableValue = searchParams.get("searchable_value");
    const searchableField = searchParams.get("searchable_field");
    const startDate = searchParams.get("start_date");
    const endDate = searchParams.get("end_date");

    const backendUrl = new URL(`${process.env.NEXT_PUBLIC_BACKEND_URL}/quotes`);
    backendUrl.searchParams.append("sort_by", "created_at");
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
    let authHeader = getHeader(request);
    const response = await fetch(backendUrl, {
      method: "GET",
      headers: {
        Authorization: authHeader || "",
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status ${response.status}`);
    }
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      {
        message: "Failed to fetch quotes",
      },
      {
        status: 500,
      },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    let authHeader = getHeader(request);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/quotes`,
      {
        method: "POST",
        headers: {
          Authorization: authHeader || "",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      },
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status ${response.status}`);
    }
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Failed to create quote:", error);
    return NextResponse.json(
      { message: "Failed to create quote" },
      { status: 500 },
    );
  }
}
