import mongodb from "@/app/utils/mongodb"
import Event from "@/app/models/event.model"
import Log from "@/app/models/log.model"
import { Event as EventInterace } from "@/app/interfaces/event.interface";

export async function POST(request: Request): Promise<Response> {
  try {
    const body = await request.json();
    await mongodb.dbConnect(); 
    await Event.insertMany({
        userID: body.userID,
        name: body.name,
        description: body.description,
        prio: body.prio
    });
    await logData(body);
    return Response.json({ 
      success: true,
      event: {
        userID: body.userID,
        name: body.name,
        description: body.description,
        prio: body.prio
      }
    }, { status: 200 });
  } catch (error) {
    return Response.json({ 
      success: false,
      error: "Failed to create event",
      details: error instanceof Error ? error.message : String(error)
    }, { status: 400 });
  }
}

export async function GET() {
  try {
    await mongodb.dbConnect();
    const events = await Event.find({}).lean();
    return Response.json({
      success: true,
      events: events
    }, { status: 200 });
  } catch (error) {
    return Response.json({
      success: false,
      error: "Failed to fetch events",
      details: error instanceof Error ? error.message : String(error)
    }, { status: 400 });
  }

}

const logData = async (body: EventInterace) => {
    await Log.insertMany({
        userID: body.userID,
        action: "CREATE",
        entity: "Event",
        status: "SUCCESS",
        description: `Event ${body.name} created successfully`
    });
}
