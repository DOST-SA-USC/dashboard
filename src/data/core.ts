import {
  Home,
  Megaphone,
  Calendar,
  BookOpen,
  IdCardLanyard,
  PhilippinePeso,
  Ellipsis,
} from 'lucide-react';

import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  GithubIcon,
} from '../components/dashboard/ui/icons';

export const BRAND_DATA = {
  title: 'DOST SA USC',
  subtitle: 'Organization Tracker',
  logo: '/logo.png',
  alt: 'DOST SA USC Logo',
  fallback: 'DSU',
  href: '/dashboard',
};

export const NAV_DATA = {
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
    href: '#',
  },
  socials: {
    title: 'Socials',
    icon: Ellipsis,
    items: [
      { title: 'Facebook', href: '#', icon: FacebookIcon },
      { title: 'Instagram', href: '#', icon: InstagramIcon },
      { title: 'LinkedIn', href: '#', icon: LinkedinIcon },
      { title: 'GitHub', href: '#', icon: GithubIcon },
    ],
  },
};

export type NavDataType = typeof NAV_DATA;

export const EVENT_TYPE_OPTIONS = ['scientia', 'virtus', 'devotio'];
