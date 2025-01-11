import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const protectedRoutes = ["/dashboard", "/profile"];

const productionUrl = "http://localhost:3000/";

export async function middleware(req) {
  const isProtectedRoute = protectedRoutes.some((route) =>
    req.nextUrl.pathname.startsWith(route)
  );
  if (isProtectedRoute) {
    const cookiesStore = await cookies();
    const authCookies = cookiesStore.get("access_token");

    if (!authCookies) {
      return NextResponse.redirect(new URL("/signin", req.url));
    }
    return NextResponse.next();
  }
}

// Routes Middleware should not run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
