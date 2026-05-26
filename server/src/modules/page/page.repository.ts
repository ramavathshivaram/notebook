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
  const page = await Page.findByIdAndDelete(pageId);
  return page;
};

const deleteAll = async (sectionId: string) => {
  const pages = await Page.deleteMany({
    sectionId,
  });

  return pages;
};

const update = async (pageId: IPage["_id"], updatedPage: Partial<IPage>) => {
  const page = await Page.findByIdAndUpdate(pageId, updatedPage, {
    new: true,
  });

  console.log(page)
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
