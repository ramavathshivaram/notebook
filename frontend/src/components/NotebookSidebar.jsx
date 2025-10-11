import { useState, useEffect } from "react";
import { ScrollArea } from "../components/ui/scroll-area";
import { Book } from "lucide-react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { getSections } from "../helper/api";
import AddSection from "./AddSection";
import Section from "../components/Section";

const NotebookSidebar = ({ sections_d }) => {
  const [isExpanded, setIsExpanded] = useState("hello");

  const {
    data: sections,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["sections"],
    queryFn: () => getSections(),
    initialData: sections_d,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading sections</div>;
  console.log("sec", sections);
  return (
    <div className="w-full  border-border bg-card h-full flex flex-col">
      <AddSection />
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
              <Section
                key={section._id}
                section={section}
                is_expanded={isExpanded}
                set_is_expanded={setIsExpanded}
              />
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default NotebookSidebar;
