import React from "react";

import { motion } from "motion/react";
import { Bot } from "lucide-react";

const EmptyMessagesState = () => {
  return (
    <div className="flex h-full flex-1 items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex max-w-md flex-col items-center text-center"
      >
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl border bg-muted">
          <Bot className="h-10 w-10 text-primary" />
        </div>

        <h2 className="text-2xl font-bold">AI Assistant</h2>

        <p className="mt-3 text-sm text-muted-foreground">
          Ask questions, summarize notes, generate ideas, or improve your
          content.
        </p>

        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {[
            "Summarize notes",
            "Generate flashcards",
            "Explain topic",
            "Create quiz",
          ].map((item) => (
            <span
              key={item}
              className="rounded-full border bg-muted px-3 py-1 text-xs text-muted-foreground"
            >
              {item}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default EmptyMessagesState;
