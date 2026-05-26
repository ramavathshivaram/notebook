import { create } from "zustand";

const useEditorStore = create((set) => ({
  editors: {},

  setContent: ({ resourceId, content }) =>
    set((state) => ({
      editors: {
        ...state.editors,

        [resourceId]: {
          ...(state.editors[resourceId] || {}),

          content,
        },
      },
    })),

  applyOperation: ({ resourceId, operation }) =>
    set((state) => {
      const current = state.editors[resourceId]?.content || "";

      let updated = current;

      switch (operation.operation) {
        case "replace":
          updated = operation.html;
          break;

        case "insert":
          updated =
            current.slice(0, operation.index) +
            operation.html +
            current.slice(operation.index);
          break;

        case "update":
          updated =
            current.slice(0, operation.startIndex) +
            operation.html +
            current.slice(operation.endIndex);
          break;

        case "delete":
          updated =
            current.slice(0, operation.startIndex) +
            current.slice(operation.endIndex);
          break;

        default:
          break;
      }

      // todo: update database

      return {
        editors: {
          ...state.editors,

          [resourceId]: {
            content: updated,
          },
        },
      };
    }),
}));

export default useEditorStore;
