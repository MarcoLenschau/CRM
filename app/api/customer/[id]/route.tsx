import mongodb from "@/app/utils/mongodb"
import Customes from "@/app/models/customer.model"

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }): Promise<Response> {
    try {
      const { id } = await params;
      await mongodb.dbConnect(); 
      const users = await Customes.find({}).lean();
      const user = users.find((u) => u._id.toString() === id);
      return Response.json({ 
        success: true,
        user: {
          name: user.name,
          email: user.email,
          phone: user.phone,
          company: user.company,
          status: user.status,
          assignedUserId: user.assignedUserId
        }
      }, { status: 200 });
    } catch {
      return Response.json({ 
        success: false,
        error: "Failed to fetch customer"
      }, { status: 400 });
    } 
}
