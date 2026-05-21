import {
  AIMessage,
  HumanMessage,
  type BaseMessage,
} from "@langchain/core/messages";

import messageCache from "#modules/message/message.cache.js";

interface State {
  messages: BaseMessage[];
}

interface Config {
  context?: {
    resourceId?: string;
  };
}

interface CachedMessage {
  role: "assistant" | "user";
  content: string;
}

const recentMessagesNode = async (_state: State, config: Config) => {
  const resourceId = config?.context?.resourceId || "";

  const messages = (await messageCache.getMessages(
    resourceId,
    1,
    5,
  )) as CachedMessage[];

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
