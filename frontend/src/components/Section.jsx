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

const Section = ({ section, isExpanded, setIsExpanded }) => {
  const currentPage = usePageStore((s) => s.currentPage);

  const [editingSectionId, setEditingSectionId] = useState(null);
  const [editTitle, setEditTitle] = useState("");

  const isSectionSelected = section?.pages?.some(
    (page) => page._id === currentPage
  );

  // 🔹 Hooks for mutations
  const renameSectionMutate = useRenameSection().mutate;
  const addPageMutate = useAddPage().mutate;
  const deleteSectionMutate = useDeleteSection().mutate;

  // 🔹 Handlers
  const handleRename = (sectionId, newTitle) => {
    if (!newTitle.trim()) return;
    renameSectionMutate({ id: sectionId, title: newTitle });
    setEditingSectionId(null);
  };

  const handleAddPage = (sectionId) => {
    const pageId = uuid();
    addPageMutate({
      sectionId,
      title: `New Page ${section.pages.length + 1}`,
      pageId,
    });
  };

  const handleDeleteSection = (sectionId) => {
    deleteSectionMutate(sectionId);
  };

  return (
    <motion.div
      className="mb-2 mr-5"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0 }}
      key={section._id}
    >
      {/* Section Header */}
      <div className="flex items-center px-2 group">
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
          <Trash2 className="w-4 h-4 text-red-500" />
        </Button>
      </div>

      {/* Pages List */}
      <AnimatePresence mode="wait">
        {isExpanded === section._id && (
          <motion.div
            className="pl-6"
            layout
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
          >
            {section.pages?.map((page) => (
              <Page key={page._id} page={page} sectionId={section._id} />
            ))}

            {/* Add Page Button */}
            <Button
              size="sm"
              className="w-30 justify-start text-xs ml-7"
              onClick={() => handleAddPage(section._id)}
            >
              <Plus className="w-3 h-3 mr-2" />
              Add Page
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Section;
