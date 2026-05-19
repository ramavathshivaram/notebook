import { Outlet } from "react-router-dom";

import Header from "@/components/layout/Header";
import NotebookSidebar from "@/components/layout/NotebookSidebar";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

import { cn } from "@/lib/utils";

import useSidebarStore from "@/store/useSidebarStore";

import { useEffect, useState } from "react";

const RootLayout = () => {
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
          "max-w-7xl mx-auto w-full h-full overflow-hidden border shadow-md",
        )}
      >
        {mobileView ? (
          <div className="flex h-full relative">
            <NotebookSidebar
              additionaClass={cn(
                "absolute z-10 w-full h-full transition-all duration-300",
                isSidebarOpen ? "left-0" : "-left-full",
              )}
            />

            <div className="flex-1 overflow-y-auto border-t">
              <Outlet />
            </div>
          </div>
        ) : (
          <ResizablePanelGroup direction="horizontal">
            <ResizablePanel defaultSize={25} minSize={20} maxSize={40}>
              <NotebookSidebar />
            </ResizablePanel>

            <ResizableHandle />

            <ResizablePanel defaultSize={75} minSize={60}>
              <Outlet />
            </ResizablePanel>
          </ResizablePanelGroup>
        )}
      </div>
    </div>
  );
};

export default RootLayout;
