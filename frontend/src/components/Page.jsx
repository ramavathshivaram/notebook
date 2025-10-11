import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Input } from "@/components/ui";
import { FileText, Trash2 } from "lucide-react";
import { renamePageAPI, deletePageAPI } from "@/api/page";
import usePageStore from "../store/usePageStore";

const Page = ({ page, sectionId }) => {
  const [editingPageId, setEditingPageId] = useState(null);
  const [editTitle, setEditTitle] = useState(page.title);

  const queryClient = useQueryClient();

  const setCurrentPage = usePageStore((s) => s.setCurrentPage);

  // 🔹 Rename Page Mutation
  const renameMutation = useMutation({
    mutationFn: renamePageAPI,
    onSuccess: () => {
      queryClient.invalidateQueries(["sections"]); // refetch all sections/pages
      setEditingPageId(null);
    },
  });

  // 🔹 Delete Page Mutation
  const deleteMutation = useMutation({
    mutationFn: deletePageAPI,
    onSuccess: () => {
      queryClient.invalidateQueries(["sections"]);
    },
  });

  const handleRename = () => {
    if (editTitle.trim()) {
      renameMutation.mutate({ pageId: page._id, title: editTitle });
    }
  };

  const handleDelete = () => {
    deleteMutation.mutate({ sectionId, pageId: page._id });
  };

  return (
    <div className="flex items-center ml-4 mt-1">
      <Button
        variant="ghost"
        className="w-full justify-start text-sm mb-1 transition-all hover:translate-x-1"
        onClick={() => setCurrentPage(page._id)}
      >
        <FileText className="w-4 h-4 mr-2" />
        {editingPageId === page._id ? (
          <Input
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            onBlur={handleRename}
            onKeyDown={(e) => e.key === "Enter" && handleRename()}
            className="h-7 text-xs"
            autoFocus
          />
        ) : (
          <span
            className="truncate cursor-pointer"
            onDoubleClick={() => setEditingPageId(page._id)}
          >
            {page.title}
          </span>
        )}
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="ml-auto"
        onClick={handleDelete}
        disabled={deleteMutation.isLoading}
      >
        <Trash2 className="w-3 h-3 text-red-500" />
      </Button>
    </div>
  );
};

export default Page;
