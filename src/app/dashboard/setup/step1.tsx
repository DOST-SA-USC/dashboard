'use client';

import { ChevronRight, Upload } from 'lucide-react';
import ImageElement from 'next/image';
import React, { useCallback, useState } from 'react';
import Cropper, { Area } from 'react-easy-crop';
import { FieldErrors, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
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
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import SET_UP_JSON from '@/data/setup.json';
import { capitalizeFirstLetter } from '@/lib/helpers';
import { zodResolver } from '@hookform/resolvers/zod';

const formSchema = z.object({
  firstName: z.string().min(1, 'First name is required.'),
  middleName: z.string().optional(),
  lastName: z.string().min(1, 'Last name is required.'),
  suffix: z.string().optional(),
  image: z
    .any()
    .refine((file) => file instanceof File && file.size > 0, {
      message: 'Image is required.',
    })
    .refine((file) => file instanceof File && file.size <= 2 * 1024 * 1024, {
      message: 'Image must be less than 2MB.',
    }),
});

type FormValues = z.infer<typeof formSchema>;

async function getCroppedImg(imageSrc: string, pixelCrop: Area): Promise<File> {
  const image = new Image();
  image.src = imageSrc;
  await new Promise<void>((res) => {
    image.onload = () => res();
  });

  const canvas = document.createElement('canvas');
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;
  const ctx = canvas.getContext('2d');

  if (!ctx) throw new Error('Could not get canvas context');

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  );

  return new Promise<File>((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error('Canvas is empty'));
          return;
        }
        resolve(new File([blob], 'cropped.jpg', { type: 'image/jpeg' }));
      },
      'image/jpeg',
      1
    );
  });
}

import type { FormType } from '@/type';
export default function Form1(props: {
  prev?: () => void;
  data?: FormType;
  update: (arg: FormType) => void;
}) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: props.data?.firstName || '',
      middleName: props.data?.middleName || '',
      lastName: props.data?.lastName || '',
      suffix: props.data?.suffix
        ? props.data.suffix
        : SET_UP_JSON.suffix.default,
      image: props.data?.image || null,
    },
  });

  const [cropModalOpen, setCropModalOpen] = useState(false);
  const [tempImage, setTempImage] = useState<string | null>(null);
  const [crop, setCrop] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState<number>(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const onCropComplete = useCallback(
    (_croppedArea: Area, croppedPixels: Area) => {
      setCroppedAreaPixels(croppedPixels);
    },
    []
  );

  async function onSubmit(values: FormValues) {
    if (values.suffix === SET_UP_JSON.suffix.default) {
      values.suffix = '';
    }

    values.firstName = capitalizeFirstLetter(values.firstName);
    if (values.middleName)
      values.middleName = capitalizeFirstLetter(values.middleName);

    props.update(values);
  }

  function onError(error: FieldErrors<FormValues>) {
    Object.values(error).forEach((err) => {
      if (err && typeof err === 'object' && 'message' in err && err.message) {
        toast.error(err.message as string);
      }
    });
  }

  return (
    <>
      {cropModalOpen && tempImage && (
        <Card className="fixed inset-0 z-50 flex h-full w-full flex-col items-center justify-center">
          <div className="relative h-[300px] w-[300px] bg-white">
            <Cropper
              image={tempImage}
              crop={crop}
              zoom={zoom}
              aspect={1}
              onCropChange={(location) => setCrop(location)}
              onZoomChange={(newZoom) => setZoom(newZoom)}
              onCropComplete={onCropComplete}
            />
          </div>
          <div className="mt-4 flex gap-2">
            <Button variant="outline" onClick={() => setCropModalOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={async () => {
                if (croppedAreaPixels && tempImage) {
                  const croppedFile = await getCroppedImg(
                    tempImage,
                    croppedAreaPixels
                  );
                  form.setValue('image', croppedFile);
                }
                setCropModalOpen(false);
              }}
            >
              Save
            </Button>
          </div>
        </Card>
      )}

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
                        <ImageElement
                          width={200}
                          height={200}
                          src={URL.createObjectURL(field.value)}
                          alt="Profile Preview"
                          className="border-border size-48 rounded-md border object-cover"
                        />
                      ) : (
                        <div className="bg-muted/40 border-border size-48 rounded-md border object-cover" />
                      )}
                      <div className="absolute inset-0 flex items-center justify-center rounded-md bg-black/20 opacity-0 transition-opacity group-hover:opacity-100">
                        <Upload className="size-8 text-white" />
                      </div>
                      <Input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onload = () => {
                              setTempImage(reader.result as string);
                              setCropModalOpen(true);
                            };
                            reader.readAsDataURL(file);
                          }
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
            <FormField
              control={form.control}
              name="suffix"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Suffix</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-full md:w-20">
                        <SelectValue placeholder="" />
                      </SelectTrigger>
                      <SelectContent>
                        {SET_UP_JSON.suffix.options.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </form>
      </Form>

      <div className="text-muted-foreground mt-4 w-full text-xs md:text-sm">
        Upload a formal professional photo. Non-compliance may result in account
        deletion.
        <ul className="list-inside list-disc pl-2 text-left">
          <li>Recent, clear headshot.</li>
          <li>Plain, light-colored background.</li>
          <li>Face clearly visible, facing forward.</li>
          <li>No sunglasses, hats, or filters.</li>
          <li>High-resolution image (not pixelated or blurry).</li>
        </ul>
      </div>

      <div className="mt-10 flex w-full justify-end">
        <Button form="form1" type="submit">
          Next
          <ChevronRight className="size-4" />
        </Button>
      </div>
    </>
  );
}
