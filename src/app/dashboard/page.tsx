import React from 'react';
import OverviewCard from '@/components/dashboard/overview-card';
import { Bell, Calendar } from 'lucide-react';
import PageCard from '@/components/dashboard/PageCard';
import AnnouncementItem from '@/components/dashboard/announcement-item';
import EventItem from '@/components/dashboard/event-item';
import StipendComponent from './components/stipend-component';

import type { AnnouncementType, EventType } from '@/type';

import EVENTS_DATA from '@/mockData/events.json';
import ANNOUNCEMENTS_DATA from '@/mockData/announcements.json';

export default async function Dashboard() {
  function getRecentAnnouncements() {
    // get the top 3 recent announcements
    const recentAnnouncements: AnnouncementType[] =
      ANNOUNCEMENTS_DATA as AnnouncementType[];

    return recentAnnouncements
      .slice()
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
      .slice(0, 3);
  }

  function getUpcomingEvents() {
    // get the top 4 upcoming events
    const upcomingEvents: EventType[] = EVENTS_DATA as EventType[];
    return upcomingEvents
      .slice()
      .sort(
        (a, b) =>
          new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
      )
      .slice(0, 4);
  }

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <h1 className="text-xl font-bold sm:text-2xl md:text-3xl">Dashboard</h1>
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
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <PageCard
          title="Recent Announcements"
          description="Stay updated with the latest news and updates"
          link="/dashboard/announcements"
        >
          <div className="space-y-2 md:space-y-4">
            {getRecentAnnouncements().map((announcement, index) => (
              <AnnouncementItem key={index} announcement={announcement} />
            ))}
          </div>
        </PageCard>
        <PageCard
          title="Upcoming Events"
          description="Don't miss out on important events"
          link="/dashboard/calendar"
        >
          <div className="space-y-2 md:space-y-4">
            {getUpcomingEvents().map((event, index) => (
              <EventItem key={index} event={event} />
            ))}
          </div>
        </PageCard>
      </div>
    </div>
  );
}
