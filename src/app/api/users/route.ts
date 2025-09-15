import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get("page") || "1";
    const limit = searchParams.get("limit") || "10";

    const backendUrl = new URL(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/`);
    backendUrl.searchParams.append("sort_by", "created_at");
    backendUrl.searchParams.append("page", page);
    backendUrl.searchParams.append("limit", limit);

    let authHeader;
    if (request.headers.get("authorization")) {
      authHeader = request.headers.get("authorization");
    } else {
      throw new Error("User token not found");
    }

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
    return NextResponse.json(data.items);
  } catch (error) {
    return NextResponse.json(
      {
        message: "Failed to fetch users",
      },
      {
        status: 500,
      },
    );
  }
}
