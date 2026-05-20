import type { Request, Response } from "express";
import asyncHandler from "express-async-handler";

import ApiError from "#utils/ApiError.js";
import messageRepository from "./message.repository.js";

const create = asyncHandler(async (req: Request, res: Response) => {
  const message = await messageRepository.createMessage(req.body);

  return res.status(201).json({
    success: true,
    data: message,
  });
});

const getMessages = asyncHandler(async (req: Request, res: Response) => {
  const { resourceId } = req.params;

  if (!resourceId) {
    throw new ApiError(400, "resourceId and resourceType are required");
  }

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 20;

  const messages = await messageRepository.getMessages(resourceId, page, limit);

  return res.status(200).json({
    success: true,
    data: messages,
  });
});

export default {
  create,
  getMessages,
};
