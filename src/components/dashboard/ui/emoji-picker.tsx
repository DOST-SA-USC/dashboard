'use client';

import * as React from 'react';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';

import {
  EmojiPicker,
  EmojiPickerSearch,
  EmojiPickerContent,
} from '@/components/ui/emoji-picker';

interface MyEmojiPickerProps {
  selectedEmoji: string | null;
  setSelectedEmoji: (emoji: string) => void;
}

export default function MyEmojiPicker({
  selectedEmoji,
  setSelectedEmoji,
}: MyEmojiPickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="flex items-center gap-2"
          size="icon"
        >
          <span className="text-lg">{selectedEmoji}</span>
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-auto p-0" align="start" side="bottom">
        <EmojiPicker
          className="h-[326px]"
          onEmojiSelect={({ emoji }) => {
            setSelectedEmoji(emoji);
          }}
        >
          <EmojiPickerSearch />
          <EmojiPickerContent />
        </EmojiPicker>
      </PopoverContent>
    </Popover>
  );
}
