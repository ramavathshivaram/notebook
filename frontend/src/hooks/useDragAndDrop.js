import { useState, useCallback } from "react";

export const useDragAndDrop = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [sectionId, setSectionId] = useState(null);
  const [pageId, setPageId] = useState(null);
  const [targetSectionId, setTargetSectionId] = useState(null);

  const onDragStart = useCallback((e, { sectionId, pageId }) => {
    setIsDragging(true);
    setSectionId(sectionId);
    setPageId(pageId);
  }, []);

  const onDragEnd = useCallback(() => {
    if (sectionId !== targetSectionId) {
      // Implement the logic to move the section to the target section
    }

    setIsDragging(false);
    setSectionId(null);
    setPageId(null);
    setTargetSectionId(null);
  }, [sectionId, pageId, targetSectionId]);

  const onMouseEnter = useCallback(
    (targetId) => {
      setTargetSectionId(targetId);
    },
    []
  );

  const onMouseLeave = useCallback(() => {
    setTargetSectionId(null);
  }, []);

  return {
    isDragging,
    sectionId,
    targetSectionId,
    onDragStart,
    onDragEnd,
    onMouseEnter,
    onMouseLeave,
  };
};
