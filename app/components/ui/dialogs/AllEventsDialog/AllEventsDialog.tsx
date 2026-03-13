'use client';

import { event } from '@/app/db';
import { Event } from '@/app/interfaces/event.interface';

interface AllEventsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDay: number;
  month: number;
  year: number;
  onEventClick?: (evt: Event) => void;
  onAddEventClick?: () => void;
}

export default function AllEventsDialog({ isOpen, onClose, selectedDay, month, year, onEventClick, onAddEventClick }: AllEventsDialogProps) {
  if (!isOpen) return null;

  const dayEvents = event.filter(e => e.time.getDate() === selectedDay && e.time.getMonth() === month && e.time.getFullYear() === year);

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-md flex items-center justify-center z-50">
      <div className="bg-zinc-800 rounded-lg p-6 max-w-md w-full mx-4 border-2 border-zinc-500">
        <h2 className="text-2xl font-bold text-white mb-4">Events am {selectedDay}. {new Date(year, month).toLocaleString('de-DE', { month: 'long', year: 'numeric' })}</h2>
        
        {dayEvents.length === 0 ? (
          <p className="text-gray-400 text-sm">Keine Events an diesem Tag</p>
        ) : (
          <div className="space-y-2 max-h-66 overflow-y-auto scrollbar-dark pr-4">
            {dayEvents.map(evt => (
              <div key={evt.id} onClick={() => { onEventClick?.(evt); onClose(); }}
                className="bg-zinc-700 hover:bg-zinc-600 p-3 rounded-lg cursor-pointer border-l-4 border-orange-400 transition-colors">
                <p className="text-orange-400 font-semibold text-sm">{evt.name}</p>
                <p className="text-gray-300 text-xs">{evt.time.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })}</p>
                <p className="text-gray-400 text-xs mt-1">{evt.description}</p>
              </div>
            ))}
          </div>
        )}
        
        <div className="mt-6 flex gap-2">
          <button onClick={() => { onAddEventClick?.(); onClose(); }} 
            className="flex-1 bg-green-600 hover:bg-green-500 text-white py-2 rounded-lg font-semibold text-sm">Event hinzufügen</button>
          <button onClick={onClose} className="flex-1 bg-zinc-600 hover:bg-zinc-500 text-white py-2 rounded-lg font-semibold text-sm">Schließen</button>
        </div>
      </div>
    </div>
  );
}
