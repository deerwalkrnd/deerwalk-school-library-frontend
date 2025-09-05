import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/feedbacks`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status ${response.status}`);
    }
    const data = await response.json();
    console.log(data);
    return NextResponse.json(data.items);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch feedbacks" },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    let authHeader;
    if (req.headers.get("authorization")) {
      authHeader = req.headers.get("authorization");
    } else {
      throw new Error("User token not found");
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/feedbacks`,
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
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error("Failed to submit feedback:", error);
    return NextResponse.json(
      { message: "Failed to submit feedback" },
      { status: 500 },
    );
  }
}
