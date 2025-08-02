interface authState {
  error: boolean;
  message: string;
}

type UserRoles = 'admin' | 'faculty' | 'officer' | 'student' | 'facebook'; // facebook is not a user role, but used for announcements

type TimestampString =
  `${number}-${number}-${number}T${number}:${number}:${number}Z`; // e.g., '2024-06-01T12:34:56Z'

interface AnnouncementType {
  id: number;
  type: 'officer' | 'faculty' | 'facebook';
  priority: 'low' | 'important';
  createdAt: TimestampString;
  title: string;
  content: string;
  author: string;
}

interface EventType {
  title: string;
  type: Array<'scientia' | 'virtus' | 'devotio'>;
  description: string;
  startDate: TimestampString;
  endDate?: TimestampString;
}

export type {
  authState,
  UserRoles,
  AnnouncementType,
  EventType,
  TimestampString,
};
