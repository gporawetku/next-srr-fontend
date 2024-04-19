import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MySwal, swalErrorOption, swalSuccessOption } from "@/libs/utils/Swal2Config"
import api from "@/servers";

export const useStoreJob = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: any) => api.jobs.store(data),
    onSuccess: (data, variables, context) => {
      MySwal.fire(swalSuccessOption);
    },
    onError: (error: any, variables, context) => {
      MySwal.fire({ ...swalErrorOption, text: error.response.data.message });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      queryClient.invalidateQueries({ queryKey: ["job"] });
    },
  });
};

export const useUpdateJob = (id: any) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: any) => api.jobs.update(id, data),
    onSuccess(data, variables, context) {
      MySwal.fire(swalSuccessOption);
    },
    onError(error: any, variables, context) {
      MySwal.fire({ ...swalErrorOption, text: error.response.data.message });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      queryClient.invalidateQueries({ queryKey: ["job"] });
    },
  });
};

export const useDestroyJob = () => {
  return useMutation({
    mutationFn: (data: any) => api.jobs.destroy(data),
    onSuccess(data, variables, context) {
      MySwal.fire(swalSuccessOption);
    },
  });
};

export const useUpdateJobSpecialCase = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: any) => api.jobs.update(data.id, data),
    onSuccess(data, variables, context) {
      MySwal.fire(swalSuccessOption);
    },
    onError(error: any, variables, context) {
      MySwal.fire({ ...swalErrorOption, text: error.response.data.message });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      queryClient.invalidateQueries({ queryKey: ["job"] });
    },
  });
};
