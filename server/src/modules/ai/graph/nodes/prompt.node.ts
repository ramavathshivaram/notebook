import type { Config, State } from "#types/graph.types.js";

const promptNode = async (state: State, config: Config) => {
  const resourceType = config?.context?.resourceType || "";

  const recentMessages = state.messages
    .map((message) => `${message?.role}: ${message.content}`)
    .join("\n");

  const resourceContent = state.resourceContent;

  const content = state.content;

  const prompt =
    resourceType === "page"
      ? `
You are an AI notebook assistant.

Instructions:
- Answer using the provided page content.
- Keep responses clear and structured.
- Use markdown when useful.

Recent Messages:
${recentMessages}

Page Content:
${resourceContent}

User Input:
${content}
`
      : `
You are an AI drawing assistant.

Instructions:
- Answer based on the drawing/canvas context.
- Help explain diagrams, sketches, and visuals.

Recent Messages:
${recentMessages}

Canvas Content:
${resourceContent}

User Input:
${content}
`;

  return {
    prompt,
  };
};

export default promptNode;
