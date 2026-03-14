import mongodb from "@/app/utils/mongodb"
import Customes from "@/app/models/customer.model"

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
