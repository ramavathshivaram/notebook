import { AIMessage, HumanMessage } from "@langchain/core/messages";
import messageCache from "#modules/message/message.cache.js";

const recentMessagesNode = async (state, config) => {
  const resourceId = config.context.resourceId;

  const messages = await messageCache.getMessages(resourceId, 1, 5);

  const formattedMessages = messages.reverse().map((message) => {
    if (message.role === "assistant") {
      return new AIMessage(message.content);
    }

    return new HumanMessage(message.content);
  });

  return {
    messages: formattedMessages,
  };
};

export default recentMessagesNode;
