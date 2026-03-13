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
      <div className="bg-zinc-800 rounded-lg p-6 max-w-md w-full mx-4 border-2 border-zinc-500">
        <h2 className="text-2xl font-bold text-white mb-4">Select Contact</h2>
        
        <div className="space-y-3 mb-6 max-h-96 overflow-y-auto scrollbar-dark pr-4">
          {db.map(user => (
            <button
              key={user.id}
              onClick={() => onSelectUser(user.id)}
              className="w-full p-3 rounded-lg bg-zinc-700 hover:bg-zinc-600 text-white text-left transition-colors border border-zinc-600 cursor-pointer">
              <p className="font-semibold">{user.name}</p>
              <p className="text-sm text-gray-300">{user.email}</p>
            </button>
          ))}
        </div>

        <button 
          onClick={onClose}
          className="w-full bg-zinc-600 hover:bg-zinc-500 text-white py-2 rounded-lg font-semibold text-sm cursor-pointer">
          Cancel
        </button>
      </div>
    </div>
  );
}
