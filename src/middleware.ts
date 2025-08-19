import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("authToken")?.value;
  const { pathname } = request.nextUrl;

  const publicRoutes = ["/login"];
  const isPublicRoutes = publicRoutes.some((route) =>
    pathname.startsWith(route),
  );

  if (!isPublicRoutes && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (pathname.startsWith("/login") && token) {
    // return NextResponse.redirect(new URL("/"))
    // todo: return to role based dashboard
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
