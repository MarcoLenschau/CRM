'use client';

import { db } from '@/app/db';

interface SelectContactDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectUser: (userId: number) => void;
}

export default function SelectContactDialog({ isOpen, onClose, onSelectUser }: SelectContactDialogProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-md flex items-center justify-center z-50">
      <div className="bg-zinc-800 rounded-lg border-2 border-zinc-700 p-8 max-w-lg w-full mx-4 shadow-2xl">
        {/* Header Icon */}
        <div className="flex justify-center mb-6">
          <div className="bg-blue-900/30 rounded-full p-4 border border-blue-700/50">
            <svg className="w-8 h-8 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
            </svg>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-white text-center mb-2">Select Contact</h2>
        <p className="text-gray-400 text-center text-sm mb-6">Choose a contact to log a call</p>
        
        {/* Contacts List */}
        <div className="space-y-2 mb-6 max-h-96 overflow-y-auto scrollbar-dark">
          {db.map(user => (
            <button
              key={user.id}
              onClick={() => onSelectUser(user.id)}
              className="w-full p-4 rounded-lg bg-zinc-700/50 hover:bg-zinc-600/70 text-white text-left transition-all border border-zinc-600 hover:border-blue-500/50 cursor-pointer group">
              <div className="flex items-center gap-3">
                <div className="bg-blue-900/40 rounded-full p-2 group-hover:bg-blue-900/60 transition-colors">
                  <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-white truncate">{user.name}</p>
                  <p className="text-sm text-gray-400 truncate">{user.email}</p>
                </div>
                <svg className="w-5 h-5 text-gray-500 group-hover:text-blue-400 transition-colors flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z"/>
                </svg>
              </div>
            </button>
          ))}
        </div>

        {/* Cancel Button */}
        <button 
          onClick={onClose}
          className="w-full bg-zinc-700 hover:bg-zinc-600 text-white py-3 rounded-lg font-semibold text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/>
          </svg>
          Cancel
        </button>
      </div>
    </div>
  );
}
