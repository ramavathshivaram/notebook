import React, { useState, useCallback, useEffect } from "react";
import { Textarea } from "./ui/textarea";
import debounce from "lodash.debounce";
import useUpdatePageContent from "../hooks/useUpdatePageContent.js";
import AISymbol from "./AISymbol";
import { getAiResponse, optimizationAINote } from "../helper/api";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import ListSkeleton from "../skeletons/ListSkeleton.jsx";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

const ContentEditor = ({ content, pageId }) => {
  const [localContent, setLocalContent] = useState(content);
  const [isLoadingAI, setLoadingAI] = useState(false);
  const inputRef = React.useRef(null);

  const [loading, setLoading] = useState(false);

  const { mutate: updatePageMutate, isPending } = useUpdatePageContent();

  const debouncedUpdate = useCallback(
    debounce((value) => {
      updatePageMutate({ pageId, updatedData: { content: value } });
    }, 1000),
    [pageId, updatePageMutate]
  );

  useEffect(() => {
    return () => debouncedUpdate.cancel();
  }, [debouncedUpdate]);

  const handleChange = (value) => {
    setLocalContent(value);
    debouncedUpdate(value);
  };

  const handleAI = async () => {
    if (isLoadingAI) return;
    setLoadingAI(true);
    try {
      debouncedUpdate.flush();
      const res = await getAiResponse({ prompt: localContent });
      const content = res;
      console.log(content);
      if (res) {
        setLocalContent(content);
      }
    } catch (err) {
      console.error(err);
      toast.error("❌ Error fetching AI response.");
    } finally {
      setLoadingAI(false);
    }
  };
  const handleGenerate = async () => {
    if (loading) return;
    const prompt = inputRef.current.value;
    if (!prompt) return;
    setLoading(true);
    try {
      const content = await optimizationAINote({
        prompt,
        noteContent: localContent,
      });
      if (content) {
        setLocalContent(content);
      }
    } catch (err) {
      console.error(err);
      toast.error("❌ Error fetching AI response.");
    } finally {
      setLoading(false);
      inputRef.current.value = "";
    }
  };

  return (
    <div className="relative">
      {/* Textarea */}
      {isLoadingAI ? (
        <ListSkeleton />
      ) : (
        <>
          <ReactQuill
            className="my-editor"
            theme="snow"
            value={localContent}
            onChange={handleChange}
            placeholder="Start writing..."
            style={{ height: "100%" }}
          />
          <div className="peer group/generate flex items-center gap-2 flex-1 transition-all duration-500 ease-in-out group-hover/generate:blur-[0px] mt-2 mb-15">
            <Input
              ref={inputRef}
              className="w-0 transition-all p-0 border-0 duration-500 ease-in-out group-hover/generate:w-full group-hover/generate:border group-hover/generate:p-3 focus:w-full focus:border focus:p-3"
              placeholder="Type prompt..."
            />
            <Button
              variant="outline"
              onClick={handleGenerate}
              disabled={loading}
              className="transition-all duration-500 ease-in-out"
            >
              {loading ? "Generating..." : "Generate"}
            </Button>
          </div>
        </>
      )}

      {/* Saving indicator */}
      {isPending && (
        <p className="text-sm text-gray-500 mt-2 animate-pulse">Saving...</p>
      )}

      {/* Floating AI Chat Button */}
      <AISymbol handleAI={handleAI} />

      {/* AI Loading Overlay */}
      {isLoadingAI && (
        <div className="fixed inset-0 bg-transparent w-screen h-screen z-40"></div>
      )}
    </div>
  );
};

export default ContentEditor;
