import { type NextRequest, NextResponse } from "next/server";
import { getHeader } from "@/core/lib/utils";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get("page") || "1";
    const limit = searchParams.get("limit") || "10";
    const searchableValue = searchParams.get("searchable_value");
    const searchableField = searchParams.get("searchable_field");
    const startDate = searchParams.get("start_date");
    const endDate = searchParams.get("end_date");
    const status = searchParams.get("status");

    const backendUrl = new URL(`${process.env.NEXT_PUBLIC_BACKEND_URL}/issues`);
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

    if (status) {
      backendUrl.searchParams.append("status", status);
    }

    const authHeader = getHeader(request);
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
    console.error("Failed to fetch issues", error);
    return NextResponse.json(
      { message: "Failed to fetch issues" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const authHeader = getHeader(request);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/issues`,
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
      const errorData = await response.json();
      return NextResponse.json(
        { message: errorData.message || "Failed to create borrow request" },
        { status: response.status },
      );
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error("Failed to create borrow request", error);
    return NextResponse.json(
      { message: "Failed to create borrow request" },
      { status: 500 },
    );
  }
}
