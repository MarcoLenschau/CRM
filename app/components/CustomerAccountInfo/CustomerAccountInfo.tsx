'use client';

import { Customer } from '@/app/interfaces/customer.interface';

interface CustomerAccountInfoProps {
  customer: Customer;
}

export default function CustomerAccountInfo({ customer }: CustomerAccountInfoProps) {
  return (
    <div className="bg-zinc-800 rounded-lg border border-zinc-500 p-4">
      <div className="flex items-center gap-2 mb-3">
        <div className="bg-orange-900/30 rounded-full p-1.5 border border-orange-700/50">
          <svg className="w-4 h-4 text-orange-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11z"/>
          </svg>
        </div>
        <h3 className="text-sm font-bold text-white">Account Information</h3>
      </div>
      <div className="space-y-2 text-xs">
        <div className="flex justify-between">
          <span className="text-gray-400">Account Status:</span>
          <span className="text-green-400 font-semibold">Active</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Member Since:</span>
          <span className="text-white">{customer.createdAt ? new Date(customer.createdAt).toLocaleDateString('de-DE') : 'Unknown'}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Last Updated:</span>
          <span className="text-white">Today</span>
        </div>
      </div>
    </div>
  );
}
