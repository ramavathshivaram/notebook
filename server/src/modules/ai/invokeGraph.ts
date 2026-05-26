import { HumanMessage } from "@langchain/core/messages";

import graph from "./graph/graph.js";

interface Resource {
  resourceId: string;
  resourceType: string;
}

const invokeGraph = async (
  content: string,
  { resourceId, resourceType }: Resource,
) => {
  const config = {
    configurable: {
      thread_id: resourceId,
    },

    context: {
      resourceId,
      resourceType,
    },
  };

  const response = await graph.invoke(
    {
      content,
    },
    config,
  );

  return response.messages.at(-1)?.content?.toString() || "";
};

export default invokeGraph;
