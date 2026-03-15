import mongodb from "@/app/utils/mongodb"
import Customes from "@/app/models/customer.model"
import { CustomerStatus } from "@/app/enums/status.enum"
import { protectRoute } from "@/app/utils/protectRoute"

/**
 * Creates new customer record in CRM system.
 * Initializes customer with contact info and assignment.
 *
 * @param request - HTTP request with customer data (name, email, phone, company)
 * @return Created customer object, 401 if unauthorized
 * @throws {Error} On database or validation errors
 * @category Customer Management
 * @security Requires valid authentication token
 * @performance Database insert with status default
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
 * Retrieves all customer records from database.
 * Returns formatted customer list with contact and assignment info.
 *
 * @param request - HTTP request with authentication
 * @return Array of all customers, 401 if unauthorized
 * @throws {Error} On database query errors
 * @category Customer Management
 * @security Requires valid authentication token
 * @performance Database scan of customers collection
 * @author Marco Lenschau <contact@marco-lenschau.de>
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
