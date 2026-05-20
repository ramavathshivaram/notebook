import asyncHandler from "express-async-handler";
import type { Request, Response } from "express";
import pageRepository from "./page.repository.js";

const createPage = asyncHandler(async (req: Request, res: Response) => {
  const { sectionId, title } = req.body;

  const page = await pageRepository.create(sectionId, title);

  res.status(201).json({
    data: page,
    message: "Page created successfully",
    status: true,
  });
});

const getPage = asyncHandler(async (req: Request, res: Response) => {
  const { pageId } = req.params;

  const page = await pageRepository.get(pageId);

  res.status(200).json({ data: page, status: true });
});

const deletePage = asyncHandler(async (req: Request, res: Response) => {
  const { pageId } = req.params;
  const page = await pageRepository.deletePage(pageId);

  res
    .status(200)
    .json({ message: "Page deleted successfully", status: true, data: page });
});

const updatePage = asyncHandler(async (req: Request, res: Response) => {
  const { pageId } = req.params;

  const page = await pageRepository.update(pageId, req.body);

  res
    .status(200)
    .json({ page, message: "Page updated successfully", status: true });
});

const getPages = asyncHandler(async (req: Request, res: Response) => {
  const sectionId = req.params.sectionId;

  const pages = await pageRepository.getAllSectionPages(sectionId);

  res.status(200).json({
    data: pages,
    message: "sections pages",
    status: true,
  });
});

export default {
  createPage,
  getPage,
  updatePage,
  deletePage,
  getPages
};
