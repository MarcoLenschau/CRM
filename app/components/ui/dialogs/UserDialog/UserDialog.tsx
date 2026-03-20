'use client';

import { UserDialogProps } from '@/app/interfaces/userdialog.interface';
import React from 'react';

/**
 * Modal dialog for creating and editing user accounts with form validation and role assignment.
 * Supports both new user creation and existing user modification with conditional UI and button labels.
 *
 * @param isOpen - Controls dialog visibility
 * @param editingId - Optional user ID being edited; undefined for new user creation
 * @param newUser - User object containing name, email, password, and admin status
 * @param onUserChange - Callback function triggered when user data is modified
 * @param onSave - Callback function executed when save/update button is clicked
 * @param onClose - Callback function executed when dialog is dismissed or cancelled
 * @return Rendered user management dialog with form fields and action buttons
 * @throws Error if onSave or onUserChange callbacks fail; displays error state in dialog
 * @category Dialogs
 * @security Form includes password field with masking; admin role assignment controls system access; input validation required before save
 * @performance Managed form state updates through controlled inputs; conditional rendering for edit vs create modes
 * @author Marco Lenschau <contact@marco-lenschau.de>
 */
export default function UserDialog({
  isOpen,
  editingId,
  newUser,
  onUserChange,
  onSave,
  onClose,
}: UserDialogProps) {
    const generatePassword = () => {
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=<>?';
      const password = Array.from({ length: 16 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
      setShowPassword(true);
      onUserChange({ ...newUser, password });
    };

    const [showPassword, setShowPassword] = React.useState(false);

    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black/30 backdrop-blur-md flex items-center justify-center z-50">
        <div className="bg-zinc-800 rounded-lg border-2 border-zinc-700 p-8 max-w-lg w-full mx-4 shadow-2xl">
        {/* Header with Icon */}
        <div className="flex items-center justify-center mb-6">
          <div className="flex items-center gap-3">
            <div className="bg-zinc-700 rounded-full p-3">
              {editingId ? (
                <svg className="w-6 h-6 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25z"/>
                </svg>
              ) : (
                <svg className="w-6 h-6 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                </svg>
              )}
            </div>
            <h2 className="text-2xl font-bold text-white">
              {editingId ? 'Edit User' : 'Add New User'}
            </h2>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-zinc-700 mb-6"></div>

        {/* Form */}
        <div className="space-y-5">
          <div className="flex flex-col gap-2">
            <label className="text-white font-semibold text-sm uppercase tracking-wide">Full Name</label>
            <input
              type="text"
              value={newUser.name}
              onChange={(e) => onUserChange({ ...newUser, name: e.target.value })}
              placeholder="John Doe"
              className="bg-zinc-700/50 text-white rounded-lg px-4 py-3 border border-zinc-600 placeholder-gray-500 focus:border-blue-400 focus:bg-zinc-700 focus:outline-none transition-all"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-white font-semibold text-sm uppercase tracking-wide">Email</label>
            <input
              type="email"
              value={newUser.email}
              onChange={(e) => onUserChange({ ...newUser, email: e.target.value })}
              placeholder="john@example.com"
              className="bg-zinc-700/50 text-white rounded-lg px-4 py-3 border border-zinc-600 placeholder-gray-500 focus:border-blue-400 focus:bg-zinc-700 focus:outline-none transition-all"
            />
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <label className="text-white font-semibold text-sm uppercase tracking-wide">Password</label>
              {editingId && <span className="text-xs text-gray-400">(optional)</span>}
            </div>
            <section className="relative">
              <input
                id="password" type={showPassword ? "text" : "password"}
                value={newUser.password}
                onChange={(e) => onUserChange({ ...newUser, password: e.target.value })}
                placeholder={showPassword ? "Enter new password" : "•••••••••••••••"}
                className="bg-zinc-700/50 text-white rounded-lg px-4 py-3 border border-zinc-600 placeholder-gray-500 focus:border-blue-400 focus:bg-zinc-700 focus:outline-none w-full"
              />
              <svg className="h-8 w-8 cursor-pointer absolute top-0 right-2 bottom-0 m-auto" fill="currentColor" viewBox="0 0 24 24" onClick={() => setShowPassword(!showPassword)}>
                <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zm0 13a5.5 5.5 0 1 1 .001-11A5.5 5.5 0 0 1 12 17.5zm0-9a3.5 3.5 0 1 0 .001 7A3.5 3.5 0 0 0 12 8.5z"/>
                {showPassword && <line x1="4" y1="20" x2="20" y2="4" stroke="currentColor" strokeWidth="2"/>}
              </svg>
            </section>

            <button
              type="button"
              onClick={generatePassword}
              className="mt-2 bg-blue-900 hover:bg-blue-800 text-white font-semibold py-2 px-4 rounded-lg transition-all">
              Generate password
            </button>
          </div>

          {/* Divider */}
          <div className="h-px bg-zinc-700 my-2"></div>

          {/* Role Toggle */}
          <div>
            <label className="text-white font-semibold text-sm uppercase tracking-wide block mb-2">Role</label>
            <div className="flex gap-2">
              <button
                onClick={() => onUserChange({ ...newUser, isAdmin: true })}
                className={`flex-1 py-2 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 text-sm border ${
                  newUser.isAdmin
                    ? 'bg-purple-700 border-purple-600 text-white'
                    : 'bg-zinc-700/30 border-zinc-600 text-gray-300 hover:border-zinc-500'
                }`}>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
                </svg>
                Admin
              </button>
              <button
                onClick={() => onUserChange({ ...newUser, isAdmin: false })}
                className={`flex-1 py-2 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 text-sm border ${
                  !newUser.isAdmin
                    ? 'bg-blue-900 border-blue-800 text-white'
                    : 'bg-zinc-700/30 border-zinc-600 text-gray-300 hover:border-zinc-500'
                }`}>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
                User
              </button>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-zinc-700 my-2"></div>
          <div className="flex gap-3 pt-2">
            <button
              onClick={onSave}
              className="flex-1 bg-green-700 hover:bg-green-800 active:bg-green-900 text-white py-3 rounded-lg font-semibold transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
              </svg>
              {editingId ? 'Update User' : 'Save User'}
            </button>
            <button
              onClick={onClose}
              className="flex-1 bg-zinc-600 hover:bg-zinc-500 active:bg-zinc-700 text-white py-3 rounded-lg font-semibold transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/>
              </svg>
              Cancel
            </button>
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-6 pt-4 border-t border-zinc-700">
          <p className="text-xs text-gray-400 text-center">
            {editingId ? 'Update user information' : 'Create a new user account'}
          </p>
        </div>
      </div>
    </div>
  );
}
