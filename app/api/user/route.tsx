import mongodb from "@/app/utils/mongodb"
import UserModel from "@/app/models/user.model"

/**
 * Handles the GET request to fetch all users from the database.
 *
 * @returns {Promise<Response>} A promise that resolves to a Response object.
 * - On success: Returns a JSON response with the list of users and a status code of 200.
 * - On failure: Returns a JSON response with an error message and a status code of 400.
 */
export async function GET(): Promise<Response> {
  try {
    await mongodb.dbConnect();
    const users = await UserModel.find({}).select('-hash').lean();
    return Response.json(users, { status: 200 });
  }
  catch {
    return Response.json({error: "Invalid request"}, {status: 400});
  }
}
