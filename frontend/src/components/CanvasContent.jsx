import { useRef, useState, useEffect } from "react";
import { ReactSketchCanvas } from "react-sketch-canvas";
import { updateCanvasContent } from "../helper/api";
import CanvasHeader from "./CanvasHeader";
import CanvasFooter from "./CanvasFooter";

const CanvasContent = ({ content, title, canvasId }) => {
  // console.log("content",content)
  const canvasRef = useRef(null);
  const colorInputRef = useRef(null);

  const [strokeColor, setStrokeColor] = useState("#a855f7");
  const [strokeWidth, setStrokeWidth] = useState(4);

  useEffect(() => {
    if (content && canvasRef.current) {
      try {
        canvasRef.current.loadPaths(content);
      } catch (err) {
        console.error("Error loading saved canvas:", err);
      }
    }
  }, [content]);

  // 🎨 Color change
  const handleStrokeColorChange = (event) => {
    const newColor = event.target.value;
    setStrokeColor(newColor);
  };

  // 💾 Download image

  // 🧠 Save JSON (for MongoDB)
  const handleSaveJSON = async () => {
    const paths = await canvasRef.current?.exportPaths();
    console.log("Canvas JSON data:", paths);
    const res = await updateCanvasContent(canvasId, { content: paths });
    console.log("Update response:", res);
  };

  return (
    <div className="mt-6 flex flex-col max-w-3xl gap-4">
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
      <ReactSketchCanvas
        width="100%"
        ref={canvasRef}
        strokeColor={strokeColor}
        strokeWidth={strokeWidth}
        canvasColor="white"
        className="!aspect-video !border-1 !shadow-md "
      />
      <CanvasFooter
        canvasRef={canvasRef}
        title={title}
        handleSaveJSON={handleSaveJSON}
      />
    </div>
  );
};

export default CanvasContent;
