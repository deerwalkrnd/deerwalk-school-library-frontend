import { getHeader } from "@/core/lib/utils";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get("page") || "1";
    const limit = searchParams.get("limit") || "10";
    const search = searchParams.get("search") || "";

    const backendUrl = new URL(`${process.env.NEXT_PUBLIC_BACKEND_URL}/events`);
    backendUrl.searchParams.append("sort_by", "created_at");
    backendUrl.searchParams.append("page", page);
    backendUrl.searchParams.append("limit", limit);
    if (search) {
      backendUrl.searchParams.append("search", search);
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
        message: "Failed to fetch events",
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
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/events`,
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
    console.error("Failed to create event:", error);
    return NextResponse.json(
      { message: "Failed to create event" },
      { status: 500 },
    );
  }
}
