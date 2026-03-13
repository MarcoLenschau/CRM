'use client';

import { useState } from 'react';
import { db, activity } from '@/app/db';

interface NewCustomerDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NewCustomerDialog({ isOpen, onClose }: NewCustomerDialogProps) {
  const [newCustomer, setNewCustomer] = useState({
    name: '',
    email: '',
    company: '',
    phone: ''
  });

  const handleSave = () => {
    if (newCustomer.name.trim() && newCustomer.email.trim()) {
      const maxId = Math.max(...db.map(u => u.id), 0);
      const customer = {
        id: maxId + 1,
        name: newCustomer.name,
        email: newCustomer.email
      };
      db.push(customer);
      
      const newActivity = {
        id: Math.max(...activity.map(a => a.id)) + 1,
        type: 'new_contact' as const,
        userId: customer.id,
        action: `New customer added: ${newCustomer.name}`,
        timestamp: new Date()
      };
      activity.push(newActivity);
      
      alert(`✅ Customer ${newCustomer.name} added!`);
      setNewCustomer({ name: '', email: '', company: '', phone: '' });
      onClose();
    } else {
      alert('Please fill in name and email');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-md flex items-center justify-center z-50">
      <div className="bg-zinc-800 rounded-lg p-6 max-w-md w-full mx-4 border-2 border-zinc-500">
        <h2 className="text-2xl font-bold text-white mb-4">Add New Customer</h2>
        
        <div className="space-y-3 mb-6">
          <div className="flex flex-col gap-1">
            <label className="text-white text-sm font-semibold">Full Name *</label>
            <input 
              type="text"
              value={newCustomer.name}
              onChange={(e) => setNewCustomer({...newCustomer, name: e.target.value})}
              placeholder="John Doe"
              className="bg-zinc-700 text-white rounded-lg px-3 py-2 border border-zinc-600 text-sm" />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-white text-sm font-semibold">Email *</label>
            <input 
              type="email"
              value={newCustomer.email}
              onChange={(e) => setNewCustomer({...newCustomer, email: e.target.value})}
              placeholder="john@example.com"
              className="bg-zinc-700 text-white rounded-lg px-3 py-2 border border-zinc-600 text-sm" />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-white text-sm font-semibold">Company</label>
            <input 
              type="text"
              value={newCustomer.company}
              onChange={(e) => setNewCustomer({...newCustomer, company: e.target.value})}
              placeholder="Company Name"
              className="bg-zinc-700 text-white rounded-lg px-3 py-2 border border-zinc-600 text-sm" />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-white text-sm font-semibold">Phone</label>
            <input 
              type="tel"
              value={newCustomer.phone}
              onChange={(e) => setNewCustomer({...newCustomer, phone: e.target.value})}
              placeholder="+49 123 456789"
              className="bg-zinc-700 text-white rounded-lg px-3 py-2 border border-zinc-600 text-sm" />
          </div>
        </div>

        <div className="flex gap-2">
          <button 
            onClick={handleSave}
            className="flex-1 bg-green-700 hover:bg-green-800 text-white py-2 rounded-lg font-semibold text-sm cursor-pointer">
            Save
          </button>
          <button 
            onClick={() => { setNewCustomer({ name: '', email: '', company: '', phone: '' }); onClose(); }}
            className="flex-1 bg-zinc-600 hover:bg-zinc-500 text-white py-2 rounded-lg font-semibold text-sm cursor-pointer">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
