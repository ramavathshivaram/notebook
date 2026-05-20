import asyncHandler from "express-async-handler";

import type { Request, Response } from "express";

import pageRepository from "./page.repository.js";

export const persistCreatePage = asyncHandler(async (req: Request, res: Response) => {
  const page = await pageRepository.create(req.body);

  res.status(201).json({
    status: true,
    data: page,
  });
});

export const persistUpdatePage = asyncHandler(async (req: Request, res: Response) => {
  const page = await pageRepository.update(req.params.pageId, req.body);

  res.status(200).json({
    status: true,
    data: page,
  });
});

export const persistDeletePage = asyncHandler(async (req: Request, res: Response) => {
  const page = await pageRepository.deletePage(req.params.pageId);

  res.status(200).json({
    status: true,
    data: page,
  });
});

