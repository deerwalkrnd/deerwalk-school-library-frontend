import { assertUpstreamOk, proxyError } from "@/core/lib/apiProxy";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization");
    if (!authHeader) {
      return NextResponse.json(
        { message: "Missing authorization header" },
        { status: 401 },
      );
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/me`,
      {
        method: "GET",
        headers: {
          Authorization: authHeader,
          "Content-Type": "application/json",
        },
      },
    );

    await assertUpstreamOk(response);

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Failed to fetch student Profile:", error);
    return proxyError(error, "Failed to fetch student Profile");
  }
}
