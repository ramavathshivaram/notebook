import React, { useState, useCallback, useEffect } from "react";
import { Textarea } from "./ui/textarea";
import debounce from "lodash.debounce";
import useUpdatePageContent from "../hooks/useUpdatePageContent.js";
import chat from "../assets/chat.png";
import { getAiResponse } from "../helper/api";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

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
      setLocalContent(res);
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
      <Textarea
        value={localContent}
        onChange={(e) => handleChange(e.target.value)}
        placeholder="Start typing your notes..."
        spellCheck
        className="min-h-[500px] text-lg border-0 bg-transparent px-0 resize-none focus-visible:ring-0 leading-relaxed overflow-y-auto"
      />

      {/* Saving indicator */}
      {isPending && (
        <p className="text-sm text-gray-500 mt-2 animate-pulse">Saving...</p>
      )}

      {/* Floating AI Chat Button */}
      <motion.div
        onClick={handleAI}
        className="fixed left-1/2 bottom-10 -translate-x-1/2 cursor-pointer z-50"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{
          y: [0, -8, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 2,
          ease: "easeInOut",
        }}
      >
        <img src={chat} alt="AI Chat" className="w-12 drop-shadow-md" />
      </motion.div>

      {/* AI Loading Overlay */}
      <AnimatePresence>
        {isLoadingAI && (
          <motion.div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm flex flex-col items-center justify-center z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"
            />
            <p className="mt-4 text-white text-sm animate-pulse">
              AI is thinking...
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ContentEditor;
