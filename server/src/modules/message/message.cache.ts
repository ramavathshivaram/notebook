import mongoose from "mongoose";

import { messageQueue } from "#services/queues.js";

import cacheService from "#services/cache.service.js";

import messageRepository from "./message.repository.js";

import type { IMessage } from "./message.model.js";

const messageKey = (messageId: string) => `message:${messageId}`;

const messagesKey = (resourceId: string, page: number, limit: number) =>
  `messages:${resourceId}:${page}:${limit}`;

const cacheMessage = async (message: IMessage) => {

  const now = new Date().toISOString();

  const cachedMessage = {
    createdAt: now,
    updatedAt: now,
    ...message,
    _id: new mongoose.Types.ObjectId().toString(),
  };

  await cacheService.writeThroughCache(
    messageKey(cachedMessage._id),
    cachedMessage,
    {
      queue: messageQueue,
      jobName: "createMessage",
    },
  );

  return cachedMessage;
};

const getMessages = async (resourceId: string, page = 1, limit = 20) => {
  return await cacheService.cache(
    messagesKey(resourceId, page, limit),

    () => messageRepository.getMessages(resourceId, page, limit),
  );
};

export default {
  cacheMessage,
  getMessages,
};
