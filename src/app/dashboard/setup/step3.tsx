import React from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { FieldErrors, useForm } from 'react-hook-form';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import type { FormType } from '@/type';
import { toast } from 'sonner';

const formSchema = z.object({
  contactNumber: z
    .string()
    .min(11, 'Contact number must be 11 digits.')
    .max(11, 'Contact number must be 11 digits.')
    .regex(/^09\d{9}$/, 'Contact number must start with 09 and be 11 digits.'),
  address: z.string().min(1, 'Address is required.'),
  birthDate: z
    .string()
    .min(1, 'Birth date is required.')
    .refine(
      (val) => {
        const date = new Date(val);
        const now = new Date();
        // Only compare date part, ignore time
        date.setHours(0, 0, 0, 0);
        now.setHours(0, 0, 0, 0);
        return date < now;
      },
      { message: 'Birth date must not be in the future.' }
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
      contactNumber: props.data?.contactNumber || '',
      address: props.data?.address || '',
      birthDate: props.data?.birthDate || '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    props.update({
      contactNumber: values.contactNumber,
      address: values.address,
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
              name="contactNumber"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Contact Number</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="09123456789" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

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
          </div>
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Current Address</FormLabel>
                <FormControl>
                  <Input placeholder="Talamban, Cebu City" {...field} />
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
