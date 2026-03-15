'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import SuccessDialog from '@/app/components/ui/dialogs/SuccessDialog/SuccessDialog';
import DeleteConfirmDialog from '@/app/components/ui/dialogs/DeleteConfirmDialog/DeleteConfirmDialog';

interface User {
  _id: string;
  name: string;
  email: string;
  isAdmin?: boolean;
  createdAt?: string;
}

interface EditFormData {
  name: string;
  email: string;
  isAdmin: boolean;
}

export default function UserDetailPage() {
  const router = useRouter();
  const params = useParams();
  const userId = typeof params.id === 'string' ? params.id : '';

  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<EditFormData>({ name: '', email: '', isAdmin: false });
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [successTitle, setSuccessTitle] = useState('Success!');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`/api/user/${userId}`, {
          credentials: 'include'
        });
        if (response.ok) {
          const data = await response.json();
          setUser(data);
          setEditForm({ name: data.name, email: data.email, isAdmin: data.isAdmin || false });
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Error fetching user:', error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };
    if (userId) {
      fetchUser();
    }
  }, [userId]);

  const handleSaveEdit = () => {
    if (editForm.name.trim() && editForm.email.trim()) {
      setUser({ ...user!, ...editForm });
      setSuccessTitle('User Updated!');
      setSuccessMessage('User information has been successfully updated.');
      setIsSuccessDialogOpen(true);
      setIsEditing(false);
    } else {
      alert('Please fill in all required fields');
    }
  };

  const handleDeleteUser = () => {
    setShowDeleteConfirm(false);
    setSuccessTitle('User Deleted!');
    setSuccessMessage('User has been successfully deleted.');
    setIsSuccessDialogOpen(true);
    setTimeout(() => router.push('/users'), 1500);
  };

  const handleEditChange = (field: keyof EditFormData, value: string | boolean) => {
    setEditForm(prev => ({ ...prev, [field]: value }));
  };

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
        <p className="text-white mt-4">Loading user details...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col justify-center items-center h-full gap-4">
        <div className="bg-red-900/30 rounded-full p-4 border border-red-700/50">
          <svg className="w-12 h-12 text-red-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-white">User Not Found</h1>
        <p className="text-gray-400">The user you&apos;re looking for doesn&apos;t exist.</p>
        <button 
          onClick={() => router.push('/users')}
          className="mt-4 px-6 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-lg font-semibold transition-colors">
          Back to Users
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full text-white">
      {/* Header */}
      <div className="py-4 border-b-2 border-zinc-700 px-6">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => router.back()}
            className="text-gray-400 hover:text-white transition-colors">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
            </svg>
          </button>
          <div className="bg-blue-900/30 rounded-lg p-2 border border-blue-700/50">
            <svg className="w-6 h-6 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-bold">User Details</h1>
            <p className="text-xs text-gray-400">Manage user profile and permissions</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto scrollbar-dark">
        <section className="flex flex-col justify-start items-center gap-6 px-6 py-6">
          <div className="w-full max-w-4xl">
            {/* User Card */}
            <div className="bg-zinc-800 rounded-lg border-2 border-zinc-700 p-6 shadow-lg">
              {/* Header Section */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 pb-6 border-b border-zinc-700">
                <div className="flex items-center gap-4 mb-4 md:mb-0">
                  <div className="bg-gradient-to-br from-blue-900 to-blue-800 rounded-lg p-3 border border-blue-700/50 shadow-lg">
                    <svg className="w-8 h-8 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">{user.name}</h2>
                    <p className="text-xs text-gray-400">ID: {user._id}</p>
                  </div>
                </div>
                {!isEditing && (
                  <div className="flex gap-2">
                    <button 
                      onClick={() => setIsEditing(true)}
                      className="bg-blue-900 hover:bg-blue-800 text-white py-2 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 text-sm shadow-lg">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25z"/>
                      </svg>
                      Edit
                    </button>
                    <button 
                      onClick={() => setShowDeleteConfirm(true)}
                      className="bg-red-900 hover:bg-red-800 text-white py-2 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 text-sm shadow-lg">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-9l-1 1H5v2h14V4z"/>
                      </svg>
                      Delete
                    </button>
                  </div>
                )}
              </div>

              {/* User Information */}
              <div className="space-y-4 mb-6">
                {/* Name */}
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-2">Full Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editForm.name}
                      onChange={(e) => handleEditChange('name', e.target.value)}
                      className="w-full bg-zinc-700/50 text-white rounded-lg px-4 py-2 border border-zinc-600 hover:border-zinc-500 focus:border-blue-400 focus:outline-none transition-colors"
                    />
                  ) : (
                    <div className="bg-zinc-700/30 rounded-lg px-4 py-2 border border-zinc-600">
                      <p className="text-white font-semibold">{user.name}</p>
                    </div>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-2">Email Address</label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={editForm.email}
                      onChange={(e) => handleEditChange('email', e.target.value)}
                      className="w-full bg-zinc-700/50 text-white rounded-lg px-4 py-2 border border-zinc-600 hover:border-zinc-500 focus:border-blue-400 focus:outline-none transition-colors"
                    />
                  ) : (
                    <div className="bg-zinc-700/30 rounded-lg px-4 py-2 border border-zinc-600 flex items-center gap-2">
                      <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                      </svg>
                      <p className="text-white font-semibold">{user.email}</p>
                    </div>
                  )}
                </div>

                {/* Role */}
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-2">User Role</label>
                  {isEditing ? (
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleEditChange('isAdmin', false)}
                        className={`flex-1 py-2 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 border ${
                          !editForm.isAdmin
                            ? 'bg-blue-900 border-blue-700 text-white'
                            : 'bg-zinc-700/30 border-zinc-600 text-gray-300 hover:border-zinc-500'
                        }`}>
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                        </svg>
                        User
                      </button>
                      <button
                        onClick={() => handleEditChange('isAdmin', true)}
                        className={`flex-1 py-2 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 border ${
                          editForm.isAdmin
                            ? 'bg-purple-700 border-purple-600 text-white'
                            : 'bg-zinc-700/30 border-zinc-600 text-gray-300 hover:border-zinc-500'
                        }`}>
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
                        </svg>
                        Admin
                      </button>
                    </div>
                  ) : (
                    <div className={`flex items-center gap-3 rounded-lg px-4 py-2 border ${
                      user.isAdmin 
                        ? 'bg-purple-900/20 border-purple-600/50' 
                        : 'bg-blue-900/20 border-blue-600/50'
                    }`}>
                      <svg className={`w-4 h-4 flex-shrink-0 ${user.isAdmin ? 'text-purple-400' : 'text-blue-400'}`} fill="currentColor" viewBox="0 0 24 24">
                        {user.isAdmin ? (
                          <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
                        ) : (
                          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                        )}
                      </svg>
                      <span className={`font-semibold ${user.isAdmin ? 'text-purple-400' : 'text-blue-400'}`}>
                        {user.isAdmin ? 'Administrator' : 'Regular User'}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              {isEditing && (
                <div className="pt-4 border-t border-zinc-700 flex gap-2">
                  <button 
                    onClick={handleSaveEdit}
                    className="flex-1 bg-green-700 hover:bg-green-600 text-white py-2 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                    </svg>
                    Save Changes
                  </button>
                  <button 
                    onClick={() => setIsEditing(false)}
                    className="flex-1 bg-zinc-700 hover:bg-zinc-600 text-white py-2 rounded-lg font-semibold transition-colors">
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>

      {/* Dialogs */}
      <DeleteConfirmDialog 
        isOpen={showDeleteConfirm}
        userName={user.name}
        onConfirm={handleDeleteUser}
        onClose={() => setShowDeleteConfirm(false)}
      />

      <SuccessDialog 
        isOpen={isSuccessDialogOpen}
        onClose={() => setIsSuccessDialogOpen(false)}
        title={successTitle}
        message={successMessage}
      />
    </div>
  );
}
