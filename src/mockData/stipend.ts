import { CloudSunRain, Hash } from 'lucide-react';

const STIPEND_DATA = {
  title: 'Stipend Update',
  description: 'Summer Term (A.Y. 2024–2025)',
  monthlyStipend: {
    title: 'Monthly Stipend',
    value: '0/2',
    description: 'Awaiting Approval',
    icon: Hash,
  },
  stipendForecast: {
    title: 'Stipend Forecast',
    value: 'Mid-Late July',
    description: 'Expected release date',
    icon: CloudSunRain,
  },
  updateBy: 'Ms. Micah Eliah Contratista',
  position: 'DOST Project Coordinator III',
  date: '16 April 2025',
  remarks: [
    'April–May 2025 stipend received.',
    'Breakdown: 16,000 (8,000 x 2)',
    'USC will continue to process until Summer Term. (Starting next A.Y., SEI will be the one who processes the monthly stipend)',
  ],
};

const DBM_DATA = {
  title: 'DBM Notice of Cash Allocation',
  description: 'You may check if Region 7 is allocated with funds by:',
  link: 'https://www.dbm.gov.ph/index.php/notice-of-cash-allocation-nca-listing',
  steps: [
    'Press Ctrl + F',
    'Search "DOST-SEI Scholarship"',
    'Check column under Operating Unit as "Regional Office -VII"',
    'If recently issued, expect to receive within 1–3 days',
  ],
};

export { STIPEND_DATA, DBM_DATA };
