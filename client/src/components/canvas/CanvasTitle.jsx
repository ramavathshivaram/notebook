import debounce from "lodash.debounce";

import React, { memo, useCallback, useEffect, useState } from "react";

import { Check, Loader2, PenTool } from "lucide-react";

import { motion } from "motion/react";

import { Input } from "@/components/ui/input";

import { useUpdateCanvas } from "@/hooks/canvas.query.js";

const CanvasTitle = ({ title, canvasId, sectionId }) => {
  const [localTitle, setLocalTitle] = useState(title);

  const [saved, setSaved] = useState(false);

  const { mutate: updateCanvasMutate, isPending } = useUpdateCanvas();

  useEffect(() => {
    setLocalTitle(title);
  }, [title]);

  const debouncedUpdate = useCallback(
    debounce((value) => {
      updateCanvasMutate(
        {
          canvasId,

          updatedData: {
            title: value,
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
    }, 800),

    [canvasId, updateCanvasMutate, sectionId],
  );

  const handleChange = (value) => {
    setLocalTitle(value);

    setSaved(false);

    debouncedUpdate(value);
  };

  return (
    <div
      className="
        sticky top-0 z-20
        border-b border-border
        bg-background/80
        backdrop-blur-xl
      "
    >
      <div
        className="
          flex items-center
          justify-between gap-4
          px-6 py-4
        "
      >
        {/* Left */}
        <div
          className="
            flex min-w-0 flex-1
            items-center gap-4
          "
        >
          <motion.div
            whileHover={{
              scale: 1.05,
            }}
            className="
              hidden h-11 w-11
              items-center justify-center
              rounded-2xl border
              border-border bg-card
              shadow-sm md:flex
            "
          >
            <PenTool className="h-5 w-5" />
          </motion.div>

          <Input
            value={localTitle}
            onChange={(e) => handleChange(e.target.value)}
            placeholder="Untitled Canvas"
            className="
              h-auto border-0
              bg-transparent px-0
              text-3xl font-black
              tracking-tight
              shadow-none
              focus-visible:ring-0
              focus-visible:ring-offset-0
            "
          />
        </div>

        {/* Status */}
        <div
          className="
            hidden w-[90px]
            text-sm text-muted-foreground
            md:block
          "
        >
          {isPending ? (
            <div
              className="
                flex items-center gap-1
              "
            >
              <Loader2 size={14} className="animate-spin" />
              Saving
            </div>
          ) : saved ? (
            <div
              className="
                flex items-center gap-1
                text-green-500
              "
            >
              <Check size={14} />
              Saved
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default memo(CanvasTitle);
