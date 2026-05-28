import {  useRef, useState } from "react";

import { motion } from "motion/react";

import { ReactSketchCanvas } from "react-sketch-canvas";

import CanvasHeader from "./CanvasHeader";

const CanvasContent = ({ content, canvasId }) => {
  const canvasRef = useRef(null);

  const colorInputRef = useRef(null);

  const [strokeColor, setStrokeColor] = useState("#000000");
  const [strokeWidth, setStrokeWidth] = useState(3);

  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      className="flex h-full w-full flex-col gap-4"
    >
      <CanvasHeader
        canvasRef={canvasRef}
        colorInputRef={colorInputRef}
        strokeColor={strokeColor}
        strokeWidth={strokeWidth}
        setStrokeWidth={setStrokeWidth}
        handleStrokeColorChange={(e) => setStrokeColor(e.target.value)}
        canvasId={canvasId}
      />

      <div className="relative flex-1 overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
        <div className="pointer-events-none absolute inset-0 opacity-[0.04] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:28px_28px] dark:bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)]" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/[0.03] via-transparent to-primary/[0.03]" />

        <ReactSketchCanvas
          ref={canvasRef}
          width="100%"
          height="100%"
          strokeColor={strokeColor}
          strokeWidth={strokeWidth}
          backgroundImage={content}
          canvasColor="transparent"
          className="relative z-10 !h-[calc(100vh-240px)] !w-full"
        />
      </div>
    </motion.div>
  );
};

export default CanvasContent;
