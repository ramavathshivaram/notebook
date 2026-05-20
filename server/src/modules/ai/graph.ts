import {
  StateSchema,
  MessagesValue,
  StateGraph,
  START,
  END,
} from "@langchain/langgraph";
import checkpointer from "./ckeckpointer.js";
import llmNode from "./nodes/llm.node.js";
import recentMessagesNode from "./nodes/recent.messages.node.js";

const State = new StateSchema({
  messages: MessagesValue,
});

const graph = new StateGraph(State)
  .addNode("llmNode", llmNode)
  .addNode("recentMessagesNode", recentMessagesNode)

  .addEdge(START, "recentMessagesNode")
  .addEdge("recentMessagesNode", "llmNode")
  .addEdge("llmNode", END)
  .compile({
    checkpointer,
  });

export default graph;
