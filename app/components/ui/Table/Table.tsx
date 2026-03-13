'use client';

import { ReactNode } from 'react';

export interface TableColumn<T extends Record<string, unknown> = Record<string, unknown>> {
  key: keyof T;
  label: string;
  align?: 'left' | 'center' | 'right';
  render?: (value: T[keyof T], row: T) => ReactNode;
  className?: string;
}

interface TableProps<T extends Record<string, unknown> = Record<string, unknown>> {
  columns: (TableColumn<T> | keyof T)[];
  data: T[];
  emptyMessage?: string;
  emptyDescription?: string;
  config?: {
    scrollable?: boolean;  // Auto-enable scrollbar if > 5 items
    maxHeight?: string;    // Default: scrolls if > 5 items
  };
}

// Helper function to convert field names to columns
const normalizeColumns = <T extends Record<string, unknown>>(
  columns: (TableColumn<T> | keyof T)[]
): TableColumn<T>[] => {
  if (columns.length === 0) return [];
  
  return columns.map((col) => {
    // Check if it's already a column config
    if (typeof col === 'object' && col !== null && 'key' in col) {
      return col as TableColumn<T>;
    }
    
    // It's a field name - convert to column config
    const key = col as keyof T;
    return {
      key,
      label: String(key).charAt(0).toUpperCase() + String(key).slice(1),
      align: 'left' as const,
    };
  });
};

export default function Table<T extends Record<string, unknown>>({
  columns: columnsInput,
  data,
  emptyMessage = 'No data found',
  emptyDescription = 'No records to display',
  config = {},
}: TableProps<T>) {
  // Normalize columns - convert field names to full column config
  const columns = normalizeColumns(columnsInput);

  // Determine if scrollbar should be enabled
  // If scrollable is explicitly set, use that. Otherwise, enable if > 5 items
  const shouldScroll = config.scrollable !== undefined 
    ? config.scrollable 
    : data.length > 5;

  const maxHeight = config.maxHeight || 'max-h-96';

  const getAlignClass = (align: 'left' | 'center' | 'right' = 'left') => {
    switch (align) {
      case 'center':
        return 'text-center';
      case 'right':
        return 'text-right';
      default:
        return 'text-left';
    }
  };

  const getPaddingClass = (align: 'left' | 'center' | 'right' = 'left') => {
    switch (align) {
      case 'center':
        return 'px-6 py-4';
      case 'right':
        return 'px-6 py-4';
      default:
        return 'px-6 py-4';
    }
  };

  return (
    <div className="bg-gradient-to-b from-zinc-800 to-zinc-900 rounded-lg border-2 border-zinc-700 overflow-hidden shadow-lg">
      {data.length > 0 ? (
        <div className={shouldScroll ? `overflow-x-auto scrollbar-dark ${maxHeight} overflow-y-auto` : 'overflow-x-auto'}>
          <table className="w-full text-sm">
            <thead className="sticky top-0 z-10 bg-gradient-to-r from-zinc-800 to-zinc-700/50 border-b border-zinc-700/50">
              <tr>
                {columns.map((column) => (
                  <th
                    key={String(column.key)}
                    className={`${getPaddingClass(column.align)} font-semibold text-gray-200 ${getAlignClass(column.align)}`}
                  >
                    {column.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => {
                const rowKey = ((row as Record<string, unknown>).id as string | number) || index;
                return (
                  <tr
                    key={String(rowKey)}
                    className="border-b border-zinc-700/30 hover:bg-zinc-700/20 transition-colors"
                  >
                    {columns.map((column) => (
                      <td
                        key={`${String(rowKey)}-${String(column.key)}`}
                        className={`${getPaddingClass(column.align)} ${getAlignClass(column.align)} ${column.className || ''}`}
                      >
                        {column.render
                          ? column.render(row[column.key], row)
                          : (row[column.key] as ReactNode)}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-800/50 mb-4">
              <svg className="w-8 h-8 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
              </svg>
            </div>
            <p className="text-gray-300 text-lg font-semibold mb-2">{emptyMessage}</p>
            <p className="text-gray-500 text-sm">{emptyDescription}</p>
          </div>
        </div>
      )}
    </div>
  );
}
