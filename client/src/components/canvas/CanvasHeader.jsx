import React, { memo, useCallback, useState } from "react";
import { cn } from "@/lib/utils.js";

import {
  Eraser,
  Pen,
  Redo,
  Undo,
  Pipette,
  Download,
  Save,
  Trash2,
  Loader2,
} from "lucide-react";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";

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

  const handleDownload = async () => {
    if (downloading) return;

    setDownloading(true);

    try {
      const image = await canvasRef.current?.exportImage("png");

      if (!image) return;

      const link = document.createElement("a");

      link.href = image;
      link.download = `${title || "canvas"}.png`;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
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
    } catch {
      toast.error("Failed to save");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-4 rounded-2xl border border-border bg-background p-3 shadow-sm">
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

      <div className="hidden h-6 w-px bg-border lg:block" />

      {/* Colors */}
      <div className="flex items-center gap-2">
        {colors.map((color) => (
          <button
            key={color}
            type="button"
            onClick={() =>
              handleStrokeColorChange({ target: { value: color } })
            }
            className={`h-7 w-7 rounded-full border transition-all hover:scale-110 ${
              strokeColor === color
                ? "ring-2 ring-primary ring-offset-2"
                : "border-border"
            }`}
            style={{ backgroundColor: color }}
          />
        ))}

        <Button
          size="icon"
          type="button"
          variant="outline"
          onClick={() => colorInputRef.current?.click()}
        >
          <Pipette className="h-4 w-4" />
        </Button>

        <Input
          type="color"
          ref={colorInputRef}
          value={strokeColor}
          onChange={handleStrokeColorChange}
          className="hidden"
        />
      </div>

      <div className="hidden h-6 w-px bg-border lg:block" />

      {/* Stroke Width */}
      <div className="flex min-w-[240px] flex-1 items-center gap-3">
        <div
          className="shrink-0 rounded-full bg-foreground transition-all"
          style={{
            width: `${Math.max(strokeWidth, 4)}px`,
            height: `${Math.max(strokeWidth, 4)}px`,
            background: strokeColor,
          }}
        />
        <Slider
          min={1}
          max={20}
          step={1}
          value={[strokeWidth]}
          onValueChange={([value]) => setStrokeWidth(value)}
          className="flex-1 max-w-[100px]"
          color={strokeColor}
        />

        <span className="w-12 text-right text-sm font-medium text-muted-foreground">
          {strokeWidth}px
        </span>
      </div>

      <div className="hidden h-6 w-px bg-border lg:block" />

      {/* Actions */}
      <div className="ml-auto flex items-center gap-2">
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
