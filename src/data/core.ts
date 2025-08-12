import {
  Home,
  Megaphone,
  Calendar,
  BookOpen,
  IdCardLanyard,
  Ellipsis,
  Hammer,
  Wallet,
} from 'lucide-react';

import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  GithubIcon,
} from '../components/dashboard/ui/icons';

export const BRAND_DATA = {
  title: 'DOST SA USC',
  subtitle: 'Global Tracker',
  logo: '/logo.png',
  alt: 'Logo',
  fallback: 'DSU',
  href: '/dashboard',
};

export const NAV_DATA = {
  menu: [
    {
      title: 'Home',
      href: '/dashboard',
      icon: Home,
      studentsNotAllowed: false,
    },
    {
      title: 'Stipend',
      href: '/dashboard/stipend',
      icon: Wallet,
      studentsNotAllowed: false,
    },
    {
      title: 'Scholar ID',
      href: '/dashboard/id',
      icon: IdCardLanyard,
      studentsNotAllowed: false,
    },
    {
      title: 'Announcements',
      href: '/dashboard/announcements',
      icon: Megaphone,
      studentsNotAllowed: false,
    },
    {
      title: 'Calendar',
      href: '/dashboard/calendar',
      icon: Calendar,
      studentsNotAllowed: false,
    },
    {
      title: 'Tools',
      href: '/dashboard/tools',
      icon: Hammer,
      studentsNotAllowed: true,
    },
    {
      title: 'Resources',
      href: '/dashboard/resources',
      icon: BookOpen,
      studentsNotAllowed: false,
    },
  ],
  socials: {
    title: 'More',
    icon: Ellipsis,
    items: [
      {
        title: 'Facebook',
        href: 'https://www.facebook.com/dostsausc',
        icon: FacebookIcon,
      },
      {
        title: 'Instagram',
        href: 'https://www.instagram.com/dostsausc',
        icon: InstagramIcon,
      },
      {
        title: 'LinkedIn',
        href: 'https://www.linkedin.com/company/dost-scholars-association-in-the-university-of-san-carlos/',
        icon: LinkedinIcon,
      },
      {
        title: 'GitHub',
        href: 'https://github.com/DOST-SA-USC',
        icon: GithubIcon,
      },
    ],
  },
};

export type NavDataType = typeof NAV_DATA;

export const EVENT_TYPE_OPTIONS = ['scientia', 'virtus', 'devotio'];
