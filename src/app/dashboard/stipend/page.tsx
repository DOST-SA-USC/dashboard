import React from 'react';

import Content from './content';

import { getLatestStipendUpdate } from '@/lib/db/stipend';

import type { StipendType } from '@/type';

const Stipend = async () => {
  let cachedData: StipendType | null = null;

  if (!cachedData) {
    const rawData = await getLatestStipendUpdate();
    cachedData = {
      ...rawData,
      authorID: rawData.authorId,
      authorName: rawData.authorName,
      authorPosition: rawData.authorPosition,
      authorImageURL: rawData.authorImageURL,
    };
  }

  return <Content data={cachedData} />;
};

export default Stipend;
