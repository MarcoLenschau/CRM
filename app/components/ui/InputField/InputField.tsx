export default function InputField({placeholder, required = true, onInput = () => {}}: {placeholder: string, required?: boolean, onInput?: () => void}) {
  return (
    <input placeholder={placeholder} className="h-10 w-80 text-center border-2 border-gray-700 rounded-2xl" required={required} onInput={() => onInput()}></input>
  );
}
