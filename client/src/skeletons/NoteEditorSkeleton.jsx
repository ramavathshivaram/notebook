import React from "react";

import { Skeleton } from "@/components/ui/skeleton";

const ToolbarButton = ({ width = "w-6" }) => (
  <Skeleton
    className={`
      h-6 ${width} rounded-md
      bg-muted
    `}
  />
);

const NoteEditorSkeleton = () => {
  return (
    <div
      className="
        flex h-full w-full flex-col overflow-hidden rounded-xl
        border border-border bg-background text-foreground
      "
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <Skeleton className="h-10 w-2/3 rounded-lg bg-muted" />

        <Skeleton className="h-10 w-28 rounded-xl bg-muted" />
      </div>

      {/* Toolbar */}
      <div className="flex items-center gap-5 overflow-hidden border-b border-border px-4 py-3">
        <Skeleton className="h-8 w-24 rounded-md bg-muted" />

        <div className="ml-4 flex items-center gap-4">
          <ToolbarButton />
          <ToolbarButton />
          <ToolbarButton />
        </div>

        <div className="mx-2 h-5 w-px bg-border" />

        <div className="flex items-center gap-4">
          <ToolbarButton />
          <ToolbarButton />
          <ToolbarButton width="w-10" />
        </div>

        <div className="mx-2 h-5 w-px bg-border" />

        <ToolbarButton width="w-8" />
      </div>

      {/* Editor Content */}
      <div className="flex-1 space-y-5 overflow-hidden px-6 py-6">
        {/* Heading */}
        <div className="space-y-3">
          <Skeleton className="h-7 w-4/5 rounded-md bg-muted" />

          <Skeleton className="h-7 w-3/5 rounded-md bg-muted" />
        </div>

        {/* Paragraph */}
        <div className="space-y-3">
          <Skeleton className="h-5 w-full rounded-md bg-muted" />

          <Skeleton className="h-5 w-11/12 rounded-md bg-muted" />

          <Skeleton className="h-5 w-10/12 rounded-md bg-muted" />
        </div>

        {/* List */}
        <div className="space-y-4 pt-2">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3">
              <Skeleton className="h-2 w-2 rounded-full bg-muted-foreground/40" />

              <Skeleton
                className={`h-5 rounded-md bg-muted ${
                  i % 2 === 0 ? "w-2/3" : "w-3/4"
                }`}
              />
            </div>
          ))}
        </div>

        {/* Bottom Paragraph */}
        <div className="space-y-3 pt-4">
          <Skeleton className="h-5 w-full rounded-md bg-muted" />

          <Skeleton className="h-5 w-5/6 rounded-md bg-muted" />

          <Skeleton className="h-5 w-4/6 rounded-md bg-muted" />
        </div>
      </div>
    </div>
  );
};

export default NoteEditorSkeleton;
