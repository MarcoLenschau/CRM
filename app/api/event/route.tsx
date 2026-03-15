import mongodb from "@/app/utils/mongodb"
import Event from "@/app/models/event.model"
import Log from "@/app/models/log.model"
import { Event as EventInterace } from "@/app/interfaces/event.interface";
import { protectRoute } from "@/app/utils/protectRoute"

/**
 * Creates new calendar event and logs the action.
 * Automatically records event creation in audit trail.
 *
 * @param request - HTTP request with event details (name, date, priority)
 * @return Created event object, 401 if unauthorized
 * @throws {Error} On database or validation errors
 * @category Event Management
 * @security Requires valid authentication token
 * @performance Database insert plus audit logging
 * @author Marco Lenschau <contact@marco-lenschau.de>
 */
export async function POST(request: Request): Promise<Response> {
  try {
    const protection = await protectRoute(request, false);
    if (!protection.isValid) {
      return protection.error!;
    }
    const body = await request.json();
    await mongodb.dbConnect(); 
    
    const eventData = {
        userID: body.userID,
        name: body.name,
        description: body.description || '',
        prio: body.prio,
        createdAt: body.eventDate ? new Date(body.eventDate) : new Date(),
        updatedAt: body.eventDate ? new Date(body.eventDate) : new Date()
    };
    
    await Event.create(eventData);
    await logData(body);
    
    return Response.json({ 
      success: true,
      event: eventData
    }, { status: 200 });
  } catch (error) {
    console.error("Event creation error:", error);
    return Response.json({ 
      success: false,
      error: "Failed to create event",
      details: error instanceof Error ? error.message : String(error)
    }, { status: 400 });
  }
}

/**
 * Retrieves all calendar events from database.
 * Returns complete event list with dates and priorities.
 *
 * @param request - HTTP request with authentication
 * @return Array of all events, 401 if unauthorized
 * @throws {Error} On database query errors
 * @category Event Management
 * @security Requires valid authentication token
 * @performance Database scan of events collection
 * @author Marco Lenschau <contact@marco-lenschau.de>
 */
export async function GET(request: Request): Promise<Response> {
  try {
    const protection = await protectRoute(request, false);
    if (!protection.isValid) {
      return protection.error!;
    }
    await mongodb.dbConnect();
    const events = await Event.find({}).lean();
    return Response.json(events, { status: 200 });
  } catch (error) {
    console.error("Event fetch error:", error);
    return Response.json({
      success: false,
      error: "Failed to fetch events",
      details: error instanceof Error ? error.message : String(error)
    }, { status: 400 });
  }
}

/**
 * Records event creation action in audit log for compliance.
 * Called automatically when new event is created.
 *
 * @param body - Event data containing name and details
 * @return void
 * @category Logging
 * @performance Database insert operation
 * @author Marco Lenschau <contact@marco-lenschau.de>
 */
const logData = async (body: EventInterace) => {
    await Log.insertMany({
        userID: body.userID,
        action: "CREATE",
        entity: "Event",
        status: "SUCCESS",
        description: `Event ${body.name} created successfully`
    });
}
