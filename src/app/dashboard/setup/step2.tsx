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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { zodResolver } from '@hookform/resolvers/zod';

import data from '@/data/setup.json';

import type { FormType } from '@/type';
const formSchema = z.object({
  uscID: z
    .string()
    .min(1, 'USC ID is required.')
    .regex(/^\d{8}$/, 'USC ID must be 8 digits.'),
  program: z.string().min(1, 'Program is required.'),
  yearLevel: z.string().min(1, 'Year level is required.'),
  yearOfAward: z.string().min(1, 'Year of award is required.'),
  scholarshipType: z.string().min(1, 'Scholarship type is required.'),
});

const Form2 = (props: {
  prev?: () => void;
  data?: FormType;
  update: (arg: FormType) => void;
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      uscID: props.data?.uscID || '',
      program: props.data?.program || '',
      yearLevel: props.data?.yearLevel || '',
      yearOfAward: props.data?.yearOfAward || '',
      scholarshipType: props.data?.scholarshipType || '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    props.update({
      uscID: values.uscID,
      program: values.program,
      yearLevel: values.yearLevel,
      yearOfAward: values.yearOfAward,
      scholarshipType: values.scholarshipType,
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
          id="form2"
          onSubmit={form.handleSubmit(onSubmit, onError)}
          className="flex w-full flex-col items-center justify-center gap-4"
        >
          <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="uscID"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>USC ID</FormLabel>
                  <FormControl>
                    <Input placeholder="00000000" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="yearLevel"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Year Level</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a year" />
                      </SelectTrigger>
                      <SelectContent>
                        {data.yearLevels.map((year) => (
                          <SelectItem key={year} value={year}>
                            Year {year}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="yearOfAward"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Year of Award</FormLabel>
                  <FormControl className="w-full">
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a year" />
                      </SelectTrigger>
                      <SelectContent>
                        {data.yearOfAwards.map((year) => (
                          <SelectItem key={year} value={year}>
                            {year}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="scholarshipType"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Scholarship Type</FormLabel>
                  <FormControl className="w-full">
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a scholarship type" />
                      </SelectTrigger>
                      <SelectContent>
                        {data.scholarshipTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="program"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Program</FormLabel>
                <FormControl className="w-full">
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a program" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(data.programs).map(
                        ([school, programs]) => (
                          <SelectGroup key={school}>
                            <SelectLabel>{school}</SelectLabel>
                            {programs.map((program: string) => (
                              <SelectItem key={program} value={program}>
                                {program}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        )
                      )}
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />
        </form>
      </Form>

      <div className="mt-10 flex w-full justify-between">
        <Button variant="outline" type="button" onClick={props.prev}>
          <ChevronLeft className="size-4" />
          Back
        </Button>
        <Button form="form2" type="submit">
          Next
          <ChevronRight className="size-4" />
        </Button>
      </div>
    </>
  );
};

export default Form2;
