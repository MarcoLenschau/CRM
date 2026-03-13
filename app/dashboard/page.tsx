'use client';

import AllEventsTemplate from '@/app/components/AllEventsTemplate/AllEventsTemplate';
import QuickActionsTemplate from '@/app/components/QuickActionsTemplate/QuickActionsTemplate';
import ActivityFeedTemplate from '@/app/components/ActivityFeedTemplate/ActivityFeedTemplate';

export default function Dashboard() {
  return (
    <div className="p-6 overflow-y-auto">
      <section className="flex flex-col justify-center items-center gap-6">
        <h1 className="text-3xl font-bold text-white">Welcome to CRM Dashboard</h1>
        
        <QuickActionsTemplate />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full max-w-5xl">
          <AllEventsTemplate />
          <ActivityFeedTemplate />
        </div>
      </section>
    </div>
  );
}
