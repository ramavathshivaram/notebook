import React, { memo } from "react";

import TopRef from "./TopRef";
import Messages from "./Messages";

const MessagesWrapper = ({ resourceId }) => {
  return (
    <div
      className="
        relative flex h-full flex-1
        flex-col overflow-hidden
      "
    >
      {/* Top Fade */}
      <div
        className="
          pointer-events-none absolute
          inset-x-0 top-0 z-10 h-10
          bg-gradient-to-b
          from-background to-transparent
        "
      />

      {/* Messages */}
      <div
        className="
          scrollbar-thin scrollbar-thumb-border
          scrollbar-track-transparent
          flex-1 space-y-4 overflow-y-auto
          px-4 py-6
        "
      >
        <TopRef resourceId={resourceId} />
        <Messages resourceId={resourceId} />
      </div>

      {/* Bottom Fade */}
      <div
        className="
          pointer-events-none absolute
          inset-x-0 bottom-0 z-10 h-10
          bg-gradient-to-t
          from-background to-transparent
        "
      />
    </div>
  );
};

export default memo(MessagesWrapper);
