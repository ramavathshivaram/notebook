// ContentEditor.jsx

import React, { useEffect, useCallback } from "react";

import debounce from "lodash.debounce";

import ReactQuill from "react-quill-new";

import "react-quill-new/dist/quill.snow.css";

import { motion } from "motion/react";

import usePageStore from "@/store/page.store.js";

import { useUpdatePage } from "@/hooks/page.query.js";

const toolbarOptions = [
  [
    {
      header: [1, 2, 3, false],
    },
  ],

  ["bold", "italic", "underline"],

  ["blockquote", "code-block"],

  ["link"],

  [
    {
      list: "ordered",
    },

    {
      list: "bullet",
    },
  ],

  ["clean"],
];

const ContentEditor = ({ content, pageId, sectionId }) => {
  const editorContent = usePageStore((s) => s.content) || content;

  const setContent = usePageStore((s) => s.setContent);

  const { mutate: updatePageMutate } = useUpdatePage();

  useEffect(() => {
    setContent({
      resourceId: pageId,
      content,
    });
  }, [content, pageId, setContent]);

  const debouncedUpdate = useCallback(
    debounce((value) => {
      updatePageMutate({
        pageId,
        sectionId,

        updatedData: {
          content: value,
        },
      });
    }, 800),

    [pageId, sectionId, updatePageMutate],
  );

  useEffect(() => {
    return () => debouncedUpdate.cancel();
  }, [debouncedUpdate]);

  const handleChange = (value) => {
    setContent({
      resourceId: pageId,
      content: value,
    });

    debouncedUpdate(value);
  };

  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      className="
        relative flex h-full
        flex-col overflow-hidden
      "
    >
      {/* Editor */}
      <div
        className="
          note-editor flex-1 overflow-hidden
          bg-background
        "
      >
        <ReactQuill
          className="h-full"
          theme="snow"
          value={editorContent}
          onChange={handleChange}
          placeholder="Start writing your thoughts..."
          modules={{
            toolbar: toolbarOptions,
          }}
        />
      </div>
    </motion.div>
  );
};

export default ContentEditor;
