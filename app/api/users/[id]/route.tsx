import { User } from "@/app/interfaces/user.interface";
import { db } from "@/app/db";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }): Promise<Response> {
  const { id } = await params;
  const user: User = db[parseInt(id)];
  return Response.json({
    id: Number(id),
    name: user?.name,
    email: user?.email
  });
}
