import { ReactNode } from 'react';

export interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  placeholder?: string;
  focusColor?: 'green' | 'blue' | 'orange';
  children?: ReactNode;
}
