import mongodb from "@/app/utils/mongodb"
import UserModel from "@/app/models/user.model"
import { protectRoute } from "@/app/utils/protectRoute"
import bcryptjs from "bcryptjs"

/**
 * Retrieves all user accounts with admin status info.
 * Excludes password hashes from response for security.
 *
 * @param request - HTTP request with authentication token
 * @return Array of users without password hashes, 401 if unauthorized
 * @throws {Error} On database query errors
 * @category User Management
 * @security Excludes password hashes, requires authentication
 * @performance Database scan with field exclusion
 * @author Marco Lenschau <contact@marco-lenschau.de>
 */
export async function GET(request: Request): Promise<Response> {
  try {
    const protection = await protectRoute(request, false);
    if (!protection.isValid) {
      return protection.error!;
    }
    await mongodb.dbConnect();
    const users = await UserModel.find({}).select('-hash').lean();
    return Response.json({success: true, users}, {status: 200});
  }
  catch {
    return Response.json({error: "Failed to fetch users"}, {status: 400});
  }
}

/**
 * Creates new user account with hashed password.
 * Admin-only endpoint for user management system.
 *
 * @param request - HTTP request with user registration data
 * @return Created user object, 401 if not admin
 * @throws {Error} On database or validation errors
 * @category User Management
 * @security Admin-only, password hashed with bcrypt (10 rounds)
 * @performance Database insert plus bcrypt hashing
 * @author Marco Lenschau <contact@marco-lenschau.de>
 */
export async function POST(request: Request): Promise<Response> {
  try {
    const protection = await protectRoute(request, true);
    if (!protection.isValid) {
      return protection.error!;
    }
    const body = await request.json();
    await mongodb.dbConnect();
    
    if (!body.password) {
      return Response.json({error: "Password is required"}, {status: 400});
    }
    
    const hashedPassword = await bcryptjs.hash(body.password, 10);
    
    const newUser = await UserModel.create({
      name: body.name,
      email: body.email,
      hash: hashedPassword,
      isAdmin: body.isAdmin || false
    });
    return Response.json({success: true, user: newUser}, {status: 201});
  }
  catch {
    return Response.json({error: "Failed to create user"}, {status: 400});
  }
}
