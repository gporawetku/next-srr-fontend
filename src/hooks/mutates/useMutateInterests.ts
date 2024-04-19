import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MySwal, swalErrorOption, swalSuccessOption } from "@/libs/utils/Swal2Config"
import api from "@/servers";

export const useStoreInterest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: any) => api.interests.store(data),
    onSuccess: (data, variables, context) => {
      MySwal.fire(swalSuccessOption);
    },
    onError: (error: any, variables, context) => {
      MySwal.fire({ ...swalErrorOption, text: error.response.data.message });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["interests"] });
    },
  });
};

export const useUpdateInterest = (id: any) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: any) => api.interests.update(id, data),
    onSuccess(data, variables, context) {
      MySwal.fire(swalSuccessOption);
    },
    onError(error: any, variables, context) {
      MySwal.fire({ ...swalErrorOption, text: error.response.data.message });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["interests"] });
      queryClient.invalidateQueries({ queryKey: ["interest"] });
    },
  });
};

export const useDestroyInterest = () => {
  return useMutation({
    mutationFn: (id: any) => api.interests.destroy(id),
    onSuccess(data, variables, context) {
      MySwal.fire(swalSuccessOption);
    },
    onError(error: any, variables, context) {
      MySwal.fire({ ...swalErrorOption, text: error.response.data.message });
    },
  });
};

export const useUpdateInterestSpecialCase = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: any) => api.interests.update(data.id, data),
    onSuccess(data, variables, context) {
      MySwal.fire(swalSuccessOption);
    },
    onError(error: any, variables, context) {
      MySwal.fire({ ...swalErrorOption, text: error.response.data.message });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["interests"] });
      queryClient.invalidateQueries({ queryKey: ["interest"] });
    },
  });
};
