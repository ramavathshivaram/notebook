import z from "zod";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import type { Config, State } from "#types/graph.types.js";
import PLANNER_PROMPT from "../prompts/planner.prompt.js";
import { plannerModel } from "#modules/ai/llms.js";

const responseFormat = z.object({
  steps: z.array(z.string()),
});

const structuredModel = plannerModel.withStructuredOutput(responseFormat);

const plannerNode = async (state: State, _config: Config) => {
  const { intent, task, userInput, resourceContent } = state;

  const trimmedContent = resourceContent.slice(0, 3000);

  try {
    const response = await structuredModel.invoke([
      new SystemMessage(PLANNER_PROMPT),

      new HumanMessage(`
Intent:
${intent}

Task:
${task}

User Input:
${userInput}

Resource Content:
${trimmedContent}
`),
    ]);

    return {
      steps: response.steps,
    };
  } catch {
    return {
      steps: ["analyze user request", "generate response"],
    };
  }
};

export default plannerNode;
