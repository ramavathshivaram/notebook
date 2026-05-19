import React from "react";
import { useLocation } from "react-router-dom";
import ChatBot from "./ChatBot";

const ChatBotWrapper = () => {
  const location = useLocation();

  const type = location.pathname.split("/")[2];

  if (!type) return null;

  const pageId = location.pathname.split("/")[3];

  return (
    <div className="h-full w-full">
      <ChatBot />
    </div>
  );
};

export default ChatBotWrapper;
