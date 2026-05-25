import mongoose, { Types } from "mongoose";

export interface IPage {
  _id: string;
  title: string;
  content: string;
  sectionId: string;
}

const pageSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      default: "",
    },
    sectionId: {
      type: Types.ObjectId,
      required: true,
      index: true,
    },
  },
  { timestamps: true },
);

const Page = mongoose.model<IPage>("Page", pageSchema);

export default Page;
