'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { FieldErrors, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { resetPassword } from '@/lib/auth/client';
import { zodResolver } from '@hookform/resolvers/zod';

import Invalid from '@/components/dashboard/forgot/invalid';

const formSchema = z
  .object({
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/,
        'Password must contain uppercase, lowercase, number, and special character'
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

const Content = () => {
  const params = useSearchParams();
  const router = useRouter();
  const [show, setShow] = useState(false);

  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    setToken(params.get('token'));
    setError(params.get('error'));
  }, [params]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  if (!token || error) {
    return <Invalid />;
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { password } = values;

    setIsPending(true);
    toast.promise(
      resetPassword({
        newPassword: password,
        token: token as string,
      }),
      {
        loading: 'Changing password...',
        success: () => {
          router.push('/');
          return 'Password changed successfully';
        },
        error: (err) => {
          setIsPending(false);
          return err;
        },
      }
    );
  }

  function onError(error: FieldErrors) {
    Object.values(error).forEach((err) => {
      if (err && typeof err === 'object' && 'message' in err && err.message) {
        toast.error(err.message as string);
      }
    });
  }

  return (
    <Card className="w-[90%] md:w-md">
      <CardHeader>
        <CardTitle>Reset Password</CardTitle>
        <CardDescription>
          Enter a new password for your account.
        </CardDescription>
      </CardHeader>
      <CardContent className="w-full">
        <Form {...form}>
          <form
            id="form"
            onSubmit={form.handleSubmit(onSubmit, onError)}
            className="w-full space-y-4"
          >
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={show ? 'stipendcutie' : '********'}
                      type={show ? 'text' : 'password'}
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={show ? 'stipendcutie' : '********'}
                      type={show ? 'text' : 'password'}
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </form>
        </Form>

        <div className="mt-4 ml-2 flex items-center gap-2">
          <Checkbox
            id="show-password"
            checked={show}
            onCheckedChange={(checked) => setShow(Boolean(checked))}
          />
          <Label htmlFor="show-password">Show Password</Label>
        </div>
      </CardContent>
      <CardFooter className="w-full justify-end">
        <Button
          form="form"
          type="submit"
          className="w-full md:w-auto"
          disabled={isPending}
        >
          Submit
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Content;
