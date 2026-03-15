import mongodb from "@/app/utils/mongodb"
import Event from "@/app/models/event.model"
import Log from "@/app/models/log.model"
import { protectRoute } from "@/app/utils/protectRoute"

/**
 * Deletes calendar event and logs the action.
 * Records deletion in audit trail for compliance.
 *
 * @param request - HTTP request with authentication
 * @param params - Route parameters with event ID
 * @return Success message or 404 if not found
 * @throws {Error} On database deletion errors
 * @category Event Management
 * @security Requires authentication, logs all deletions
 * @performance Direct MongoDB ID deletion plus audit logging
 * @author Marco Lenschau <contact@marco-lenschau.de>
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
