"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const iconMap: Record<string, string> = {
  dashboard: "M3 13h2v8H3zm4-8h2v16H7zm4-2h2v18h-2zm4-2h2v20h-2zm4 4h2v16h-2z",
  customers: "M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z",
  users: "M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 2.05 1.97 3.95v2h6v-2c0-2.66-3.33-4-6-4z",
  email: "M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z",
  calendar: "M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zm-5-5H7v5h7v-5z",
  settings: "M19.14 12.94c.04-.3.06-.61.06-.94 0-2.05-1.53-3.76-3.56-3.97l1.07-1.07c.3-.29.3-.77 0-1.07-.29-.29-.77-.29-1.07 0l-2.5 2.5c-.29.29-.29.77 0 1.07.29.29.77.29 1.07 0l1.07-1.07c1.48.18 2.68 1.35 2.68 2.87 0 .24-.02.47-.06.7h2.24zm-7.14 0c-.04-.23-.06-.46-.06-.7 0-1.52 1.2-2.69 2.68-2.87l1.07 1.07c.3.29.77.29 1.07 0 .29-.3.29-.78 0-1.07l-2.5-2.5c-.29-.29-.77-.29-1.07 0-.29.29-.29.77 0 1.07l1.07 1.07C8.39 8.27 6.86 9.98 6.86 12c0 .33.02.64.06.94H4.68c-.04-.3-.06-.61-.06-.94 0-2.05 1.53-3.76 3.56-3.97l-1.07-1.07c-.3-.29-.3-.77 0-1.07.29-.29.77-.29 1.07 0l2.5 2.5c.29.29.29.77 0 1.07-.29.29-.77.29-1.07 0l-1.07-1.07c1.48.18 2.68 1.35 2.68 2.87 0 .24-.02.47-.06.7h2.24z",
  auditlog: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z",
  help: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z",
  login: "M10 17v-5h2v5h4v-8H2v8h4zm8-10h-4V5h4v2z",
  register: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z",
};

export default function LinkTemplate({name}: {name: string}) {
  const pathname = usePathname();
  const linkName = name.toLowerCase() === "login" ? "" : name.toLowerCase();
  const href = linkName === "" ? "/" : `/${linkName}`;
  const isActive = pathname === href;
  const icon = iconMap[linkName] || iconMap.dashboard;
  
  return (
      <Link 
        className={`w-48 h-12 flex justify-center items-center gap-2 border font-semibold rounded-lg transition-all duration-200 ${
          isActive 
            ? "bg-zinc-600/70 border-2 border-zinc-400 hover:bg-zinc-700/30 text-white" 
            : "bg-zinc-700/30 hover:bg-zinc-800/50 border-zinc-600 text-white"
        }`} 
        href={href}
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d={icon} />
        </svg>
        {name}
      </Link>
  );
}
