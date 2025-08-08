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
  CommandSeparator,
} from '@/components/ui/command';

import type { NavDataType } from './component-data';

const SearchComponent = (props: { data: NavDataType }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button
        className="lg:hidden"
        variant="outline"
        size="icon"
        onClick={() => setOpen(true)}
      >
        <Menu className="size-4" />
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <Command>
          <CommandInput placeholder="Search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Main Navigation">
              {props.data.menu.map((item) => {
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
            <CommandSeparator />

            <CommandGroup heading="Resources">
              {props.data.resources.items.map((item) => {
                return (
                  <CommandItem key={item.title} asChild>
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="flex flex-col items-start"
                    >
                      <span className="flex items-center gap-2">
                        {item.title}
                      </span>
                      <span className="text-xs">{item.description}</span>
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
