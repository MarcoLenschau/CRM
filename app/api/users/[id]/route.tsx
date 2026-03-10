import { User } from "@/app/interfaces/user.interface";

export async function GET(context: { params: { id: string }}) {
  const users: User[] = [];
  const contextRes = await context.params;
  return Response.json({
    id: Number(contextRes),
    name: users[0].name,
    email: users[0].email
  });
}
