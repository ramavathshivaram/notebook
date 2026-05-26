import { useRef, useState } from "react";

import { ReactSketchCanvas } from "react-sketch-canvas";

import { Card } from "../ui/card";

import CanvasHeader from "./CanvasHeader";

import CanvasFooter from "./CanvasFooter";

const CanvasContent = ({ content, title, canvasId }) => {
  const canvasRef = useRef(null);

  const colorInputRef = useRef(null);

  const [strokeColor, setStrokeColor] = useState("#000000");

  const [strokeWidth, setStrokeWidth] = useState(3);

  return (
    <div className="mt-2 flex max-w-5xl flex-col gap-2">
      <CanvasHeader
        canvasRef={canvasRef}
        colorInputRef={colorInputRef}
        strokeColor={strokeColor}
        strokeWidth={strokeWidth}
        setStrokeWidth={setStrokeWidth}
        handleStrokeColorChange={(e) => setStrokeColor(e.target.value)}
      />

      <Card className="show-scroll w-full overflow-auto rounded-none p-0">
        <ReactSketchCanvas
          ref={canvasRef}
          width="1000px"
          strokeColor={strokeColor}
          strokeWidth={strokeWidth}
          backgroundImage={content}
          canvasColor="white"
          className="!aspect-video border-none"
        />
      </Card>

      <CanvasFooter
        canvasRef={canvasRef}
        title={title}
        canvasId={canvasId}
        content={content}
      />
    </div>
  );
};

export default CanvasContent;
