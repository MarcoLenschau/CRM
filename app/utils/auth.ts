import { verifyToken, TokenPayload } from "./jwt";

export type { TokenPayload };

/**
 * Authenticates an incoming request by extracting and verifying the authorization token.
 * Checks both Authorization header and cookie.
 *
 * @param request - The incoming HTTP request object.
 * @returns The payload of the verified token if authentication is successful, or `null` if the token is missing or invalid.
 */
export const authenticateRequest = (request: Request): TokenPayload | null => {
  // Try to get token from Authorization header first
  let token = request.headers.get("authorization")?.split(" ")[1];
  console.log("📌 Auth attempt - Header token:", token ? "Found" : "Not found");
  
  // If not found, try to get from cookies
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
 * Checks if the provided token payload corresponds to an admin user.
 *
 * @param decoded - The decoded token payload, or `null` if no token is provided.
 * @returns `true` if the token payload indicates the user is an admin, otherwise `false`.
 */
export const requireAdmin = (decoded: TokenPayload | null): boolean => {
  return decoded?.isAdmin === true;
};

/**
 * Checks if the provided token payload corresponds to an authenticated user.
 *
 * @param decoded - The decoded token payload, or `null` if no token is provided.
 * @returns `true` if the token payload indicates the user is authenticated, otherwise `false`.
 */
export const requireAuth = (decoded: TokenPayload | null): boolean => {
  return decoded !== null;
};
