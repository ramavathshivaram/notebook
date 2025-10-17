import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { getPage, updatePage } from "../helper/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import NoteEditorSkeleton from "../skeletons/NoteEditorSkeleton";
import ErrorMessage from "../components/ErrorMessage";
import usePageStore from "../store/usePageStore";

const NoteEditor = ({ pageId }) => {
  const queryClient = useQueryClient();
  const initialLoad = usePageStore((s) => s.initialLoad);
  const clearInitialLoad= usePageStore((s) => s.clearInitialLoad);
  const {
    data: page,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["page", pageId],
    queryFn: () => getPage(pageId),
    enabled: initialLoad,
  });

  const { mutate: updatePageMutate } = useMutation({
    mutationFn: ({ pageId, updatedData }) => updatePage(pageId, updatedData),
    onSuccess: () => {
      // Refetch the sections or specific page if cached
      queryClient.invalidateQueries(["sections"]);
      queryClient.invalidateQueries(["page", pageId]);
    },
    onMutate: async ({ pageId, updatedData }) => {
      const prevPage = queryClient.getQueryData(["page", pageId]);
      const prevSections = queryClient.getQueryData(["sections"]);

      // Update page query
      queryClient.setQueryData(["page", pageId], (old) => ({
        ...old,
        ...updatedData,
      }));

      // Update sections if title is changing (assuming sections include page titles)
      if ("title" in updatedData) {
        queryClient.setQueryData(["sections"], (old) =>
          old?.map((sec) =>
            sec.pages
              ? {
                  ...sec,
                  pages: sec.pages.map((p) =>
                    p._id === pageId ? { ...p, title: updatedData.title } : p
                  ),
                }
              : sec
          )
        );
      }

      return { prevPage, prevSections };
    },
    onError: (error, variables, context) => {
      queryClient.setQueryData(["page", pageId], context.prevPage);
      queryClient.setQueryData(["sections"], context.prevSections);
      console.error("❌ Error updating page:", error);
    },
  });
  const [localTitle, setLocalTitle] = useState("");
  const [localContent, setLocalContent] = useState("");
  const textareaRef = useRef(null);

  useEffect(() => {
    if (page) {
      setLocalTitle(page.title);
      setLocalContent(page.content);
    }
  }, [page]);

  const handleTitleBlur = () => {
    if (!page || page.title == localTitle) return;
    updatePageMutate({
      pageId,
      updatedData: { title: localTitle, content: localContent },
    });
  };

  const handleContentBlur = () => {
    if (!page || page.content == localContent) return;
    updatePageMutate({
      pageId,
      updatedData: { title: localTitle, content: localContent },
    });
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  }, [localContent]);

  if (isLoading) return <NoteEditorSkeleton />;
  if (error) return <ErrorMessage />;

  return (
    <div className="flex-1 flex flex-col h-full">
      <div className="flex-1 overflow-auto p-8">
        <Input
          value={localTitle}
          onChange={(e) => setLocalTitle(e.target.value)}
          onBlur={handleTitleBlur}
          placeholder="Page Title"
          className="text-3xl font-bold border-0 bg-transparent px-2 mb-4 focus-visible:ring-0"
        />
        <Textarea
          ref={textareaRef}
          value={localContent}
          onChange={(e) => setLocalContent(e.target.value)}
          onBlur={handleContentBlur}
          placeholder="Start typing your notes..."
          spellCheck={true}
          className="min-h-[500px] border-0 bg-transparent px-0 text-base resize-none focus-visible:ring-0 leading-relaxed"
        />
      </div>
    </div>
  );
};

export default NoteEditor;
