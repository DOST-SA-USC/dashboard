import React from 'react';
import { toast } from 'sonner';
import Image from 'next/image';
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
import { Upload, ChevronRight } from 'lucide-react';

import type { FormType } from '@/type';

const formSchema = z.object({
  firstName: z.string().min(1, 'First name is required.'),
  middleName: z.string().min(1, 'Middle name is required.'),
  lastName: z.string().min(1, 'Last name is required.'),
  image: z
    .any()
    .refine((file) => file instanceof File && file.size > 0, {
      message: 'Image is required.',
    })
    .refine((file) => file instanceof File && file.size <= 500 * 1024, {
      message: 'Image must be less than 500KB.',
    }),
});

const Form1 = (props: {
  prev?: () => void;
  data?: FormType;
  update: (arg: FormType) => void;
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: props.data?.firstName || '',
      middleName: props.data?.middleName || '',
      lastName: props.data?.lastName || '',
      image: props.data?.image || null,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    props.update({
      firstName: values.firstName,
      middleName: values.middleName,
      lastName: values.lastName,
      image: values.image,
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
          id="form1"
          onSubmit={form.handleSubmit(onSubmit, onError)}
          className="flex flex-col items-center justify-center gap-8"
        >
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Profile Picture</FormLabel>
                <FormControl>
                  <div className="flex flex-col items-center gap-2">
                    <label className="group relative cursor-pointer">
                      {field.value && field.value instanceof File ? (
                        <Image
                          width={160}
                          height={192}
                          src={URL.createObjectURL(field.value)}
                          alt="Profile Preview"
                          className="border-border h-48 w-40 rounded-md border object-cover"
                          onLoad={(e) =>
                            URL.revokeObjectURL(
                              (e.target as HTMLImageElement).src
                            )
                          }
                        />
                      ) : (
                        <div className="bg-muted/40 border-border h-48 w-40 rounded-md border object-cover backdrop-blur-sm" />
                      )}
                      <div className="absolute inset-0 flex items-center justify-center rounded-md bg-black/20 opacity-0 transition-opacity group-hover:opacity-100">
                        <Upload className="size-8 text-white" />
                      </div>
                      <Input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          field.onChange(file || null);
                        }}
                      />
                    </label>
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
          <div className="flex flex-col gap-4 md:flex-row">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="middleName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Middle Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Smith" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Doe" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </form>
      </Form>
      <div className="mt-10 flex w-full justify-end">
        <Button form="form1" type="submit">
          Next
          <ChevronRight className="size-4" />
        </Button>
      </div>
    </>
  );
};

export default Form1;
