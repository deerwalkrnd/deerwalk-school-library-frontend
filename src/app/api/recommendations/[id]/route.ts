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
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/recommendations/${id}`,
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
    console.error(`Failed to update recommendation with id ${id}:`, error);
    return NextResponse.json(
      { message: `Failed to update recommendation` },
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
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/recommendations/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: authHeader || "",
          "Content-Type": "application/json",
        },
      },
    );
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error(`Failed to delete recommendation with id ${id}:`, error);
    return NextResponse.json(
      { message: `Failed to delete recommendation` },
      { status: 500 },
    );
  }
}
