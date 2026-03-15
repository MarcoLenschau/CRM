import mongodb from "@/app/utils/mongodb"
import User from "@/app/models/user.model";
import bcryptjs from "bcryptjs";
import { generateToken, verifyToken } from "@/app/utils/jwt";

/**
 * Authenticates user and returns JWT token.
 * Validates email and password against hashed database credentials.
 *
 * @param request - HTTP request containing email and password
 * @return JWT token if credentials valid, 401 if invalid
 * @throws {Error} On database or hashing errors
 * @category Authentication
 * @security Password validated using bcrypt hash comparison
 * @performance Database lookup plus bcrypt validation
 * @author Marco Lenschau <contact@marco-lenschau.de>
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
 * Verifies JWT token and returns authenticated user information.
 * Extracts token from Authorization header and validates signature.
 *
 * @param request - HTTP request with Authorization Bearer token
 * @return User data if token valid, 401 if invalid or expired
 * @category Authentication
 * @security Validates JWT signature and expiration
 * @performance O(1) token verification
 * @author Marco Lenschau <contact@marco-lenschau.de>
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
