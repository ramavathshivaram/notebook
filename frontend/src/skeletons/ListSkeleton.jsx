import React from "react";
import { motion } from "framer-motion";

const ListSkeleton = ({ count = 5 }) => {
  return (
    <div className="space-y-3 p-2">
      {[...Array(count)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0.3 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            repeatType: "reverse",
            delay: i * 0.1,
          }}
          className="flex items-center space-x-3 p-4 bg-gray-200 rounded-md dark:bg-gray-700"
        >

        </motion.div>
      ))}
    </div>
  );
};

export default ListSkeleton;
