import { ButtonType } from "@/app/type/button.type";

export default function Button({type, onClick = () => {}}: {type: ButtonType, onClick?: () => void}) {
  return ( 
    <button type={type} onClick={() => onClick()}>{capitalizeFirst(String(type))}</button>
  );
}

const capitalizeFirst = (str: string) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();