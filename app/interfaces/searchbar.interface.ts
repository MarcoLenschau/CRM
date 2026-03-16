import { ReactNode } from 'react';

/**
 * Props for the SearchBar component providing search input with optional visual customization.
 * Supports placeholder text, color theming, and optional additional content slots.
 *
 * @property searchTerm - Current search input value controlled by parent component
 * @property onSearchChange - Callback function triggered when search input value changes
 * @property placeholder - Placeholder text displayed when input is empty
 * @property focusColor - Color theme (green, blue, orange) applied on input focus
 * @property children - Optional React elements rendered alongside the search input
 * @category Interfaces
 * @author Marco Lenschau <contact@marco-lenschau.de>
 */
export interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  placeholder?: string;
  focusColor?: 'green' | 'blue' | 'orange';
  children?: ReactNode;
}
