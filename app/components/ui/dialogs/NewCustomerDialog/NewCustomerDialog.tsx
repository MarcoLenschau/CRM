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
      <div className="bg-zinc-800 rounded-lg border-2 border-zinc-700 p-8 max-w-lg w-full mx-4 shadow-2xl">
        {/* Header Icon */}
        <div className="flex justify-center mb-6">
          <div className="bg-green-900/30 rounded-full p-4 border border-green-700/50">
            <svg className="w-8 h-8 text-green-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-white text-center mb-2">Add New Customer</h2>
        <p className="text-gray-400 text-center text-sm mb-6">Fill in the customer details below</p>
        
        {/* Form */}
        <div className="space-y-4 mb-6">
          {/* Full Name */}
          <div className="flex flex-col gap-2">
            <label className="text-white text-sm font-semibold">Full Name</label>
            <div className="flex items-center gap-2 bg-zinc-700/50 border border-zinc-600 rounded-lg px-3 py-2 hover:border-zinc-500 transition-colors">
              <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
              </svg>
              <input 
                type="text"
                value={newCustomer.name}
                onChange={(e) => setNewCustomer({...newCustomer, name: e.target.value})}
                placeholder="John Doe"
                className="bg-transparent text-white text-sm flex-1 outline-none placeholder-gray-500" />
            </div>
          </div>

          {/* Email */}
          <div className="flex flex-col gap-2">
            <label className="text-white text-sm font-semibold">Email</label>
            <div className="flex items-center gap-2 bg-zinc-700/50 border border-zinc-600 rounded-lg px-3 py-2 hover:border-zinc-500 transition-colors">
              <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
              <input 
                type="email"
                value={newCustomer.email}
                onChange={(e) => setNewCustomer({...newCustomer, email: e.target.value})}
                placeholder="john@example.com"
                className="bg-transparent text-white text-sm flex-1 outline-none placeholder-gray-500" />
            </div>
          </div>

          {/* Company */}
          <div className="flex flex-col gap-2">
            <label className="text-white text-sm font-semibold">Company</label>
            <div className="flex items-center gap-2 bg-zinc-700/50 border border-zinc-600 rounded-lg px-3 py-2 hover:border-zinc-500 transition-colors">
              <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm4 8H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm10 12h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V9h2v2z"/>
              </svg>
              <input 
                type="text"
                value={newCustomer.company}
                onChange={(e) => setNewCustomer({...newCustomer, company: e.target.value})}
                placeholder="Company Name"
                className="bg-transparent text-white text-sm flex-1 outline-none placeholder-gray-500" />
            </div>
          </div>

          {/* Phone */}
          <div className="flex flex-col gap-2">
            <label className="text-white text-sm font-semibold">Phone</label>
            <div className="flex items-center gap-2 bg-zinc-700/50 border border-zinc-600 rounded-lg px-3 py-2 hover:border-zinc-500 transition-colors">
              <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
              </svg>
              <input 
                type="tel"
                value={newCustomer.phone}
                onChange={(e) => setNewCustomer({...newCustomer, phone: e.target.value})}
                placeholder="+49 123 456789"
                className="bg-transparent text-white text-sm flex-1 outline-none placeholder-gray-500" />
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <button 
            onClick={handleSave}
            className="flex-1 bg-green-700 hover:bg-green-800 text-white py-3 rounded-lg font-semibold text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z"/>
            </svg>
            Add Customer
          </button>
          <button 
            onClick={() => { setNewCustomer({ name: '', email: '', company: '', phone: '' }); onClose(); }}
            className="flex-1 bg-zinc-700 hover:bg-zinc-600 text-white py-3 rounded-lg font-semibold text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/>
            </svg>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
