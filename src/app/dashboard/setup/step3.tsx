import { ChevronLeft, ChevronRight } from 'lucide-react';
import React from 'react';
import { FieldErrors, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';

import type { FormType } from '@/type';
const formSchema = z.object({
  emergencyContact: z.string().min(1, 'Emergency contact is required.'),
  emergencyContactNumber: z
    .string()
    .min(11, 'Emergency contact number must be 11 digits.')
    .max(11, 'Emergency contact number must be 11 digits.')
    .regex(
      /^09\d{9}$/,
      'Emergency contact number must start with 09 and be 11 digits.'
    ),
  birthDate: z
    .string()
    .min(1, 'Birth date is required.')
    .refine(
      (val) => {
        const date = new Date(val);
        const now = new Date();
        date.setHours(0, 0, 0, 0);
        now.setHours(0, 0, 0, 0);

        // Calculate the date 10 years ago from today
        const tenYearsAgo = new Date(now);
        tenYearsAgo.setFullYear(now.getFullYear() - 10);

        // Birth date must not be in the future and not within the previous 10 years
        return date < tenYearsAgo;
      },
      {
        message:
          'Birth date must not be in the previous 10 years or in the future.',
      }
    ),
});

const Form3 = (props: {
  prev?: () => void;
  data?: FormType;
  update: (arg: FormType) => void;
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      emergencyContact: props.data?.emergencyContact || '',
      emergencyContactNumber: props.data?.emergencyContactNumber || '',
      birthDate: props.data?.birthDate || '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    props.update({
      emergencyContact: values.emergencyContact,
      emergencyContactNumber: values.emergencyContactNumber,
      birthDate: values.birthDate,
    });
  }

  function onError(error: FieldErrors) {
    Object.values(error).forEach((err) => {
      if (err && typeof err === 'object' && 'message' in err && err.message) {
        toast.error(err.message as string);
      }
    });
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit, onError)}
          className="flex w-full flex-col items-center justify-center gap-4"
        >
          <div className="flex w-full flex-col items-center justify-center gap-4 md:flex-row">
            <FormField
              control={form.control}
              name="emergencyContact"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Emergency Contact</FormLabel>
                  <FormControl>
                    <Input placeholder="Jane S. Doe" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="emergencyContactNumber"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Emergency Contact Number</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="09123456789" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="birthDate"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Birth Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <div className="mt-10 flex w-full justify-between">
            <Button variant="outline" type="button" onClick={props.prev}>
              <ChevronLeft className="size-4" />
              Back
            </Button>
            <Button type="submit">
              Next
              <ChevronRight className="size-4" />
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default Form3;
