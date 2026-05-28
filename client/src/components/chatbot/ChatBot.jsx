import React, { memo } from "react";

import AIHeader from "./AIHeader";
import MessagesWrapper from "./MessagesWrapper";
import Prompt from "./Prompt";
import Suggestion from "./Suggestion";

const ChatBot = ({ resourceId, resourceType }) => {
  return (
    <div className="flex flex-col h-full bg-background border-l overflow-hidden">
      <AIHeader />
      <MessagesWrapper resourceId={resourceId} />
      <Suggestion resourceId={resourceId} resourceType={resourceType} />
      <Prompt resourceId={resourceId} resourceType={resourceType} />
    </div>
  );
};

export default memo(ChatBot);
