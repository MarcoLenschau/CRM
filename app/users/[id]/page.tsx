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
}

export default function UserDetailPage() {
  const router = useRouter();
  const params = useParams();
  const userId = typeof params.id === 'string' ? params.id : '';

  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({ name: '', email: '', isAdmin: false });
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`/api/user/${userId}`);
        const data = await response.json();
        setUser(data);
        setEditForm({ name: data.name, email: data.email, isAdmin: data.isAdmin || false });
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setIsLoading(false);
      }
    };
    if (userId) {
      fetchUser();
    }
  }, [userId]);

  const handleSaveEdit = async () => {
    if (editForm.name.trim() && editForm.email.trim()) {
      // In a real app, you would make an API call to update
      setUser({ ...user!, ...editForm });
      setSuccessMessage('User information has been successfully updated.');
      setIsSuccessDialogOpen(true);
      setIsEditing(false);
    } else {
      alert('Please fill in all fields');
    }
  };

  const handleDeleteUser = async () => {
    setShowDeleteConfirm(false);
    // In a real app, you would make an API call to delete
    setSuccessMessage('User has been successfully deleted.');
    setIsSuccessDialogOpen(true);
    setTimeout(() => router.push('/users'), 1500);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
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
          className="mt-4 px-6 py-2 bg-red-700 hover:bg-red-800 text-white rounded-lg font-semibold transition-colors">
          Back to Users
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
          <div className="bg-blue-900/30 rounded-xl p-2 border border-blue-700/50">
            <svg className="w-6 h-6 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">User Details</h1>
            <p className="text-xs text-gray-400 mt-0.5">View and manage user information</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto scrollbar-dark">
        <section className="flex flex-col justify-start items-center gap-4 px-6 py-4">
          <div className="w-full max-w-4xl">
            {/* User Card */}
            <div className="bg-zinc-800 rounded-lg border-2 border-zinc-700 p-6 shadow-lg">
              {/* User Avatar Section */}
              <div className="flex flex-col items-center mb-6 pb-6 border-b border-zinc-700">
                <div className="bg-gradient-to-br from-blue-900 to-blue-800 rounded-full p-4 w-20 h-20 flex items-center justify-center shadow-lg mb-3">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-white">{user.name}</h2>
                <p className="text-gray-400 text-xs mt-1">User ID: #{user._id}</p>
              </div>

              {/* User Information */}
              <div className="space-y-4 mb-6">
                {/* Name */}
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Full Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editForm.name}
                      onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                      className="w-full bg-zinc-700/50 text-white rounded-lg px-3 py-2 border border-zinc-600 hover:border-zinc-500 focus:border-blue-400 focus:outline-none transition-colors text-sm"
                    />
                  ) : (
                    <div className="bg-zinc-700/30 rounded-lg px-3 py-2 border border-zinc-600">
                      <p className="text-white font-semibold text-sm">{user.name}</p>
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
                      className="w-full bg-zinc-700/50 text-white rounded-lg px-3 py-2 border border-zinc-600 hover:border-zinc-500 focus:border-blue-400 focus:outline-none transition-colors text-sm"
                    />
                  ) : (
                    <div className="bg-zinc-700/30 rounded-lg px-3 py-2 border border-zinc-600 flex items-center gap-2">
                      <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                      </svg>
                      <p className="text-white font-semibold text-sm">{user.email}</p>
                    </div>
                  )}
                </div>

                {/* Status Badge */}
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Status</label>
                  <div className="flex items-center gap-2 bg-green-900/20 border border-green-600/50 rounded-lg px-3 py-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-green-400 font-semibold text-sm">Active</span>
                  </div>
                </div>

                {/* Admin Role Toggle */}
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-2">Role</label>
                  {isEditing ? (
                    <div className="flex gap-2">
                      <button
                        onClick={() => setEditForm({ ...editForm, isAdmin: false })}
                        className={`flex-1 py-2 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 text-sm border ${
                          !editForm.isAdmin
                            ? 'bg-blue-900 border-blue-800 text-white'
                            : 'bg-zinc-700/30 border-zinc-600 text-gray-300 hover:border-zinc-500'
                        }`}>
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                        </svg>
                        User
                      </button>
                      <button
                        onClick={() => setEditForm({ ...editForm, isAdmin: true })}
                        className={`flex-1 py-2 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 text-sm border ${
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
                    <div className={`flex items-center gap-2 rounded-lg px-3 py-2 border ${
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
                      <span className={`font-semibold text-sm ${user.isAdmin ? 'text-purple-400' : 'text-blue-400'}`}>
                        {user.isAdmin ? 'Administrator' : 'User'}
                      </span>
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
                          setEditForm({ name: user.name, email: user.email, isAdmin: user.isAdmin || false });
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
                  <div className="bg-purple-900/30 rounded-full p-1.5 border border-purple-700/50">
                    <svg className="w-4 h-4 text-purple-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/>
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
                    <span className="text-white">2024</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Last Login:</span>
                    <span className="text-white">Today</span>
                  </div>
                </div>
              </div>

              {/* Contact Preferences */}
              <div className="bg-zinc-800 rounded-lg border-2 border-zinc-700 p-4">
                <div className="flex items-center gap-2 mb-3">
                  <div className="bg-orange-900/30 rounded-full p-1.5 border border-orange-700/50">
                    <svg className="w-4 h-4 text-orange-400" fill="currentColor" viewBox="0 0 24 24">
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
                    <span className="text-gray-300">Email notifications enabled</span>
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
        userName={user.name}
        onConfirm={handleDeleteUser}
        onClose={() => setShowDeleteConfirm(false)}
      />

      <SuccessDialog 
        isOpen={isSuccessDialogOpen}
        onClose={() => setIsSuccessDialogOpen(false)}
        title="Success!"
        message={successMessage}
        detailLabel="User"
        detailValue={user.name}
        buttonText="Done"
      />
    </div>
  );
}
