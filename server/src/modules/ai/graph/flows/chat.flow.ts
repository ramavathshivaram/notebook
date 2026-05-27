import { chatModel } from "#modules/ai/llms.js";
import type { Config, State } from "#types/graph.types.js";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import CHAT_SYSTEM_PROMPT from "../prompts/chat.prompt.js";

const chatFlow = async (state: State, _config: Config) => {
  const { recentMessages, resourceContent, userInput } = state;
  const trimmedContent = resourceContent.slice(0, 4000);

  const response = await chatModel.invoke([
    new SystemMessage(CHAT_SYSTEM_PROMPT),

    new HumanMessage(`
Recent Messages:
${recentMessages}

Notebook Content:
${trimmedContent}

User Input:
${userInput}
`),
  ]);

  return {
    aiContent: response.content,
  };
};

export default chatFlow;
