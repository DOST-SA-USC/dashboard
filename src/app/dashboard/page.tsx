import React from 'react';
import OverviewCard from '@/components/dashboard/overview-card';
import { Bell, Calendar } from 'lucide-react';
import PageCard from '@/components/dashboard/PageCard';
import AnnouncementItem from '@/components/dashboard/announcement-item';
import EventItem from '@/components/dashboard/event-item';
import StipendComponent from './components/stipend-component';

import type { AnnouncementType, EventType } from '@/type';

const recentAnnouncements: AnnouncementType[] = [
  {
    type: 'officer',
    priority: 'low',
    date: '2023-10-01',
    title: 'Student Council Meeting',
    content:
      'The next student council meeting will be held on October 5th at 3:00 PM in Room 204. All representatives are required to attend.',
  },
  {
    type: 'faculty',
    priority: 'urgent',
    date: '2023-10-02',
    title: 'Class Suspension Notice',
    content:
      'All classes are suspended on October 6th due to scheduled maintenance of school facilities. Please check your emails for further updates.',
  },
  {
    type: 'officer',
    priority: 'urgent',
    date: '2023-10-03',
    title: 'Scholarship Application Deadline',
    content:
      'The deadline for submitting scholarship applications is October 10th. Submit all required documents to the registrar’s office.',
  },
  {
    type: 'facebook',
    priority: 'low',
    date: '2023-10-04',
    title: 'Campus Clean-Up Drive',
    content:
      'Join us for the campus clean-up drive this Saturday at 8:00 AM. Volunteers will receive certificates of participation.',
  },
];

const upcomingEvents: EventType[] = [
  {
    title: 'Science Fair',
    type: ['scientia', 'virtus'],
    startDate: '2023-10-15',
    endDate: '2023-10-16',
  },
  {
    title: 'Cultural Festival',
    type: ['virtus', 'devotio'],
    startDate: '2023-10-20',
    endDate: '2023-10-22',
  },
  {
    title: 'Charity Run',
    type: ['devotio'],
    startDate: '2023-10-25',
  },
];

export default async function Dashboard() {
  function annoucements() {
    return recentAnnouncements
      .slice()
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 3);
  }

  function events() {
    return upcomingEvents
      .slice()
      .sort(
        (a, b) =>
          new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
      )
      .slice(0, 3);
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
            {annoucements().map((announcement, index) => (
              <AnnouncementItem key={index} announcement={announcement} />
            ))}
          </div>
        </PageCard>
        <PageCard
          title="Upcoming Events"
          description="Don't miss out on important events"
          link="/dashboard/events"
        >
          <div className="space-y-2 md:space-y-4">
            {events().map((event, index) => (
              <EventItem key={index} event={event} />
            ))}
          </div>
        </PageCard>
      </div>
    </div>
  );
}
