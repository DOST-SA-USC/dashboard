'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import { Settings as SettingsIcon } from 'lucide-react';

const Settings = () => {
  return (
    <Button variant="outline" size="icon" className="size-8">
      <SettingsIcon />
    </Button>
  );
};

export default Settings;
