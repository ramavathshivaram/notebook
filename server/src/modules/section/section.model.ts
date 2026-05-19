import mongoose, { Types } from "mongoose";

export interface ISection {
  title: string;
  authId: Types.ObjectId;
}

const sectionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    authId: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

const Section = mongoose.model<ISection>("Section", sectionSchema);
export default Section;
