'use client';

import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { toast } from 'sonner';

import ModeToggle from '@/components/dashboard/core/theme-switch';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { signOut } from '@/lib/auth/client';

import Form1 from './step1';
import Form2 from './step2';
import Form3 from './step3';
import Form4 from './step4';

import type { FormType, UserType } from '@/type';

const formSteps = [
  {
    title: 'Personal Information',
    description: 'Tell us about yourself.',
    component: Form1,
  },
  {
    title: 'Academic Details',
    description: 'Provide your academic background.',
    component: Form2,
  },
  {
    title: 'Additional Information',
    description: 'Final details for your account.',
    component: Form3,
  },
  {
    title: 'Review & Submit',
    description: 'Information cannot be edited after submission.',
    component: Form4,
  },
];

const Form = (props: { userID: string; user: UserType }) => {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
  const [step, setStep] = useState(0);

  const [formData, setFormData] = useState<FormType>({
    firstName: '',
    middleName: '',
    lastName: '',
    image: undefined,
    uscID: '',
    program: '',
    yearLevel: '',
    yearOfAward: '',
    scholarshipType: '',
    contactNumber: '',
    address: '',
    birthDate: '',
  });

  function handleSignOut() {
    setIsPending(true);
    toast.promise(signOut(), {
      loading: 'Signing out...',
      success: () => {
        router.push('/');
        return 'Signed out successfully!';
      },
      error: (error: Error) => {
        setIsPending(false);
        return error.message || 'Sign out failed';
      },
    });
  }

  function handleFormDataChange(data?: FormType) {
    // handleNext
    if (step < formSteps.length - 1 && data) {
      setFormData((prev) => ({ ...prev, ...data }));

      setStep((prev) => prev + 1);
    } else {
      // handleSubmit
    }
  }

  function handlePrev() {
    if (step > 0) {
      setStep((prev) => prev - 1);
    }
  }

  return (
    <div className="flex h-full w-full items-center justify-center p-4">
      <div className="flex w-xl flex-col gap-2">
        <div className="flex w-full items-center justify-between gap-4">
          <Button
            variant="outline"
            onClick={handleSignOut}
            disabled={isPending}
          >
            <LogOut className="size-4" />
          </Button>
          <ModeToggle variant="default" />
        </div>

        <Card className="w-full">
          <CardHeader>
            <CardTitle>Set Up Your Account</CardTitle>
            <CardDescription>
              Step {step + 1} of {formSteps.length}: {formSteps[step].title}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div>
              <Progress value={((step + 1) / formSteps.length) * 100} />
              <p className="text-muted-foreground mt-2 text-center text-xs md:text-sm">
                {formSteps[step].description}
              </p>
            </div>

            <div className="mt-6 flex flex-col items-center justify-center">
              {React.createElement(formSteps[step].component, {
                prev: handlePrev,
                data: formData,
                formData: formData,
                userID: props.userID,
                update: handleFormDataChange,
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Form;
