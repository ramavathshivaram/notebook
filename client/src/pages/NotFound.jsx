import { motion } from "framer-motion";

import { AlertCircle, BookOpen, Home, Zap } from "lucide-react";

import { Link } from "react-router-dom";

const floatingAnimation = (duration, rotate = true) => ({
  animate: {
    y: [0, -20, 0],
    rotate: rotate ? [0, 10, -10, 0] : 0,
  },

  transition: {
    repeat: Infinity,
    duration,
    ease: "easeInOut",
  },
});

const NotFound = () => {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-muted px-6">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(120,119,198,0.15),transparent_60%)]" />

      {/* Floating Icons */}
      <motion.div
        {...floatingAnimation(4)}
        className="absolute left-10 top-20 text-muted-foreground/20"
      >
        <Zap className="h-12 w-12" />
      </motion.div>

      <motion.div
        {...floatingAnimation(5)}
        transition={{
          repeat: Infinity,
          duration: 5,
          ease: "easeInOut",
          delay: 0.5,
        }}
        className="absolute bottom-20 right-20 text-muted-foreground/20"
      >
        <BookOpen className="h-14 w-14" />
      </motion.div>

      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{
          repeat: Infinity,
          duration: 3,
          ease: "easeInOut",
        }}
        className="absolute right-1/4 top-1/2 text-muted-foreground/20"
      >
        <AlertCircle className="h-16 w-16" />
      </motion.div>

      {/* Main Card */}
      <motion.div
        initial={{
          opacity: 0,
          scale: 0.9,
          y: 40,
        }}
        animate={{
          opacity: 1,
          scale: 1,
          y: 0,
        }}
        transition={{
          duration: 0.6,
          ease: "easeOut",
        }}
        className="relative z-10 w-full max-w-lg rounded-3xl border bg-background/80 p-10 text-center shadow-2xl backdrop-blur"
      >
        <motion.h1
          initial={{
            opacity: 0,
            y: -40,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
            type: "spring",
          }}
          className="bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-7xl font-black text-transparent md:text-8xl"
        >
          404
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: 0.2,
            duration: 0.5,
          }}
          className="mt-4 text-2xl font-bold"
        >
          Page Not Found
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: 0.35,
            duration: 0.5,
          }}
          className="mt-3 text-muted-foreground"
        >
          The page you are looking for does not exist or may have been moved.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: 0.5,
            duration: 0.5,
          }}
          className="mt-8"
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-2xl bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-lg transition hover:scale-105"
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
