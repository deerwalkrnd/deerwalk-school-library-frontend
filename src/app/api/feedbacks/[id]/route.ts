import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  try {
    const body = await req.json();

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/feedbacks/${id}`,
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
    console.error(`Failed to update feedback with id ${id}:`, error);
    return NextResponse.json(
      { message: `Failed to update feedback with id ${id}` },
      { status: 500 },
    );
  }
}
