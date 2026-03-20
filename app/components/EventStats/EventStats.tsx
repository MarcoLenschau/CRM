'use client';

import { useEffect, useState } from 'react';
import { Event } from '@/app/interfaces/event.interface';
import { Prio } from '@/app/enums/prio.enum';
import { getAuthHeaders } from '@/app/utils/api';

/**
 * Dashboard card component displaying event statistics with priority breakdown and trend indicators.
 * Fetches all events from API and calculates high/medium/low priority counts with visual progress indicators.
 *
 * @return Rendered event statistics card with priority breakdown and counts
 * @throws Error when fetching events from API; logs to console and displays empty stats
 * @category Feature Components
 * @security Events fetched from authenticated API endpoint with credentials included
 * @performance Fetches events on mount and listens to eventsUpdated window event for real-time updates
 * @author Marco Lenschau <contact@marco-lenschau.de>
 */
export default function EventStats() {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/event`, {
          headers: getAuthHeaders()
        });
        if (response.ok) {
          const data = await response.json();
          setEvents(data);
        }
      } catch {
        // failed to fetch events
      }
    };

    fetchEvents();

    // Höre auf eventsUpdated Event
    const handleEventsUpdated = () => { fetchEvents(); };

    window.addEventListener('eventsUpdated', handleEventsUpdated);
    return () => window.removeEventListener('eventsUpdated', handleEventsUpdated);
  }, []);

  const highCount = events.filter((e: Event) => e.prio === Prio.HIGH).length;
  const mediumCount = events.filter((e: Event) => e.prio === Prio.MEDIUM).length;
  const lowCount = events.filter((e: Event) => e.prio === Prio.LOW).length;
  const totalCount = events.length;

  return (
    <>
      {/* High Priority */}
      <div className="bg-zinc-800 rounded-lg border-2 border-zinc-700 p-3 backdrop-blur-sm hover:border-red-700/50 transition-colors group">
        <div className="flex items-center gap-2 mb-2">
          <div className="bg-red-900/30 rounded-full p-2 border border-red-700/50 group-hover:bg-red-900/50 transition-colors">
            <svg className="w-4 h-4 text-red-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
            </svg>
          </div>
          <span className="text-xs font-semibold text-gray-300">High Priority</span>
        </div>
        <p className="text-2xl font-bold text-red-400">{highCount}</p>
      </div>

      {/* Medium Priority */}
      <div className="bg-zinc-800 rounded-lg border-2 border-zinc-700 p-3 backdrop-blur-sm hover:border-yellow-700/50 transition-colors group">
        <div className="flex items-center gap-2 mb-2">
          <div className="bg-yellow-900/30 rounded-full p-2 border border-yellow-700/50 group-hover:bg-yellow-900/50 transition-colors">
            <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
            </svg>
          </div>
          <span className="text-xs font-semibold text-gray-300">Medium Priority</span>
        </div>
        <p className="text-2xl font-bold text-yellow-400">{mediumCount}</p>
      </div>

      {/* Low Priority */}
      <div className="bg-zinc-800 rounded-lg border-2 border-zinc-700 p-3 backdrop-blur-sm hover:border-green-700/50 transition-colors group">
        <div className="flex items-center gap-2 mb-2">
          <div className="bg-green-900/30 rounded-full p-2 border border-green-700/50 group-hover:bg-green-900/50 transition-colors">
            <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
            </svg>
          </div>
          <span className="text-xs font-semibold text-gray-300">Low Priority</span>
        </div>
        <p className="text-2xl font-bold text-green-400">{lowCount}</p>
      </div>

      {/* Total Events */}
      <div className="bg-zinc-800 rounded-lg border-2 border-zinc-700 p-3 backdrop-blur-sm hover:border-blue-700/50 transition-colors group">
        <div className="flex items-center gap-2 mb-2">
          <div className="bg-blue-900/30 rounded-full p-2 border border-blue-700/50 group-hover:bg-blue-900/50 transition-colors">
            <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z"/>
            </svg>
          </div>
          <span className="text-xs font-semibold text-gray-300">Total Events</span>
        </div>
        <p className="text-2xl font-bold text-blue-400">{totalCount}</p>
      </div>
    </>
  );
}
