import { chatModel } from "#modules/ai/llms.js";
import type { Config, State } from "#types/graph.types.js";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import CHAT_SYSTEM_PROMPT from "../prompts/chat.prompt.js";

const chatFlow = async (state: State, _config: Config) => {
  const { recentMessages, resourceContent, userInput, steps } = state;

  const response = await chatModel.invoke([
    new SystemMessage(CHAT_SYSTEM_PROMPT),

    new HumanMessage(`
Recent Messages:
${recentMessages}

Steps:
${steps.join("\n")}

Notebook Content:
${resourceContent}

User Input:
${userInput}
`),
  ]);

  return {
    aiResponse: response.content,
  };
};

export default chatFlow;
