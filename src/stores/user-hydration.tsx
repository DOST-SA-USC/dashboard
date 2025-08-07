'use client';

import { useEffect } from 'react';

import { useUserStore } from '@/stores/userStore';

import type { UserType } from '@/type';

export function UserHydration(props: { user: UserType | null }) {
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    if (props.user) setUser(props.user);
  }, [props.user, setUser]);

  return null; // just hydrates Zustand, doesn't render anything
}
