import AllEventsTemplate from '@/app/components/AllEventsTemplate/AllEventsTemplate';
import QuickActionsTemplate from '@/app/components/QuickActionsTemplate/QuickActionsTemplate';
import ActivityFeedTemplate from '@/app/components/ActivityFeedTemplate/ActivityFeedTemplate';

/**
 * Renders the main CRM dashboard with quick actions, events, and activity feed.
 * Displays overview of key business metrics and recent activities.
 *
 * @return Dashboard page component with templates and overview
 * @category Dashboard
 * @security Protected route requiring authentication via middleware
 * @performance Server-side rendering with multiple template components
 * @author Marco Lenschau <contact@marco-lenschau.de>
 */
export default async function Dashboard() {
  return (
    <div className="p-6 overflow-y-auto">
      <section className="flex flex-col justify-center items-center gap-6">
        <h1 className="text-2xl font-bold text-white">Welcome to CRM Dashboard</h1>
        
        <QuickActionsTemplate />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full max-w-5xl">
          <AllEventsTemplate />
          <ActivityFeedTemplate />
        </div>
      </section>
    </div>
  );
}
