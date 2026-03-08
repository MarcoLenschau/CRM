import { Dispatch, SetStateAction } from "react";

export default function Header({setSidebarShow, sidebarShow}: {setSidebarShow: Dispatch<SetStateAction<boolean>>, sidebarShow: boolean}) {
  return (
    <header className="w-full h-24 flex items-center pl-8 bg-gray-900 border-b-2 border-gray-600">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" height="38" fill="currentColor" onClick={() => setSidebarShow(!sidebarShow)}>
            <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
        </svg>
    </header>
  );
}
