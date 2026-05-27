import React from "react";
import TypingSkeleton from "./TypingSkeleton";
import MessageSkeleton from "./MessageSkeleton";

const MessagesSkeleton = () => {
  return (
    <div className="flex h-full w-full flex-1 flex-col gap-4 overflow-y-auto px-4 py-5">
      <MessageSkeleton assistant lines={4} />
      <MessageSkeleton lines={2} />
      <MessageSkeleton assistant lines={5} />
      <MessageSkeleton lines={3} />
      <TypingSkeleton />
    </div>
  );
};

export default React.memo(MessagesSkeleton);
