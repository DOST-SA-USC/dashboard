'use client';

import React, { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { Input } from '@/components/ui/input';

import { Eye, EyeOff } from 'lucide-react';

import { signIn } from '@/lib/auth/user';

const formSchema = z.object({
  email: z.email().min(2).max(50),
  password: z.string().min(8).max(20),
});

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    toast.promise(signIn(values.email, values.password), {
      loading: 'Loading...',
      success: 'Signed in successfully!',
      error: (error: Error) => {
        return error.message || 'Sign in failed';
      },
    });
  }

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-2"
        onSubmit={form.handleSubmit(onSubmit)}
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
                  placeholder="Enter your email"
                  type="email"
                  required
                />
              </FormControl>
              <FormMessage />
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
                    placeholder="*********"
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
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="mt-4 w-full cursor-pointer">
          Sign In
        </Button>
      </form>
    </Form>
  );
}
