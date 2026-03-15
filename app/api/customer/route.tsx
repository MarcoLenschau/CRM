import mongodb from "@/app/utils/mongodb"
import Customes from "@/app/models/customer.model"
import { CustomerStatus } from "@/app/enums/status.enum"
import { protectRoute } from "@/app/utils/protectRoute"

/**
 * Create a new customer
 *
 * @param {Request} request - HTTP request with customer data in body
 * @returns {Promise<Response>} Created customer or error response
 */
export async function POST(request: Request): Promise<Response> {
  try {
    const protection = await protectRoute(request, false);
    if (!protection.isValid) {
      return protection.error!;
    }
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
      user: body
    }, { status: 200 });
  } catch {
    return Response.json({ 
      success: false,
      error: "Failed to create customer"
    }, { status: 400 });
  }
}

/**
 * Fetch all customers
 *
 * @param {Request} request - HTTP request
 * @returns {Promise<Response>} Array of customers or error response
 */
export async function GET(request: Request): Promise<Response> {
    try {
      const protection = await protectRoute(request, false);
      if (!protection.isValid) {
        return protection.error!;
      }
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
