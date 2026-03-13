'use client';

import { useState } from 'react';
import { db, activity } from '@/app/db';

interface CallDetailsDialogProps {
  isOpen: boolean;
  selectedUserId: number | null;
  onClose: () => void;
}

export default function CallDetailsDialog({ isOpen, selectedUserId, onClose }: CallDetailsDialogProps) {
  const [callDetails, setCallDetails] = useState({
    status: '',
    nextAction: '',
    interest: '',
    notes: ''
  });

  const handleSave = () => {
    if (selectedUserId) {
      const user = db.find(u => u.id === selectedUserId);
      if (user) {
        const newActivity = {
          id: Math.max(...activity.map(a => a.id), 0) + 1,
          type: 'call' as const,
          userId: selectedUserId,
          action: `Call with ${user.name} - Status: ${callDetails.status}`,
          timestamp: new Date()
        };
        activity.push(newActivity);
        alert(`✅ Call with ${user.name} logged!`);
        setCallDetails({ status: '', nextAction: '', interest: '', notes: '' });
        onClose();
      }
    }
  };

  const handleClose = () => {
    setCallDetails({ status: '', nextAction: '', interest: '', notes: '' });
    onClose();
  };

  if (!isOpen || !selectedUserId) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-md flex items-center justify-center z-50">
      <div className="bg-zinc-800 rounded-lg p-6 max-w-md w-full mx-4 border-2 border-zinc-500">
        <h2 className="text-2xl font-bold text-white mb-4">Call Details</h2>
        
        <div className="space-y-4 mb-6">
          <div className="flex flex-col gap-2">
            <label className="text-white text-sm font-semibold">Call Status</label>
            <select 
              value={callDetails.status} 
              onChange={(e) => setCallDetails({...callDetails, status: e.target.value})}
              className="bg-zinc-700 text-white rounded-lg px-3 py-2 border border-zinc-600 text-sm cursor-pointer">
              <option value="">Select...</option>
              <option value="Interested">Interested</option>
              <option value="Not Interested">Not Interested</option>
              <option value="No Time">No Time Available</option>
              <option value="Appointment Set">Appointment Set</option>
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-white text-sm font-semibold">Next Action</label>
            <select 
              value={callDetails.nextAction} 
              onChange={(e) => setCallDetails({...callDetails, nextAction: e.target.value})}
              className="bg-zinc-700 text-white rounded-lg px-3 py-2 border border-zinc-600 text-sm cursor-pointer">
              <option value="">Select...</option>
              <option value="Send Email">Send Email</option>
              <option value="Send Quote">Send Quote</option>
              <option value="Call Later">Call Later</option>
              <option value="Closed">Closed</option>
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-white text-sm font-semibold">Purchase Interest</label>
            <select 
              value={callDetails.interest} 
              onChange={(e) => setCallDetails({...callDetails, interest: e.target.value})}
              className="bg-zinc-700 text-white rounded-lg px-3 py-2 border border-zinc-600 text-sm cursor-pointer">
              <option value="">Select...</option>
              <option value="High">🔴 High</option>
              <option value="Medium">🟡 Medium</option>
              <option value="Low">🟢 Low</option>
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-white text-sm font-semibold">Notes</label>
            <textarea 
              value={callDetails.notes}
              onChange={(e) => setCallDetails({...callDetails, notes: e.target.value})}
              placeholder="Notes from the call..."
              rows={3}
              className="bg-zinc-700 text-white rounded-lg px-3 py-2 border border-zinc-600 resize-none text-sm" />
          </div>
        </div>

        <div className="flex gap-2">
          <button 
            onClick={handleSave}
            className="flex-1 bg-green-700 hover:bg-green-800 text-white py-2 rounded-lg font-semibold text-sm cursor-pointer">
            Save
          </button>
          <button 
            onClick={handleClose}
            className="flex-1 bg-zinc-600 hover:bg-zinc-500 text-white py-2 rounded-lg font-semibold text-sm cursor-pointer">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
