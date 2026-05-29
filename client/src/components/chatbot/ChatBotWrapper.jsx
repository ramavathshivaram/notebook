import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import ChatBot from "./ChatBot";
import useMessageStore from "@/store/message.store.js";

const ChatBotWrapper = () => {
  const { pathname } = useLocation();

  const clearMessages = useMessageStore((state) => state.clearMessages);

  const [, , resourceType, resourceId] = pathname.split("/");

  useEffect(() => {
    if (resourceType && resourceId) {
      clearMessages();
    }
  }, [resourceType, resourceId, clearMessages]);

  if (!resourceType || !resourceId) {
    return null;
  }

  return (
    <div className="h-full w-full overflow-hidden">
      <ChatBot
        key={`${resourceType}-${resourceId}`}
        resourceType={resourceType}
        resourceId={resourceId}
      />
    </div>
  );
};

export default ChatBotWrapper;
