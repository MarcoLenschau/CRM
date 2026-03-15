import mongodb from "@/app/utils/mongodb"
import Log from "@/app/models/log.model"
import { protectRoute } from "@/app/utils/protectRoute"

/**
 * Creates audit log entry for user actions.
 * Requires admin authentication and records action for compliance.
 *
 * @param request - HTTP request with action details
 * @return Created log entry object, 401 if not admin
 * @throws {Error} On database write errors
 * @category Logging
 * @security Admin-only endpoint with JWT validation
 * @performance Database insert operation
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
 * Retrieves all audit log entries for compliance and monitoring.
 * Requires valid authentication token to access.
 *
 * @param request - HTTP request with authentication token
 * @return Array of all audit logs, 401 if unauthorized
 * @throws {Error} On database query errors
 * @category Logging
 * @security Authentication required
 * @performance Database scan of logs collection
 * @author Marco Lenschau <contact@marco-lenschau.de>
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
