import React from "react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

const ListSkeleton = ({ count = 12 }) => {
  return (
    <div className="w-full space-y-1.5 p-2">
      {Array.from({ length: count }).map((_, i) => (
        <Skeleton
          key={i}
          className={cn(
            "h-7 rounded-lg ",
            i % 5 === 0
              ? "w-full"
              : i % 5 === 1
                ? "w-11/12"
                : i % 5 === 2
                  ? "w-10/12"
                  : i % 5 === 3
                    ? "w-8/12"
                    : "w-9/12",
          )}
        />
      ))}
    </div>
  );
};

export default ListSkeleton;
