import Links from "../Links/Links";
import Juridical from "../Juridical/Juridical";

export default function Sidebar({isUserLogedIn}: {isUserLogedIn: boolean}) {
  const linksArray = ["Dashboard", "Users", "Email", "Calendar", "Help"];
  const linksArrayWithoutLogin = ["Login", "Register"];
  return (
    <aside className="flex flex-col justify-between bg-zinc-800 border-r-2 border-zinc-600 w-56 h-screen p-6">
      <div>
        <div className="mb-8 p-4 bg-green-800/30 rounded-lg text-center border border-green-800/70">
          <h1 className="text-white font-bold text-2xl">CRM</h1>
          <p className="text-blue-400 text-xs mt-1">Dashboard</p>
        </div>
      </div>
      <Links linksArray={isUserLogedIn ? linksArray : linksArrayWithoutLogin}/>
      <Juridical/>
    </aside>
  );
}
