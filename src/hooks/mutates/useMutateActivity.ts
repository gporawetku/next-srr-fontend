import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MySwal, swalErrorOption, swalSuccessOption } from "@/libs/utils/Swal2Config";
import api from "@/servers";

export const useStoreActivitie = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: any) => api.activities.store(data),
    onSuccess: (data, variables, context) => {
      MySwal.fire(swalSuccessOption);
    },
    onError: (error: any, variables, context) => {
      MySwal.fire({ ...swalErrorOption, text: error.response.data.message });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["activities"] });
    },
  });
};

export const useUpdateActivitie = (id: any) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: any) => api.activities.update(id, data),
    onSuccess(data, variables, context) {
      MySwal.fire(swalSuccessOption);
    },
    onError(error: any, variables, context) {
      MySwal.fire({ ...swalErrorOption, text: error.response.data.message });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["activities"] });
      queryClient.invalidateQueries({ queryKey: ["activitie"] });
    },
  });
};

export const useDestroyActivitie = () => {
  return useMutation({
    mutationFn: (id: any) => api.activities.destroy(id),
    onSuccess(data, variables, context) {
      MySwal.fire(swalSuccessOption);
    },
    onError(error: any, variables, context) {
      MySwal.fire({ ...swalErrorOption, text: error.response.data.message });
    },
  });
};


export const useUpdateActivitieSpecialCase = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: any) => api.activities.update(data.id, data),
    onSuccess(data, variables, context) {
      MySwal.fire(swalSuccessOption);
    },
    onError(error: any, variables, context) {
      MySwal.fire({ ...swalErrorOption, text: error.response.data.message });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["activities"] });
      queryClient.invalidateQueries({ queryKey: ["activitie"] });
    },
  });
};
