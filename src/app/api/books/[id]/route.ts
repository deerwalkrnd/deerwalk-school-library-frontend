import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  try {
    const body = await req.json();

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/books/${id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
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
      { message: `Failed to update book with id ${id}` },
      { status: 500 },
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/books/${id}`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      },
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status ${response.status}`);
    }

    return NextResponse.json(
      { message: `Book with id ${id} deleted successfully` },
      { status: 200 },
    );
  } catch (error) {
    console.error(`Failed to delete book with id ${id}`, error);
    return NextResponse.json(
      { message: `Failed to delete book with id ${id}` },
      { status: 500 },
    );
  }
}
