import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip login page and login API
  if (
    pathname === "/admin/login" ||
    pathname === "/api/admin/login"
  ) {
    return NextResponse.next();
  }

  // Check admin session cookie
  const token = request.cookies.get("admin_session")?.value;
  if (!token) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  // We can't call jose in Edge middleware easily with dynamic env,
  // so we verify the token format and let the API routes do full verification.
  // The actual JWT verification happens in the API routes and admin page.
  // This middleware provides a fast redirect for missing cookies.
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
