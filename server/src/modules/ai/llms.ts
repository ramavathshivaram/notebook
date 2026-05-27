import env from "#configs/env.js";
import { ChatGroq } from "@langchain/groq";

export const MODELS = {
  REASONING: "llama-3.3-70b-versatile",
  FAST: "llama-3.1-8b-instant",
  LIGHT: "gemma2-9b-it",
} as const;

const createModel = ({
  model,
  temperature = 0.7,
}: {
  model: string;
  temperature?: number;
}) =>
  new ChatGroq({
    apiKey: env.GROQ_API_KEY,
    model,
    temperature,
  });

export const chatModel = createModel({
  model: MODELS.REASONING,
  temperature: 0.1,
});

export const pageModel = createModel({
  model: MODELS.REASONING,
  temperature: 0.1,
});

export const intentModel = createModel({
  model: MODELS.FAST,
  temperature: 0.3,
});

export const plannerModel = createModel({
  model: MODELS.FAST,
  temperature: 0.3,
});

export const suggestionModel = createModel({
  model: MODELS.FAST,
  temperature: 0.3,
});
