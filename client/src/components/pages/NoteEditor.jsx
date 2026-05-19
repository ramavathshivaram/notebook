import NoteEditorSkeleton from "@/skeletons/NoteEditorSkeleton";
import ErrorMessage from "@/components/common/ErrorMessage";
import TitleEditor from "./TitleEditor";
import ContentEditor from "./ContentEditor";
import { useGetPage } from "@/hooks/page.query.js";
import { memo } from "react";

const NoteEditor = ({ pageId }) => {
  const { data: page, isLoading, error } = useGetPage(pageId);

  if (isLoading) return <NoteEditorSkeleton />;
  if (error) return <ErrorMessage />;

  return (
    <div className="flex-1 flex flex-col h-full">
      <div className="flex-1 overflow-auto p-4">
        <TitleEditor title={page?.title} pageId={pageId} />
        <ContentEditor
          content={page?.content}
          title={page?.title}
          pageId={pageId}
        />
      </div>
    </div>
  );
};

export default memo(NoteEditor);
