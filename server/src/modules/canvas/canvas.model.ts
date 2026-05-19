import mongoose, { Schema, Types } from "mongoose";

export interface ICanvas {
  title: string;
  content: string;
  sectionId: Types.ObjectId;
}

const canvasSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    content: {
      type: String,
      default: "",
    },

    sectionId: {
      type: Schema.Types.ObjectId,
      ref: "Section",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Canvas = mongoose.model<ICanvas>("Canvas", canvasSchema);

export default Canvas;
