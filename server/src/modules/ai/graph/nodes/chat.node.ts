import { chatModel } from "#modules/ai/llms.js";

import type { Config, State } from "#types/graph.types.js";

import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import CHAT_SYSTEM_PROMPT from "../prompts/chat.prompt.js";

const chatNode = async (state: State, _config: Config) => {
  const { userInput, recentMessages, intent, task } = state;

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
`;

  const response = await chatModel.invoke([
    new SystemMessage(CHAT_SYSTEM_PROMPT),
    new HumanMessage(prompt),
  ]);

  return {
    chatResponse: {
      type: "chat",
      chatResponse:
        typeof response.content === "string"
          ? response.content
          : JSON.stringify(response.content),
    },
    pageResponse: undefined,
  };
};

export default chatNode;
