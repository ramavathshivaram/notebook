import React, { memo } from "react";
import { sendMessage } from "@/services/message.service.js";
import usePageStore from "@/store/page.store";

const Suggestion = ({ resourceId, resourceType }) => {
  const suggestions = usePageStore((state) => state.suggestions);

  const handleClick = async (suggestion) => {
    await sendMessage({
      content: suggestion,
      resourceId,
      resourceType,
    });
  };

  return (
    <div
      className="flex gap-2 overflow-x-auto scrollbar-hide pb-1 px-1
      "
    >
      {suggestions.map((suggestion, index) => (
        <button
          key={index}
          onClick={() => handleClick(suggestion)}
          className="shrink-0 rounded-full border px-2 py-1 text-sm whitespace-nowrap transition-colors hover:bg-muted"
        >
          {suggestion}
        </button>
      ))}
    </div>
  );
};

export default memo(Suggestion);
