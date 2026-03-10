import { InputType } from "@/app/type/input.type";

export default function InputField({placeholder, required = true, type}: {placeholder: string, required?: boolean, type: InputType}) {
  return (
    <input type={type} placeholder={placeholder} className="h-10 w-80 text-center border-2 border-gray-700 rounded-2xl" required={required}></input>
  );
}
