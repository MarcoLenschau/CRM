'use client';

interface UserDialogProps {
  isOpen: boolean;
  editingId: number | null;
  newUser: { name: string; email: string };
  onUserChange: (user: { name: string; email: string }) => void;
  onSave: () => void;
  onCancel: () => void;
}

export default function UserDialog({
  isOpen,
  editingId,
  newUser,
  onUserChange,
  onSave,
  onCancel,
}: UserDialogProps) {
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

          {/* Divider */}
          <div className="h-px bg-zinc-700 my-2"></div>

          {/* Buttons */}
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
              onClick={onCancel}
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
