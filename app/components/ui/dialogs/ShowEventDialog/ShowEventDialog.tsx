'use client';

import { ShowEventDialogProps } from '@/app/interfaces/showeventdialog.interface';

export default function ShowEventDialog({ isOpen, onClose, selectedEvent }: ShowEventDialogProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-md flex items-center justify-center z-50">
      <div className="bg-zinc-800 rounded-lg p-6 max-w-md w-full mx-4 border-2 border-zinc-500">
        <h2 className="text-2xl font-bold text-white mb-4">{selectedEvent.name}</h2>
        <div className="space-y-3">
          <div>
            <p className="text-gray-400 text-sm">ID</p>
            <p className="text-white">#{selectedEvent.id}</p>
          </div>
          <div>
            <p className="text-gray-400 text-sm">Zeit</p>
            <p className="text-white">{selectedEvent.time.toLocaleString('de-DE')}</p>
          </div>
          <div>
            <p className="text-gray-400 text-sm">Beschreibung</p>
            <p className="text-white">{selectedEvent.description}</p>
          </div>
        </div>
        <button onClick={onClose} className="mt-6 w-full bg-zinc-600 hover:bg-zinc-500 text-white py-2 rounded-lg font-semibold">Schließen</button>
      </div>
    </div>
  );
}
