import { FileUser, ShieldUser, Contact, ContactRound } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

import type { UserRoles } from '@/type';

export default function RoleBadge({ role }: { role: UserRoles }) {
  const icons = {
    admin: <ShieldUser className="size-4" />,
    faculty: <ContactRound className="size-4" />,
    officer: <Contact className="size-4" />,
    student: <FileUser className="size-4" />,
  };

  const colors = {
    student: 'bg-chart-2/30 text-chart-2 border-chart-2',
    admin: 'bg-chart-1/30 text-chart-1 border-chart-1',
    faculty: 'bg-chart-3/30 text-chart-3 border-chart-3',
    officer: 'bg-chart-4/30 text-chart-4 border-chart-4',
  };

  return (
    <Badge className={`flex items-center gap-1.5 border ${colors[role]}`}>
      {icons[role]}
      {role}
    </Badge>
  );
}
