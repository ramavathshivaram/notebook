import env from "#configs/env.js";

import { ChatGroq } from "@langchain/groq";

export const MODELS = {
  REASONING: "llama-3.3-70b-versatile",
  FAST: "llama-3.1-8b-instant",
} as const;

type CreateModelOptions = {
  model: string;
  temperature?: number;
  maxRetries?: number;
  streaming?: boolean;
};

const DEFAULT_CONFIG = {
  temperature: 0.3,
  maxRetries: 2,
  streaming: true,
};

const createModel = ({
  model,
  temperature = DEFAULT_CONFIG.temperature,
  maxRetries = DEFAULT_CONFIG.maxRetries,
  streaming = DEFAULT_CONFIG.streaming,
}: CreateModelOptions) => {
  return new ChatGroq({
    apiKey: env.GROQ_API_KEY,
    model,
    temperature,
    maxRetries,
    streaming,
  });
};

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
  temperature: 0.2,
});

export const plannerModel = createModel({
  model: MODELS.FAST,
  temperature: 0.2,
});

export const suggestionModel = createModel({
  model: MODELS.FAST,
  temperature: 0.5,
});
