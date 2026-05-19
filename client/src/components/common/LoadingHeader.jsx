import React from "react";
import { motion } from "framer-motion";

const LoadingHeader = () => {
  return (
    <div className="fixed top-0 left-0 right-0 w-full h-1 z-50 overflow-hidden">
      <motion.div
        initial={{ x: 0 }}
        animate={{
          x: "100vh",
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear",
        }}
        className="h-0.75 w-50 bg-blue-600 rounded-full"
      />
    </div>
  );
};

export default LoadingHeader;
