import mongodb from "@/app/utils/mongodb"
import UserModel from "@/app/models/user.model"

/**
 * Handles the GET request to fetch a user by their ID.
 *
 * @param {Request} request - The incoming HTTP request object.
 * @param {Object} context - The context object containing route parameters.
 * @param {Promise<{ id: string }>} context.params - A promise resolving to an object with the user ID.
 * @returns {Promise<Response>} A promise that resolves to an HTTP response.
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
 * Handles the HTTP PUT request to update a user by their ID.
 *
 * @param request - The incoming HTTP request object.
 * @param params - An object containing the route parameters.
 * @param params.params - A promise that resolves to an object containing the user ID.
 * @returns A promise that resolves to an HTTP response:
 * - 200: If the user is successfully updated, returns the updated user data.
 * - 404: If the user with the specified ID is not found.
 * - 400: If the request is invalid or an error occurs during processing.
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
 * Handles the DELETE request to delete a user by their ID.
 *
 * @param request - The incoming HTTP request object.
 * @param context - An object containing route parameters.
 * @param context.params - A promise resolving to an object with the `id` of the user to be deleted. 
 * @returns A promise that resolves to an HTTP response:
 * - 200: If the user was successfully deleted.
 * - 404: If the user with the specified ID was not found.
 * - 400: If there was an error processing the request.
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
