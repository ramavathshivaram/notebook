// TitleEditor.jsx

import React, { useState, useCallback, useEffect, memo } from "react";

import debounce from "lodash.debounce";

import { Download, Loader2, Check, FileText } from "lucide-react";

import { motion } from "motion/react";

import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";

import { useUpdatePage } from "@/hooks/page.query.js";

import { download } from "@/helper/download.js";

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
    <div
      className="
        sticky top-0 z-20
        border-b border-border
        bg-background/80
        backdrop-blur-xl
      "
    >
      <div
        className="
          flex items-center
          justify-between gap-4
          px-6 py-4
        "
      >
        {/* Left */}
        <div
          className="
            flex min-w-0 flex-1
            items-center gap-4
          "
        >
          {/* Icon */}
          <motion.div
            whileHover={{
              scale: 1.05,
            }}
            className="
              hidden h-11 w-11 shrink-0
              items-center justify-center
              rounded-2xl border border-border
              bg-card shadow-sm
              md:flex
            "
          >
            <FileText className="h-5 w-5" />
          </motion.div>

          {/* Input */}
          <Input
            value={localTitle}
            onChange={(e) => handleChange(e.target.value)}
            placeholder="Untitled Page"
            className={cn(
              `
                h-auto border-0 bg-transparent
                px-0 text-3xl font-black
                tracking-tight shadow-none
                focus-visible:ring-0
                focus-visible:ring-offset-0
              `,
            )}
          />
        </div>

        {/* Right */}
        <div
          className="
            flex shrink-0 items-center gap-3
          "
        >
          {/* Save Status */}
          <div
            className="
              hidden w-[90px]
              text-sm text-muted-foreground
              md:block
            "
          >
            {isPending ? (
              <div
                className="
                  flex items-center gap-1
                "
              >
                <Loader2 size={14} className="animate-spin" />
                Saving
              </div>
            ) : saved ? (
              <div
                className="
                  flex items-center gap-1
                  text-green-500
                "
              >
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
            className="
              h-10 rounded-2xl
              border-border bg-card/60
              backdrop-blur-xl
            "
          >
            {downloading ? (
              <>
                <Loader2 size={16} className="mr-2 animate-spin" />
                Downloading
              </>
            ) : (
              <>
                <Download size={16} className="mr-2" />
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
