import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  createPageApi,
  updatePageApi,
  deletePageApi,
  getPageApi,
  getPagesApi,
} from "@/helper/api.js";

export const pagesQueryKey = ["pages"];

export const useAddPage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ title, sectionId }) =>
      createPageApi({
        title,
        sectionId,
      }),

    onMutate: async ({ title, sectionId }) => {
      const previousPages = queryClient.getQueryData([
        ...pagesQueryKey,
        sectionId,
      ]);

      const tempId = `temp-${Date.now()}`;

      const optimisticPage = {
        _id: tempId,
        title,
        sectionId,
      };

      queryClient.setQueryData([...pagesQueryKey, sectionId], (old = []) => [
        ...old,
        optimisticPage,
      ]);

      return {
        previousPages,
        tempId,
      };
    },

    onError: (_, variables, context) => {
      queryClient.setQueryData(
        [...pagesQueryKey, variables.sectionId],
        context?.previousPages,
      );
    },

    onSuccess: (data, variables, context) => {
      queryClient.setQueryData(
        [...pagesQueryKey, variables.sectionId],
        (old = []) =>
          old.map((page) => (page._id === context.tempId ? data : page)),
      );
    },
  });
};

export const useGetPage = (pageId) => {
  return useQuery({
    queryKey: [...pagesQueryKey, pageId],
    queryFn: () => getPageApi(pageId),
  });
};

export const useGetPages = (sectionId) => {
  return useQuery({
    queryKey: [...pagesQueryKey, sectionId],
    queryFn: () => getPagesApi(sectionId),
    enabled: !!sectionId,
  });
};

export const useUpdatePage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ pageId, updatedData }) => updatePageApi(pageId, updatedData),

    onMutate: async ({ pageId, sectionId, updatedData }) => {
      const previousPage = queryClient.getQueryData(["page", pageId]);

      const previousPages = queryClient.getQueryData([
        ...pagesQueryKey,
        sectionId,
      ]);

      queryClient.setQueryData(["page", pageId], (old) => ({
        ...old,
        ...updatedData,
      }));

      queryClient.setQueryData([...pagesQueryKey, sectionId], (old = []) =>
        old.map((page) =>
          page._id === pageId
            ? {
                ...page,
                ...updatedData,
              }
            : page,
        ),
      );

      return {
        previousPage,
        previousPages,
      };
    },

    onError: (_, variables, context) => {
      queryClient.setQueryData(
        ["page", variables.pageId],
        context?.previousPage,
      );

      queryClient.setQueryData(
        [...pagesQueryKey, variables.sectionId],
        context?.previousPages,
      );
    },
  });
};

export const useDeletePage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ pageId }) => deletePageApi(pageId),

    onMutate: async ({ pageId, sectionId }) => {
      const previousPages = queryClient.getQueryData([
        ...pagesQueryKey,
        sectionId,
      ]);

      queryClient.setQueryData([...pagesQueryKey, sectionId], (old = []) =>
        old.filter((page) => page._id !== pageId),
      );

      return {
        previousPages,
      };
    },

    onError: (_, variables, context) => {
      queryClient.setQueryData(
        [...pagesQueryKey, variables.sectionId],
        context?.previousPages,
      );
    },
  });
};
