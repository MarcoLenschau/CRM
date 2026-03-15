import mongodb from "@/app/utils/mongodb"
import Customes from "@/app/models/customer.model"

/**
 * Retrieves single customer by ID with contact and assignment details.
 * Returns 404 if customer not found.
 *
 * @param request - HTTP request (unused)
 * @param params - Route parameters with customer ID
 * @return Customer object or 404 if not found
 * @throws {Error} On database query errors
 * @category Customer Management
 * @performance Direct MongoDB ID lookup
 * @author Marco Lenschau <contact@marco-lenschau.de>
 */
export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }): Promise<Response> {
    try {
      const { id } = await params;
      await mongodb.dbConnect(); 
      const user = await Customes.findById(id).lean();
      
      if (!user) {
        return Response.json({ 
          success: false,
          error: "Customer not found"
        }, { status: 404 });
      }
      
      return Response.json({ 
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        company: user.company,
        status: user.status,
        assignedUserId: user.assignedUserId
      }, { status: 200 });
    } catch {
      return Response.json({ 
        success: false,
        error: "Failed to fetch customer"
      }, { status: 400 });
    } 
}
