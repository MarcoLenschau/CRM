'use client';

import { Customer } from '@/app/interfaces/customer.interface';
import { CustomerStatus } from '@/app/enums/status.enum';
import { db as users } from '@/app/db';
import TextField from '../ui/TextField/TextField';
import CustomerHeader from '../ui/CustomerHeader/CustomerHeader';

interface EditFormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  status: CustomerStatus;
  assignedUserId: string;
}

interface CustomerDetailCardProps {
  customer: Customer;
  isEditing: boolean;
  editForm: EditFormData;
  onEditChange: (field: keyof EditFormData, value: string | CustomerStatus) => void;
  onSave: () => void;
  onCancel: () => void;
  onEditToggle: (isEditing: boolean) => void;
  onDelete: () => void;
  getStatusColor: (status?: string) => string;
}

export default function CustomerDetailCard({
  customer,
  isEditing,
  editForm,
  onEditChange,
  onSave,
  onCancel,
  onEditToggle,
  onDelete,
  getStatusColor,
}: CustomerDetailCardProps) {
  const getAssignedUserName = () => {
    if (!editForm.assignedUserId) return 'Unassigned';
    const user = users.find(u => String(u.id) === String(editForm.assignedUserId));
    return user ? user.name : 'Unknown User';
  };

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
    <div className="space-y-6">
      {/* Header Section */}
      <CustomerHeader
        customer={customer}
        isEditing={isEditing}
        onEditToggle={onEditToggle}
        onDelete={onDelete}
      />

      {/* Main Details Card */}
      <div className="bg-gradient-to-br from-zinc-800/80 via-zinc-800/60 to-zinc-900/40 rounded-2xl border border-zinc-500 p-8 backdrop-blur-sm shadow-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Company */}
          <TextField
            label="🏢 Company"
            value={editForm.company}
            onChange={(value) => onEditChange('company', value)}
            placeholder="Enter company name"
            displayValue={isEditing ? undefined : (customer.company || '')}
          />

          {/* Email */}
          <TextField
            label="✉️ Email Address"
            value={editForm.email}
            onChange={(value) => onEditChange('email', value)}
            type="email"
            placeholder="Enter email address"
            displayValue={isEditing ? undefined : customer.email}
            icon={!isEditing ? <svg className="w-5 h-5 text-orange-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
            </svg> : undefined}
          />

          {/* Contact Name */}
          <TextField
            label="👤 Contact Name"
            value={editForm.name}
            onChange={(value) => onEditChange('name', value)}
            placeholder="Enter contact name"
            displayValue={isEditing ? undefined : customer.name}
          />

          {/* Phone */}
          <TextField
            label="📞 Phone Number"
            value={editForm.phone}
            onChange={(value) => onEditChange('phone', value)}
            type="tel"
            placeholder="Enter phone number"
            displayValue={isEditing ? undefined : (customer.phone || '')}
            icon={!isEditing ? <svg className="w-5 h-5 text-orange-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
            </svg> : undefined}
          />

          {/* Status */}
          <div className="space-y-3">
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest">📊 Status</label>
            {isEditing ? (
              <select
                value={editForm.status}
                onChange={(e) => onEditChange('status', e.target.value as CustomerStatus)}
                className="w-full bg-zinc-700/60 text-white rounded-xl px-4 py-3 border border-zinc-500 hover:border-zinc-400 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-400/30 transition-all text-base cursor-pointer appearance-none"
              >
                <option value={CustomerStatus.ACTIVE}>🟢 Active</option>
                <option value={CustomerStatus.PENDING}>🟡 Pending</option>
                <option value={CustomerStatus.INACTIVE}>🔴 Inactive</option>
              </select>
            ) : (
              <div className={`inline-flex items-center gap-3 px-4 py-3 rounded-xl text-base font-bold ${getStatusColor(customer.status)}`}>
                <span className="text-2xl">{getStatusIcon(customer.status)}</span>
                <span>{getStatusLabel(customer.status)}</span>
              </div>
            )}
          </div>

          {/* Assigned User */}
          <div className="space-y-3">
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest">👨‍💼 Assigned Employee</label>
            {isEditing ? (
              <select
                value={editForm.assignedUserId}
                onChange={(e) => onEditChange('assignedUserId', e.target.value)}
                className="w-full bg-zinc-700/60 text-white rounded-xl px-4 py-3 border border-zinc-500 hover:border-zinc-400 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-400/30 transition-all text-base cursor-pointer appearance-none"
              >
                <option value="">Unassigned</option>
                {users.map((user) => (
                  <option key={String(user._id || user.id)} value={String(user._id || user.id)}>{user.name}</option>
                ))}
              </select>
            ) : (
              <div className="bg-blue-900/30 border border-zinc-500 rounded-xl px-4 py-3 flex items-center gap-3 hover:bg-blue-900/40 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600/50 to-blue-700/50 flex items-center justify-center flex-shrink-0 shadow-lg">
                  <svg className="w-5 h-5 text-blue-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-blue-300 font-bold uppercase tracking-wider">Assigned To</p>
                  <p className="text-blue-100 font-bold truncate">{getAssignedUserName()}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        {isEditing && (
          <div className="flex gap-4 mt-10 pt-8 border-t border-zinc-500">
            <button 
              onClick={onSave}
              className="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-3 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2 shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
              </svg>
              Save Changes
            </button>
            <button 
              onClick={onCancel}
              className="flex-1 bg-zinc-700 hover:bg-zinc-600 text-white py-3 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl active:scale-95"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/>
              </svg>
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
