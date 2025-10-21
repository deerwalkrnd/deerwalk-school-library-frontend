import { NextRequest, NextResponse } from "next/server";
import { getHeader } from "@/core/lib/utils";

export async function POST(request: NextRequest) {
  try {
    if (!process.env.NEXT_PUBLIC_BACKEND_URL) {
      return NextResponse.json(
        { message: "Backend URL is not configured" },
        { status: 500 },
      );
    }

    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { message: "No file provided" },
        { status: 400 },
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    const backendFormData = new FormData();
    backendFormData.append(
      "file",
      new Blob([buffer], { type: file.type }),
      file.name,
    );

    const authHeader = getHeader(request);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/bulk-upload`,
      {
        method: "POST",
        headers: {
          Authorization: authHeader || "",
        },
        body: backendFormData,
      },
    );

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      return NextResponse.json(
        {
          message:
            error?.detail?.msg ||
            error?.message ||
            "Failed to upload users (backend error)",
        },
        { status: response.status },
      );
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error: unknown) {
    return NextResponse.json(
      {
        message: "Failed to bulk upload users",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}
