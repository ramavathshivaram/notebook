import { suggestionModel } from "#modules/ai/llms.js";
import type { State } from "#types/graph.types.js";
import { HumanMessage, SystemMessage } from "langchain";
import z from "zod";
import SUGGESTIONS_PROMPT from "../prompts/suggestion.prompt.js";

const responseFormat = z.object({
  suggestions: z.array(z.string()),
});

const structuredModel = suggestionModel.withStructuredOutput(responseFormat);

const suggestionNode = async (state: State) => {
  const { aiResponse, intent } = state;

  const prompt = `
USER REQUEST:
${aiResponse}

INTENT:
${intent || "None"}

SUGGESTIONS:
`;

  const response = await structuredModel.invoke([
    new SystemMessage(SUGGESTIONS_PROMPT),
    new HumanMessage(prompt),
  ]);

  return {
    suggestions: response.suggestions,
  };
};

export default suggestionNode;
