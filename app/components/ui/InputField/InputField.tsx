export default function InputField({placeholder, required = true}: {placeholder: string, required?: boolean}) {
  return (
    <input placeholder={placeholder} className="h-10 w-80 text-center border-2 border-gray-700 rounded-2xl" required={required}></input>
  );
}
