import React, { memo, useCallback, useState } from "react";

import {
  Eraser,
  Pen,
  Redo,
  Undo,
  Minus,
  Plus,
  Pipette,
  Download,
  Save,
  Trash2,
  Loader2,
} from "lucide-react";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useUpdateCanvas } from "@/hooks/canvas.query.js";

const colors = [
  "#000000",
  "#ef4444",
  "#3b82f6",
  "#22c55e",
  "#eab308",
  "#a855f7",
];

const CanvasHeader = ({
  colorInputRef,
  handleStrokeColorChange,
  strokeColor,
  strokeWidth,
  setStrokeWidth,
  canvasRef,
  title,
  canvasId,
}) => {
  const { mutateAsync: updateCanvasContent } = useUpdateCanvas();

  const [isEraseMode, setIsEraseMode] = useState(false);

  const [downloading, setDownloading] = useState(false);

  const [saving, setSaving] = useState(false);

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

  const increaseStroke = useCallback(() => {
    setStrokeWidth((prev) => Math.min(prev + 1, 20));
  }, [setStrokeWidth]);

  const decreaseStroke = useCallback(() => {
    setStrokeWidth((prev) => Math.max(prev - 1, 1));
  }, [setStrokeWidth]);

  const handleDownload = async () => {
    if (downloading) return;

    setDownloading(true);

    try {
      const image = await canvasRef.current?.exportImage("png");

      if (!image) return;

      const link = document.createElement("a");

      link.href = image;

      link.download = `${title || "canvas"}.png`;

      link.click();
    } catch {
      toast.error("Download failed");
    } finally {
      setDownloading(false);
    }
  };

  const handleSave = async () => {
    if (saving) return;

    setSaving(true);

    try {
      const image = await canvasRef.current?.exportImage("png");

      if (!image) {
        toast.error("Nothing to save");
        return;
      }

      await updateCanvasContent({
        canvasId,
        updatedData: {
          content: image,
        },
      });

      toast.success("Canvas saved");
    } catch (err) {
      toast.error("Failed to save");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-border bg-background p-3 shadow-sm">
      {/* Tools */}
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

        <Button
          size="icon"
          type="button"
          variant="outline"
          onClick={handleUndo}
        >
          <Undo className="h-4 w-4" />
        </Button>

        <Button
          size="icon"
          type="button"
          variant="outline"
          onClick={handleRedo}
        >
          <Redo className="h-4 w-4" />
        </Button>

        <Button
          size="icon"
          type="button"
          variant="outline"
          onClick={handleClear}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      {/* Colors */}
      <div className="flex items-center gap-2">
        {colors.map((color) => (
          <button
            key={color}
            type="button"
            onClick={() =>
              handleStrokeColorChange({
                target: {
                  value: color,
                },
              })
            }
            className="h-7 w-7 rounded-full border border-border transition hover:scale-110"
            style={{
              backgroundColor: color,
            }}
          />
        ))}

        <Button
          size="icon"
          type="button"
          variant="outline"
          onClick={() => colorInputRef.current?.click()}
        >
          <Pipette className="h-4 w-4" />

          <Input
            type="color"
            ref={colorInputRef}
            value={strokeColor}
            onChange={handleStrokeColorChange}
            className="sr-only"
          />
        </Button>
      </div>

      {/* Stroke */}
      <div className="flex items-center gap-2">
        <Button
          size="icon"
          type="button"
          variant="outline"
          onClick={decreaseStroke}
        >
          <Minus className="h-4 w-4" />
        </Button>

        <div className="flex min-w-14 items-center justify-center rounded-lg border border-border px-3 py-1 text-sm font-medium">
          {strokeWidth}px
        </div>

        <Button
          size="icon"
          type="button"
          variant="outline"
          onClick={increaseStroke}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="outline"
          onClick={handleDownload}
          disabled={downloading}
          className="gap-2"
        >
          {downloading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Downloading
            </>
          ) : (
            <>
              <Download className="h-4 w-4" />
              Download
            </>
          )}
        </Button>

        <Button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="gap-2"
        >
          {saving ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Saving
            </>
          ) : (
            <>
              <Save className="h-4 w-4" />
              Save
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default memo(CanvasHeader);
