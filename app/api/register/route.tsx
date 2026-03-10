import { User } from "@/app/interfaces/user.interface";

export const users: User[] = [];

export async function POST(request: Request) {
  const body = await request.json();
  if (!body.name || !body.email || !body.password) {
    return Response.json({ 
      message: "Email, password and name are required" 
    }, { status: 400 });
  }
  users.push(body);
  return Response.json({
    message: "User created!",
    user: body
  }, { status: 200 });
}
