import useMessageStore from "@/store/message.store.js";
import { askAiApi } from "@/helper/api.js";

const ROLE = {
  USER: "user",
  ASSISTANT: "assistant",
};

export const sendMessage = async ({ resourceId, content, resourceType }) => {
  const { addMessage, setLoading } = useMessageStore.getState();

  try {
    setLoading(true);

    addMessage({
      role: ROLE.USER,
      content,
      resourceId,
    });

    const data = await askAiApi({ resourceId, content, resourceType });
    console.log(data)

    addMessage(data);

    return data;
  } finally {
    setLoading(false);
  }
};
