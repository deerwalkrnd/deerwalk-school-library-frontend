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
  const { pathname } = request.nextUrl;

  // Add logging
  console.log("MIDDLEWARE: Pathname:", pathname);
  console.log("MIDDLEWARE: Token present?", !!token);
  console.log(
    "MIDDLEWARE: NEXT_PUBLIC_BACKEND_URL:",
    process.env.NEXT_PUBLIC_BACKEND_URL,
  );

  const publicRoutes = ["/login", "/auth/"];
  const isPublic = publicRoutes.some((r) => pathname.startsWith(r));

  if (!isPublic && !token) {
    console.log("MIDDLEWARE: No token, redirecting to /login");
    return NextResponse.redirect(new URL("/login", request.url));
  }

  let role: Role | null = null;
  if (token && !isPublic) {
    role = await getRoleFromBackend(token);
    console.log("MIDDLEWARE: Role from backend:", role);
    if (!role) {
      const res = NextResponse.redirect(new URL("/login", request.url));
      res.cookies.delete("authToken");
      console.log(
        "MIDDLEWARE: Invalid role, deleting token and redirecting to /login",
      );
      return res;
    }
  }

  if ((pathname.startsWith("/login") || pathname === "/") && token) {
    if (!role) {
      role = await getRoleFromBackend(token);
      console.log("MIDDLEWARE: Role from backend (login/root):", role);
    }

    if (!role) {
      const res = NextResponse.redirect(new URL("/login", request.url));
      res.cookies.delete("authToken");
      console.log(
        "MIDDLEWARE: Invalid role (login/root), deleting token and redirecting to /login",
      );
      return res;
    }

    const destination =
      role === "LIBRARIAN" ? "/librarian/dashboard" : "/student/dashboard";

    console.log("MIDDLEWARE: Redirecting to dashboard:", destination);
    return NextResponse.redirect(new URL(destination, request.url));
  }

  if (token && role && !isPublic) {
    if (pathname.startsWith("/librarian") && role !== "LIBRARIAN") {
      console.log(
        "MIDDLEWARE: Student trying to access librarian route, redirecting",
      );
      return NextResponse.redirect(new URL("/student/dashboard", request.url));
    }
    if (pathname.startsWith("/student") && role !== "STUDENT") {
      console.log(
        "MIDDLEWARE: Librarian trying to access student route, redirecting",
      );
      return NextResponse.redirect(
        new URL("/librarian/dashboard", request.url),
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
