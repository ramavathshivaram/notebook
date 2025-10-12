import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Home, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import NotebookSidebar from "@/components/NotebookSidebar";
import NoteEditor from "@/components/NoteEditor";
import useUserStore from "../store/userStore";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "../components/ui/resizable";
import usePageStore from "../store/usePageStore";

const Notebook = () => {
  const navigate = useNavigate();
  const user = useUserStore((s) => s.user);
  const clearUser = useUserStore((s) => s.clearUser);
  const currentPage = usePageStore((s) => s.currentPage);
  console.log(user);
  const { section } = user;
  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="border-b border-border p-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold" onClick={() => navigate("/")}>
          OneNote
        </h1>
        <Button
          size="sm"
          onClick={() => {
            clearUser();
            localStorage.removeItem("token");
            navigate("/auth");
          }}
        >
          <LogOut className="w-4 h-4 mr-2" />
          logout
        </Button>
      </header>

      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel>
          <NotebookSidebar sections_d={section} />
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
  );
};

export default Notebook;
