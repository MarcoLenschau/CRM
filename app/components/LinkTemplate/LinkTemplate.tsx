import Link from "next/link";

export default function LinkTemplate({name}: {name: string}) {
  return (
      <Link className="w-full h-[42px] flex justify-center items-center border border-gray-500 font-bold" 
        href={`./${name.toLowerCase() === "login" ? "/" : name.toLowerCase() }`}>{name}</Link>
  );
}
