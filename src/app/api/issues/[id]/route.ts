import { type NextRequest, NextResponse } from "next/server";
import { getHeader } from "@/core/lib/utils";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const authHeader = getHeader(request);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/issues/${id}`,
      {
        method: "GET",
        headers: {
          Authorization: authHeader || "",
          "Content-Type": "application/json",
        },
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { message: errorData.message || "Failed to fetch issue" },
        { status: response.status },
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Failed to fetch issue", error);
    return NextResponse.json(
      { message: "Failed to fetch issue" },
      { status: 500 },
    );
  }
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: number }> },
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const authHeader = getHeader(request);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/borrows/${id}`,
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
      const errorData = await response.json();
      return NextResponse.json(
        { message: errorData.message || "Failed to borrow book" },
        { status: response.status },
      );
    }
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Failed to borrow book", error);
    return NextResponse.json(
      { message: "Failed to borrow book" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const authHeader = getHeader(request);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/issues/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: authHeader || "",
          "Content-Type": "application/json",
        },
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { message: errorData.message || "Failed to delete issue" },
        { status: response.status },
      );
    }

    return NextResponse.json(
      { message: "Issue deleted successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Failed to delete issue", error);
    return NextResponse.json(
      { message: "Failed to delete issue" },
      { status: 500 },
    );
  }
}
