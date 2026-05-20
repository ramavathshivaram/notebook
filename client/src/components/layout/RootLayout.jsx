import { Outlet } from "react-router-dom";

import Header from "@/components/layout/Header";
import NotebookSidebar from "@/components/layout/NotebookSidebar";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

import { cn } from "@/lib/utils";

import useSidebarStore from "@/store/sidebar.store.js";

import { useEffect, useState } from "react";
import ChatBotWrapper from "../chatbot/ChatBotWrapper";

const RootLayout = () => {
  const [mobileView, setMobileView] = useState(window.innerWidth < 780);

  const isSidebarOpen = useSidebarStore((s) => s.isSidebarOpen);

  useEffect(() => {
    const handleResize = () => setMobileView(window.innerWidth < 780);

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden">
      <Header />

      <div className="flex-1 overflow-hidden">
        <div
          className={cn(
            "max-w-screen-2xl mx-auto h-full w-full border shadow-md overflow-hidden",
          )}
        >
          {mobileView ? (
            <div className="flex h-full relative overflow-hidden">
              <NotebookSidebar
                additionaClass={cn(
                  "absolute z-20 w-full h-full transition-all duration-300 bg-background",
                  isSidebarOpen ? "left-0" : "-left-full",
                )}
              />

              <div className="flex-1 overflow-y-auto border-t">
                <Outlet />
              </div>
            </div>
          ) : (
            <ResizablePanelGroup direction="horizontal" className="h-full">
              {/* Sidebar */}
              <ResizablePanel
                defaultSize={18}
                minSize={15}
                maxSize={25}
                className="overflow-hidden"
              >
                <NotebookSidebar />
              </ResizablePanel>

              <ResizableHandle withHandle />

              {/* Main Content */}
              <ResizablePanel
                defaultSize={57}
                minSize={35}
                className="overflow-hidden"
              >
                <div className="h-full overflow-y-auto">
                  <Outlet />
                </div>
              </ResizablePanel>

              <ResizableHandle withHandle />

              {/* Chatbot */}
              <ResizablePanel
                defaultSize={25}
                minSize={20}
                maxSize={35}
                className="overflow-hidden"
              >
                <div className="h-full overflow-hidden">
                  <ChatBotWrapper />
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>
          )}
        </div>
      </div>
    </div>
  );
};

export default RootLayout;
