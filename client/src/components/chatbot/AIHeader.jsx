import React from "react";

import { motion } from "motion/react";

import { Bot, Sparkles } from "lucide-react";

const AIHeader = () => {
  return (
    <div
      className="
        relative overflow-hidden
        border-b border-border
        bg-background/80
        px-4 py-4
        backdrop-blur-xl
      "
    >
      {/* Glow */}
      <div
        className="
          pointer-events-none absolute
          inset-0 opacity-50
          bg-gradient-to-r
          from-primary/5 via-transparent to-primary/5
        "
      />

      <div
        className="
          relative z-10 flex items-center
          justify-between
        "
      >
        {/* Left */}
        <div className="flex items-center gap-3">
          {/* Icon */}
          <motion.div
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              repeat: Infinity,
              duration: 2.5,
              ease: "easeInOut",
            }}
            className="
              flex h-11 w-11 items-center
              justify-center rounded-2xl
              border border-border
              bg-card shadow-sm
            "
          >
            <Bot className="h-5 w-5" />
          </motion.div>

          {/* Text */}
          <div>
            <h2
              className="
                flex items-center gap-2
                text-base font-semibold
              "
            >
              AI Assistant
              <Sparkles
                className="
                  h-4 w-4 text-primary
                "
              />
            </h2>

            <p
              className="
                text-xs text-muted-foreground
              "
            >
              Ask anything about your notebook
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIHeader;
