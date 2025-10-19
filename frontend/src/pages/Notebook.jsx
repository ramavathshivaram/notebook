import { useNavigate } from "react-router-dom";
import NotebookSidebar from "@/components/NotebookSidebar";
import NoteEditor from "@/components/NoteEditor";
import useUserStore from "../store/userStore";
import usePageStore from "../store/usePageStore";
import EmptyState from "../components/EmptyState";
import Header from "../components/Header";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "../components/ui/resizable";
import { use, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import useSidebarStore from "../store/useSidebarStore";
import CanvasEditor from "../components/CanvasEditor";

const Notebook = () => {
  const navigate = useNavigate();
  const user = useUserStore((s) => s.user);
  const clearUser = useUserStore((s) => s.clearUser);
  const currentPage = usePageStore((s) => s.currentPage);
  const currentCanvas = usePageStore((s) => s.currentCanvas);
  const [mobileView, setMobileView] = useState(window.innerWidth < 540);
  const isSidebarOpen = useSidebarStore((s) => s.isSidebarOpen);

  useEffect(() => {
    const handleResize = () => setMobileView(window.innerWidth < 540);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Redirect if no user
  useEffect(() => {
    if (!user) navigate("/auth");
  }, [user, navigate]);

  const section = user?.section;

  return (
    <div className="h-screen flex flex-col bg-background">
      <Header clearUser={clearUser} />

      <div
        className={cn(
          "max-w-6xl mx-auto w-full border shadow-md h-full overflow-hidden",
          mobileView && "flex flex-col"
        )}
      >
        {mobileView ? (
          // 📱 On mobile — show only the sidebar
          <div className="flex h-full">
            <NotebookSidebar
              sections_d={section}
              additionaClass={`absolute bg-white z-10 w-full h-full -left-full ${
                isSidebarOpen ? "left-0" : "-left-full"
              } transition-left duration-300 ease-in-out shadow-lg`}
            />
            <div className="flex-1 overflow-y-auto border-t">
              {currentPage ? (
                <NoteEditor pageId={currentPage} />
              ) : (
                <EmptyState />
              )}
            </div>
          </div>
        ) : (
          // 💻 On desktop — show resizable panels
          <ResizablePanelGroup direction="horizontal">
            <ResizablePanel defaultSize={30} minSize={20} maxSize={40}>
              <NotebookSidebar sections_d={section} />
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={70} minSize={60} maxSize={80}>
              {currentPage ? (
                <NoteEditor pageId={currentPage} />
              ) : currentCanvas ? (
                <CanvasEditor canvasId={currentCanvas} />
              ) : (
                <EmptyState />
              )}
            </ResizablePanel>
          </ResizablePanelGroup>
        )}
      </div>
    </div>
  );
};

export default Notebook;
