import useMessageStore from "@/store/message.store.js";
import useEditorStore from "@/store/editor.store.js";
import { askAiApi } from "@/helper/api.js";

const ROLE = {
  USER: "user",
  ASSISTANT: "assistant",
};

export const sendMessage = async ({ resourceId, content, resourceType }) => {
  const { addMessage, setLoading } = useMessageStore.getState();

  const { applyOperation } = useEditorStore.getState();

  try {
    setLoading(true);

    addMessage({
      role: ROLE.USER,
      content,
      resourceId,
    });

    const data = await askAiApi({
      resourceId,
      content,
      resourceType,
    });

    if (data.type === "chat") {
      addMessage({
        role: ROLE.ASSISTANT,

        content: data.chatResponse,

        resourceId,
      });

      return data;
    }

    applyOperation({
      resourceId,

      operation: data,
    });

    addMessage({
      role: ROLE.ASSISTANT,

      content: data.aiContent,

      resourceId,
    });

    return data;
  } finally {
    setLoading(false);
  }
};
