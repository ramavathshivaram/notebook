import { Types } from "mongoose";
import redis from "#configs/redis.js";

import { messageQueue } from "#services/queues.js";

import messageRepository from "./message.repository.js";

import type { IMessage } from "./message.model.js";

const MESSAGE_LIMIT = 20;

const messageKey = (resourceId: string) => `message:${resourceId}`;

const addMessage = async (resourceId: string, message: string) => {
  const key = messageKey(resourceId);

  await redis.rpush(key, message);

  await redis.ltrim(key, -MESSAGE_LIMIT, -1);

  await messageQueue.add("createMessage", JSON.parse(message));
};

const addMessages = async (resourceId: string, messages: IMessage[]) => {
  if (!messages.length) return;

  const key = messageKey(resourceId);

  await redis.rpush(key, ...messages.map((message) => JSON.stringify(message)));

  await redis.ltrim(key, -MESSAGE_LIMIT, -1);
};

const cacheMessage = async (resourceId: string, message: Partial<IMessage>) => {
  const now = new Date().toISOString();

  const cachedMessage = {
    _id: new Types.ObjectId().toString(),
    createdAt: now,
    updatedAt: now,
    ...message,
  };

  await addMessage(resourceId, JSON.stringify(cachedMessage));

  return cachedMessage;
};

const getMessages = async (resourceId: string, page = 1, limit = 20): Promise<IMessage[]> => {
  const key = messageKey(resourceId);

  const cachedMessages = await redis.lrange(
    key,
    (page - 1) * limit,
    page * limit - 1,
  );

  if (cachedMessages.length) {
    return cachedMessages.map((message: string) => JSON.parse(message));
  }

  const messages = await messageRepository.getMessages(resourceId, page, limit);

  await addMessages(resourceId, messages);

  return messages;
};

export default {
  cacheMessage,
  getMessages,
};
