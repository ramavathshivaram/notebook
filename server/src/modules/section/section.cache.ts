import { Types } from "mongoose";

import redis from "#configs/redis.js";

import { sectionQueue } from "#services/queues.js";

import sectionRepository from "./section.repository.js";

import type { ISection } from "./section.model.js";

const sectionsKey = (authId: string) => `sections:${authId}`;

const SECTION_LIMIT = 100;

const add = async (authId: string, value: string) => {
  const key = sectionsKey(authId);

  await redis.rpush(key, value);

  await redis.ltrim(key, -SECTION_LIMIT, -1);

  await sectionQueue.add("createSection", JSON.parse(value));
};

const addAll = async (authId: string, values: ISection[]) => {
  if (!values.length) return;

  await redis.rpush(
    sectionsKey(authId),
    ...values.map((section) => JSON.stringify(section)),
  );
};

const createSection = async (section: Partial<ISection>) => {
  const cachedSection = {
    _id: new Types.ObjectId().toString(),

    createdAt: new Date().toISOString(),

    updatedAt: new Date().toISOString(),

    ...section,
  };

  await add(section.authId || "", JSON.stringify(cachedSection));

  return cachedSection;
};

const remove = async (authId: string, sectionId: string) => {
  const key = sectionsKey(authId);

  const sections = await redis.lrange(key, 0, -1);

  const matched = sections.find((section: string) => {
    const parsed = JSON.parse(section);

    return parsed._id === sectionId;
  });

  if (matched) {
    await redis.lrem(key, 1, matched);
  }

  await sectionQueue.add("deleteSection", { sectionId });
};

const rename = async (authId: string, sectionId: string, title: string) => {
  const key = sectionsKey(authId);

  const sections = await redis.lrange(key, 0, -1);

  const updatedSections = sections.map((section: string) => {
    const parsed = JSON.parse(section);

    if (parsed._id === sectionId) {
      parsed.title = title;
      parsed.updatedAt = new Date().toISOString();
    }

    return JSON.stringify(parsed);
  });

  await redis.del(key);

  if (updatedSections.length) {
    await redis.rpush(key, ...updatedSections);
  }

  await sectionQueue.add("renameSection", {
    sectionId,
    title,
  });
};

const getSections = async (authId: string) => {
  const cachedSections = await redis.lrange(sectionsKey(authId), 0, -1);

  if (cachedSections.length) {
    return cachedSections.map((section: string) => JSON.parse(section));
  }

  const sections = await sectionRepository.getSections(authId);

  await addAll(authId, sections);

  return sections;
};

export default {
  createSection,
  getSections,
  remove,
  rename,
};
