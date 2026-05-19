import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  createCanvasApi,
  updateCanvasApi,
  deleteCanvasApi,
  getCanvasApi,
  getCanvassApi,
} from "@/helper/api.js";

export const canvassQueryKey = ["canvass"];

export const canvasQueryKey = (canvasId) => ["canvas", canvasId];

export const useAddCanvas = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ title, sectionId }) =>
      createCanvasApi({
        title,
        sectionId,
      }),

    onMutate: async ({ title, sectionId }) => {
      const previousCanvass = queryClient.getQueryData([
        ...canvassQueryKey,
        sectionId,
      ]);

      const tempId = `temp-${Date.now()}`;

      const optimisticCanvas = {
        _id: tempId,
        title,
        sectionId,
      };

      queryClient.setQueryData([...canvassQueryKey, sectionId], (old = []) => [
        ...old,
        optimisticCanvas,
      ]);

      return {
        previousCanvass,
        tempId,
      };
    },

    onError: (_, variables, context) => {
      queryClient.setQueryData(
        [...canvassQueryKey, variables.sectionId],
        context?.previousCanvass,
      );
    },

    onSuccess: (data, variables, context) => {
      queryClient.setQueryData(
        [...canvassQueryKey, variables.sectionId],
        (old = []) =>
          old.map((canvas) => (canvas._id === context.tempId ? data : canvas)),
      );
    },
  });
};

export const useGetCanvas = (canvasId) => {
  return useQuery({
    queryKey: canvasQueryKey(canvasId),

    queryFn: () => getCanvasApi(canvasId),

    enabled: !!canvasId,
  });
};

export const useGetCanvass = (sectionId) => {
  return useQuery({
    queryKey: [...canvassQueryKey, sectionId],

    queryFn: () => getCanvassApi(sectionId),

    enabled: !!sectionId,
  });
};

export const useUpdateCanvas = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ canvasId, updatedData }) =>
      updateCanvasApi(canvasId, updatedData),

    onMutate: async ({ canvasId, sectionId, updatedData }) => {
      const previousCanvas = queryClient.getQueryData(canvasQueryKey(canvasId));

      const previousCanvass = queryClient.getQueryData([
        ...canvassQueryKey,
        sectionId,
      ]);

      queryClient.setQueryData(canvasQueryKey(canvasId), (old) => ({
        ...old,
        ...updatedData,
      }));

      queryClient.setQueryData([...canvassQueryKey, sectionId], (old = []) =>
        old.map((canvas) =>
          canvas._id === canvasId
            ? {
                ...canvas,
                ...updatedData,
              }
            : canvas,
        ),
      );

      return {
        previousCanvas,
        previousCanvass,
      };
    },

    onError: (_, variables, context) => {
      queryClient.setQueryData(
        canvasQueryKey(variables.canvasId),
        context?.previousCanvas,
      );

      queryClient.setQueryData(
        [...canvassQueryKey, variables.sectionId],
        context?.previousCanvass,
      );
    },
  });
};

export const useDeleteCanvas = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ canvasId }) => deleteCanvasApi(canvasId),

    onMutate: async ({ canvasId, sectionId }) => {
      const previousCanvass = queryClient.getQueryData([
        ...canvassQueryKey,
        sectionId,
      ]);

      queryClient.setQueryData([...canvassQueryKey, sectionId], (old = []) =>
        old.filter((canvas) => canvas._id !== canvasId),
      );

      return {
        previousCanvass,
      };
    },

    onError: (_, variables, context) => {
      queryClient.setQueryData(
        [...canvassQueryKey, variables.sectionId],
        context?.previousCanvass,
      );
    },
  });
};
