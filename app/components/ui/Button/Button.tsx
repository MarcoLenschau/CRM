import { ButtonType } from "@/app/type/button.type";

export default function Button({type, text=capitalizeFirst(String(type)), onClick = () => {}}: {type: ButtonType, text?: string, onClick? : () => void}) {
  return ( 
    <button type={type} className="w-58 h-12 cursor-pointer border border-gray-700 rounded-2xl" onClick={() => onClick()}>{text}</button>
  );
}

const capitalizeFirst = (str: string) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();