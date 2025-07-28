'use client';
import React, { useState } from 'react';
import { LogOut, IdCardLanyard, Settings } from 'lucide-react';
import { signOut } from '@/lib/db/auth';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import ScholarIDModal from '../scholar-id';
import SettingsModal from '../settings';

export function UserComponent({
  user,
}: {
  user: {
    name: string;
    email: string;
  };
}) {
  const [openIDModal, setOpenIDModal] = useState(false);
  const [openSettingsModal, setOpenSettingsModal] = useState(false);

  function getUserInitials(name: string) {
    if (!name) return '';
    const parts = name.trim().split(' ');
    if (parts.length === 1) {
      return parts[0].slice(0, 2).toUpperCase();
    }
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }

  return (
    <>
      <ScholarIDModal open={openIDModal} onOpenChange={setOpenIDModal} />
      <SettingsModal
        open={openSettingsModal}
        onOpenChange={setOpenSettingsModal}
      />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="h-8 w-8 rounded-lg">
            <AvatarFallback className="bg-accent rounded-lg">
              {getUserInitials(user.name)}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
          side="bottom"
          align="end"
          sideOffset={4}
        >
          <DropdownMenuLabel className="p-0 font-normal">
            <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarFallback className="rounded-lg">
                  {getUserInitials(user.name)}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user.name}</span>
                <span className="truncate text-xs">{user.email}</span>
              </div>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setOpenIDModal(true)}>
            <IdCardLanyard />
            Scholar ID
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpenSettingsModal(true)}>
            <Settings />
            Account Settings
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={signOut}>
            <LogOut />
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
