import React from "react";

import { motion } from "motion/react";

const dots = [0, 1, 2];

const TypingSkeleton = () => {
  return (
    <div className="flex justify-start">
      <div
        className="
          relative overflow-hidden
          rounded-3xl rounded-bl-md
          border border-border
          bg-card/80 px-4 py-3
          shadow-sm backdrop-blur-xl
        "
      >
        {/* Glow */}
        <div
          className="
            absolute inset-0 opacity-40
            bg-gradient-to-r
            from-primary/5 via-transparent to-primary/5
          "
        />

        {/* Dots */}
        <div
          className="
            relative z-10 flex
            items-center gap-1.5
          "
        >
          {dots.map((dot) => (
            <motion.span
              key={dot}
              animate={{
                y: [0, -5, 0],
                opacity: [0.4, 1, 0.4],
                scale: [1, 1.15, 1],
              }}
              transition={{
                repeat: Infinity,
                duration: 1,
                delay: dot * 0.15,
                ease: "easeInOut",
              }}
              className="
                h-2.5 w-2.5 rounded-full
                bg-primary/70
              "
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TypingSkeleton;
