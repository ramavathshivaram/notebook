import React, { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronRight, Book, Trash2, Plus } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { renameSection, createPage, deleteSection } from "../helper/api";
import Page from "./Page";
import { v4 as uuid } from "uuid";
import usePageStore from "../store/usePageStore";

const Section = ({ section, isExpanded, setIsExpanded }) => {
  const queryClient = useQueryClient();
  const currentPage = usePageStore((s) => s.currentPage);
  const setCurrentPage = usePageStore((s) => s.setCurrentPage);
  const [editingSectionId, setEditingSectionId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const isSectionSelected = section?.pages?.some(
    (page) => page._id === currentPage
  );

  const { mutate: renameSectionMutate } = useMutation({
    mutationFn: ({ id, title }) => renameSection(id, title),
    onSuccess: () => {
      queryClient.invalidateQueries(["sections"]);
      setEditingSectionId(null);
    },
    onMutate: async ({ id, title }) => {
      const previousSections = queryClient.getQueryData(["sections"]);
      queryClient.setQueryData(["sections"], (old) =>
        old.map((sec) => (sec._id === id ? { ...sec, title } : sec))
      );
      return { previousSections };
    },
    onError: (err, variables, context) => {
      queryClient.setQueryData(["sections"], context.previousSections);
    },
  });

  const { mutate: addPageMutate } = useMutation({
    mutationFn: (page) => createPage(page),
    onSuccess: () => {
      queryClient.invalidateQueries(["sections"]);
    },
    onMutate: async ({ sectionId, title, pageId }) => {
      const previousSections = queryClient.getQueryData(["sections"]);
      queryClient.setQueryData(["sections"], (old) =>
        old.map((sec) =>
          sec._id === sectionId
            ? {
                ...sec,
                pages: [...sec.pages, { _id: pageId, title, sectionId }],
              }
            : sec
        )
      );
      setCurrentPage(pageId, false);
      return { previousSections };
    },
    onError: (err, variables, context) => {
      setCurrentPage(null);
      queryClient.setQueryData(["sections"], context.previousSections);
    },
  });

  const handleRename = (sectionId, newTitle) => {
    if (!newTitle.trim()) return;
    renameSectionMutate({ id: sectionId, title: newTitle });
  };

  const { mutate: deleteMutation } = useMutation({
    mutationFn: (sectionId) => deleteSection(sectionId),
    onSuccess: () => {
      queryClient.invalidateQueries(["sections"]);
    },
    onMutate: async (sectionId) => {
      if (isSectionSelected) setCurrentPage(null);
      const previousSections = queryClient.getQueryData(["sections"]);
      queryClient.setQueryData(["sections"], (old) =>
        old.filter((sec) => sec._id !== sectionId)
      );
      return { previousSections };
    },
    onError: (err, sectionId, context) => {
      queryClient.setQueryData(["sections"], context.previousSections);
    },
  });
  const handleAddPage = (sectionId) => {
    const pageId = uuid();
    addPageMutate({
      sectionId,
      title: `New Page ${section.pages.length + 1}`,
      pageId,
    });
  };

  const handleDeleteSection = (sectionId) => {
    deleteMutation(sectionId);
  };

  return (
    <motion.div
      className="mb-2 mr-5"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0 }}
      key={section._id}
    >
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
                isSectionSelected && "text-blue-700"
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

        <Button
          variant="ghost"
          size="icon"
          className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          onClick={() => handleDeleteSection(section._id)}
        >
          <Trash2 className="w-4 h-4 text-red-500" />
        </Button>
      </div>
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
            {/* 🔹 Pages */}
            {section.pages?.map((page) => (
              <Page key={page._id} page={page} sectionId={section._id} />
            ))}
            {/* 🔹 Add Page */}
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
