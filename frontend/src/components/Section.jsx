import React, { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronRight, Book, Trash2, Plus } from "lucide-react";
import { v4 as uuid } from "uuid";

import Page from "./Page";
import usePageStore from "../store/usePageStore";

import useRenameSection from "../hooks/useRenameSection.js";
import useAddPage from "../hooks/useAddPage.js";
import useDeleteSection from "../hooks/useDeleteSection.js";

import useAddCanvas from "../hooks/useAddCanvas.js";
import Canvas from "./Canvas.jsx";

const Section = ({ section, isExpanded, setIsExpanded }) => {
  const renameSectionMutate = useRenameSection().mutate;
  const deleteSectionMutate = useDeleteSection().mutate;
  
  const addPageMutate = useAddPage().mutate;

  const addCanvasMutate = useAddCanvas().mutate;

  const currentPage = usePageStore((s) => s.currentPage);
  const [editingSectionId, setEditingSectionId] = useState(null);
  const [editTitle, setEditTitle] = useState("");

  const isSectionSelected = section?.pages?.some(
    (page) => page._id === currentPage
  );

  // 🔹 Handlers
  const handleRename = (sectionId, newTitle) => {
    if (!newTitle.trim()) return;
    renameSectionMutate({ id: sectionId, title: newTitle });
    setEditingSectionId(null);
  };

  const handleDeleteSection = (sectionId) => {
    deleteSectionMutate(sectionId);
  };

  const handleAddPage = (sectionId) => {
    const pageId = uuid();
    addPageMutate({
      sectionId,
      title: `New Note ${section.pages.length + 1}`,
      pageId,
    });
  };

  const handleAddCanvas = (sectionId) => {  const canvasId = uuid();
  addCanvasMutate({
    sectionId,
    title: `New Drawing ${section.canvases.length + 1}`,
    canvasId,
  }); }

  return (
    <motion.div
      className="mb-1 w-[calc(100%-1.5rem)]"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0 }}
      key={section._id}
    >
      {/* Section Header */}
      <div className="flex items-center group">
        <Button
          variant="ghost"
          className="w-full justify-start"
          onClick={() =>
            setIsExpanded((prev) => (prev === section._id ? null : section._id))
          }
        >
          {/* Arrow animation */}
          <motion.div
            animate={{
              rotate: isExpanded === section._id ? 90 : 0,
              y: isExpanded === section._id ? 4 : 0,
            }}
            transition={{ duration: 0.2 }}
          >
            <ChevronRight className="w-4 h-4 mr-2" />
          </motion.div>

          <Book className="w-4 h-4 mr-2" />

          {editingSectionId === section._id ? (
            <Input
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              onBlur={() => handleRename(section._id, editTitle)}
              onKeyDown={(e) =>
                e.key === "Enter" && handleRename(section._id, editTitle)
              }
              className="h-7 text-sm"
              autoFocus
            />
          ) : (
            <span
              className={`truncate cursor-pointer ${
                isSectionSelected ? "text-blue-700" : ""
              }`}
              onDoubleClick={() => {
                setEditingSectionId(section._id);
                setEditTitle(section.title);
              }}
            >
              {section.title}
            </span>
          )}
        </Button>

        {/* Delete Section Button */}
        <Button
          variant="ghost"
          size="icon"
          className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          onClick={() => handleDeleteSection(section._id)}
        >
          <Trash2 className="w-4 h-4 text-red-600" />
        </Button>
      </div>

      {/* Pages List */}
      <AnimatePresence mode="wait">
        {isExpanded === section._id && (
          <motion.div
            className="pl-4  w-full"
            layout
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
          >
            {section.pages?.map((page) => (
              <Page key={page._id} page={page} sectionId={section._id} />
            ))}
            {
              section.canvases?.map((canvas) => (
                <Canvas key={canvas._id} canvas={canvas} sectionId={section._id} />
              ))
            }

            {/* Add Page Button */}
            <div className="flex gap-2">
              {/* Add Page Button */}
              <Button
                size="sm"
                className="justify-start text-xs ml-7"
                onClick={() => handleAddPage(section._id)}
              >
                <Plus className="size-3" />
                Note
              </Button>
              {/* add canvas */}
              <Button
                size="sm"
                className=" justify-start text-xs"
                onClick={() => handleAddCanvas(section._id)}
              >
                <Plus className="size-3" />
                Drawing
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Section;
