import { AuditLog } from '@/app/interfaces/auditlog.interface';

const getActivityIcon = (entity: string): string => {
  const iconMap: Record<string, string> = {
    call: '📞',
    email: '✉️',
    contact: '👤',
    customer: '🏢',
    log: '📋',
    user: '👨‍💼',
    default: '📝'
  };
  
  return iconMap[entity.toLowerCase()] || iconMap['default'];
};

export default async function ActivityFeedTemplate() {
  let sortedActivity: AuditLog[] = [];
  
  try {
    const response = await fetch(`${process.env.API_URL}/log`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
    });
    
    if (response.ok) {
      const data = await response.json();
      sortedActivity = Array.isArray(data) ? data : (data.data || data.logs || []);
      console.log('Activity data loaded:', sortedActivity.length, 'items');
    } else {
      console.error('API Error:', response.status);
    }
  } catch (error) {
    console.error('Fetch error:', error);
  }

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
    return date.toLocaleDateString('de-DE');
  };

  return (
    <div className="bg-zinc-800 rounded-lg border-2 border-zinc-500 p-6 w-full max-w-2xl">
      <h2 className="text-2xl font-bold text-white mb-4">Activity Feed</h2>
      
      {sortedActivity.length === 0 ? (
        <p className="text-gray-400">No activities</p>
      ) : (
        <div className="space-y-3 overflow-y-auto scrollbar-dark pr-4 max-h-96">
          {sortedActivity.map(act => (
            <div key={act._id} className="flex items-start gap-3 bg-zinc-700 hover:bg-zinc-600 p-3 rounded-lg transition-colors">
              <span className="text-xl mt-0.5">{getActivityIcon(act.entity)}</span>
              <div className="flex-1">
                <p className="text-white text-sm font-medium">{act.description}</p>
                <p className="text-gray-400 text-xs">{getTimeAgo(new Date(act.createdAt || new Date()))}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
