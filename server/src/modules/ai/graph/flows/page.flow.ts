import { pageModel } from "#modules/ai/llms.js";
import type { Config, State } from "#types/graph.types.js";

import { HumanMessage, SystemMessage } from "@langchain/core/messages";

import z from "zod";

import PAGE_SYSTEM_PROMPT from "../prompts/page.system.prompt.js";
import { createIndexedText } from "../utils.js";

const responseFormat = z.object({
  operation: z.enum(["update", "replace", "insert", "delete", "append"]),
  aiContent: z.string(),
  html: z.string(),
  startIndex: z.number().optional(),
  endIndex: z.number().optional(),
});

const structuredModel = pageModel.withStructuredOutput(responseFormat);

const pageFlow = async (state: State, _config: Config) => {
  const { userInput, recentMessages, resourceContent, intent, task } = state;

  const indexedText = createIndexedText(resourceContent);

  const prompt = `
USER REQUEST:
${userInput}

INTENT:
${intent || "None"}

TASK:
${task || "None"}

RECENT MESSAGES:
${recentMessages || "None"}

CURRENT HTML WITH INDEXES:
${indexedText}

Rules:
- startIndex and endIndex refer to RAW HTML string positions.
- Indexes must match the ORIGINAL HTML exactly.
- Preserve valid HTML structure.
- Never break HTML tags.
- Never cut inside tag syntax.
- update replaces a partial HTML range.
- replace replaces the entire document.
- insert inserts HTML at a position.
- delete removes an HTML range.
- append adds content to the end.

Return exactly ONE structured operation.
`;

  const response = await structuredModel.invoke([
    new SystemMessage(PAGE_SYSTEM_PROMPT),
    new HumanMessage(prompt),
  ]);

  return {
    pageResponse: {
      operation: response.operation,
      aiContent: response.aiContent,
      html: response.html,
      startIndex: response.startIndex,
      endIndex: response.endIndex,
    },
  };
};

export default pageFlow;
