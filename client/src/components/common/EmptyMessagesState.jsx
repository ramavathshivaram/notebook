import React from "react";

import { motion } from "motion/react";

import { Sparkles, MessageSquare, Bot } from "lucide-react";

const EmptyMessagesState = () => {
  return (
    <div
      className="
        relative flex h-full
        flex-1 items-center
        justify-center overflow-hidden
        px-6
      "
    >
      {/* Background Glow */}
      <div
        className="
          absolute inset-0 opacity-40
          bg-[radial-gradient(circle_at_center,hsl(var(--primary)/0.08),transparent_60%)]
        "
      />

      {/* Floating Icons */}
      <motion.div
        animate={{
          y: [0, -15, 0],
          rotate: [0, 8, -8, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 4,
          ease: "easeInOut",
        }}
        className="
          absolute left-10 top-20
          text-muted-foreground/20
        "
      >
        <MessageSquare className="h-10 w-10" />
      </motion.div>

      <motion.div
        animate={{
          y: [0, 12, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 5,
          ease: "easeInOut",
        }}
        className="
          absolute bottom-24 right-16
          text-muted-foreground/20
        "
      >
        <Sparkles className="h-12 w-12" />
      </motion.div>

      {/* Main Content */}
      <motion.div
        initial={{
          opacity: 0,
          scale: 0.92,
          y: 30,
        }}
        animate={{
          opacity: 1,
          scale: 1,
          y: 0,
        }}
        transition={{
          duration: 0.5,
          ease: "easeOut",
        }}
        className="
          relative z-10 w-full
          max-w-md rounded-3xl
          border border-border
          bg-background/70 p-8
          text-center shadow-xl
          backdrop-blur-xl
        "
      >
        {/* Bot Icon */}
        <motion.div
          animate={{
            y: [0, -8, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 2.5,
            ease: "easeInOut",
          }}
          className="
            mx-auto mb-6 flex
            h-20 w-20 items-center
            justify-center rounded-3xl
            border border-border
            bg-muted/50
          "
        >
          <Bot className="h-10 w-10 text-primary" />
        </motion.div>

        {/* Title */}
        <h2
          className="
            text-2xl font-bold
            tracking-tight
          "
        >
          AI Assistant
        </h2>

        {/* Description */}
        <p
          className="
            mt-3 text-sm leading-7
            text-muted-foreground
          "
        >
          Start a conversation with your notebook assistant.
          <br />
          Ask questions, summarize notes, generate ideas, or improve your
          content instantly.
        </p>

        {/* Suggestions */}
        <div
          className="
            mt-6 flex flex-wrap
            justify-center gap-2
          "
        >
          {[
            "Summarize notes",
            "Generate flashcards",
            "Explain topic",
            "Create quiz",
          ].map((item) => (
            <div
              key={item}
              className="
                rounded-full border
                border-border bg-muted/40
                px-3 py-1.5 text-xs
                text-muted-foreground
              "
            >
              {item}
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default EmptyMessagesState;
