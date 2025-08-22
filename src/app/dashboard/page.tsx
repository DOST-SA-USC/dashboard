import { Calendar, Megaphone, PhilippinePeso } from 'lucide-react';
import React from 'react';

import HomeHeader from '@/components/dashboard/home/home-header';
import OverviewCard from '@/components/dashboard/home/overview-card';
import Statistics from '@/components/dashboard/home/statistics';
import { getTodaysAnnouncementCount } from '@/lib/db/announcements';
import { getEventsCountThisWeek } from '@/lib/db/events';
import { getLatestStipendUpdate } from '@/lib/db/stipend';

export default async function Dashboard() {
  const [todaysAnnouncementCount, eventsCountThisWeek, latestStipendUpdate] =
    await Promise.all([
      getTodaysAnnouncementCount(),
      getEventsCountThisWeek(),
      getLatestStipendUpdate(),
    ]);

  return (
    <>
      <HomeHeader />

      <hr />

      <div className="grid grid-cols-2 grid-rows-2 gap-4 lg:grid-cols-4 lg:grid-rows-1">
        <OverviewCard
          title="Stipend Forecast"
          value={latestStipendUpdate.forecast}
          description="Expected release window"
          icon={PhilippinePeso}
          className="col-span-2"
        />
        <OverviewCard
          title="Announcements"
          value={todaysAnnouncementCount.toString()}
          description="Today"
          icon={Megaphone}
          className="row-span-1"
        />
        <OverviewCard
          title="Events"
          value={eventsCountThisWeek.toString()}
          description="This week"
          icon={Calendar}
          className="row-span-1"
        />
      </div>

      <Statistics />
    </>
  );
}
