import React, { useEffect, useCallback } from "react";
import debounce from "lodash.debounce";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import usePageStore from "@/store/page.store.js";
import { useUpdatePage } from "@/hooks/page.query.js";

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
    <div className="relative flex flex-col overflow-hidden">
      <div className="flex-1 overflow-hidden">
        <ReactQuill
          className="my-editor h-full"
          theme="snow"
          value={editorContent}
          onChange={handleChange}
          placeholder="Start speaking or typing..."
          modules={{
            toolbar: [
              [
                {
                  header: [1, 2, false],
                },
              ],
              ["bold", "italic", "underline"],
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
            ],
          }}
        />
      </div>
    </div>
  );
};

export default ContentEditor;
