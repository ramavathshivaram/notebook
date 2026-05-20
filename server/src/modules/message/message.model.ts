import mongoose, { Types } from "mongoose";

export interface IMessage {
  role: string;
  content: string;
  resourceId: Types.ObjectId;
}

const messageSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },

    resourceId: {
      type: Types.ObjectId,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

messageSchema.index({
  resourceId: 1,
  createdAt: -1,
});

const Message = mongoose.model<IMessage>("Message", messageSchema);
export default Message;
