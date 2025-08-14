import React from 'react';

import Content from './content';

import { getLatestStipendUpdate } from '@/lib/db/stipend';

import { cache } from 'react';

const getLatestStipendUpdateCached = cache(async () => {
  return getLatestStipendUpdate();
});

const Stipend = async () => {
  const rawData = await getLatestStipendUpdateCached();

  const cachedData = {
    ...rawData,
    authorID: rawData.authorId,
    authorName: rawData.authorName,
    authorPosition: rawData.authorPosition,
    authorImageURL: rawData.authorImageURL,
  };

  return <Content data={cachedData} />;
};

export default Stipend;
