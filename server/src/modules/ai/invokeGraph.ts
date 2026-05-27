import graph from "./graph/graph.js";

interface Resource {
  resourceId: string;
  resourceType: string;
}

interface Response {
  aiResponse: string;
  resourceContent: string | undefined;
}

const invokeGraph = async (
  userInput: string,
  { resourceId, resourceType }: Resource,
): Promise<Response> => {
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

  return response;
};

export default invokeGraph;
