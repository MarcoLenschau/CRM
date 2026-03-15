import mongodb from "@/app/utils/mongodb"
import UserModel from "@/app/models/user.model"
import { User } from "@/app/interfaces/user.interface";
import bcryptjs from "bcryptjs";

/**
 * Creates new user account with hashed password.
 * Validates email uniqueness and hashes password using bcrypt.
 *
 * @param request - HTTP request with user registration data
 * @return Created user object (without password hash), 409 if email exists
 * @throws {Error} On database or validation errors
 * @category Authentication
 * @security Password hashed with bcrypt (10 rounds)
 * @performance Database lookup plus bcrypt hashing
 * @author Marco Lenschau <contact@marco-lenschau.de>
 */
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

/**
 * Checks if email address already registered in database.
 * Returns conflict status if email is taken.
 *
 * @param email - Email address to verify
 * @return Status 409 if exists, 200 if available
 * @category Authentication
 * @performance Linear search through users collection
 * @author Marco Lenschau <contact@marco-lenschau.de>
 */
const checkIfEmailExists = async (email: string): Promise<{status: number}> => {
  const users = await UserModel.find({}).lean();
  const emailExists = users.some((user) => user.email === email);
  if (emailExists) {
    return { status: 409 };
  } else {
    return { status: 200 };
  }
}

