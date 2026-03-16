import { verifyToken, TokenPayload } from "./jwt";

export type { TokenPayload };

/**
 * Verifies JWT token from Authorization header.
 * For API routes: ONLY accepts Bearer token in Authorization header, NOT cookies.
 * Cookies are only used for browser-based sessions, not API authentication.
 *
 * @param request - The incoming HTTP request
 * @return Decoded token payload if valid, null if invalid or missing
 * @category Authentication
 * @security Validates JWT signature and expiration, requires explicit Bearer token in Authorization header
 * @performance O(1) token parsing and verification
 * @author Marco Lenschau <contact@marco-lenschau.de>
 */
export const authenticateRequest = (request: Request): TokenPayload | null => {
  // ONLY check Authorization header for API authentication
  // Cookies should NOT be used for API authentication
  const authHeader = request.headers.get("authorization");
  
  if (!authHeader?.startsWith("Bearer ")) {
    console.log("📌 Auth attempt - No Bearer token in Authorization header");
    return null;
  }
  
  const token = authHeader.substring("Bearer ".length);
  console.log("📌 Auth attempt - Bearer token found");
  
  const verified = verifyToken(token);
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
