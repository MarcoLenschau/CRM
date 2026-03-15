import mongodb from "@/app/utils/mongodb"
import UserModel from "@/app/models/user.model"
import { User } from "@/app/interfaces/user.interface";
import bcryptjs from "bcryptjs";

export async function POST(request: Request): Promise<Response> {
  try {
    const body: User = await request.json();
    if (!body.password) return Response.json({error: "Password is required"}, {status: 400});
    await mongodb.dbConnect();
    const emailExists = await checkIfEmailExists(body.email);
    if (emailExists.status === 409) return Response.json({error: "Email already exists"}, {status: 409});
    const hashedPassword = await bcryptjs.hash(body.password!, 10);
    await UserModel.insertMany({
      name: body.name,
      email: body.email,
      hash: hashedPassword,
      isAdmin: body.isAdmin
    });
    return Response.json({
      id: body._id,
      name: body.name,
      email: body.email,
      isAdmin: body.isAdmin
    }, { status: 200 });
  }
  catch {
    return Response.json({error: "Invalid request"}, {status: 400});
  }
}

const checkIfEmailExists = async (email: string): Promise<{status: number}> => {
  const users = await UserModel.find({}).lean();
  const emailExists = users.some((user) => user.email === email);
  if (emailExists) {
    return { status: 409 };
  } else {
    return { status: 200 };
  }
}

