'use client';

import React, { useState } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { requestPasswordReset } from '@/lib/auth/client';
import { doesUserEmailExist } from '@/lib/db/users';

const Forgot = () => {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setOpen(false);
    setLoading(false);
    setEmail('');
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    if (!email) {
      setLoading(false);
      throw new Error('Email is required.');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setLoading(false);
      throw new Error('Please enter a valid email address.');
    }

    const userExists = await doesUserEmailExist(email);
    if (!userExists) {
      setLoading(false);
      throw new Error('Scholar account not found.');
    }

    await requestPasswordReset({
      email: email,
    });

    await resetForm();
  };

  return (
    <>
      <button
        type="button"
        className="text-muted-foreground cursor-pointer text-xs hover:underline"
        onClick={() => setOpen(true)}
      >
        Forgot Password?
      </button>

      <Dialog
        open={open}
        onOpenChange={(open) => {
          resetForm();
          setOpen(open);
        }}
      >
        <DialogContent className="w-lg" showCloseButton={false}>
          <DialogHeader>
            <DialogTitle>Forgot Password</DialogTitle>
            <DialogDescription>
              Enter your email address to receive a password reset link.
            </DialogDescription>
          </DialogHeader>
          <div className="flex h-full w-full flex-col gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="dostsausc@usc.edu.ph"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" type="button" onClick={resetForm}>
              Cancel
            </Button>
            <Button
              onClick={(e) =>
                toast.promise(handleSubmit(e), {
                  loading: 'Submitting...',
                  success: 'Email sent! Check your inbox.',
                  error: (err) => err.message,
                })
              }
              type="submit"
              disabled={loading || email === '' || email.length < 5}
            >
              Submit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Forgot;
