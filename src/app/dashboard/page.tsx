import React from 'react';
import OverviewCard from '@/components/dashboard/overview-card';

import { Bell, Calendar, DollarSign } from 'lucide-react';

export default async function Dashboard() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <h1 className="text-xl font-bold sm:text-2xl md:text-3xl">Dashboard</h1>
      <div className="grid grid-cols-2 grid-rows-2 gap-4 lg:grid-cols-3 lg:grid-rows-1">
        <OverviewCard
          title="New Announcements"
          value="12"
          description="+3 from yesterday"
          icon={Bell}
          className="row-span-1"
        />
        <OverviewCard
          title="Upcoming Events"
          value="8"
          description="This week"
          icon={Calendar}
          className="row-span-1"
        />
        <OverviewCard
          title="Stipend Status"
          value="Pending"
          description="Awaiting approval"
          icon={DollarSign}
          className="col-span-2 lg:col-span-1"
        />
      </div>
      <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" />
    </div>
  );
}
