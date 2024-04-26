import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MySwal, swalErrorOption, swalSuccessOption } from "@/libs/utils/Swal2Config";
import api from "@/servers";

export const useUpdateSEO = (id: any) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: any) => api.seo.update(id, data),
    onSuccess(data, variables, context) {
      MySwal.fire(swalSuccessOption);
    },
    onError(error: any, variables, context) {
      MySwal.fire({ ...swalErrorOption, text: error.response.data.message });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["seo"] });
    },
  });
};
