import { authenticateRequest, TokenPayload } from "./auth";

/**
 * Middleware to protect API routes with authentication and optional admin role verification.
 * Validates JWT token and checks admin status if required.
 *
 * @param request - The incoming HTTP request
 * @param requireAdminRole - Whether to require admin privileges (default: false)
 * @return Object with error Response and decoded token payload if valid, or error if invalid
 * @category Authentication
 * @security Validates JWT token and enforces admin role restrictions based on parameter
 * @performance O(1) token validation and admin check
 * @author Marco Lenschau <contact@marco-lenschau.de>
 */
export const protectRoute = async (request: Request, requireAdminRole: boolean = false): 
    Promise<{ error?: Response; decoded?: TokenPayload; isValid: boolean }> => {

  const decoded = authenticateRequest(request);
  if (!decoded) {
    const authHeader = request.headers.get("authorization");
    const cookieHeader = request.headers.get("cookie");
    return {
      error: Response.json(
        { 
          success: false, 
          error: "Unauthorized - No token provided",
          debug: {
            hasAuthHeader: !!authHeader,
            hasCookieHeader: !!cookieHeader
          }
        },
        { status: 401 }
      ),
      isValid: false,
    };
  }
  if (requireAdminRole && !decoded.isAdmin) {
    return {
      error: Response.json({success: false, error: "Forbidden - Admin access required" }, {status: 403}),
      isValid: false,
    };
  }
  return {
    decoded,
    isValid: true,
  };
};
