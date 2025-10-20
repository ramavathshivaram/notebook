import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { generateCanvasDrawing } from "../helper/api";

const CanvasFooter = ({ canvasRef, title, handleSaveJSON }) => {
  const inputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const handleSave = async () => {
    const dataURL = await canvasRef.current?.exportImage("png");
    if (dataURL) {
      const link = document.createElement("a");
      link.href = dataURL;
      link.download = title;
      link.click();
      link.remove();
    }
  };

  const handleGenerate = async () => {
    const prompt = inputRef.current.value.trim();
    if (!prompt) return;
    setLoading(true);
    try {
      const res = await generateCanvasDrawing({ prompt });
      console.log(res);
      canvasRef.current.loadPaths(res);
      inputRef.current.value = "";
    } catch (err) {
      console.error("Canvas generation failed:", err);
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
          className="transition-all duration-500 ease-in-out"
        >
          {loading ? "Generating..." : "Generate"}
        </Button>
      </div>

      <div className="space-x-3 peer-hover:hidden transition-all duration-500 ease-in-out">
        <Button variant="outline" onClick={handleSave}>
          Download
        </Button>
        <Button variant="outline" onClick={handleSaveJSON} title="Save JSON">
          Save
        </Button>
      </div>
    </div>
  );
};

export default CanvasFooter;
