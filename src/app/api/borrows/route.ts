import { getHeader } from "@/core/lib/utils";

export async function GET(request: Request) {
  try {
    let authHeader = getHeader(request);
  } catch (error) {}
}
