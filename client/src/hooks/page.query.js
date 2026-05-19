import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  createPageApi,
  updatePageApi,
  deletePageApi,
  getPageApi,
} from "@/helper/api.js";

import { sectionsQueryKey } from "./section.query.js";

export const pagesQueryKey = ["pages"];

export const useAddPage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ title, sectionId }) =>console.log("xcbcbbv") ,//createPageApi({ title, sectionId }),

    onMutate: async ({ title, sectionId }) => {
      const previousSections = queryClient.getQueryData(sectionsQueryKey);

      queryClient.setQueryData(sectionsQueryKey, (old = []) =>
        old.map((section) =>
          section._id === sectionId
            ? {
                ...section,
                pages: [
                  ...section.pages,
                  {
                    _id: Date.now().toString(),
                    title,
                    sectionId,
                  },
                ],
              }
            : section,
        ),
      );

      return { previousSections };
    },

    onError: (_, __, context) => {
      queryClient.setQueryData(sectionsQueryKey, context?.previousSections);
    },
  });
};

export const useGetPage = (pageId) => {
  return useQuery({
    queryKey: ["page", pageId],
    queryFn: () => getPageApi(pageId),
    enabled: !!pageId,
  });
};

export const useUpdatePage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ pageId, updatedData }) => updatePageApi(pageId, updatedData),

    onMutate: async ({ pageId, updatedData }) => {
      const previousPage = queryClient.getQueryData(["page", pageId]);

      const previousSections = queryClient.getQueryData(sectionsQueryKey);

      queryClient.setQueryData(["page", pageId], (old) => ({
        ...old,
        ...updatedData,
      }));

      queryClient.setQueryData(sectionsQueryKey, (old = []) =>
        old.map((section) => ({
          ...section,
          pages: section.pages.map((page) =>
            page._id === pageId ? { ...page, ...updatedData } : page,
          ),
        })),
      );

      return {
        previousPage,
        previousSections,
      };
    },

    onError: (_, variables, context) => {
      queryClient.setQueryData(
        ["page", variables.pageId],
        context?.previousPage,
      );

      queryClient.setQueryData(sectionsQueryKey, context?.previousSections);
    },
  });
};

export const useDeletePage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ pageId }) => deletePageApi(pageId),

    onMutate: async ({ pageId }) => {
      const previousSections = queryClient.getQueryData(sectionsQueryKey);

      queryClient.setQueryData(sectionsQueryKey, (old = []) =>
        old.map((section) => ({
          ...section,
          pages: section.pages.filter((page) => page._id !== pageId),
        })),
      );

      return { previousSections };
    },

    onError: (_, __, context) => {
      queryClient.setQueryData(sectionsQueryKey, context?.previousSections);
    },
  });
};
