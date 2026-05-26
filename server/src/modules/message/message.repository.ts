import Message, { type IMessage } from "./message.model.js";

const createMessage = async (message: Partial<IMessage>) => {
  return await Message.create(message);
};

const getMessages = async (
  resourceId: IMessage["resourceId"],
  page = 1,
  limit = 20,
) => {
  return await Message.find(
    { resourceId },
    {
      role: 1,
      content: 1,
      _id: 0,
    },
  )
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit)
    .lean();
};

export default {
  createMessage,
  getMessages,
};
