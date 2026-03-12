'use client';

import { useState } from 'react';
import { AppointmentDialogProps } from '../../../../interfaces/AppointmentDialogProps.interface';

/**
 * A dialog component for creating a new appointment. It provides a form
 * with fields for title, date, time, and description. The dialog is displayed
 * as a modal and can be opened or closed based on the `isOpen` prop.
 *
 * @param {AppointmentDialogProps} props - The props for the AppointmentDialog component.
 * @param {boolean} props.isOpen - Determines whether the dialog is open or closed.
 * @param {() => void} props.onClose - Callback function to close the dialog.
 * @param {(appointment: { title: string; date: string; time: string; description: string }) => void} props.onSubmit - Callback function to handle form submission with the appointment details.
 * @param {Date | null} [props.selectedDate] - The pre-selected date for the appointment, if any.
 *
 * @returns {JSX.Element | null} The rendered AppointmentDialog component, or null if `isOpen` is false.
 */
export default function AppointmentDialog({ isOpen, onClose, onSubmit, selectedDate }: AppointmentDialogProps) {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(selectedDate?.toString() || getCurrentDay());
  const [time, setTime] = useState('09:00');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title && date) {
      onSubmit({ title, date, time, description });
      setTitle('');
      setDate('');
      setTime('09:00');
      setDescription('');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-transparent backdrop-blur flex items-center justify-center z-50">
      <div className="bg-zinc-800 rounded-2xl p-6 w-96 border-2 border-zinc-500">
        <h2 className="text-2xl font-bold mb-4 text-white">Neuer Termin</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-white mb-1">Titel</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="z.B. Besprechung"
              className="w-full px-3 py-2 bg-zinc-700 border border-zinc-600 rounded-xl text-white focus:outline-none focus:border-zinc-500"/>
          </div>

          <div> 
            <label className="block text-sm font-medium text-white mb-1">Datum</label>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)}
              className="w-full px-3 py-2 bg-zinc-700 border border-zinc-600 rounded-xl text-white focus:outline-none focus:border-zinc-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-1">Uhrzeit</label>
            <input type="time" value={time} onChange={(e) => setTime(e.target.value)}
              className="w-full px-3 py-2 bg-zinc-700 border border-zinc-600 rounded-xl text-white focus:outline-none focus:border-zinc-500"/>
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-1">Beschreibung</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Optional..." rows={3} 
            className="w-full px-3 py-2 bg-zinc-700 border border-zinc-600 rounded-xl text-white focus:outline-none focus:border-zinc-500 resize-none"/>
          </div>

          <div className="flex gap-2 pt-4">
            <button type="submit" className="flex-1 bg-zinc-700 hover:bg-zinc-600 text-white font-bold py-2 px-4 rounded-xl">
              Erstellen
            </button>
            <button type="button" onClick={onClose} className="flex-1 bg-zinc-700 hover:bg-zinc-600 text-white font-bold py-2 px-4 rounded-xl">
              Abbrechen
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/**
 * Retrieves the current day of the month as a string.
 *
 * @returns {string} The current day of the month in string format.
 */
const getCurrentDay = () => String(new Date().getDate());