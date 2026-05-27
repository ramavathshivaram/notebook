import { useRef, useState } from "react";

import { motion } from "motion/react";

import { ReactSketchCanvas } from "react-sketch-canvas";

import CanvasHeader from "./CanvasHeader";

import CanvasFooter from "./CanvasFooter";

const CanvasContent = ({ content, title, canvasId }) => {
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
      className="
        mx-auto flex max-w-7xl
        flex-col gap-4
      "
    >
      {/* Header */}
      <CanvasHeader
        canvasRef={canvasRef}
        colorInputRef={colorInputRef}
        strokeColor={strokeColor}
        strokeWidth={strokeWidth}
        setStrokeWidth={setStrokeWidth}
        handleStrokeColorChange={(e) => setStrokeColor(e.target.value)}
      />

      {/* Canvas */}
      <div
        className="
          relative overflow-hidden
          rounded-3xl border
          border-border bg-card
          shadow-sm
        "
      >
        {/* Grid */}
        <div
          className="
            pointer-events-none absolute inset-0
            opacity-[0.04]
            bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)]
            bg-[size:28px_28px]
            dark:bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)]
          "
        />

        <ReactSketchCanvas
          ref={canvasRef}
          width="100%"
          height="75vh"
          strokeColor={strokeColor}
          strokeWidth={strokeWidth}
          backgroundImage={content}
          canvasColor="transparent"
          className="
            relative z-10
            !h-[75vh] !w-full
          "
        />
      </div>

      {/* Footer */}
      <CanvasFooter
        canvasRef={canvasRef}
        title={title}
        canvasId={canvasId}
        content={content}
      />
    </motion.div>
  );
};

export default CanvasContent;
