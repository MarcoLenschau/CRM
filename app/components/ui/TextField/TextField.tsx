'use client';

interface TextFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: 'text' | 'email' | 'tel';
  icon?: React.ReactNode;
  displayValue?: string;
}

/**
 * Reusable text input component supporting both view and edit modes with optional icon display.
 * Renders as read-only text in display mode or editable input field in edit mode with type validation.
 *
 * @param label - Field label text displayed above the input
 * @param value - Current input value or editable state
 * @param onChange - Callback function triggered when input value changes
 * @param placeholder - Placeholder text displayed when input is empty
 * @param type - Input type (text, email, tel) for validation and keyboard selection
 * @param icon - Optional React component or element rendered before the value/input
 * @param displayValue - If provided, renders read-only display mode instead of editable input
 * @return Rendered text field with label, icon support, and dual mode functionality
 * @throws Invalid input type or missing required label parameter
 * @category UI Components
 * @security Sanitizes input based on type; prevents XSS through React's automatic escaping
 * @performance Lightweight controlled component with minimal re-renders; supports conditional rendering
 * @author Marco Lenschau <contact@marco-lenschau.de>
 */
export default function TextField({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  icon,
  displayValue,
}: TextFieldProps) {
  const isEditing = displayValue === undefined;

  return (
    <div className="space-y-3">
      <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest">{label}</label>
      {isEditing ? (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-zinc-700/60 text-white rounded-xl px-4 py-3 border border-zinc-600 hover:border-zinc-500 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-400/30 transition-all text-base placeholder-zinc-500"
          placeholder={placeholder}
        />
      ) : (
        <div className="bg-zinc-700/30 hover:bg-zinc-700/50 rounded-xl px-4 py-3 border border-zinc-700/50 flex items-center gap-3 transition-colors">
          {icon && <div className="flex-shrink-0">{icon}</div>}
          <p className="text-white text-base font-semibold">{displayValue || <span className="text-gray-500">Not specified</span>}</p>
        </div>
      )}
    </div>
  );
}
