import { Bell, Calendar } from 'lucide-react';
import React from 'react';

import OverviewCard from '@/components/dashboard/home/overview-card';

import StipendComponent from '../../components/dashboard/stipend/stipend-component';
import HomeHeader from '../../components/dashboard/home/home-header';

export default async function Dashboard() {
  return (
    <>
      <HomeHeader />

      <hr />

      <div className="grid grid-cols-2 grid-rows-2 gap-4 lg:grid-cols-3 lg:grid-rows-1">
        <StipendComponent className="col-span-2 lg:col-span-1" />
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
      </div>
    </>
  );
}
