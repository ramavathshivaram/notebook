import asyncHandler from "express-async-handler";
import type { Request, Response } from "express";
import pageRepository from "./page.repository.js";
import pageCache from "./page.cache.js";

const createPage = asyncHandler(async (req: Request, res: Response) => {
  const { sectionId, title } = req.body;

  const page = await pageCache.cachePage(sectionId, title);

  res.status(201).json({
    data: page,
    message: "Page created successfully",
    status: true,
  });
});

const getPage = asyncHandler(
  async (req: Request<{ pageId: string }>, res: Response) => {
    const pageId = req.params.pageId;

    const page = await pageCache.getPage(pageId);

    res.status(200).json({ data: page, status: true });
  },
);

const deletePage = asyncHandler(
  async (req: Request<{ pageId: string }>, res: Response) => {
    const pageId = req.params.pageId;
    const page = await pageCache.deletePage(pageId);

    res
      .status(200)
      .json({ message: "Page deleted successfully", status: true, data: page });
  },
);

const updatePage = asyncHandler(
  async (req: Request<{ pageId: string }>, res: Response) => {
    const pageId = req.params.pageId;

    const page = await pageCache.updatePage(pageId, req.body);

    res
      .status(200)
      .json({ page, message: "Page updated successfully", status: true });
  },
);

const getPages = asyncHandler(
  async (req: Request<{ sectionId: string }>, res: Response) => {
    const sectionId = req.params.sectionId;

    const pages = await pageRepository.getAllSectionPages(sectionId);

    res.status(200).json({
      data: pages,
      message: "sections pages",
      status: true,
    });
  },
);

export default {
  createPage,
  getPage,
  updatePage,
  deletePage,
  getPages,
};
