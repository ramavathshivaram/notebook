import React, { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { motion } from "framer-motion";
import { ChevronRight, Book, Trash2, Plus } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { renameSection, createPage, deleteSection } from "../helper/api";
import Page from "./Page";

const Section = ({ section, isExpanded, setIsExpanded }) => {
  const queryClient = useQueryClient();
  const [editingSectionId, setEditingSectionId] = useState(null);
  const [editTitle, setEditTitle] = useState("");

  const { mutate: renameSectionMutate } = useMutation({
    mutationFn: ({ id, title }) => renameSection(id, title),
    onSuccess: () => {
      queryClient.invalidateQueries(["sections"]);
      setEditingSectionId(null);
    },
    onError: (err) => {
      console.error("❌ Rename error:", err);
    },
  });

  const { mutate: addPageMutate } = useMutation({
    mutationFn: ({ sectionId, title }) => createPage(sectionId, title),
    onSuccess: () => {
      queryClient.invalidateQueries(["sections"]);
    },
    onError: (err) => {
      console.error("❌ Add page error:", err);
    },
  });

  const handleRename = (sectionId, newTitle) => {
    if (!newTitle.trim()) return;
    renameSectionMutate({ id: sectionId, title: newTitle });
  };

  const handleAddPage = (sectionId) => {
    addPageMutate({ sectionId, title: "New Page" });
  };
  const { mutate: deleteMutation } = useMutation({
    mutationFn: (sectionId) => deleteSection(sectionId),
    onSuccess: () => {
      queryClient.invalidateQueries(["sections"]);
    },
  });

  const handleDeleteSection = (sectionId) => {
    deleteMutation(sectionId);
  };

  return (
    <div className="mb-2 mr-5">
      <div className="flex items-center w-full px-2 group">
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
              className="truncate cursor-pointer"
              onDoubleClick={() => {
                setEditingSectionId(section._id);
                setEditTitle(section.title);
              }}
            >
              {section.title}
            </span>
          )}
        </Button>

        {/* 🔹 Delete Section */}
        <Button
          variant="ghost"
          size="icon"
          className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          onClick={() => handleDeleteSection(section._id)}
        >
          <Trash2 className="w-4 h-4 text-red-500" />
        </Button>
      </div>

      {isExpanded === section._id && (
        <motion.div className="pl-5" transition={{ duration: 0.2 }}>
          {/* 🔹 Pages */}
          {section.pages?.map((page) => (
            <Page key={page._id} page={page} sectionId={section._id} />
          ))}
          {/* 🔹 Add Page */}
          <Button
            size="sm"
            className="w-full max-w-50 justify-start text-xs ml-4 mt-1"
            onClick={() => handleAddPage(section._id)}
          >
            <Plus className="w-3 h-3 mr-2" />
            Add Page
          </Button>
        </motion.div>
      )}
    </div>
  );
};

export default Section;
