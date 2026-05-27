import React, { memo, useCallback, useState } from "react";

import { Eraser, Pen, Redo, RotateCcw, Undo, Palette } from "lucide-react";

import { motion } from "motion/react";

import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";

const CanvasHeader = ({
  colorInputRef,
  handleStrokeColorChange,
  strokeColor,
  strokeWidth,
  setStrokeWidth,
  canvasRef,
}) => {
  const [isEraseMode, setIsEraseMode] = useState(false);

  const handleModeChange = useCallback(
    (erase) => {
      setIsEraseMode(erase);

      canvasRef.current?.eraseMode(erase);
    },
    [canvasRef],
  );

  const handleUndo = useCallback(() => {
    canvasRef.current?.undo();
  }, [canvasRef]);

  const handleRedo = useCallback(() => {
    canvasRef.current?.redo();
  }, [canvasRef]);

  const handleClear = useCallback(() => {
    canvasRef.current?.clearCanvas();
  }, [canvasRef]);

  return (
    <div
      className="
        flex flex-wrap items-center
        justify-between gap-4
        rounded-3xl border
        border-border bg-card/80
        p-4 shadow-sm
        backdrop-blur-xl
      "
    >
      {/* Left */}
      <div
        className="
          flex items-center gap-2
        "
      >
        <Button
          size="icon"
          type="button"
          variant={!isEraseMode ? "default" : "outline"}
          onClick={() => handleModeChange(false)}
          className="
            rounded-2xl
          "
        >
          <Pen className="h-4 w-4" />
        </Button>

        <Button
          size="icon"
          type="button"
          variant={isEraseMode ? "default" : "outline"}
          onClick={() => handleModeChange(true)}
          className="
            rounded-2xl
          "
        >
          <Eraser className="h-4 w-4" />
        </Button>
      </div>

      {/* Center */}
      <div
        className="
          flex items-center gap-5
        "
      >
        {/* Color */}
        <motion.button
          whileTap={{
            scale: 0.95,
          }}
          onClick={() => colorInputRef.current?.click()}
          className="
            relative flex h-11 w-11
            items-center justify-center
            rounded-2xl border
            border-border shadow-sm
          "
          style={{
            backgroundColor: strokeColor,
          }}
        >
          <Palette
            className="
              h-4 w-4 text-white
            "
          />

          <input
            type="color"
            ref={colorInputRef}
            value={strokeColor}
            onChange={handleStrokeColorChange}
            className="sr-only"
          />
        </motion.button>

        {/* Stroke */}
        <div
          className="
            flex items-center gap-3
          "
        >
          <span
            className="
              text-sm text-muted-foreground
            "
          >
            Stroke
          </span>

          <input
            type="range"
            min="1"
            max="20"
            value={strokeWidth}
            onChange={(e) => setStrokeWidth(Number(e.target.value))}
            className={cn("w-28 cursor-pointer")}
          />

          <span
            className="
              w-6 text-sm
              text-muted-foreground
            "
          >
            {strokeWidth}
          </span>
        </div>
      </div>

      {/* Right */}
      <div
        className="
          flex items-center gap-2
        "
      >
        <Button
          size="icon"
          variant="outline"
          onClick={handleUndo}
          className="
            rounded-2xl
          "
        >
          <Undo className="h-4 w-4" />
        </Button>

        <Button
          size="icon"
          variant="outline"
          onClick={handleRedo}
          className="
            rounded-2xl
          "
        >
          <Redo className="h-4 w-4" />
        </Button>

        <Button
          size="icon"
          variant="outline"
          onClick={handleClear}
          className="
            rounded-2xl
          "
        >
          <RotateCcw className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default memo(CanvasHeader);
