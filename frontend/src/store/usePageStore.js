import { create } from "zustand";

const usePageStore = create((set) => ({
  currentPage: null,
  initialLoad: true,
  currentCanvas: null,
  setCurrentCanvas: (canvas, initialLoad = true) =>
    set({
      currentCanvas: canvas,
      currentPage: null,
      initialLoad,
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
