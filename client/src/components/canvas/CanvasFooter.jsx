import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useUpdateCanvas } from "@/hooks/canvas.query.js";

const CanvasFooter = ({ canvasRef, title, content, canvasId }) => {
  const { mutateAsync: updateCanvasContent } = useUpdateCanvas();
  const [downloading, setDownloading] = useState(false);
  const [saving, setSaving] = useState(false);

  // Download canvas + background
  const handleDownload = async () => {
    if (downloading) return;
    setDownloading(true);
    try {
      if (!canvasRef.current) return;

      const imageData = await canvasRef.current.exportImage("png");

      // Create offscreen canvas
      const canvasEl = document.createElement("canvas");
      const width = canvasRef.current.width || 1000;
      const height = canvasRef.current.height || 600;
      canvasEl.width = width;
      canvasEl.height = height;
      const ctx = canvasEl.getContext("2d");

      // Draw background image if exists
      if (content) {
        const bgImg = new Image();
        bgImg.src = content;
        await new Promise((res, rej) => {
          bgImg.onload = res;
          bgImg.onerror = rej;
        });
        ctx.drawImage(bgImg, 0, 0, width, height);
      }

      // Draw user drawing on top
      const userImg = new Image();
      userImg.src = imageData;
      await new Promise((res, rej) => {
        userImg.onload = res;
        userImg.onerror = rej;
      });
      ctx.drawImage(userImg, 0, 0, width, height);

      // Export final combined PNG
      const finalImage = canvasEl.toDataURL("image/png");

      // Trigger download
      const link = document.createElement("a");
      link.href = finalImage;
      link.download = `${title || "canvas_with_bg"}.png`;
      link.click();

      toast.success("Canvas + background downloaded!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to download canvas with background.");
    } finally {
      setDownloading(false);
    }
  };

  const handleExportPNG = async () => {
    if (saving) return;
    setSaving(true);
    try {
      const image = await canvasRef.current?.exportImage("png");

      if (!image) {
        toast.error("Nothing to export.");
        return;
      }
      await updateCanvasContent({
        canvasId,
        updatedData: { content: image },
      });
      toast.success("Drawing saved!");
    } catch (err) {
      console.error("Save failed:", err);
      toast.error("Failed to save drawing.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex justify-between items-center px-4">
      <div className="space-x-3 peer-hover:hidden transition-all duration-500 ease-in-out">
        <Button
          variant="outline"
          onClick={handleDownload}
          disabled={downloading}
          className="cursor-pointer"
        >
          {downloading ? "Downloading..." : "Download"}
        </Button>
        <Button
          variant="outline"
          onClick={handleExportPNG}
          title="Save"
          className="cursor-pointer"
          disabled={saving}
        >
          {saving ? "Saving..." : "Save"}
        </Button>
      </div>
    </div>
  );
};

export default CanvasFooter;
