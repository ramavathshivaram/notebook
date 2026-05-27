import React from "react";

import { motion, AnimatePresence } from "motion/react";

import { ScrollArea } from "../ui/scroll-area.jsx";

import AddSection from "../sections/AddSection";

import Section from "../sections/Section";

import NoSectionsFound from "../sections/NoSectionsFound";

import ListSkeleton from "@/skeletons/ListSkeleton";

import ErrorMessage from "../common/ErrorMessage.jsx";

import { cn } from "@/lib/utils.js";

import { useSections } from "@/hooks/section.query.js";

import { Accordion } from "@/components/ui/accordion";

import { BookOpen, Sparkles } from "lucide-react";

const NotebookSidebar = ({ additionaClass = "" }) => {
  const { data: sections, isLoading, error } = useSections();

  if (isLoading)
    return (
      <div
        className="
          flex h-full flex-col
          border-r border-border
          bg-background
        "
      >
        <AddSection />

        <div className="p-3">
          <ListSkeleton />
        </div>
      </div>
    );

  if (error)
    return (
      <div
        className="
          flex h-full items-center
          justify-center bg-background
          p-4
        "
      >
        <ErrorMessage message="Failed to load notebooks" />
      </div>
    );

  return (
    <aside
      className={cn(
        `
          relative flex h-full
          w-full flex-col overflow-hidden
          border-r border-border
          bg-background/80
          backdrop-blur-xl
        `,
        additionaClass,
      )}
    >
      {/* Background Glow */}
      <div
        className="
          pointer-events-none absolute
          inset-0 opacity-40
          bg-[radial-gradient(circle_at_top,hsl(var(--primary)/0.08),transparent_60%)]
        "
      />
      {/* Add Section */}
      <div className="relative z-10">
        <AddSection />
      </div>

      {/* Sections */}
      <ScrollArea className="flex-1">
        <div className="relative z-10 p-3">
          {sections?.length ? (
            <Accordion type="single" collapsible className="space-y-2">
              <AnimatePresence>
                {sections.map((section, index) => (
                  <motion.div
                    key={section._id}
                    initial={{
                      opacity: 0,
                      y: 10,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    exit={{
                      opacity: 0,
                      y: -10,
                    }}
                    transition={{
                      duration: 0.2,
                      delay: index * 0.04,
                    }}
                  >
                    <Section section={section} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </Accordion>
          ) : (
            <NoSectionsFound />
          )}
        </div>
      </ScrollArea>

      {/* Bottom Fade */}
      <div
        className="
          pointer-events-none absolute
          inset-x-0 bottom-0 z-20 h-12
          bg-gradient-to-t
          from-background to-transparent
        "
      />
    </aside>
  );
};

export default NotebookSidebar;
