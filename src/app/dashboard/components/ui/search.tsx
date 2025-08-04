'use client';

import React, { useState } from 'react';
import Link from 'next/link';

import { Menu } from 'lucide-react';
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

const SearchComponent = (props: {
  data: {
    brand: {
      name: string;
      logo: string;
      alt: string;
      fallback: string;
      href: string;
    };
    menu: {
      title: string;
      href: string;
    }[];
    resources: {
      title: string;
      items: {
        title: string;
        href: string;
        description: string;
      }[];
    };
  };
}) => {
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
                    <Link href={item.href} className="flex items-center gap-2">
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
                      className="flex flex-col items-start"
                    >
                      <span className="flex items-center gap-2">
                        {item.title}
                      </span>
                      <span className="text-muted-foreground text-xs">
                        {item.description}
                      </span>
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
