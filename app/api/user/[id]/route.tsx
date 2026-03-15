import mongodb from "@/app/utils/mongodb"
import UserModel from "@/app/models/user.model"

/**
 * Retrieves single user by ID with admin status.
 * Excludes password hash from response.
 *
 * @param request - HTTP request (unused)
 * @param params - Route parameters with user ID
 * @return User object without password or 404 if not found
 * @throws {Error} On database query errors
 * @category User Management
 * @security Excludes password hash
 * @performance Direct MongoDB ID lookup
 * @author Marco Lenschau <contact@marco-lenschau.de>
 */
export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }): Promise<Response> {
  try {
    const { id } = await params;
    await mongodb.dbConnect();
    const user = await UserModel.findById(id).select('-hash').lean();
    
    if (!user) {
      return Response.json({ error: "User not found" }, { status: 404 });
    }
    
    return Response.json(user, { status: 200 });
  }
  catch {
    return Response.json({ error: "Invalid request" }, { status: 400 });
  }
}

/**
 * Updates user account information by ID.
 * Modifies name, email, or admin status as requested.
 *
 * @param request - HTTP request with update data
 * @param params - Route parameters with user ID
 * @return Updated user object or 404 if not found
 * @throws {Error} On database update errors
 * @category User Management
 * @performance Direct MongoDB ID update
 * @author Marco Lenschau <contact@marco-lenschau.de>
 */
export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }): Promise<Response> {
  try {
    const { id } = await params;
    const body = await request.json();
    await mongodb.dbConnect();    
    const user = await UserModel.findByIdAndUpdate(id, body, { new: true }).select('-hash').lean();
    if (!user) {
      return Response.json({ error: "User not found" }, { status: 404 });
    }
    return Response.json(user, { status: 200 });
  }
  catch {
    return Response.json({ error: "Invalid request" }, { status: 400 });
  }
}

/**
 * Deletes user account and all associated data from database.
 * Returns 404 if user not found.
 *
 * @param request - HTTP request (unused)
 * @param params - Route parameters with user ID
 * @return Success message or 404 if not found
 * @throws {Error} On database deletion errors
 * @category User Management
 * @performance Direct MongoDB ID deletion
 * @author Marco Lenschau <contact@marco-lenschau.de>
 */
export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }): Promise<Response> {
  try {
    const { id } = await params;
    await mongodb.dbConnect();
    const user = await UserModel.findByIdAndDelete(id);
    if (!user) {
      return Response.json({ error: "User not found" }, { status: 404 });
    }
    return Response.json({ message: "User deleted successfully" }, { status: 200 });
  }
  catch {
    return Response.json({ error: "Invalid request" }, { status: 400 });
  }
}
