"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function LinkTemplate({name}: {name: string}) {
  const pathname = usePathname();
  const linkName = name.toLowerCase() === "login" ? "" : name.toLowerCase();
  const href = linkName === "" ? "/" : `/${linkName}`;
  const isActive = pathname === href;
  
  return (
      <Link 
        className={`w-48 h-12 flex justify-center items-center border font-semibold rounded-lg transition-all duration-200 ${
          isActive 
            ? "bg-zinc-600/70 border-2 border-zinc-400 hover:bg-zinc-700/30 text-white" 
            : "bg-zinc-700/30 hover:bg-zinc-800/50 border-zinc-600 text-white"
        }`} 
        href={href}>{name}
      </Link>
  );
}
