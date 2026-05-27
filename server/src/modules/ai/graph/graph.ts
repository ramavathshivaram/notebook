import { Annotation, StateGraph, START, END } from "@langchain/langgraph";

import contextNode from "./nodes/context.node.js";
import intentNode from "./nodes/intent.node.js";
import plannerNode from "./nodes/planner.node.js";
import responseNode from "./nodes/response.node.js";
import routeIntent from "./nodes/route-intent.node.js";

import chatFlow from "./flows/chat.flow.js";
import pageFlow from "./flows/page.flow.js";
import patchNode from "./nodes/patch.node.js";
import savePageNode from "./nodes/save-page.node.js";

export const State = Annotation.Root({
  userInput: Annotation<string>(),
  resourceContent: Annotation<string>(),
  recentMessages: Annotation<string[]>(),
  intent: Annotation<string>(),
  confidence: Annotation<number>(),
  task: Annotation<string>(),
  retrievedContext: Annotation<string>(),
  aiContent: Annotation<string>(),
  pageResponse: Annotation<{
    operation: "update" | "replace" | "delete" | "insert" | "append";
    aiContent: string;
    html: string;
    startIndex?: number | undefined;
    endIndex?: number | undefined;
  }>(),
  updatedResourceContent: Annotation<string>(),
  error: Annotation<string>(),
});

const graph = new StateGraph(State)
  .addNode("contextNode", contextNode)
  .addNode("intentNode", intentNode)
  .addNode("plannerNode", plannerNode)
  .addNode("chatFlow", chatFlow)
  .addNode("pageFlow", pageFlow)
  .addNode("patchNode", patchNode)
  .addNode("savePageNode", savePageNode)
  .addNode("responseNode", responseNode)

  .addEdge(START, "contextNode")
  .addEdge("contextNode", "intentNode")
  .addEdge("intentNode", "plannerNode")
  .addConditionalEdges("plannerNode", routeIntent)
  .addEdge("chatFlow", "responseNode")
  .addEdge("pageFlow", "patchNode")
  .addEdge("patchNode", "savePageNode")
  .addEdge("savePageNode", "responseNode")
  .addEdge("responseNode", END)
  .compile();

export default graph;
