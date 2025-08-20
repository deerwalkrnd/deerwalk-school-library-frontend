import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    let authHeader;
    if (req.headers.get("authorization")) {
      authHeader = req.headers.get("authorization");
    } else {
      throw new Error("User token not found");
    }
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/me`,
      {
        headers: {
          Authorization: authHeader || "",
        },
      },
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status ${response.status}`);
    }
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Failed to fetch user data:", error);
    return NextResponse.json(
      {
        message: "Failed to fetch user data",
      },
      { status: 500 },
    );
  }
}
