import React from "react";

import { useLocation, useNavigate } from "react-router-dom";

import { motion } from "framer-motion";

import { PencilLine, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";

import { useDeleteCanvas } from "@/hooks/canvas.query.js";

const Canvas = ({ canvas, sectionId }) => {
  const navigate = useNavigate();

  const location = useLocation();

  const { mutate, isPending } = useDeleteCanvas();

  const isSelected = location.pathname === `/notebook/canvas/${canvas._id}`;

  const handleNavigate = () => {
    navigate(`/notebook/canvas/${canvas._id}`);
  };

  const handleDelete = (e) => {
    e.stopPropagation();

    mutate({
      canvasId: canvas._id,
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
        <PencilLine className="mr-2 h-4 w-4 shrink-0" />

        <span className="truncate">{canvas.title}</span>
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

export default React.memo(Canvas);
