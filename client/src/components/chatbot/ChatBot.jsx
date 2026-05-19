import React, { useState } from "react";
import { SendHorizonal } from "lucide-react";
import AIHeader from "./AIHeader";
import Messages from "./Messages";

export const dummyMessages = [
  {
    id: 1,
    role: "assistant",
    content: "Hello 👋 How can I help you today?",
  },
  {
    id: 2,
    role: "user",
    content: "Create a React notes page",
  },
  {
    id: 3,
    role: "assistant",
    content:
      "Sure! I can help you build a notes page using React, Tailwind CSS, and Zustand.",
  },
  {
    id: 4,
    role: "user",
    content: "Add dark mode support too.",
  },
  {
    id: 5,
    role: "assistant",
    content:
      "Dark mode has been added using Tailwind's class strategy and localStorage persistence.",
  },
  {
    id: 6,
    role: "user",
    content: "Can you make the sidebar resizable?",
  },
  {
    id: 7,
    role: "assistant",
    content:
      "Yes! Use ResizablePanelGroup from shadcn/ui for a smooth resizable layout.",
  },
];

const ChatBot = () => {
  const [message, setMessage] = useState("");

  return (
    <div className="flex flex-col h-full bg-background border-l">
      {/* Header */}
      <AIHeader />

      {/* Messages */}

      <Messages messages={dummyMessages} />

      {/* Input */}
      <div className="border-t p-3">
        <form
          className="flex items-center gap-2"
          onSubmit={(e) => {
            e.preventDefault();

            if (!message.trim()) return;

            console.log(message);

            setMessage("");
          }}
        >
          <input
            type="text"
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 rounded-xl border bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary"
          />

          <button
            type="submit"
            className="rounded-xl bg-primary p-3 text-primary-foreground transition hover:opacity-90"
          >
            <SendHorizonal size={18} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatBot;
