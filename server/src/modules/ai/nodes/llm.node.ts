import { SystemMessage } from "@langchain/core/messages";
import { mainModel } from "../llms.js";
import { SYSTEM_PROMPT } from "../prompts.js";

const llmNode = async (state) => {
  const response = await mainModel.invoke([
    new SystemMessage(SYSTEM_PROMPT),
    ...state.messages,
  ]);

  return {
    messages: [response],
  };
};

export default llmNode;
