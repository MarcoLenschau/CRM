import { User } from "@/app/interfaces/user.interface";

export default async function UsersID({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const user: User = await fetch(`http://localhost:3000/api/users/${id}`).then(res => res.json());
  return (
    <section className="flex flex-col justify-center items-center h-full gap-4">
        <h1>{user?.name ? "User Details" : "No User Found"}</h1>
        <section className="flex flex-col">
            <h3>{user?.name ? `Name: ${user.name}` : ""}</h3>
            <h3>{user?.email ? `Email: ${user.email}` : ""}</h3>
        </section>
    </section>
  );
}
