import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const token = url.searchParams.get("token");

    if (!token) {
      return NextResponse.json(
        { message: "Token is required" },
        { status: 400 },
      );
    }

    const body = await request.json();
    const { new_password } = body;

    if (!new_password) {
      return NextResponse.json(
        { message: "New password is required" },
        { status: 400 },
      );
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/reset-password?token=${encodeURIComponent(token)}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ new_password }),
      },
    );

    const data = await response.json();

    if (data.detail) {
      return NextResponse.json(data, { status: response.status });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Reset password request failed:", error);
    return NextResponse.json(
      { message: "Failed to process reset password request" },
      { status: 500 },
    );
  }
}
