'use client';

import AllEventsTemplate from '@/app/components/AllEventsTemplate/AllEventsTemplate';

export default function Dashboard() {
  return (
    <section className="flex flex-col justify-center items-center gap-6 h-200">
      <h1 className="text-3xl font-bold  text-white ">Welcome to the CRM Dashboard</h1>
      <AllEventsTemplate/>
    </section>
  );
}
