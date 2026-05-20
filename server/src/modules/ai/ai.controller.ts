import asyncHandler from "express-async-handler";
import type { Request, Response } from "express";

import messageRepository from "#modules/message/message.repository.js";

const ask = asyncHandler(async (req: Request, res: Response) => {
  const { content, resourceId, resourceType } = req.body;

  await messageRepository.createMessage({
    role: "user",
    content,
    resourceId,
  });

  const assistantMessage = await messageRepository.createMessage({
    role: "assistant",
    content: "hello",
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
