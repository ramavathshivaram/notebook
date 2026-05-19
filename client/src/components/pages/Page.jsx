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

    mutate({
      pageId: page._id,
      sectionId,
    });
  };

  return (
    <motion.div
      layout
      initial={{
        opacity: 0,
        scale: 0.95,
      }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      exit={{
        opacity: 0,
        scale: 0.95,
      }}
      transition={{
        duration: 0.2,
      }}
      className="group flex items-center gap-1 px-2"
    >
      <Button
        variant="ghost"
        onClick={handleNavigate}
        className={cn(
          "flex-1 justify-start text-sm transition-all hover:translate-x-1",
          isSelected && "bg-muted text-blue-700",
        )}
      >
        <FileText className="mr-2 h-4 w-4 shrink-0" />

        <span className="truncate">{page.title}</span>
      </Button>

      <Button
        variant="ghost"
        size="icon"
        disabled={isPending}
        onClick={handleDelete}
        className={cn(
          "opacity-0 transition-opacity duration-200",
          "group-hover:opacity-100",
        )}
      >
        <Trash2 className="h-3 w-3 text-red-600" />
      </Button>
    </motion.div>
  );
};

export default React.memo(Page);
