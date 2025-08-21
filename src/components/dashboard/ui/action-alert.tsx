'use client';

import { LucideIcon } from 'lucide-react';
import React from 'react';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

import { Button } from '../../ui/button';

const ActionAlert = (props: {
  button: {
    label: string;
    onClick: () => void;
    icon?: LucideIcon;
    variant?: 'default' | 'destructive' | 'outline' | 'ghost';
    disable?: boolean;
    className?: string;
    size?: 'default' | 'sm' | 'lg' | 'icon' | null | undefined;
  };
  body: {
    title: string;
    description: string;
    variant?: 'default' | 'destructive' | 'outline';
  };
}) => {
  const buttonVariant = props.button.variant ?? 'outline';

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          disabled={props.button.disable}
          variant={buttonVariant}
          className={props.button.className}
          size={props.button.size}
        >
          {props.button.icon && <props.button.icon />} {props.button.label}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{props.body.title}</AlertDialogTitle>
          <AlertDialogDescription>
            {props.body.description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              variant={
                buttonVariant === 'outline'
                  ? (props.body.variant ?? 'default')
                  : buttonVariant
              }
              onClick={props.button.onClick}
            >
              {props.button.icon && <props.button.icon />} {props.button.label}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ActionAlert;
