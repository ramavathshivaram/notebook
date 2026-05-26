import type { Config, State } from "#types/graph.types.js";

const conditionalNode = async (_state: State, config: Config) => {
  return config?.context?.resourceType === "page" ? "pageNode" : "promptNode";
};

export default conditionalNode;
