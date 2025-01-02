import { NextResponse } from "next/server";
import { getSession } from "./app/lib/session";

const protectedRoutes = ["/dashboard", "/dashboard/*", "/dashboard/home"];
const publicRoutes = ["/signin", "/signup", "/"];

export async function middleware(request) {
  const path = request.nextUrl.pathname;

  // Exclude source map files
  if (path.endsWith(".map")) {
    return NextResponse.next();
  }

  const isProtectedRoute = protectedRoutes.some((route) =>
    path.startsWith(route)
  );
  const isPublicRoute = publicRoutes.includes(path);

  try {
    const session = await getSession()
      .then((session) => {
        if (isProtectedRoute && session === null) {
          console.log("Protected Route: ", path);
          return NextResponse.redirect(new URL("/signin", request.url));
        }

        if (isPublicRoute && session !== null) {
          console.log("Public Route: ", path);
          return NextResponse.redirect(new URL("/dashboard", request.url));
        }

        return NextResponse.next();
      })
      .catch((error) => {
        console.log("Error: ", error);
        return NextResponse.redirect(new URL("/signin", request.url));
      });
  } catch (error) {
    console.log("Error: ", error);
    return NextResponse.redirect(new URL("/signin", request.url));
  }
}

// Routes Middleware should not run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
