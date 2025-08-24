'use client';
import { ChevronLeft, LoaderCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useActionState, useEffect, useState } from 'react';
import { toast } from 'sonner';

import IDComponent from '@/components/dashboard/id/id-component';
import { Button } from '@/components/ui/button';
import { insertUserData } from '@/lib/db/users';
import { FormType } from '@/type';

const initialState = {
  success: false,
  message: '',
};

const Form4 = (props: {
  prev?: () => void;
  data: FormType;
  userID: string;
  formData: FormType;
  update: () => void;
}) => {
  const router = useRouter();
  const [imageUrl, setImageUrl] = useState<string>('');
  const [state, formAction, pending] = useActionState(async () => {
    try {
      await insertUserData(props.userID, props.formData);
      return {
        success: true,
        message: 'Account set up successful!',
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
    if (props.data.image) {
      const url = URL.createObjectURL(props.data.image as Blob);
      setImageUrl(url);
      return () => {
        URL.revokeObjectURL(url);
      };
    }
  }, [props.data.image]);

  useEffect(() => {
    if (state.success) {
      toast.success(state.message);
      router.refresh();
    } else if (state.message) {
      toast.error(state.message);
    }
  }, [state, router]);

  if (imageUrl === '') {
    return <div>Loading...</div>;
  }

  return (
    <>
      <IDComponent
        user={{
          uscID: props.data.uscID ?? '',
          firstName: props.data.firstName ?? '',
          middleName: props.data.middleName ?? '',
          lastName: props.data.lastName ?? '',
          suffix: props.data.suffix ?? '',
          image: imageUrl,
          program: props.data.program ?? '',
          yearLevel: props.data.yearLevel ?? '',
          emergencyContact: props.data.emergencyContact ?? '',
          emergencyContactNumber: props.data.emergencyContactNumber ?? '',
          yearOfAward: props.data.yearOfAward ?? '',
          scholarshipType: props.data.scholarshipType ?? '',
        }}
      />
      <div className="mt-10 flex w-full justify-between">
        <Button
          variant="outline"
          type="button"
          onClick={props.prev}
          disabled={pending || state.success}
        >
          <ChevronLeft className="size-4" />
          Back
        </Button>
        <form action={formAction}>
          <Button
            type="submit"
            onClick={props.update}
            disabled={pending || state.success}
            className="transition-all duration-300"
          >
            {pending ? <LoaderCircle className="animate-spin" /> : 'Submit'}
          </Button>
        </form>
      </div>
    </>
  );
};

export default Form4;
