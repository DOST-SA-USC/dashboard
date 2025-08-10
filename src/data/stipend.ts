import { Hash, CloudSun } from 'lucide-react';

export const STIPEND_OVERVIEW = [
  {
    title: 'Monthly Stipend',
    description: 'Awaiting Approval',
    icon: Hash,
  },
  {
    title: 'Stipend Forecast',
    description: 'Expected release window',
    icon: CloudSun,
  },
];

export const STIPEND_DETAILS = {
  note: 'Note: Stipend update will be periodically updated (7–15 days).',
  resources: [
    { label: 'Stipend Guide', href: '#', disabled: true },
    { label: 'FAQ', href: '#', disabled: true },
    { label: 'Contact HR', href: '#', disabled: false },
  ],
};
