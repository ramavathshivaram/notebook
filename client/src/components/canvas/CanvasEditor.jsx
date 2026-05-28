import React, { memo } from "react";
import { motion } from "motion/react";
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
  if (error) return <ErrorMessage message="Failed to load canvas" />;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="flex h-full flex-1 flex-col overflow-hidden bg-background"
    >
      <CanvasTitle
        title={canvasPage?.title}
        canvasId={canvasId}
        sectionId={canvasPage?.sectionId}
      />

      <div className="flex-1 overflow-auto px-6 py-5">
        <CanvasContent content={canvasPage?.content} canvasId={canvasId} />
      </div>
    </motion.div>
  );
};

export default memo(CanvasEditor);
