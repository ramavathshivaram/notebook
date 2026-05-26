import type { BaseMessage } from "@langchain/core/messages";
import { SystemMessage } from "@langchain/core/messages";

import { mainModel } from "../../llms.js";

interface State {
  messages: BaseMessage[];
}

const llmNode = async (state: State) => {
  const response = await mainModel.invoke([
    // new SystemMessage(SYSTEM_PROMPT),
    ...state.messages,
  ]);

  return {
    messages: [response],
  };
};

export default llmNode;
