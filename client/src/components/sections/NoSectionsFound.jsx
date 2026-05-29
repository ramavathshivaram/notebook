import React from "react";

import { motion } from "motion/react";

import { NotebookPen, Sparkles, Plus } from "lucide-react";

const particles = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  left: `${Math.random() * 100}%`,
  top: `${Math.random() * 100}%`,
  duration: 4 + Math.random() * 3,
  delay: Math.random() * 2,
}));

const NoSectionsFound = () => {
  return (
    <div className="relative flex flex-1 items-center justify-center overflow-hidden px-6">
      {/* Background Glow */}
      <div className="pointer-events-none absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_center,hsl(var(--primary)/0.08),transparent_65%)]" />

      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: [0, 1, 0], y: [0, -40, 0], x: [0, 20, -20, 0] }}
          transition={{
            repeat: Infinity,
            duration: particle.duration,
            delay: particle.delay,
            ease: "easeInOut",
          }}
          className="absolute h-2 w-2 rounded-full bg-primary/30"
          style={{ left: particle.left, top: particle.top }}
        />
      ))}

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 max-w-sm mt-5 text-center"
      >
        <motion.div
          animate={{ y: [0, -10, 0], rotate: [0, 5, -5, 0] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          className="relative mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl border border-dashed border-primary/20 bg-card shadow-lg"
        >
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/10 to-transparent" />
          <NotebookPen className="h-9 w-9 text-primary" />
        </motion.div>

        <motion.h2
          animate={{ opacity: [0.8, 1, 0.8] }}
          transition={{ repeat: Infinity, duration: 3 }}
          className="text-2xl font-black tracking-tight"
        >
          No Notebooks Yet
        </motion.h2>

        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Start organizing your ideas, notes, drawings, and AI workflows by
          creating your first notebook.
        </p>

        <motion.div
          animate={{ y: [0, -4, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="mt-6 inline-flex items-center gap-2 rounded-2xl border border-border bg-card/60 px-4 py-2 text-sm text-muted-foreground shadow-sm backdrop-blur-xl"
        >
          <Plus className="h-4 w-4" />
          Create your first notebook
          <Sparkles className="h-4 w-4 text-primary" />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NoSectionsFound;
