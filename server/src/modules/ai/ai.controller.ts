import asyncHandler from "express-async-handler";

import type { Request, Response } from "express";

import invokeGraph from "./invokeGraph.js";

import messageCache from "#modules/message/message.cache.js";

const ask = asyncHandler(async (req: Request, res: Response) => {
  const { content, resourceId, resourceType } = req.body;

  await messageCache.cacheMessage(resourceId, {
    role: "user",
    content,
    resourceId,
  });

  const response = await invokeGraph(content, {
    resourceId,
    resourceType,
  });

  const assistantMessage = await messageCache.cacheMessage(resourceId, {
    role: "assistant",
    content:
      response.type === "page" ? response.aiContent : response.chatResponse,
    resourceId,
  });

  console.log("controller", response);

  res.status(200).json({
    success: true,
    data: response,
  });
});

export default {
  ask,
};
