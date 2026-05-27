import type { Config, State } from "#types/graph.types.js";

const responseNode = async (state: State, config: Config) => {
  const { updatedResourceContent, aiResponse } = state;

  const aiContent = state?.pageResponse?.aiContent;

  if (aiContent) {
    return {
      resourceContent: updatedResourceContent,
      aiResponse: aiContent,
    };
  }

  return {
    aiResponse,
    resourceContent: undefined,
  };
};

export default responseNode;
