import mongodb from "@/app/utils/mongodb"
import Log from "@/app/models/log.model"
import { protectRoute } from "@/app/utils/protectRoute"

/**
 * Create an audit log entry (admin only).
 *
 * @param request - HTTP request with log data (userID, action, entity, status, description).
 * @returns JSON response with logged entry.
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

/**
 * Fetch all audit log entries.
 *
 * @param request - HTTP request object with authentication token.
 * @returns JSON response with logs array.
 */
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
