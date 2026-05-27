// NoteEditor.jsx

import { memo, useEffect } from "react";

import { motion } from "motion/react";

import { useParams } from "react-router-dom";

import { useGetPage } from "@/hooks/page.query.js";

import NoteEditorSkeleton from "@/skeletons/NoteEditorSkeleton";

import ErrorMessage from "@/components/common/ErrorMessage";

import TitleEditor from "./TitleEditor";

import ContentEditor from "./ContentEditor";

import usePageStore from "@/store/page.store.js";

const NoteEditor = () => {
  const { pageId } = useParams();

  const clearContent = usePageStore((s) => s.clearContent);

  const { data: page, isLoading, error } = useGetPage(pageId);

  useEffect(() => {
    return () => clearContent();
  }, [clearContent]);

  if (isLoading) return <NoteEditorSkeleton />;

  if (error) return <ErrorMessage message="Failed to load note" />;

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 10,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.25,
      }}
      className="
        flex h-full flex-1 flex-col
        overflow-hidden bg-background
      "
    >
      {/* Title */}
      <TitleEditor
        title={page?.title}
        pageId={pageId}
        sectionId={page?.sectionId}
      />

      {/* Content */}
      <div
        className="
          flex-1 overflow-hidden
        "
      >
        <ContentEditor
          content={page?.content}
          title={page?.title}
          pageId={pageId}
          sectionId={page?.sectionId}
        />
      </div>
    </motion.div>
  );
};

export default memo(NoteEditor);
