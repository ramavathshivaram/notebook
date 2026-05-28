import React from "react";
import { useLocation } from "react-router-dom";

import ChatBot from "./ChatBot";

const ChatBotWrapper = () => {
  const location = useLocation();

  const [, , resourceType, resourceId] = location.pathname.split("/");

  if (!resourceType || !resourceId) {
    return null;
  }

  return (
    <div className="h-full w-full overflow-hidden">
      <ChatBot resourceType={resourceType} resourceId={resourceId} />
    </div>
  );
};

export default ChatBotWrapper;
