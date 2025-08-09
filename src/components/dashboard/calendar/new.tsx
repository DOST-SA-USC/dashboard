'use client';

import { Save } from 'lucide-react';
import React, { useEffect } from 'react';
import { FieldErrors, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { createEvent } from '@/lib/db/events';
import { zodResolver } from '@hookform/resolvers/zod';

import type { DateSelectArg } from '@fullcalendar/core';
import { useUserStore } from '@/stores/userStore';
import type { EventType } from '@/type';

const OPTIONS = ['scientia', 'virtus', 'devotio'] as const;

const eventSchema = z
  .object({
    title: z.string().min(1, 'Title is required'),
    type: z.array(z.enum(OPTIONS)).min(1, 'Select at least one type'),
    description: z.string().min(1, 'Description is required'),
    start: z.string().min(1, 'Start date is required'),
    end: z.string().optional(),
  })
  .refine((data) => !data.end || new Date(data.end) >= new Date(data.start), {
    message: 'End date must not be before start date',
    path: ['end'],
  });

type EventForm = z.infer<typeof eventSchema>;

const New = (props: {
  info: DateSelectArg | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  setEvents: React.Dispatch<React.SetStateAction<EventType[]>>;
}) => {
  const { user } = useUserStore();

  const form = useForm<EventForm>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      title: '',
      type: [],
      description: '',
      start: '',
      end: '',
    },
  });

  useEffect(() => {
    if (props.info) {
      form.reset({
        title: '',
        type: [],
        description: '',
        start: props.info.startStr,
        end: props.info.end
          ? new Date(new Date(props.info.end).getTime() - 24 * 60 * 1000) // minus -1 day
              .toISOString()
              .slice(0, 10)
          : '',
      });
    }
  }, [props.info, form]);

  const onSubmit = (data: EventForm) => {
    if (!user || user?.role === 'student') {
      console.error('You are not authorized to post announcements.');
      return;
    }

    // handle form submission here
    const body: EventType = {
      title: data.title,
      type: data.type as EventType['type'],
      description: data.description,
      startDate: data.start as EventType['startDate'],
      endDate: data.end ? (data.end as EventType['endDate']) : undefined,
      authorID: user.userId,
      authorName: `${user.firstName} ${user.lastName}`,
      authorPosition: user.position || 'N/A',
      authorImageURL: user.image as string,
    };

    toast.promise(createEvent(body), {
      loading: 'Creating event...',
      success: (data) => {
        props.setEvents((prev) => [...prev, { id: data, ...body }]);
        return 'Event created successfully!';
      },
      error: (err) => err.message,
    });

    props.onOpenChange(false);

    form.reset();
  };

  function onError(error: FieldErrors) {
    Object.values(error).forEach((err) => {
      if (err && typeof err === 'object' && 'message' in err && err.message) {
        toast.error(err.message as string);
      }
    });
  }

  return (
    <Dialog open={props.open} onOpenChange={props.onOpenChange}>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>New Event</DialogTitle>
          <DialogDescription className="sr-only">
            Create a new event.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            id="new-event-form"
            onSubmit={(e) => form.handleSubmit(onSubmit, onError)(e)}
            className="flex w-full flex-col gap-2"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Event Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Event Title" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem className="my-2">
                  <FormLabel>Event Type</FormLabel>
                  <FormControl>
                    <div className="flex w-full flex-wrap items-center gap-4">
                      {OPTIONS.map((option) => (
                        <div key={option} className="flex items-center gap-2">
                          <Checkbox
                            id={option}
                            checked={field.value?.includes(option)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                field.onChange([
                                  ...(field.value || []),
                                  option,
                                ]);
                              } else {
                                field.onChange(
                                  field.value?.filter(
                                    (v: string) => v !== option
                                  )
                                );
                              }
                            }}
                          />
                          <Label htmlFor={option}>{option}</Label>
                        </div>
                      ))}
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Event Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Event Description" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="flex w-full items-center justify-between gap-4">
              <FormField
                control={form.control}
                name="start"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Start Date</FormLabel>
                    <FormControl>
                      <Input type="date" className="w-full" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="end"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>End Date</FormLabel>
                    <FormControl>
                      <Input type="date" className="w-full" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </form>
        </Form>
        <DialogFooter>
          <Button
            variant="outline"
            type="button"
            onClick={() => {
              props.onOpenChange(false);
            }}
          >
            Close
          </Button>
          <Button form="new-event-form" type="submit">
            <Save />
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default New;
