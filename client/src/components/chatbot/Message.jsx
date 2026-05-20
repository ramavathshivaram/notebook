import React, { memo } from "react";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { cn } from "@/lib/utils";

const Message = ({ role = "assistant", content }) => {
  const isUser = role === "user";

  return (
    <div
      className={cn("flex w-full", isUser ? "justify-end" : "justify-start")}
    >
      <div
        className={cn(
          "prose prose-sm max-w-[80%] break-words rounded-2xl px-2 py-1.5 dark:prose-invert",
          isUser
            ? "bg-primary text-primary-foreground prose-p:text-primary-foreground prose-headings:text-primary-foreground prose-strong:text-primary-foreground"
            : "bg-muted",
        )}
      >
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
      </div>
    </div>
  );
};

export default memo(Message);
