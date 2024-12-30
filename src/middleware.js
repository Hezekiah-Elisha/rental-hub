import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { decrypt } from "./app/lib/session";

const protectedRoutes = ["/dashboard", "/profile", "/settings", "/dashboard/*"];
const publicRoutes = ["/signin", "/signup", "/"];

export default async function middleware(req) {
  const pathname = req.nextUrl.pathname;
  console.log("pathname->", pathname);

  const isProtectedRoute = protectedRoutes.includes(pathname);
  const isPublicRoute = publicRoutes.includes(pathname);

  const cookie = (await cookies()).get("session")?.value;
  const session = await decrypt(cookie);

  if (isProtectedRoute && !session) {
    return NextResponse.redirect(new URL("/signin", req.nextUrl));
  }

  if (
    isPublicRoute &&
    session &&
    !req.nextUrl.pathname.startsWith("/dashboard")
  ) {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  }

  return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
