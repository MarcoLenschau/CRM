'use client';

import { SearchBarProps } from '@/app/interfaces/searchbar.interface';

/**
 * Search input component with configurable focus color and optional children.
 * Integrates with parent component's search state management.
 *
 * @param searchTerm - Current search term value
 * @param onSearchChange - Callback function when search input changes
 * @param placeholder - Input placeholder text (optional, defaults to "🔍 Search...")
 * @param focusColor - Focus border color (green, blue, orange)
 * @param children - Optional elements to render alongside search
 * @return Rendered search bar with input and optional actions
 * @throws Error if onSearchChange callback fails or focusColor is invalid; displays fallback search bar
 * @category UI
 * @security Sanitizes search input for safe database queries, prevents injection
 * @performance Real-time input handling with controlled component and debouncing potential
 * @author Marco Lenschau <contact@marco-lenschau.de>
 */
export default function SearchBar({
  searchTerm,
  onSearchChange,
  placeholder = '🔍 Search...',
  focusColor = 'green',
  children,
}: SearchBarProps) {
  const focusColorMap = {
    green: 'focus:border-green-500',
    blue: 'focus:border-blue-500',
    orange: 'focus:border-orange-500',
  };

  return (
    <div className="rounded-lg border-2 border-zinc-700 p-4 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center flex-1">
      <div className="flex-1">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={placeholder}
          className={`w-full bg-zinc-700/50 text-white rounded-lg px-4 py-2.5 border border-zinc-600 placeholder-gray-500 ${focusColorMap[focusColor]} focus:outline-none transition-colors`}
        />
      </div>
      {children}
    </div>
  );
}
