import type { Config, State } from "#types/graph.types.js";

import messageCache from "#modules/message/message.cache.js";
import pageCache from "#modules/page/page.cache.js";

const contextNode = async (_state: State, config: Config) => {
  const resourceId = config?.context?.resourceId || "";

  const [messages, page] = await Promise.all([
    messageCache.getMessages(resourceId, 1, 5),

    pageCache.getPage(resourceId) as Promise<{
      content: string;
    }>,
  ]);

  return {
    recentMessages: messages
      .map((message) => `[${message.role}] ${message.content}`)
      .join("\n"),

    resourceContent: page?.content || "",
  };
};

export default contextNode;
