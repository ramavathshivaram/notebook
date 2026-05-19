import React from "react";
import { useParams } from "react-router-dom";
import ErrorMessage from "../common/ErrorMessage";
import CanvasTitle from "./CanvasTitle";
import CanvasContent from "./CanvasContent";
import CanvasEditorSkeleton from "@/skeletons/CanvasEditorSkeleton";
import { useGetCanvas } from "@/hooks/canvas.query.js";

const CanvasEditor = () => {
  const { canvasId } = useParams();
  const { data: canvasPage, isLoading, error } = useGetCanvas(canvasId);

  if (isLoading) return <CanvasEditorSkeleton />;
  if (error) return <ErrorMessage />;
  return (
    <div className="flex-1 flex flex-col h-full">
      <div className="flex-1 overflow-auto p-4">
        <CanvasTitle
          title={canvasPage?.title}
          canvasId={canvasId}
          sectionId={canvasPage?.sectionId}
        />
        <CanvasContent
          content={canvasPage?.content}
          title={canvasPage?.title}
          canvasId={canvasId}
          sectionId={canvasPage?.sectionId}
        />
      </div>
    </div>
  );
};

export default CanvasEditor;
