import Calendar from "../components/ui/Calendar/Calendar";
import PageHeader from "../components/ui/PageHeader/PageHeader";
import QuickTip from "../components/ui/QuickTip/QuickTip";
import EventStats from "../components/EventStats/EventStats";
import type { Event } from "../interfaces/event.interface";
import { fetchWithAuth } from "../utils/api";

/**
 * Renders calendar page with event management, statistics, and quick tips.
 * Fetches events server-side and displays interactive calendar widget.
 *
 * @return Calendar page component with event visualization
 * @category Calendar
 * @security Protected route requiring authentication, server-side data fetching
 * @performance Server-side rendering with async event fetching and caching
 * @author Marco Lenschau <contact@marco-lenschau.de>
 */
export default async function CalendarPage() {
  let events: Event[] = [];
  
  try {
    const response: Response = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL}/event`);
    events = await response.json();
  } catch {
    // failed to fetch events
  }
  
  return (
    <div className="flex flex-col">
      <PageHeader h1="Calendar & Events" h2="Manage your events, appointments and schedule" color="#4f0623" img="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zm-5-7h4v4h-4z"></PageHeader>

      {/* Content - Scrollable */}
      <div className="flex-1 overflow-y-auto scrollbar-dark min-h-0">
        <section className="flex flex-col justify-start items-center gap-6 px-8 py-6">
          <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="flex flex-col gap-3 lg:col-span-2">
            {/* Calendar */}
            <div className="bg-zinc-800 rounded-lg border-2 border-zinc-700 p-5 backdrop-blur-sm shadow-xl">
              <Calendar events={events}/>
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="space-y-3">

            {/* Quick Stats */}
            <div className="space-y-2">
              <EventStats />
            </div>
            <QuickTip text="Click on any day in the calendar to create or view events for that day. Color-coded priorities help you stay organized!"/>
          </div>
          </div>
        </section>
      </div>
    </div>
  );
}
