import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { generateCanvasDrawing } from "../helper/api";
import { toast } from "sonner";
import useUpdateCanvasContent from "../hooks/useUpdateCanvasContent.js";

const CanvasFooter = ({ canvasRef, title, content, canvasId }) => {
  const { mutateAsync: updateCanvasContent } = useUpdateCanvasContent();
  const inputRef = useRef(null);
  const [loading, setLoading] = useState(false);
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

  // Generate canvas from AI prompt
  const handleGenerate = async () => {
    const prompt = inputRef.current.value.trim();
    if (!prompt) return;
    setLoading(true);
    try {
      const res = await generateCanvasDrawing({ prompt });
      canvasRef.current.loadPaths(res);
      inputRef.current.value = "";
    } catch (err) {
      console.error("Canvas generation failed:", err);
      toast.error("Failed to generate canvas.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-between items-center px-4">
      <div className="peer group/generate flex items-center gap-2 flex-1 transition-all duration-500 ease-in-out group-hover/generate:blur-[0px]">
        <Input
          ref={inputRef}
          className="w-0 transition-all p-0 border-0 duration-500 ease-in-out group-hover/generate:w-full group-hover/generate:border group-hover/generate:p-3 focus:w-full focus:border focus:p-3"
          placeholder="Type prompt..."
        />
        <Button
          variant="outline"
          onClick={handleGenerate}
          disabled={loading}
          className="transition-all duration-500 ease-in-out cursor-pointer"
        >
          {loading ? "Generating..." : "Generate"}
        </Button>
      </div>

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
