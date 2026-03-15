import mongodb from "@/app/utils/mongodb"
import Event from "@/app/models/event.model"
import Log from "@/app/models/log.model"
import { Event as EventInterace } from "@/app/interfaces/event.interface";
import { protectRoute } from "@/app/utils/protectRoute"

/**
 * Create a new event
 *
 * @param {Request} request - HTTP request with event data in body
 * @returns {Promise<Response>} Success response with created event or error message
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
 * Fetch all events
 *
 * @param {Request} request - HTTP request
 * @returns {Promise<Response>} JSON array of all events or error message
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
 * Log event creation activity
 *
 * @param {EventInterace} body - Event data
 * @returns {Promise<void>}
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
