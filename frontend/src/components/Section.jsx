import React, { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { motion } from "framer-motion";
import { ChevronRight, Book, Trash2, Plus } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { renameSection } from "../helper/api";
import Page from "./Page";

const Section = ({ section, is_expanded, set_is_expanded }) => {
  const queryClient = useQueryClient();
  const [editingSectionId, setEditingSectionId] = useState(null);
  const [editTitle, setEditTitle] = useState("");

  // ✅ Mutation for renaming section
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

  const handleRename = (sectionId, newTitle) => {
    if (!newTitle.trim()) return;
    renameSectionMutate({ id: sectionId, title: newTitle });
  };

  const handleDeleteSection = (sectionId) => {
    console.log("🗑️ Delete Section:", sectionId);
    // TODO: implement delete mutation
  };
  console.log("section", section);
  return (
    <div className="mb-2">
      {/* 🔹 Section Header */}
      <div className="flex items-center">
        <Button
          variant="ghost"
          className="w-full justify-start"
          onClick={() =>
            set_is_expanded((prev) =>
              prev === section._id ? null : section._id
            )
          }
        >
          {/* Arrow animation */}
          <motion.div
            animate={{ rotate: is_expanded ? 90 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronRight className="w-4 h-4 mr-2" />
          </motion.div>

          <Book className="w-4 h-4 mr-2" />

          {/* 🔹 Rename Logic */}
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
          className="ml-auto"
          onClick={() => handleDeleteSection(section._id)}
        >
          <Trash2 className="w-4 h-4 text-red-500" />
        </Button>
      </div>

      {/* 🔹 Pages */}
      {set_is_expanded &&
        section.pages?.map((page) => (
          <Page key={page._id} page={page} sectionId={section._id} />
        ))}

      {/* 🔹 Add Page */}
      {set_is_expanded && (
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start text-xs ml-4 mt-1"
          onClick={() => console.log("➕ Add Page", section._id)}
        >
          <Plus className="w-3 h-3 mr-2" />
          Add Page
        </Button>
      )}
    </div>
  );
};

export default Section;
