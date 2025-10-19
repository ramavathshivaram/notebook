import React from "react";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";

const CanvasFooter = ({canvasRef, title, handleSaveJSON }) => {

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
  return (
    <div className="flex gap-5 justify-end-safe">
      <Button variant="outline" onClick={handleSave}>
        Download
      </Button>
      <Button variant="outline" onClick={handleSaveJSON} title="Save JSON">
        Save
      </Button>
    </div>
  );
};

export default CanvasFooter;
