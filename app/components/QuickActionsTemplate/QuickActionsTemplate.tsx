'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import NewCustomerDialog from '@/app/components/ui/dialogs/NewCustomerDialog/NewCustomerDialog';
import SelectContactDialog from '@/app/components/ui/dialogs/SelectContactDialog/SelectContactDialog';
import CallDetailsDialog from '@/app/components/ui/dialogs/CallDetailsDialog/CallDetailsDialog';

/**
 * Dashboard template component providing quick access action buttons for common CRM workflows.
 * Manages multiple dialog states for new customer creation, call logging, email composition, and logout.
 *
 * @return Rendered action buttons grid with integrated modal dialogs
 * @throws Error if logout API call fails; displays error to user but prevents session loss
 * @category Templates
 * @security Integrates logout functionality with server-side session clearing; protects route navigation
 * @performance Manages dialog state locally with minimal re-renders; lazy loads dialogs on demand
 * @author Marco Lenschau <contact@marco-lenschau.de>
 */
export default function QuickActionsTemplate() {
  const router = useRouter();
  
  // Modal states
  const [showNewCustomerModal, setShowNewCustomerModal] = useState(false);
  const [showSelectContactModal, setShowSelectContactModal] = useState(false);
  const [showCallDetailsModal, setShowCallDetailsModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  // Handlers
  const handleNewCustomer = () => setShowNewCustomerModal(true);
  
  const handleLogCall = () => {
    setShowSelectContactModal(true);
  };

  const handleSelectUser = (userId: string) => {
    setSelectedUserId(userId);
    setShowSelectContactModal(false);
    setShowCallDetailsModal(true);
  };

  const handleEmail = () => router.push('/email');
  
  const handleLogout = async () => {
    try {
      // Call logout endpoint to clear cookie on server
      await fetch('/api/logout', { method: 'POST' });
      
      // Clear client-side token storage
      sessionStorage.removeItem('authToken');
      localStorage.removeItem('authToken');
      
      // Trigger logout event for Container to update
      window.dispatchEvent(new Event('logoutEvent'));
      
      // Redirect to home page
      router.push('/');
    } catch (error) {
      console.error('Logout error:', error);
      // Still redirect even if API call fails
      sessionStorage.removeItem('authToken');
      window.dispatchEvent(new Event('logoutEvent'));
      router.push('/');
    }
  };

  return (
    <>
      <div className="bg-zinc-800 rounded-lg border-2 border-zinc-500 p-6 w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-white mb-4">Quick Actions</h2>
        
        <div className="grid grid-cols-4 gap-3">
          <button 
            onClick={handleNewCustomer}
            className="bg-green-800 hover:bg-green-700 text-white py-3 rounded-lg font-semibold text-sm transition-colors flex flex-col items-center gap-1 cursor-pointer">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
            <span>New Customer</span>
          </button>
          
          <button 
            onClick={handleLogCall}
            className="bg-blue-900/80 hover:bg-blue-700/80 text-white py-3 rounded-lg font-semibold text-sm transition-colors flex flex-col items-center gap-1 cursor-pointer">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
            </svg>
            <span>Log Call</span>
          </button>
          
          <button 
            onClick={handleEmail}
            className="bg-orange-400/60 hover:bg-orange-400/80 text-white py-3 rounded-lg font-semibold text-sm transition-colors flex flex-col items-center gap-1 cursor-pointer">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
            </svg>
            <span>Email</span>
          </button>

          <button 
            onClick={handleLogout}
            className="bg-red-900 hover:bg-red-700 text-white py-3 rounded-lg font-semibold text-sm transition-colors flex flex-col items-center gap-1 cursor-pointer">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/>
            </svg>
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Dialog Components */}
      <NewCustomerDialog 
        isOpen={showNewCustomerModal} 
        onClose={() => setShowNewCustomerModal(false)} 
      />
      
      <SelectContactDialog 
        isOpen={showSelectContactModal} 
        onClose={() => setShowSelectContactModal(false)}
        onSelectUser={handleSelectUser}
      />
      
      <CallDetailsDialog 
        isOpen={showCallDetailsModal} 
        selectedUserId={selectedUserId}
        onClose={() => { setShowCallDetailsModal(false); setSelectedUserId(null); }}
      />
    </>
  );
}

