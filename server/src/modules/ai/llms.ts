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

export const mainModel = createModel({
  model: MODELS.REASONING,
  temperature: 0.3,
});

export const checkerModel = createModel({
  model: MODELS.FAST,
  temperature: 0.1,
});

export const analysisModel = createModel({
  model: MODELS.REASONING,
  temperature: 0.2,
});

export const summaryModel = createModel({
  model: MODELS.FAST,
  temperature: 0.5,
});

export const titleModel = createModel({
  model: MODELS.LIGHT,
  temperature: 0.8,
});

export const suggestionModel = createModel({
  model: MODELS.LIGHT,
  temperature: 0.7,
});
