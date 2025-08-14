'use client';

import { Eye, EyeOff } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
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
import { signIn } from '@/lib/auth/client';
import { zodResolver } from '@hookform/resolvers/zod';

import Forgot from './forgot';

const formSchema = z.object({
  email: z
    .email('Please enter a valid email address')
    .min(2, 'Email must be at least 2 characters')
    .max(50, 'Email must be less than 50 characters'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(20, 'Password must be less than 20 characters'),
});

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [openForgotPasswordModal, setOpenForgotPasswordModal] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsPending(true);
    setShowPassword(false);

    toast.promise(signIn(values.email, values.password), {
      loading: 'Loading...',
      success: () => {
        router.push('/dashboard');
        return 'Sign in successful';
      },
      error: (error: Error) => {
        setIsPending(false);
        return error.message || 'Sign in failed';
      },
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
      <Forgot
        open={openForgotPasswordModal}
        setOpen={setOpenForgotPasswordModal}
        body={{
          title: 'Forgot Password',
          description:
            'Enter your email address to receive a password reset link.',
        }}
      />
      <Form {...form}>
        <form
          className="flex w-full flex-col gap-2"
          onSubmit={form.handleSubmit(onSubmit, onError)}
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="email">Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    id="email"
                    placeholder="dostsausc@usc.edu.ph"
                    type="email"
                    required
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <div className="mt-2 flex items-center justify-between">
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <button
                    type="button"
                    className="text-muted-foreground cursor-pointer text-xs hover:underline"
                    onClick={() => setOpenForgotPasswordModal(true)}
                  >
                    Forgot Password?
                  </button>
                </div>
                <FormControl>
                  <div className="relative">
                    <Input
                      {...field}
                      id="password"
                      name="password"
                      placeholder={showPassword ? 'stipendcutie' : '********'}
                      type={showPassword ? 'text' : 'password'}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="text-muted-foreground absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </FormControl>
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="mt-4 w-full cursor-pointer"
            disabled={isPending}
          >
            Sign In
          </Button>
        </form>
      </Form>
    </>
  );
}
