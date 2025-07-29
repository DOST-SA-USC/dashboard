interface authState {
  error: boolean;
  message: string;
}

type UserRoles = 'admin' | 'faculty' | 'officer' | 'student';

interface AnnouncementType {
  type: 'officer' | 'faculty' | 'facebook';
  priority: 'low' | 'urgent';
  date: string;
  title: string;
  content: string;
}

interface EventType {
  title: string;
  type: Array<'scientia' | 'virtus' | 'devotio'>;
  startDate: string;
  endDate?: string;
}

export type { authState, UserRoles, AnnouncementType, EventType };
