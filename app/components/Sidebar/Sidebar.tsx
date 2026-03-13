import Links from "../Links/Links";
import Juridical from "../Juridical/Juridical";
import Image from "next/image";

export default function Sidebar({isUserLogedIn}: {isUserLogedIn: boolean}) {
  const linksArray = ["Dashboard", "Users", "Email", "Calendar", "Help"];
  const linksArrayWithoutLogin = ["Login", "Register"];
  return (
    <aside className="flex flex-col justify-between border-r-2 border-gray-600 w-38 h-screen">
      <Image src="" alt="logo"/>
      <Links linksArray={isUserLogedIn ? linksArray : linksArrayWithoutLogin}/>
      <Juridical/>
    </aside>
  );
}
