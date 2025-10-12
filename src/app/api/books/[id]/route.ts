import { getHeader } from "@/core/lib/utils";
import { NextResponse } from "next/server";

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
