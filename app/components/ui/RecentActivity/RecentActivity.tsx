'use client';

import { AuditLog } from '@/app/interfaces/auditlog.interface';

interface RecentActivityProps {
  logs: AuditLog[];
  getStatusColor: (status: string) => string;
}

/**
 * Activity list component displaying recent audit log entries with action type and status color coding.
 * Shows chronological log entries with visual indicators for different operation types (CREATE, UPDATE, DELETE, READ).
 *
 * @param logs - Array of audit log entries to display
 * @param getStatusColor - Helper function returning CSS color classes for status values
 * @return Rendered activity list with color-coded log entries
 * @throws Error if logs array is invalid; renders empty state
 * @category UI Components
 * @security Displays audit logs with action descriptions; useful for compliance and monitoring
 * @performance Renders log list efficiently with CSS-based color coding
 * @author Marco Lenschau <contact@marco-lenschau.de>
 */
export default function RecentActivity({ logs, getStatusColor }: RecentActivityProps) {
  /**
   * Maps action type to consistent text color class.
   * Currently returns gray-200 for all actions; can be extended for action-specific colors.
   *
   * @param action - Action type string to get text color for
   * @return Tailwind CSS text color class string
   * @category UI Components
   */
  const getActionTextColor = (action: string) => {
    const a = action?.toUpperCase() || '';
    if (a === 'CREATE') return 'text-gray-200';
    if (a === 'UPDATE') return 'text-gray-200';
    if (a === 'DELETE') return 'text-gray-200';
    if (a === 'READ') return 'text-gray-200';
    return 'text-gray-200';
  };

  return (
    <div className="rounded-xl border border-zinc-600 p-5 backdrop-blur-sm">
      <h4 className="text-sm font-bold text-gray-100 mb-4 uppercase tracking-widest flex items-center gap-2">
        Recent Activity
      </h4>
      <div className="space-y-2.5 max-h-56 overflow-y-auto scrollbar-dark">
        {logs.slice(0, 8).map((log, idx) => (
          <div 
            key={log._id} 
            className="rounded-lg border border-zinc-600 p-3.5 hover:border-gray-600/60 hover:shadow-md transition-all duration-300 hover:-translate-y-0.5">
            <div className="flex justify-between items-start gap-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`text-xs font-bold uppercase tracking-wider ${getActionTextColor(log.action)}`}>
                    {log.action}
                  </span>
                  <span className="text-xs text-gray-500">•</span>
                  <span className="text-xs text-gray-400">{log.entity}</span>
                </div>
                {log.description && (
                  <p className="text-xs text-gray-400 leading-relaxed">{log.description.substring(0, 50)}...</p>
                )}
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(log.status)} uppercase whitespace-nowrap ml-2`}>
                {log.status}
              </span>
            </div>
            <div className="mt-2 text-xs text-gray-500 flex items-center gap-1">
              <span>#{idx + 1}</span>
            </div>
          </div>
        ))}
        {logs.length === 0 && (
          <p className="text-center text-gray-500 text-xs py-6 italic">No recent activity</p>
        )}
      </div>
    </div>
  );
}
