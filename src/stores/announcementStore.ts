import type { AnnouncementType } from '@/type';

import { create } from 'zustand';

type AnnouncementStore = {
  announcements: AnnouncementType[] | [];
  setAnnouncements: (announcements: AnnouncementType[]) => void;
  clearAnnouncements: () => void;
};

export const useAnnouncementStore = create<AnnouncementStore>((set) => ({
  announcements: [],
  setAnnouncements: (announcements) => set({ announcements }),
  clearAnnouncements: () => set({ announcements: [] }),
}));
