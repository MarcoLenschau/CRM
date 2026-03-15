'use client';

import { useState, useEffect } from 'react';
import ShowEventDialog from '../dialogs/ShowEventDialog/ShowEventDialog';
import AllEventsDialog from '../dialogs/AllEventsDialog/AllEventsDialog';
import CreateEventDialog from '../dialogs/CreateEventDialog/CreateEventDialog';
import SuccessDialog from '../dialogs/SuccessDialog/SuccessDialog';
import type { Event } from '@/app/interfaces/event.interface';
import { Month } from '@/app/type/month.type';
import { Weekday } from '@/app/type/weekday.type';

/**
 * A functional React component that renders a calendar UI with the ability to navigate between months
 * and select specific days. The component also includes a dialog for handling appointments.
 *
 * @param {Object} props - The properties object.
 * @param {number} [props.width=25] - The width of each calendar cell in pixels.
 * @param {number} [props.height=25] - The height of each calendar cell in pixels.
 * @param {Event[]} [props.events=[]] - The events to display in the calendar.
 *
 * @returns {JSX.Element} The rendered calendar component.
 */
export default function Calendar({height=100, width=100, events=[]}: {height?: number, width?: number, events?: Event[]}) {
  const [displayDate, setDisplayDate] = useState(new Date());
  const [calendarEvents, setCalendarEvents] = useState<Event[]>(events);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isEventDialogOpen, setIsEventDialogOpen] = useState(false);
  const [isCreateEventDialogOpen, setIsCreateEventDialogOpen] = useState(false);
  const [isEventCreatedOpen, setIsEventCreatedOpen] = useState(false);
  const [createdEventInfo, setCreatedEventInfo] = useState({ name: '', date: '' });
  
  /**
   * Listen to eventsUpdated event and refresh calendar events.
   * Fetches latest events from API when event list changes.
   */
  useEffect(() => {
    const handleEventsUpdated = async () => {
      console.log('📢 Calendar: Events updated event received - refreshing');
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/event`, {
          credentials: 'include'
        });
        if (response.ok) {
          const newEvents = await response.json();
          console.log('📊 Calendar: Loaded', newEvents.length, 'events');
          setCalendarEvents(newEvents);
        }
      } catch (error) {
        console.error('❌ Calendar: Error fetching events:', error);
      }
    };

    window.addEventListener('eventsUpdated', handleEventsUpdated);
    return () => window.removeEventListener('eventsUpdated', handleEventsUpdated);
  }, []);
  
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
  const getEventsForDay = (day: number) => calendarEvents.filter(e => {
    const eventDate = new Date(e.createdAt);
    return eventDate.getDate() === day && eventDate.getMonth() === month && eventDate.getFullYear() === year;
  });
  const handleDayClick = (d: {day: number, isCurrentMonth: boolean}) => d.isCurrentMonth && (setSelectedDay(d.day), setIsDialogOpen(true));
  const handleEventClick = (e: React.MouseEvent, evt: Event) => {
    e.stopPropagation();
    setSelectedEvent(evt);
    setIsEventDialogOpen(true);
  };

  return (
    <div>
      <div className={`flex items-center justify-between mb-4 px-4`} style={{width: `${width * 7}px`}}>
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
                <div className="text-xs text-orange-400 space-y-0.5">
                  {displayedEvents.map(e => {
                    const eventTime = new Date(e.createdAt).toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' });
                    return <div key={e._id} onClick={(evt) => handleEventClick(evt, e)} className="truncate cursor-pointer hover:text-orange-300 hover:underline"><span className="text-gray-400">{eventTime}</span> {e.name}</div>;
                  })}
                  {moreCount > 0 && <div className="text-orange-500 font-semibold">+{moreCount}</div>}
                </div>
              )}
            </div>
          );
        })}
      </section>
      
      <AllEventsDialog isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)} selectedDay={selectedDay || 0} month={month} year={year} events={calendarEvents}
        onEventClick={(evt) => {
          setSelectedEvent(evt);
          setIsEventDialogOpen(true);
        }}
        onAddEventClick={() => {
          setIsDialogOpen(false);
          setIsCreateEventDialogOpen(true);
        }}/>
      
      {selectedEvent && <ShowEventDialog isOpen={isEventDialogOpen} onClose={() => setIsEventDialogOpen(false)} selectedEvent={selectedEvent}/>}
      
      <CreateEventDialog isOpen={isCreateEventDialogOpen} onClose={() => setIsCreateEventDialogOpen(false)} 
        selectedDay={selectedDay || 0} month={month} year={year}
        onSubmit={async (eventData) => {
          try {
            console.log("🎯 Creating event:", eventData);
            const userEmail = typeof window !== 'undefined' ? sessionStorage.getItem('userEmail') || 'unknown' : 'unknown';
            console.log("👤 Using userEmail:", userEmail);
            
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/event`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              credentials: 'include',
              body: JSON.stringify({
                userID: userEmail,
                name: eventData.name,
                description: eventData.description || '',
                prio: eventData.prio,
                eventDate: eventData.eventDate?.toISOString() || new Date().toISOString()
              })
            });
            
            if (response.ok) {
              console.log("✅ Event created successfully");
              setIsCreateEventDialogOpen(false);
              setCreatedEventInfo({ 
                name: eventData.name, 
                date: `${selectedDay}. ${new Date(year, month).toLocaleString('de-DE', { month: 'long' })} ${year} ${eventData.time}` 
              });
              setIsEventCreatedOpen(true);
              // Refresh events by reloading page or dispatching event
              window.dispatchEvent(new Event('eventsUpdated'));
            } else {
              const errorData = await response.json();
              console.error("❌ Failed to create event:", response.status, errorData);
              alert(`Event erstellen fehlgeschlagen: ${errorData.details || errorData.error}`);
            }
          } catch (error) {
            console.error("❌ Error creating event:", error);
            alert('Fehler beim Erstellen des Events');
          }
        }}/>
      
      <SuccessDialog 
        isOpen={isEventCreatedOpen} 
        onClose={() => setIsEventCreatedOpen(false)} 
        title="Event created!"
        message="Your event has been successfully created."
        detailLabel="Event name"
        detailValue={createdEventInfo.name}
        buttonText="Done"
      />
    </div>
  );
}
 