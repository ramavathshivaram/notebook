import NotebookSidebar from "@/components/layout/NotebookSidebar";
import NoteEditor from "@/components/pages/NoteEditor";
import EmptyState from "@/components/common/EmptyState";
import Header from "@/components/layout/Header";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "../components/ui/resizable";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import useSidebarStore from "@/store/useSidebarStore";
import CanvasEditor from "@/components/CanvasEditor";

const Notebook = () => {
  const [mobileView, setMobileView] = useState(window.innerWidth < 780);
  const isSidebarOpen = useSidebarStore((s) => s.isSidebarOpen);

  useEffect(() => {
    const handleResize = () => setMobileView(window.innerWidth < 780);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="h-screen flex flex-col bg-background">
      <Header />

      <div
        className={cn(
          "max-w-7xl mx-auto w-full border shadow-md h-full overflow-hidden",
          mobileView && "flex flex-col",
        )}
      >
        {mobileView ? (
          <div className="flex h-full">
            <NotebookSidebar
              additionaClass={`absolute z-10 w-full h-full -left-full ${
                isSidebarOpen ? "left-0" : "-left-full"
              } transition-left duration-300 ease-in-out shadow-lg`}
            />
            <div className="flex-1 overflow-y-auto border-t">
              <NoteEditor />

              <CanvasEditor />

              <EmptyState />
            </div>
          </div>
        ) : (
          <ResizablePanelGroup direction="horizontal">
            <ResizablePanel defaultSize={25} minSize={20} maxSize={40}>
              <NotebookSidebar />
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={75} minSize={60} maxSize={80}>
              <NoteEditor />

              <CanvasEditor />

              <EmptyState />
            </ResizablePanel>
          </ResizablePanelGroup>
        )}
      </div>
    </div>
  );
};

export default Notebook;
