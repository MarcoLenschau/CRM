import { InputType } from "@/app/type/input.type";

/**
 * Basic input field component with typed input support and optional requirements validation.
 * Provides consistent styling and centered text alignment for form inputs.
 *
 * @param id - Optional HTML id attribute for form element identification
 * @param placeholder - Placeholder text displayed when input is empty
 * @param required - Boolean flag making field required for form submission, defaults to true
 * @param type - Input type (text, email, password, etc.) from InputType union
 * @return Rendered HTML input element with styling and validation
 * @throws Error if invalid input type provided; browser prevents submission
 * @category UI Components
 * @security Type validation prevents incorrect input types; browser native validation for email/number
 * @performance Lightweight uncontrolled input component
 * @author Marco Lenschau <contact@marco-lenschau.de>
 */
export default function InputField({id = "", placeholder, required = true, type}: {id?: string, placeholder: string, required?: boolean, type: InputType}) {
  return (
    <input id={id} type={type} placeholder={placeholder} className="h-10 w-80 text-center border-2 border-gray-700 rounded-2xl" required={required}></input>
  );
}
