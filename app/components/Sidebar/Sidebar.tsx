import Links from "../Links/Links";
import Juridical from "../Juridical/Juridical";

export default function Sidebar() {
  return (
    <aside className="flex flex-col justify-between border-r-2 border-gray-600 w-38 h-screen bg-gray-900">
      <img alt="logo"/>
      <Links />
      <Juridical />
    </aside>
  );
}
