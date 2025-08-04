import {
  FileUser,
  ShieldUser,
  Contact,
  ContactRound,
  ThumbsUp,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

import type { UserRoles } from '@/type';

export default function RoleBadge({ role }: { role: UserRoles }) {
  const icons = {
    admin: <ShieldUser className="size-6" />,
    faculty: <ContactRound className="size-6" />,
    officer: <Contact className="size-6" />,
    student: <FileUser className="size-6" />,
    facebook: <ThumbsUp className="size-6" />,
  };

  const colors = {
    admin: 'bg-chart-1/30 text-chart-1 border-chart-1 dark:bg-chart-1/20',
    student: 'bg-chart-3/30 text-chart-3 border-chart-3 dark:bg-chart-3/20',
    faculty: 'bg-chart-2/30 text-chart-2 border-chart-2 dark:bg-chart-2/20',
    officer: 'bg-chart-4/30 text-chart-4 border-chart-4 dark:bg-chart-4/20',
    facebook: 'bg-chart-3/30 text-chart-3 border-chart-3 dark:bg-chart-3/20',
  };

  return (
    <Badge
      className={`flex items-center gap-1.5 border p-1 px-2 text-xs font-semibold ${colors[role]}`}
    >
      {icons[role]}
      {role}
    </Badge>
  );
}
