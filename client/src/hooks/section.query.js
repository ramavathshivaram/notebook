import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  renameSectionApi,
  deleteSectionApi,
  getSectionsApi,
  createSectionApi,
} from "../helper/api.js";

export const sectionsQueryKey = ["sections"];

export const useSections = () => {
  return useQuery({
    queryKey: sectionsQueryKey,

    queryFn: async () => await getSectionsApi(),

    staleTime: 5 * 60 * 1000,
  });
};

export const useRenameSection = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, title }) => renameSectionApi(id, title),

    onMutate: async ({ id, title }) => {
      await queryClient.cancelQueries({
        queryKey: sectionsQueryKey,
      });

      const previousSections = queryClient.getQueryData(sectionsQueryKey);

      queryClient.setQueryData(sectionsQueryKey, (old = []) =>
        old.map((sec) => (sec._id === id ? { ...sec, title } : sec)),
      );

      return { previousSections };
    },

    onError: (_err, _variables, context) => {
      if (context?.previousSections) {
        queryClient.setQueryData(sectionsQueryKey, context.previousSections);
      }
    },

    onSuccess: (response, variables) => {
      queryClient.setQueryData(sectionsQueryKey, (old = []) =>
        old.map((sec) =>
          sec._id === variables.id
            ? {
                ...sec,
                ...response.data.section,
              }
            : sec,
        ),
      );
    },
  });
};

export const useDeleteSection = () => {
  const queryClient = useQueryClient();


  return useMutation({
    mutationFn: (sectionId) => deleteSectionApi(sectionId),

    onMutate: async (sectionId) => {
      await queryClient.cancelQueries({
        queryKey: sectionsQueryKey,
      });

      const previousSections = queryClient.getQueryData(sectionsQueryKey);

      queryClient.setQueryData(sectionsQueryKey, (old = []) =>
        old.filter((sec) => sec._id !== sectionId),
      );

      return { previousSections };
    },

    onError: (_err, _sectionId, context) => {
      if (context?.previousSections) {
        queryClient.setQueryData(sectionsQueryKey, context.previousSections);
      }
    },
  });
};

export const useAddSection = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (title) => await createSectionApi(title),

    onMutate: async (title) => {
      await queryClient.cancelQueries({
        queryKey: sectionsQueryKey,
      });

      const previousSections = queryClient.getQueryData(sectionsQueryKey);

      const optimisticSection = {
        _id: `temp-${Date.now()}`,
        title,
      };

      queryClient.setQueryData(sectionsQueryKey, (old = []) => [
        optimisticSection,
        ...old,
      ]);

      return {
        previousSections,
        optimisticSection,
      };
    },

    onError: (_err, _title, context) => {
      if (context?.previousSections) {
        queryClient.setQueryData(sectionsQueryKey, context.previousSections);
      }
    },

    onSuccess: (section, _title, context) => {
      queryClient.setQueryData(sectionsQueryKey, (old = []) =>
        old.map((sec) =>
          sec._id === context.optimisticSection._id ? section : sec,
        ),
      );
    },
  });
};
