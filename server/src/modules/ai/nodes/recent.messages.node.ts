import { AIMessage, HumanMessage } from "@langchain/core/messages";

import messageRepository from "#modules/message/message.repository.js";

const recentMessagesNode = async (state, config) => {
  const resourceId = config.context.resourceId;

  const messages = await messageRepository.getMessages(resourceId, 1, 5);

  const formattedMessages = messages.reverse().map((message) => {
    if (message.role === "assistant") {
      return new AIMessage(message.content);
    }

    return new HumanMessage(message.content);
  });

  console.log(formattedMessages);

  return {
    messages: formattedMessages,
  };
};

export default recentMessagesNode;
