import asyncHandler from "express-async-handler";

import type { Request, Response } from "express";

import ApiError from "#utils/ApiError.js";

import sectionCache from "./section.cache.js";

import { sectionQueue } from "#services/queues.js";

const getAuthId = (req: Request): string => {
  if (!req.authId) {
    throw new ApiError(404, "User not found");
  }

  return req.authId;
};

const createSection = asyncHandler(async (req: Request, res: Response) => {
  const authId = getAuthId(req);

  const { title } = req.body;

  const section = await sectionCache.createSection({
    title,
    authId,
  });

  res.status(201).json({
    section,
    message: "Section created",
    status: true,
  });
});

const getSections = asyncHandler(async (req: Request, res: Response) => {
  const authId = getAuthId(req);

  const sections = await sectionCache.getSections(authId);

  res.status(200).json({
    data: sections,
    message: "Fetched sections",
    status: true,
  });
});

const deleteSection = asyncHandler(
  async (
    req: Request<{
      sectionId: string;
    }>,
    res: Response,
  ) => {
    const authId = getAuthId(req);

    const { sectionId } = req.params;

    await sectionCache.remove(authId, sectionId);

    res.status(200).json({
      message: "Section deleted",
      status: true,
    });
  },
);

const renameSection = asyncHandler(
  async (
    req: Request<{
      sectionId: string;
    }>,
    res: Response,
  ) => {
    const authId = getAuthId(req);

    const { sectionId } = req.params;

    const { title } = req.body;

    await sectionCache.rename(authId, sectionId, title);

    res.status(200).json({
      message: "Section renamed successfully",
      status: true,
    });
  },
);

export default {
  createSection,
  getSections,
  renameSection,
  deleteSection,
};
