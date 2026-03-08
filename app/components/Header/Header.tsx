import { Dispatch, SetStateAction } from "react";

export default function Header({setSidebarShow, sidebarShow}: {setSidebarShow: Dispatch<SetStateAction<boolean>>, sidebarShow: boolean}) {
  return (
    <header className="w-full h-24 bg-gray-900 border-b-2 border-gray-600">
        <button onClick={() => setSidebarShow(!sidebarShow)}>Sidebar toogle</button>
    </header>
  );
}
