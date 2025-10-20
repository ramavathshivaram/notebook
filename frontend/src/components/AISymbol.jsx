import Lottie from "lottie-react";
import { motion } from "framer-motion";
import animationData from "../assets/Meta AI logo.json";

const AISymbol = ({ handleAI }) => {
  return (
    <motion.div
      onClick={handleAI}
      className="fixed left-1/2 bottom-5 w-12 -translate-x-1/2 cursor-pointer z-50"
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.9 }}
      animate={{
        y: [0, -8, 0],
      }}
      transition={{
        repeat: Infinity,
        duration: 3,
        ease: "easeInOut",
      }}
    >
      <Lottie animationData={animationData} loop autoplay />
    </motion.div>
  );
};

export default AISymbol;
