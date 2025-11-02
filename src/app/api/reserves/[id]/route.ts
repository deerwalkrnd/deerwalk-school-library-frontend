import { getHeader } from "@/core/lib/utils";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: number }> },
) {
  try {
    const { id } = await params;
    let authHeader = getHeader(request);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/reserves`,
      {
        method: "POST",
        headers: {
          Authorization: authHeader || "",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ book_copy_id: id }),
      },
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json(
      { message: "Failed to reserve book" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: number }> },
) {
  try {
    const { id } = await params;
    let authHeader = getHeader(request);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/reserves/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: authHeader || "",
          "Content-Type": "application/json",
        },
      },
    );

    if (!response.ok) {
      throw new Error(`HTTP error ! Status ${response.status}`);
    }

    return NextResponse.json(
      { message: `Reserve Deleted successfully` },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: `Failed to delete reserve` },
      { status: 500 },
    );
  }
}
