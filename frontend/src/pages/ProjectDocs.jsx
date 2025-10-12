import React from "react";
import { motion } from "motion/react";
import { BookOpen, Pen, Layers, Sparkles, Zap, Lock } from "lucide-react";
import PhysicsHero from "../components/PhysicsHero"; // Matter.js interactive background

const ProjectDocs = () => {
  return (
    <div className="h-screen bg-background text-foreground overflow-hidden relative">
      {/* Physics Background */}
      <div className="absolute inset-0 pointer-events-none">
        <PhysicsHero />
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/40 to-background/80 pointer-events-none" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-foreground/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-foreground/5 rounded-full blur-3xl pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 pointer-events-auto container mx-auto px-4 py-20">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-24"
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
            sections, pages, API endpoints, and advanced features with
            interactive examples.
          </motion.p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto -mt-10"
        >
          <div className="p-6 border border-border/50 rounded-xl bg-card/40 backdrop-blur-sm flex items-start gap-4">
            <Sparkles className="w-6 h-6 mt-1 flex-shrink-0" />
            <div>
              <h4 className="font-semibold mb-1">Animated UI</h4>
              <p className="text-sm text-muted-foreground">
                Sections and pages animate on hover and expand smoothly.
              </p>
            </div>
          </div>

          <div className="p-6 border border-border/50 rounded-xl bg-card/40 backdrop-blur-sm flex items-start gap-4">
            <Zap className="w-6 h-6 mt-1 flex-shrink-0" />
            <div>
              <h4 className="font-semibold mb-1">Fast & Responsive</h4>
              <p className="text-sm text-muted-foreground">
                React Query handles caching and mutations efficiently.
              </p>
            </div>
          </div>

          <div className="p-6 border border-border/50 rounded-xl bg-card/40 backdrop-blur-sm flex items-start gap-4">
            <Lock className="w-6 h-6 mt-1 flex-shrink-0" />
            <div>
              <h4 className="font-semibold mb-1">Secure</h4>
              <p className="text-sm text-muted-foreground">
                JWT authentication ensures your data stays private.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Additional Docs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-12 max-w-4xl mx-auto text-gray-700"
        >
          <h2 className="text-2xl font-semibold mb-2">Sections & Pages</h2>
          <p className="mb-4">
            Learn how to create, rename, and delete sections and pages with
            animations. The sidebar supports smooth collapsible interactions.
          </p>

          <h2 className="text-2xl font-semibold mb-2">API Endpoints</h2>
          <ul className="list-disc list-inside mb-4">
            <li>GET /sections – fetch all sections</li>
            <li>POST /sections – create a section</li>
            <li>PATCH /sections/:id – rename a section</li>
            <li>DELETE /sections/:id – delete section + pages</li>
          </ul>

          <h2 className="text-2xl font-semibold mb-2">Usage</h2>
          <ol className="list-decimal list-inside">
            <li>Clone repo & install dependencies</li>
            <li>Start backend: npm run server</li>
            <li>Start frontend: npm start</li>
            <li>Navigate sections & pages, edit content inline</li>
          </ol>
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectDocs;
