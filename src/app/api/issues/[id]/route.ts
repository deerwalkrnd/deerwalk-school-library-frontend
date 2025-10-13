import { getHeader } from "@/core/lib/utils";
import { NextResponse } from "next/server";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  try {
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
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error(`Failed to delete issue with ${id}:`, error);
    return NextResponse.json(
      { message: `Failed to delete issue` },
      { status: 500 },
    );
  }
}
