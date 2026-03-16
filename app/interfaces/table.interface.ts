import { ReactNode } from 'react';

/**
 * Column definition for generic Table component.
 * Defines how a data property should be rendered and aligned in table output.
 *
 * @property key - Property key from data object to display in this column
 * @property label - Header label text displayed in the table column header
 * @property align - Text alignment (left, center, right) for cell content, defaults to left
 * @property render - Optional custom render function to transform cell value for display
 * @property className - Optional CSS classes to apply to column cells
 * @category Interfaces
 * @author Marco Lenschau <contact@marco-lenschau.de>
 */
export interface TableColumn<T extends Record<string, unknown> = Record<string, unknown>> {
  key: keyof T;
  label: string;
  align?: 'left' | 'center' | 'right';
  render?: (value: T[keyof T], row: T) => ReactNode;
  className?: string;
}

/**
 * Props for the generic Table component displaying tabular data with pagination and rendering options.
 * Supports custom column definitions, empty states, and scrolling configuration.
 *
 * @property columns - Array of TableColumn definitions or direct key names to display
 * @property data - Array of data objects to render as table rows
 * @property emptyMessage - Message displayed when table data is empty
 * @property emptyDescription - Descriptive text for empty state
 * @property config - Configuration options for table behavior (scrolling, height)
 * @category Interfaces
 * @author Marco Lenschau <contact@marco-lenschau.de>
 */
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
