import debounce from "lodash.debounce";
import React, { useCallback, useState } from "react";
import { useAddCanvas } from "@/hooks/canvas.query.js";
import { Input } from "@/components/ui/input";

const CanvasTitle = ({ title, canvasId, sectionId }) => {
  const [localTitle, setLocalTitle] = useState(title);
  const { mutate: updatePageMutate, isLoading } = useAddCanvas();

  const debouncedUpdate = useCallback(
    debounce((value) => {
      updatePageMutate({
        canvasId,
        updatedData: { title: value },
        sectionId,
      });
    }, 1000),
    [canvasId, updatePageMutate, sectionId],
  );

  const handleChange = (value) => {
    setLocalTitle(value);
    debouncedUpdate(value);
  };

  return (
    <>
      <Input
        value={localTitle}
        onChange={(e) => handleChange(e.target.value)}
        placeholder="drawing Title"
        className="text-3xl font-bold border-0 bg-transparent px-2 mb-4 focus-visible:ring-0"
      />
      {isLoading && (
        <p className="text-sm text-gray-500 mt-2 animate-pulse">Saving...</p>
      )}
    </>
  );
};

export default CanvasTitle;
