import { Calendar, Megaphone, PhilippinePeso } from 'lucide-react';
import React from 'react';

import OverviewCard from '@/components/dashboard/home/overview-card';
import Statistics from '@/components/dashboard/home/statistics';

import HomeHeader from '../../components/dashboard/home/home-header';

export default async function Dashboard() {
  return (
    <>
      <HomeHeader />

      <hr />

      <div className="grid grid-cols-2 grid-rows-2 gap-4 lg:grid-cols-4 lg:grid-rows-1">
        <OverviewCard
          title="Stipend Status"
          value="Mid-Late July"
          description="Awaiting Approval"
          icon={PhilippinePeso}
          className="col-span-2"
        />
        <OverviewCard
          title="Announcements"
          value="12"
          description="Today"
          icon={Megaphone}
          className="row-span-1"
        />
        <OverviewCard
          title="Events"
          value="8"
          description="This week"
          icon={Calendar}
          className="row-span-1"
        />
      </div>

      <Statistics />
    </>
  );
}
