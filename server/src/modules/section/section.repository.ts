import sectionModel, { type ISection } from "./section.model.js";

const createSection = async (section: Partial<ISection>) => {
  const res = await sectionModel.create(section);
  return res;
};

const getSections = async (authId: ISection["authId"]) => {
  const res = await sectionModel
    .find({ authId })
    .select("title _id")
    .sort({ createdAt: -1 })
    .lean();
  if (!res) return [];
  return res;
};

const deleteSection = async (sectionId: ISection["_id"]) => {
  const res = await sectionModel.findByIdAndDelete(sectionId);
  return res;
};

const renameSection = async (
  sectionId: ISection["_id"],
  title: string,
) => {
  const res = await sectionModel.findByIdAndUpdate(sectionId, { title });
  return res;
};

export default { createSection, getSections, deleteSection, renameSection };
