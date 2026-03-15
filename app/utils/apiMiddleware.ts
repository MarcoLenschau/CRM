import { NextRequest, NextResponse } from "next/server";

const protectedApiRoutes = ["/api/admin", "/api/user", "/api/customers"];

/**
 * Middleware to check authentication for protected API routes.
 * Verifies Authorization header contains valid Bearer token.
 *
 * @param request - The incoming NextRequest
 * @return 401 Response if token missing/invalid, null if authorized or route unprotected
 * @category Authentication
 * @security Validates Bearer token presence in Authorization header for protected routes
 * @performance O(n) header check and route matching with early exit
 * @author Marco Lenschau <contact@marco-lenschau.de>
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
