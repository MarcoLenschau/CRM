'use client';

import { useState } from 'react';
import { db, emailTemplates } from '@/app/db';

export default function EmailPage() {
  const [formData, setFormData] = useState({
    to: '',
    subject: '',
    message: ''
  });
  const [sent, setSent] = useState(false);

  const handleSendEmail = () => {
    if (!formData.to.trim() || !formData.subject.trim() || !formData.message.trim()) {
      alert('Please fill in all fields');
      return;
    }

    // Simulate sending email
    console.log('Email sent:', formData);
    alert(`✅ Email sent to ${formData.to}`);
    
    setSent(true);
    setFormData({ to: '', subject: '', message: '' });
    
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <div className="p-6 min-h-screen bg-zinc-900 flex items-center justify-center">
      <div className="w-full max-w-6xl">
        <div className="grid grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold text-white mb-4 text-center">Compose Email</h2>
            <div className="bg-zinc-800 rounded-lg border-2 border-zinc-500 p-8">
              {sent && (
                <div className="mb-6 p-4 bg-green-600/20 border border-green-400 rounded-lg flex items-center gap-2">
                  <span className="text-green-400 text-xl">✓</span>
                  <p className="text-green-400">Email sent successfully!</p>
                </div>
              )}

              <div className="space-y-6">
                <div className="flex flex-col gap-2">
                  <label className="text-white text-sm font-semibold">To *</label>
                  <select value={formData.to} onChange={(e) => setFormData({ ...formData, to: e.target.value })}
                    className="bg-zinc-700 text-white rounded-lg px-3 py-2 border border-zinc-600 focus:border-blue-400 focus:outline-none text-sm cursor-pointer">
                    <option value="">Select customer...</option>
                    {db.map(customer => (
                      <option key={customer.id} value={customer.email}>
                        {customer.name} ({customer.email})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-white text-sm font-semibold">Or enter email manually</label>
                  <input type="email" value={formData.to} onChange={(e) => setFormData({ ...formData, to: e.target.value })} placeholder="name@example.com"
                    className="bg-zinc-700 text-white rounded-lg px-3 py-2 border border-zinc-600 focus:border-blue-400 focus:outline-none text-sm"/>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-white text-sm font-semibold">Subject *</label>
                  <input type="text" value={formData.subject} onChange={(e) => setFormData({ ...formData, subject: e.target.value })} placeholder="Email subject..."
                    className="bg-zinc-700 text-white rounded-lg px-3 py-2 border border-zinc-600 focus:border-blue-400 focus:outline-none text-sm"/>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-white text-sm font-semibold">Message *</label>
                  <textarea value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} 
                    placeholder="Write your message here..." rows={10}
                    className="bg-zinc-700 text-white rounded-lg px-3 py-2 border border-zinc-600 focus:border-blue-400 focus:outline-none resize-none text-sm"
                  />
                </div>


                <div className="flex gap-3 pt-4">
                  <button onClick={handleSendEmail} 
                  className="flex-1 bg-green-700 hover:bg-green-800 text-white py-3 rounded-lg font-semibold cursor-pointer">
                    Send Email
                  </button>
                  <button onClick={() => setFormData({ to: '', subject: '', message: '' })}
                    className="flex-1 bg-zinc-600 hover:bg-zinc-500 text-white py-3 rounded-lg font-semibold cursor-pointer">
                    Clear
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white mb-4 text-center">Email Templates</h2>
            <div className="grid grid-cols-1 gap-4">
              {emailTemplates.map((template, idx) => (
                <button key={idx} onClick={() => setFormData({
                    ...formData,
                    subject: template.subject,
                    message: template.body
                  })}
                  className="bg-zinc-700 hover:bg-zinc-600 border border-zinc-600 rounded-lg p-4 text-left cursor-pointer">
                  <p className="text-white font-semibold text-sm">{template.title}</p>
                  <p className="text-gray-400 text-xs mt-1 line-clamp-2">{template.subject}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
