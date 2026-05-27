import React, { memo } from "react";

import ReactMarkdown from "react-markdown";

import remarkGfm from "remark-gfm";

import { Bot, User, Copy, Check } from "lucide-react";

import { motion } from "motion/react";

import { useState } from "react";

import { cn } from "@/lib/utils";

const Message = ({ role = "assistant", content }) => {
  const isUser = role === "user";

  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(content);

    setCopied(true);

    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 10,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.25,
      }}
      className={cn(
        "group flex w-full gap-3",
        isUser ? "justify-end" : "justify-start",
      )}
    >
      {/* Message */}
      <div
        className={cn(
          `
            relative max-w-[88%] overflow-hidden
            rounded-3xl border px-4 py-3
            shadow-sm backdrop-blur-xl
            transition-all duration-200
          `,

          isUser
            ? `
              border-primary/10
              bg-primary text-primary-foreground
              rounded-br-md
            `
            : `
              border-border
              bg-card/70
              rounded-bl-md
            `,
        )}
      >
        {/* Glow */}
        <div
          className={cn(
            `
              absolute inset-0 opacity-40
              pointer-events-none
            `,

            isUser
              ? `
                bg-gradient-to-br
                from-white/10 to-transparent
              `
              : `
                bg-gradient-to-br
                from-primary/5 to-transparent
              `,
          )}
        />

        {/* Copy Button */}
        {!isUser && (
          <button
            onClick={handleCopy}
            className="
              absolute right-3 top-3
              opacity-0 transition-all duration-200
              group-hover:opacity-100
              text-muted-foreground hover:text-foreground
            "
          >
            {copied ? (
              <Check className="h-4 w-4" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </button>
        )}

        {/* Markdown */}
        <div
          className={cn(
            `
              relative z-10 prose prose-sm
              max-w-none break-words
              dark:prose-invert
            `,

            isUser
              ? `
                prose-p:text-primary-foreground
                prose-headings:text-primary-foreground
                prose-strong:text-primary-foreground
                prose-code:text-primary-foreground
                prose-li:text-primary-foreground
              `
              : `
                prose-p:text-foreground
                prose-headings:text-foreground
              `,
          )}
        >
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              code(props) {
                const { children, className, inline, ...rest } = props;

                return inline ? (
                  <code
                    className={cn(
                      `
                        rounded-md px-1.5 py-0.5
                        text-[13px]
                      `,
                      isUser ? "bg-white/10" : "bg-muted",
                    )}
                    {...rest}
                  >
                    {children}
                  </code>
                ) : (
                  <pre
                    className="
                      overflow-x-auto rounded-2xl
                      border border-border
                      bg-background/60 p-4
                    "
                  >
                    <code className={className} {...rest}>
                      {children}
                    </code>
                  </pre>
                );
              },

              a(props) {
                return (
                  <a
                    {...props}
                    target="_blank"
                    rel="noreferrer"
                    className="
                      text-primary underline
                      underline-offset-4
                    "
                  />
                );
              },

              table(props) {
                return (
                  <div className="overflow-x-auto">
                    <table
                      {...props}
                      className="
                        w-full border-collapse
                      "
                    />
                  </div>
                );
              },

              th(props) {
                return (
                  <th
                    {...props}
                    className="
                      border border-border
                      bg-muted px-3 py-2 text-left
                    "
                  />
                );
              },

              td(props) {
                return (
                  <td
                    {...props}
                    className="
                      border border-border
                      px-3 py-2
                    "
                  />
                );
              },
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
