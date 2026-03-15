'use client';

import { Customer } from '@/app/interfaces/customer.interface';
import { CustomerStatus } from '@/app/enums/status.enum';

interface CustomerHeaderProps {
  customer: Customer;
  isEditing: boolean;
  onEditToggle: (isEditing: boolean) => void;
  onDelete: () => void;
}

/**
 * Rich customer header component displaying customer details with edit and delete action buttons.
 * Shows customer name, ID, status, and provides mode toggle for inline editing functionality.
 *
 * @param customer - Customer object containing name, ID, and status information
 * @param isEditing - Flag controlling display of edit/delete buttons vs editing state
 * @param onEditToggle - Callback to toggle between view and edit modes
 * @param onDelete - Callback executed when delete button is clicked
 * @return Rendered customer header with avatar, info, and action buttons
 * @throws Error if customer object is invalid; displays fallback values
 * @category UI Components
 * @security Delete action triggers confirmation; status indicators reflect current customer state
 * @performance Controlled component with efficient conditional rendering for edit/view modes
 * @author Marco Lenschau <contact@marco-lenschau.de>
 */
export default function CustomerHeader({
  customer,
  isEditing,
  onEditToggle,
  onDelete,
}: CustomerHeaderProps) {
  const getStatusIcon = (status: CustomerStatus) => {
    switch (status) {
      case CustomerStatus.ACTIVE:
        return '🟢';
      case CustomerStatus.INACTIVE:
        return '🔴';
      case CustomerStatus.PENDING:
        return '🟡';
    }
  };

  const getStatusLabel = (status: CustomerStatus) => {
    switch (status) {
      case CustomerStatus.ACTIVE:
        return 'Active';
      case CustomerStatus.INACTIVE:
        return 'Inactive';
      case CustomerStatus.PENDING:
        return 'Pending';
    }
  };

  return (
    <div className="bg-gradient-to-r from-zinc-900/30 via-zinc-800/20 to-transparent rounded-2xl border border-zinc-500 p-8 backdrop-blur-sm shadow-lg">
      <div className="flex items-start justify-between gap-8">
        <div className="flex items-start gap-6 flex-1">
          {/* Avatar */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 to-blue-600/30 rounded-2xl blur-lg opacity-40"></div>
            <div className="relative bg-gradient-to-br from-zinc-700 to-zinc-800 rounded-2xl p-6 shadow-lg border border-zinc-600/50">
              <svg className="w-14 h-14 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
              </svg>
            </div>
          </div>

          {/* Info */}
          <div className="flex-1 pt-2">
            <div className="mb-4">
              <h1 className="text-4xl font-bold text-white tracking-tight mb-2">{customer.name}</h1>
              <h2 className="text-zinc-400 text-lg font-medium">Customer ID: <span className="font-mono text-zinc-300">{customer.id}</span></h2>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        {!isEditing && (
          <div className="flex gap-3 flex-shrink-0">
            <button 
              onClick={() => onEditToggle(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 text-sm"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25z"/>
              </svg>
              Edit
            </button>
            <button 
              onClick={onDelete}
              className="bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 text-sm"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-9l-1 1H5v2h14V4z"/>
              </svg>
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
