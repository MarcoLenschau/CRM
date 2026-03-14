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
