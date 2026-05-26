import { Annotation, StateGraph, START, END } from "@langchain/langgraph";

import checkpointer from "./checkpointer.js";

import llmNode from "./nodes/llm.node.js";
import pageNode from "./nodes/page.node.js";
import recentMessagesNode from "./nodes/recent.messages.node.js";
import intentNode from "./nodes/intent.node.js";
import pageLlmNode from "./nodes/page.llm.node.js";
import chatNode from "./nodes/chat.node.js";

const State = Annotation.Root({
  resourceContent: Annotation<string>(),
  userInput: Annotation<string>(),
  intent: Annotation<string>(),
  task: Annotation<string>(),
  todos: Annotation<string[]>(),
  recentMessages: Annotation<string>(),
  chatResponse: Annotation<{
    type: "chat";
    chatResponse: string;
  }>(),
  pageResponse: Annotation<{
    type: "page";
    operation: "update" | "replace" | "delete" | "insert";
    html: string;
    aiContent: string;
    startIndex?: number;
    endIndex?: number;
  }>(),
});

const graph = new StateGraph(State)
  .addNode("recentMessagesNode", recentMessagesNode)
  .addNode("intentNode", intentNode)
  .addNode("pageNode", pageNode)
  .addNode("pageLLmNode", pageLlmNode)
  .addNode("llmNode", llmNode)
  .addNode("chatNode", chatNode)

  .addEdge(START, "recentMessagesNode")
  .addEdge("recentMessagesNode", "intentNode")
  .addConditionalEdges(
    "intentNode",

    (_state, config) => {
      return config?.context?.resourceType === "page" ? "pageNode" : "llmNode";
    },

    {
      pageNode: "pageNode",

      llmNode: "llmNode",
    },
  )
  .addConditionalEdges(
    "pageNode",
    (state, _config) => {
      switch (state.intent) {
        case "chat":
        case "summarize":
          return "chatNode";
        default:
          return "pageLLmNode";
      }
    },
    {
      chatNode: "chatNode",

      pageLLmNode: "pageLLmNode",
    },
  )
  .addEdge("pageLLmNode", END)
  .addEdge("chatNode", END)
  .addEdge("llmNode", END)

  .compile({
    checkpointer,
  });

export default graph;
