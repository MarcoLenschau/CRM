import { verifyToken, TokenPayload } from "./jwt";

export type { TokenPayload };

/**
 * Verifies JWT token from Authorization header or cookies.
 * For API routes: Accepts Bearer token in Authorization header (primary) or cookie (fallback for SSR).
 *
 * @param request - The incoming HTTP request
 * @return Decoded token payload if valid, null if invalid or missing
 * @category Authentication
 * @security Validates JWT signature and expiration, checks Bearer header first, then cookies as fallback
 * @performance O(1) token parsing and verification
 * @author Marco Lenschau <contact@marco-lenschau.de>
 */
export const authenticateRequest = (request: Request): TokenPayload | null => {
  // Try Authorization header first (preferred for APIs)
  const authHeader = request.headers.get("authorization");
  
  if (authHeader?.startsWith("Bearer ")) {
    const token = authHeader.substring("Bearer ".length);
    const verified = verifyToken(token);
    if (verified) {
      return verified;
    }
  }
  
  // Fallback to cookie (needed for Server-Side Rendering)
  const cookieHeader = request.headers.get("cookie");
  if (cookieHeader) {
    const cookies = cookieHeader.split(';').map(c => c.trim());
    const tokenCookie = cookies.find(c => c.startsWith('token='));
    if (tokenCookie) {
      const token = tokenCookie.substring('token='.length);
      if (token && token.length > 0) {
        const verified = verifyToken(token);
        if (verified) {
          return verified;
        }
      }
    }
  }
  
  return null;
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
