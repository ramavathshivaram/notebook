import asyncHandler from "express-async-handler";
import type { Request, Response } from "express";

import canvasRepository from "./canvas.repository.js";

interface CanvasParams {
  canvasId: string;
}

interface SectionParams {
  sectionId: string;
}

const createCanvas = asyncHandler(async (req: Request, res: Response) => {
  const { sectionId, title } = req.body;

  const canvas = await canvasRepository.create(sectionId, title);

  res.status(201).json({
    data: canvas,
    message: "Canvas created successfully",
    status: true,
  });
});

const getCanvas = asyncHandler(
  async (req: Request<CanvasParams>, res: Response) => {
    const { canvasId } = req.params;

    const canvas = await canvasRepository.get(canvasId);

    res.status(200).json({
      data: canvas,
      status: true,
    });
  },
);

const deleteCanvas = asyncHandler(
  async (req: Request<CanvasParams>, res: Response) => {
    const { canvasId } = req.params;

    const canvas = await canvasRepository.deleteCanvas(canvasId);

    res.status(200).json({
      message: "Canvas deleted successfully",
      status: true,
      data: canvas,
    });
  },
);

const updateCanvas = asyncHandler(
  async (req: Request<CanvasParams>, res: Response) => {
    const { canvasId } = req.params;

    const canvas = await canvasRepository.update(canvasId, req.body);

    res.status(200).json({
      data: canvas,
      message: "Canvas updated successfully",
      status: true,
    });
  },
);

const getCanvases = asyncHandler(
  async (req: Request<SectionParams>, res: Response) => {
    const { sectionId } = req.params;

    const canvases = await canvasRepository.getAllSectionCanvass(sectionId);

    res.status(200).json({
      data: canvases,
      message: "Section canvases",
      status: true,
    });
  },
);

export default {
  createCanvas,
  getCanvas,
  updateCanvas,
  deleteCanvas,
  getCanvases,
};
