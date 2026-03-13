'use client';

import { activity } from '@/app/db';

const ACTIVITY_ICONS = {
  call: '📞',
  email: '✉️',
  new_contact: '👤'
};

export default function ActivityFeedTemplate() {
  const sortedActivity = [...activity].sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime()).slice(0, 6);

  const getTimeAgo = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'just now';
    if (diffMins < 60) return `${diffMins}min ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString('en-US');
  };

  return (
    <div className="bg-zinc-800 rounded-lg border-2 border-zinc-500 p-6 w-full max-w-2xl">
      <h2 className="text-2xl font-bold text-white mb-4">Activity Feed</h2>
      
      {sortedActivity.length === 0 ? (
        <p className="text-gray-400">No activities</p>
      ) : (
        <div className="space-y-3 overflow-y-auto scrollbar-dark pr-4 max-h-96">
          {sortedActivity.map(act => (
            <div key={act.id} className="flex items-start gap-3 bg-zinc-700 hover:bg-zinc-600 p-3 rounded-lg transition-colors">
              <span className="text-xl mt-0.5">{ACTIVITY_ICONS[act.type as keyof typeof ACTIVITY_ICONS]}</span>
              <div className="flex-1">
                <p className="text-white text-sm font-medium">{act.action}</p>
                <p className="text-gray-400 text-xs">{getTimeAgo(act.timestamp)}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
