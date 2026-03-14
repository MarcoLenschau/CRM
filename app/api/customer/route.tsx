import mongodb from "@/app/utils/mongodb"
import Customes from "@/app/models/customer.model"
import { CustomerStatus } from "@/app/enums/status.enum"

export async function POST(request: Request): Promise<Response> {
  try {
    const body = await request.json();
    await mongodb.dbConnect(); 
    await Customes.insertMany({
      name: body.name,
      email: body.email,
      phone: body.phone,
      company: body.company,
      status: body.status || CustomerStatus.ACTIVE,
      assignedUserId: body.assignedUserId
    });
    return Response.json({ 
      success: true,
      user: {
        name: body.name,
        email: body.email,
        phone: body.phone,
        company: body.company,
        status: body.status || CustomerStatus.ACTIVE,
        assignedUserId: body.assignedUserId
      }
    }, { status: 200 });
  } catch {
    return Response.json({ 
      success: false,
      error: "Failed to create customer"
    }, { status: 400 });
  }
}

export async function GET(): Promise<Response> {
    try {
      await mongodb.dbConnect(); 
      const users = await Customes.find({}).lean();
      return Response.json({ 
        success: true,
        customers: users.map((user) => ({
          id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          company: user.company,
          status: user.status || CustomerStatus.ACTIVE,
          assignedUserId: user.assignedUserId
        }))
      }, { status: 200 });
    } catch {
      return Response.json({ 
        success: false,
        error: "Failed to fetch customer"
      }, { status: 400 });
    } 
}
