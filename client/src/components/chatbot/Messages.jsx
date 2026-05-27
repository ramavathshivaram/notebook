import React, { memo, useEffect, useRef } from "react";

import { AnimatePresence, motion } from "motion/react";

import Message from "./Message";

import TypingSkeleton from "@/skeletons/TypingSkeleton";

import EmptyState from "@/components/common/EmptyState";

import useMessageStore from "@/store/message.store.js";

const Messages = () => {
  const bottomRef = useRef(null);

  const containerRef = useRef(null);

  const messages = useMessageStore((state) => state.messages);

  const isLoading = useMessageStore((state) => state.loading);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [messages, isLoading]);

  return (
    <div
      ref={containerRef}
      className="
        relative flex h-full flex-1
        flex-col overflow-hidden
      "
    >
      {/* Top Fade */}
      <div
        className="
          pointer-events-none absolute
          inset-x-0 top-0 z-10 h-10
          bg-gradient-to-b
          from-background to-transparent
        "
      />

      {/* Messages */}
      <div
        className="
          scrollbar-thin scrollbar-thumb-border
          scrollbar-track-transparent
          flex-1 space-y-4 overflow-y-auto
          px-4 py-6
        "
      >
        {!messages.length && !isLoading ? (
          <EmptyState />
        ) : (
          <AnimatePresence initial={false}>
            {messages.map((message, index) => (
              <motion.div
                key={`${message.role}-${index}`}
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
                }}
              >
                <Message role={message.role} content={message.content} />
              </motion.div>
            ))}

            {/* Typing */}
            {isLoading && (
              <motion.div
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
                }}
              >
                <TypingSkeleton />
              </motion.div>
            )}
          </AnimatePresence>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Bottom Fade */}
      <div
        className="
          pointer-events-none absolute
          inset-x-0 bottom-0 z-10 h-10
          bg-gradient-to-t
          from-background to-transparent
        "
      />
    </div>
  );
};

export default memo(Messages);
