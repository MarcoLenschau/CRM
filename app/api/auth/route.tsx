import mongodb from "@/app/utils/mongodb"
import User from "@/app/models/user.model";
import bcryptjs from "bcryptjs";
import { generateToken } from "@/app/utils/jwt";

export async function POST(request: Request): Promise<Response> {
  try {
    const body = await request.json();
    await mongodb.dbConnect(); 
    if (!body.email || !body.password) {
        return Response.json({success: false, error: "Email and password are required"}, {status: 400});
    }
    const user = await User.findOne({ email: body.email }).lean();
    if (user && await bcryptjs.compare(body.password!, user.hash)) {
        const token = generateToken({ userId: String(user._id), email: user.email });
        return Response.json({success: true, token: token}, {status: 200});        
    } else {
        return Response.json({success: false, error: "Invalid email or password"}, {status: 401});
    }

  } catch (error) {
    return Response.json({success: false, error: "Failed to login", 
        details: error instanceof Error ? error.message : String(error)}, {status: 500});
  }
}