import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import { useNavigate } from "react-router-dom";
import NotebookSidebar from "@/components/NotebookSidebar";
import NoteEditor from "@/components/NoteEditor";
import useUserStore from "../store/userStore";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "../components/ui/resizable";
import usePageStore from '../store/usePageStore'

const Notebook = () => {
  const navigate = useNavigate();
  const user = useUserStore((s) => s.user);
  const currentPage=usePageStore(s=>s.currentPage)
  console.log(user)
  const { section } = user;
  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="border-b border-border p-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">OneNote</h1>
        <Button variant="ghost" size="sm" onClick={() => navigate("/")}>
          <Home className="w-4 h-4 mr-2" />
          Home
        </Button>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel>
            <NotebookSidebar
              sections_d={section}
            />
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel>
            {currentPage ? (
              <NoteEditor pageId={currentPage} />
            ) : (
              <div className="flex-1 flex items-center justify-center text-muted-foreground">
                Select a page to start writing
              </div>
            )}
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
};

export default Notebook;
