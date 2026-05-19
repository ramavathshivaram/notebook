import React, { useState, useCallback, useEffect } from "react";
import debounce from "lodash.debounce";

import { useUpdatePage } from "@/hooks/page.query.js";

import ReactQuill from "react-quill-new";

import "react-quill-new/dist/quill.snow.css";

import { Loader2, Check } from "lucide-react";

const ContentEditor = ({ content, pageId, sectionId }) => {
  const [localContent, setLocalContent] = useState(content);

  const [saved, setSaved] = useState(false);

  const { mutate: updatePageMutate, isPending } = useUpdatePage();

  useEffect(() => {
    setLocalContent(content);
  }, [content]);

  // Debounced save
  const debouncedUpdate = useCallback(
    debounce((value) => {
      updatePageMutate(
        {
          pageId,
          sectionId,
          updatedData: {
            content: value,
          },
        },
        {
          onSuccess: () => {
            setSaved(true);

            setTimeout(() => {
              setSaved(false);
            }, 2000);
          },
        },
      );
    }, 800),
    [pageId, sectionId, updatePageMutate],
  );

  // Cleanup debounce
  useEffect(() => {
    return () => debouncedUpdate.cancel();
  }, [debouncedUpdate]);

  const handleChange = (value) => {
    setLocalContent(value);

    setSaved(false);

    debouncedUpdate(value);
  };

  return (
    <div className="relative flex flex-col h-full overflow-hidden">
      {/* Editor */}
      <div className="flex-1 overflow-hidden">
        <ReactQuill
          className="my-editor h-full"
          theme="snow"
          value={localContent}
          onChange={handleChange}
          placeholder="Start speaking or typing..."
          modules={{
            toolbar: [
              [{ header: [1, 2, false] }],
              ["bold", "italic", "underline"],
              ["link"],
              [{ list: "ordered" }, { list: "bullet" }],
              ["clean"],
            ],
          }}
        />
      </div>
    </div>
  );
};

export default ContentEditor;
