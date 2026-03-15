'use client';

import { AllEventsDialogProps } from '@/app/interfaces/alleventsdialog.interface';
import { Prio } from '@/app/enums/prio.enum';

/**
 * Modal dialog displaying all events for a selected calendar day with color-coded priority indicators.
 * Filters events by date and provides navigation to event details or event creation workflows.
 *
 * @param isOpen - Controls dialog visibility
 * @param onClose - Callback function executed when dialog is dismissed
 * @param selectedDay - Day of month (1-31) to filter events
 * @param month - Month index (0-11) for date filtering
 * @param year - Full year value for date filtering
 * @param events - Array of all events to filter by selected date
 * @param onEventClick - Callback triggered when an event is selected for viewing
 * @param onAddEventClick - Callback triggered when user clicks to create new event
 * @return Rendered events list dialog with filter and navigation options
 * @category Dialogs
 * @security Displays only events for selected day; prevents modification without explicit action
 * @performance Efficiently filters event list on each render; scrollable container for many events
 * @author Marco Lenschau <contact@marco-lenschau.de>
 */
export default function AllEventsDialog({ isOpen, onClose, selectedDay, month, year, events, onEventClick, onAddEventClick }: AllEventsDialogProps) {
  if (!isOpen) return null;

  const dayEvents = events.filter(e => {
    const eventDate = new Date(e.createdAt);
    return eventDate.getDate() === selectedDay && eventDate.getMonth() === month && eventDate.getFullYear() === year;
  });

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-md flex items-center justify-center z-50">
      <div className="bg-zinc-800 rounded-lg p-6 max-w-md w-full mx-4 border-2 border-zinc-500">
        <h2 className="text-2xl font-bold text-white mb-4">Events from {selectedDay}. {new Date(year, month).toLocaleString('de-DE', { month: 'long', year: 'numeric' })}</h2>
        
        {dayEvents.length === 0 ? (
          <p className="text-gray-400 text-sm">No events on this day</p>
        ) : (
          <div className="space-y-2 max-h-66 overflow-y-auto scrollbar-dark pr-4">
            {dayEvents.map(evt => (
              <div key={evt._id} onClick={() => { onEventClick?.(evt); onClose(); }}
                className={`bg-zinc-700 hover:bg-zinc-600 p-3 rounded-lg cursor-pointer transition-colors border-l-4 ${evt.prio === Prio.HIGH ? 'border-red-500' : evt.prio === Prio.MEDIUM ? 'border-yellow-500' : 'border-green-500'}`}>
                <p className="text-orange-400 font-semibold text-sm">{evt.name}</p>
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
