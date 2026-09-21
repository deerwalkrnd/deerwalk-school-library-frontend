import { assertUpstreamOk, proxyError } from "@/core/lib/apiProxy";
import { getHeader } from "@/core/lib/utils";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: number }> },
) {
  try {
    const { id } = await params;
    const authHeader = getHeader(request);

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

    await assertUpstreamOk(response);

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    return proxyError(error, "Failed to reserve book");
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: number }> },
) {
  try {
    const { id } = await params;
    const authHeader = getHeader(request);

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
    return proxyError(error, `Failed to delete reserve`);
  }
}
