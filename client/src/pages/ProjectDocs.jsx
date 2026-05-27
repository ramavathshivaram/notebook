import React from "react";

import { motion } from "motion/react";

import {
  BookOpen,
  Pen,
  Layers,
  Sparkles,
  Zap,
  Lock,
  Brain,
  PencilRuler,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

import BackGround from "@/components/common/BackGround";

const features = [
  {
    icon: Sparkles,
    title: "Animated UI",
    description:
      "Smooth interactions, transitions, hover effects, and polished motion throughout the app.",
  },

  {
    icon: Zap,
    title: "Fast & Responsive",
    description:
      "Built with React Query for efficient caching, instant updates, and responsive UX.",
  },

  {
    icon: Lock,
    title: "Secure",
    description:
      "JWT authentication and protected routes keep your notes and drawings private.",
  },
];

const aiFeatures = [
  "Generate structured AI notes instantly",
  "Optimize and rewrite notebook content",
  "Create AI-powered canvas drawings",
  "Real-time note organization assistance",
  "Minimal distraction-free writing experience",
];

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 30,
  },

  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.7,
      delay,
      ease: "easeOut",
    },
  }),
};

const ProjectDocs = () => {
  return (
    <div
      className="
        relative min-h-screen overflow-hidden
        bg-background text-foreground
      "
    >
      {/* Background */}
      <BackGround />

      {/* Overlay */}
      <div
        className="
          absolute inset-0 pointer-events-none
          bg-gradient-to-b
          from-background/70
          via-background/30
          to-background/80
        "
      />

      {/* Content */}
      <div className="relative z-10">
        <div
          className="
            container mx-auto px-4
            pt-24 pb-20
          "
        >
          {/* Hero */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.1}
            className="mx-auto max-w-5xl text-center"
          >
            {/* Badge */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0.2}
              className="mb-8 inline-flex"
            >
              <div
                className="
                  rounded-full border border-border
                  bg-card/50 px-4 py-2
                  text-xs text-muted-foreground
                  backdrop-blur-xl
                "
              >
                ✨ Interactive Notebook Documentation
              </div>
            </motion.div>

            {/* Title */}
            <motion.h1
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0.3}
              className="
                text-5xl font-black tracking-[-0.08em]
                sm:text-6xl md:text-7xl lg:text-8xl
                leading-none
              "
            >
              <span
                className="
                  bg-gradient-to-b
                  from-foreground
                  to-foreground/70
                  bg-clip-text text-transparent
                "
              >
                Notebook
              </span>

              <br />

              <span
                className="
                  bg-gradient-to-b
                  from-foreground
                  to-foreground/40
                  bg-clip-text text-transparent
                "
              >
                Documentation
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0.45}
              className="
                mx-auto mt-8 max-w-3xl
                text-lg leading-8 text-muted-foreground
                md:text-xl
              "
            >
              Explore the complete documentation for your React Notebook
              application with AI-powered notes, intelligent drawing tools,
              smooth animations, and modern productivity workflows.
            </motion.p>

            {/* Quick Stats */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0.6}
              className="
                mt-10 flex flex-wrap items-center
                justify-center gap-6
                text-sm text-muted-foreground
              "
            >
              <div className="flex items-center gap-2">
                <Pen className="h-4 w-4" />
                AI Notes
              </div>

              <div className="flex items-center gap-2">
                <Layers className="h-4 w-4" />
                Smart Sections
              </div>

              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                Canvas Drawing
              </div>
            </motion.div>
          </motion.div>

          {/* Main Feature Card */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.8}
            className="
              relative mx-auto mt-20 max-w-4xl
              overflow-hidden rounded-[32px]
              border border-border
              bg-card/60 p-8
              shadow-2xl backdrop-blur-2xl
            "
          >
            {/* Glow */}
            <div
              className="
                absolute inset-0 opacity-50
                bg-gradient-to-br
                from-primary/5 to-transparent
              "
            />

            <div className="relative z-10">
              <div className="flex items-start gap-5">
                {/* Icon */}
                <div
                  className="
                    flex h-16 w-16 shrink-0
                    items-center justify-center
                    rounded-2xl border border-border
                    bg-muted
                  "
                >
                  <Brain className="h-8 w-8" />
                </div>

                {/* Content */}
                <div>
                  <h2 className="text-2xl font-bold">
                    AI Notes & Smart Canvas
                  </h2>

                  <p
                    className="
                      mt-3 text-sm leading-7
                      text-muted-foreground
                    "
                  >
                    Your notebook combines AI-powered writing assistance with
                    intelligent canvas tools to create a modern productivity
                    workspace.
                  </p>

                  {/* Feature List */}
                  <div className="mt-6 grid gap-3">
                    {aiFeatures.map((feature, index) => (
                      <div
                        key={index}
                        className="
                          flex items-center gap-3
                          rounded-2xl border border-border
                          bg-background/40 px-4 py-3
                        "
                      >
                        <CheckCircle2
                          className="
                            h-4 w-4 shrink-0
                            text-primary
                          "
                        />

                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Features */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={1}
            className="
              mx-auto mt-20 grid max-w-6xl
              gap-6 md:grid-cols-3
            "
          >
            {features.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <div
                  key={index}
                  className="
                    group relative overflow-hidden
                    rounded-3xl border border-border
                    bg-card/60 p-6
                    backdrop-blur-xl
                    transition-all duration-300
                    hover:-translate-y-1
                    hover:shadow-2xl
                  "
                >
                  {/* Hover Glow */}
                  <div
                    className="
                      absolute inset-0 opacity-0
                      transition-opacity duration-300
                      group-hover:opacity-100
                      bg-gradient-to-br
                      from-primary/5 to-transparent
                    "
                  />

                  <div className="relative z-10">
                    <div
                      className="
                        mb-5 flex h-12 w-12
                        items-center justify-center
                        rounded-2xl border border-border
                        bg-muted
                      "
                    >
                      <Icon className="h-5 w-5" />
                    </div>

                    <h3 className="text-lg font-semibold">{feature.title}</h3>

                    <p
                      className="
                        mt-2 text-sm leading-6
                        text-muted-foreground
                      "
                    >
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </motion.div>

          {/* Docs Section */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={1.2}
            className="
              mx-auto mt-24 max-w-5xl
            "
          >
            <div
              className="
                overflow-hidden rounded-[32px]
                border border-border
                bg-card/50 p-8
                backdrop-blur-xl
              "
            >
              {/* Header */}
              <div className="flex items-start gap-4">
                <div
                  className="
                    flex h-14 w-14 shrink-0
                    items-center justify-center
                    rounded-2xl border border-border
                    bg-muted
                  "
                >
                  <PencilRuler className="h-6 w-6" />
                </div>

                <div>
                  <h2 className="text-3xl font-bold">
                    Sections, Pages & Drawings
                  </h2>

                  <p
                    className="
                      mt-3 max-w-3xl text-sm
                      leading-7 text-muted-foreground
                    "
                  >
                    Create organized notebook structures with animated sections,
                    dynamic pages, intelligent canvases, and smooth sidebar
                    interactions.
                  </p>
                </div>
              </div>

              {/* Grid */}
              <div className="mt-10 grid gap-6 md:grid-cols-2">
                {/* Left */}
                <div
                  className="
                    rounded-3xl border border-border
                    bg-background/40 p-6
                  "
                >
                  <h3 className="text-lg font-semibold">Notebook Features</h3>

                  <div className="mt-5 space-y-4">
                    {[
                      "Create & rename notebook sections",
                      "Organize notes and canvas pages",
                      "Smooth collapsible sidebar",
                      "Real-time updates with React Query",
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="
                          flex items-center gap-3
                        "
                      >
                        <ArrowRight
                          className="
                            h-4 w-4 text-primary
                          "
                        />

                        <span className="text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right */}
                <div
                  className="
                    rounded-3xl border border-border
                    bg-background/40 p-6
                  "
                >
                  <h3 className="text-lg font-semibold">Technology Stack</h3>

                  <div className="mt-5 flex flex-wrap gap-3">
                    {[
                      "React",
                      "Tailwind",
                      "Framer Motion",
                      "React Query",
                      "Node.js",
                      "MongoDB",
                      "JWT",
                      "Matter.js",
                      "LangChain",
                    ].map((tech) => (
                      <div
                        key={tech}
                        className="
                          rounded-2xl border border-border
                          bg-muted px-4 py-2 text-sm
                        "
                      >
                        {tech}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDocs;
