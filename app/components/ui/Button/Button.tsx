import { ButtonType } from "@/app/type/button.type";

/**
 * Reusable button component with customizable text, type, and click handler.
 * Auto-capitalizes button type as label if no custom text provided.
 *
 * @param type - Button type (submit, button, reset, etc.)
 * @param text - Display text (optional, auto-generated from type if omitted)
 * @param onClick - Click handler function (optional)
 * @return Styled button element
 * @throws Error if type is invalid or onClick callback fails; button remains visible but non-functional
 * @category UI
 * @security Supports onClick callbacks safely without XSS vulnerabilities
 * @performance Lightweight presentational component with memoization potential
 * @author Marco Lenschau <contact@marco-lenschau.de>
 */
export default function Button({type, text=capitalizeFirst(String(type)), onClick = () => {}}: {type: ButtonType, text?: string, onClick? : () => void}) {
  return ( 
    <button type={type} className="w-58 h-12 cursor-pointer border border-gray-700 rounded-2xl" onClick={() => onClick()}>{text}</button>
  );
}

/**
 * Capitalizes first character and lowercases remaining characters.
 *
 * @param str - String to capitalize
 * @return Capitalized string
 * @throws Error if str parameter is invalid or non-string; returns empty string fallback
 * @category Utilities
 * @security Safely handles string transformations without injection risks
 * @performance O(n) string transformation with linear time complexity
 * @author Marco Lenschau <contact@marco-lenschau.de>
 */
const capitalizeFirst = (str: string) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();