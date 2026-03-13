import Link from "next/link";

export default function LinkTemplate({name}: {name: string}) {
  return (
      <Link className="w-48 h-12 flex justify-center items-center bg-zinc-700/30 hover:bg-zinc-800/50 border border-zinc-600 font-semibold text-white rounded-lg" 
        href={`./${name.toLowerCase() === "login" ? "/" : name.toLowerCase() }`}>{name}</Link>
  );
}
