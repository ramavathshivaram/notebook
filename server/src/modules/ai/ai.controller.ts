import asyncHandler from "express-async-handler";
import type { Request, Response } from "express";

import messageRepository from "#modules/message/message.repository.js";
import invokeGraph from "./invokeGraph.js";

const ask = asyncHandler(async (req: Request, res: Response) => {
  const { content, resourceId, resourceType } = req.body;

  await messageRepository.createMessage({
    role: "user",
    content,
    resourceId,
  });

  const response = await invokeGraph(content, resourceId);

  const assistantMessage = await messageRepository.createMessage({
    role: "assistant",
    content: response,
    resourceId,
  });

  return res.status(200).json({
    success: true,
    data: assistantMessage,
  });
});

export default {
  ask,
};
