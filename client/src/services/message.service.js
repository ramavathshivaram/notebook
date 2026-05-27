import useMessageStore from "@/store/message.store.js";
import { askAiApi } from "@/helper/api.js";
import usePageStore from "@/store/page.store";

const ROLE = {
  USER: "user",
  ASSISTANT: "assistant",
};

export const sendMessage = async ({ resourceId, content, resourceType }) => {
  const { addMessage, setLoading } = useMessageStore.getState();
  const setContent = usePageStore.getState().setContent;
  const setSuggestions = usePageStore.getState().setSuggestions;

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

    addMessage({
      role: ROLE.ASSISTANT,
      content: data.aiResponse,
      resourceId,
    });

    if (data.resourceContent !== undefined) {
      setContent({ resourceId, content: data.resourceContent });
    }

    if (data.suggestions) {
      setSuggestions(data.suggestions);
    }
    
  } finally {
    setLoading(false);
  }
};
