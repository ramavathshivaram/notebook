import React from "react";

import { motion } from "motion/react";

import { Skeleton } from "@/components/ui/skeleton";

const ToolButton = ({ size = "h-10 w-10" }) => (
  <Skeleton
    className={`
      ${size}
      rounded-2xl bg-muted
    `}
  />
);

const CanvasEditorSkeleton = () => {
  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      className="
        relative flex h-full
        w-full flex-col overflow-hidden
        bg-background
      "
    >
      {/* Top Glow */}
      <div
        className="
          pointer-events-none absolute
          inset-x-0 top-0 z-0 h-40
          bg-gradient-to-b
          from-primary/5 to-transparent
        "
      />

      {/* Toolbar */}
      <div
        className="
          relative z-10 flex
          items-center justify-between
          border-b border-border
          bg-background/80
          px-6 py-4
          backdrop-blur-xl
        "
      >
        {/* Left */}
        <div
          className="
            flex items-center gap-3
          "
        >
          <ToolButton />

          <ToolButton />

          <ToolButton />

          <ToolButton />

          <div
            className="
              mx-1 h-6 w-px
              bg-border
            "
          />

          <ToolButton size="h-10 w-32" />
        </div>

        {/* Right */}
        <div
          className="
            flex items-center gap-3
          "
        >
          <ToolButton />

          <ToolButton />
        </div>
      </div>

      {/* Title */}
      <div
        className="
          relative z-10 border-b
          border-border bg-background/70
          px-6 py-4 backdrop-blur-xl
        "
      >
        <div
          className="
            flex items-center gap-4
          "
        >
          <Skeleton
            className="
              hidden h-11 w-11
              rounded-2xl bg-muted
              md:block
            "
          />

          <Skeleton
            className="
              h-9 w-72
              rounded-xl bg-muted
            "
          />
        </div>
      </div>

      {/* Canvas */}
      <div
        className="
          relative flex-1 overflow-hidden
          bg-background
        "
      >
        {/* Grid */}
        <div
          className="
            absolute inset-0 opacity-[0.05]
            bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)]
            bg-[size:32px_32px]
            dark:bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)]
          "
        />

        {/* Floating Nodes */}
        <motion.div
          animate={{
            y: [0, -6, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 4,
            ease: "easeInOut",
          }}
          className="
            absolute left-10 top-10
          "
        >
          <Skeleton
            className="
              h-32 w-72 rounded-3xl
              border border-border
              bg-muted shadow-sm
            "
          />
        </motion.div>

        <motion.div
          animate={{
            y: [0, 8, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 5,
            ease: "easeInOut",
          }}
          className="
            absolute right-20 top-28
          "
        >
          <Skeleton
            className="
              h-40 w-80 rounded-3xl
              border border-border
              bg-muted shadow-sm
            "
          />
        </motion.div>

        <motion.div
          animate={{
            y: [0, -5, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 4.5,
            ease: "easeInOut",
          }}
          className="
            absolute bottom-24 left-1/3
          "
        >
          <Skeleton
            className="
              h-36 w-96 rounded-3xl
              border border-border
              bg-muted shadow-sm
            "
          />
        </motion.div>

        {/* Connections */}
        <div
          className="
            absolute left-[280px]
            top-[120px] h-px
            w-48 bg-border
          "
        />

        <div
          className="
            absolute right-[340px]
            top-[250px] h-32
            w-px bg-border
          "
        />
      </div>

      {/* Footer */}
      <div
        className="
          relative z-10 flex
          items-center justify-between
          border-t border-border
          bg-background/80 px-6
          py-4 backdrop-blur-xl
        "
      >
        {/* Left */}
        <div
          className="
            flex items-center gap-3
          "
        >
          <Skeleton
            className="
              h-5 w-28
              rounded-lg bg-muted
            "
          />

          <Skeleton
            className="
              h-5 w-20
              rounded-lg bg-muted
            "
          />
        </div>

        {/* Right */}
        <div
          className="
            flex items-center gap-3
          "
        >
          <Skeleton
            className="
              h-10 w-24
              rounded-2xl bg-muted
            "
          />

          <Skeleton
            className="
              h-10 w-28
              rounded-2xl bg-muted
            "
          />
        </div>
      </div>

      {/* Bottom Fade */}
      <div
        className="
          pointer-events-none absolute
          inset-x-0 bottom-0 z-20 h-16
          bg-gradient-to-t
          from-background to-transparent
        "
      />
    </motion.div>
  );
};

export default CanvasEditorSkeleton;
