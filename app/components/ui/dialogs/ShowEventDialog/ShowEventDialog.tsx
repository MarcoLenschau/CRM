'use client';

import { useState } from 'react';
import { ShowEventDialogProps } from '@/app/interfaces/showeventdialog.interface';
import DeleteConfirmDialog from '../DeleteConfirmDialog/DeleteConfirmDialog';

export default function ShowEventDialog({ isOpen, onClose, selectedEvent }: ShowEventDialogProps) {
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  if (!isOpen) return null;

  const handleDeleteClick = () => {
    setIsDeleteConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      setIsDeleting(true);
      console.log("🗑️ Deleting event:", selectedEvent._id);
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/event/${selectedEvent._id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
      });

      if (response.ok) {
        console.log("✅ Event deleted successfully");
        // Benachrichtige andere Komponenten von der Löschung
        window.dispatchEvent(new Event('eventsUpdated'));
        setIsDeleteConfirmOpen(false);
        onClose();
      } else {
        const errorData = await response.json();
        console.error("❌ Failed to delete event:", response.status, errorData);
        alert(`Event löschen fehlgeschlagen: ${errorData.error || 'Unbekannter Fehler'}`);
      }
    } catch (error) {
      console.error("❌ Error deleting event:", error);
      alert('Fehler beim Löschen des Events');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/30 backdrop-blur-md flex items-center justify-center z-50">
        <div className="bg-zinc-800 rounded-lg p-6 max-w-md w-full mx-4 border-2 border-zinc-500">
          <h2 className="text-2xl font-bold text-white mb-4">{selectedEvent.name}</h2>
          <div className="space-y-3">
            <div>
              <p className="text-gray-400 text-sm">ID</p>
              <p className="text-white">#{selectedEvent._id}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Zeit</p>
              <p className="text-white">{new Date(selectedEvent.createdAt).toLocaleString('de-DE')}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Beschreibung</p>
              <p className="text-white">{selectedEvent.description || 'Keine Beschreibung'}</p>
            </div>
          </div>
          <div className="mt-6 flex gap-2">
            <button 
              onClick={handleDeleteClick} 
              disabled={isDeleting}
              className="flex-1 bg-red-600 hover:bg-red-500 disabled:bg-red-800 text-white py-2 rounded-lg font-semibold"
            >
              Löschen
            </button>
            <button 
              onClick={onClose} 
              disabled={isDeleting}
              className="flex-1 bg-zinc-600 hover:bg-zinc-500 disabled:bg-zinc-700 text-white py-2 rounded-lg font-semibold"
            >
              Schließen
            </button>
          </div>
        </div>
      </div>

      <DeleteConfirmDialog
        isOpen={isDeleteConfirmOpen}
        onClose={() => setIsDeleteConfirmOpen(false)}
        onConfirm={handleConfirmDelete}
        userName={selectedEvent.name}
      />
    </>
  );
}
