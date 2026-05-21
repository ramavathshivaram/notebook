import asyncHandler from "express-async-handler";
import type { Request, Response } from "express";

import invokeGraph from "./invokeGraph.js";
import messageCache from "#modules/message/message.cache.js";

const ask = asyncHandler(async (req: Request, res: Response) => {
  const { content, resourceId, resourceType } = req.body;

  await messageCache.cacheMessage({
    role: "user",
    content,
    resourceId,
  });

  const response = await invokeGraph(content, resourceId);

  const assistantMessage = await messageCache.cacheMessage({
    role: "assistant",
    content: response || "",
    resourceId,
  });

  res.status(200).json({
    success: true,
    data: assistantMessage,
  });
});

export default {
  ask,
};
