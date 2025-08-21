'use client';

import { Ellipsis, Pencil, Trash } from 'lucide-react';
import React from 'react';
// import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { useUserStore } from '@/stores/userStore';

const Actions = (props: { resourceID: string }) => {
  const { user } = useUserStore();

  if (!user || user.role === 'student') return null;

  const handleDelete = async () => {
    if (!user || user.role === 'student') return;
    console.log('Deleting: ', props.resourceID);
  };

  const handleEdit = async () => {
    if (!user || user.role === 'student') return;
    console.log('Editing: ', props.resourceID);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm">
          <Ellipsis />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" side="right">
        <DropdownMenuItem onClick={handleEdit}>
          <Pencil className="size-4" />
          Edit
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive" onClick={handleDelete}>
          <Trash className="size-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Actions;
