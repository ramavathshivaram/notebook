import React from "react";

import { motion } from "framer-motion";

const LoadingHeader = () => {
  return (
    <div
      className="
        fixed left-0 top-0 z-50 h-1 w-full overflow-hidden
        bg-transparent
      "
    >
      {/* Track */}
      <div className="absolute inset-0 bg-border/40" />

      {/* Animated Bar */}
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: "100vw" }}
        transition={{
          duration: 1.2,
          repeat: Infinity,
          ease: "linear",
        }}
        className="
          absolute left-0 top-0 h-full w-40 rounded-full
          bg-primary shadow-[0_0_12px_hsl(var(--primary))]
        "
      />

      {/* Glow */}
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: "100vw" }}
        transition={{
          duration: 1.2,
          repeat: Infinity,
          ease: "linear",
        }}
        className="
          absolute left-0 top-0 h-full w-56 blur-md
          bg-primary/40
        "
      />
    </div>
  );
};

export default LoadingHeader;
