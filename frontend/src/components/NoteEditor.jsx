import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { getPage, updatePage } from "../helper/api";
import { useQuery } from "@tanstack/react-query";

const NoteEditor = ({ pageId }) => {
  const {
    data: page,
    isLoading,
    error,
  } = useQuery(["page", pageId], () => getPage(pageId));

  const [localTitle, setLocalTitle] = useState("");
  const [localContent, setLocalContent] = useState("");
  const textareaRef = useRef(null);

  useEffect(() => {
    if (page) {
      setLocalTitle(page.title);
      setLocalContent(page.content);
    }
  }, [page]);

  const handleTitleBlur = async () => {
    if (!page) return;
    await updatePage(pageId, { title: localTitle, content: localContent });
  };

  const handleContentBlur = async () => {
    if (!page) return;
    await updatePage(pageId, { title: localTitle, content: localContent });
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
          className="text-3xl font-bold border-0 bg-transparent px-0 mb-4 focus-visible:ring-0"
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
