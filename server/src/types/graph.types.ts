import type { BaseMessage } from "langchain";

export interface State {
  userInput: string;
  resourceContent: string;
  recentMessages: BaseMessage[];
  intent: string;
  confidence: number;
  task: string;
  steps: string[];
  recommendations: string[];
  retrievedContext: string;
  aiResponse: string;
  pageResponse: {
    operation: "update" | "replace" | "delete" | "insert" | "append";
    aiContent: string;
    html: string;
    startIndex?: number | undefined;
    endIndex?: number | undefined;
  };
  updatedResourceContent: string;
  suggestions: string[];
  error: string;
}

export interface Config {
  context?: {
    resourceId?: string;
    resourceType?: string;
  };
}
