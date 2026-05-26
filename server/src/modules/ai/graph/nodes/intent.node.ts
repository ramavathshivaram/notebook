import INTENT_PROMPT from "../prompts/intent.prompt.js";
import { intentModel } from "#modules/ai/llms.js";
import type { Config, State } from "#types/graph.types.js";
import { HumanMessage, SystemMessage } from "langchain";

const intentNode = async (state: State, _config: Config) => {
  const recentMessages = state.recentMessages;

  const content = state.content;

  const response = await intentModel.invoke([
    new SystemMessage(INTENT_PROMPT),

    new HumanMessage(`
Recent Messages:
${recentMessages}

User Input:
${content}
`),
  ]);

  const parsed = JSON.parse(response.content.toString());

  return {
    intent: parsed.intent,
    task: parsed.task,
    todos: parsed.todos,
  };
};

export default intentNode;
