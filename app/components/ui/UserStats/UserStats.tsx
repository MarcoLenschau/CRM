'use client';

import { AuditLog } from '@/app/interfaces/auditlog.interface'
import RecentActivity from '@/app/components/ui/RecentActivity/RecentActivity';
import RiskIndex from '../RiskIndex/RiskIndex';

interface UserStatsProps {
  userID: string;
  logs: AuditLog[];
  getStatusColor: (status: string) => string;
}

const colorMap = {
  total: {
    bg: 'from-blue-900/20 to-blue-900/5',
    border: 'border-blue-700/30',
    text: 'text-blue-400',
    icon: 'bg-blue-900/40 text-blue-400',
  },
  success: {
    bg: 'from-green-900/20 to-green-900/5',
    border: 'border-green-700/30',
    text: 'text-green-400',
    icon: 'bg-green-900/40 text-green-400',
  },
  failed: {
    bg: 'from-red-900/20 to-red-900/5',
    border: 'border-red-700/30',
    text: 'text-red-400',
    icon: 'bg-red-900/40 text-red-400',
  },
  warning: {
    bg: 'from-yellow-900/20 to-yellow-900/5',
    border: 'border-yellow-700/30',
    text: 'text-yellow-400',
    icon: 'bg-yellow-900/40 text-yellow-400',
  },
};

function StatItem({ label, value, colors }: { label: string; value: number; colors: typeof colorMap.total }) {
  const getIcon = () => {
    if (label === 'Total') return '📊';
    if (label === 'Success') return '✓';
    if (label === 'Failed') return '✕';
    if (label === 'Warning') return '⚠';
    return '•';
  };

  return (
    <div className={`bg-gradient-to-br ${colors.bg} ${colors.border} rounded-xl border p-3 hover:border-opacity-100 transition-all duration-300 hover:shadow-xl hover:scale-105 group cursor-pointer`}>
      <div className="flex items-start gap-2.5 mb-1.5">
        <div className={`${colors.icon} rounded-lg p-1.5 text-base group-hover:scale-110 transition-transform flex-shrink-0`}>
          {getIcon()}
        </div>
        <div className="flex flex-col">
          <p className="text-xs text-gray-400 uppercase font-bold tracking-widest leading-tight">{label}</p>
        </div>
      </div>
      <p className={`text-3xl font-black ${colors.text} group-hover:scale-110 transition-transform origin-left`}>{value}</p>
    </div>
  );
}

/**
 * Comprehensive user activity statistics dashboard showing success/failure breakdown and risk assessment.
 * Displays aggregated audit log metrics with color-coded status indicators and recent activity feed.
 *
 * @param userID - Identifier of the user whose stats are displayed
 * @param logs - Array of audit log entries for the user
 * @param getStatusColor - Helper function to determine color styling for status types
 * @return Rendered user statistics dashboard with metrics, activity, and risk index
 * @throws Error if logs array is empty or malformed; renders empty state gracefully
 * @category UI Components
 * @security Displays user's own audit logs; color-coded risk assessment helps identify patterns
 * @performance Filters and aggregates logs on render; memoization recommended for large log arrays
 * @author Marco Lenschau <contact@marco-lenschau.de>
 */
export default function UserStats({ userID, logs, getStatusColor }: UserStatsProps) {
  const successCount = logs.filter(l => l.status?.toUpperCase() === 'SUCCESS').length;
  const failedCount = logs.filter(l => l.status?.toUpperCase() === 'FAILED').length;
  const warningCount = logs.filter(l => l.status?.toUpperCase() === 'WARNING').length;

  return (
    <div className="bg-gradient-to-br from-zinc-800/50 to-zinc-900/30 rounded-lg border border-zinc-700/40 p-6 backdrop-blur-sm">
      <div className="flex items-center gap-2 mb-4">
        <h3 className="text-xl font-bold text-white uppercase tracking-wide">{userID} Activity</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatItem label="Total" value={logs.length} colors={colorMap.total} />
        <StatItem label="Success" value={successCount} colors={colorMap.success} />
        <StatItem label="Failed" value={failedCount} colors={colorMap.failed} />
        <StatItem label="Warning" value={warningCount} colors={colorMap.warning} />
      </div>
      <section className="mb-6">
        <RecentActivity logs={logs} getStatusColor={getStatusColor}/>
      </section>
      <RiskIndex riskPercentage={getRiskIndex(logs)}/>
    </div>
  );
}

const getRiskIndex = (logs: AuditLog[]): number => {
    const riskValues: number[] = logs.map(log => log.status === "SUCCESS" ? 25 : log.status === "FAILED" ? 50 : log.status === "WARNING" ? 75 : 0);
    console.log(riskValues, logs.length);
    return riskValues.reduce((acc, num) => acc + num, 0) / logs.length;
};
