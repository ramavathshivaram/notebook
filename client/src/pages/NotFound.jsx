import { motion } from "framer-motion";

import { AlertCircle, BookOpen, Home, Sparkles, Zap } from "lucide-react";

import { Link } from "react-router-dom";

const floatingAnimation = (duration, rotate = true) => ({
  animate: {
    y: [0, -20, 0],
    rotate: rotate ? [0, 8, -8, 0] : 0,
  },

  transition: {
    repeat: Infinity,
    duration,
    ease: "easeInOut",
  },
});

const NotFound = () => {
  return (
    <div
      className="
        relative flex min-h-screen items-center
        justify-center overflow-hidden
        bg-background px-6
      "
    >
      {/* Background Grid */}
      <div
        className="
          absolute inset-0 opacity-40
          [background-image:radial-gradient(hsl(var(--border))_1px,transparent_1px)]
          [background-size:24px_24px]
        "
      />

      {/* Glow */}
      <div
        className="
          absolute left-1/2 top-1/2 h-[500px] w-[500px]
          -translate-x-1/2 -translate-y-1/2
          rounded-full bg-primary/5 blur-3xl
        "
      />

      {/* Floating Icons */}
      <motion.div
        {...floatingAnimation(4)}
        className="
          absolute left-12 top-20
          rounded-2xl border border-border
          bg-card p-4 text-muted-foreground shadow-sm
        "
      >
        <Zap className="h-6 w-6" />
      </motion.div>

      <motion.div
        {...floatingAnimation(5)}
        className="
          absolute bottom-20 right-20
          rounded-2xl border border-border
          bg-card p-4 text-muted-foreground shadow-sm
        "
      >
        <BookOpen className="h-7 w-7" />
      </motion.div>

      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{
          repeat: Infinity,
          duration: 3,
          ease: "easeInOut",
        }}
        className="
          absolute right-1/4 top-1/2
          rounded-2xl border border-border
          bg-card p-4 text-muted-foreground shadow-sm
        "
      >
        <Sparkles className="h-7 w-7" />
      </motion.div>

      {/* Main Card */}
      <motion.div
        initial={{
          opacity: 0,
          scale: 0.96,
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
          relative z-10 w-full max-w-xl overflow-hidden
          rounded-[32px] border border-border
          bg-card/80 p-10 text-center
          shadow-2xl backdrop-blur-xl
        "
      >
        {/* Top Icon */}
        <motion.div
          animate={{
            rotate: [0, 8, -8, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 3,
          }}
          className="
            mx-auto mb-6 flex h-16 w-16
            items-center justify-center rounded-2xl
            border border-border bg-muted
          "
        >
          <AlertCircle className="h-8 w-8 text-destructive" />
        </motion.div>

        {/* 404 */}
        <motion.h1
          initial={{
            opacity: 0,
            y: -20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.7,
            type: "spring",
          }}
          className="
            text-7xl font-black tracking-tight
            text-foreground md:text-8xl
          "
        >
          404
        </motion.h1>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: 0.2,
            duration: 0.4,
          }}
          className="
            mt-4 text-2xl font-bold
            text-foreground
          "
        >
          Page Not Found
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: 0.35,
            duration: 0.4,
          }}
          className="
            mx-auto mt-3 max-w-md
            text-sm leading-6 text-muted-foreground
          "
        >
          The page you are looking for does not exist, may have been moved, or
          is temporarily unavailable.
        </motion.p>

        {/* Action */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: 0.5,
            duration: 0.4,
          }}
          className="mt-8"
        >
          <Link
            to="/"
            className="
              inline-flex items-center gap-2 rounded-2xl
              border border-border bg-primary
              px-6 py-3 text-sm font-medium
              text-primary-foreground shadow-lg
              transition-all duration-200
              hover:scale-[1.03]
            "
          >
            <Home className="h-4 w-4" />
            Return Home
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NotFound;
