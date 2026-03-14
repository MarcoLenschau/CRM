'use client';

import { useRouter } from 'next/navigation';

interface CustomerDetailHeaderProps {
  title: string;
  subtitle: string;
}

export default function CustomerDetailHeader({ title, subtitle }: CustomerDetailHeaderProps) {
  const router = useRouter();

  return (
    <div className="py-4 border-b-2 border-zinc-700">
      <div className="flex items-center gap-4 pl-75">
        <button 
          onClick={() => router.back()}
          className="text-gray-400 hover:text-white transition-colors">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
          </svg>
        </button>
        <div className="bg-orange-900/30 rounded-xl p-2 border border-orange-700/50">
          <svg className="w-6 h-6 text-orange-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"/>
          </svg>
        </div>
        <div>
          <h1 className="text-xl font-bold text-white">{title}</h1>
          <p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>
        </div>
      </div>
    </div>
  );
}
