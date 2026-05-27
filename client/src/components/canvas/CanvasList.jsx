import React from "react";

import ListSkeleton from "@/skeletons/ListSkeleton";

import { useGetCanvass } from "@/hooks/canvas.query.js";

import Canvas from "./Canvas";

const CanvasList = ({ sectionId }) => {
  const { data: canvass = [], isLoading } = useGetCanvass(sectionId);

  if (isLoading) {
    return <ListSkeleton count={10} />;
  }

  if (!canvass.length) {
    return (
      <div className="px-3 py-6 text-center text-xs text-zinc-500">
        No canvases found
      </div>
    );
  }

  return (
    <div className="space-y-1 p-1">
      {canvass.map((canvas) => (
        <Canvas key={canvas._id} canvas={canvas} sectionId={sectionId} />
      ))}
    </div>
  );
};

export default React.memo(CanvasList);
