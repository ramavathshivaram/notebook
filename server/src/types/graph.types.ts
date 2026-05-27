import type { BaseMessage } from "langchain";

export interface State {
  userInput: string;
  resourceContent: string;
  recentMessages: BaseMessage[];
  intent: string;
  confidence: number;
  task: string;
  recommendations: string[];
  retrievedContext: string;
  aiContent: string;
  pageResponse: {
    operation: "update" | "replace" | "delete" | "insert" | "append";
    aiContent: string;
    html: string;
    startIndex?: number | undefined;
    endIndex?: number | undefined;
  };
  updatedResourceContent: string;
  error: string;
}

export interface Config {
  context?: {
    resourceId?: string;
    resourceType?: string;
  };
}
