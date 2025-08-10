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
