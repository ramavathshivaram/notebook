import { Types } from "mongoose";

import { pageQueue } from "#services/queues.js";

import { type IPage } from "./page.model.js";

import pageRepository from "./page.repository.js";

import cacheService from "#services/cache.service.js";

const pageKey = (pageId: string) => `page:${pageId}`;

const cachePage = async (sectionId: string, title: string) => {
  const now = new Date().toISOString();

  const page = {
    _id: new Types.ObjectId().toString(),
    sectionId,
    title,
    content: "",
    createdAt: now,
    updatedAt: now,
  };

  await cacheService.writeThroughCache(pageKey(page._id), page, {
    queue: pageQueue,
    jobName: "createPage",
  });

  return page;
};

const getPage = async (pageId: string) => {
  return await cacheService.cache(pageKey(pageId), () =>
    pageRepository.get(pageId),
  );
};

const updatePage = async (pageId: string, updatedPage: Partial<IPage>) => {
  return await cacheService.updateCache(
    pageKey(pageId),
    {
      pageId,
      updatedPage: { ...updatedPage, updatedAt: new Date().toISOString() },
    },
    {
      queue: pageQueue,
      jobName: "updatePage",
    },
  );
};

const deletePage = async (pageId: string) => {
  return await cacheService.deleteCache(pageKey(pageId), pageId, {
    queue: pageQueue,
    jobName: "deletePage",
  });
};

export default {
  cachePage,
  getPage,
  updatePage,
  deletePage,
};
