import { create } from "zustand";

const usePageStore = create((set) => ({
  resourceId: null,
  content: "",
  setContent: ({ resourceId, content }) =>
    set({
      resourceId,
      content,
    }),
  clearContent: () =>
    set({
      resourceId: null,
      content: "",
    }),
}));

export default usePageStore;
