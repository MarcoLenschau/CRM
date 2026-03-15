'use client';

import { useState } from 'react';
import { CreateEventDialogProps } from '@/app/interfaces/createeventdialog.interface';
import { Prio } from '@/app/enums/prio.enum';

export default function CreateEventDialog({ isOpen, onClose, onSubmit, selectedDay, month, year }: CreateEventDialogProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [time, setTime] = useState('10:00');
  const [prio, setPrio] = useState<Prio>(Prio.MEDIUM);

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (!name.trim()) {
      alert('Bitte geben Sie einen Event-Namen ein');
      return;
    }
    onSubmit({ name, description, time, prio });
    setName('');
    setDescription('');
    setTime('10:00');
    setPrio(Prio.MEDIUM);
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-md flex items-center justify-center z-50">
      <div className="bg-zinc-800 rounded-lg p-6 max-w-md w-full mx-4 border-2 border-zinc-500">
        <h2 className="text-2xl font-bold text-white mb-4">Event erstellen</h2>
        <div className="space-y-4">
          <section className="flex flex-col gap-1">
            <label htmlFor="event-name" className="text-white text-sm">Event Name</label>
            <input id="event-name" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Event Name"
              className="w-full bg-zinc-700 text-white rounded-lg px-3 py-2 border border-zinc-600 okki aber text-sm"/>
          </section>
          
          <section className="flex flex-col gap-1">
            <label htmlFor="event-date" className="text-white text-sm">Datum</label>
            <input id="event-date" type="date" value={`${year}-${(month + 1).toString().padStart(2, '0')}-${selectedDay.toString().padStart(2, '0')}`} 
              className="w-full bg-zinc-700 text-gray-400 rounded-lg px-3 py-2 border border-zinc-600 text-sm cursor-pointer"/>
          </section>
          
          <section className="flex flex-col gap-1">
            <label htmlFor="event-time" className="text-white text-sm">Uhrzeit</label>
            <input id="event-time" type="time" value={time} onChange={(e) => setTime(e.target.value)} 
              className="w-full bg-zinc-700 text-white rounded-lg px-3 py-2 border border-zinc-600 cursor-pointer"/>
          </section>
          
          <section className="flex flex-col gap-1 relative">
            <label htmlFor="event-prio" className="text-white text-sm">Priorität</label>
            <select id="event-prio" value={prio} onChange={(e) => setPrio(e.target.value as Prio)}
              className="w-full bg-zinc-700 text-white rounded-lg px-2 py-2 border border-zinc-600 cursor-pointer text-sm">
              <option value={Prio.LOW}>Niedrig</option>
              <option value={Prio.MEDIUM}>Mittel</option>
              <option value={Prio.HIGH}>Hoch</option>
            </select>
          </section>

          <section className="flex flex-col gap-1">
            <label htmlFor="event-description" className="text-white text-sm">Bemerkung</label>
            <textarea id="event-description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Bemerkung..." rows={3} 
              className="w-full bg-zinc-700 text-white rounded-lg px-3 py-2 border border-zinc-600 resize-none text-sm"/>
          </section>
        </div>
        <div className="mt-6 flex gap-2">
          <button onClick={handleSubmit} className="flex-1 bg-green-600 hover:bg-green-500 text-white py-2 rounded-lg font-semibold text-sm">Erstellen</button>
          <button onClick={onClose} className="flex-1 bg-zinc-600 hover:bg-zinc-500 text-white py-2 rounded-lg font-semibold text-sm">Abbrechen</button>
        </div>
      </div>
    </div>
  );
}
