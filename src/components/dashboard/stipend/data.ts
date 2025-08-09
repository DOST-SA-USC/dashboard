import { Hash, CloudSun } from 'lucide-react';

export const STIPEND_OVERVIEW = [
  {
    title: 'Monthly Stipend',
    value: '0/2',
    description: 'Awaiting Approval',
    icon: Hash,
  },
  {
    title: 'Stipend Forecast',
    value: 'Mid-Late July',
    description: 'Expected release window',
    icon: CloudSun,
  },
];

export const STIPEND_DETAILS = {
  author: {
    name: 'John Doe',
    role: 'Software Engineer',
    initials: 'JD',
    timeAgo: '5 mins ago',
  },
  remarks: [
    'Stipend will be processed within 5-7 business days.',
    'For any queries, contact HR.',
    'Ensure all documents are submitted on time.',
    'Keep track of your application status.',
  ],
  note: 'Note: Stipend update will be periodically updated (7–15 days).',
  resources: [
    { label: 'Stipend Guide', href: '#', disabled: true },
    { label: 'FAQ', href: '#', disabled: true },
    { label: 'Contact HR', href: '#', disabled: false },
  ],
};
