import { ScrollArea } from "./ui/scroll-area.jsx";

import AddSection from "./AddSection";
import Section from "./Section";
import NoSectionsFound from "./NoSectionsFound";

import ListSkeleton from "@/skeletons/ListSkeleton";
import ErrorMessage from "./common/ErrorMessage";

import { cn } from "@/lib/utils.js";

import { useSections } from "@/hooks/section.query.js";

import { Accordion } from "@/components/ui/accordion";

const NotebookSidebar = ({ additionaClass = "" }) => {
  const { data: sections, isLoading, error } = useSections();

  if (isLoading) return <ListSkeleton />;

  if (error) return <ErrorMessage />;

  return (
    <div className={cn("w-full h-full flex flex-col bg-card", additionaClass)}>
      <AddSection />

      <ScrollArea className="flex-1">
        <div className="p-2">
          {sections?.length ? (
            <Accordion type="single" collapsible className="w-full">
              {sections.map((section) => (
                <Section key={section._id} section={section} />
              ))}
            </Accordion>
          ) : (
            <NoSectionsFound />
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default NotebookSidebar;
