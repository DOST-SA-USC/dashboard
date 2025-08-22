import {
  Home,
  Mail,
  Calendar,
  BookOpen,
  IdCardLanyard,
  Ellipsis,
  Hammer,
  Wallet,
  // UsersRound,
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
      notAllowed: [],
    },
    {
      title: 'Stipend',
      href: '/dashboard/stipend',
      icon: Wallet,
      notAllowed: [],
    },
    {
      title: 'Scholar ID',
      href: '/dashboard/id',
      icon: IdCardLanyard,
      notAllowed: ['faculty'],
    },
    {
      title: 'Announcements',
      href: '/dashboard/announcements',
      icon: Mail,
      notAllowed: [],
    },
    {
      title: 'Calendar',
      href: '/dashboard/calendar',
      icon: Calendar,
      notAllowed: [],
    },
    {
      title: 'Tools',
      href: '/dashboard/tools',
      icon: Hammer,
      notAllowed: ['student'],
    },
    {
      title: 'Resources',
      href: '/dashboard/resources',
      icon: BookOpen,
      notAllowed: [],
    },
    // {
    //   title: 'Officers',
    //   href: '/dashboard/officers',
    //   icon: UsersRound,
    //   notAllowed: [],
    // },
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
