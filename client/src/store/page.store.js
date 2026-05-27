import { create } from "zustand";

const usePageStore = create((set) => ({
  resourceId: null,
  content: "",
  suggestions: [],
  setContent: ({ resourceId, content }) =>
    set({
      resourceId,
      content,
    }),

  setSuggestions: (suggestions) => set({ suggestions }),
  
  clearContent: () =>
    set({
      resourceId: null,
      content: "",
      suggestions: [],
    }),
}));

export default usePageStore;
