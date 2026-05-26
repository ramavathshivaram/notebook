import type { BaseMessage } from "langchain";

export interface State {
  resourceContent: string;
  prompt: string;
  userInput: string;
  intent: string;
  task: string;
  todos: string[];
  recentMessages: string;
}

export interface Config {
  context?: {
    resourceId?: string;
    resourceType?: string;
  };
}
