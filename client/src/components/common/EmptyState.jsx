import { motion } from "framer-motion";

import { Pen, BookOpen, Sparkles } from "lucide-react";

const floating = {
  animate: {
    y: [0, -14, 0],
    transition: {
      repeat: Infinity,
      duration: 3,
      ease: "easeInOut",
    },
  },
};

const EmptyState = () => {
  return (
    <div
      className="
        relative flex h-full flex-1 flex-col
        items-center justify-center overflow-hidden
        bg-background px-6 text-center
      "
    >
      {/* Background Glow */}
      <div
        className="
          absolute inset-0 opacity-40
          [background-image:radial-gradient(hsl(var(--border))_1px,transparent_1px)]
          [background-size:22px_22px]
        "
      />

      {/* Floating Icons */}
      <motion.div
        variants={floating}
        animate="animate"
        className="
          absolute left-1/4 top-24
          rounded-2xl border border-border
          bg-card p-3 shadow-sm
        "
      >
        <Sparkles className="h-5 w-5 text-muted-foreground" />
      </motion.div>

      <motion.div
        animate={{
          y: [0, 12, 0],
          rotate: [0, 4, -4, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 4,
          ease: "easeInOut",
          delay: 0.3,
        }}
        className="
          absolute right-1/4 top-1/3
          rounded-2xl border border-border
          bg-card p-3 shadow-sm
        "
      >
        <Pen className="h-5 w-5 text-muted-foreground" />
      </motion.div>

      <motion.div
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 3.5,
          ease: "easeInOut",
          delay: 0.7,
        }}
        className="
          absolute bottom-28 left-1/2
          rounded-2xl border border-border
          bg-card p-3 shadow-sm
        "
      >
        <BookOpen className="h-5 w-5 text-muted-foreground" />
      </motion.div>

      {/* Main Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{
          duration: 0.45,
          ease: "easeOut",
        }}
        className="
          relative z-10 max-w-md rounded-3xl
          border border-border bg-card/80
          p-8 shadow-xl backdrop-blur-sm
        "
      >
        {/* Logo */}
        <div
          className="
            mx-auto mb-5 flex h-14 w-14 items-center justify-center
            rounded-2xl border border-border
            bg-muted
          "
        >
          <BookOpen className="h-6 w-6 text-foreground" />
        </div>

        {/* Text */}
        <h2 className="mb-2 text-2xl font-semibold text-foreground">
          Your Notebook is Ready
        </h2>

        <p className="text-sm leading-6 text-muted-foreground">
          Select a page or create a new one to start writing, sketching, and
          organizing your ideas.
        </p>
      </motion.div>
    </div>
  );
};

export default EmptyState;
