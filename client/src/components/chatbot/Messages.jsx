import React, { memo } from "react";
import Message from "./Message";

const Messages = ({ messages }) => {
  return (
    <div className="flex-1 h-full overflow-y-auto p-2 space-y-2">
      {messages.map((message, index) => (
        <Message key={index} role={message.role} content={message.content} />
      ))}
    </div>
  );
};

export default memo(Messages);
