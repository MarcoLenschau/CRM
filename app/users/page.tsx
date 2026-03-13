'use client';

import { useState } from 'react';
import { db } from '@/app/db';
import UserDialog from '@/app/components/ui/dialogs/UserDialog/UserDialog';
import DeleteConfirmDialog from '@/app/components/ui/dialogs/DeleteConfirmDialog/DeleteConfirmDialog';
import SuccessDialog from '@/app/components/ui/dialogs/SuccessDialog/SuccessDialog';
import QuickTip from '@/app/components/ui/QuickTip/QuickTip';
import PageHeader from '../components/ui/PageHeader/PageHeader';

export default function UsersPage() {
  const [users, setUsers] = useState(db);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [newUser, setNewUser] = useState({ name: '', email: '', isAdmin: false });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [deleteUserId, setDeleteUserId] = useState<number | null>(null);
  const [deleteUserName, setDeleteUserName] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [successDetail, setSuccessDetail] = useState('');
  const [successTitle, setSuccessTitle] = useState('User added!');

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddUser = () => {
    if (newUser.name.trim() && newUser.email.trim()) {
      if (editingId !== null) {
        // Edit existing user
        setUsers(users.map(u => u.id === editingId ? { ...u, name: newUser.name, email: newUser.email, isAdmin: newUser.isAdmin || false } : u));
        setSuccessTitle('User updated!');
        setSuccessMessage('User has been successfully updated.');
        setSuccessDetail(newUser.name);
        setIsSuccessDialogOpen(true);
        setEditingId(null);
      } else {
        // Add new user
        const maxId = Math.max(...users.map(u => u.id), 0);
        const user = {
          id: maxId + 1,
          name: newUser.name,
          email: newUser.email,
          isAdmin: newUser.isAdmin || false
        };
        setUsers([...users, user]);
        setSuccessTitle('User added!');
        setSuccessMessage('New user has been successfully added.');
        setSuccessDetail(newUser.name);
        setIsSuccessDialogOpen(true);
      }
      setNewUser({ name: '', email: '', isAdmin: false });
      setShowForm(false);
    } else {
      alert('⚠️ Please fill in all fields');
    }
  };

  const handleDeleteUser = (id: number, name: string) => {
    setDeleteUserId(id);
    setDeleteUserName(name);
    setShowDeleteConfirm(true);
  };

  const handleConfirmDelete = () => {
    if (deleteUserId) {
      setUsers(users.filter(u => u.id !== deleteUserId));
      setShowDeleteConfirm(false);
      setSuccessTitle('User deleted!');
      setSuccessMessage('User has been successfully deleted.');
      setSuccessDetail(deleteUserName);
      setIsSuccessDialogOpen(true);
      setDeleteUserId(null);
      setDeleteUserName('');
    }
  };

  const handleEditUser = (user: { id: number; name: string; email: string; isAdmin?: boolean }) => {
    setNewUser({ name: user.name, email: user.email, isAdmin: user.isAdmin || false });
    setEditingId(user.id);
    setShowForm(true);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingId(null);
    setNewUser({ name: '', email: '', isAdmin: false });
  };

  return (
    <div className="flex flex-col">
      <PageHeader h1="User Management" h2="Manage all your CRM users and their information" color="#4e1f23" img="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></PageHeader>

      {/* Content - Scrollable */}
      <div className="flex-1 overflow-y-auto scrollbar-dark min-h-0">
        <section className="flex flex-col justify-start items-center gap-6 px-8 py-6">
          <div className="w-full max-w-5xl space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-lg border-2 border-blue-600/30 p-4 hover:border-blue-600/60 transition-colors">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-blue-900/40 rounded-lg p-2">
                  <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                </div>
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Total Users</span>
              </div>
              <p className="text-3xl font-bold text-blue-400">{users.length}</p>
            </div>

            <div className="bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-lg border-2 border-green-600/30 p-4 hover:border-green-600/60 transition-colors">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-green-900/40 rounded-lg p-2">
                  <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                  </svg>
                </div>
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Active</span>
              </div>
              <p className="text-3xl font-bold text-green-400">{users.length}</p>
            </div>

            <div className="bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-lg border-2 border-purple-600/30 p-4 hover:border-purple-600/60 transition-colors">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-purple-900/40 rounded-lg p-2">
                  <svg className="w-5 h-5 text-purple-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M15.5 1h-8C6.12 1 5 2.12 5 3.5v17C5 21.88 6.12 23 7.5 23h8c1.38 0 2.5-1.12 2.5-2.5v-17C18 2.12 16.88 1 15.5 1zm-4 21c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm4.5-4H7V4h9v14z"/>
                  </svg>
                </div>
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Search Results</span>
              </div>
              <p className="text-3xl font-bold text-purple-400">{filteredUsers.length}</p>
            </div>
          </div>

          {/* Search & Action Bar */}
          <div className="bg-gradient-to-r from-zinc-800 to-zinc-900 rounded-lg border-2 border-zinc-700 p-4 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
            <div className="flex-1">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="🔍 Search users by name or email..."
                className="w-full bg-zinc-700/50 text-white rounded-lg px-4 py-2.5 border border-zinc-600 placeholder-gray-500 focus:border-green-500 focus:outline-none transition-colors"
              />
            </div>
            <button
              onClick={() => setShowForm(!showForm)}
              className="bg-gradient-to-r from-green-700 to-green-800 hover:from-green-600 hover:to-green-700 text-white px-6 py-2.5 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 whitespace-nowrap shadow-lg hover:shadow-green-600/50"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
              </svg>
              Add User
            </button>
          </div>

          {/* Add/Edit User Dialog */}
          <UserDialog
            isOpen={showForm}
            editingId={editingId}
            newUser={newUser}
            onUserChange={(user) => setNewUser({ name: user.name, email: user.email, isAdmin: user.isAdmin || false })}
            onSave={handleAddUser}
            onCancel={handleCancelForm}
          />

          {/* Delete Confirmation Dialog */}
          <DeleteConfirmDialog
            isOpen={showDeleteConfirm}
            userName={deleteUserName}
            onConfirm={handleConfirmDelete}
            onCancel={() => {
              setShowDeleteConfirm(false);
              setDeleteUserId(null);
              setDeleteUserName('');
            }}
          />

          {/* Users Table & Quick Tip */}
          <div className="flex flex-col lg:flex-row gap-6 w-full">
            {/* Table - Main Section */}
            <div className="w-full">
              <div className="bg-gradient-to-b from-zinc-800 to-zinc-900 rounded-lg border-2 border-zinc-700 overflow-hidden shadow-lg">
                {filteredUsers.length > 0 ? (
                  <>
                    <div className="overflow-x-auto">
                      <table className="w-full min-w-full">
                        <thead>
                          <tr className="bg-gradient-to-r from-zinc-700 to-zinc-800 border-b-2 border-zinc-600">
                            <th className="px-6 py-4 text-left text-gray-300 font-semibold text-sm uppercase tracking-wide">ID</th>
                            <th className="px-6 py-4 text-left text-gray-300 font-semibold text-sm uppercase tracking-wide">Name</th>
                            <th className="px-6 py-4 text-left text-gray-300 font-semibold text-sm uppercase tracking-wide">Email</th>
                            <th className="px-6 py-4 text-center text-gray-300 font-semibold text-sm uppercase tracking-wide">Role</th>
                            <th className="px-6 py-4 text-center text-gray-300 font-semibold text-sm uppercase tracking-wide">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredUsers.map((user, index) => (
                            <tr 
                              key={user.id} 
                              className={`${index % 2 === 0 ? 'bg-zinc-800/50' : 'bg-zinc-900/30'} border-b border-zinc-700/50 hover:bg-zinc-700/50 transition-colors duration-200`}
                            >
                              <td className="px-6 py-4 text-gray-400 font-mono text-sm">{user.id}</td>
                              <a href={`/users/${user.id - 1}`}><td className="px-6 py-4 text-white font-semibold hover:underline">{user.name}</td></a>
                              <td className="px-6 py-4 text-gray-300 text-sm">{user.email}</td>
                              <td className="px-6 py-4 text-center">
                                {user.isAdmin ? (
                                  <span className="inline-flex items-center gap-1 bg-purple-900/30 border border-purple-700/50 text-purple-300 px-3 py-1 rounded-full text-xs font-semibold">
                                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                                      <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
                                    </svg>
                                    Admin
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center gap-1 bg-blue-900/30 border border-blue-700/50 text-blue-300 px-3 py-1 rounded-full text-xs font-semibold">
                                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                                    </svg>
                                    User
                                  </span>
                                )}
                              </td>
                              <td className="px-6 py-4 text-center">
                                <div className="flex gap-2 justify-center">
                                  <button
                                    onClick={() => handleEditUser(user)}
                                    className="bg-blue-900/40 hover:bg-blue-800/60 text-blue-300 hover:text-blue-200 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1 border border-blue-700/50 hover:border-blue-600"
                                  >
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                      <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25z"/>
                                    </svg>
                                    Edit
                                  </button>
                                  <button
                                    onClick={() => handleDeleteUser(user.id, user.name)}
                                    className="bg-red-900/40 hover:bg-red-800/60 text-red-300 hover:text-red-200 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1 border border-red-700/50 hover:border-red-600"
                                  >
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                      <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-9l-1 1H5v2h14V4z"/>
                                    </svg>
                                    Delete
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Summary Footer */}
                    <div className="bg-gradient-to-r from-zinc-700/50 to-zinc-800/50 px-6 py-4 border-t-2 border-zinc-700 flex justify-between items-center">
                      <p className="text-gray-400 text-sm">
                        Showing <span className="font-semibold text-green-400">{filteredUsers.length}</span> of <span className="font-semibold text-white">{users.length}</span> users
                      </p>
                      {searchTerm && (
                        <button
                          onClick={() => setSearchTerm('')}
                          className="text-blue-400 hover:text-blue-300 text-sm font-semibold transition-colors"
                        >
                          ✕ Clear search
                        </button>
                      )}
                    </div>
                  </>
                ) : (
                  <div className="px-6 py-16 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-800/50 mb-4">
                      <svg className="w-8 h-8 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                      </svg>
                    </div>
                    <p className="text-gray-300 text-lg font-semibold mb-2">No users found</p>
                    <p className="text-gray-500 text-sm mb-6">
                      {searchTerm ? 'Try adjusting your search criteria' : 'Add your first user to get started'}
                    </p>
                    <button
                      onClick={() => {
                        setSearchTerm('');
                        setShowForm(true);
                      }}
                      className="bg-gradient-to-r from-green-700 to-green-800 hover:from-green-600 hover:to-green-700 text-white px-6 py-2.5 rounded-lg font-semibold text-sm transition-all shadow-lg hover:shadow-green-600/50"
                    >
                      + Add User
                    </button>
                  </div>
                )}
              </div>
            </div>
            {/* Quick Tip - Sidebar */}
            <div className="w-full lg:w-80">
              <QuickTip text="Use the search function to quickly find users by name or email. Click the Edit button to modify user information, or Delete to remove users from your system." width="w-full" />
            </div>
          </div>
          
          </div>
        </section>
      </div>

      <SuccessDialog 
        isOpen={isSuccessDialogOpen}
        onClose={() => setIsSuccessDialogOpen(false)}
        title={successTitle}
        message={successMessage}
        detailLabel="Username"
        detailValue={successDetail}
        buttonText="Done"
      />
    </div>
  );
}
