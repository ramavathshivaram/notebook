import messageRepository from "./message.repository.js";
import type { Request, Response } from "express";
import asyncHandler from "express-async-handler";

const create = asyncHandler(async (req: Request, res: Response) => {
  const message = await messageRepository.createMessage(req.body);

  res.status(201).json({
    success: true,
    data: message,
  });
});

export default { create };
