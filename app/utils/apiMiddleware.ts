import { NextRequest, NextResponse } from "next/server";

const protectedApiRoutes = ["/api/admin", "/api/user", "/api/customers"];

/**
 * Middleware function to handle authentication for API routes.
 * 
 * This function checks if the incoming request is targeting a protected API route.
 * If the route is protected, it verifies the presence of a valid `Authorization` header.
 * If the header is missing or invalid, it returns a 401 Unauthorized response.
 * 
 * @param request - The incoming `NextRequest` object containing details about the HTTP request.
 * @returns A `NextResponse` object with a 401 status if authentication fails, or `null` if the route is not protected or authentication succeeds.
 */
export async function apiAuthMiddleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const isProtected = protectedApiRoutes.some((route) => pathname.startsWith(route));
  if (!isProtected) {
    return null;
  }
  const authHeader = request.headers.get("authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    return NextResponse.json(
      { error: "Unauthorized - No token provided" },
      { status: 401 }
    );
  }
  return null;
}
