'use client';
import { LogOut, Settings } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { toast } from 'sonner';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { signOut } from '@/lib/auth/client';
import { getUserInitials } from '@/lib/helpers';
import { useUserStore } from '@/stores/userStore';

import Forgot from '../login/forgot';

export default function UserComponent() {
  const router = useRouter();
  const [openChangePasswordModal, setOpenChangePasswordModal] = useState(false);

  const [isPending, setIsPending] = useState(false);

  const user = useUserStore((state) => state.user);
  if (!user || !user.uscID) return null;

  function handleSignOut() {
    setIsPending(true);
    toast.promise(signOut(), {
      loading: 'Signing out...',
      success: () => {
        router.push('/');

        setOpenChangePasswordModal(false);
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
      <Forgot
        open={openChangePasswordModal}
        setOpen={setOpenChangePasswordModal}
        body={{
          title: 'Change Password',
          description:
            'Enter your email address to receive a password reset link.',
        }}
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

          <DropdownMenuItem onClick={() => setOpenChangePasswordModal(true)}>
            <Settings />
            Change Password
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
