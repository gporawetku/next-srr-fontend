import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MySwal, swalErrorOption, swalSuccessOption } from "@/libs/utils/Swal2Config"
import api from "@/servers";

export const useStoreHouseModel = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: any) => api.houseModels.store(data),
    onSuccess: (data, variables, context) => {
      MySwal.fire(swalSuccessOption);
    },
    onError: (error: any, variables, context) => {
      MySwal.fire({ ...swalErrorOption, text: error.response.data.message });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["houseModels"] });
      queryClient.invalidateQueries({ queryKey: ["houseModelOptions"] });
    },
  });
};

export const useUpdateHouseModel = (id: any) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: any) => api.houseModels.update(id, data),
    onSuccess(data, variables, context) {
      MySwal.fire(swalSuccessOption);
    },
    onError(error: any, variables, context) {
      MySwal.fire({ ...swalErrorOption, text: error.response.data.message });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["houseModels"] });
      queryClient.invalidateQueries({ queryKey: ["houseModel"] });
      queryClient.invalidateQueries({ queryKey: ["houseModelOptions"] });
    },
  });
};

export const useDestroyHouseModel = () => {
  return useMutation({
    mutationFn: (id: any) => api.houseModels.destroy(id),
    onSuccess(data, variables, context) {
      MySwal.fire(swalSuccessOption);
    },
    onError(error: any, variables, context) {
      MySwal.fire({ ...swalErrorOption, text: error.response.data.message });
    },
  });
};

export const useUpdateHouseModelSpecialCase = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: any) => api.houseModels.update(data.id, data),
    onSuccess(data, variables, context) {
      MySwal.fire(swalSuccessOption);
    },
    onError(error: any, variables, context) {
      MySwal.fire({ ...swalErrorOption, text: error.response.data.message });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["houseModels"] });
      queryClient.invalidateQueries({ queryKey: ["houseModel"] });
      queryClient.invalidateQueries({ queryKey: ["houseModelOptions"] });
    },
  });
};
