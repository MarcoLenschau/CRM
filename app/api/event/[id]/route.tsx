import mongodb from "@/app/utils/mongodb"
import Event from "@/app/models/event.model"
import Log from "@/app/models/log.model"
import { protectRoute } from "@/app/utils/protectRoute"

/**
 * Delete an event by ID
 *
 * @param {Request} request - HTTP request
 * @param {Object} params - Route parameters containing event ID
 * @returns {Promise<Response>} Success message or error
 */
export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }): Promise<Response> {
  try {
    const protection = await protectRoute(request, false);
    if (!protection.isValid) {
      return protection.error!;
    }

    const { id: eventId } = await params;
    if (!eventId) {
      return Response.json({ success: false, error: "Event ID is required" }, { status: 400 });
    }

    await mongodb.dbConnect();
    const event = await Event.findById(eventId);
    if (!event) {
      return Response.json({ success: false, error: "Event not found" }, { status: 404 });
    }

    await Event.findByIdAndDelete(eventId);
    await Log.insertMany({
        userID: event.userID,
        action: "DELETE",
        entity: "Event",
        status: "SUCCESS",
        description: `Event ${event.name} deleted successfully`
    });
    
    return Response.json({ success: true, message: "Event deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Event deletion error:", error);
    return Response.json({ 
      success: false,
      error: "Failed to delete event",
      details: error instanceof Error ? error.message : String(error)
    }, { status: 400 });
  }
}
