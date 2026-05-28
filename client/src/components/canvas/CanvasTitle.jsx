import React, { memo, useEffect, useState } from "react";

import { Check, Loader2, PenTool, Save, Sparkles } from "lucide-react";

import { motion } from "motion/react";

import { Input } from "@/components/ui/input";

import { Badge } from "@/components/ui/badge";

import { Button } from "@/components/ui/button";

import { useUpdateCanvas } from "@/hooks/canvas.query.js";

const CanvasTitle = ({ title, canvasId, sectionId }) => {
  const [localTitle, setLocalTitle] = useState(title);

  const [saved, setSaved] = useState(false);

  const { mutate: updateCanvasMutate, isPending } = useUpdateCanvas();

  useEffect(() => {
    setLocalTitle(title);
  }, [title]);

  const handleSave = () => {
    updateCanvasMutate(
      {
        canvasId,
        updatedData: {
          title: localTitle,
        },
        sectionId,
      },
      {
        onSuccess: () => {
          setSaved(true);

          setTimeout(() => {
            setSaved(false);
          }, 2000);
        },
      },
    );
  };

  return (
    <div className="sticky top-0 z-20 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="flex items-center justify-between gap-4 px-6 py-4">
        <div className="flex min-w-0 flex-1 items-center gap-4">
          <motion.div
            whileHover={{
              scale: 1.05,
              rotate: 4,
            }}
            className="hidden h-12 w-12 items-center justify-center rounded-2xl border border-border bg-card shadow-sm md:flex"
          >
            <PenTool className="h-5 w-5" />
          </motion.div>

          <div className="min-w-0 flex-1">
            <Input
              value={localTitle}
              onChange={(e) => setLocalTitle(e.target.value)}
              placeholder="Untitled Canvas"
              className="h-auto border-0 bg-transparent px-0 text-3xl font-black tracking-tight shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
            />

            <div className="mt-1 flex items-center gap-2">
              <Badge
                variant="secondary"
                className="rounded-full px-2 py-0 text-[10px]"
              >
                Canvas
              </Badge>

              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Sparkles className="h-3 w-3" />
                Draw ideas visually
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(CanvasTitle);
