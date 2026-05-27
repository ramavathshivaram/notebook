import { motion } from "motion/react";

import {
  Sparkles,
  Zap,
  Lock,
  ArrowRight,
  BookOpen,
  Pen,
  Layers,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import { useNavigate } from "react-router-dom";

import { useEffect } from "react";

import BackGround from "@/components/common/BackGround";

import useAuthStore from "@/store/auth.store.js";

const features = [
  {
    icon: Sparkles,
    title: "Clean Interface",
    description: "Minimal workspace designed to keep you focused.",
  },

  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Instant interactions with smooth performance.",
  },

  {
    icon: Lock,
    title: "Private & Secure",
    description: "Your notes stay safe and fully under your control.",
  },
];

const stats = [
  {
    icon: Pen,
    label: "Write Freely",
  },

  {
    icon: Layers,
    label: "Organize Smartly",
  },

  {
    icon: BookOpen,
    label: "Everything Synced",
  },
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

const LandingPage = () => {
  const navigate = useNavigate();

  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/notebook");
    }
  }, [isAuthenticated, navigate]);

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
          from-background/40
          via-transparent
          to-background/70
        "
      />

      {/* Navigation */}
      <header
        className="
          absolute top-0 z-30 w-full
          border-b border-border/40
          bg-background/30 backdrop-blur-xl
        "
      >
        <div
          className="
            container mx-auto flex h-16
            items-center justify-between px-4
          "
        >
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3"
          >
            <div
              className="
                flex h-10 w-10 items-center justify-center
                rounded-2xl border border-border
                bg-card shadow-sm
              "
            >
              <BookOpen className="h-5 w-5" />
            </div>

            <div>
              <h1 className="text-sm font-semibold">OneNote</h1>

              <p className="text-[11px] text-muted-foreground">
                Smart notebook workspace
              </p>
            </div>
          </motion.div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              className="rounded-xl"
              onClick={() => navigate("/login")}
            >
              Login
            </Button>

            <Button
              className="
                rounded-xl shadow-lg
                shadow-primary/20
              "
              onClick={() => navigate(isAuthenticated ? "/notebook" : "/login")}
            >
              Get Started
            </Button>
          </div>
        </div>
      </header>

      {/* Main */}
      <div className="relative z-20">
        <div
          className="
            container mx-auto flex min-h-screen
            flex-col items-center justify-center
            px-4 pt-32 pb-20
          "
        >
          {/* Hero */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.1}
            className="max-w-5xl text-center"
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
                ✨ The modern note-taking experience
              </div>
            </motion.div>

            {/* Heading */}
            <motion.h1
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0.3}
              className="
                text-6xl font-black tracking-[-0.08em]
                sm:text-7xl md:text-8xl lg:text-9xl
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
                One
              </span>

              <span
                className="
                  bg-gradient-to-b
                  from-foreground
                  to-foreground/50
                  bg-clip-text text-transparent
                "
              >
                Note
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
                md:text-2xl
              "
            >
              Capture ideas, organize thoughts, sketch concepts, and bring your
              notes to life in a beautifully minimal workspace.
            </motion.p>

            {/* Buttons */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0.6}
              className="
                mt-12 flex flex-wrap items-center
                justify-center gap-4
              "
            >
              <Button
                size="lg"
                onClick={() =>
                  navigate(isAuthenticated ? "/notebook" : "/login")
                }
                className="
                  h-14 rounded-2xl px-8
                  text-base shadow-xl
                  shadow-primary/20
                  transition-all duration-300
                  hover:scale-[1.03]
                "
              >
                Start Writing
                <motion.div
                  animate={{
                    x: [0, 5, 0],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 1.5,
                  }}
                >
                  <ArrowRight className="ml-2 h-4 w-4" />
                </motion.div>
              </Button>

              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate("/docs")}
                className="
                  h-14 rounded-2xl px-8 text-base
                  border-border bg-card/40
                  backdrop-blur-xl
                  hover:bg-accent
                "
              >
                Learn More
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0.8}
              className="
                mt-10 flex flex-wrap items-center
                justify-center gap-6
                text-sm text-muted-foreground
              "
            >
              {stats.map((item, index) => {
                const Icon = item.icon;

                return (
                  <div
                    key={index}
                    className="
                      flex items-center gap-2
                    "
                  >
                    <Icon className="h-4 w-4" />

                    {item.label}
                  </div>
                );
              })}
            </motion.div>
          </motion.div>

          {/* Hero Mockup */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={1}
            className="
              relative mt-24 w-full
              max-w-6xl
            "
          >
            {/* Glow */}
            <div
              className="
                absolute inset-0 rounded-[40px]
                bg-primary/10 blur-3xl
              "
            />

            {/* Mockup */}
            <div
              className="
                relative overflow-hidden rounded-[32px]
                border border-border
                bg-card/70 p-4
                shadow-2xl backdrop-blur-2xl
              "
            >
              {/* Top Bar */}
              <div
                className="
                  flex items-center justify-between
                  border-b border-border pb-4
                "
              >
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-muted" />

                  <div className="h-3 w-3 rounded-full bg-muted" />

                  <div className="h-3 w-3 rounded-full bg-muted" />
                </div>

                <div
                  className="
                    rounded-xl border border-border
                    bg-muted px-3 py-1
                    text-xs text-muted-foreground
                  "
                >
                  notes.md
                </div>
              </div>

              {/* Content */}
              <div
                className="
                  grid gap-4 pt-6
                  lg:grid-cols-[240px_1fr]
                "
              >
                {/* Sidebar */}
                <div
                  className="
                    rounded-2xl border border-border
                    bg-background/50 p-4
                  "
                >
                  <div className="space-y-3">
                    {Array.from({
                      length: 6,
                    }).map((_, i) => (
                      <div
                        key={i}
                        className={`
                          h-10 rounded-xl border border-border
                          ${i === 1 ? "bg-accent" : "bg-muted/40"}
                        `}
                      />
                    ))}
                  </div>
                </div>

                {/* Editor */}
                <div
                  className="
                    rounded-2xl border border-border
                    bg-background/50 p-6
                  "
                >
                  <div className="space-y-4">
                    <div className="h-8 w-2/3 rounded-xl bg-muted" />

                    <div className="space-y-3">
                      <div className="h-4 w-full rounded bg-muted" />

                      <div className="h-4 w-11/12 rounded bg-muted" />

                      <div className="h-4 w-10/12 rounded bg-muted" />
                    </div>

                    <div className="grid gap-4 pt-4 md:grid-cols-2">
                      <div
                        className="
                          h-40 rounded-2xl
                          border border-border
                          bg-muted/50
                        "
                      />

                      <div
                        className="
                          h-40 rounded-2xl
                          border border-border
                          bg-muted/50
                        "
                      />
                    </div>
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
            custom={1.2}
            className="
              mt-28 grid w-full max-w-6xl
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
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
