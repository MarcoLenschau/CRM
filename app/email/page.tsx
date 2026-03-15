'use client';

import { useState } from 'react';
import { db, emailTemplates } from '@/app/db';
import SuccessDialog from '@/app/components/ui/dialogs/SuccessDialog/SuccessDialog';
import PageHeader from '../components/ui/PageHeader/PageHeader';
import QuickTip from '../components/ui/QuickTip/QuickTip';

/**
 * Renders email composition and sending interface with template support.
 * Allows composing and sending emails to customers with predefined templates.
 *
 * @return Email page component with form and template selection
 * @category Email
 * @security Protected route requiring authentication, form validation before sending
 * @performance Client-side rendering with form state management and real-time updates
 * @author Marco Lenschau <contact@marco-lenschau.de>
 */
export default function EmailPage() {
  const [formData, setFormData] = useState({
    to: '',
    subject: '',
    message: ''
  });
  const [isEmailSentDialogOpen, setIsEmailSentDialogOpen] = useState(false);
  const [sentToEmail, setSentToEmail] = useState('');

  const handleSendEmail = () => {
    if (!formData.to.trim() || !formData.subject.trim() || !formData.message.trim()) {
      alert('Please fill in all fields');
      return;
    }

    // Simulate sending email
    console.log('Email sent:', formData);
    
    setSentToEmail(formData.to);
    setIsEmailSentDialogOpen(true);
    setFormData({ to: '', subject: '', message: '' });
  };

  return (
    <div className="flex flex-col">
      <PageHeader h1="Email Campaign" h2="Send personalized emails to your customers or use templates" color="#22532b" img="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"></PageHeader>

      {/* Content - Scrollable */}
      <div className="flex-1 overflow-y-auto scrollbar-dark min-h-0">
        <section className="flex flex-col justify-start items-center gap-6 px-8 py-6">
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
                    {db.map((customer, index) => (
                      <option key={index} value={customer.email}>
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
                    rows={6}
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
            <section className="flex flex-col justify-between gap-4">
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
              <QuickTip text="Click on a template to load it, then customize before sending. You can also select a customer directly or enter an email manually."></QuickTip>
            </section>
          </div>
          </div>
        </section>
      </div>

      <SuccessDialog 
        isOpen={isEmailSentDialogOpen}
        onClose={() => setIsEmailSentDialogOpen(false)}
        title="Email sent!"
        message="Your email has been successfully sent."
        detailLabel="Recipient"
        detailValue={sentToEmail}
        buttonText="Done"
      />
    </div>
  );
}
