import type { State } from "../graph.js";

const routeIntent = (state: typeof State.State) => {
  switch (state.intent) {
    case "rewrite":
      return "pageFlow";

    case "chat":
      return "chatFlow";

    default:
      return "chatFlow";
  }
};

export default routeIntent;
