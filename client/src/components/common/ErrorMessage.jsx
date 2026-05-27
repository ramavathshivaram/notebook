import { motion } from "framer-motion";

import { AlertCircle, RefreshCcw } from "lucide-react";

const ErrorMessage = ({ message = "Error loading sections" }) => {
  return (
    <div
      className="
        flex flex-1 items-center justify-center
        px-6 py-16
      "
    >
      <motion.div
        initial={{ opacity: 0, y: 16, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          duration: 0.45,
          ease: "easeOut",
        }}
        className="
          relative w-full max-w-md overflow-hidden
          rounded-3xl border border-border
          bg-card p-8 text-center shadow-xl
        "
      >
        {/* Background Glow */}
        <div
          className="
            absolute inset-0 opacity-30
            [background-image:radial-gradient(hsl(var(--border))_1px,transparent_1px)]
            [background-size:18px_18px]
          "
        />

        {/* Icon */}
        <motion.div
          animate={{
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 1.8,
            ease: "easeInOut",
          }}
          className="
            relative z-10 mx-auto mb-5 flex
            h-16 w-16 items-center justify-center
            rounded-2xl border border-border
            bg-muted
          "
        >
          <AlertCircle className="h-8 w-8 text-destructive" />
        </motion.div>

        {/* Text */}
        <div className="relative z-10 space-y-2">
          <h2 className="text-xl font-semibold text-foreground">
            Something went wrong
          </h2>

          <p className="text-sm text-muted-foreground">{message}</p>

          <p className="text-xs leading-5 text-muted-foreground">
            Please refresh the page or check your connection and try again.
          </p>
        </div>

        {/* Bottom Action Hint */}
        <div
          className="
            relative z-10 mt-6 flex items-center
            justify-center gap-2 text-xs
            text-muted-foreground
          "
        >
          <RefreshCcw className="h-3.5 w-3.5" />
          Retry loading
        </div>
      </motion.div>
    </div>
  );
};

export default ErrorMessage;
