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
  more: {
    title: 'DBM Notice of Cash Allocation (NCA)',
    link: 'https://www.dbm.gov.ph/index.php/notice-of-cash-allocation-nca-listing',
    content: {
      text: 'You may check if Region 7 is allocated with funds by:',
      steps: [
        'CTRL + F',
        "Search 'DOST-SEI Scholarship'",
        "Check column under Operating Unit as 'Regional Office - VII'",
        'If recently issued, expect to receive within 1-3 days',
      ],
    },
  },
};
