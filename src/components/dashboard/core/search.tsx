'use client';

import { Menu } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { useUserStore } from '@/stores/userStore';

import type { NavDataType } from '@/data/core';

const SearchComponent = (props: { data: NavDataType }) => {
  const { user } = useUserStore();
  const [open, setOpen] = useState(false);

  if (!user) return null;

  const navItems = props.data.menu.filter((item) => {
    return !item.notAllowed?.includes(user.role);
  });

  return (
    <>
      <Button
        className="md:hidden"
        variant="outline"
        size="icon"
        onClick={() => setOpen(true)}
      >
        <Menu className="size-4" />
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <Command>
          <CommandInput placeholder="Search..." autoFocus={false} />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Main Navigation">
              {navItems.map((item) => {
                return (
                  <CommandItem key={item.title} asChild>
                    <Link
                      onClick={() => setOpen(false)}
                      href={item.href}
                      className="flex items-center gap-2"
                    >
                      {item.title}
                    </Link>
                  </CommandItem>
                );
              })}
            </CommandGroup>

            <CommandGroup heading="More">
              {props.data.socials.items.map((item) => {
                return (
                  <CommandItem key={item.title} asChild>
                    <Link
                      onClick={() => setOpen(false)}
                      href={item.href}
                      className="flex items-center gap-2"
                      target="_blank"
                    >
                      {item.title}
                    </Link>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  );
};

export default SearchComponent;
