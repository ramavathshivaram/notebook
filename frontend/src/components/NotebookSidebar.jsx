import { useState } from "react";
import { ScrollArea } from "../components/ui/scroll-area";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { getSections } from "../helper/api";
import AddSection from "./AddSection";
import Section from "../components/Section";
import NoSectionsFound from "./NoSectionsFound";
import ListSkeleton from "../skeletons/ListSkeleton";
import ErrorMessage from "./ErrorMessage";

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
    staleTime: 5 * 60 * 1000,
  });

  if (isLoading) return <ListSkeleton />;
  if (error) return <ErrorMessage />;
  return (
    <div className="w-full  bg-card h-full flex flex-col">
      <AddSection />
      <ScrollArea className="flex-1">
        <div className="p-2">
          {sections.length === 0 ? (
            <NoSectionsFound />
          ) : (
            sections.map((section) => (
              <Section
                key={section._id}
                section={section}
                isExpanded={isExpanded}
                setIsExpanded={setIsExpanded}
              />
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default NotebookSidebar;
