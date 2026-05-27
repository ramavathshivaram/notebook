import type { Config, State } from "#types/graph.types.js";

import pageCache from "#modules/page/page.cache.js";

const savePageNode = async (state: State, config: Config) => {
  const resourceId = config?.context?.resourceId;

  if (!resourceId) {
    return {
      error: "Missing resourceId.",
    };
  }

  const updatedResourceContent = state.updatedResourceContent;

  if (!updatedResourceContent) {
    return {
      error: "Missing updated HTML.",
    };
  }

  await pageCache.updatePage(resourceId, {
    content: updatedResourceContent,
  });

  return {
    resourceContent: updatedResourceContent,
  };
};

export default savePageNode;
