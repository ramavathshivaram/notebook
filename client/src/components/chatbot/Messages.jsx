import React, { memo, useEffect, useRef } from "react";

import Message from "./Message";

import useMessageStore from "@/store/message.store.js";

const Messages = () => {
  const bottomRef = useRef(null);

  const messages = useMessageStore((state) => state.messages);

  const isLoading = useMessageStore((state) => state.loading);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, isLoading]);

  return (
    <div className="h-full flex-1 space-y-2 overflow-y-auto p-2">
      {messages.map((message, index) => (
        <Message
          key={`${message.role}-${index}`}
          role={message.role}
          content={message.content}
        />
      ))}

      {isLoading && <Message role="assistant" content="Typing..." />}

      <div ref={bottomRef} />
    </div>
  );
};

export default memo(Messages);
