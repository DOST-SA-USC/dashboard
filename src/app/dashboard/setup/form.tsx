'use client';

import React, { useState } from 'react';
import { toast } from 'sonner';
import { signOut } from '@/lib/auth/client';
import { useRouter } from 'next/navigation';
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import ModeToggle from '@/components/theme-switch';
import { Progress } from '@/components/ui/progress';

import Form1 from './step1';
import Form2 from './step2';
import Form3 from './step3';
import Form4 from './step4';

import type { FormType } from '@/type';

import { LogOut } from 'lucide-react';

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

const Setup = () => {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
  const [step, setStep] = useState(0);

  const [formData, setFormData] = useState<FormType>({
    firstName: '',
    middleName: '',
    lastName: '',
    image: '',
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
      console.log('Final Form Data:', formData);
    }
  }

  function handlePrev() {
    if (step > 0) {
      setStep((prev) => prev - 1);
    }
  }

  return (
    <div className="flex h-screen items-center justify-center p-4">
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
                update: handleFormDataChange,
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Setup;
