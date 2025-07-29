import StudentProfile from "@/modules/StudentProfile/presentation/components/StudentProfile";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch(`${process.env.API_URL!}/StudentProfile`);
    if (!response.ok) {
      throw new Error(`HTTP error! status ${response.status}`);
    }
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Failed to fetch student Profile:", error);
    return NextResponse.json(
      { message: "Failed to fetch student Profile" },
      { status: 500 },
    );
  }
}
