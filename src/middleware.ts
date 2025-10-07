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
  const token = request.cookies.get("authToken")?.value;
  const cachedRole = request.cookies.get("role")?.value as Role | undefined;
  const { pathname } = request.nextUrl;

  const publicRoutes = ["/login", "/auth"];
  const isPublic = publicRoutes.some((r) => pathname.startsWith(r));

  if (!isPublic && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  let role: Role | null | undefined = cachedRole;
  if (!role && token) {
    role = await getRoleFromBackend(token);
  }

  if (pathname.startsWith("/login") && token) {
    const destination =
      role === "LIBRARIAN" ? "/librarian/dashboard" : "/student/dashboard";
    const res = NextResponse.redirect(new URL(destination, request.url));

    if (role && !cachedRole) {
      res.cookies.set("role", role, {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 15 * 60, // 15 minutes
      });
    }

    return res;
  }

  if (token && !isPublic) {
    if (pathname.startsWith("/librarian") && role !== "LIBRARIAN") {
      return NextResponse.redirect(new URL("/student/dashboard", request.url));
    }
    if (pathname.startsWith("/student") && role !== "STUDENT") {
      return NextResponse.redirect(
        new URL("/librarian/dashboard", request.url),
      );
    }
  }

  // refresh cached role if missing
  if (token && role && !cachedRole) {
    const res = NextResponse.next();
    res.cookies.set("role", role, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 15 * 60,
    });
    return res;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
