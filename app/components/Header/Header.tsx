import { Dispatch, SetStateAction } from "react";

export default function Header({setSidebarShow, sidebarShow}: {setSidebarShow: Dispatch<SetStateAction<boolean>>, sidebarShow: boolean}) {
  return (
    <header className="w-full h-24 bg-indigo-950">
        <button onClick={() => setSidebarShow(!sidebarShow)}>Sidebar toogle</button>
    </header>
  );
}
