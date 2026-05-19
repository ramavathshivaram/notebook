import { memo } from "react";

import { useParams } from "react-router-dom";

import { useGetPage } from "@/hooks/page.query.js";

import NoteEditorSkeleton from "@/skeletons/NoteEditorSkeleton";

import ErrorMessage from "@/components/common/ErrorMessage";

import TitleEditor from "./TitleEditor";

import ContentEditor from "./ContentEditor";

const NoteEditor = () => {
  const { pageId } = useParams();

  const { data: page, isLoading, error } = useGetPage(pageId);

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
