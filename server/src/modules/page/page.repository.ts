import ApiError from "#utils/ApiError.js";
import Page, { type IPage } from "./page.model.js";

const create = async (page: Partial<IPage>) => {
  return await Page.create(page);
};

const get = async (pageId: IPage["_id"]) => {
  const page = await Page.findById(pageId);
  if (!page) throw new ApiError(404, "page is not found");
  return page;
};

const getAllSectionPages = async (sectionId: IPage["sectionId"]) => {
  const pages = await Page.find({
    sectionId,
  })
    .select("_id title")
    .lean();

  return pages || [];
};

const deletePage = async (pageId: IPage["_id"]) => {
  return await Page.findByIdAndDelete(pageId);
};

const deleteAll = async (sectionId: string) => {
  return await Page.deleteMany({
    sectionId,
  });
};

const update = async (pageId: IPage["_id"], updatedPage: Partial<IPage>) => {
  const page = await Page.findByIdAndUpdate(pageId, updatedPage, {
    new: true,
  });

  if (!page) throw new ApiError(404, "page not found");
  return page;
};

export default {
  create,
  get,
  deletePage,
  update,
  getAllSectionPages,
  deleteAll,
};
