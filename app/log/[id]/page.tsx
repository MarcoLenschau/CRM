'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { AuditLog } from '@/app/interfaces/auditlog.interface';
import PageHeader from '@/app/components/ui/PageHeader/PageHeader';
import LogDetailsComponent from '@/app/components/ui/LogDetails/LogDetails';
import UserStats from '@/app/components/ui/UserStats/UserStats';

/**
 * Renders detailed audit log entry page with related user activity history.
 * Shows comprehensive information about a specific system action and related events.
 *
 * @return Log detail page component with full audit trail
 * @category Logging
 * @security Admin-only route, sensitive audit data protected with authorization checks
 * @performance Client-side rendering with API calls for log details and user history
 * @author Marco Lenschau <contact@marco-lenschau.de>
 */
export default function LogDetails() {
  const params = useParams();
  const router = useRouter();
  const logId = params.id as string;

  const [log, setLog] = useState<AuditLog | null>(null);
  const [userLogs, setUserLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogDetails = async () => {
      try {
        const response = await fetch('/api/log', {
          credentials: 'include'
        });
        const data = await response.json();

        if (data.success && data.logs) {
          const currentLog = data.logs.find((l: AuditLog) => l._id === logId);
          if (currentLog) {
            setLog(currentLog);
            setUserLogs(data.logs.filter((l: AuditLog) => l.userID === currentLog.userID));
          }
        }
      } catch (err) {
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    if (logId) fetchLogDetails();
  }, [logId]);

  const getStatusColor = (status: string) => {
    const s = status?.toUpperCase() || '';
    return s === 'SUCCESS' ? 'text-green-400 bg-green-900/30 border-green-700/50' :
           s === 'FAILED' ? 'text-red-400 bg-red-900/30 border-red-700/50' :
           s === 'WARNING' ? 'text-yellow-400 bg-yellow-900/30 border-yellow-700/50' :
           'text-gray-400 bg-gray-900/30 border-gray-700/50';
  };

  const getStatusIcon = (status: string) => {
    const s = status?.toUpperCase() || '';
    if (s === 'SUCCESS') return <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>;
    if (s === 'FAILED') return <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/></svg>;
    if (s === 'WARNING') return <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/></svg>;
    return null;
  };

  if (loading) return <div className="flex items-center justify-center min-h-screen text-gray-400">Loading...</div>;
  if (!log) return <div className="flex items-center justify-center min-h-screen text-red-400">Log not found</div>;

  return (
    <div className="flex flex-col">
      <PageHeader h1="Log Details" h2={`Log ${logId}`} color="#0b4816" img="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
      
      <div className="flex-1 overflow-y-auto scrollbar-dark">
        <section className="max-w-7xl mx-auto px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <LogDetailsComponent log={log} getStatusColor={getStatusColor} getStatusIcon={getStatusIcon} />
            </div>
            <div className="lg:col-span-2">
              <UserStats userID={log.userID} logs={userLogs} getStatusColor={getStatusColor} />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 mt-8">
            <button onClick={() => router.back()} className="px-4 py-2 bg-zinc-700 hover:bg-zinc-600 text-white rounded font-semibold transition-colors">← Back</button>
          </div>
        </section>
      </div>
    </div>
  );
}