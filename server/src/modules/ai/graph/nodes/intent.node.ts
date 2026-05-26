import z from "zod";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";

import INTENT_PROMPT from "../prompts/intent.prompt.js";
import { intentModel } from "#modules/ai/llms.js";

import type { Config, State } from "#types/graph.types.js";

const responseFormat = z.object({
  intent: z.string(),
  task: z.string(),
  todos: z.array(z.string()),
});

const structuredModel = intentModel.withStructuredOutput(responseFormat);

const intentNode = async (state: State, _config: Config) => {
  const recentMessages = state.recentMessages;
  const content = state.userInput;

  const response = await structuredModel.invoke([
    new SystemMessage(INTENT_PROMPT),
    new HumanMessage(`
Recent Messages:
${recentMessages}

User Input:
${content}
`),
  ]);

  return {
    intent: response.intent,
    task: response.task,
    todos: response.todos,
  };
};

export default intentNode;
