import { NextRequest, NextResponse } from "next/server";

type Role = "LIBRARIAN" | "STUDENT";

interface TokenClaims {
  sub?: string;
  role?: Role;
  exp?: number;
}

/**
 * Read the claims out of a JWT without verifying the signature.
 *
 * This is deliberate: middleware only decides *which dashboard to show*, and
 * every API route re-validates the token against the database before returning
 * data. A tampered token gets a user nothing but the wrong menu, and 401s from
 * the backend the moment the page loads.
 */
function readClaims(token: string): TokenClaims | null {
  try {
    const payload = token.split(".")[1];
    if (!payload) return null;

    const normalized = payload.replace(/-/g, "+").replace(/_/g, "/");
    const padded = normalized.padEnd(
      normalized.length + ((4 - (normalized.length % 4)) % 4),
      "=",
    );

    return JSON.parse(atob(padded)) as TokenClaims;
  } catch {
    return null;
  }
}

const isExpired = (claims: TokenClaims): boolean =>
  typeof claims.exp === "number" && claims.exp * 1000 <= Date.now();

/** Fallback for tokens minted before the role claim was added. */
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

const signOut = (request: NextRequest) => {
  const res = NextResponse.redirect(new URL("/login", request.url));
  res.cookies.delete("authToken");
  return res;
};

const dashboardFor = (role: Role) =>
  role === "LIBRARIAN" ? "/librarian/dashboard" : "/student/dashboard";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("authToken")?.value;
  const { pathname } = request.nextUrl;

  const publicRoutes = ["/login", "/auth/"];
  const isPublic = publicRoutes.some((r) => pathname.startsWith(r));

  if (!token) {
    return isPublic
      ? NextResponse.next()
      : NextResponse.redirect(new URL("/login", request.url));
  }

  const claims = readClaims(token);
  if (!claims || isExpired(claims)) {
    return signOut(request);
  }

  const needsRole =
    !isPublic || pathname.startsWith("/login") || pathname === "/";
  if (!needsRole) {
    return NextResponse.next();
  }

  // The role claim keeps this off the network; older tokens still need a lookup.
  const role = claims.role ?? (await getRoleFromBackend(token));
  if (!role) {
    return signOut(request);
  }

  if (pathname.startsWith("/login") || pathname === "/") {
    return NextResponse.redirect(new URL(dashboardFor(role), request.url));
  }

  if (pathname.startsWith("/librarian") && role !== "LIBRARIAN") {
    return NextResponse.redirect(new URL("/student/dashboard", request.url));
  }
  if (pathname.startsWith("/student") && role !== "STUDENT") {
    return NextResponse.redirect(new URL("/librarian/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
