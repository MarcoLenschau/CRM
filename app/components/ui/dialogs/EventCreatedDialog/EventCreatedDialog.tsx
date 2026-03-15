'use client';

import { EventCreatedDialogProps } from '@/app/interfaces/eventcreateddialog.interface';

/**
 * Modal success dialog confirming event creation with event details display.
 * Shows event name and date in confirmation message with German localization.
 *
 * @param isOpen - Controls dialog visibility
 * @param onClose - Callback function executed when dialog is dismissed
 * @param eventName - Name of the created event
 * @param eventDate - Date of the created event
 * @return Rendered event creation confirmation dialog
 * @throws Error if onClose callback fails; dialog remains visible and dismissible
 * @category Dialogs
 * @security Modal prevents background interaction during confirmation; uses backdrop blur for visual feedback
 * @performance Conditional rendering prevents DOM overhead; displays minimal information for quick user acknowledgment
 * @author Marco Lenschau <contact@marco-lenschau.de>
 */
export default function EventCreatedDialog({ isOpen, onClose, eventName, eventDate }: EventCreatedDialogProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-md flex items-center justify-center z-50">
      <div className="bg-zinc-800 rounded-lg p-6 max-w-md w-full mx-4 border-2 border-zinc-500 text-center">
        <div className="mb-4 flex justify-center">
          <div className="bg-green-600 rounded-full p-3 w-16 h-16 flex items-center justify-center">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-white mb-4">Event erstellt!</h2>
        
        {(eventName || eventDate) && (
          <div className="space-y-2 text-left bg-zinc-700 rounded-lg p-4 mb-6 text-sm">
            {eventName && (
              <div>
                <p className="text-gray-400">Event Name</p>
                <p className="text-white font-semibold">{eventName}</p>
              </div>
            )}
            {eventDate && (
              <div>
                <p className="text-gray-400">Datum</p>
                <p className="text-white font-semibold">{eventDate}</p>
              </div>
            )}
          </div>
        )}
        
        <p className="text-gray-400 text-sm mb-6">Dein Event wurde erfolgreich erstellt.</p>
        <button onClick={onClose} className="w-full bg-green-600 hover:bg-green-500 text-white py-2 rounded-lg font-semibold text-sm">Fertig</button>
      </div>
    </div>
  );
}
