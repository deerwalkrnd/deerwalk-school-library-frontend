import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch("http://localhost:3000/libraryStats");
    if (!response.ok) {
      throw new Error(`HTTP error! status ${response.status}`);
    }
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Failed to fetch student dashboard data:", error);
    return NextResponse.json(
      { message: "Failed to fetch student dashboard data" },
      { status: 500 },
    );
  }
}
