import React, { useEffect, useCallback, memo } from "react";
import debounce from "lodash.debounce";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { motion } from "motion/react";
import usePageStore from "@/store/page.store.js";
import { useUpdatePage } from "@/hooks/page.query.js";

const toolbarOptions = [
  [{ header: [1, 2, 3, false] }],
  ["bold", "italic", "underline"],
  ["blockquote", "code-block"],
  ["link"],
  [{ list: "ordered" }, { list: "bullet" }],
  ["clean"],
];

const modules = {
  toolbar: toolbarOptions,
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "blockquote",
  "code-block",
  "link",
  "list",
  "bullet",
];

const ContentEditor = ({ content, pageId, sectionId }) => {
  const editorContent = usePageStore((s) => s.content);

  const setContent = usePageStore((s) => s.setContent);

  const { mutate } = useUpdatePage();

  useEffect(() => {
    setContent({
      resourceId: pageId,
      content,
    });
  }, [content, pageId, setContent]);

  const debouncedUpdate = useCallback(
    debounce((value) => {
      mutate({
        pageId,
        sectionId,
        updatedData: {
          content: value,
        },
      });
    }, 800),
    [mutate, pageId, sectionId],
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
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative flex h-full flex-col overflow-hidden"
    >
      <div className="note-editor flex-1 overflow-hidden bg-background">
        <ReactQuill
          theme="snow"
          value={editorContent || content}
          onChange={handleChange}
          placeholder="Start writing your thoughts..."
          className="h-full"
          modules={modules}
          formats={formats}
        />
      </div>
    </motion.div>
  );
};

export default memo(ContentEditor);
