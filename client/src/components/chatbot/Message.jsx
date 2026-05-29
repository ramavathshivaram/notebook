import React, { memo } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { motion } from "motion/react";
import { cn } from "@/lib/utils.js";

const Message = ({ role = "assistant", content }) => {
  const isUser = role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className={cn(
        "group flex w-full my-1",
        isUser ? "justify-end" : "justify-start",
      )}
    >
      <div
        className={cn(
          "text-sm relative max-w-[88%] overflow-hidden rounded-3xl border p-2 shadow-sm backdrop-blur-xl",
          isUser
            ? "rounded-br-md border-primary/10 bg-primary text-primary-foreground"
            : "rounded-bl-md border-border bg-card/70",
        )}
      >
        <div
          className={cn(
            "pointer-events-none absolute inset-0 opacity-40",
            isUser
              ? "bg-gradient-to-br from-white/10 to-transparent"
              : "bg-gradient-to-br from-primary/5 to-transparent",
          )}
        />

        <div
          className={cn(
            "relative z-10 prose prose-sm max-w-none break-words dark:prose-invert",
            isUser
              ? "prose-p:text-primary-foreground prose-headings:text-primary-foreground prose-strong:text-primary-foreground prose-code:text-primary-foreground prose-li:text-primary-foreground"
              : "prose-p:text-foreground prose-headings:text-foreground",
          )}
        >
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              code: ({ children }) => (
                <code className="rounded bg-muted px-1.5 py-0.5 text-xs">
                  {children}
                </code>
              ),

              a: (props) => (
                <a
                  {...props}
                  target="_blank"
                  rel="noreferrer"
                  className="text-primary underline underline-offset-4"
                />
              ),

              table: (props) => (
                <div className="overflow-x-auto">
                  <table {...props} className="w-full border-collapse" />
                </div>
              ),

              th: (props) => (
                <th
                  {...props}
                  className="border border-border bg-muted px-3 py-2 text-left"
                />
              ),

              td: (props) => (
                <td {...props} className="border border-border px-3 py-2" />
              ),
            }}
          >
            {content}
          </ReactMarkdown>
        </div>
      </div>
    </motion.div>
  );
};

export default memo(Message);
