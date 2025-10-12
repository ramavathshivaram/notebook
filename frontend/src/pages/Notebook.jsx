import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
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
import EmptyState from "../components/EmptyState";
import Header from "../components/Header";

const Notebook = () => {
  const navigate = useNavigate();
  const user = useUserStore((s) => s.user);
  const clearUser = useUserStore((s) => s.clearUser);
  const currentPage = usePageStore((s) => s.currentPage);
  if (!user) navigate("/auth");
  const { section } = user;
  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}

      <Header clearUser={clearUser} />
      <div className="max-w-6xl mx-auto w-full border shadow-md h-full">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel defaultSize={30} minSize={20} maxSize={40}>
            <NotebookSidebar sections_d={section} />
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={70} minSize={60} maxSize={80}>
            {currentPage ? <NoteEditor pageId={currentPage} /> : <EmptyState />}
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
};

export default Notebook;
