import mongodb from "@/app/utils/mongodb"
import User from "@/app/models/user.model";
import bcryptjs from "bcryptjs";
import { generateToken, verifyToken } from "@/app/utils/jwt";

/**
 * Authenticate user with email and password
 *
 * @param {Request} request - HTTP request with email and password in body
 * @returns {Promise<Response>} Success response with JWT token or error
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
 * Verify authentication token
 *
 * @param {Request} request - HTTP request with Authorization header
 * @returns {Promise<Response>} User info if valid or error response
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
