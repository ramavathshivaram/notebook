import { useRef, useState } from "react";
import { ReactSketchCanvas } from "react-sketch-canvas";
import { optimizeCanvasWithAI } from "../helper/api";
import { Card } from "./ui/card";
import AISymbol from "./AISymbol";
import CanvasHeader from "./CanvasHeader";
import CanvasFooter from "./CanvasFooter";
import { toast } from "sonner";

const CanvasContent = ({ content, title, canvasId }) => {
  const canvasRef = useRef(null);
  const colorInputRef = useRef(null);

  const [strokeColor, setStrokeColor] = useState("#000000");
  const [strokeWidth, setStrokeWidth] = useState(3);
  const [loading, setLoading] = useState(false); // for AI / save operations

  const handleStrokeColorChange = (event) => {
    const newColor = event.target.value;
    setStrokeColor(newColor);
  };

  const handleAI = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const canvasJSON = await canvasRef.current?.exportPaths();
      if (
        !canvasJSON ||
        (Array.isArray(canvasJSON) && canvasJSON.length === 0)
      ) {
        toast.error("Canvas is empty. Draw something first.");
        return;
      }

      // Call client helper which hits your /api/ai/optimize-canvas endpoint
      // We pass { canvasJSON } because the server expects that shape.
      const optimized = await optimizeCanvasWithAI({ canvasJSON });

      if (!optimized) {
        console.warn("AI returned no usable optimized JSON:", optimized);
        toast.error("AI did not return a valid optimized canvas.");
        return;
      }

      // Load optimized paths into canvas
      try {
        await canvasRef.current.loadPaths(optimized);
      } catch (err) {
        console.error("Failed to load optimized paths into canvas:", err);
        toast.error("Failed to render optimized canvas.");
        return;
      }

      toast.success("Canvas optimized and loaded!");
    } catch (err) {
      console.error("handleAI error:", err);
      toast.error(err?.message || "Canvas optimization failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-2 flex flex-col max-w-3xl gap-2">
      {/* Toolbar */}
      <CanvasHeader
        colorInputRef={colorInputRef}
        handleStrokeColorChange={handleStrokeColorChange}
        strokeColor={strokeColor}
        strokeWidth={strokeWidth}
        setStrokeWidth={setStrokeWidth}
        canvasRef={canvasRef}
      />

      {/* Canvas */}
      <Card className="w-full overflow-auto p-0 m-0 rounded-none">
        <ReactSketchCanvas
          width="1000px"
          ref={canvasRef}
          strokeColor={strokeColor}
          strokeWidth={strokeWidth}
          backgroundImage={content}
          canvasColor="white"
          className="!aspect-video"
        />
      </Card>

      <CanvasFooter
        canvasRef={canvasRef}
        title={title}
        canvasId={canvasId}
        content={content}
      />

      {/* AISymbol triggers AI optimize; disable while loading */}
      <div aria-hidden={loading}>
        <AISymbol handleAI={handleAI} />
      </div>
    </div>
  );
};

export default CanvasContent;
