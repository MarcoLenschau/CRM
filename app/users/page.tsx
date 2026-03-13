'use client';

import { useState } from 'react';
import { db } from '@/app/db';
import { User } from '@/app/interfaces/user.interface';
import UserDialog from '@/app/components/ui/dialogs/UserDialog/UserDialog';
import DeleteConfirmDialog from '@/app/components/ui/dialogs/DeleteConfirmDialog/DeleteConfirmDialog';
import SuccessDialog from '@/app/components/ui/dialogs/SuccessDialog/SuccessDialog';
import QuickTip from '@/app/components/ui/QuickTip/QuickTip';
import PageHeader from '../components/ui/PageHeader/PageHeader';
import SearchBar from '@/app/components/ui/SearchBar/SearchBar';
import Table from '@/app/components/ui/Table/Table';
import StatCard from '@/app/components/ui/StatCard/StatCard';

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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              label="Total Users"
              value={users.length}
              color="blue"
              icon={
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
              }
            />

            <StatCard
              label="Active"
              value={users.length}
              color="green"
              icon={
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
              }
            />

            <StatCard
              label="Search Results"
              value={filteredUsers.length}
              color="purple"
              icon={
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M15.5 1h-8C6.12 1 5 2.12 5 3.5v17C5 21.88 6.12 23 7.5 23h8c1.38 0 2.5-1.12 2.5-2.5v-17C18 2.12 16.88 1 15.5 1zm-4 21c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm4.5-4H7V4h9v14z"/>
                </svg>
              }
            />

            <StatCard
              label="Admins"
              value={users.filter(u => u.isAdmin).length}
              color="orange"
              icon={
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
                </svg>
              }
            />
          </div>

          {/* Search & Action Bar */}
          <SearchBar
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            placeholder="Search users by name or email..."
            focusColor="green"
          >
            <button
              onClick={() => setShowForm(!showForm)}
              className="bg-gradient-to-r from-green-700 to-green-800 hover:from-green-600 hover:to-green-700 text-white px-6 py-2.5 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 whitespace-nowrap shadow-lg hover:shadow-green-600/50"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
              </svg>
              Add User
            </button>
          </SearchBar>

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
              {/* Table */}
              <div className="w-full">
                <Table<User>
                  columns={[
                    'id',
                    'name',
                    'email',
                    {
                      key: 'isAdmin',
                      label: 'Role',
                      align: 'center',
                      render: (_, row) => (
                        row.isAdmin ? (
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
                        )
                      ),
                    },
                    {
                      key: 'id',
                      label: 'Actions',
                      align: 'center',
                      render: (_, row) => (
                        <div className="flex gap-2 justify-center">
                          <button
                            onClick={() => handleEditUser(row)}
                            className="bg-blue-900/40 hover:bg-blue-800/60 text-blue-300 hover:text-blue-200 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1 border border-blue-700/50 hover:border-blue-600"
                          >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25z"/>
                            </svg>
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteUser(row.id, row.name)}
                            className="bg-red-900/40 hover:bg-red-800/60 text-red-300 hover:text-red-200 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1 border border-red-700/50 hover:border-red-600"
                          >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-9l-1 1H5v2h14V4z"/>
                            </svg>
                            Delete
                          </button>
                        </div>
                      ),
                    },
                  ]}
                  data={filteredUsers}
                  emptyMessage="No users found"
                  emptyDescription={
                    searchTerm
                      ? 'Try adjusting your search criteria'
                      : 'No users to display'
                  }
                />
              </div>

              {/* Quick Tip Sidebar */}
              <div className="w-full lg:w-80">
                <QuickTip 
                  text="Use the search function to quickly find users by name or email. Click the Edit button to modify user information, or Delete to remove users from your system." 
                  width="w-full" 
                />
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
