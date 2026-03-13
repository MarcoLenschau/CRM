'use client';

import { ReactNode } from 'react';

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  placeholder?: string;
  focusColor?: 'green' | 'blue' | 'orange';
  children?: ReactNode;
}

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
