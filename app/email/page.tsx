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
    <div className="p-4 overflow-y-auto">
      <section className="flex flex-col justify-center items-center gap-4">
        {/* Header */}
        <div className="w-full max-w-6xl">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-purple-900/30 rounded-xl p-3 border border-purple-700/50">
              <svg className="w-8 h-8 text-purple-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white">Email Campaign</h1>
              <p className="text-sm text-gray-400 mt-1">Send personalized emails to your customers or use templates</p>
            </div>
          </div>
        </div>

        <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Compose Email Section */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-orange-900/30 rounded-full p-2 border border-orange-700/50">
                <svg className="w-5 h-5 text-orange-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-white">Compose Email</h2>
            </div>

            <div className="bg-zinc-800 rounded-lg border-2 border-zinc-700 p-6 shadow-lg">
              {sent && (
                <div className="mb-6 p-4 bg-green-600/20 border border-green-400 rounded-lg flex items-center gap-3 animate-pulse">
                  <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                  </svg>
                  <p className="text-green-400 font-semibold">Email sent successfully!</p>
                </div>
              )}

              <div className="space-y-4">
                {/* Recipient Select */}
                <div className="flex flex-col gap-2">
                  <label className="text-white text-sm font-semibold flex items-center gap-2">
                    <svg className="w-4 h-4 text-orange-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                    </svg>
                    Select Customer
                  </label>
                  <select 
                    value={formData.to} 
                    onChange={(e) => setFormData({ ...formData, to: e.target.value })}
                    className="bg-zinc-700/50 text-white rounded-lg px-3 py-2 border border-zinc-600 hover:border-zinc-500 focus:border-orange-400 focus:outline-none text-sm cursor-pointer transition-colors">
                    <option value="">Select customer...</option>
                    {db.map(customer => (
                      <option key={customer.id} value={customer.email}>
                        {customer.name} ({customer.email})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Manual Email */}
                <div className="flex flex-col gap-2">
                  <label className="text-white text-sm font-semibold flex items-center gap-2">
                    <svg className="w-4 h-4 text-orange-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                    </svg>
                    Or enter manually
                  </label>
                  <input 
                    type="email" 
                    value={formData.to} 
                    onChange={(e) => setFormData({ ...formData, to: e.target.value })} 
                    placeholder="name@example.com"
                    className="bg-zinc-700/50 text-white rounded-lg px-3 py-2 border border-zinc-600 hover:border-zinc-500 focus:border-orange-400 focus:outline-none text-sm transition-colors placeholder-gray-500"/>
                </div>

                {/* Subject */}
                <div className="flex flex-col gap-2">
                  <label className="text-white text-sm font-semibold flex items-center gap-2">
                    <svg className="w-4 h-4 text-orange-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M3 5h18v2H3V5m0 4h18v2H3V9m0 4h18v2H3v-2m0 4h18v2H3v-2z"/>
                    </svg>
                    Subject
                  </label>
                  <input 
                    type="text" 
                    value={formData.subject} 
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })} 
                    placeholder="Email subject..."
                    className="bg-zinc-700/50 text-white rounded-lg px-3 py-2 border border-zinc-600 hover:border-zinc-500 focus:border-orange-400 focus:outline-none text-sm transition-colors placeholder-gray-500"/>
                </div>

                {/* Message */}
                <div className="flex flex-col gap-2">
                  <label className="text-white text-sm font-semibold flex items-center gap-2">
                    <svg className="w-4 h-4 text-orange-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M3 5c0-1.1.9-2 2-2h14c1.1 0 2 .9 2 2v14c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2V5m19-1v18H2V4h20z"/>
                    </svg>
                    Message
                  </label>
                  <textarea 
                    value={formData.message} 
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })} 
                    placeholder="Write your message here..."
                    rows={9}
                    className="bg-zinc-700/50 text-white rounded-lg px-3 py-2 border border-zinc-600 hover:border-zinc-500 focus:border-orange-400 focus:outline-none resize-none text-sm transition-colors placeholder-gray-500"
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <button 
                    onClick={handleSendEmail}
                    className="flex-1 bg-green-700 hover:bg-green-800 text-white py-3 rounded-lg font-semibold cursor-pointer transition-colors flex items-center justify-center gap-2 shadow-lg">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18 10 11.41l4 4 6.3-6.29L22 12v-6z"/>
                    </svg>
                    Send Email
                  </button>
                  <button 
                    onClick={() => setFormData({ to: '', subject: '', message: '' })}
                    className="flex-1 bg-zinc-700 hover:bg-zinc-600 text-white py-3 rounded-lg font-semibold cursor-pointer transition-colors flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/>
                    </svg>
                    Clear
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Email Templates Section */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-purple-900/30 rounded-full p-2 border border-purple-700/50">
                <svg className="w-5 h-5 text-purple-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6z"/>
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-white">Email Templates</h2>
            </div>

            <div className="space-y-2 max-h-96 overflow-y-auto scrollbar-dark pr-2">
              {emailTemplates.map((template, idx) => (
                <button 
                  key={idx} 
                  onClick={() => setFormData({
                    ...formData,
                    subject: template.subject,
                    message: template.body
                  })}
                  className="w-full bg-zinc-700/50 hover:bg-zinc-600/70 border border-zinc-600 hover:border-purple-500/50 rounded-lg p-4 text-left cursor-pointer transition-all group">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-semibold text-sm group-hover:text-purple-400 transition-colors">{template.title}</p>
                      <p className="text-gray-400 text-xs mt-1 line-clamp-2 group-hover:text-gray-300 transition-colors">{template.subject}</p>
                    </div>
                    <svg className="w-5 h-5 text-gray-500 group-hover:text-purple-400 transition-colors flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z"/>
                    </svg>
                  </div>
                </button>
              ))}
            </div>

            {/* Info Box */}
            <div className="bg-zinc-800 rounded-lg border-2 border-zinc-600 p-3 mt-3">
              <h3 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
                <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                </svg>
                Tips
              </h3>
              <p className="text-xs text-gray-300 leading-relaxed">
                Click on a template to load it, then customize before sending. You can also select a customer directly or enter an email manually.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
