import mongodb from "@/app/utils/mongodb"
import UserModel from "@/app/models/user.model"

/**
 * Fetch a user by ID (excluding password hash).
 *
 * @param request - HTTP request object.
 * @param context.params - Promise resolving to {id: string}.
 * @returns JSON response with user data or 404 error.
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
 * Update a user by ID with new data.
 *
 * @param request - HTTP request with update body.
 * @param context.params - Promise resolving to {id: string}.
 * @returns JSON response with updated user or error.
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
 * Delete a user by ID from database.
 *
 * @param request - HTTP request object.
 * @param context.params - Promise resolving to {id: string}.
 * @returns JSON response with success message or error.
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
