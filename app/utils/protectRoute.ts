import { authenticateRequest, TokenPayload } from "./auth";

/**
 * Protects a route by authenticating the request and optionally verifying admin privileges.
 *
 * @param request - The incoming HTTP request to authenticate.
 * @param requireAdminRole - A boolean indicating whether admin privileges are required. Defaults to `false`.
 * @returns A promise that resolves to an object containing:
 * - `error` (optional): A `Response` object with an error message and status code if authentication fails.
 * - `decoded` (optional): The decoded token payload if authentication succeeds.
 * - `isValid`: A boolean indicating whether the request is valid.
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
