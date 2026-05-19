import React, { useState, useCallback } from "react";
import { Input } from "@/components/ui/input";
import debounce from "lodash.debounce";
import { useUpdatePage } from "@/hooks/page.query.js"; // note .js extension

const TitleEditor = ({ title, pageId, sectionId }) => {
  const [localTitle, setLocalTitle] = useState(title);
  const { mutate: updatePageMutate, isLoading } = useUpdatePage();

  const debouncedUpdate = useCallback(
    debounce((value) => {
      updatePageMutate({
        pageId,
        sectionId,
        updatedData: {
          title: value,
        },
      });
    }, 1000),
    [pageId, sectionId, updatePageMutate],
  );

  const handleChange = (value) => {
    setLocalTitle(value);
    debouncedUpdate(value);
  };

  return (
    <>
      <Input
        value={localTitle}
        onChange={(e) => handleChange(e.target.value)}
        placeholder="Page Title"
        className="text-3xl font-bold border-0 bg-transparent px-2 mb-4 focus-visible:ring-0"
      />
      {isLoading && (
        <p className="text-sm text-gray-500 mt-2 animate-pulse">Saving...</p>
      )}
    </>
  );
};

export default TitleEditor;
