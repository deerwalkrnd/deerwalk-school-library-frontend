import { getHeader } from "@/core/lib/utils";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const count = searchParams.get("count");

    if (count === "true") {
      const book_id = searchParams.get("book_id");
      if (!book_id) {
        return NextResponse.json(
          { message: "book_id parameter is required for count" },
          { status: 400 },
        );
      }

      const backendUrl = new URL(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/reviews/count`,
      );
      backendUrl.searchParams.append("book_id", book_id);

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
    } else {
      return NextResponse.json(
        {
          message:
            "Invalid request. Use count=true parameter for count endpoint",
        },
        { status: 400 },
      );
    }
  } catch (error) {
    console.error("Failed to fetch review count: ", error);
    return NextResponse.json(
      { message: "Failed to fetch review count" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    let authHeader = getHeader(request);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/reviews`,
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
    console.error("Failed to create review: ", error);
    return NextResponse.json(
      { message: "Failed to create review" },
      { status: 500 },
    );
  }
}
