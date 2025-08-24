'use client';

import Image from 'next/image';
import { QRCodeSVG } from 'qrcode.react';
import React from 'react';

import HoverCard from '@/components/dashboard/ui/hover-card';
import ID_BACK from '@/data/id/back.png';
import ID_FRONT from '@/data/id/front.png';
import { formatPhoneNumber } from '@/lib/helpers';

import type { FormType } from '@/type';

import type { UserType } from '@/type';
const IDComponent = React.forwardRef<
  HTMLDivElement,
  { user: UserType | Required<FormType> }
>(({ user }, ref) => {
  return (
    <div
      ref={ref}
      className="flex h-full w-full flex-col items-center justify-center gap-4 p-2 text-[#334FA1] lg:flex-row lg:overflow-x-auto"
    >
      <HoverCard>
        <div
          className="relative flex flex-col items-center overflow-hidden rounded-lg pt-[82px] text-[#334FA1]"
          style={{
            width: 300,
            height: 500,
            backgroundImage: `url(${ID_FRONT.src})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
          aria-label="Scholar ID Front"
          role="img"
          onContextMenu={(e) => e.preventDefault()}
        >
          <span className="sr-only">Scholar ID Front</span>
          <Image
            src={user.image as string}
            alt="Scholar ID Front"
            width={200}
            height={400}
            priority
            quality={100}
            className="rounded-4xl"
            draggable={false}
          />
          <h1 className="mt-3 px-4 text-center text-xl leading-6 font-bold">
            {`${user.lastName}, ${user.firstName} ${user.middleName ? user.middleName.charAt(0) + '. ' : ''}${user.suffix ? user.suffix : ''}`.toUpperCase()}
          </h1>
          <h2 className="text-xs font-[600]">{user.program.toUpperCase()}</h2>
          <div className="mt-4 flex w-full justify-between px-8">
            <div className="text-left">
              <p className="text-xs leading-3 font-[600]">
                {user.scholarshipType.toUpperCase()} - {user.yearOfAward}
              </p>
              <p className="text-[8px] italic">Scholarship - Year of Award</p>
            </div>
            <div className="text-right">
              <p className="text-xs leading-3 font-[600]">{user.uscID}</p>
              <p className="text-[8px] italic">ID Number</p>
            </div>
          </div>
        </div>
      </HoverCard>
      <HoverCard>
        <div
          className="relative overflow-hidden rounded-lg p-6"
          style={{
            width: 300,
            height: 500,
            backgroundImage: `url(${ID_BACK.src})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
          aria-label="Scholar ID Front"
          role="img"
          onContextMenu={(e) => e.preventDefault()}
        >
          <span className="sr-only">Scholar ID Back</span>

          <div className="text-[10px]">
            <p className="leading-3">In case of emergency contact:</p>
            <p className="leading-3 font-semibold">{user.emergencyContact}</p>
            <p className="leading-3 font-semibold">
              Contact No.: {formatPhoneNumber(user.emergencyContactNumber)}
            </p>
          </div>
          <div className="mt-14 flex w-full flex-col items-center justify-center">
            <QRCodeSVG
              fgColor="#334FA1"
              bgColor="#ECF0F3"
              value={`https://verify.dostsausc.org/${user.uscID}`}
              size={128}
              className="translate-x-1"
            />
            <p className="mt-10 text-[10px] font-[600] italic">
              Scholar ID Card valid until {Number(user.yearOfAward) + 5}
            </p>
          </div>
        </div>
      </HoverCard>
    </div>
  );
});

IDComponent.displayName = 'IDComponent';

export default IDComponent;
