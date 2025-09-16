import { getHeader } from "@/core/lib/utils";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const page = searchParams.get("page") || "0";
    const limit = searchParams.get("limit") || "10";
    const isAck = searchParams.get("is_ack");

    const backendUrl = new URL(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/feedbacks/`,
    );
    backendUrl.searchParams.append("page", page);
    backendUrl.searchParams.append("limit", limit);
    if (isAck !== null) {
      backendUrl.searchParams.append("is_ack", isAck);
    }

    const response = await fetch(backendUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

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
    let authHeader = getHeader(req);

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
