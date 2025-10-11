import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus, ChevronRight, FileText, Book, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createSection, getSections, renameSection } from "../helper/api";

const NotebookSidebar = ({ sections_d, setCurrentPage }) => {
  const queryClient = useQueryClient();
  const [addingSection, setAddingSection] = useState(false);
  const [newSectionTitle, setNewSectionTitle] = useState("");
  const [editingSectionId, setEditingSectionId] = useState(null);
  const [editingPageId, setEditingPageId] = useState(null);
  const [editTitle, setEditTitle] = useState("");

  const {
    data: sections,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["sections"],
    queryFn: () => getSections(),
    initialData: sections_d,
  });

  const { mutate: addSection, isPending } = useMutation({
    mutationFn: (title) => createSection(title),
    onSuccess: (res) => {
      queryClient.invalidateQueries(["sections"]); // refresh section list
      setNewSectionTitle("");
      setAddingSection(false);
    },
    onError: (err) => {
      console.error("❌ Error creating section:", err);
    },
  });

  const { mutate: renameSectionMutate } = useMutation({
    mutationFn: ({ id, title }) => renameSection(id, title),
    onSuccess: () => {
      queryClient.invalidateQueries(["sections"]);
      setEditingSectionId(null);
    },
    onError: (err) => {
      console.error("Rename error:", err);
    },
  });

  useEffect(() => {
    const handleKey = (e) => {
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "s") {
        setAddingSection(true);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const handleAddSection = () => {
    if (!newSectionTitle.trim()) return;
    addSection(newSectionTitle); // use mutate
  };


  const handleRename = ( sectionId, newTitle) => {
    console.log( sectionId, newTitle);
    // Call API to rename section/page
    renameSectionMutate({ id: sectionId, title: newTitle });
  };

  const handleDeleteSection = (sectionId) => {
    console.log("Delete Section:", sectionId);
    // Call API to delete section
  };

  const handleDeletePage = (sectionId, pageId) => {
    console.log("Delete Page:", sectionId, pageId);
    // Call API to delete page
  };

  const onToggleSection = (sectionId) => {
    console.log("Toggle Section:", sectionId);
    // Toggle expanded state locally or via API
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading sections</div>;

  return (
    <div className="w-full  border-border bg-card h-full flex flex-col">
      {/* Header */}
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

      {/* Sections */}
      <ScrollArea className="flex-1">
        <div className="p-2">
          {sections.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center text-muted-foreground mt-10"
            >
              <Book className="mx-auto mb-2 w-8 h-8" />
              <p>No notebooks yet</p>
            </motion.div>
          ) : (
            sections.map((section) => (
              <div key={section.id} className="mb-2">
                {/* Section header */}
                <div className="flex items-center">
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={() => onToggleSection(section.id)}
                  >
                    <motion.div
                      animate={{ rotate: section.expanded ? 90 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronRight className="w-4 h-4 mr-2" />
                    </motion.div>
                    <Book className="w-4 h-4 mr-2" />
                    {editingSectionId === section._id ? (
                      <Input
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        onBlur={() =>
                          handleRename(section._id,editTitle)
                        }
                        onKeyDown={(e) =>
                          e.key === "Enter" &&
                          handleRename( section._id, editTitle)
                        }
                        className="h-7 text-sm"
                        autoFocus
                      />
                    ) : (
                      <span
                        className="truncate cursor-pointer"
                        onDoubleClick={() => {
                          setEditingSectionId(section.id);
                          setEditTitle(section.title);
                        }}
                      >
                        {section.title}
                      </span>
                    )}
                  </Button>

                  {/* Delete Section */}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="ml-auto"
                    onClick={() => handleDeleteSection(section.id)}
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </Button>
                </div>

                {/* Pages inside section */}
                {section.expanded &&
                  section.pages.map((page) => (
                    <div key={page.id} className="flex items-center ml-4 mt-1">
                      <Button
                        variant={
                          false /* replace with selectedPage check */
                            ? "secondary"
                            : "ghost"
                        }
                        className="w-full justify-start text-sm mb-1 transition-all hover:translate-x-1"
                        onClick={() => setCurrentPage(page.id)}
                      >
                        <FileText className="w-4 h-4 mr-2" />
                        {editingPageId === page.id ? (
                          <Input
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                            onBlur={() =>
                              handleRename(
                                "page",
                                section.id,
                                page.id,
                                editTitle
                              )
                            }
                            onKeyDown={(e) =>
                              e.key === "Enter" &&
                              handleRename(
                                "page",
                                section.id,
                                page.id,
                                editTitle
                              )
                            }
                            className="h-7 text-xs"
                            autoFocus
                          />
                        ) : (
                          <span
                            className="truncate cursor-pointer"
                            onDoubleClick={() => {
                              setEditingPageId(page.id);
                              setEditTitle(page.title);
                            }}
                          >
                            {page.title}
                          </span>
                        )}
                      </Button>

                      {/* Delete Page */}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="ml-auto"
                        onClick={() => handleDeletePage(section.id, page.id)}
                      >
                        <Trash2 className="w-3 h-3 text-red-500" />
                      </Button>
                    </div>
                  ))}

                {/* Add new page */}
                {section.expanded && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start text-xs ml-4 mt-1"
                    onClick={() => console.log("Add Page", section.id)}
                  >
                    <Plus className="w-3 h-3 mr-2" />
                    Add Page
                  </Button>
                )}
              </div>
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default NotebookSidebar;
