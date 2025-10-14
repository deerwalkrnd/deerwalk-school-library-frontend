import { NextResponse } from "next/server";
import { getHeader } from "@/core/lib/utils";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const authHeader = getHeader(request);

    if (!authHeader) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/bookmarks/${params.id}`,
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
