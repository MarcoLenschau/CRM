import { InputType } from "@/app/type/input.type";

export default function InputField({id = "", placeholder, required = true, type}: {id?: string, placeholder: string, required?: boolean, type: InputType}) {
  return (
    <input id={id} type={type} placeholder={placeholder} className="h-10 w-80 text-center border-2 border-gray-700 rounded-2xl" required={required}></input>
  );
}
