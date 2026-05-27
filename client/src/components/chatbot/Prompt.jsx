import React, { memo, useEffect, useRef } from "react";

import { Loader2, SendHorizonal, Sparkles } from "lucide-react";

import { motion } from "motion/react";

import { cn } from "@/lib/utils";

import { sendMessage } from "@/services/message.service.js";

import useMessageStore from "@/store/message.store.js";

const Prompt = ({ resourceId, resourceType }) => {
  const [message, setMessage] = React.useState("");

  const textareaRef = useRef(null);

  const isLoading = useMessageStore((state) => state.loading);

  // Auto resize
  useEffect(() => {
    if (!textareaRef.current) return;

    textareaRef.current.style.height = "auto";

    textareaRef.current.style.height = `${Math.min(
      textareaRef.current.scrollHeight,
      180,
    )}px`;
  }, [message]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedMessage = message.trim();

    if (!trimmedMessage || isLoading) return;

    setMessage("");

    await sendMessage({
      content: trimmedMessage,
      resourceId,
      resourceType,
    });
  };

  const handleKeyDown = async (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();

      handleSubmit(e);
    }
  };

  return (
    <div
      className="
        relative border-t border-border
        bg-background/80 px-4 py-4
        backdrop-blur-xl
      "
    >
      {/* Glow */}
      <div
        className="
          pointer-events-none absolute
          inset-0 bg-gradient-to-t
          from-primary/5 to-transparent
          opacity-50
        "
      />

      <motion.form
        onSubmit={handleSubmit}
        initial={{
          opacity: 0,
          y: 10,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        className="
          relative mx-auto flex
          max-w-4xl items-end gap-3
        "
      >
        {/* Input Wrapper */}
        <div
          className={cn(
            `
              relative flex flex-1 items-end
              overflow-hidden rounded-3xl
              border border-border
              bg-card/70
              shadow-sm backdrop-blur-xl
              transition-all duration-200
            `,

            "focus-within:border-primary/30",
            "focus-within:shadow-lg",
            "focus-within:shadow-primary/5",
          )}
        >
          {/* Left Icon */}
          <div
            className="
              flex h-12 items-center
              pl-4 text-muted-foreground
            "
          >
            <Sparkles className="h-4 w-4" />
          </div>

          {/* Textarea */}
          <textarea
            ref={textareaRef}
            rows={1}
            value={message}
            disabled={isLoading}
            onKeyDown={handleKeyDown}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ask AI anything..."
            className="
              max-h-[180px] min-h-[52px]
              flex-1 resize-none
              bg-transparent px-3 py-3
              text-sm outline-none
              placeholder:text-muted-foreground
              disabled:opacity-50
            "
          />

          {/* Send */}
          <div className="p-2">
            <motion.button
              whileTap={{
                scale: 0.94,
              }}
              whileHover={{
                scale: 1.03,
              }}
              type="submit"
              disabled={!message.trim() || isLoading}
              className={cn(
                `
                  flex h-10 w-10 items-center
                  justify-center rounded-2xl
                  transition-all duration-200
                `,

                message.trim()
                  ? `
                    bg-primary
                    text-primary-foreground
                    shadow-lg shadow-primary/20
                  `
                  : `
                    bg-muted
                    text-muted-foreground
                  `,
              )}
            >
              {isLoading ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <SendHorizonal size={18} />
              )}
            </motion.button>
          </div>
        </div>
      </motion.form>

      {/* Hint */}
      <div
        className="
          mt-2 flex items-center
          justify-center text-[11px]
          text-muted-foreground
        "
      >
        Press Enter to send • Shift + Enter for new line
      </div>
    </div>
  );
};

export default memo(Prompt);
