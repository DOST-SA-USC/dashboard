import {
  Home,
  Megaphone,
  Calendar,
  BookOpen,
  IdCardLanyard,
  PhilippinePeso,
} from 'lucide-react';

export const brandData = {
  title: 'DOST SA USC',
  subtitle: 'Organization Tracker',
  logo: '/logo.png',
  alt: 'DOST SA USC Logo',
  fallback: 'DSU',
  href: '/dashboard',
};

export const navData = {
  menu: [
    { title: 'Home', href: '/dashboard', icon: Home },
    { title: 'Stipend', href: '/dashboard/stipend', icon: PhilippinePeso },
    { title: 'Scholar ID', href: '/dashboard/id', icon: IdCardLanyard },
    {
      title: 'Announcements',
      href: '/dashboard/announcements',
      icon: Megaphone,
    },
    {
      title: 'Calendar',
      href: '/dashboard/calendar',
      icon: Calendar,
    },
  ],
  resources: {
    title: 'Resources',
    icon: BookOpen,
    items: [
      {
        title: 'JLSS Application Guide',
        href: '#',
        description: 'magna incididunt minim occaecat adipisicing',
      },
      {
        title: 'Set Up iAccess',
        href: '#',
        description: 'magna incididunt minim occaecat adipisicing',
      },
      {
        title: 'Travel Clearance Guide',
        href: '#',
        description: 'magna incididunt minim occaecat adipisicing',
      },
    ],
  },
};

export type NavDataType = typeof navData;
