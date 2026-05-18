import React from "react";
import { motion } from "motion/react";
import { BookOpen, Pen, Layers, Sparkles, Zap, Lock } from "lucide-react";
import BackGround from "../components/BackGround";

const features = [
  {
    icon: Sparkles,
    title: "Animated UI",
    description: "Sections and pages animate on hover and expand smoothly.",
  },
  {
    icon: Zap,
    title: "Fast & Responsive",
    description: "React Query handles caching and mutations efficiently.",
  },
  {
    icon: Lock,
    title: "Secure",
    description: "JWT authentication ensures your data stays private.",
  },
];

const ProjectDocs = () => {
  return (
    <div className="h-screen bg-background text-foreground overflow-hidden relative">
      {/* Physics Background */}
      <BackGround />
      {/* Content */}
      <div className="relative z-10 pointer-events-auto container mx-auto px-4 md:py-20 py-5">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-10 "
        >
          <h1 className="text-6xl md:text-7xl font-bold mb-6">
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              Notebook
            </motion.span>{" "}
            <motion.span
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Docs
            </motion.span>
          </h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            Comprehensive documentation for your React Notebook app. Learn about
            sections, pages, AI features, and advanced functionalities with
            interactive examples.
          </motion.p>
        </motion.div>

        {/* AI Notes & Drawing Feature Card */}
        <motion.div
          whileHover={{ scale: 1.05, rotate: [0, 2, -2, 0] }}
          transition={{ duration: 0.4 }}
          className="max-w-2xl mx-auto p-6 border border-border/50 rounded-xl bg-card/40 backdrop-blur-sm flex items-start gap-4 mb-6"
        >
          <Pen className="w-6 h-6 mt-1 flex-shrink-0" />
          <div>
            <h4 className="font-semibold mb-1">AI Notes & Drawing</h4>
            <p className="text-sm text-muted-foreground">
              <strong>Generate Notes:</strong> Automatically create structured
              notes using AI.
              <br />
              <strong>Optimize Notes:</strong> Refine your notes for clarity and
              conciseness.
              <br />
              <strong>Canvas Drawing:</strong> Generate and optimize drawings in
              real-time with AI.
            </p>
          </div>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto "
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="p-4 border border-border/50 rounded-xl bg-card/40 backdrop-blur-sm flex items-start gap-4"
              >
                <Icon className="w-6 h-6 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold mb-1">{feature.title}</h4>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </motion.div>

        {/* Additional Docs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-12 max-w-4xl mx-auto text-gray-700"
        >
          <h2 className="text-2xl font-semibold mb-2">
            Sections, Pages & Drawings
          </h2>
          <p className="mb-4">
            Learn how to create, rename, and delete sections, pages, and canvas
            drawings with animations. The sidebar supports smooth collapsible
            interactions.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectDocs;
