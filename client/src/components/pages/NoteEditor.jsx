import { memo, useEffect } from "react";

import { useParams } from "react-router-dom";

import { useGetPage } from "@/hooks/page.query.js";

import NoteEditorSkeleton from "@/skeletons/NoteEditorSkeleton";

import ErrorMessage from "@/components/common/ErrorMessage";

import TitleEditor from "./TitleEditor";

import ContentEditor from "./ContentEditor";
import usePageStore from "@/store/page.store.js";

const NoteEditor = () => {
  const { pageId } = useParams();
  const clearContent=usePageStore((s) => s.clearContent);

  const { data: page, isLoading, error } = useGetPage(pageId);
  
    useEffect(() => {
      return () => clearContent();
    },[clearContent]);

  if (isLoading) return <NoteEditorSkeleton />;

  if (error) return <ErrorMessage />;


  return (
    <div className="flex h-full flex-1 flex-col">
      <div className="flex-1 overflow-auto p-4">
        <TitleEditor title={page?.title} pageId={pageId} sectionId={page?.sectionId} />

        <ContentEditor
          content={page?.content}
          title={page?.title}
          pageId={pageId}
          sectionId={page?.sectionId}
        />
      </div>
    </div>
  );
};

export default memo(NoteEditor);
