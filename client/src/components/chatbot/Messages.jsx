import React, { memo, useEffect, useRef } from "react";

import { AnimatePresence, motion } from "motion/react";

import Message from "./Message";

import TypingSkeleton from "@/skeletons/TypingSkeleton";

import EmptyMessagesState from "@/components/common/EmptyMessagesState";

import useMessageStore from "@/store/message.store.js";

const Messages = () => {
  const bottomRef = useRef(null);

  const messages = useMessageStore((state) => state.messages);

  const isLoading = useMessageStore((state) => state.loading);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [isLoading]);

  if (!messages.length && !isLoading) {
    return <EmptyMessagesState />;
  }

  console.log(messages);

  return (
    <>
      <AnimatePresence initial={false}>
        {messages.map((message, idx) => (
          <motion.div
            key={idx}
            layout
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

        {isLoading && <TypingSkeleton />}
      </AnimatePresence>

      <div ref={bottomRef} />
    </>
  );
};

export default memo(Messages);
