'use client';

import { AuditLog } from '@/app/interfaces/auditlog.interface';

interface LogDetailsComponentProps {
  log: AuditLog;
  getStatusColor: (status: string) => string;
  getStatusIcon: (status: string) => React.ReactNode;
}

export default function LogDetailsComponent({ log, getStatusColor, getStatusIcon }: LogDetailsComponentProps) {
  const getActionIcon = (action: string) => {
    const a = action?.toUpperCase() || '';
    if (a === 'CREATE') return <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>;
    if (a === 'UPDATE') return <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25z"/></svg>;
    if (a === 'DELETE') return <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-9l-1 1H5v2h14V4z"/></svg>;
    if (a === 'READ') return <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>;
    return <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/></svg>;
  };

  const getActionColor = (action: string) => {
    const a = action?.toUpperCase() || '';
    if (a === 'CREATE') return 'from-green-900/30 to-green-900/10 border-green-700/40 bg-green-900/20';
    if (a === 'UPDATE') return 'from-blue-900/30 to-blue-900/10 border-blue-700/40 bg-blue-900/20';
    if (a === 'DELETE') return 'from-red-900/30 to-red-900/10 border-red-700/40 bg-red-900/20';
    if (a === 'READ') return 'from-cyan-900/30 to-cyan-900/10 border-cyan-700/40 bg-cyan-900/20';
    return 'from-purple-900/30 to-purple-900/10 border-purple-700/40 bg-purple-900/20';
  };

  return (
    <div className="bg-gradient-to-br from-zinc-800/50 to-zinc-900/30 rounded-lg border border-zinc-700/40 p-7 backdrop-blur-sm">
      <h3 className="text-xl font-bold text-white mb-7 uppercase tracking-wider">Entry Details</h3>
      
      <div className="space-y-6">
        {/* Log ID */}
        <div>
          <p className="text-xs text-gray-400 uppercase tracking-widest font-semibold mb-3">Log ID</p>
          <p className="text-sm text-gray-300 font-mono break-all bg-zinc-900/60 rounded-lg px-4 py-3 border border-zinc-700/30">{log._id}</p>
        </div>
        
        {/* User ID & Timestamp */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-widest font-semibold mb-3">User ID</p>
            <div className="bg-zinc-900/40 border border-zinc-700/30 rounded-lg px-4 py-3">
              <p className="text-gray-200 font-medium text-sm">{log.userID}</p>
            </div>
          </div>
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-widest font-semibold mb-3">Timestamp</p>
            <div className="bg-zinc-900/40 border border-zinc-700/30 rounded-lg px-4 py-3">
              <p className="text-gray-300 text-sm font-mono">{log.createdAt ? new Date(log.createdAt).toLocaleString('de-DE') : '-'}</p>
            </div>
          </div>
        </div>

        {/* Action & Entity */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-widest font-semibold mb-3">Action</p>
            <div className={`inline-flex items-center gap-2 px-4 py-3 rounded-lg border bg-gradient-to-br text-sm font-bold uppercase ${getActionColor(log.action)}`}>
              <span className="text-lg">{getActionIcon(log.action)}</span>
              {log.action}
            </div>
          </div>
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-widest font-semibold mb-3">Entity</p>
            <div className="bg-zinc-900/40 border border-zinc-700/30 rounded-lg px-4 py-3">
              <p className="text-gray-200 font-medium text-sm">{log.entity}</p>
            </div>
          </div>
        </div>

        {/* Status */}
        <div>
          <p className="text-xs text-gray-400 uppercase tracking-widest font-semibold mb-3">Status</p>
          <div className={`inline-flex items-center gap-2 px-4 py-3 rounded-lg border text-sm font-bold uppercase ${getStatusColor(log.status)}`}>
            {getStatusIcon(log.status)}
            {log.status}
          </div>
        </div>

        {/* Description */}
        <div>
          <p className="text-xs text-gray-400 uppercase tracking-widest font-semibold mb-3">Description</p>
          <div className="bg-zinc-900/40 border border-zinc-700/30 rounded-lg p-4">
            <p className="text-gray-300 text-sm leading-relaxed">{log.description || <span className="text-gray-500 italic">No description provided</span>}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
