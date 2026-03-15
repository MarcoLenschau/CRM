'use client';

import { useState, useEffect } from 'react';
import PageHeader from '@/app/components/ui/PageHeader/PageHeader';
import SearchBar from '@/app/components/ui/SearchBar/SearchBar';
import StatCard from '@/app/components/ui/StatCard/StatCard';
import { AuditLog } from '@/app/interfaces/auditlog.interface';

/**
 * Renders audit log page with filtering and search capabilities.
 * Displays comprehensive log of all system actions for compliance monitoring.
 *
 * @return Audit log page component with filters and statistics
 * @category Logging
 * @security Admin-only route, displays sensitive audit trail with access control
 * @performance Client-side rendering with API calls for log retrieval and filtering
 * @author Marco Lenschau <contact@marco-lenschau.de>
 */
export default function AuditLogPage() {
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [actionFilter, setActionFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await fetch('/api/log', {
          credentials: 'include'
        });
        const data = await response.json();
        if (data.success && data.logs) {
          setAuditLogs(data.logs);
        }
      } catch (err) {
        console.error('Failed to fetch logs:', err);
      }
    };

    fetchLogs();
  }, []);

  const filteredLogs = auditLogs.filter((log: AuditLog) => {
    const matchesSearch = 
      (log.userID?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (log.description?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (log.entity?.toLowerCase() || '').includes(searchTerm.toLowerCase());
    
    const matchesAction = actionFilter === 'all' || log.action === actionFilter;
    const matchesStatus = statusFilter === 'all' || log.status === statusFilter;
    
    return matchesSearch && matchesAction && matchesStatus;
  });

  const actionCounts = {
    CREATE: auditLogs.filter((l: AuditLog) => l.action === 'CREATE').length,
    UPDATE: auditLogs.filter((l: AuditLog) => l.action === 'UPDATE').length,
    DELETE: auditLogs.filter((l: AuditLog) => l.action === 'DELETE').length,
    SUCCESS: auditLogs.filter((l: AuditLog) => l.status === 'SUCCESS').length,
  };

  const getStatusColor = (status: string) => {
    const normalizedStatus = status?.toUpperCase() || '';
    switch(normalizedStatus) {
      case 'SUCCESS': return 'text-green-400 bg-green-900/30 border-green-700/50';
      case 'FAILED': return 'text-red-400 bg-red-900/30 border-red-700/50';
      case 'WARNING': return 'text-yellow-400 bg-yellow-900/30 border-yellow-700/50';
      default: return 'text-gray-400 bg-gray-900/30 border-gray-700/50';
    }
  };

  const getActionIcon = (action: string) => {
    const iconMap: Record<string, string> = {
      'CREATE': 'M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z',
      'UPDATE': 'M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25z',
      'DELETE': 'M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-9l-1 1H5v2h14V4z',
      'VIEW': 'M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z',
      'LOGIN': 'M10 17v-5h2v5h4v-8H2v8h4zm8-10h-4V5h4v2z',
      'LOGOUT': 'M17 7l-1.41-1.41L12 10.17V3h-2v7.17L8.41 5.59 7 7l5 5 5-5z',
      'EXPORT': 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z',
      'IMPORT': 'M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z',
    };
    return iconMap[action] || iconMap['CREATE'];
  };

  return (
    <div className="flex flex-col">
      <PageHeader
        h1="Audit Log"
        h2="Track all system activities and user actions for compliance and security"
        color="#0b4816"
        img="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"
      />

      <div className="flex-1 overflow-y-auto scrollbar-dark">
        <section className="max-w-7xl mx-auto px-8 py-8">
          {/* Statistics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatCard
              label="Total Entries"
              value={auditLogs.length}
              color="blue"
              icon={
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 9h4v2h-4v-2zm0 4h4v2h-4v-2zm0-8h4v2h-4V8zM8 8h4v2H8V8zm0 4h4v2H8v-2zm0 4h4v2H8v-2z"/>
                </svg>
              }
            />
            <StatCard
              label="Created"
              value={actionCounts.CREATE}
              color="green"
              icon={
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                </svg>
              }
            />
            <StatCard
              label="Updated"
              value={actionCounts.UPDATE}
              color="blue"
              icon={
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25z"/>
                </svg>
              }
            />
            <StatCard
              label="Deleted"
              value={actionCounts.DELETE}
              color="red"
              icon={
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-9l-1 1H5v2h14V4z"/>
                </svg>
              }
            />
          </div>

          {/* Search and Filters */}
          <SearchBar
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            placeholder="Search by user, action, or description..."
            focusColor="green"
          >
            <select
              value={actionFilter}
              onChange={(e) => setActionFilter(e.target.value)}
              className="bg-zinc-700/50 border border-zinc-600 rounded-lg px-4 py-2.5 text-white min-w-max"
            >
              <option value="all">All Actions</option>
              <option value="CREATE">Create</option>
              <option value="UPDATE">Update</option>
              <option value="DELETE">Delete</option>
              <option value="VIEW">View</option>
              <option value="LOGIN">Login</option>
              <option value="LOGOUT">Logout</option>
              <option value="EXPORT">Export</option>
              <option value="IMPORT">Import</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-zinc-700/50 border border-zinc-600 rounded-lg px-4 py-2.5 text-white min-w-max"
            >
              <option value="all">All Status</option>
              <option value="SUCCESS">Success</option>
              <option value="FAILED">Failed</option>
              <option value="WARNING">Warning</option>
            </select>
          </SearchBar>

          {/* Audit Log Table */}
          <div className="bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 rounded-lg border border-zinc-700/50 overflow-hidden mt-8">
            <div className="overflow-x-auto scrollbar-dark">
              <table className="w-full text-sm">
                <thead className="bg-zinc-700/50 border-b border-zinc-600 sticky top-0 z-10">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">ID</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Timestamp</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">User ID</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Action</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Entity</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Description</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-700">
                  {filteredLogs.length > 0 ? (
                    filteredLogs.map((log, index) => (
                      <tr key={log._id} className={`hover:bg-zinc-700/30 transition-colors ${index % 2 === 0 ? 'bg-transparent' : 'bg-zinc-800/20'}`}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <a 
                            href={`/log/${log._id}`}
                            className="text-blue-400 hover:text-blue-300 underline text-xs font-mono break-all transition-colors"
                          >
                            {log._id || '-'}
                          </a>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-300 text-sm">
                          {log.createdAt ? new Date(log.createdAt).toLocaleString('de-DE') : '-'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center gap-2 text-white font-medium">
                            <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                            {log.userID}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-green-900/30 border border-green-700/50 text-green-300 uppercase">
                            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                              <path d={getActionIcon(log.action)} />
                            </svg>
                            {log.action}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-gray-400">{log.entity}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-gray-300 truncate max-w-xs inline-block">{log.description}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold border uppercase ${getStatusColor(log.status)}`}>
                            {log.status?.toUpperCase() === 'SUCCESS' && <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>}
                            {log.status?.toUpperCase() === 'FAILED' && <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/></svg>}
                            {log.status?.toUpperCase() === 'WARNING' && <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/></svg>}
                            {log.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7} className="px-6 py-12 text-center text-gray-400">
                        <div className="flex flex-col items-center gap-3">
                          <svg className="w-12 h-12 opacity-50" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                          </svg>
                          <span>No audit logs found matching your criteria</span>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Results Info */}
            <div className="px-6 py-3 bg-zinc-700/30 border-t border-zinc-600 text-sm text-gray-400">
              Showing {filteredLogs.length} of {auditLogs.length} entries
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
