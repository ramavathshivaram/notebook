import { HumanMessage } from "@langchain/core/messages";
import graph from "./graph.js";

const invokeGraph = async (content: string, resourceId: string) => {
  const messages = [new HumanMessage(content)];

  const config = {
    configurable: { thread_id: resourceId },
    context: { resourceId },
  };

  const response = await graph.invoke(
    {
      messages,
    },
    config,
  );

  const lastMessage = response.messages.at(-1);

  return lastMessage?.content ?? "";
};

export default invokeGraph;
