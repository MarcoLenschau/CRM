'use client';

import { useEffect, useState } from 'react';
import { Event } from "@/app/interfaces/event.interface";

export default function AllEventsTemplate() {
  const [sortedEvents, setSortedEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/event`, {
          credentials: 'include'
        });
        const event: Event[] = await eventResponse.json();
        const sorted = event.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        setSortedEvents(sorted);
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const getPrioConfig = (prio: string) => {
    switch(prio) {
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
