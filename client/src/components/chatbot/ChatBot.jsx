import React, { memo } from "react";

import AIHeader from "./AIHeader";
import Messages from "./Messages";
import Prompt from "./Prompt";

const ChatBot = ({ resourceId, resourceType }) => {
  return (
    <div className="flex flex-col h-full bg-background border-l overflow-hidden">
      <AIHeader />
      <Messages />
      <Prompt resourceId={resourceId} resourceType={resourceType} />
    </div>
  );
};

export default memo(ChatBot);
