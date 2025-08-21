export const TABS = [
  {
    value: 'guides',
    smLabel: 'Guides',
    lgLabel: 'Guides & Tutorials',
    studentsNotAllowed: false,
  },
  {
    value: 'links',
    smLabel: 'Links',
    lgLabel: 'Links & Resources',
    studentsNotAllowed: false,
  },

  {
    value: 'officer',
    smLabel: 'Officer',
    lgLabel: 'Officer',
    studentsNotAllowed: true,
  },
];

export const RESOURCES_MOCK: Record<
  string,
  Array<{ title: string; description: string; icon: string }>
> = {
  guides: [
    {
      title: 'Getting Started Guide',
      description:
        'Learn how to begin using the DSU Tracker with this step-by-step guide.',
      icon: '📘',
    },
    {
      title: 'Advanced Tips',
      description: 'Unlock advanced features and customization options.',
      icon: '📙',
    },
  ],
  links: [
    {
      title: 'Official Website',
      description: 'Visit the DSU official website for more information.',
      icon: '🔗',
    },
    {
      title: 'Support Forum',
      description: 'Join the community forum for help and discussions.',
      icon: '🌐',
    },
  ],
  documents: [
    {
      title: 'User Manual',
      description: 'Comprehensive documentation for all features.',
      icon: '📄',
    },
    {
      title: 'Release Notes',
      description: 'Read about the latest updates and changes.',
      icon: '📰',
    },
  ],
  officer: [
    {
      title: 'Admin Tools',
      description: 'Access officer-specific management tools.',
      icon: '🛠️',
    },
    {
      title: 'Confidential Reports',
      description: 'View and manage confidential documents.',
      icon: '🔒',
    },
  ],
};
