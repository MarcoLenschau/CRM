import { Dispatch, SetStateAction } from "react";
import Time from "../Time/Time";

import Language from "../Language/Language";

export default function Header({setSidebarShow, sidebarShow}: {setSidebarShow: Dispatch<SetStateAction<boolean>>, sidebarShow: boolean}) {
  return (
    <header className="flex justify-between items-center w-full h-31 pl-8 pr-8 border-b-2 border-gray-600 bg-zinc-900">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" height="38" fill="currentColor" onClick={() => setSidebarShow(!sidebarShow)} className="cursor-pointer">
            <path d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
        </svg>
        <Time />
        <Language />
    </header>
  );
}
