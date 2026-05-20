import React from "react";
import { Loader2, SendHorizonal } from "lucide-react";

import { sendMessage } from "@/services/message.service.js";
import useMessageStore from "@/store/message.store.js";

const Prompt = ({ resourceId,resourceType }) => {
  const [message, setMessage] = React.useState("");

  const isLoading = useMessageStore((state) => state.loading);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedMessage = message.trim();

    if (!trimmedMessage || isLoading) return;

    await sendMessage({
      content: trimmedMessage,
      resourceId,
      resourceType
    });

    setMessage("");
  };

  return (
    <div className="border-t bg-background p-3">
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Ask AI anything..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={isLoading}
          className="flex-1 rounded-xl border bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
        />

        <button
          type="submit"
          disabled={!message.trim() || isLoading}
          className="rounded-xl bg-primary p-3 text-primary-foreground transition hover:opacity-90 disabled:opacity-50"
        >
          {isLoading ? (
            <Loader2 size={18} className="animate-spin" />
          ) : (
            <SendHorizonal size={18} />
          )}
        </button>
      </form>
    </div>
  );
};

export default Prompt;
