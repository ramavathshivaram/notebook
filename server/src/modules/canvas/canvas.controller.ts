import asyncHandler from "express-async-handler";
import type { Request, Response } from "express";
import canvasRepository from "./canvas.repository.js";

const createCanvas = asyncHandler(async (req: Request, res: Response) => {
  const { sectionId, title } = req.body;

  const canvas = await canvasRepository.create(sectionId, title);

  res.status(201).json({
    data: canvas,
    message: "Canvas created successfully",
    status: true,
  });
});

const getCanvas = asyncHandler(async (req: Request, res: Response) => {
  const { canvasId } = req.params;

  const canvas = await canvasRepository.get(canvasId);

  res.status(200).json({ data: canvas, status: true });
});

const deleteCanvas = asyncHandler(async (req: Request, res: Response) => {
  const { canvasId } = req.params;
  const canvas = await canvasRepository.deleteCanvas(canvasId);

  res
    .status(200)
    .json({ message: "Canvas deleted successfully", status: true, data: canvas });
});

const updateCanvas = asyncHandler(async (req: Request, res: Response) => {
  const { canvasId } = req.params;

  const Canvas = await canvasRepository.update(canvasId, req.body);

  res
    .status(200)
    .json({ Canvas, message: "Canvas updated successfully", status: true });
});

const getCanvass = asyncHandler(async (req: Request, res: Response) => {
  const sectionId = req.params.sectionId;

  const Canvass = await canvasRepository.getAllSectionCanvass(sectionId);

  res.status(200).json({
    data: Canvass,
    message: "sections Canvass",
    status: true,
  });
});

export default {
  createCanvas,
  getCanvas,
  updateCanvas,
  deleteCanvas,
  getCanvass,
};
