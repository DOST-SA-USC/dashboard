'use client';
import React, { useState, useMemo } from 'react';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

import { useUserStore } from '@/stores/userStore';
import { useIsMobile } from '@/hooks/use-mobile';

import { TABS } from '@/data/resources';

import type { TabType } from '@/type';
import { Meh } from 'lucide-react';

const Content = () => {
  const [currentTab, setCurrentTab] = useState<TabType>('guides');
  const { user } = useUserStore();
  const isMobile = useIsMobile();

  const getTabs = useMemo(() => {
    return TABS.filter((tab) => {
      if (tab.studentsNotAllowed && user?.role === 'student') {
        return false;
      }
      return true;
    });
  }, [user?.role]);

  return (
    <>
      {/* tabs */}
      <Card className="flex w-full flex-row items-center justify-between gap-1 rounded-md p-1">
        {getTabs.map((tab, index) => (
          <Button
            key={index}
            variant={currentTab === tab.value ? 'default' : 'ghost'}
            className="flex-1 text-xs sm:text-sm"
            size="sm"
            onClick={() => setCurrentTab(tab.value as TabType)}
          >
            {isMobile ? tab.smLabel : tab.lgLabel}
          </Button>
        ))}
      </Card>

      {/* main */}
      <Card className="h-full w-full flex-1 gap-0 overflow-y-auto p-2 md:p-4">
        <div className="border-border bg-muted/20 text-secondary/40 flex h-full w-full flex-col items-center justify-center gap-2 border-2 border-dashed">
          <Meh className="size-16 sm:size-18 md:size-20" />
          <h1 className="text-lg font-extrabold sm:text-xl md:text-2xl">
            Coming Soon
          </h1>
        </div>
      </Card>
    </>
  );
};

export default Content;
