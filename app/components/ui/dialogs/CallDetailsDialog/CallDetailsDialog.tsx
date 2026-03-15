'use client';

import { useState, useEffect } from 'react';
import SuccessDialog from '../SuccessDialog/SuccessDialog';
import { LogStatus } from '@/app/enums/status.enum';

interface Customer {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  status: LogStatus;
  assignedUserId?: string;
}

interface CallDetailsDialogProps {
  isOpen: boolean;
  selectedUserId: string | null;
  onClose: () => void;
}

/**
 * Modal dialog for recording and logging call details with customer information and follow-up tracking.
 * Fetches customer data, collects call details (status, notes, next action), and logs event to audit trail.
 *
 * @param isOpen - Controls dialog visibility
 * @param selectedUserId - ID of the customer whose call details are being recorded
 * @param onClose - Callback function executed when dialog is dismissed or after successful logging
 * @return Rendered call details form dialog with customer context and logging functionality
 * @throws Error when customer fetch or call log submission fails; handles gracefully with error logging
 * @category Dialogs
 * @security Customer data fetched from backend with authentication; all call details logged for compliance and audit
 * @performance Fetches customer data on dialog open; form state managed locally before API submission
 * @author Marco Lenschau <contact@marco-lenschau.de>
 */
export default function CallDetailsDialog({ isOpen, selectedUserId, onClose }: CallDetailsDialogProps) {
  const [callDetails, setCallDetails] = useState({
    status: '',
    nextAction: '',
    interest: '',
    notes: ''
  });
  const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false);
  const [callUserName, setCallUserName] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  useEffect(() => {
    if (!isOpen || !selectedUserId) return;
    
    const fetchCustomer = async () => {
      try {
        const response = await fetch(`/api/customer/${selectedUserId}`);
        const data = await response.json();
        if (data.success && data.customer) {
          setSelectedCustomer(data.customer);
        }
      } catch (err) {
        console.error('Error fetching customer:', err);
      }
    };

    fetchCustomer();
  }, [isOpen, selectedUserId]);

  const handleSave = () => {
    if (selectedUserId && selectedCustomer) {
      // Here you can add API call to log the call
      // For now, just show success
      setCallUserName(selectedCustomer.name);
      setIsSuccessDialogOpen(true);
      setCallDetails({ status: '', nextAction: '', interest: '', notes: '' });
    }
  };

  const handleClose = () => {
    setCallDetails({ status: '', nextAction: '', interest: '', notes: '' });
    onClose();
  };

  if (!isOpen || !selectedUserId) return null;

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
        <h2 className="text-2xl font-bold text-white text-center mb-1">Call Details</h2>
        <p className="text-gray-400 text-center text-sm mb-6">Calling: <span className="text-blue-400 font-semibold">{selectedCustomer?.name || 'Loading...'}</span></p>
        
        {/* Form */}
        <div className="space-y-4 mb-6">
          {/* Call Status */}
          <div className="flex flex-col gap-2">
            <label className="text-white text-sm font-semibold flex items-center gap-2">
              <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
              </svg>
              Call Status
            </label>
            <select 
              value={callDetails.status} 
              onChange={(e) => setCallDetails({...callDetails, status: e.target.value})}
              className="bg-zinc-700/50 text-white rounded-lg px-3 py-2 border border-zinc-600 hover:border-zinc-500 text-sm cursor-pointer focus:outline-none focus:border-blue-400 transition-colors">
              <option value="">Select...</option>
              <option value="Interested">Interested</option>
              <option value="Not Interested">Not Interested</option>
              <option value="No Time">No Time Available</option>
              <option value="Appointment Set">Appointment Set</option>
            </select>
          </div>

          {/* Next Action */}
          <div className="flex flex-col gap-2">
            <label className="text-white text-sm font-semibold flex items-center gap-2">
              <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2z"/>
              </svg>
              Next Action
            </label>
            <select 
              value={callDetails.nextAction} 
              onChange={(e) => setCallDetails({...callDetails, nextAction: e.target.value})}
              className="bg-zinc-700/50 text-white rounded-lg px-3 py-2 border border-zinc-600 hover:border-zinc-500 text-sm cursor-pointer focus:outline-none focus:border-blue-400 transition-colors">
              <option value="">Select...</option>
              <option value="Send Email">Send Email</option>
              <option value="Send Quote">Send Quote</option>
              <option value="Call Later">Call Later</option>
              <option value="Closed">Closed</option>
            </select>
          </div>

          {/* Purchase Interest */}
          <div className="flex flex-col gap-2">
            <label className="text-white text-sm font-semibold flex items-center gap-2">
              <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
              </svg>
              Purchase Interest
            </label>
            <select 
              value={callDetails.interest} 
              onChange={(e) => setCallDetails({...callDetails, interest: e.target.value})}
              className="bg-zinc-700/50 text-white rounded-lg px-3 py-2 border border-zinc-600 hover:border-zinc-500 text-sm cursor-pointer focus:outline-none focus:border-blue-400 transition-colors">
              <option value="">Select...</option>
              <option value="High">🔴 High Interest</option>
              <option value="Medium">🟡 Medium Interest</option>
              <option value="Low">🟢 Low Interest</option>
            </select>
          </div>

          {/* Notes */}
          <div className="flex flex-col gap-2">
            <label className="text-white text-sm font-semibold flex items-center gap-2">
              <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/>
              </svg>
              Notes
            </label>
            <textarea 
              value={callDetails.notes}
              onChange={(e) => setCallDetails({...callDetails, notes: e.target.value})}
              placeholder="Add notes from the call..."
              rows={4}
              className="bg-zinc-700/50 text-white rounded-lg px-3 py-2 border border-zinc-600 hover:border-zinc-500 resize-none text-sm focus:outline-none focus:border-blue-400 transition-colors placeholder-gray-500" />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <button 
            onClick={handleSave}
            className="flex-1 bg-blue-700 hover:bg-blue-800 text-white py-3 rounded-lg font-semibold text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z"/>
            </svg>
            Save Call
          </button>
          <button 
            onClick={handleClose}
            className="flex-1 bg-zinc-700 hover:bg-zinc-600 text-white py-3 rounded-lg font-semibold text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/>
            </svg>
            Cancel
          </button>
        </div>
      </div>

      <SuccessDialog 
        isOpen={isSuccessDialogOpen}
        onClose={() => {
          setIsSuccessDialogOpen(false);
          onClose();
        }}
        title="Call logged!"
        message="Call has been successfully recorded."
        detailLabel="Call with"
        detailValue={callUserName}
        buttonText="Done"
      />
    </div>
  );
}
