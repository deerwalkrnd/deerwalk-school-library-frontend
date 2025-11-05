import { NextRequest, NextResponse } from "next/server";
import { getHeader } from "@/core/lib/utils";

export async function POST(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type")?.trim();

    const incomingForm = await request.formData();
    const file = incomingForm.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json(
        { message: "No file provided" },
        { status: 400 },
      );
    }

    const backendUrl = new URL(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/files/upload`,
    );
    if (
      type === "BOOK_COVER" ||
      type === "PROFILE_IMAGE" ||
      type === "EVENT_BANNER"
    ) {
      backendUrl.searchParams.set("type", type);
    } else {
      throw Error("Not Authorized");
    }
    const authHeader = getHeader(request);

    const upstreamForm = new FormData();
    upstreamForm.append("file", file, file.name);

    const response = await fetch(backendUrl, {
      method: "POST",
      headers: {
        Authorization: authHeader || "",
      },
      body: upstreamForm,
    });

    if (!response.ok) {
      const text = await response.text().catch(() => "");
      throw new Error(`Upstream upload failed: ${response.status} ${text}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Failed to upload file: ", error);
    return NextResponse.json(
      { message: "Failed to upload file" },
      { status: 500 },
    );
  }
}
