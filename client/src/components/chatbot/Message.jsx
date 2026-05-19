import React, { memo } from "react";
import { cn } from "@/lib/utils";

const Message = ({ role = "assistant", content }) => {
  const isUser = role === "user";

  return (
    <div
      className={cn("flex w-full", isUser ? "justify-end" : "justify-start")}
    >
      <div
        className={cn(
          "max-w-[80%] rounded-2xl px-3 py-2 text-sm break-words",
          isUser ? "bg-primary text-primary-foreground" : "",
        )}
      >
        {content}
      </div>
    </div>
  );
};

export default memo(Message);
