import ApiError from "#utils/ApiError.js";

import Canvas, { type ICanvas } from "./canvas.model.js";

const create = async (
  sectionId: ICanvas["sectionId"],
  title: ICanvas["title"],
) => {
  return await Canvas.create({
    title,
    sectionId,
  });
};

const get = async (canvasId: ICanvas["_id"]) => {
  const canvas = await Canvas.findById(canvasId);

  if (!canvas) {
    throw new ApiError(404, "canvas is not found");
  }

  return canvas;
};

const getAllSectionCanvass = async (sectionId: ICanvas["sectionId"]) => {
  const canvass = await Canvas.find({
    sectionId,
  })
    .select("_id title")
    .lean();

  return canvass || [];
};

const deleteCanvas = async (canvasId: ICanvas["_id"]) => {
  const canvas = await Canvas.findByIdAndDelete(canvasId);

  return canvas;
};

const update = async (
  canvasId: ICanvas["_id"],
  updatedcanvas: Partial<ICanvas>,
) => {
  const canvas = await Canvas.findByIdAndUpdate(canvasId, updatedcanvas, {
    new: true,
  });

  if (!canvas) {
    throw new ApiError(404, "canvas not found");
  }

  return canvas;
};

export default {
  create,
  get,
  deleteCanvas,
  update,
  getAllSectionCanvass,
};
