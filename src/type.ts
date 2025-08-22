import type { Content } from '@tiptap/react';

type UserRoles = 'admin' | 'staff' | 'officer' | 'student';

interface AuthorType {
  authorID: string;
  authorName: string;
  authorPosition: string;
  authorImageURL: string;
}

interface FormType {
  uscID?: string;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  suffix?: string;
  image?: File | string; // File for upload, string for URL
  program?: string;
  yearLevel?: string;
  yearOfAward?: string;
  scholarshipType?: string;
  emergencyContact?: string;
  emergencyContactNumber?: string;
}

interface UserType extends Required<FormType> {
  userId: string;
  role: UserRoles;
  position?: string;
  createdAt: Date;
  updatedAt: Date;
}

type TimestampString =
  `${number}-${number}-${number}T${number}:${number}:${number}Z`; // e.g., '2024-06-01T12:34:56Z'

interface AnnouncementType extends AuthorType {
  id: string;
  type: 'officer' | 'staff';
  urgent: boolean;
  title: string;
  content: Content;
  createdAt: string | Date;
}

interface EventType extends AuthorType {
  id?: string;
  title: string;
  type: Array<'scientia' | 'virtus' | 'devotio'>;
  description: string;
  startDate: TimestampString;
  endDate?: TimestampString;
}

interface StipendType extends AuthorType {
  id?: string;
  monthly: string;
  forecast: string;
  remarks: string[];
  createdAt?: string | Date;
}

export type {
  FormType,
  UserRoles,
  AnnouncementType,
  EventType,
  TimestampString,
  UserType,
  AuthorType,
  StipendType,
};
