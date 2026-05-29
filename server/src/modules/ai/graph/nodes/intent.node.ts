import z from "zod";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import INTENT_PROMPT from "../prompts/intent.prompt.js";
import { intentModel } from "#modules/ai/llms.js";
import type { Config, State } from "#types/graph.types.js";

const responseFormat = z.object({
  intent: z.enum([
    "chat",
    "rewrite",
    "summarize",
    "notes",
    "quiz",
    "flashcards",
    "todo",
  ]),
  task: z.string(),
  confidence: z.number().min(0).max(1),
});

const structuredModel = intentModel.withStructuredOutput(responseFormat);

const intentNode = async (state: State, _config: Config) => {
  const recentMessages = state.recentMessages;

  const userInput = state.userInput;

  const resourceContent = state.resourceContent.slice(0, 4000);

  const input = `
[RECENT_MESSAGES]
${recentMessages || "None"}

[RESOURCE_CONTENT]
${resourceContent || "None"}

[USER_INPUT]
${userInput}
`;

  try {
    const response = await structuredModel.invoke([
      new SystemMessage(INTENT_PROMPT),
      new HumanMessage(input),
    ]);

    return {
      intent: response.intent,
      task: response.task,
      confidence: response.confidence,
    };
  } catch {
    return {
      intent: "chat",
      task: userInput,
      confidence: 0.3,
    };
  }
};

export default intentNode;
