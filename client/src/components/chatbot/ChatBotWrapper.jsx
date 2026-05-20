import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

import ChatBot from "./ChatBot";

import { getMessagesApi } from "@/helper/api.js";

import useMessageStore from "@/store/message.store.js";

const ChatBotWrapper = () => {
  const location = useLocation();

  const setMessages = useMessageStore((state) => state.setMessages);

  const clearMessages = useMessageStore((state) => state.clearMessages);

  const [, , resourceType, resourceId] = location.pathname.split("/");

  useEffect(() => {
    if (!resourceType || !resourceId) return;

    const fetchMessages = async () => {
      try {
        clearMessages();

        const data = await getMessagesApi(resourceId);

        setMessages(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMessages();
  }, [resourceType, resourceId, setMessages, clearMessages]);

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
