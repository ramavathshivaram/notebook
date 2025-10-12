import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { getPage, updatePage } from "../helper/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const NoteEditor = ({ pageId }) => {
  const queryClient = useQueryClient();
  const {
    data: page,
    isLoading,
    error,
  } = useQuery({ queryKey: ["page", pageId], queryFn: () => getPage(pageId) });

  const { mutate: updatePageMutate } = useMutation({
    mutationFn: ({ pageId, updatedData }) => updatePage(pageId, updatedData),
    onSuccess: () => {
      // Refetch the sections or specific page if cached
      queryClient.invalidateQueries(["sections"]);
      queryClient.invalidateQueries(["page", pageId]);
    },
    onError: (error) => {
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

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading page</div>;

  return (
    <div className="flex-1 flex flex-col h-full">
      <div className="flex-1 overflow-auto p-8">
        <Input
          value={localTitle}
          onChange={(e) => setLocalTitle(e.target.value)}
          onBlur={handleTitleBlur}
          placeholder="Page Title"
          className="text-2xl font-bold border-0 bg-transparent px-2 mb-4 focus-visible:ring-0"
        />
        <Textarea
          ref={textareaRef}
          value={localContent}
          onChange={(e) => setLocalContent(e.target.value)}
          onBlur={handleContentBlur}
          placeholder="Start typing your notes..."
          className="min-h-[500px] border-0 bg-transparent px-0 text-base resize-none focus-visible:ring-0 leading-relaxed"
        />
      </div>
    </div>
  );
};

export default NoteEditor;
