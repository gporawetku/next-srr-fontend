import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MySwal, swalErrorOption, swalSuccessOption } from "@/libs/utils/Swal2Config"
import api from "@/servers";

export const useStoreBrand = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: any) => api.brands.store(data),
    onSuccess: (data, variables, context) => {
      MySwal.fire(swalSuccessOption);
    },
    onError: (error: any, variables, context) => {
      if (error.response.status === 422) {
        MySwal.fire({ ...swalErrorOption, text: error.response.data.message });
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["brands"] });
      queryClient.invalidateQueries({ queryKey: ["brand"] });
    },
  });
};

export const useUpdateBrand = (id: any) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: any) => api.brands.update(id, data),
    onSuccess(data, variables, context) {
      MySwal.fire(swalSuccessOption);
    },
    onError(error: any, variables, context) {
      MySwal.fire({ ...swalErrorOption, text: error.response.data.message });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["brands"] });
      queryClient.invalidateQueries({ queryKey: ["brand"] });
    },
  });
};

export const useDestroyBrand = () => {
  return useMutation({
    mutationFn: (id: any) => api.brands.destroy(id),
    onSuccess(data, variables, context) {
      MySwal.fire(swalSuccessOption);
    },
    onError(error: any, variables, context) {
      MySwal.fire({ ...swalErrorOption, text: error.response.data.message });
    },
  });
};

export const useUpdateBrandSpecialCase = () => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: (data: any) => api.brands.update(data.id, data),
      onSuccess(data, variables, context) {
        MySwal.fire(swalSuccessOption);
      },
      onError(error: any, variables, context) {
        MySwal.fire({ ...swalErrorOption, text: error.response.data.message });
      },
      onSettled: () => {
        queryClient.invalidateQueries({ queryKey: ["brands"] });
        queryClient.invalidateQueries({ queryKey: ["brand"] });
      },
    });
  };
  