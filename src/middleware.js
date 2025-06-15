import { NextResponse } from "next/server";

const protectedRoutes = ["/dashboard/:path*", "/profile"];

const productionUrl = process.env.PRODUCTION_URL || "http://localhost:3000";

export async function middleware(req) {
  const isProtectedRoute = protectedRoutes.some((route) =>
    req.nextUrl.pathname.startsWith(route)
  );
  if (isProtectedRoute) {
    const access_token = req.cookies.get("access_token");

    if (!access_token) {
      return NextResponse.redirect(new URL("/signin", req.url));
    }
    return NextResponse.next();
  }
}

// Routes Middleware should not run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
