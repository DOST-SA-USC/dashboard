'use client';

import { Save } from 'lucide-react';
import React, { useEffect } from 'react';
import { FieldErrors, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
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
  FormDescription,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  MultiSelect,
  MultiSelectContent,
  MultiSelectGroup,
  MultiSelectItem,
  MultiSelectTrigger,
  MultiSelectValue,
} from '@/components/ui/multi-select';
import { Textarea } from '@/components/ui/textarea';
import { EVENT_TYPE_OPTIONS } from '@/data/core';
import { createEvent } from '@/lib/db/events';
import { useUserStore } from '@/stores/userStore';
import { zodResolver } from '@hookform/resolvers/zod';

import { ActionAlert } from '../ui';

import type { DateSelectArg } from '@fullcalendar/core';
import type { EventType } from '@/type';

import { capitalizeFirstLetter } from '@/lib/helpers';

const eventSchema = z
  .object({
    title: z.string().min(1, 'Title is required'),
    type: z
      .array(z.enum(EVENT_TYPE_OPTIONS))
      .min(1, 'Select at least one type'),
    description: z.string().min(1, 'Description is required'),
    start: z.string().min(1, 'Start date is required'),
    end: z.string().optional(),
  })
  .refine((data) => !data.end || new Date(data.end) >= new Date(data.start), {
    message: 'End date must not be before start date',
    path: ['end'],
  })
  .refine((data) => !(data.type.length > 1 && data.type.includes('holiday')), {
    message: 'Holiday cannot be selected with other types',
    path: ['type'],
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
      toast.error('You are not authorized to post events.');
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
    <Dialog open={props.open} onOpenChange={() => null}>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>New Event</DialogTitle>
          <DialogDescription className="sr-only">
            Create a new event.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form className="flex w-full flex-col gap-2">
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
                <FormItem>
                  <FormLabel>Event Type</FormLabel>

                  <MultiSelect
                    onValuesChange={field.onChange}
                    values={field.value}
                  >
                    <FormControl>
                      <MultiSelectTrigger className="w-full">
                        <MultiSelectValue placeholder="Select type" />
                      </MultiSelectTrigger>
                    </FormControl>

                    <MultiSelectContent search={false}>
                      <MultiSelectGroup>
                        {EVENT_TYPE_OPTIONS.map((option) => (
                          <MultiSelectItem key={option} value={option}>
                            {capitalizeFirstLetter(option)}
                          </MultiSelectItem>
                        ))}
                      </MultiSelectGroup>
                    </MultiSelectContent>
                  </MultiSelect>
                  <FormDescription>
                    Note: Holiday cannot be selected with other types.
                  </FormDescription>
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
          <ActionAlert
            button={{
              label: 'Close',
              variant: 'outline',
              onClick: () => props.onOpenChange(false),
            }}
            body={{
              title: 'Close',
              description: 'Are you sure you want to close?',
            }}
          />
          <ActionAlert
            button={{
              label: 'Save',
              variant: 'default',
              onClick: () => form.handleSubmit(onSubmit, onError)(),
              disable: !form.formState.isValid || form.formState.isSubmitting,
              icon: Save,
            }}
            body={{
              title: 'Save Event',
              description: 'Are you sure you want to save the event details?',
            }}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default New;
