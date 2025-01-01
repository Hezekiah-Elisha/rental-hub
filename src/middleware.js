import { NextResponse } from "next/server";
import { getSession, hasSession, updateSession } from "./app/lib/session";

const protectedRoutes = ["/dashboard", "/dashboard/*"];
const publicRoutes = ["/signin", "/signup", "/"];

export async function middleware(request) {
  const path = request.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.some(route => path.startsWith(route));
  const isPublicRoute = publicRoutes.includes(path);

  const session = getSession();

  if (isProtectedRoute && !session) {
    console.log("Protected Route: ", path);
    return NextResponse.redirect(new URL("/signin", request.url));
  }
  // // if (isProtectedRoute && session === true) {
  // //   console.log("Protected Route: ", path);
  // //   return NextResponse.next();
  // // }

  // // if (isPublicRoute && session === true) {
  // //   return NextResponse.redirect(new URL("/dashboard", request.url));
  // // }

  // return NextResponse.next();
  // return await updateSession(request);
}

// Routes Middleware should not run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
