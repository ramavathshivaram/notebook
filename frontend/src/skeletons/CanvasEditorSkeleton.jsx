import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const CanvasEditorSkeleton = () => {
  return (
    <div className="flex-1 flex flex-col h-full">
      <div className="flex-1 flex flex-col overflow-auto p-8 gap-5">
        <Skeleton className="h-10 w-1/2" />
        <Skeleton className="h-300 w-full" />
      </div>
    </div>
  );
};

export default CanvasEditorSkeleton;
