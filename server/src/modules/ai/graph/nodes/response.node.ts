import type { Config, State } from "#types/graph.types.js";

const responseNode = async (state: State, config: Config) => {
  const { updatedResourceContent } = state;

  const aiContent = state?.pageResponse?.aiContent;

  if (aiContent) {
    return {
      resourceContent: updatedResourceContent,
      aiContent,
    };
  }

  return {
    aiContent,
    resourceContent: undefined,
  };
};

export default responseNode;
