import { useState, useEffect } from "react";

import { Plus, FolderPlus } from "lucide-react";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import { useAddSection } from "@/hooks/section.query.js";

const AddSection = () => {
  const { mutate: addSection, isPending } = useAddSection();

  const [addingSection, setAddingSection] = useState(false);

  const [newSectionTitle, setNewSectionTitle] = useState("");

  const handleAddSection = async () => {
    if (!newSectionTitle.trim()) return;

    await addSection(newSectionTitle);

    setAddingSection(false);

    setNewSectionTitle("");
  };

  useEffect(() => {
    const handleKey = (e) => {
      if (addingSection) return;

      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "s") {
        setAddingSection(true);
      }
    };

    window.addEventListener("keydown", handleKey);

    return () => window.removeEventListener("keydown", handleKey);
  }, [addingSection]);

  return (
    <div className="border-b border-border p-4">
      {/* Header */}
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div
            className="
              flex h-8 w-8 items-center justify-center rounded-xl
              bg-muted text-muted-foreground
            "
          >
            <FolderPlus className="h-4 w-4" />
          </div>

          <div>
            <h2 className="text-sm font-semibold text-foreground">Notebooks</h2>

            <p className="text-[11px] text-muted-foreground">
              Organize your notes & canvases
            </p>
          </div>
        </div>
      </div>

      {/* Input */}
      {addingSection ? (
        <div className="flex gap-2">
          <Input
            autoFocus
            placeholder="Section name..."
            value={newSectionTitle}
            onChange={(e) => setNewSectionTitle(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAddSection()}
            className="
              h-9 rounded-xl border-border bg-background
              text-sm shadow-none focus-visible:ring-1
            "
          />

          <Button
            size="sm"
            disabled={isPending}
            onClick={handleAddSection}
            className="
              h-9 rounded-xl px-4
            "
          >
            {isPending ? "Adding..." : "Add"}
          </Button>
        </div>
      ) : (
        <Button
          variant="outline"
          size="sm"
          onClick={() => setAddingSection(true)}
          className="
            h-10 w-full justify-start rounded-xl border-dashed
          "
        >
          <Plus className="mr-2 h-4 w-4" />
          New Section
        </Button>
      )}
    </div>
  );
};

export default AddSection;
