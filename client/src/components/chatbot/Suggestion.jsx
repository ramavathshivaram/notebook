import React, { memo, useState } from "react";
import { motion } from "motion/react";
import { Sparkles, Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";
import { sendMessage } from "@/services/message.service.js";
import usePageStore from "@/store/page.store";

const Suggestion = ({ resourceId, resourceType }) => {
  const suggestions = usePageStore((state) => state.suggestions);
  const [loadingIndex, setLoadingIndex] = useState(null);

  const handleClick = async (suggestion, index) => {
    try {
      setLoadingIndex(index);

      await sendMessage({
        content: suggestion,
        resourceId,
        resourceType,
      });
    } finally {
      setLoadingIndex(null);
    }
  };

  if (!suggestions?.length) return null;

  return (
    <div className="relative flex items-center gap-2 px-1 py-1 scrollbar-hide">
      <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-8 bg-gradient-to-r from-background to-transparent" />

      <div className="flex items-center gap-2 overflow-x-auto">
        {suggestions.map((suggestion, index) => {
          const isLoading = loadingIndex === index;

          return (
            <motion.button
              key={index}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleClick(suggestion, index)}
              disabled={isLoading}
              className={cn(
                "group relative shrink-0 overflow-hidden rounded-2xl border border-border bg-card/70 px-4 py-2 text-sm font-medium text-muted-foreground shadow-sm backdrop-blur-xl transition-all duration-200 hover:border-primary/20 hover:bg-primary/5 hover:text-foreground",
                isLoading && "pointer-events-none opacity-70",
              )}
            >
              <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-gradient-to-r from-primary/5 to-transparent" />

              <div className="relative z-10 flex items-center gap-2">
                {isLoading ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                ) : (
                  <Sparkles className="h-3.5 w-3.5 text-primary/70" />
                )}

                <span className="truncate">{suggestion}</span>
              </div>
            </motion.button>
          );
        })}
      </div>

      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-8 bg-gradient-to-l from-background to-transparent" />
    </div>
  );
};

export default memo(Suggestion);
