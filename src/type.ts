import type { Content } from '@tiptap/react';

type UserRoles = 'admin' | 'faculty' | 'officer' | 'student';

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
  image?: File | string; // File for upload, string for URL
  program?: string;
  yearLevel?: string;
  contactNumber?: string;
  address?: string;
  birthDate?: string;
  yearOfAward?: string;
  scholarshipType?: string;
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
  type: 'officer' | 'faculty';
  urgent: boolean;
  title: string;
  content: Content;
  createdAt: string | Date;
}

interface EventType extends AuthorType {
  id: string;
  title: string;
  type: Array<'scientia' | 'virtus' | 'devotio'>;
  description: string;
  startDate: TimestampString;
  endDate?: TimestampString;
}

export type {
  FormType,
  UserRoles,
  AnnouncementType,
  EventType,
  TimestampString,
  UserType,
  AuthorType,
};
