import React from "react";

import { useLocation, useNavigate } from "react-router-dom";

import { motion } from "framer-motion";

import { FileText, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";

import { useDeletePage } from "@/hooks/page.query.js";

const Page = ({ page, sectionId }) => {
  const navigate = useNavigate();

  const location = useLocation();

  const { mutate, isPending } = useDeletePage();

  const isSelected = location.pathname === `/notebook/page/${page._id}`;

  const handleNavigate = () => {
    navigate(`/notebook/page/${page._id}`);
  };

  const handleDelete = (e) => {
    e.stopPropagation();

    if (isSelected) navigate("/notebook");

    mutate({
      pageId: page._id,
      sectionId,
    });
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 4 }}
      transition={{ duration: 0.18 }}
      className="group flex items-center gap-1"
    >
      <Button
        variant="ghost"
        onClick={handleNavigate}
        className={cn(
          `
            h-9 flex-1 justify-start rounded-xl px-3
            text-sm font-normal transition-all duration-200
            hover:bg-accent hover:text-accent-foreground
          `,
          isSelected
            ? "bg-accent text-accent-foreground shadow-sm"
            : "text-muted-foreground",
        )}
      >
        <FileText
          className={cn(
            "mr-2 h-4 w-4 shrink-0",
            isSelected ? "text-foreground" : "text-muted-foreground",
          )}
        />

        <span className="truncate">{page.title}</span>
      </Button>

      <Button
        variant="ghost"
        size="icon"
        disabled={isPending}
        onClick={handleDelete}
        className="
          h-8 w-8 rounded-lg opacity-0
          transition-all duration-200
          hover:bg-accent hover:text-destructive
          group-hover:opacity-100
        "
      >
        <Trash2 className="h-3.5 w-3.5" />
      </Button>
    </motion.div>
  );
};

export default React.memo(Page);
