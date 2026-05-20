import { create } from "zustand";

const useMessageStore = create((set) => ({
  messages: [],
  loading: false,

  setLoading: (loading) => set({ loading }),

  setMessages: (messages) => set({ messages }),

  addMessage: (message) =>
    set((state) => ({
      messages: [...state.messages, message],
    })),

  addMessages: (messages) =>
    set((state) => ({
      messages: [...state.messages, ...messages],
    })),

  clearMessages: () => set({ messages: [] }),
}));

export default useMessageStore;
