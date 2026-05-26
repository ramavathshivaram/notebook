import graph from "./graph/graph.js";

interface Resource {
  resourceId: string;
  resourceType: string;
}

interface PageResponse {
  type: "page";
  operation: "update" | "replace" | "delete" | "insert";
  html: string;
  aiContent: string;
  startIndex?: number | undefined;
  endIndex?: number | undefined;
}

interface ChatResponse {
  type: "chat";
  chatResponse: string;
}

const invokeGraph = async (
  userInput: string,
  { resourceId, resourceType }: Resource,
): Promise<PageResponse | ChatResponse> => {
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
      userInput,
    },
    config,
  );

  console.log(response);

  if (response.pageResponse) {
    return response.pageResponse;
  }

  if (response.chatResponse) {
    return response.chatResponse;
  }

  return response.pageResponse;
};

export default invokeGraph;
