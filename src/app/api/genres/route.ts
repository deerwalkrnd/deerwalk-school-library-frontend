import { getHeader } from "@/core/lib/utils";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get("page") || "1";
    const limit = searchParams.get("limit") || "10";

    const backendUrl = new URL(`${process.env.NEXT_PUBLIC_BACKEND_URL}/genre`);
    backendUrl.searchParams.append("page", page);
    backendUrl.searchParams.append("limit", limit);
    // optional: backendUrl.searchParams.append("sort_by", "created_at");

    const authHeader = getHeader(request);

    const response = await fetch(backendUrl, {
      method: "GET",
      headers: {
        Authorization: authHeader || "",
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const msg = await response.text();
      throw new Error(`Genres GET failed: ${response.status} ${msg}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Failed to fetch genres:", error);
    return NextResponse.json(
      { message: "Failed to fetch genres" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const authHeader = getHeader(request);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/genre`,
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
      const msg = await response.text();
      throw new Error(`Genres POST failed: ${response.status} ${msg}`);
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error("Failed to add genre:", error);
    return NextResponse.json(
      { message: "Failed to add genre" },
      { status: 500 },
    );
  }
}
