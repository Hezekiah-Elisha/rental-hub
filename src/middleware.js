import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { decrypt } from "./app/lib/creatingSession";

const protectedRoutes = ["/dashboard", "/profile", "/settings"];
const publicRoutes = ["/signin", "/signup", "/"];

export default async function middleware(req) {
  const { pathname } = req.nextUrl.pathname;
  console.log("pathname", pathname);

  const isProtectedRoute = protectedRoutes.includes(pathname);
  const isPublicRoute = publicRoutes.includes(pathname);

  const cookie = cookies().get("session")?.value;
  const session = await decrypt(cookie);

  if (isProtectedRoute && !session) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  if (isPublicRoute && session) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}
