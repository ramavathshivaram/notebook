import React, { memo, useCallback, useState } from "react";

import { Eraser, Pen, Redo, RotateCcw, Undo } from "lucide-react";

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

  const handleStrokeWidth = useCallback(
    (e) => {
      setStrokeWidth(Number(e.target.value));
    },
    [setStrokeWidth],
  );

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border bg-background p-3 shadow-xs">
      <div className="flex items-center gap-2">
        <Button
          size="icon"
          type="button"
          variant={!isEraseMode ? "default" : "outline"}
          onClick={() => handleModeChange(false)}
        >
          <Pen className="h-4 w-4" />
        </Button>

        <Button
          size="icon"
          type="button"
          variant={isEraseMode ? "default" : "outline"}
          onClick={() => handleModeChange(true)}
        >
          <Eraser className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <Button
          size="icon"
          type="button"
          className="border"
          style={{
            backgroundColor: strokeColor,
          }}
          onClick={() => colorInputRef.current?.click()}
        >
          <input
            type="color"
            ref={colorInputRef}
            value={strokeColor}
            onChange={handleStrokeColorChange}
            className="sr-only"
          />
        </Button>

        <div className="flex flex-col gap-1">
          <label className="text-xs text-muted-foreground">Stroke</label>

          <input
            type="range"
            min="1"
            max="20"
            value={strokeWidth}
            onChange={handleStrokeWidth}
            className={cn("w-24 cursor-pointer")}
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button size="icon" variant="outline" onClick={handleUndo}>
          <Undo className="h-4 w-4" />
        </Button>

        <Button size="icon" variant="outline" onClick={handleRedo}>
          <Redo className="h-4 w-4" />
        </Button>

        <Button size="icon" variant="outline" onClick={handleClear}>
          <RotateCcw className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default memo(CanvasHeader);
