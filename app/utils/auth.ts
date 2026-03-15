import { verifyToken, TokenPayload } from "./jwt";

export type { TokenPayload };

/**
 * Authenticates an incoming request by extracting and verifying the authorization token.
 *
 * @param request - The incoming HTTP request object.
 * @returns The payload of the verified token if authentication is successful, or `null` if the token is missing or invalid.
 */
export const authenticateRequest = (request: Request): TokenPayload | null => {
  const token = request.headers.get("authorization")?.split(" ")[1];
  return token ? verifyToken(token) : null;
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
