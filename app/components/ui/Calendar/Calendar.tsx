'use client';

import { useState } from 'react';
import AppointmentDialog from '../dialogs/AppointmentDialog/AppointmentDialog';
import { Appointment } from '@/app/type/appointment';

/**
 * A functional React component that renders a calendar UI with the ability to navigate between months
 * and select specific days. The component also includes a dialog for handling appointments.
 *
 * @param {Object} props - The properties object.
 * @param {number} [props.width=25] - The width of each calendar cell in pixels.
 * @param {number} [props.height=25] - The height of each calendar cell in pixels.
 *
 * @returns {JSX.Element} The rendered calendar component.
 */
export default function Calendar({width=25, height=25}: {width?: number, height?: number}) {
  const [displayDate, setDisplayDate] = useState(new Date());
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const now = new Date();
  const month = displayDate.getMonth();
  const year = displayDate.getFullYear();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();
  const weekdays = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];
  const monthNames = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];
  const totalCells = Math.ceil((daysInMonth + firstDay) / 7) * 7;
  const calendarDays = [...Array(firstDay).fill(null), ...Array.from({length: daysInMonth}, (_, i) => i + 1), ...Array(totalCells - firstDay - daysInMonth).fill(null)];
  const isToday = (day: number | null) => day === now.getDate() && month === now.getMonth() && year === now.getFullYear();

  /**
  * Handles the click event on a day in the calendar.
  * If a valid day is clicked, it sets the selected day and opens a dialog.
  *
  * @param day - The day that was clicked, or null if no day was selected.
  */
  const handleDayClick = (day: number | null) => day ? (setSelectedDay(day), setIsDialogOpen(true)) : null;
  /**
  * Handles the submission of an appointment.
  * 
  * @param appointment - The appointment object containing the details of the submitted appointment.
  */
  const handleAppointmentSubmit = (appointment: Appointment) => setIsDialogOpen(false);

  return (
    <div>
      <div className="flex items-center justify-between mb-4 px-4">
        <button onClick={() => setDisplayDate(new Date(year, month - 1))} className="text-2xl font-bold hover:brightness-150">←</button>
        <h2 className="text-xl font-bold">{monthNames[month]} {year}</h2>
        <button onClick={() => setDisplayDate(new Date(year, month + 1))} className="text-2xl font-bold hover:brightness-150">→</button>
      </div>
      <section className="grid grid-cols-7 border-2 border-zinc-500 bg-zinc-700" style={{gridAutoRows: `${height * 4}px`}}>
        {calendarDays.map((day, index) => (
          <div key={index} style={{width: `${width * 4}px`}} onClick={() => handleDayClick(day)} className={`border-2 ${day === null ? 'bg-zinc-800 border-zinc-700' : isToday(day) ? 'bg-zinc-700 border-zinc-500' : 'bg-zinc-800 border-zinc-700'} 
          cursor-pointer font-bold text-xl flex flex-col items-center justify-center hover:brightness-150`}>
            {day && (
              <>
                <span className="text-sm">{weekdays[index % 7]}</span>
                <span>{day}</span>
              </>
            )}
          </div>
        ))}
      </section>
      <AppointmentDialog isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)}
        onSubmit={handleAppointmentSubmit} selectedDate={selectedDay || undefined}/>
    </div>
  );
}
 