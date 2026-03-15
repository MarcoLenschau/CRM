import { NextRequest, NextResponse } from "next/server";

/**
 * Middleware function to handle authentication and route protection.
 * 
 * This middleware performs the following tasks:
 * - Retrieves the authentication token from the request cookies.
 * - Checks if the current route is part of the protected routes.
 * - If the route is protected and no token is found, redirects the user to the `/register` page.
 * - Otherwise, allows the request to proceed to the next handler.
 * 
 * @param request - The incoming `NextRequest` object containing details about the HTTP request.
 * @returns A `NextResponse` object that either allows the request to proceed or redirects to the login page.
 */
export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const pathname = request.nextUrl.pathname;
  const protectedRoutes = ["/dashboard", "/customers", "/settings", "/users", "/admin"];
  const isProtected = protectedRoutes.some((route) => pathname.startsWith(route));
  if (isProtected && !token) {
    const loginUrl = new URL("/register", request.url);
    loginUrl.searchParams.set("error", "Please login to continue");
    return NextResponse.redirect(loginUrl);
  }
  return NextResponse.next();
}

export const config = {matcher: ["/((?!api|_next|public).*)"]};
