import React from "react";

import { useGetCanvass } from "@/hooks/canvas.query.js";

import Canvas from "./Canvas";

const CanvasList = ({ sectionId }) => {
  const { data: canvass = [], isLoading } = useGetCanvass(sectionId);

  if (isLoading) {
    return (
      <div className="space-y-1 px-2">
        <div className="h-8 rounded-md bg-muted animate-pulse" />
        <div className="h-8 rounded-md bg-muted animate-pulse" />
      </div>
    );
  }

  if (!canvass.length) {
    return <p className="px-3 py-1 text-xs text-muted-foreground">No canvass</p>;
  }

  return (
    <div className="space-y-0">
      {canvass.map((canvas) => (
        <Canvas key={canvas._id} canvas={canvas} sectionId={sectionId} />
      ))}
    </div>
  );
};

export default React.memo(CanvasList);
