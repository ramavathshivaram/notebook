import {
  Annotation,
  MessagesAnnotation,
  StateGraph,
  START,
  END,
} from "@langchain/langgraph";
import checkpointer from "./checkpointer.js";
import llmNode from "./nodes/llm.node.js";
import pageNode from "./nodes/page.node.js";
import promptNode from "./nodes/prompt.node.js";
import recentMessagesNode from "./nodes/recent.messages.node.js";
import intentNode from "./nodes/intent.node.js";
import conditionalNode from "./nodes/conditional.node.js";
import pageLlmNode from "./nodes/page.llm.node.js";

const State = Annotation.Root({
  resourceContent: Annotation<string>(),
  prompt: Annotation<string>(),
  userInput: Annotation<string>(),
  intent: Annotation<string>(),
  task: Annotation<string>(),
  todos: Annotation<string[]>(),
  recentMessages: Annotation<string[]>(),
});

const graph = new StateGraph(State)
  .addNode("recentMessagesNode", recentMessagesNode)
  .addNode("pageNode", pageNode)
  .addNode("promptNode", promptNode)
  .addNode("intentNode", intentNode)
  .addNode("pageLLmNode", pageLlmNode)
  .addNode("llmNode", llmNode)

  .addEdge(START, "recentMessagesNode")
  .addEdge("recentMessagesNode", "intentNode")
  .addConditionalEdges("intentNode", conditionalNode, {
    pageNode: "pageNode",
    promptNode: "promptNode",
  })
  .addEdge("pageNode", "pageLLmNode")
  .addEdge("llmNode", END)
  .compile({
    checkpointer,
  });

export default graph;
