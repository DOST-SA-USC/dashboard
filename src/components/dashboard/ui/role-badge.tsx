'use client';

import { Contact, ContactRound, FileUser, ShieldUser } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { useUserStore } from '@/stores/userStore';
import { UserRoles } from '@/type';

export default function RoleBadge(props: { role?: UserRoles; xs?: true }) {
  const user = useUserStore((state) => state.user);
  if (!user || !user.role) return null;

  const icons = {
    admin: ShieldUser,
    staff: ContactRound,
    officer: Contact,
    student: FileUser,
  };

  const colors = {
    admin: 'bg-chart-1/30 text-chart-1 border-chart-1 dark:bg-chart-1/20',
    student: 'bg-chart-3/30 text-chart-3 border-chart-3 dark:bg-chart-3/20',
    staff: 'bg-chart-2/30 text-chart-2 border-chart-2 dark:bg-chart-2/20',
    officer: 'bg-chart-4/30 text-chart-4 border-chart-4 dark:bg-chart-4/20',
  };

  const role = props.role ?? user.role;

  const IconElement = icons[role];

  return (
    <Badge
      className={`flex items-center border font-semibold ${colors[role]} ${props.xs ? 'gap-1 text-[8px]' : 'gap-1.5 p-1 px-2 text-xs'}`}
    >
      <IconElement className={props.xs ? 'size-4' : 'size-6'} />
      {role.toUpperCase()}
    </Badge>
  );
}
