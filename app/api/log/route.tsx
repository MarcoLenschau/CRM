import mongodb from "@/app/utils/mongodb"
import Log from "@/app/models/log.model"
import { protectRoute } from "@/app/utils/protectRoute"

/**
 * Handles POST requests to log user actions into the database.
 *
 * @param {Request} request - The incoming HTTP request containing the log data in JSON format.
 * @returns {Promise<Response>} A promise that resolves to an HTTP response:
 * - On success: Returns a JSON response with the logged user action and a status of 200.
 * - On failure: Returns a JSON response with an error message and a status of 400.
 *
 * @throws Will throw an error if the request body cannot be parsed as JSON or if the database operation fails.
 */
export async function POST(request: Request): Promise<Response> {
  try {
    const protection = await protectRoute(request, true);
    if (!protection.isValid) {
      return protection.error!;
    }
    const body = await request.json();
    await mongodb.dbConnect(); 
    await Log.insertMany({
        userID: body.userID,
        action: body.action,
        entity: body.entity,
        status: body.status,
        description: body.description
    });
    return Response.json({ 
      success: true,
      user: {
        userID: body.userID,
        action: body.action,
        entity: body.entity,
        status: body.status,
        description: body.description
      }
    }, { status: 200 });
  } catch {
    return Response.json({ 
      success: false,
      error: "Failed to log action"
    }, { status: 400 });
  }
}

export async function GET(request: Request): Promise<Response> {
  try {
    const protection = await protectRoute(request, false);
    if (!protection.isValid) {
      return protection.error!;
    }
    await mongodb.dbConnect(); 
    const logs = await Log.find({}).lean();
    return Response.json({ 
      success: true,
      logs: logs
    }, { status: 200 });
  } catch {
    return Response.json({ 
      success: false,
      error: "Failed to fetch logs"
    }, { status: 400 });
  }
}
