import { verifyToken, TokenPayload } from "./jwt";

export type { TokenPayload };

/**
 * Verifies JWT token from Authorization header or cookies.
 * Extracts token from "Authorization: Bearer <token>" header or "token" cookie.
 *
 * @param request - The incoming HTTP request
 * @return Decoded token payload if valid, null if invalid or missing
 * @category Authentication
 * @security Validates JWT signature and expiration, checks token in headers or cookies
 * @performance O(1) token parsing and verification
 * @author Marco Lenschau <contact@marco-lenschau.de>
 */
export const authenticateRequest = (request: Request): TokenPayload | null => {
  let token = request.headers.get("authorization")?.split(" ")[1];
  console.log("📌 Auth attempt - Header token:", token ? "Found" : "Not found");

  if (!token) {
    const cookieHeader = request.headers.get("cookie");
    if (cookieHeader) {
      const cookies = cookieHeader.split(';').map(c => c.trim());
      const tokenCookie = cookies.find(c => c.startsWith('token='));
      if (tokenCookie) {
        token = tokenCookie.substring('token='.length);
        console.log("📌 Auth attempt - Cookie token found");
      }
    }
  }
  
  const verified = token ? verifyToken(token) : null;
  console.log("📌 Auth attempt - Token verified:", verified ? "Yes" : "No");
  return verified;
};

/**
 * Checks if a token payload indicates an admin user.
 * Returns false if token is null or missing isAdmin flag.
 *
 * @param decoded - Decoded token payload or null
 * @return True if user has admin privileges, false otherwise
 * @category Authentication
 * @security Verifies admin flag presence in token payload
 * @performance O(1) property check
 * @author Marco Lenschau <contact@marco-lenschau.de>
 */
export const requireAdmin = (decoded: TokenPayload | null): boolean => {
  return decoded?.isAdmin === true;
};

/**
 * Checks if a token payload indicates an authenticated user.
 * Returns true if token exists and is valid, false otherwise.
 *
 * @param decoded - Decoded token payload or null
 * @return True if user is authenticated, false otherwise
 * @category Authentication
 * @security Validates token payload presence for session check
 * @performance O(1) null check
 * @author Marco Lenschau <contact@marco-lenschau.de>
 */
export const requireAuth = (decoded: TokenPayload | null): boolean => {
  return decoded !== null;
};
