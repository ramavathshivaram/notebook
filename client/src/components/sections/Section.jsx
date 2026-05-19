import React, { useState } from "react";
import { motion } from "framer-motion";

import { Button } from "../ui/button.jsx";
import { Input } from "../ui/input.jsx";

import { cn } from "@/lib/utils";

import { Book, Trash2, Plus } from "lucide-react";

import Page from "../pages/Page.jsx";
import Canvas from "../Canvas.jsx";

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { useRenameSection, useDeleteSection } from "@/hooks/section.query.js";

import { useAddPage } from "@/hooks/page.query.js";

import useAddCanvas from "@/hooks/useAddCanvas.js";
import PageList from "../pages/PageList.jsx";

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

  return (
    <AccordionItem value={section._id} className="border-none">
      <div className="flex items-center group">
        <AccordionTrigger className="hover:no-underline py-2">
          <div className="flex items-center">
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
              <motion.span
                className={cn(
                  "truncate cursor-pointer text-blue-700 font-medium",
                )}
                onDoubleClick={() => {
                  setEditingSectionId(section._id);
                  setEditTitle(section.title);
                }}
              >
                {section.title}
              </motion.span>
            )}
          </div>
        </AccordionTrigger>

        <Button
          variant="ghost"
          size="icon"
          className="ml-auto opacity-0 group-hover:opacity-100"
          onClick={() => deleteSectionMutate(section._id)}
        >
          <Trash2 className="w-4 h-4 text-red-600" />
        </Button>
      </div>

      <AccordionContent className="ml-6 space-y-1">
        <PageList sectionId={section._id} />

        {section.canvases?.map((canvas) => (
          <Canvas key={canvas._id} canvas={canvas} sectionId={section._id} />
        ))}

        <div className="flex gap-2 pt-2">
          <Button size="sm" className="text-xs" onClick={handleAddPage}>
            <Plus className="size-3" />
            Note
          </Button>

          <Button size="sm" className="text-xs" onClick={handleAddPage}>
            <Plus className="size-3" />
            Drawing
          </Button>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

export default Section;
