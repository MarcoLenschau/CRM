import mongodb from "@/app/utils/mongodb"
import UserModel from "@/app/models/user.model"
import { protectRoute } from "@/app/utils/protectRoute"

/**
 * Fetch all users from database.
 *
 * @param request - HTTP request object with authentication token.
 * @returns JSON response with users array (excluding password hashes).
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
 * Create a new user (admin only).
 *
 * @param request - HTTP request with user data (name, email, password, isAdmin).
 * @returns JSON response with created user object.
 */
export async function POST(request: Request): Promise<Response> {
  try {
    const protection = await protectRoute(request, true);
    if (!protection.isValid) {
      return protection.error!;
    }
    const body = await request.json();
    await mongodb.dbConnect();
    const newUser = await UserModel.create({
      name: body.name,
      email: body.email,
      hash: body.password,
      isAdmin: body.isAdmin || false
    });
    return Response.json({success: true, user: newUser}, {status: 201});
  }
  catch {
    return Response.json({error: "Failed to create user"}, {status: 400});
  }
}
