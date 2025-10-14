import { getHeader } from "@/core/lib/utils";
import { NextResponse } from "next/server";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: number }> },
) {
  const { id } = await params;

  try {
    const body = await request.json();
    let authHeader = getHeader(request);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/books/${id}`,
      {
        method: "PUT",
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
    return NextResponse.json(data);
  } catch (error) {
    console.error(`Failed to update book with id ${id}:`, error);
    return NextResponse.json(
      { message: `Failed to update book` },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: number }> },
) {
  const { id } = await params;
  try {
    const authHeader = getHeader(request);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/books/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: authHeader || "",
          "Content-Type": "application/json",
        },
      },
    );
    if (response.status == 204) {
      return NextResponse.json(
        { message: `Book deleted successfully` },
        { status: 200 },
      );
    }
  } catch (error) {
    console.error(`Failed to delete book with id ${id}:`, error);
    return NextResponse.json(
      { message: `Failed to delete book` },
      { status: 500 },
    );
  }
}
