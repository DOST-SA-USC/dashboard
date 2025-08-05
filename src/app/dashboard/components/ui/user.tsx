'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { toast } from 'sonner';
import { LogOut, IdCardLanyard, Settings } from 'lucide-react';
import { signOut } from '@/lib/auth/client';

import { useUserStore } from '@/stores/userStore';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useRouter } from 'next/navigation';

import ScholarIDModal from '../scholar-id';
import SettingsModal from '../settings';

import { getUserInitials } from '@/lib/helpers';

export default function UserComponent() {
  const router = useRouter();
  const [openIDModal, setOpenIDModal] = useState(false);
  const [openSettingsModal, setOpenSettingsModal] = useState(false);

  const [isPending, setIsPending] = useState(false);

  const user = useUserStore((state) => state.user);
  if (!user || !user.uscID) return null;

  function handleSignOut() {
    setIsPending(true);
    toast.promise(signOut(), {
      loading: 'Signing out...',
      success: () => {
        router.push('/');
        setOpenIDModal(false);
        setOpenSettingsModal(false);
        return 'Signed out successfully!';
      },
      error: (error: Error) => {
        setIsPending(false);
        return error.message || 'Sign out failed';
      },
    });
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
            <Image
              src={user.image as string}
              alt={user.uscID}
              width={32}
              height={32}
            />
            <AvatarFallback className="bg-accent rounded-lg">
              {getUserInitials(`${user.firstName} ${user.lastName}`)}
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
                <Image
                  src={user.image as string}
                  alt={user.uscID}
                  width={32}
                  height={32}
                />
                <AvatarFallback className="rounded-lg">
                  {getUserInitials(`${user.firstName} ${user.lastName}`)}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">
                  {user.firstName} {user.lastName}
                </span>
                <span className="truncate text-xs">{user.uscID}</span>
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
            Account Password
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <form action={handleSignOut} className="w-full">
            <DropdownMenuItem asChild>
              <button type="submit" className="w-full" disabled={isPending}>
                <LogOut />
                Sign Out
              </button>
            </DropdownMenuItem>
          </form>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
