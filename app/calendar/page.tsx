import Calendar from "../components/ui/Calendar/Calendar";
import QuickTip from "../components/ui/QuickTip/QuickTip";
import { event } from "@/app/db";

export default function CalendarPage() {
  // Get upcoming events (next 5 events)
  const upcomingEvents = event
    .sort((a, b) => a.time.getTime() - b.time.getTime())
    .slice(0, 5);

  // Get priority color
  const getPriorityColor = (priority: string) => {
    switch(priority) {
      case 'high': return 'bg-red-900/30 border-red-700 text-red-300';
      case 'medium': return 'bg-yellow-900/30 border-yellow-700 text-yellow-300';
      case 'low': return 'bg-green-900/30 border-green-700 text-green-300';
      default: return 'bg-zinc-800 border-zinc-600 text-gray-300';
    }
  };

  // Get priority icon
  const getPriorityIcon = (priority: string) => {
    switch(priority) {
      case 'high': return '🔴';
      case 'medium': return '🟡';
      case 'low': return '🟢';
      default: return '⚪';
    }
  };

  return (
    <div className="p-4 overflow-y-auto">
      <section className="flex flex-col justify-center items-center gap-4">
        {/* Header */}
        <div className="w-full max-w-7xl">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-blue-900/30 rounded-xl p-3 border border-blue-700/50">
              <svg className="w-8 h-8 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zm-5-7h4v4h-4z"/>
              </svg>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white">Calendar & Events</h1>
              <p className="text-sm text-gray-400 mt-1">Manage your events, appointments and schedule</p>
            </div>
          </div>
          </div>

        <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="flex flex-col gap-3 lg:col-span-2">
            {/* Calendar */}
            <div className="bg-zinc-800 rounded-lg border-2 border-zinc-700 p-5 backdrop-blur-sm shadow-xl">
              <Calendar/>
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="space-y-3">

            {/* Quick Stats */}
            <div className="space-y-2">
              {/* High Priority */}
              <div className="bg-zinc-800 rounded-lg border-2 border-zinc-700 p-3 backdrop-blur-sm hover:border-red-700/50 transition-colors group">
                <div className="flex items-center gap-2 mb-2">
                  <div className="bg-red-900/30 rounded-full p-2 border border-red-700/50 group-hover:bg-red-900/50 transition-colors">
                    <svg className="w-4 h-4 text-red-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
                    </svg>
                  </div>
                  <span className="text-xs font-semibold text-gray-300">High Priority</span>
                </div>
                <p className="text-2xl font-bold text-red-400">
                  {event.filter(e => e.prio === 'high').length}
                </p>
              </div>

              {/* Medium Priority */}
              <div className="bg-zinc-800 rounded-lg border-2 border-zinc-700 p-3 backdrop-blur-sm hover:border-yellow-700/50 transition-colors group">
                <div className="flex items-center gap-2 mb-2">
                  <div className="bg-yellow-900/30 rounded-full p-2 border border-yellow-700/50 group-hover:bg-yellow-900/50 transition-colors">
                    <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                    </svg>
                  </div>
                  <span className="text-xs font-semibold text-gray-300">Medium Priority</span>
                </div>
                <p className="text-2xl font-bold text-yellow-400">
                  {event.filter(e => e.prio === 'medium').length}
                </p>
              </div>

              {/* Low Priority */}
              <div className="bg-zinc-800 rounded-lg border-2 border-zinc-700 p-3 backdrop-blur-sm hover:border-green-700/50 transition-colors group">
                <div className="flex items-center gap-2 mb-2">
                  <div className="bg-green-900/30 rounded-full p-2 border border-green-700/50 group-hover:bg-green-900/50 transition-colors">
                    <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
                    </svg>
                  </div>
                  <span className="text-xs font-semibold text-gray-300">Low Priority</span>
                </div>
                <p className="text-2xl font-bold text-green-400">
                  {event.filter(e => e.prio === 'low').length}
                </p>
              </div>

              {/* Total Events */}
              <div className="bg-zinc-800 rounded-lg border-2 border-zinc-700 p-3 backdrop-blur-sm hover:border-blue-700/50 transition-colors group">
                <div className="flex items-center gap-2 mb-2">
                  <div className="bg-blue-900/30 rounded-full p-2 border border-blue-700/50 group-hover:bg-blue-900/50 transition-colors">
                    <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z"/>
                    </svg>
                  </div>
                  <span className="text-xs font-semibold text-gray-300">Total Events</span>
                </div>
                <p className="text-2xl font-bold text-blue-400">{event.length}</p>
              </div>
            </div>
            <QuickTip text="Click on any day in the calendar to create or view events for that day. Color-coded priorities help you stay organized!" />
          </div>
        </div>
      </section>
    </div>
  );
}
