import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MySwal, swalErrorOption, swalSuccessOption } from "@/libs/utils/Swal2Config"
import api from "@/servers";

export const useStoreUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: any) => api.users.store(data),
    onSuccess: (data, variables, context) => {
      MySwal.fire(swalSuccessOption);
    },
    onError: (error: any, variables, context) => {
      MySwal.fire({ ...swalErrorOption, text: error.response.data.message });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};

export const useUpdateUser = (id: any) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: any) => api.users.update(id, data),
    onSuccess(data, variables, context) {
      MySwal.fire(swalSuccessOption);
    },
    onError(error: any, variables, context) {
      MySwal.fire({ ...swalErrorOption, text: error.response.data.message });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
};

export const useDestroyUser = () => {
  return useMutation({
    mutationFn: (id: any) => api.users.destroy(id),
    onSuccess(data, variables, context) {
      MySwal.fire(swalSuccessOption);
    },
    onError(error: any, variables, context) {
      MySwal.fire({ ...swalErrorOption, text: error.response.data.message });
    },
  });
};

export const useUpdateUserSpecialCase = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: any) => api.users.update(data.id, data),
    onSuccess(data, variables, context) {
      MySwal.fire(swalSuccessOption);
    },
    onError(error: any, variables, context) {
      MySwal.fire({ ...swalErrorOption, text: error.response.data.message });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
};
