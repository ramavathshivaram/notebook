import { create } from "zustand";
import { persist } from "zustand/middleware";

const usePageStore = create(
  persist(
    (set) => ({
      currentPage: null,
      setCurrentPage: (page) =>
        set({
          currentPage: page,
        }),

      clearCurrentPage: () =>
        set({
          currentPage: null,
        }),
    }),
    {
      name: "current-page-storage", // localStorage key
      getStorage: () => localStorage, // optional, defaults to localStorage
    }
  )
);

export default usePageStore;
