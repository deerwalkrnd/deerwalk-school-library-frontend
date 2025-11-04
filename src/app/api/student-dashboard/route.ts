import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get("Authorization");

    console.log("AUTH HEADER:", authHeader);
    console.log("Backend URL:", process.env.NEXT_PUBLIC_BACKEND_URL);

    if (!authHeader) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const backendUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/dashboard/student`;
    console.log("Fetching from:", backendUrl);

    const response = await fetch(backendUrl, {
      method: "GET",
      headers: {
        Authorization: authHeader,
        "Content-Type": "application/json",
      },
    });

    console.log("Backend status:", response.status);

    const text = await response.text();
    console.log("Backend raw response:", text);

    if (!response.ok) {
      throw new Error(`Backend error ${response.status}`);
    }

    const data = JSON.parse(text);
    return NextResponse.json(data);
  } catch (error) {
    console.error("❌ Failed to fetch student dashboard data:", error);
    return NextResponse.json(
      { message: "Failed to fetch student dashboard data" },
      { status: 500 },
    );
  }
}
