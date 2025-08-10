'use client';

import { SquarePen } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { FieldErrors, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
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
import { Textarea } from '@/components/ui/textarea';
import { updateStipend } from '@/lib/db/stipend';
import { useUserStore } from '@/stores/userStore';
import { zodResolver } from '@hookform/resolvers/zod';

import { ActionAlert } from '../ui';

import type { StipendType } from '@/type';

const schema = z.object({
  monthly: z
    .string()
    .regex(/^\d+\/\d+$/, {
      message: 'Monthly stipend must be in the format num1/num2.',
    })
    .min(3, { message: 'Monthly stipend must be at least 3 characters.' })
    .max(100, { message: 'Monthly stipend must be at most 100 characters.' }),
  forecast: z
    .string()
    .min(2, { message: 'Forecast must be at least 2 characters.' })
    .max(500, { message: 'Forecast must be at most 500 characters.' }),
  remarks: z
    .string()
    .min(2, { message: 'Remarks must be at least 2 characters.' })
    .max(500, { message: 'Remarks must be at most 500 characters.' }),
});

const Update = (props: { data: StipendType }) => {
  const router = useRouter();
  const { user } = useUserStore();
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      monthly: '',
      forecast: '',
      remarks: '',
    },
  });

  useEffect(() => {
    if (props.data) {
      form.reset({
        monthly: props.data.monthly ?? '',
        forecast: props.data.forecast ?? '',
        remarks: Array.isArray(props.data.remarks)
          ? props.data.remarks.join('\n')
          : (props.data.remarks ?? ''),
      });
    }
  }, [props.data, form]);

  if (!user || user?.role === 'student') {
    return null;
  }

  const onSubmit = (data: z.infer<typeof schema>) => {
    if (!user || user?.role === 'student') {
      toast.error('You are not authorized to update stipend details.');
      return;
    }

    const remarks: string[] = data.remarks.split('\n').filter(Boolean);

    const body = {
      monthly: data.monthly,
      forecast: data.forecast,
      remarks: remarks,
      authorID: user.userId,
      authorName: `${user.firstName} ${user.lastName}`,
      authorPosition: user.position as string,
      authorImageURL: user.image as string,
    };

    toast.promise(updateStipend(body), {
      loading: 'Updating stipend...',
      success: 'Stipend updated successfully!',
      error: (err) => err,
    });

    router.refresh();

    setOpen(false);
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
    <>
      <Button className="w-full" onClick={() => setOpen(true)}>
        <SquarePen />
        Update
      </Button>

      <Dialog open={open} onOpenChange={() => null}>
        <DialogContent showCloseButton={false}>
          <DialogHeader>
            <DialogTitle>Update Stipend</DialogTitle>
            <DialogDescription>
              Please fill out the form below to update the stipend details.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form
              id="update-stipend-form"
              onSubmit={(e) => form.handleSubmit(onSubmit, onError)(e)}
              className="flex w-full flex-col gap-2"
            >
              <div className="flex w-full gap-2">
                <FormField
                  control={form.control}
                  name="monthly"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Monthly Stipend</FormLabel>
                      <FormControl>
                        <Input placeholder="0/2" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="forecast"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Stipend Forecast</FormLabel>
                      <FormControl>
                        <Input placeholder="Mid-Late July" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="remarks"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Remarks</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="labore duis Lorem voluptate sint"
                        className="h-32"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </form>
          </Form>
          <DialogFooter>
            <ActionAlert
              button={{
                label: 'Close',
                onClick: () => setOpen(false),
                variant: 'outline',
              }}
              body={{
                title: 'Close',
                description: 'Are you sure you want to close?',
              }}
            />

            <ActionAlert
              button={{
                label: 'Update',
                variant: 'default',
                icon: SquarePen,
                onClick: () => form.handleSubmit(onSubmit, onError)(),
              }}
              body={{
                title: 'Update Stipend',
                description:
                  'Are you sure you want to update the stipend details?',
              }}
            />
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Update;
