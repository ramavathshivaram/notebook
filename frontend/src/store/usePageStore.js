import { create } from "zustand";

const usePageStore = create((set) => ({
  currentPage: null,
  initialLoad: true,
  setCurrentPage: (page, initialLoad = true) =>
    set({
      currentPage: page,
      initialLoad,
    }),
  clearCurrentPage: () =>
    set({
      currentPage: null,
    }),
  clearInitialLoad: () =>
    set({
      initialLoad: true,
    }),
}));

export default usePageStore;
