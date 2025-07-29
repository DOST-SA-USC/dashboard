import { FileUser, ShieldUser, Contact, ContactRound } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

import type { UserRoles } from '@/type';

export default function RoleBadge({ role }: { role: UserRoles }) {
  const icons = {
    admin: <ShieldUser className="h-4 w-4" />,
    faculty: <ContactRound className="h-4 w-4" />,
    officer: <Contact className="h-4 w-4" />,
    student: <FileUser className="h-4 w-4" />,
  };

  const colors = {
    admin: 'bg-red-700/30 text-red-700 border-red-700',
    faculty: 'bg-blue-700/30 text-blue-700 border-blue-700',
    officer: 'bg-yellow-600/30 text-yellow-600 border-yellow-600',
    student: 'bg-green-700/30 text-green-700 border-green-700',
  };

  return (
    <Badge className={`flex items-center gap-1 border ${colors[role]}`}>
      {icons[role]}
      {role.charAt(0).toUpperCase() + role.slice(1)}
    </Badge>
  );
}
