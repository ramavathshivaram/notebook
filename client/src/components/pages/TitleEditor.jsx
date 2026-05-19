import React, { useState, useCallback, useEffect, memo } from "react";
import { Input } from "@/components/ui/input";
import debounce from "lodash.debounce";

import { useUpdatePage } from "@/hooks/page.query.js";

import { download } from "@/helper/download.js";

import { Button } from "../ui/button";

import { Download, Loader2, Check } from "lucide-react";

const TitleEditor = ({ title, pageId, sectionId }) => {
  const [localTitle, setLocalTitle] = useState(title);

  const [downloading, setDownloading] = useState(false);

  const [saved, setSaved] = useState(false);

  const { mutate: updatePageMutate, isPending } = useUpdatePage();

  useEffect(() => {
    setLocalTitle(title);
  }, [title]);

  const handleDownload = () => {
    download(localTitle, downloading, setDownloading);
  };

  const debouncedUpdate = useCallback(
    debounce((value) => {
      updatePageMutate(
        {
          pageId,
          sectionId,
          updatedData: {
            title: value,
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

  const handleChange = (value) => {
    setLocalTitle(value);

    setSaved(false);

    debouncedUpdate(value);
  };

  return (
    <div className="border-b bg-background/80 backdrop-blur sticky top-0 z-10">
      <div className="flex items-center justify-between gap-4 px-4 py-2">
        {/* Title */}
        <Input
          value={localTitle}
          onChange={(e) => handleChange(e.target.value)}
          placeholder="Untitled Page"
          className="text-3xl font-bold border-0 shadow-none bg-transparent px-0 h-auto focus-visible:ring-0 focus-visible:ring-offset-0"
        />

        {/* Actions */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Save Status */}
          <div className="w-[90px] text-sm text-muted-foreground">
            {isPending ? (
              <div className="flex items-center gap-1">
                <Loader2 size={14} className="animate-spin" />
                Saving
              </div>
            ) : saved ? (
              <div className="flex items-center gap-1 text-green-500">
                <Check size={14} />
                Saved
              </div>
            ) : null}
          </div>

          {/* Download */}
          <Button
            variant="outline"
            onClick={handleDownload}
            disabled={downloading}
            className="gap-2"
          >
            {downloading ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Downloading
              </>
            ) : (
              <>
                <Download size={16} />
                Download
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default memo(TitleEditor);
