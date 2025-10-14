import { NextResponse } from "next/server";
import { getHeader } from "@/core/lib/utils";
import type { NextRequest } from "next/server";

export async function DELETE(request: NextRequest, { params }: any) {
  try {
    const authHeader = getHeader(request);
    const { id } = params;

    if (!authHeader) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/bookmarks/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: authHeader,
          "Content-Type": "application/json",
        },
      },
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return NextResponse.json(
        errorData || { message: "Failed to remove bookmark" },
        { status: response.status },
      );
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Failed to remove bookmark", error);
    return NextResponse.json(
      { message: "Failed to remove bookmark" },
      { status: 500 },
    );
  }
}
