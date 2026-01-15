import { NextRequest, NextResponse } from "next/server";

type Role = "LIBRARIAN" | "STUDENT";

async function getRoleFromBackend(token: string): Promise<Role | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });
    if (!res.ok) return null;
    const data = await res.json();
    return (data.role as Role) ?? null;
  } catch {
    return null;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  /* ============================
     ✅ CORS PREFLIGHT (API ONLY)
     ============================ */
  if (pathname.startsWith("/api") && request.method === "OPTIONS") {
    return new NextResponse(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": request.headers.get("origin") || "*",
        "Access-Control-Allow-Methods":
          "GET, POST, PUT, PATCH, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Authorization, Content-Type",
        "Access-Control-Allow-Credentials": "true",
      },
    });
  }

  const token = request.cookies.get("authToken")?.value;

  const publicRoutes = ["/login", "/auth/"];
  const isPublic = publicRoutes.some((r) => pathname.startsWith(r));

  if (!isPublic && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  let role: Role | null = null;
  if (token && !isPublic) {
    role = await getRoleFromBackend(token);
    if (!role) {
      const res = NextResponse.redirect(new URL("/login", request.url));
      res.cookies.delete("authToken");
      return res;
    }
  }

  if ((pathname.startsWith("/login") || pathname === "/") && token) {
    if (!role) role = await getRoleFromBackend(token);

    if (!role) {
      const res = NextResponse.redirect(new URL("/login", request.url));
      res.cookies.delete("authToken");
      return res;
    }

    const destination =
      role === "LIBRARIAN" ? "/librarian/dashboard" : "/student/dashboard";
    return NextResponse.redirect(new URL(destination, request.url));
  }

  if (token && role && !isPublic) {
    if (pathname.startsWith("/librarian") && role !== "LIBRARIAN") {
      return NextResponse.redirect(new URL("/student/dashboard", request.url));
    }
    if (pathname.startsWith("/student") && role !== "STUDENT") {
      return NextResponse.redirect(
        new URL("/librarian/dashboard", request.url),
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/:path*", "/((?!_next/static|_next/image|favicon.ico).*)"],
};
