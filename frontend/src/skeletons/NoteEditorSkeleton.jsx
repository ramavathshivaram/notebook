import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const NoteEditorSkeleton = () => {
  return (
    <div className="flex-1 flex flex-col h-full">
      <div className="flex-1 flex flex-col overflow-auto p-8 gap-5">
        <Skeleton className="h-10 w-1/2" />
        {Array.from({ length: 10 }).map((_, i) => (
          <Skeleton key={i} className="h-7 w-full" />
        ))}
      </div>
    </div>
  );
};

export default NoteEditorSkeleton;
