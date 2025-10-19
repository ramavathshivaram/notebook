import { create } from "zustand";

const usePageStore = create((set) => ({
  currentPage: null,
  initialLoad: true,
  currentCanvas: null,
  setCurrentCanvas: (canvas) =>
    set({
      currentCanvas: canvas,
      currentPage: null,
    }),
  setCurrentPage: (page, initialLoad = true) =>
    set({
      currentPage: page,
      currentCanvas: null,
      initialLoad,
    }),
  clearCurrentPage: () =>
    set({
      currentPage: null,
      currentCanvas: null,
    }),
  clearInitialLoad: () =>
    set({
      initialLoad: true,
    }),
}));

export default usePageStore;
