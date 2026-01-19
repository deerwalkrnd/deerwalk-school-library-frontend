import { type NextRequest, NextResponse } from "next/server";
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
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { message: "No file provided" },
        { status: 400 },
      );
    }

    const buffer = await file.arrayBuffer();
    const fileBuffer = Buffer.from(buffer);

    const authHeader = getHeader(request);

    const backendFormData = new FormData();
    backendFormData.append(
      "file",
      new Blob([fileBuffer], { type: file.type }),
      file.name,
    );
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/books/bulk-upload`,
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
      console.error(
        "Bulk upload error from backend:",
        JSON.stringify(error, null, 2),
      );
      return NextResponse.json(
        {
          message:
            error?.detail?.msg ||
            error?.detail ||
            error?.message ||
            "Failed to upload books",
          detail: error,
        },
        { status: response.status },
      );
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Failed to bulk upload books",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
