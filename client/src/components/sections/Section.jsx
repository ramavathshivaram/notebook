import React, { useState } from "react";

import { motion } from "framer-motion";

import { Book, Plus, FileText, PencilLine, Trash2 } from "lucide-react";

import { Button } from "../ui/button";

import { Input } from "../ui/input";

import { cn } from "@/lib/utils";

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { useRenameSection, useDeleteSection } from "@/hooks/section.query.js";

import { useAddPage } from "@/hooks/page.query.js";

import { useAddCanvas } from "@/hooks/canvas.query.js";

import PageList from "../pages/PageList";

import CanvasList from "../canvas/CanvasList";

const Section = ({ section }) => {
  const renameSectionMutate = useRenameSection().mutate;

  const deleteSectionMutate = useDeleteSection().mutate;

  const addPageMutate = useAddPage().mutate;

  const addCanvasMutate = useAddCanvas().mutate;

  const [editingSectionId, setEditingSectionId] = useState(null);

  const [editTitle, setEditTitle] = useState("");

  const handleRename = (sectionId, newTitle) => {
    if (!newTitle.trim()) return;

    renameSectionMutate({
      id: sectionId,
      title: newTitle,
    });

    setEditingSectionId(null);
  };

  const handleAddPage = () => {
    addPageMutate({
      sectionId: section._id,
      title: "New Note",
    });
  };

  const handleAddCanvas = () => {
    addCanvasMutate({
      sectionId: section._id,
      title: "New Canvas",
    });
  };

  return (
    <AccordionItem
      value={section._id}
      className="
        overflow-hidden rounded-2xl border
        border-border bg-card
        transition-colors
      "
    >
      {/* Header */}
      <div className="group flex items-center justify-between px-2">
        <AccordionTrigger className="flex-1 py-2 hover:no-underline">
          <div className="flex items-center gap-2 overflow-hidden">
            {/* Icon */}
            <div
              className="
                flex h-7 w-7 items-center justify-center rounded-lg
                border border-border bg-muted
              "
            >
              <Book className="h-3.5 w-3.5 text-muted-foreground" />
            </div>

            {/* Rename Input */}
            {editingSectionId === section._id ? (
              <Input
                autoFocus
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                onBlur={() => handleRename(section._id, editTitle)}
                onKeyDown={(e) =>
                  e.key === "Enter" && handleRename(section._id, editTitle)
                }
                className="
                  h-8 border-border bg-background
                  text-sm shadow-none
                "
              />
            ) : (
              <motion.span
                layout
                onDoubleClick={() => {
                  setEditingSectionId(section._id);
                  setEditTitle(section.title);
                }}
                className={cn(
                  "truncate text-sm font-medium transition-colors",
                  "text-foreground hover:text-foreground/80",
                )}
              >
                {section.title}
              </motion.span>
            )}
          </div>
        </AccordionTrigger>

        {/* Delete */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => deleteSectionMutate(section._id)}
          className="
            h-8 w-8 rounded-lg opacity-0
            transition-all duration-200
            hover:bg-accent hover:text-destructive
            group-hover:opacity-100
          "
        >
          <Trash2 className="h-3.5 w-3.5" />
        </Button>
      </div>

      {/* Content */}
      <AccordionContent className="space-y-3 px-2 pb-3">
        {/* Notes */}
        <div className="space-y-1">
          <div
            className="
              flex items-center gap-2 px-2 pt-1
              text-[11px] font-medium uppercase tracking-wide
              text-muted-foreground
            "
          >
            <FileText className="h-3 w-3" />
            Notes
          </div>

          <PageList sectionId={section._id} />
        </div>

        {/* Canvas */}
        <div className="space-y-1">
          <div
            className="
              flex items-center gap-2 px-2 pt-1
              text-[11px] font-medium uppercase tracking-wide
              text-muted-foreground
            "
          >
            <PencilLine className="h-3 w-3" />
            Canvas
          </div>

          <CanvasList sectionId={section._id} />
        </div>

        {/* Actions */}
        <div className="flex gap-2 px-1 pt-1">
          <Button
            size="sm"
            onClick={handleAddPage}
            className="
              h-8 rounded-xl border border-border
              bg-muted text-xs text-foreground
              hover:bg-accent hover:text-accent-foreground
            "
          >
            <Plus className="mr-1 h-3 w-3" />
            Note
          </Button>

          <Button
            size="sm"
            onClick={handleAddCanvas}
            className="
              h-8 rounded-xl border border-border
              bg-muted text-xs text-foreground
              hover:bg-accent hover:text-accent-foreground
            "
          >
            <Plus className="mr-1 h-3 w-3" />
            Canvas
          </Button>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

export default React.memo(Section);
