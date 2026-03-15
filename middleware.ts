import { NextRequest, NextResponse } from "next/server";

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

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const pathname = request.nextUrl.pathname;
  
  const protectedRoutes = ["/dashboard", "/customers", "/settings", "/users", "/admin"];
  const adminRoutes = ["/users", "/log"];
  
  const isProtected = protectedRoutes.some((route) => pathname.startsWith(route));
  const isAdminRoute = adminRoutes.some((route) => pathname.startsWith(route));
  
  if (isProtected && !token) {
    const loginUrl = new URL("/register", request.url);
    loginUrl.searchParams.set("error", "Please login to continue");
    return NextResponse.redirect(loginUrl);
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