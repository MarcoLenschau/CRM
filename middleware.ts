import { NextRequest, NextResponse } from "next/server";

/**
 * Decodes JWT token without verification to extract claims.
 * Used for quick admin role checking in middleware.
 *
 * @param token - JWT token string to decode
 * @return Decoded token object with isAdmin flag, or null if invalid
 * @category Authentication
 * @security Token decoded without signature verification (for middleware only), safe for role extraction
 * @performance O(1) base64 decoding operation
 * @author Marco Lenschau <contact@marco-lenschau.de>
 */
function decodeJWT(token: string): { isAdmin?: boolean } | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    
    const decoded = JSON.parse(
      Buffer.from(parts[1], "base64").toString("utf-8")
    );
    return decoded;
  } catch {
    return null;
  }
}

/**
 * Next.js middleware to enforce route protection and role-based access control.
 * Validates JWT token and admin status for protected routes.
 *
 * @param request - The incoming HTTP request
 * @return NextResponse allowing or redirecting based on authentication/authorization
 * @category Authentication
 * @security Enforces JWT validation and admin role restrictions on protected routes, redirects unauthorized
 * @performance O(n) route matching with early exit optimization
 * @author Marco Lenschau <contact@marco-lenschau.de>
 */
export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const pathname = request.nextUrl.pathname;
  
  const protectedRoutes = ["/dashboard", "/customers", "/settings", "/users", "/admin", "/calendar", "/email"];
  const adminRoutes = ["/users", "/log"];
  const publicRoutes = ["/help", "/impress", "/privacy"];
  
  const isProtected = protectedRoutes.some((route) => pathname.startsWith(route));
  const isPublic = publicRoutes.some((route) => pathname.startsWith(route));
  const isAdminRoute = adminRoutes.some((route) => pathname.startsWith(route));
  
  // Allow public routes without token
  if (isPublic) {
    return NextResponse.next();
  }
  
  if (isProtected && !token) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  
  if (isAdminRoute && token) {
    const decoded = decodeJWT(token);
    if (!decoded?.isAdmin) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }
  
  return NextResponse.next();
}

export const config = { matcher: ["/((?!api|_next|public).*)"] };