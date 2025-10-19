import React, { useState, useCallback, useEffect } from "react";
import { Textarea } from "./ui/textarea";
import debounce from "lodash.debounce";
import useUpdatePageContent from "../hooks/useUpdatePageContent.js";
import AISymbol from "./AISymbol";
import { getAiResponse } from "../helper/api";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import ListSkeleton from "../skeletons/ListSkeleton.jsx";

const ContentEditor = ({ content, pageId }) => {
  const [localContent, setLocalContent] = useState(content);
  const [isLoadingAI, setLoadingAI] = useState(false);

  const { mutate: updatePageMutate, isPending } = useUpdatePageContent();

  const debouncedUpdate = useCallback(
    debounce((value) => {
      updatePageMutate({ pageId, updatedData: { content: value } });
    }, 1000),
    [pageId, updatePageMutate]
  );

  useEffect(() => {
    return () => debouncedUpdate.cancel();
  }, [debouncedUpdate]);

  const handleChange = (value) => {
    setLocalContent(value);
    debouncedUpdate(value);
  };

  const handleAI = async () => {
    if (isLoadingAI) return;
    setLoadingAI(true);
    try {
      debouncedUpdate.flush();
      const res = await getAiResponse({ prompt: localContent });
      console.log(res);
      if (res) {
        setLocalContent(res);
      }
      toast.success("✨ AI response received!");
    } catch (err) {
      console.error(err);
      toast.error("❌ Error fetching AI response.");
    } finally {
      setLoadingAI(false);
    }
  };

  return (
    <div className="relative">
      {/* Textarea */}
      {isLoadingAI ? (
        <ListSkeleton />
      ) : (
        <Textarea
          value={localContent}
          onChange={(e) => handleChange(e.target.value)}
          placeholder="Start typing your notes..."
          spellCheck
          className="min-h-[500px] text-lg border-0 bg-transparent px-0 resize-none focus-visible:ring-0 leading-relaxed overflow-y-auto"
        />
      )}

      {/* Saving indicator */}
      {isPending && (
        <p className="text-sm text-gray-500 mt-2 animate-pulse">Saving...</p>
      )}

      {/* Floating AI Chat Button */}
      <motion.div
        onClick={handleAI}
        className="fixed left-1/2 bottom-5 w-25 -translate-x-1/2 cursor-pointer z-50"
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
        animate={{
          y: [0, -8, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 3,
          ease: "easeInOut",
        }}
      >
        <AISymbol />
      </motion.div>

      {/* AI Loading Overlay */}
      {isLoadingAI && (
        <div className="fixed inset-0 bg-transparent w-screen h-screen z-40"></div>
      )}
    </div>
  );
};

export default ContentEditor;
