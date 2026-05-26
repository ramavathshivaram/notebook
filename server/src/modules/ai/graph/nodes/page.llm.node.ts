import { pageModel } from "#modules/ai/llms.js";
import type { Config, State } from "#types/graph.types.js";

import { HumanMessage, SystemMessage } from "@langchain/core/messages";

import z from "zod";

import PAGE_SYSTEM_PROMPT from "../prompts/page.system.prompt.js";

const responseFormat = z.discriminatedUnion("operation", [
  z.object({
    operation: z.literal("update"),
    startIndex: z.number().int().min(0),
    endIndex: z.number().int().min(0),
    html: z.string(),
    aiContent: z.string(),
  }),
  z.object({
    operation: z.literal("replace"),
    html: z.string(),
    aiContent: z.string(),
  }),
  z.object({
    operation: z.literal("delete"),
    startIndex: z.number().int().min(0),
    endIndex: z.number().int().min(0),
    aiContent: z.string(),
  }),
  z.object({
    operation: z.literal("insert"),
    index: z.number().int().min(0),
    html: z.string(),
    aiContent: z.string(),
  }),
]);

const structuredModel = pageModel.withStructuredOutput(responseFormat);

const pageLlmNode = async (state: State, _config: Config) => {
  const { userInput, recentMessages, resourceContent, intent, task } = state;

  const todos =
    state.todos?.map((todo, idx) => `${idx + 1}. ${todo}`).join("\n") || "None";

  const prompt = `
USER REQUEST:
${userInput}

INTENT:
${intent || "None"}

TASK:
${task || "None"}

TODOS:
${todos}

RECENT MESSAGES:
${recentMessages || "None"}

CURRENT HTML:
${resourceContent || "<p><br></p>"}

Return exactly ONE structured operation.
`;

  const response = await structuredModel.invoke([
    new SystemMessage(PAGE_SYSTEM_PROMPT),
    new HumanMessage(prompt),
  ]);

  switch (response.operation) {
    case "update": {
      const safeStart = Math.max(0, response.startIndex);
      const safeEnd = Math.min(resourceContent.length, response.endIndex);

      return {
        pageResponse: {
          type: "page",
          operation: "update",
          startIndex: safeStart,
          endIndex: safeEnd,
          html: response.html,
          aiContent: response.aiContent,
        }, chatResponse:undefined
      };
    }

    case "insert": {
      return {
        pageResponse: {
          type: "page",
          operation: "insert",
          index: Math.max(0, response.index),
          html: response.html,
          aiContent: response.aiContent,
        }, chatResponse:undefined
      };
    }

    case "delete": {
      return {
        pageResponse: {
          type: "page",
          operation: "delete",
          startIndex: Math.max(0, response.startIndex),
          endIndex: Math.min(resourceContent.length, response.endIndex),
          aiContent: response.aiContent,
        }, chatResponse:undefined
      };
    }

    case "replace": {
      return {
        pageResponse: {
          type: "page",
          operation: "replace",
          html: response.html,
          aiContent: response.aiContent,
        }, chatResponse:undefined
      };
    }
    default: {
      return {
        pageResponse: {
          type: "page",
          operation: "replace",
          html: resourceContent || "<p><br></p>",
          aiContent: "Unsupported operation.",
        },
        chatResponse:undefined
      };
    }
  }
};

export default pageLlmNode;
