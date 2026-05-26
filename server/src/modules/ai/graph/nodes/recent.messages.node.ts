import { AIMessage, HumanMessage } from "@langchain/core/messages";
import type { Config, State } from "#types/graph.types.js";

import messageCache from "#modules/message/message.cache.js";

const recentMessagesNode = async (_state: State, config: Config) => {
  const resourceId = config?.context?.resourceId || "";

  const messages = await messageCache.getMessages(resourceId, 1, 5);

  return {
    recentMessages: messages
      .map((message) => `${message?.role}: ${message.content}`)
      .join("\n"),
  };
};

export default recentMessagesNode;
