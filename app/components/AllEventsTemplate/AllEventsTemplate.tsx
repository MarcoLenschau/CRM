'use client';

import { useEffect, useState } from 'react';
import { Event } from "@/app/interfaces/event.interface";

/**
 * Dashboard template component displaying comprehensive event list sorted chronologically with status indicators.
 * Fetches all events from API with detailed logging for debugging and real-time updates via window events.
 *
 * @return Rendered events list template with sorting and display capabilities
 * @throws Error when fetching events from API; logs error and displays empty state
 * @category Templates
 * @security Events fetched from authenticated API endpoint with credentials included
 * @performance Loads events on mount; supports real-time refresh via eventsUpdated event; includes comprehensive error logging
 * @author Marco Lenschau <contact@marco-lenschau.de>
 */
export default function AllEventsTemplate() {
  const [sortedEvents, setSortedEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        console.log("🎯 AllEventsTemplate: Fetching events from API");
        const eventResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/event`, {
          credentials: 'include'
        });
        
        console.log("📊 Response status:", eventResponse.status, eventResponse.statusText);
        
        if (!eventResponse.ok) {
          console.error('❌ Failed to fetch events:', eventResponse.status, eventResponse.statusText);
          setLoading(false);
          return;
        }
        
        const event: Event[] = await eventResponse.json();
        console.log('✅ Fetched events count:', event?.length || 0);
        console.log('📋 Events data:', JSON.stringify(event, null, 2));
        
        if (!event || event.length === 0) {
          console.warn("⚠️ No events returned from API");
          setSortedEvents([]);
          setLoading(false);
          return;
        }
        
        const sorted = event.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        setSortedEvents(sorted);
      } catch (error) {
        console.error('❌ Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();

    // Listen for events updated event
    const handleEventsUpdated = () => {
      console.log('📢 Events updated event received - refreshing');
      fetchEvents();
    };

    window.addEventListener('eventsUpdated', handleEventsUpdated);
    return () => window.removeEventListener('eventsUpdated', handleEventsUpdated);
  }, []);

  const getPrioConfig = (prio: string) => {
    const prioLower = prio?.toLowerCase() || '';
    switch(prioLower) {
      case 'high': return { label: 'High', color: 'border-red-400', textColor: 'text-red-400' };
      case 'medium': return { label: 'Medium', color: 'border-yellow-400', textColor: 'text-yellow-400' };
      case 'low': return { label: 'Low', color: 'border-green-400', textColor: 'text-green-400' };
      default: return { label: prio, color: 'border-gray-400', textColor: 'text-gray-400' };
    }
  };

  if (loading) {
    return (
      <div className="bg-zinc-800 rounded-lg border-2 border-zinc-500 p-6 w-full max-w-2xl">
        <p className="text-gray-400">Loading events...</p>
      </div>
    );
  }

  return (
    <div className="bg-zinc-800 rounded-lg border-2 border-zinc-500 p-6 w-full max-w-2xl">
      <h2 className="text-2xl font-bold text-white mb-4">All Events</h2>
      
      {sortedEvents.length === 0 ? (
        <p className="text-gray-400">No events available</p>
      ) : (
        <div className="space-y-3 max-h-96 overflow-y-auto scrollbar-dark pr-4">
          {sortedEvents.map(evt => {
            const config = getPrioConfig(evt.prio);
            return (
              <div key={evt._id} className={`bg-zinc-700 hover:bg-zinc-600 p-4 rounded-lg border-l-4 transition-colors ${config.color}`}>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-white font-semibold">{evt.name}</h3>
                  <span className={`text-sm font-semibold ${config.textColor}`}>
                    {config.label}
                  </span>
                </div>
                <p className="text-gray-300 text-sm mb-2">{evt.description}</p>
                <div className="flex justify-between items-center text-xs text-gray-400">
                  <span>{new Date(evt.createdAt).toLocaleDateString('en-US')}</span>
                  <span>{new Date(evt.createdAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
