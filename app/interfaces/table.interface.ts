import { ReactNode } from 'react';

export interface TableColumn<T extends Record<string, unknown> = Record<string, unknown>> {
  key: keyof T;
  label: string;
  align?: 'left' | 'center' | 'right';
  render?: (value: T[keyof T], row: T) => ReactNode;
  className?: string;
}

export interface TableProps<T extends Record<string, unknown> = Record<string, unknown>> {
  columns: (TableColumn<T> | keyof T)[];
  data: T[];
  emptyMessage?: string;
  emptyDescription?: string;
  config?: {
    scrollable?: boolean;  // Auto-enable scrollbar if > 5 items
    maxHeight?: string;    // Default: scrolls if > 5 items
  };
}
