import asyncHandler from "express-async-handler";
import type { Request, Response } from "express";
import sectionRepository from "./section.repository.js";
import { sectionQueue } from "#services/queues.js";

const createSection = asyncHandler(async (req: Request, res: Response) => {
  const authId = req.authId;
  const { title } = req.body;

  const section = await sectionRepository.createSection({
    title: title || "New Section",
    authId,
  });

  res.status(201).json({ section, message: "Section created", status: true });
});

const getSections = asyncHandler(async (req: Request, res: Response) => {
  const authId = req.authId;
  const sections = await sectionRepository.getSections(authId);

  res
    .status(201)
    .json({ data: sections, message: "feched sections", status: true });
});

const deleteSection = asyncHandler(async (req: Request, res: Response) => {
  const { sectionId } = req.params;

  await sectionRepository.deleteSection(sectionId);

  await sectionQueue.add("delete-pages-and-canvas", {
    sectionId,
  });

  res.status(200).json({ message: "Section deleted", status: true });
});

const renameSection = asyncHandler(async (req: Request, res: Response) => {
  const { sectionId } = req.params;
  const { title } = req.body;

  const section = await sectionRepository.renameSection(sectionId, title);

  res.status(200).json({
    section,
    message: "Section renamed successfully",
    status: true,
  });
});

export default { createSection, getSections, renameSection, deleteSection };
