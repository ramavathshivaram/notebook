import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
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
  }, []);

  return (
    <div className="p-4 border-b border-border">
      <h2 className="text-lg font-semibold mb-3">Notebooks</h2>
      {addingSection ? (
        <div className="flex gap-2">
          <Input
            placeholder="Section name"
            value={newSectionTitle}
            onChange={(e) => setNewSectionTitle(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAddSection()}
            autoFocus
            className="h-8"
          />
          <Button size="sm" onClick={handleAddSection} className="h-8">
            {isPending ? "Adding..." : "Add"}
          </Button>
        </div>
      ) : (
        <Button
          variant="outline"
          size="sm"
          className="w-full"
          onClick={() => setAddingSection(true)}
        >
          <Plus className="w-4 h-4 mr-2" />
          New Section
        </Button>
      )}
    </div>
  );
};

export default AddSection;
