'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { db as users } from '@/app/db';
import SuccessDialog from '@/app/components/ui/dialogs/SuccessDialog/SuccessDialog';
import DeleteConfirmDialog from '@/app/components/ui/dialogs/DeleteConfirmDialog/DeleteConfirmDialog';
import { Customer } from '@/app/interfaces/customer.interface';

export default function CustomerDetailPage() {
  const router = useRouter();
  const params = useParams();
  const customerId = typeof params.id === 'string' ? params.id : '';

  const [customer, setCustomer] = useState<Customer | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({ 
    name: '', 
    email: '', 
    phone: '', 
    company: '', 
    status: 'active' as 'active' | 'inactive' | 'pending',
    assignedUserId: '' 
  });
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [successTitle, setSuccessTitle] = useState('Success!');

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const response = await fetch(`/api/customer/${customerId}`);
        if (response.ok) {
          const found = await response.json();
          setCustomer(found);
          setEditForm({
            name: found.name,
            email: found.email,
            phone: found.phone || '',
            company: found.company || '',
            status: (found.status as 'active' | 'inactive' | 'pending') || 'active',
            assignedUserId: found.assignedUserId || ''
          });
        } else if (response.status === 404) {
          setCustomer(null);
        }
      } catch (error) {
        console.error('Error fetching customer:', error);
        setCustomer(null);
      } finally {
        setIsLoading(false);
      }
    };

    if (customerId) {
      fetchCustomer();
    }
  }, [customerId]);

  const handleSaveEdit = async () => {
    if (editForm.name.trim() && editForm.email.trim()) {
      setCustomer({ 
        ...customer!, 
        ...editForm 
      });
      setSuccessTitle('Customer updated!');
      setSuccessMessage('Customer information has been successfully updated.');
      setIsSuccessDialogOpen(true);
      setIsEditing(false);
    } else {
      alert('Please fill in all required fields');
    }
  };

  const handleDeleteCustomer = async () => {
    setShowDeleteConfirm(false);
    setSuccessTitle('Customer deleted!');
    setSuccessMessage('Customer has been successfully deleted.');
    setIsSuccessDialogOpen(true);
    setTimeout(() => router.push('/customers'), 1500);
  };

  const getAssignedUserName = () => {
    if (!editForm.assignedUserId) return 'Unassigned';
    return 'Assigned to: ' + editForm.assignedUserId;
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-900/30 border-green-700/50 text-green-400';
      case 'inactive':
        return 'bg-red-900/30 border-red-700/50 text-red-400';
      case 'pending':
        return 'bg-yellow-900/30 border-yellow-700/50 text-yellow-400';
      default:
        return 'bg-gray-900/30 border-gray-700/50 text-gray-400';
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-600"></div>
        <p className="text-white mt-4">Loading customer details...</p>
      </div>
    );
  }

  if (!customer) {
    return (
      <div className="flex flex-col justify-center items-center h-full gap-4">
        <div className="bg-red-900/30 rounded-full p-4 border border-red-700/50">
          <svg className="w-12 h-12 text-red-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-white">Customer Not Found</h1>
        <p className="text-gray-400">The customer you&apos;re looking for doesn&apos;t exist.</p>
        <button 
          onClick={() => router.push('/customers')}
          className="mt-4 px-6 py-2 bg-orange-700 hover:bg-orange-800 text-white rounded-lg font-semibold transition-colors">
          Back to Customers
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="py-4 border-b-2 border-zinc-700">
        <div className="flex items-center gap-4 pl-75">
          <button 
            onClick={() => router.back()}
            className="text-gray-400 hover:text-white transition-colors">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
            </svg>
          </button>
          <div className="bg-orange-900/30 rounded-xl p-2 border border-orange-700/50">
            <svg className="w-6 h-6 text-orange-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"/>
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">Customer Details</h1>
            <p className="text-xs text-gray-400 mt-0.5">View and manage customer information</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto scrollbar-dark">
        <section className="flex flex-col justify-start items-center gap-4 px-6 py-4">
          <div className="w-full max-w-4xl">
            {/* Customer Card */}
            <div className="bg-zinc-800 rounded-lg border-2 border-zinc-700 p-6 shadow-lg">
              {/* Customer Avatar Section */}
              <div className="flex flex-col items-center mb-6 pb-6 border-b border-zinc-700">
                <div className="bg-gradient-to-br from-orange-900 to-orange-800 rounded-full p-4 w-20 h-20 flex items-center justify-center shadow-lg mb-3">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"/>
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-white">{customer.name}</h2>
                <p className="text-gray-400 text-xs mt-1">Customer ID: #{customer.id}</p>
              </div>

              {/* Customer Information */}
              <div className="space-y-4 mb-6">
                {/* Company Name */}
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Company Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editForm.company}
                      onChange={(e) => setEditForm({ ...editForm, company: e.target.value })}
                      className="w-full bg-zinc-700/50 text-white rounded-lg px-3 py-2 border border-zinc-600 hover:border-zinc-500 focus:border-orange-400 focus:outline-none transition-colors text-sm"
                    />
                  ) : (
                    <div className="bg-zinc-700/30 rounded-lg px-3 py-2 border border-zinc-600">
                      <p className="text-white font-semibold text-sm">{customer.company || 'N/A'}</p>
                    </div>
                  )}
                </div>

                {/* Contact Name */}
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Contact Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editForm.name}
                      onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                      className="w-full bg-zinc-700/50 text-white rounded-lg px-3 py-2 border border-zinc-600 hover:border-zinc-500 focus:border-orange-400 focus:outline-none transition-colors text-sm"
                    />
                  ) : (
                    <div className="bg-zinc-700/30 rounded-lg px-3 py-2 border border-zinc-600">
                      <p className="text-white font-semibold text-sm">{customer.name}</p>
                    </div>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Email Address</label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={editForm.email}
                      onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                      className="w-full bg-zinc-700/50 text-white rounded-lg px-3 py-2 border border-zinc-600 hover:border-zinc-500 focus:border-orange-400 focus:outline-none transition-colors text-sm"
                    />
                  ) : (
                    <div className="bg-zinc-700/30 rounded-lg px-3 py-2 border border-zinc-600 flex items-center gap-2">
                      <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                      </svg>
                      <p className="text-white font-semibold text-sm">{customer.email}</p>
                    </div>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Phone Number</label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={editForm.phone}
                      onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                      className="w-full bg-zinc-700/50 text-white rounded-lg px-3 py-2 border border-zinc-600 hover:border-zinc-500 focus:border-orange-400 focus:outline-none transition-colors text-sm"
                    />
                  ) : (
                    <div className="bg-zinc-700/30 rounded-lg px-3 py-2 border border-zinc-600 flex items-center gap-2">
                      <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                      </svg>
                      <p className="text-white font-semibold text-sm">{customer.phone || 'N/A'}</p>
                    </div>
                  )}
                </div>

                {/* Status Badge */}
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Status</label>
                  {isEditing ? (
                    <select
                      value={editForm.status}
                      onChange={(e) => setEditForm({ ...editForm, status: e.target.value as 'active' | 'inactive' | 'pending' })}
                      className="w-full bg-zinc-700/50 text-white rounded-lg px-3 py-2 border border-zinc-600 hover:border-zinc-500 focus:border-orange-400 focus:outline-none transition-colors text-sm cursor-pointer"
                    >
                      <option value="active">Active</option>
                      <option value="pending">Pending</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  ) : (
                    <div className={`flex items-center gap-2 border ${getStatusColor(customer.status)} rounded-lg px-3 py-2`}>
                      {customer.status === 'active' && (
                        <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                        </svg>
                      )}
                      {customer.status === 'inactive' && (
                        <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/>
                        </svg>
                      )}
                      {customer.status === 'pending' && (
                        <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11z"/>
                        </svg>
                      )}
                      <span className="font-semibold text-sm">
                        {customer.status?.charAt(0).toUpperCase()}
                        {customer.status?.slice(1)}
                      </span>
                    </div>
                  )}
                </div>

                {/* Assigned User */}
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Assigned Employee</label>
                  {isEditing ? (
                    <select
                      value={editForm.assignedUserId}
                      onChange={(e) => setEditForm({ ...editForm, assignedUserId: e.target.value })}
                      className="w-full bg-zinc-700/50 text-white rounded-lg px-3 py-2 border border-zinc-600 hover:border-zinc-500 focus:border-orange-400 focus:outline-none transition-colors text-sm cursor-pointer"
                    >
                      <option value="">Unassigned</option>
                      {users.map(user => (
                        <option key={user.id} value={user.id}>{user.name}</option>
                      ))}
                    </select>
                  ) : (
                    <div className="bg-blue-900/20 border border-blue-600/50 rounded-lg px-3 py-2 flex items-center gap-2">
                      <div className="bg-blue-900/40 rounded-full p-1.5">
                        <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                        </svg>
                      </div>
                      <p className="text-blue-300 font-semibold text-sm">{getAssignedUserName()}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-zinc-700">
                <div className="flex gap-2">
                  {!isEditing ? (
                    <>
                      <button 
                        onClick={() => setIsEditing(true)}
                        className="flex-1 bg-blue-900 hover:bg-blue-800 text-white py-2 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 text-sm shadow-lg">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25z"/>
                        </svg>
                        Edit
                      </button>
                      <button 
                        onClick={() => setShowDeleteConfirm(true)}
                        className="flex-1 bg-red-700 hover:bg-red-800 text-white py-2 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 text-sm shadow-lg">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-9l-1 1H5v2h14V4z"/>
                        </svg>
                        Delete
                      </button>
                    </>
                  ) : (
                    <>
                      <button 
                        onClick={handleSaveEdit}
                        className="flex-1 bg-green-700 hover:bg-green-800 text-white py-2 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 text-sm shadow-lg">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                        </svg>
                        Save
                      </button>
                      <button 
                        onClick={() => {
                          setIsEditing(false);
                          setEditForm({
                            name: customer.name,
                            email: customer.email,
                            phone: customer.phone || '',
                            company: customer.company || '',
                            status: (customer.status as 'active' | 'inactive' | 'pending') || 'active',
                            assignedUserId: customer.assignedUserId || ''
                          });
                        }}
                        className="flex-1 bg-zinc-700 hover:bg-zinc-600 text-white py-2 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 text-sm">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/>
                        </svg>
                        Cancel
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Additional Info Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              {/* Account Info */}
              <div className="bg-zinc-800 rounded-lg border-2 border-zinc-700 p-4">
                <div className="flex items-center gap-2 mb-3">
                  <div className="bg-orange-900/30 rounded-full p-1.5 border border-orange-700/50">
                    <svg className="w-4 h-4 text-orange-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11z"/>
                    </svg>
                  </div>
                  <h3 className="text-sm font-bold text-white">Account Information</h3>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Account Status:</span>
                    <span className="text-green-400 font-semibold">Active</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Member Since:</span>
                    <span className="text-white">{customer.createdAt ? new Date(customer.createdAt).toLocaleDateString('de-DE') : 'Unknown'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Last Updated:</span>
                    <span className="text-white">Today</span>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="bg-zinc-800 rounded-lg border-2 border-zinc-700 p-4">
                <div className="flex items-center gap-2 mb-3">
                  <div className="bg-green-900/30 rounded-full p-1.5 border border-green-700/50">
                    <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                    </svg>
                  </div>
                  <h3 className="text-sm font-bold text-white">Communication</h3>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex items-center gap-2">
                    <svg className="w-3 h-3 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                    </svg>
                    <span className="text-gray-300">Email communications enabled</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-3 h-3 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                    </svg>
                    <span className="text-gray-300">Phone contact available</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Dialogs */}
      <DeleteConfirmDialog 
        isOpen={showDeleteConfirm}
        userName={customer.name}
        onConfirm={handleDeleteCustomer}
        onClose={() => setShowDeleteConfirm(false)}
      />

      <SuccessDialog 
        isOpen={isSuccessDialogOpen}
        onClose={() => setIsSuccessDialogOpen(false)}
        title={successTitle}
        message={successMessage}
        detailLabel="Customer"
        detailValue={customer.name}
        buttonText="Done"
      />
    </div>
  );
}
