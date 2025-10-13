import { getHeader } from "@/core/lib/utils";
import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const authHeader = getHeader(_req);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/genre/${id}`,
      {
        method: "GET",
        headers: {
          Authorization: authHeader || "",
          "Content-Type": "application/json",
        },
        cache: "no-store",
      },
    );

    if (!response.ok) {
      const msg = await response.text();
      throw new Error(`Genre GET failed: ${response.status} ${msg}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Failed to fetch genre:", error);
    return NextResponse.json(
      { message: "Failed to fetch genre" },
      { status: 500 },
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const authHeader = getHeader(request);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/genre/${id}`,
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
      const msg = await response.text();
      throw new Error(`Genre PUT failed: ${response.status} ${msg}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Failed to update genre:", error);
    return NextResponse.json(
      { message: "Failed to update genre" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const authHeader = getHeader(request);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/genre/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: authHeader || "",
          "Content-Type": "application/json",
        },
      },
    );

    if (!response.ok) {
      const msg = await response.text();
      throw new Error(`Genre DELETE failed: ${response.status} ${msg}`);
    }

    const txt = await response.text();
    const data = txt ? JSON.parse(txt) : { message: "Genre deleted" };

    return NextResponse.json(data);
  } catch (error) {
    console.error("Failed to delete genre:", error);
    return NextResponse.json(
      { message: "Failed to delete genre" },
      { status: 500 },
    );
  }
}
