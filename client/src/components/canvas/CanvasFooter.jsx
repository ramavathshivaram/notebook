import React, { memo, useState } from "react";

import { Download, Loader2, Save } from "lucide-react";

import { motion } from "motion/react";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";

import { useUpdateCanvas } from "@/hooks/canvas.query.js";

const CanvasFooter = ({ canvasRef, title, content, canvasId }) => {
  const { mutateAsync: updateCanvasContent } = useUpdateCanvas();

  const [downloading, setDownloading] = useState(false);

  const [saving, setSaving] = useState(false);

  const handleDownload = async () => {
    if (downloading) return;

    setDownloading(true);

    try {
      if (!canvasRef.current) return;

      const imageData = await canvasRef.current.exportImage("png");

      const link = document.createElement("a");

      link.href = imageData;

      link.download = `${title || "canvas"}.png`;

      link.click();

      toast.success("Canvas downloaded");
    } catch (err) {
      toast.error("Failed to download");
    } finally {
      setDownloading(false);
    }
  };

  const handleSave = async () => {
    if (saving) return;

    setSaving(true);

    try {
      const image = await canvasRef.current?.exportImage("png");

      if (!image) {
        toast.error("Nothing to save");

        return;
      }

      await updateCanvasContent({
        canvasId,

        updatedData: {
          content: image,
        },
      });

      toast.success("Canvas saved");
    } catch (err) {
      toast.error("Failed to save");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      className="
        flex items-center
        justify-between gap-3
      "
    >
      <div
        className="
          text-sm text-muted-foreground
        "
      >
        Draw freely and save your ideas.
      </div>

      <div
        className="
          flex items-center gap-3
        "
      >
        {/* Download */}
        <motion.div
          whileTap={{
            scale: 0.96,
          }}
        >
          <Button
            variant="outline"
            onClick={handleDownload}
            disabled={downloading}
            className="
              rounded-2xl
            "
          >
            {downloading ? (
              <>
                <Loader2
                  size={16}
                  className="
                    mr-2 animate-spin
                  "
                />
                Downloading
              </>
            ) : (
              <>
                <Download size={16} className="mr-2" />
                Download
              </>
            )}
          </Button>
        </motion.div>

        {/* Save */}
        <motion.div
          whileTap={{
            scale: 0.96,
          }}
        >
          <Button
            onClick={handleSave}
            disabled={saving}
            className="
              rounded-2xl
            "
          >
            {saving ? (
              <>
                <Loader2
                  size={16}
                  className="
                    mr-2 animate-spin
                  "
                />
                Saving
              </>
            ) : (
              <>
                <Save size={16} className="mr-2" />
                Save
              </>
            )}
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default memo(CanvasFooter);
