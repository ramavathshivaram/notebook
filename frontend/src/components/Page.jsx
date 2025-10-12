import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "../components/ui/button";
import { FileText, Trash2 } from "lucide-react";
import { deletePage } from "../helper/api";
import usePageStore from "../store/usePageStore";

const Page = ({ page, sectionId }) => {
  const queryClient = useQueryClient();

  const setCurrentPage = usePageStore((s) => s.setCurrentPage);
  const currentPage = usePageStore((s) => s.currentPage);

  // 🔹 Delete Page Mutation
  const deleteMutation = useMutation({
    mutationFn: ({ sectionId, pageId }) => deletePage(sectionId, pageId),
    onSuccess: () => {
      queryClient.invalidateQueries(["sections"]);
    },
    onMutate: async ({ sectionId, pageId }) => {
      if (currentPage === pageId) setCurrentPage(null);
      const previousSections = queryClient.getQueryData(["sections"]);
      queryClient.setQueryData(["sections"], (old) =>
        old?.map((sec) =>
          sec._id === sectionId
            ? { ...sec, pages: sec.pages.filter((p) => p._id !== pageId) }
            : sec
        )
      );
      return { previousSections };
    },
    onError: (err, variables, context) => {
      if (context?.previousSections) {
        queryClient.setQueryData(["sections"], context.previousSections);
      }
    },
  });

  const handleDelete = () => {
    deleteMutation.mutate({ sectionId, pageId: page._id });
  };

  return (
    <div className="flex items-center mx-4 group">
      <Button
        variant="ghost"
        className="w-full justify-start text-sm mb-1 transition-all hover:translate-x-1"
        onClick={() => setCurrentPage(page._id)}
      >
        <FileText className="w-4 h-4 mr-2" />
        <span
          className={`truncate cursor-pointer ${
            currentPage === page._id ? "text-blue-700" : ""
          }`}
        >
          {page.title}
        </span>
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        onClick={handleDelete}
        disabled={deleteMutation.isLoading}
      >
        <Trash2 className="w-3 h-3 text-red-500" />
      </Button>
    </div>
  );
};

export default Page;
