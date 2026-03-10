import { ButtonType } from "@/app/type/button.type";

export default function Button({type, text=capitalizeFirst(String(type))}: {type: ButtonType, text?: string}) {
  return ( 
    <button type={type} className="w-58 h-12 cursor-pointer border border-gray-700 rounded-2xl">{text}</button>
  );
}

const capitalizeFirst = (str: string) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();