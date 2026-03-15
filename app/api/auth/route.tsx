import mongodb from "@/app/utils/mongodb"
import User from "@/app/models/user.model";
import bcryptjs from "bcryptjs";
import { generateToken, verifyToken } from "@/app/utils/jwt";

/**
 * Handles the POST request for user authentication.
 * 
 * This function processes a login request by validating the provided email and password,
 * checking the credentials against the database, and generating a token for successful authentication.
 * 
 * @param {Request} request - The incoming HTTP request object containing the user's login details.
 * @returns {Promise<Response>} A promise that resolves to an HTTP response:
 * - 200: If authentication is successful, returns a JSON object with a success flag and a token.
 * - 400: If the email or password is missing, returns a JSON object with an error message.
 * - 401: If the email or password is invalid, returns a JSON object with an error message.
 * - 500: If an unexpected error occurs, returns a JSON object with an error message and details.
 * 
 * @throws {Error} If there is an issue with the database connection or other unexpected errors.
 */
export async function POST(request: Request): Promise<Response> {
  try {
    const body = await request.json();
    await mongodb.dbConnect(); 
    if (!body.email || !body.password) {
        return Response.json({success: false, error: "Email and password are required"}, {status: 400});
    }
    const user = await User.findOne({ email: body.email }).lean();
    if (user && await bcryptjs.compare(body.password!, user.hash)) {
        const token = generateToken({ userId: String(user._id), email: user.email, isAdmin: user.isAdmin });
        return Response.json({success: true, token: token}, {status: 200});        
    } else {
        return Response.json({success: false, error: "Invalid email or password"}, {status: 401});
    }

  } catch (error) {
    return Response.json({success: false, error: "Failed to login", 
        details: error instanceof Error ? error.message : String(error)}, {status: 500});
  }
}

/**
 * Handles GET requests for authentication.
 *
 * This function verifies the provided authorization token from the request headers.
 * If the token is valid, it returns the decoded user information along with their admin status.
 * If the token is invalid, expired, or not provided, it returns an appropriate error response.
 *
 * @param {Request} request - The incoming HTTP request object.
 * @returns {Promise<Response>} A promise that resolves to an HTTP response object.
 *
 * Response Codes:
 * - 200: Token is valid, user information is returned.
 * - 400: Token is not provided in the request headers.
 * - 401: Token is invalid or expired.
 * - 500: An error occurred during token verification.
 *
 * Error Details:
 * - If an error occurs during token verification, the error message is included in the response.
 */
export async function GET(request: Request): Promise<Response> {
  try {
    const token = request.headers.get('authorization')?.split(' ')[1];
    if (!token) {
      return Response.json({success: false, error: "Token not provided"}, {status: 400});
    }
    const decoded = verifyToken(token);
    if (decoded) {
      return Response.json({success: true, user: decoded, isAdmin: decoded.isAdmin}, {status: 200});
    } else {
      return Response.json({success: false, error: "Token invalid or expired"}, {status: 401});
    }
  } catch (error) {
    return Response.json({success: false, error: "Token verification failed", 
        details: error instanceof Error ? error.message : String(error)}, {status: 500});
  }
}
