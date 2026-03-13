'use client';

import { event } from '@/app/db';


export default function AllEventsTemplate() {
  const sortedEvents = [...event].sort((a, b) => a.time.getTime() - b.time.getTime());

  return (
    <div className="bg-zinc-800 rounded-lg border-2 border-zinc-500 p-6 w-full max-w-2xl">
      <h2 className="text-2xl font-bold text-white mb-4">All Events</h2>
      
      {sortedEvents.length === 0 ? (
        <p className="text-gray-400">No events available</p>
      ) : (
        <div className="space-y-3 max-h-90 overflow-y-auto scrollbar-dark pr-4">
          {sortedEvents.map(evt => (
            <div key={evt.id} className={`bg-zinc-700 hover:bg-zinc-600 p-4 rounded-lg border-l-4 transition-colors ${evt.prio === 'high' ? 'border-red-400' : evt.prio === 'medium' ? 'border-yellow-400' : 'border-green-400'}`}>
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-white font-semibold">{evt.name}</h3>
                <span className="text-sm font-semibold">
                  {evt.prio === 'high' ? 'Hoch' : evt.prio === 'medium' ? 'Mittel' : 'Niedrig'}
                </span>
              </div>
              <p className="text-gray-300 text-sm mb-2">{evt.description}</p>
              <div className="flex justify-between items-center text-xs text-gray-400">
                <span>{evt.time.toLocaleDateString('de-DE')}</span>
                <span>{evt.time.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
