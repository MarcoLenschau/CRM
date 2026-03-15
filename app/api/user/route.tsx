import mongodb from "@/app/utils/mongodb"
import UserModel from "@/app/models/user.model"
import { protectRoute } from "@/app/utils/protectRoute"

/**
 * Handles the GET request to fetch all users from the database.
 * 
 * This function performs the following steps:
 * 1. Validates the request using the `protectRoute` function to ensure the user has proper access.
 * 2. Connects to the MongoDB database.
 * 3. Retrieves all users from the `UserModel` collection, excluding their password hashes.
 * 4. Returns the list of users in a JSON response with a success status.
 * 
 * If any step fails, an appropriate error response is returned.
 * 
 * @param request - The incoming HTTP request object.
 * @returns A promise that resolves to an HTTP response:
 * - On success: A JSON response containing the list of users and a status of 200.
 * - On failure: A JSON response with an error message and a status of 400.
 */
export async function GET(request: Request): Promise<Response> {
  try {
    const protection = await protectRoute(request, true);
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
