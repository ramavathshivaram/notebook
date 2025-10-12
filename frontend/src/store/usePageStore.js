import { create } from "zustand";

const usePageStore = create((set) => ({
  currentPage: null,
  setCurrentPage: (page) =>
    set({
      currentPage: page,
    }),
  clearCurrentPage: () =>
    set({
      currentPage: null,
    }),
}));

export default usePageStore;
