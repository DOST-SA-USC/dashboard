'use client';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useActionState } from 'react';

import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';

import IDComponent from '../components/ui/id-component';
import { FormType } from '@/type';

import { insertUserData } from '@/lib/db/users';

const initialState = {
  success: false,
  message: '',
};

const Form4 = (props: {
  prev?: () => void;
  data?: FormType;
  userID: string;
  formData: FormType;
  update: () => void;
}) => {
  const router = useRouter();
  const [state, formAction, pending] = useActionState(async () => {
    try {
      await insertUserData(props.userID, props.formData);
      return {
        success: true,
        message: 'User data inserted successfully',
      };
    } catch (error) {
      return {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : 'An error occurred while inserting user data',
      };
    }
  }, initialState);

  useEffect(() => {
    if (state.success) {
      toast.success(state.message);
      router.refresh();
    } else if (state.message) {
      toast.error(state.message);
    }
  }, [state, router]);

  return (
    <>
      <IDComponent />
      <div className="mt-10 flex w-full justify-between">
        <Button variant="outline" type="button" onClick={props.prev}>
          <ChevronLeft className="size-4" />
          Back
        </Button>
        <form action={formAction}>
          <Button type="submit" onClick={props.update} disabled={pending}>
            Submit
          </Button>
        </form>
      </div>
    </>
  );
};

export default Form4;
