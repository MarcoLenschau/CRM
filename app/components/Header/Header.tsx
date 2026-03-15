import { Dispatch, SetStateAction, useState } from "react";
import Time from "../Time/Time";

import Language from "../Language/Language";
import ThemeToggle from "../ui/ThemeToggle/ThemeToggle";

/**
 * Main application header with navigation controls and utilities.
 * Displays menu toggle, time, language selector, and theme toggle.
 *
 * @param setSidebarShow - Function to toggle sidebar visibility
 * @param sidebarShow - Current sidebar visibility state
 * @return Rendered header component
 * @throws Error if setSidebarShow callback fails or is unavailable; sidebar toggle becomes unresponsive
 * @category Layout
 * @security Sidebar toggle state managed in parent for secure context passing
 * @performance Lightweight header with minimal re-renders on prop changes
 * @author Marco Lenschau <contact@marco-lenschau.de>
 */
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
