import type { Request, Response } from "express";
import asyncHandler from "express-async-handler";

import ApiError from "#utils/ApiError.js";
import messageCache from "./message.cache.js";

const getMessages = asyncHandler(async (req: Request<{ resourceId: string }>, res: Response) => {
  const { resourceId } = req.params;

  if (!resourceId) {
    throw new ApiError(400, "resourceId and resourceType are required");
  }

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 20;

  const messages = await messageCache.getMessages(resourceId, page, limit);

  res.status(200).json({
    success: true,
    data: messages,
  });
});

export default {
  getMessages,
};
