'use client';

import { useState } from 'react';
import AppointmentDialog from '../dialogs/AppointmentDialog/AppointmentDialog';
import { event } from '@/app/db';
import { Month } from '@/app/type/month.type';
import { Weekday } from '@/app/type/weekday.type';

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
export default function Calendar({width=150, height=100}: {height?: number, width?: number}) {
  const [displayDate, setDisplayDate] = useState(new Date());
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const month = displayDate.getMonth();
  const year = displayDate.getFullYear();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();
  const totalCells = Math.ceil((daysInMonth + firstDay) / 7) * 7;
  const weekdays: Weekday[] = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr' , 'Sa'];
  const monthNames: Month[] = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];
  
  const calendarDays = Array.from({length: totalCells}, (_, i) => {
    const day = i - firstDay + 1;
    const isCurrentMonth = day > 0 && day <= daysInMonth;
    return {day: isCurrentMonth ? day : day <= 0 ? day + new Date(year, month, 0).getDate() : day - daysInMonth, isCurrentMonth, weekday: weekdays[i % 7]};
  });
  
  const now = new Date();
  const isToday = (d: number) => d === now.getDate() && month === now.getMonth() && year === now.getFullYear();
  const getEventsForDay = (day: number) => event.filter(e => e.time.getDate() === day && e.time.getMonth() === month && e.time.getFullYear() === year);
  const handleDayClick = (d: {day: number, isCurrentMonth: boolean}) => d.isCurrentMonth && (setSelectedDay(d.day), setIsDialogOpen(true));

  return (
    <div>
      <div className="flex items-center justify-between mb-4 px-4 w-150">
        <button onClick={() => setDisplayDate(new Date(year, month - 1))} className="text-2xl font-bold hover:brightness-150">←</button>
        <h2 className="text-xl font-bold">{monthNames[month]} {year}</h2>
        <button onClick={() => setDisplayDate(new Date(year, month + 1))} className="text-2xl font-bold hover:brightness-150">→</button>
      </div>
      <section className="grid grid-cols-7 border-2 border-zinc-500 bg-zinc-700" style={{gridAutoRows: `${height}px`}}>
        {calendarDays.map((dayObj) => {
          const dayEvents = dayObj.isCurrentMonth ? getEventsForDay(dayObj.day) : [];
          const maxEvents = 2;
          const displayedEvents = dayEvents.slice(0, maxEvents);
          const moreCount = Math.max(0, dayEvents.length - maxEvents);
          return (
            <div key={`${dayObj.day}-${dayObj.weekday}`} onClick={() => handleDayClick(dayObj)} className={`border-2 ${!dayObj.isCurrentMonth ? 'bg-zinc-700 border-gray-500' : isToday(dayObj.day) ? 'bg-zinc-700 border-zinc-500' : 'bg-zinc-800 border-zinc-700'} 
              cursor-pointer font-bold flex flex-col p-1 h-full`}>
              <div className="flex justify-between items-start mb-1">
                <span className={`text-xs ${!dayObj.isCurrentMonth ? 'text-gray-400' : ''}`}>{dayObj.weekday}</span>
                <span className={`text-sm ${!dayObj.isCurrentMonth ? 'text-gray-400' : ''}`}>{dayObj.day}</span>
              </div>
              {dayEvents.length > 0 && (
                <div className="text-xs mt-auto text-orange-400 space-y-0.5">
                  {displayedEvents.map(e => <div key={e.id} className="truncate">{e.name}</div>)}
                  {moreCount > 0 && <div className="text-orange-500 font-semibold">+{moreCount}</div>}
                </div>
              )}
            </div>
          );
        })}
      </section>
      <AppointmentDialog isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)}
        onSubmit={() => setIsDialogOpen(false)} selectedDate={selectedDay || undefined}/>
    </div>
  );
}
 