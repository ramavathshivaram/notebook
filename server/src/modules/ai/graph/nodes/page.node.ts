import pageCache from "#modules/page/page.cache.js";
import type { Config, State } from "#types/graph.types.js";

const pageNode = async (_state: State, config: Config) => {
  const resourceId = config?.context?.resourceId || "";

  const page = (await pageCache.getPage(resourceId)) as {
    content: string;
  } | null;

  return {
    resourceContent: page?.content || "",
  };
};

export default pageNode;
