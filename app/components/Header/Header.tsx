import { Dispatch, SetStateAction, useState } from "react";
import Time from "../Time/Time";

import Language from "../Language/Language";
import ThemeToggle from "../ui/ThemeToggle/ThemeToggle";

export default function Header({setSidebarShow, sidebarShow}: {setSidebarShow: Dispatch<SetStateAction<boolean>>, sidebarShow: boolean}) {
  const [hour12, setHourMode] = useState(false);
  return (
    <header className="flex justify-between items-center w-full min-h-[85px] px-8 border-b-2 border-zinc-700 bg-zinc-800">
        {/* Left: Menu Icon */}
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" height="32" fill="currentColor" onClick={() => setSidebarShow(!sidebarShow)} className="cursor-pointer hover:text-gray-300 transition-colors">
            <path d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
        </svg>

        {/* Center: Time */}
        <Time hour12={hour12}/>

        {/* Right: Language + Theme */}
        <div className="flex items-center gap-4">
          <Language setHourMode={setHourMode}/>
          <ThemeToggle/>
        </div>
    </header>
  );
}
